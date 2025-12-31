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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3QvYXVkaW8tcmVjb3JkZXIvaW5kLWF1ZGlvLXdvcmtsZXQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEF1ZGlvV29ya2xldCBwcm9jZXNzb3IgZm9yIGNhcHR1cmluZyBtb25vIGlucHV0IGFzIEZsb2F0MzJBcnJheSBjaHVua3MuXHJcbi8vIFRoaXMgcnVucyBpbiB0aGUgQXVkaW9Xb3JrbGV0IGdsb2JhbCBzY29wZS5cclxuY2xhc3MgSW5kQXVkaW9DYXB0dXJlUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLl9yZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5wb3J0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIWV2ZW50IHx8ICFldmVudC5kYXRhKSByZXR1cm47XHJcbiAgICAgIGlmIChldmVudC5kYXRhLnR5cGUgPT09IFwic2V0UmVjb3JkaW5nXCIpIHtcclxuICAgICAgICB0aGlzLl9yZWNvcmRpbmcgPSAhIWV2ZW50LmRhdGEudmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzKGlucHV0cykge1xyXG4gICAgaWYgKCF0aGlzLl9yZWNvcmRpbmcpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKCFpbnB1dHMgfHwgIWlucHV0cy5sZW5ndGgpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNoYW5uZWwgPSBpbnB1dHNbMF0gJiYgaW5wdXRzWzBdWzBdO1xyXG4gICAgaWYgKCFjaGFubmVsKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBjb3B5ID0gbmV3IEZsb2F0MzJBcnJheShjaGFubmVsLmxlbmd0aCk7XHJcbiAgICBjb3B5LnNldChjaGFubmVsKTtcclxuICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2h1bmtcIiwgc2FtcGxlczogY29weSB9LCBbY29weS5idWZmZXJdKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyUHJvY2Vzc29yKFwiaW5kLWF1ZGlvLWNhcHR1cmVcIiwgSW5kQXVkaW9DYXB0dXJlUHJvY2Vzc29yKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBO0FBQUE7QUFFQSxVQUFNLDJCQUFOLGNBQXVDLHNCQUFzQjtBQUFBLFFBQzNELGNBQWM7QUFDWixnQkFBTTtBQUNOLGVBQUssYUFBYTtBQUNsQixlQUFLLEtBQUssWUFBWSxDQUFDLFVBQVU7QUFDL0IsZ0JBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFNO0FBQzNCLGdCQUFJLE1BQU0sS0FBSyxTQUFTLGdCQUFnQjtBQUN0QyxtQkFBSyxhQUFhLENBQUMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxZQUNqQztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFFQSxRQUFRLFFBQVE7QUFDZCxjQUFJLENBQUMsS0FBSyxXQUFZLFFBQU87QUFDN0IsY0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLE9BQVEsUUFBTztBQUV0QyxnQkFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDeEMsY0FBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixnQkFBTSxPQUFPLElBQUksYUFBYSxRQUFRLE1BQU07QUFDNUMsZUFBSyxJQUFJLE9BQU87QUFDaEIsZUFBSyxLQUFLLFlBQVksRUFBRSxNQUFNLFNBQVMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUVyRSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBRUEsd0JBQWtCLHFCQUFxQix3QkFBd0I7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
