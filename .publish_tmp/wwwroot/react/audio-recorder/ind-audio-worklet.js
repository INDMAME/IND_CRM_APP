// AudioWorklet processor for capturing mono input as Float32Array chunks.
// This runs in the AudioWorklet global scope.
class IndAudioCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._recording = true;
    this._chunkSize = 4096;
    this._buffer = new Float32Array(this._chunkSize);
    this._writeIndex = 0;
    this.port.onmessage = (event) => {
      if (!event || !event.data) return;
      if (event.data.type === "setRecording") {
        const nextRecording = !!event.data.value;
        if (this._recording && !nextRecording) {
          this._flush();
        }
        this._recording = nextRecording;
      }
    };
  }

  // Send any buffered samples before pausing/stopping.
  _flush() {
    if (this._writeIndex <= 0) return;
    const slice = this._buffer.subarray(0, this._writeIndex);
    const copy = new Float32Array(slice.length);
    copy.set(slice);
    this.port.postMessage({ type: "chunk", samples: copy }, [copy.buffer]);
    this._buffer = new Float32Array(this._chunkSize);
    this._writeIndex = 0;
  }

  process(inputs) {
    if (!this._recording) return true;
    if (!inputs || !inputs.length) return true;

    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;

    let offset = 0;
    while (offset < channel.length) {
      const remaining = this._buffer.length - this._writeIndex;
      const toCopy = Math.min(remaining, channel.length - offset);
      this._buffer.set(channel.subarray(offset, offset + toCopy), this._writeIndex);
      this._writeIndex += toCopy;
      offset += toCopy;

      if (this._writeIndex >= this._buffer.length) {
        const full = this._buffer;
        this.port.postMessage({ type: "chunk", samples: full }, [full.buffer]);
        this._buffer = new Float32Array(this._chunkSize);
        this._writeIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor("ind-audio-capture", IndAudioCaptureProcessor);
