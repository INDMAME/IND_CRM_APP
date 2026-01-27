(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // wwwroot/react/audio-recorder/ind-audio-worklet.ts
  var require_ind_audio_worklet = __commonJS({
    "wwwroot/react/audio-recorder/ind-audio-worklet.ts"() {
      var IndAudioCaptureProcessor = class extends AudioWorkletProcessor {
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
      };
      registerProcessor("ind-audio-capture", IndAudioCaptureProcessor);
    }
  });
  require_ind_audio_worklet();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3QvYXVkaW8tcmVjb3JkZXIvaW5kLWF1ZGlvLXdvcmtsZXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEF1ZGlvV29ya2xldCBwcm9jZXNzb3IgZm9yIGNhcHR1cmluZyBtb25vIGlucHV0IGFzIEZsb2F0MzJBcnJheSBjaHVua3MuXHJcbi8vIFRoaXMgcnVucyBpbiB0aGUgQXVkaW9Xb3JrbGV0IGdsb2JhbCBzY29wZS5cclxuY2xhc3MgSW5kQXVkaW9DYXB0dXJlUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLl9yZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5fY2h1bmtTaXplID0gNDA5NjtcclxuICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fY2h1bmtTaXplKTtcclxuICAgIHRoaXMuX3dyaXRlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5wb3J0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIWV2ZW50IHx8ICFldmVudC5kYXRhKSByZXR1cm47XHJcbiAgICAgIGlmIChldmVudC5kYXRhLnR5cGUgPT09IFwic2V0UmVjb3JkaW5nXCIpIHtcclxuICAgICAgICBjb25zdCBuZXh0UmVjb3JkaW5nID0gISFldmVudC5kYXRhLnZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmRpbmcgJiYgIW5leHRSZWNvcmRpbmcpIHtcclxuICAgICAgICAgIHRoaXMuX2ZsdXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlY29yZGluZyA9IG5leHRSZWNvcmRpbmc7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBTZW5kIGFueSBidWZmZXJlZCBzYW1wbGVzIGJlZm9yZSBwYXVzaW5nL3N0b3BwaW5nLlxyXG4gIF9mbHVzaCgpIHtcclxuICAgIGlmICh0aGlzLl93cml0ZUluZGV4IDw9IDApIHJldHVybjtcclxuICAgIGNvbnN0IHNsaWNlID0gdGhpcy5fYnVmZmVyLnN1YmFycmF5KDAsIHRoaXMuX3dyaXRlSW5kZXgpO1xyXG4gICAgY29uc3QgY29weSA9IG5ldyBGbG9hdDMyQXJyYXkoc2xpY2UubGVuZ3RoKTtcclxuICAgIGNvcHkuc2V0KHNsaWNlKTtcclxuICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2h1bmtcIiwgc2FtcGxlczogY29weSB9LCBbY29weS5idWZmZXJdKTtcclxuICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fY2h1bmtTaXplKTtcclxuICAgIHRoaXMuX3dyaXRlSW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJvY2VzcyhpbnB1dHMpIHtcclxuICAgIGlmICghdGhpcy5fcmVjb3JkaW5nKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICghaW5wdXRzIHx8ICFpbnB1dHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBjaGFubmVsID0gaW5wdXRzWzBdICYmIGlucHV0c1swXVswXTtcclxuICAgIGlmICghY2hhbm5lbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICB3aGlsZSAob2Zmc2V0IDwgY2hhbm5lbC5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5fYnVmZmVyLmxlbmd0aCAtIHRoaXMuX3dyaXRlSW5kZXg7XHJcbiAgICAgIGNvbnN0IHRvQ29weSA9IE1hdGgubWluKHJlbWFpbmluZywgY2hhbm5lbC5sZW5ndGggLSBvZmZzZXQpO1xyXG4gICAgICB0aGlzLl9idWZmZXIuc2V0KGNoYW5uZWwuc3ViYXJyYXkob2Zmc2V0LCBvZmZzZXQgKyB0b0NvcHkpLCB0aGlzLl93cml0ZUluZGV4KTtcclxuICAgICAgdGhpcy5fd3JpdGVJbmRleCArPSB0b0NvcHk7XHJcbiAgICAgIG9mZnNldCArPSB0b0NvcHk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fd3JpdGVJbmRleCA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZnVsbCA9IHRoaXMuX2J1ZmZlcjtcclxuICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNodW5rXCIsIHNhbXBsZXM6IGZ1bGwgfSwgW2Z1bGwuYnVmZmVyXSk7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9jaHVua1NpemUpO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlSW5kZXggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3RlclByb2Nlc3NvcihcImluZC1hdWRpby1jYXB0dXJlXCIsIEluZEF1ZGlvQ2FwdHVyZVByb2Nlc3Nvcik7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBRUEsVUFBTSwyQkFBTixjQUF1QyxzQkFBc0I7QUFBQSxRQUMzRCxjQUFjO0FBQ1osZ0JBQU07QUFDTixlQUFLLGFBQWE7QUFDbEIsZUFBSyxhQUFhO0FBQ2xCLGVBQUssVUFBVSxJQUFJLGFBQWEsS0FBSyxVQUFVO0FBQy9DLGVBQUssY0FBYztBQUNuQixlQUFLLEtBQUssWUFBWSxDQUFDLFVBQVU7QUFDL0IsZ0JBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFNO0FBQzNCLGdCQUFJLE1BQU0sS0FBSyxTQUFTLGdCQUFnQjtBQUN0QyxvQkFBTSxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sS0FBSztBQUNuQyxrQkFBSSxLQUFLLGNBQWMsQ0FBQyxlQUFlO0FBQ3JDLHFCQUFLLE9BQU87QUFBQSxjQUNkO0FBQ0EsbUJBQUssYUFBYTtBQUFBLFlBQ3BCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQTtBQUFBLFFBR0EsU0FBUztBQUNQLGNBQUksS0FBSyxlQUFlLEVBQUc7QUFDM0IsZ0JBQU0sUUFBUSxLQUFLLFFBQVEsU0FBUyxHQUFHLEtBQUssV0FBVztBQUN2RCxnQkFBTSxPQUFPLElBQUksYUFBYSxNQUFNLE1BQU07QUFDMUMsZUFBSyxJQUFJLEtBQUs7QUFDZCxlQUFLLEtBQUssWUFBWSxFQUFFLE1BQU0sU0FBUyxTQUFTLEtBQUssR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDO0FBQ3JFLGVBQUssVUFBVSxJQUFJLGFBQWEsS0FBSyxVQUFVO0FBQy9DLGVBQUssY0FBYztBQUFBLFFBQ3JCO0FBQUEsUUFFQSxRQUFRLFFBQVE7QUFDZCxjQUFJLENBQUMsS0FBSyxXQUFZLFFBQU87QUFDN0IsY0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLE9BQVEsUUFBTztBQUV0QyxnQkFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDeEMsY0FBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixjQUFJLFNBQVM7QUFDYixpQkFBTyxTQUFTLFFBQVEsUUFBUTtBQUM5QixrQkFBTSxZQUFZLEtBQUssUUFBUSxTQUFTLEtBQUs7QUFDN0Msa0JBQU0sU0FBUyxLQUFLLElBQUksV0FBVyxRQUFRLFNBQVMsTUFBTTtBQUMxRCxpQkFBSyxRQUFRLElBQUksUUFBUSxTQUFTLFFBQVEsU0FBUyxNQUFNLEdBQUcsS0FBSyxXQUFXO0FBQzVFLGlCQUFLLGVBQWU7QUFDcEIsc0JBQVU7QUFFVixnQkFBSSxLQUFLLGVBQWUsS0FBSyxRQUFRLFFBQVE7QUFDM0Msb0JBQU0sT0FBTyxLQUFLO0FBQ2xCLG1CQUFLLEtBQUssWUFBWSxFQUFFLE1BQU0sU0FBUyxTQUFTLEtBQUssR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDO0FBQ3JFLG1CQUFLLFVBQVUsSUFBSSxhQUFhLEtBQUssVUFBVTtBQUMvQyxtQkFBSyxjQUFjO0FBQUEsWUFDckI7QUFBQSxVQUNGO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUVBLHdCQUFrQixxQkFBcUIsd0JBQXdCO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
