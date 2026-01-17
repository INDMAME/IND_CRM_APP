(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // wwwroot/react/audio-recorder/ind-audio-worklet.js
  var require_ind_audio_worklet = __commonJS({
    "wwwroot/react/audio-recorder/ind-audio-worklet.js"() {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3QvYXVkaW8tcmVjb3JkZXIvaW5kLWF1ZGlvLXdvcmtsZXQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEF1ZGlvV29ya2xldCBwcm9jZXNzb3IgZm9yIGNhcHR1cmluZyBtb25vIGlucHV0IGFzIEZsb2F0MzJBcnJheSBjaHVua3MuXHJcbi8vIFRoaXMgcnVucyBpbiB0aGUgQXVkaW9Xb3JrbGV0IGdsb2JhbCBzY29wZS5cclxuY2xhc3MgSW5kQXVkaW9DYXB0dXJlUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9yZWNvcmRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NodW5rU2l6ZSA9IDQwOTY7XG4gICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9jaHVua1NpemUpO1xuICAgIHRoaXMuX3dyaXRlSW5kZXggPSAwO1xuICAgIHRoaXMucG9ydC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmRhdGEpIHJldHVybjtcbiAgICAgIGlmIChldmVudC5kYXRhLnR5cGUgPT09IFwic2V0UmVjb3JkaW5nXCIpIHtcbiAgICAgICAgY29uc3QgbmV4dFJlY29yZGluZyA9ICEhZXZlbnQuZGF0YS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZGluZyAmJiAhbmV4dFJlY29yZGluZykge1xuICAgICAgICAgIHRoaXMuX2ZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVjb3JkaW5nID0gbmV4dFJlY29yZGluZztcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gU2VuZCBhbnkgYnVmZmVyZWQgc2FtcGxlcyBiZWZvcmUgcGF1c2luZy9zdG9wcGluZy5cbiAgX2ZsdXNoKCkge1xuICAgIGlmICh0aGlzLl93cml0ZUluZGV4IDw9IDApIHJldHVybjtcbiAgICBjb25zdCBzbGljZSA9IHRoaXMuX2J1ZmZlci5zdWJhcnJheSgwLCB0aGlzLl93cml0ZUluZGV4KTtcbiAgICBjb25zdCBjb3B5ID0gbmV3IEZsb2F0MzJBcnJheShzbGljZS5sZW5ndGgpO1xuICAgIGNvcHkuc2V0KHNsaWNlKTtcbiAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNodW5rXCIsIHNhbXBsZXM6IGNvcHkgfSwgW2NvcHkuYnVmZmVyXSk7XG4gICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9jaHVua1NpemUpO1xuICAgIHRoaXMuX3dyaXRlSW5kZXggPSAwO1xuICB9XG5cbiAgcHJvY2VzcyhpbnB1dHMpIHtcbiAgICBpZiAoIXRoaXMuX3JlY29yZGluZykgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFpbnB1dHMgfHwgIWlucHV0cy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IGlucHV0c1swXSAmJiBpbnB1dHNbMF1bMF07XG4gICAgaWYgKCFjaGFubmVsKSByZXR1cm4gdHJ1ZTtcblxuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIHdoaWxlIChvZmZzZXQgPCBjaGFubmVsLmxlbmd0aCkge1xuICAgICAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5fYnVmZmVyLmxlbmd0aCAtIHRoaXMuX3dyaXRlSW5kZXg7XG4gICAgICBjb25zdCB0b0NvcHkgPSBNYXRoLm1pbihyZW1haW5pbmcsIGNoYW5uZWwubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgIHRoaXMuX2J1ZmZlci5zZXQoY2hhbm5lbC5zdWJhcnJheShvZmZzZXQsIG9mZnNldCArIHRvQ29weSksIHRoaXMuX3dyaXRlSW5kZXgpO1xuICAgICAgdGhpcy5fd3JpdGVJbmRleCArPSB0b0NvcHk7XG4gICAgICBvZmZzZXQgKz0gdG9Db3B5O1xuXG4gICAgICBpZiAodGhpcy5fd3JpdGVJbmRleCA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGZ1bGwgPSB0aGlzLl9idWZmZXI7XG4gICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2h1bmtcIiwgc2FtcGxlczogZnVsbCB9LCBbZnVsbC5idWZmZXJdKTtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9jaHVua1NpemUpO1xuICAgICAgICB0aGlzLl93cml0ZUluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXHJcbnJlZ2lzdGVyUHJvY2Vzc29yKFwiaW5kLWF1ZGlvLWNhcHR1cmVcIiwgSW5kQXVkaW9DYXB0dXJlUHJvY2Vzc29yKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBO0FBQUE7QUFFQSxVQUFNLDJCQUFOLGNBQXVDLHNCQUFzQjtBQUFBLFFBQzNELGNBQWM7QUFDWixnQkFBTTtBQUNOLGVBQUssYUFBYTtBQUNsQixlQUFLLGFBQWE7QUFDbEIsZUFBSyxVQUFVLElBQUksYUFBYSxLQUFLLFVBQVU7QUFDL0MsZUFBSyxjQUFjO0FBQ25CLGVBQUssS0FBSyxZQUFZLENBQUMsVUFBVTtBQUMvQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQU07QUFDM0IsZ0JBQUksTUFBTSxLQUFLLFNBQVMsZ0JBQWdCO0FBQ3RDLG9CQUFNLGdCQUFnQixDQUFDLENBQUMsTUFBTSxLQUFLO0FBQ25DLGtCQUFJLEtBQUssY0FBYyxDQUFDLGVBQWU7QUFDckMscUJBQUssT0FBTztBQUFBLGNBQ2Q7QUFDQSxtQkFBSyxhQUFhO0FBQUEsWUFDcEI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBO0FBQUEsUUFHQSxTQUFTO0FBQ1AsY0FBSSxLQUFLLGVBQWUsRUFBRztBQUMzQixnQkFBTSxRQUFRLEtBQUssUUFBUSxTQUFTLEdBQUcsS0FBSyxXQUFXO0FBQ3ZELGdCQUFNLE9BQU8sSUFBSSxhQUFhLE1BQU0sTUFBTTtBQUMxQyxlQUFLLElBQUksS0FBSztBQUNkLGVBQUssS0FBSyxZQUFZLEVBQUUsTUFBTSxTQUFTLFNBQVMsS0FBSyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUM7QUFDckUsZUFBSyxVQUFVLElBQUksYUFBYSxLQUFLLFVBQVU7QUFDL0MsZUFBSyxjQUFjO0FBQUEsUUFDckI7QUFBQSxRQUVBLFFBQVEsUUFBUTtBQUNkLGNBQUksQ0FBQyxLQUFLLFdBQVksUUFBTztBQUM3QixjQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sT0FBUSxRQUFPO0FBRXRDLGdCQUFNLFVBQVUsT0FBTyxDQUFDLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUN4QyxjQUFJLENBQUMsUUFBUyxRQUFPO0FBRXJCLGNBQUksU0FBUztBQUNiLGlCQUFPLFNBQVMsUUFBUSxRQUFRO0FBQzlCLGtCQUFNLFlBQVksS0FBSyxRQUFRLFNBQVMsS0FBSztBQUM3QyxrQkFBTSxTQUFTLEtBQUssSUFBSSxXQUFXLFFBQVEsU0FBUyxNQUFNO0FBQzFELGlCQUFLLFFBQVEsSUFBSSxRQUFRLFNBQVMsUUFBUSxTQUFTLE1BQU0sR0FBRyxLQUFLLFdBQVc7QUFDNUUsaUJBQUssZUFBZTtBQUNwQixzQkFBVTtBQUVWLGdCQUFJLEtBQUssZUFBZSxLQUFLLFFBQVEsUUFBUTtBQUMzQyxvQkFBTSxPQUFPLEtBQUs7QUFDbEIsbUJBQUssS0FBSyxZQUFZLEVBQUUsTUFBTSxTQUFTLFNBQVMsS0FBSyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUM7QUFDckUsbUJBQUssVUFBVSxJQUFJLGFBQWEsS0FBSyxVQUFVO0FBQy9DLG1CQUFLLGNBQWM7QUFBQSxZQUNyQjtBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBRUEsd0JBQWtCLHFCQUFxQix3QkFBd0I7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
