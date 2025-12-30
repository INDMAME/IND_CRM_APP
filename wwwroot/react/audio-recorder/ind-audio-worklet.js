// AudioWorklet processor for capturing mono input as Float32Array chunks.
// This runs in the AudioWorklet global scope.
class IndAudioCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._recording = true;
    this.port.onmessage = (event) => {
      if (!event || !event.data) return;
      if (event.data.type === "setRecording") {
        this._recording = !!event.data.value;
      }
    };
  }

  process(inputs) {
    if (!this._recording) return true;
    if (!inputs || !inputs.length) return true;

    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;

    const copy = new Float32Array(channel.length);
    copy.set(channel);
    this.port.postMessage({ type: "chunk", samples: copy }, [copy.buffer]);

    return true;
  }
}

registerProcessor("ind-audio-capture", IndAudioCaptureProcessor);
