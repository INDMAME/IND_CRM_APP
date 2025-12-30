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
      };
      registerProcessor("ind-audio-capture", IndAudioCaptureProcessor);
    }
  });
  require_ind_audio_worklet();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3QvYXVkaW8tcmVjb3JkZXIvaW5kLWF1ZGlvLXdvcmtsZXQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEF1ZGlvV29ya2xldCBwcm9jZXNzb3IgZm9yIGNhcHR1cmluZyBtb25vIGlucHV0IGFzIEZsb2F0MzJBcnJheSBjaHVua3MuXG4vLyBUaGlzIHJ1bnMgaW4gdGhlIEF1ZGlvV29ya2xldCBnbG9iYWwgc2NvcGUuXG5jbGFzcyBJbmRBdWRpb0NhcHR1cmVQcm9jZXNzb3IgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3JlY29yZGluZyA9IHRydWU7XG4gICAgdGhpcy5wb3J0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKCFldmVudCB8fCAhZXZlbnQuZGF0YSkgcmV0dXJuO1xuICAgICAgaWYgKGV2ZW50LmRhdGEudHlwZSA9PT0gXCJzZXRSZWNvcmRpbmdcIikge1xuICAgICAgICB0aGlzLl9yZWNvcmRpbmcgPSAhIWV2ZW50LmRhdGEudmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHByb2Nlc3MoaW5wdXRzKSB7XG4gICAgaWYgKCF0aGlzLl9yZWNvcmRpbmcpIHJldHVybiB0cnVlO1xuICAgIGlmICghaW5wdXRzIHx8ICFpbnB1dHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSBpbnB1dHNbMF0gJiYgaW5wdXRzWzBdWzBdO1xuICAgIGlmICghY2hhbm5lbCkgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3IEZsb2F0MzJBcnJheShjaGFubmVsLmxlbmd0aCk7XG4gICAgY29weS5zZXQoY2hhbm5lbCk7XG4gICAgdGhpcy5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjaHVua1wiLCBzYW1wbGVzOiBjb3B5IH0sIFtjb3B5LmJ1ZmZlcl0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxucmVnaXN0ZXJQcm9jZXNzb3IoXCJpbmQtYXVkaW8tY2FwdHVyZVwiLCBJbmRBdWRpb0NhcHR1cmVQcm9jZXNzb3IpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBO0FBQUE7QUFFQSxVQUFNLDJCQUFOLGNBQXVDLHNCQUFzQjtBQUFBLFFBQzNELGNBQWM7QUFDWixnQkFBTTtBQUNOLGVBQUssYUFBYTtBQUNsQixlQUFLLEtBQUssWUFBWSxDQUFDLFVBQVU7QUFDL0IsZ0JBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFNO0FBQzNCLGdCQUFJLE1BQU0sS0FBSyxTQUFTLGdCQUFnQjtBQUN0QyxtQkFBSyxhQUFhLENBQUMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxZQUNqQztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFFQSxRQUFRLFFBQVE7QUFDZCxjQUFJLENBQUMsS0FBSyxXQUFZLFFBQU87QUFDN0IsY0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLE9BQVEsUUFBTztBQUV0QyxnQkFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDeEMsY0FBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixnQkFBTSxPQUFPLElBQUksYUFBYSxRQUFRLE1BQU07QUFDNUMsZUFBSyxJQUFJLE9BQU87QUFDaEIsZUFBSyxLQUFLLFlBQVksRUFBRSxNQUFNLFNBQVMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUVyRSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBRUEsd0JBQWtCLHFCQUFxQix3QkFBd0I7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
