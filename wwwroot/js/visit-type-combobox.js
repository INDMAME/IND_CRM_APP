(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            oldElement.props,
            oldElement._owner,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 1;
                  payload._result = moduleObject;
                  var _ioInfo = payload._ioInfo;
                  null != _ioInfo && (_ioInfo.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 2;
                  payload._result = error;
                  var _ioInfo2 = payload._ioInfo;
                  null != _ioInfo2 && (_ioInfo2.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              }
            );
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
              ioInfo.value = thenable;
              var displayName = thenable.displayName;
              "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
          }
          if (1 === payload._status)
            return ioInfo = payload._result, void 0 === ioInfo && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo
            ), "default" in ioInfo || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo
            ), ioInfo.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function releaseAsyncTransition() {
          ReactSharedInternals.asyncTransitions--;
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        };
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        var fnName = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Activity = REACT_ACTIVITY_TYPE;
        exports.Children = fnName;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.cacheSignal = function() {
          return null;
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            props,
            owner,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            validateChildKeys(arguments[key]);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i]);
          i = {};
          var key = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          key && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            key,
            i,
            getOwner(),
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          ctor = { _status: -1, _result: ctor };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
          }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
          };
          ctor._ioInfo = ioInfo;
          lazyType._debugInfo = [{ awaited: ioInfo }];
          return lazyType;
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
              "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
            ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useEffect(create, deps);
        };
        exports.useEffectEvent = function(callback) {
          return resolveDispatcher().useEffectEvent(callback);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.2.1";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.development.js
  var require_react_dom_development = __commonJS({
    "node_modules/react-dom/cjs/react-dom.development.js"(exports) {
      "use strict";
      (function() {
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function createPortal$1(children, containerInfo, implementation) {
          var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
          try {
            testStringCoercion(key);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          JSCompiler_inline_result && (console.error(
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"
          ), testStringCoercion(key));
          return {
            $$typeof: REACT_PORTAL_TYPE,
            key: null == key ? null : "" + key,
            children,
            containerInfo,
            implementation
          };
        }
        function getCrossOriginStringAs(as, input) {
          if ("font" === as) return "";
          if ("string" === typeof input)
            return "use-credentials" === input ? input : "";
        }
        function getValueDescriptorExpectingObjectForWarning(thing) {
          return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
        }
        function getValueDescriptorExpectingEnumForWarning(thing) {
          return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var React3 = require_react(), Internals = {
          d: {
            f: noop,
            r: function() {
              throw Error(
                "Invalid form element. requestFormReset must be passed a form that was rendered by React."
              );
            },
            D: noop,
            C: noop,
            L: noop,
            m: noop,
            X: noop,
            S: noop,
            M: noop
          },
          p: 0,
          findDOMNode: null
        }, REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
        "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error(
          "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
        );
        exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
        exports.createPortal = function(children, container) {
          var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
          if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
            throw Error("Target container is not a DOM element.");
          return createPortal$1(children, container, null, key);
        };
        exports.flushSync = function(fn) {
          var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
          try {
            if (ReactSharedInternals.T = null, Internals.p = 2, fn)
              return fn();
          } finally {
            ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error(
              "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
            );
          }
        };
        exports.preconnect = function(href, options) {
          "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error(
            "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
            getValueDescriptorExpectingEnumForWarning(options)
          ) : null != options && "string" !== typeof options.crossOrigin && console.error(
            "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
            getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
          ) : console.error(
            "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
          "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
        };
        exports.prefetchDNS = function(href) {
          if ("string" !== typeof href || !href)
            console.error(
              "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
              getValueDescriptorExpectingObjectForWarning(href)
            );
          else if (1 < arguments.length) {
            var options = arguments[1];
            "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            ) : console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            );
          }
          "string" === typeof href && Internals.d.D(href);
        };
        exports.preinit = function(href, options) {
          "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error(
            "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
            getValueDescriptorExpectingEnumForWarning(options)
          ) : "style" !== options.as && "script" !== options.as && console.error(
            'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
            getValueDescriptorExpectingEnumForWarning(options.as)
          ) : console.error(
            "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
          if ("string" === typeof href && options && "string" === typeof options.as) {
            var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
            "style" === as ? Internals.d.S(
              href,
              "string" === typeof options.precedence ? options.precedence : void 0,
              {
                crossOrigin,
                integrity,
                fetchPriority
              }
            ) : "script" === as && Internals.d.X(href, {
              crossOrigin,
              integrity,
              fetchPriority,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
          }
        };
        exports.preinitModule = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
          if (encountered)
            console.error(
              "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
              encountered
            );
          else
            switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
              case "script":
                break;
              default:
                encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error(
                  'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                  encountered,
                  href
                );
            }
          if ("string" === typeof href)
            if ("object" === typeof options && null !== options) {
              if (null == options.as || "script" === options.as)
                encountered = getCrossOriginStringAs(
                  options.as,
                  options.crossOrigin
                ), Internals.d.M(href, {
                  crossOrigin: encountered,
                  integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                  nonce: "string" === typeof options.nonce ? options.nonce : void 0
                });
            } else null == options && Internals.d.M(href);
        };
        exports.preload = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
          encountered && console.error(
            'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
            encountered
          );
          if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
            encountered = options.as;
            var crossOrigin = getCrossOriginStringAs(
              encountered,
              options.crossOrigin
            );
            Internals.d.L(href, encountered, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0,
              type: "string" === typeof options.type ? options.type : void 0,
              fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
              referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
              imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
              imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
              media: "string" === typeof options.media ? options.media : void 0
            });
          }
        };
        exports.preloadModule = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
          encountered && console.error(
            'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
            encountered
          );
          "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          ), Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin: encountered,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
          })) : Internals.d.m(href));
        };
        exports.requestFormReset = function(form) {
          Internals.d.r(form);
        };
        exports.unstable_batchedUpdates = function(fn, a) {
          return fn(a);
        };
        exports.useFormState = function(action, initialState, permalink) {
          return resolveDispatcher().useFormState(action, initialState, permalink);
        };
        exports.useFormStatus = function() {
          return resolveDispatcher().useHostTransitionStatus();
        };
        exports.version = "19.2.1";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      if (false) {
        checkDCE();
        module.exports = null;
      } else {
        module.exports = require_react_dom_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
          var children = config.children;
          if (void 0 !== children)
            if (isStaticChildren)
              if (isArrayImpl(children)) {
                for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                  validateChildKeys(children[isStaticChildren]);
                Object.freeze && Object.freeze(children);
              } else
                console.error(
                  "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                );
            else validateChildKeys(children);
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(
            type,
            children,
            maybeKey,
            getOwner(),
            debugStack,
            debugTask
          );
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var React3 = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        React3 = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = React3.react_stack_bottom_frame.bind(
          React3,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutKeySpread = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            false,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.jsxs = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            true,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // wwwroot/react/visitas/visit-type-combobox.jsx
  var import_react2 = __toESM(require_react());
  var import_react_dom = __toESM(require_react_dom());

  // wwwroot/react/visitas/chevrons.jsx
  var import_react = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className,
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
      }
    );
  };
  var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className,
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
      }
    );
  };

  // wwwroot/react/visitas/visit-type-combobox.jsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  function normalizeOption(opt) {
    if (!opt) return { value: "", text: "" };
    return {
      value: opt.value ?? opt.Value ?? "",
      text: opt.text ?? opt.Text ?? ""
    };
  }
  var classNames = (...classes) => classes.filter(Boolean).join(" ");
  function useFloatingPosition(targetRef, open) {
    const [style, setStyle] = (0, import_react2.useState)({ top: 0, left: 0, width: 0 });
    (0, import_react2.useLayoutEffect)(() => {
      if (!open || !targetRef.current) return;
      const update = () => {
        const rect = targetRef.current.getBoundingClientRect();
        setStyle({
          top: rect.bottom + 6,
          left: rect.left,
          width: rect.width
        });
      };
      update();
      const onScroll = () => open && update();
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", update);
      };
    }, [open, targetRef]);
    return style;
  }
  function FloatingList({ anchorRef, open, zIndex = 36e4, maxHeightClass = "max-h-72", children }) {
    const style = useFloatingPosition(anchorRef, open);
    if (!open) return null;
    return (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          style: {
            position: "fixed",
            top: style.top,
            left: style.left,
            width: style.width,
            zIndex
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none ${maxHeightClass}`, children })
        }
      ),
      document.body
    );
  }
  function useOutsideClick(refs, onClose) {
    (0, import_react2.useEffect)(() => {
      const list = Array.isArray(refs) ? refs : [refs];
      const handler = (ev) => {
        const inside = list.some((r) => r?.current && r.current.contains(ev.target));
        if (inside) return;
        onClose();
      };
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
      };
    }, [onClose, refs]);
  }
  var VisitTypeCombobox = ({ options = [], targetId = "visitType" }) => {
    const normalized = (0, import_react2.useMemo)(() => options.map(normalizeOption), [options]);
    const [query, setQuery] = (0, import_react2.useState)("");
    const [selected, setSelected] = (0, import_react2.useState)(
      normalized.find((x) => x.value) ?? { value: "", text: "" }
    );
    const [open, setOpen] = (0, import_react2.useState)(false);
    const [activeIndex, setActiveIndex] = (0, import_react2.useState)(0);
    const containerRef = (0, import_react2.useRef)(null);
    const boxRef = (0, import_react2.useRef)(null);
    const listRef = (0, import_react2.useRef)(null);
    (0, import_react2.useEffect)(() => {
      const select = document.getElementById(targetId);
      if (select && selected) {
        select.value = selected.value;
        select.dispatchEvent(new Event("change"));
      }
    }, [selected, targetId]);
    const filtered = query.trim() === "" ? normalized : normalized.filter(
      (opt) => opt.text.toLowerCase().includes(query.toLowerCase())
    );
    (0, import_react2.useEffect)(() => {
      setActiveIndex(0);
    }, [query, normalized.length]);
    (0, import_react2.useEffect)(() => {
      if (selected?.text) setQuery(selected.text);
    }, [selected]);
    useOutsideClick([containerRef, listRef], () => setOpen(false));
    const selectOption = (opt) => {
      setSelected(opt);
      setQuery(opt.text);
      setOpen(false);
    };
    const onKeyDown = (ev) => {
      if (!open && (ev.key === "ArrowDown" || ev.key === "Enter")) {
        setOpen(true);
        return;
      }
      if (!filtered.length) return;
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        setActiveIndex((idx) => (idx + 1) % filtered.length);
      }
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      }
      if (ev.key === "Enter") {
        ev.preventDefault();
        selectOption(filtered[activeIndex] ?? filtered[0]);
      }
      if (ev.key === "Escape") {
        setOpen(false);
      }
    };
    if (!normalized.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "relative z-[140000]", ref: containerRef, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          ref: boxRef,
          className: "relative w-full cursor-default rounded-md border border-slate-300 bg-white text-left shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary sm:text-sm",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                className: "w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-none",
                value: query,
                onChange: (event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                },
                onFocus: () => setOpen(true),
                onKeyDown,
                "aria-label": "Tipo de visita",
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": "visit-type-options",
                "aria-activedescendant": open && filtered[activeIndex] ? `visit-type-${filtered[activeIndex].value}` : void 0
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600",
                onClick: () => setOpen((prev) => !prev),
                "aria-label": open ? "Ocultar opciones" : "Mostrar opciones",
                children: open ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FloatingList, { anchorRef: boxRef, open, zIndex: 36e4, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: listRef, role: "listbox", "aria-label": "Tipo de visita", children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "relative cursor-default select-none px-4 py-2 text-slate-700", children: "Sin resultados" }) : filtered.map((opt, idx) => {
        const isActive = idx === activeIndex;
        const isSelected = selected?.value === opt.value;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            id: `visit-type-${opt.value}`,
            role: "option",
            "aria-selected": isSelected,
            className: classNames(
              "relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-3 text-left text-sm",
              isActive ? "bg-primary text-white" : isSelected ? "bg-primary/10 text-primary" : "text-slate-900"
            ),
            onMouseEnter: () => setActiveIndex(idx),
            onClick: () => selectOption(opt),
            children: [
              isSelected && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "span",
                {
                  className: classNames(
                    "absolute inset-y-0 left-0 flex items-center pl-2",
                    isActive ? "text-white" : "text-primary"
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: classNames("block truncate pr-2", isSelected ? "font-medium" : "font-normal"), children: opt.text })
            ]
          },
          opt.value
        );
      }) }) })
    ] }) });
  };
  var mount = () => {
    const root = document.getElementById("visit-type-combobox-root");
    if (!root) return;
    const data = window.__VISIT_TYPES__ || [];
    import_react_dom.default.render(
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitTypeCombobox, { options: data, targetId: "visitType" }),
      root
    );
  };
  if (document.readyState === "complete") {
    mount();
  } else {
    window.addEventListener("DOMContentLoaded", mount);
  }
  var visit_type_combobox_default = VisitTypeCombobox;
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.development.js:
  (**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9janMvcmVhY3QtZG9tLmRldmVsb3BtZW50LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUuanMiLCAiLi4vcmVhY3QvdmlzaXRhcy92aXNpdC10eXBlLWNvbWJvYm94LmpzeCIsICIuLi9yZWFjdC92aXNpdGFzL2NoZXZyb25zLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIFwiJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXNcIixcbiAgICAgICAgICAgIGluZm9bMF0sXG4gICAgICAgICAgICBpbmZvWzFdXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgICAgaWYgKG51bGwgPT09IG1heWJlSXRlcmFibGUgfHwgXCJvYmplY3RcIiAhPT0gdHlwZW9mIG1heWJlSXRlcmFibGUpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgbWF5YmVJdGVyYWJsZSA9XG4gICAgICAgIChNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdKSB8fFxuICAgICAgICBtYXliZUl0ZXJhYmxlW1wiQEBpdGVyYXRvclwiXTtcbiAgICAgIHJldHVybiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBtYXliZUl0ZXJhYmxlID8gbWF5YmVJdGVyYWJsZSA6IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gICAgICBwdWJsaWNJbnN0YW5jZSA9XG4gICAgICAgICgocHVibGljSW5zdGFuY2UgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcikgJiZcbiAgICAgICAgICAocHVibGljSW5zdGFuY2UuZGlzcGxheU5hbWUgfHwgcHVibGljSW5zdGFuY2UubmFtZSkpIHx8XG4gICAgICAgIFwiUmVhY3RDbGFzc1wiO1xuICAgICAgdmFyIHdhcm5pbmdLZXkgPSBwdWJsaWNJbnN0YW5jZSArIFwiLlwiICsgY2FsbGVyTmFtZTtcbiAgICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSB8fFxuICAgICAgICAoY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkNhbid0IGNhbGwgJXMgb24gYSBjb21wb25lbnQgdGhhdCBpcyBub3QgeWV0IG1vdW50ZWQuIFRoaXMgaXMgYSBuby1vcCwgYnV0IGl0IG1pZ2h0IGluZGljYXRlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uIEluc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCBjbGFzcyBwcm9wZXJ0eSB3aXRoIHRoZSBkZXNpcmVkIHN0YXRlIGluIHRoZSAlcyBjb21wb25lbnQuXCIsXG4gICAgICAgICAgY2FsbGVyTmFtZSxcbiAgICAgICAgICBwdWJsaWNJbnN0YW5jZVxuICAgICAgICApLFxuICAgICAgICAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldID0gITApKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG4gICAgZnVuY3Rpb24gUHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gICAgZnVuY3Rpb24gdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gXCJcIiArIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja0tleVN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITE7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9ICEwO1xuICAgICAgfVxuICAgICAgaWYgKEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCkge1xuICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQgPSBjb25zb2xlO1xuICAgICAgICB2YXIgSlNDb21waWxlcl90ZW1wX2NvbnN0ID0gSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0LmVycm9yO1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0JGpzY29tcCQwID1cbiAgICAgICAgICAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgU3ltYm9sICYmXG4gICAgICAgICAgICBTeW1ib2wudG9TdHJpbmdUYWcgJiZcbiAgICAgICAgICAgIHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10pIHx8XG4gICAgICAgICAgdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fFxuICAgICAgICAgIFwiT2JqZWN0XCI7XG4gICAgICAgIEpTQ29tcGlsZXJfdGVtcF9jb25zdC5jYWxsKFxuICAgICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCxcbiAgICAgICAgICBcIlRoZSBwcm92aWRlZCBrZXkgaXMgYW4gdW5zdXBwb3J0ZWQgdHlwZSAlcy4gVGhpcyB2YWx1ZSBtdXN0IGJlIGNvZXJjZWQgdG8gYSBzdHJpbmcgYmVmb3JlIHVzaW5nIGl0IGhlcmUuXCIsXG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0JGpzY29tcCQwXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSkge1xuICAgICAgaWYgKG51bGwgPT0gdHlwZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgdHlwZSlcbiAgICAgICAgcmV0dXJuIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0VcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHR5cGUpIHJldHVybiB0eXBlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJGcmFnbWVudFwiO1xuICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiUHJvZmlsZXJcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN0cmljdE1vZGVcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN1c3BlbnNlXCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN1c3BlbnNlTGlzdFwiO1xuICAgICAgICBjYXNlIFJFQUNUX0FDVElWSVRZX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiQWN0aXZpdHlcIjtcbiAgICAgIH1cbiAgICAgIGlmIChcIm9iamVjdFwiID09PSB0eXBlb2YgdHlwZSlcbiAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAoXCJudW1iZXJcIiA9PT0gdHlwZW9mIHR5cGUudGFnICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIlJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgb2JqZWN0IGluIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSgpLiBUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgdHlwZS4kJHR5cGVvZilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBvcnRhbFwiO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgXCJDb250ZXh0XCI7XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05TVU1FUl9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuICh0eXBlLl9jb250ZXh0LmRpc3BsYXlOYW1lIHx8IFwiQ29udGV4dFwiKSArIFwiLkNvbnN1bWVyXCI7XG4gICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgdmFyIGlubmVyVHlwZSA9IHR5cGUucmVuZGVyO1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUuZGlzcGxheU5hbWU7XG4gICAgICAgICAgICB0eXBlIHx8XG4gICAgICAgICAgICAgICgodHlwZSA9IGlubmVyVHlwZS5kaXNwbGF5TmFtZSB8fCBpbm5lclR5cGUubmFtZSB8fCBcIlwiKSxcbiAgICAgICAgICAgICAgKHR5cGUgPSBcIlwiICE9PSB0eXBlID8gXCJGb3J3YXJkUmVmKFwiICsgdHlwZSArIFwiKVwiIDogXCJGb3J3YXJkUmVmXCIpKTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgKGlubmVyVHlwZSA9IHR5cGUuZGlzcGxheU5hbWUgfHwgbnVsbCksXG4gICAgICAgICAgICAgIG51bGwgIT09IGlubmVyVHlwZVxuICAgICAgICAgICAgICAgID8gaW5uZXJUeXBlXG4gICAgICAgICAgICAgICAgOiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZS50eXBlKSB8fCBcIk1lbW9cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgIGlubmVyVHlwZSA9IHR5cGUuX3BheWxvYWQ7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS5faW5pdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZShpbm5lclR5cGUpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRUYXNrTmFtZSh0eXBlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkgcmV0dXJuIFwiPD5cIjtcbiAgICAgIGlmIChcbiAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHR5cGUgJiZcbiAgICAgICAgbnVsbCAhPT0gdHlwZSAmJlxuICAgICAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEVcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIFwiPC4uLj5cIjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgICByZXR1cm4gbmFtZSA/IFwiPFwiICsgbmFtZSArIFwiPlwiIDogXCI8Li4uPlwiO1xuICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICByZXR1cm4gXCI8Li4uPlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRPd25lcigpIHtcbiAgICAgIHZhciBkaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuQTtcbiAgICAgIHJldHVybiBudWxsID09PSBkaXNwYXRjaGVyID8gbnVsbCA6IGRpc3BhdGNoZXIuZ2V0T3duZXIoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gVW5rbm93bk93bmVyKCkge1xuICAgICAgcmV0dXJuIEVycm9yKFwicmVhY3Qtc3RhY2stdG9wLWZyYW1lXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgXCJrZXlcIikpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCBcImtleVwiKS5nZXQ7XG4gICAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSByZXR1cm4gITE7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwICE9PSBjb25maWcua2V5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgICAgIGZ1bmN0aW9uIHdhcm5BYm91dEFjY2Vzc2luZ0tleSgpIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gfHxcbiAgICAgICAgICAoKHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gITApLFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBcIiVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgdmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCBwcm9wLiAoaHR0cHM6Ly9yZWFjdC5kZXYvbGluay9zcGVjaWFsLXByb3BzKVwiLFxuICAgICAgICAgICAgZGlzcGxheU5hbWVcbiAgICAgICAgICApKTtcbiAgICAgIH1cbiAgICAgIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9ICEwO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCBcImtleVwiLCB7XG4gICAgICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZWxlbWVudFJlZkdldHRlcldpdGhEZXByZWNhdGlvbldhcm5pbmcoKSB7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0aGlzLnR5cGUpO1xuICAgICAgZGlkV2FybkFib3V0RWxlbWVudFJlZltjb21wb25lbnROYW1lXSB8fFxuICAgICAgICAoKGRpZFdhcm5BYm91dEVsZW1lbnRSZWZbY29tcG9uZW50TmFtZV0gPSAhMCksXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJBY2Nlc3NpbmcgZWxlbWVudC5yZWYgd2FzIHJlbW92ZWQgaW4gUmVhY3QgMTkuIHJlZiBpcyBub3cgYSByZWd1bGFyIHByb3AuIEl0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBKU1ggRWxlbWVudCB0eXBlIGluIGEgZnV0dXJlIHJlbGVhc2UuXCJcbiAgICAgICAgKSk7XG4gICAgICBjb21wb25lbnROYW1lID0gdGhpcy5wcm9wcy5yZWY7XG4gICAgICByZXR1cm4gdm9pZCAwICE9PSBjb21wb25lbnROYW1lID8gY29tcG9uZW50TmFtZSA6IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHByb3BzLCBvd25lciwgZGVidWdTdGFjaywgZGVidWdUYXNrKSB7XG4gICAgICB2YXIgcmVmUHJvcCA9IHByb3BzLnJlZjtcbiAgICAgIHR5cGUgPSB7XG4gICAgICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgIF9vd25lcjogb3duZXJcbiAgICAgIH07XG4gICAgICBudWxsICE9PSAodm9pZCAwICE9PSByZWZQcm9wID8gcmVmUHJvcCA6IG51bGwpXG4gICAgICAgID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwicmVmXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICAgICAgZ2V0OiBlbGVtZW50UmVmR2V0dGVyV2l0aERlcHJlY2F0aW9uV2FybmluZ1xuICAgICAgICAgIH0pXG4gICAgICAgIDogT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwicmVmXCIsIHsgZW51bWVyYWJsZTogITEsIHZhbHVlOiBudWxsIH0pO1xuICAgICAgdHlwZS5fc3RvcmUgPSB7fTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLl9zdG9yZSwgXCJ2YWxpZGF0ZWRcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogMFxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdJbmZvXCIsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiAhMSxcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwiX2RlYnVnU3RhY2tcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogZGVidWdTdGFja1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdUYXNrXCIsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiAhMSxcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgdmFsdWU6IGRlYnVnVGFza1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuZnJlZXplICYmIChPYmplY3QuZnJlZXplKHR5cGUucHJvcHMpLCBPYmplY3QuZnJlZXplKHR5cGUpKTtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9uZUFuZFJlcGxhY2VLZXkob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gICAgICBuZXdLZXkgPSBSZWFjdEVsZW1lbnQoXG4gICAgICAgIG9sZEVsZW1lbnQudHlwZSxcbiAgICAgICAgbmV3S2V5LFxuICAgICAgICBvbGRFbGVtZW50LnByb3BzLFxuICAgICAgICBvbGRFbGVtZW50Ll9vd25lcixcbiAgICAgICAgb2xkRWxlbWVudC5fZGVidWdTdGFjayxcbiAgICAgICAgb2xkRWxlbWVudC5fZGVidWdUYXNrXG4gICAgICApO1xuICAgICAgb2xkRWxlbWVudC5fc3RvcmUgJiZcbiAgICAgICAgKG5ld0tleS5fc3RvcmUudmFsaWRhdGVkID0gb2xkRWxlbWVudC5fc3RvcmUudmFsaWRhdGVkKTtcbiAgICAgIHJldHVybiBuZXdLZXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUpIHtcbiAgICAgIGlzVmFsaWRFbGVtZW50KG5vZGUpXG4gICAgICAgID8gbm9kZS5fc3RvcmUgJiYgKG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IDEpXG4gICAgICAgIDogXCJvYmplY3RcIiA9PT0gdHlwZW9mIG5vZGUgJiZcbiAgICAgICAgICBudWxsICE9PSBub2RlICYmXG4gICAgICAgICAgbm9kZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFICYmXG4gICAgICAgICAgKFwiZnVsZmlsbGVkXCIgPT09IG5vZGUuX3BheWxvYWQuc3RhdHVzXG4gICAgICAgICAgICA/IGlzVmFsaWRFbGVtZW50KG5vZGUuX3BheWxvYWQudmFsdWUpICYmXG4gICAgICAgICAgICAgIG5vZGUuX3BheWxvYWQudmFsdWUuX3N0b3JlICYmXG4gICAgICAgICAgICAgIChub2RlLl9wYXlsb2FkLnZhbHVlLl9zdG9yZS52YWxpZGF0ZWQgPSAxKVxuICAgICAgICAgICAgOiBub2RlLl9zdG9yZSAmJiAobm9kZS5fc3RvcmUudmFsaWRhdGVkID0gMSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiBvYmplY3QgJiZcbiAgICAgICAgbnVsbCAhPT0gb2JqZWN0ICYmXG4gICAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG4gICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gICAgICB2YXIgZXNjYXBlckxvb2t1cCA9IHsgXCI9XCI6IFwiPTBcIiwgXCI6XCI6IFwiPTJcIiB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgXCIkXCIgK1xuICAgICAgICBrZXkucmVwbGFjZSgvWz06XS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50S2V5KGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICByZXR1cm4gXCJvYmplY3RcIiA9PT0gdHlwZW9mIGVsZW1lbnQgJiZcbiAgICAgICAgbnVsbCAhPT0gZWxlbWVudCAmJlxuICAgICAgICBudWxsICE9IGVsZW1lbnQua2V5XG4gICAgICAgID8gKGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oZWxlbWVudC5rZXkpLCBlc2NhcGUoXCJcIiArIGVsZW1lbnQua2V5KSlcbiAgICAgICAgOiBpbmRleC50b1N0cmluZygzNik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVUaGVuYWJsZSh0aGVuYWJsZSkge1xuICAgICAgc3dpdGNoICh0aGVuYWJsZS5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSBcImZ1bGZpbGxlZFwiOlxuICAgICAgICAgIHJldHVybiB0aGVuYWJsZS52YWx1ZTtcbiAgICAgICAgY2FzZSBcInJlamVjdGVkXCI6XG4gICAgICAgICAgdGhyb3cgdGhlbmFibGUucmVhc29uO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHN3aXRjaCAoXG4gICAgICAgICAgICAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHRoZW5hYmxlLnN0YXR1c1xuICAgICAgICAgICAgICA/IHRoZW5hYmxlLnRoZW4obm9vcCwgbm9vcClcbiAgICAgICAgICAgICAgOiAoKHRoZW5hYmxlLnN0YXR1cyA9IFwicGVuZGluZ1wiKSxcbiAgICAgICAgICAgICAgICB0aGVuYWJsZS50aGVuKFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGZ1bGZpbGxlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIFwicGVuZGluZ1wiID09PSB0aGVuYWJsZS5zdGF0dXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAoKHRoZW5hYmxlLnN0YXR1cyA9IFwiZnVsZmlsbGVkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICh0aGVuYWJsZS52YWx1ZSA9IGZ1bGZpbGxlZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIFwicGVuZGluZ1wiID09PSB0aGVuYWJsZS5zdGF0dXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAoKHRoZW5hYmxlLnN0YXR1cyA9IFwicmVqZWN0ZWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgKHRoZW5hYmxlLnJlYXNvbiA9IGVycm9yKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICB0aGVuYWJsZS5zdGF0dXMpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjYXNlIFwiZnVsZmlsbGVkXCI6XG4gICAgICAgICAgICAgIHJldHVybiB0aGVuYWJsZS52YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgXCJyZWplY3RlZFwiOlxuICAgICAgICAgICAgICB0aHJvdyB0aGVuYWJsZS5yZWFzb247XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgdGhlbmFibGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hcEludG9BcnJheShjaGlsZHJlbiwgYXJyYXksIGVzY2FwZWRQcmVmaXgsIG5hbWVTb0ZhciwgY2FsbGJhY2spIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGUgfHwgXCJib29sZWFuXCIgPT09IHR5cGUpIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgIHZhciBpbnZva2VDYWxsYmFjayA9ICExO1xuICAgICAgaWYgKG51bGwgPT09IGNoaWxkcmVuKSBpbnZva2VDYWxsYmFjayA9ICEwO1xuICAgICAgZWxzZVxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gITA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICBzd2l0Y2ggKGNoaWxkcmVuLiQkdHlwZW9mKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gITA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAoaW52b2tlQ2FsbGJhY2sgPSBjaGlsZHJlbi5faW5pdCksXG4gICAgICAgICAgICAgICAgICBtYXBJbnRvQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIGludm9rZUNhbGxiYWNrKGNoaWxkcmVuLl9wYXlsb2FkKSxcbiAgICAgICAgICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWRQcmVmaXgsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVTb0ZhcixcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSBjaGlsZHJlbjtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayhpbnZva2VDYWxsYmFjayk7XG4gICAgICAgIHZhciBjaGlsZEtleSA9XG4gICAgICAgICAgXCJcIiA9PT0gbmFtZVNvRmFyID8gXCIuXCIgKyBnZXRFbGVtZW50S2V5KGludm9rZUNhbGxiYWNrLCAwKSA6IG5hbWVTb0ZhcjtcbiAgICAgICAgaXNBcnJheUltcGwoY2FsbGJhY2spXG4gICAgICAgICAgPyAoKGVzY2FwZWRQcmVmaXggPSBcIlwiKSxcbiAgICAgICAgICAgIG51bGwgIT0gY2hpbGRLZXkgJiZcbiAgICAgICAgICAgICAgKGVzY2FwZWRQcmVmaXggPVxuICAgICAgICAgICAgICAgIGNoaWxkS2V5LnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsIFwiJCYvXCIpICsgXCIvXCIpLFxuICAgICAgICAgICAgbWFwSW50b0FycmF5KGNhbGxiYWNrLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgXCJcIiwgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICA6IG51bGwgIT0gY2FsbGJhY2sgJiZcbiAgICAgICAgICAgIChpc1ZhbGlkRWxlbWVudChjYWxsYmFjaykgJiZcbiAgICAgICAgICAgICAgKG51bGwgIT0gY2FsbGJhY2sua2V5ICYmXG4gICAgICAgICAgICAgICAgKChpbnZva2VDYWxsYmFjayAmJiBpbnZva2VDYWxsYmFjay5rZXkgPT09IGNhbGxiYWNrLmtleSkgfHxcbiAgICAgICAgICAgICAgICAgIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY2FsbGJhY2sua2V5KSksXG4gICAgICAgICAgICAgIChlc2NhcGVkUHJlZml4ID0gY2xvbmVBbmRSZXBsYWNlS2V5KFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGVzY2FwZWRQcmVmaXggK1xuICAgICAgICAgICAgICAgICAgKG51bGwgPT0gY2FsbGJhY2sua2V5IHx8XG4gICAgICAgICAgICAgICAgICAoaW52b2tlQ2FsbGJhY2sgJiYgaW52b2tlQ2FsbGJhY2sua2V5ID09PSBjYWxsYmFjay5rZXkpXG4gICAgICAgICAgICAgICAgICAgID8gXCJcIlxuICAgICAgICAgICAgICAgICAgICA6IChcIlwiICsgY2FsbGJhY2sua2V5KS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiQmL1wiXG4gICAgICAgICAgICAgICAgICAgICAgKSArIFwiL1wiKSArXG4gICAgICAgICAgICAgICAgICBjaGlsZEtleVxuICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgXCJcIiAhPT0gbmFtZVNvRmFyICYmXG4gICAgICAgICAgICAgICAgbnVsbCAhPSBpbnZva2VDYWxsYmFjayAmJlxuICAgICAgICAgICAgICAgIGlzVmFsaWRFbGVtZW50KGludm9rZUNhbGxiYWNrKSAmJlxuICAgICAgICAgICAgICAgIG51bGwgPT0gaW52b2tlQ2FsbGJhY2sua2V5ICYmXG4gICAgICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2suX3N0b3JlICYmXG4gICAgICAgICAgICAgICAgIWludm9rZUNhbGxiYWNrLl9zdG9yZS52YWxpZGF0ZWQgJiZcbiAgICAgICAgICAgICAgICAoZXNjYXBlZFByZWZpeC5fc3RvcmUudmFsaWRhdGVkID0gMiksXG4gICAgICAgICAgICAgIChjYWxsYmFjayA9IGVzY2FwZWRQcmVmaXgpKSxcbiAgICAgICAgICAgIGFycmF5LnB1c2goY2FsbGJhY2spKTtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBpbnZva2VDYWxsYmFjayA9IDA7XG4gICAgICBjaGlsZEtleSA9IFwiXCIgPT09IG5hbWVTb0ZhciA/IFwiLlwiIDogbmFtZVNvRmFyICsgXCI6XCI7XG4gICAgICBpZiAoaXNBcnJheUltcGwoY2hpbGRyZW4pKVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIChuYW1lU29GYXIgPSBjaGlsZHJlbltpXSksXG4gICAgICAgICAgICAodHlwZSA9IGNoaWxkS2V5ICsgZ2V0RWxlbWVudEtleShuYW1lU29GYXIsIGkpKSxcbiAgICAgICAgICAgIChpbnZva2VDYWxsYmFjayArPSBtYXBJbnRvQXJyYXkoXG4gICAgICAgICAgICAgIG5hbWVTb0ZhcixcbiAgICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICAgIGVzY2FwZWRQcmVmaXgsXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgICAgICApKTtcbiAgICAgIGVsc2UgaWYgKCgoaSA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pKSwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgaSkpXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgaSA9PT0gY2hpbGRyZW4uZW50cmllcyAmJlxuICAgICAgICAgICAgKGRpZFdhcm5BYm91dE1hcHMgfHxcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIFwiVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYW4gYXJyYXkgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAoZGlkV2FybkFib3V0TWFwcyA9ICEwKSksXG4gICAgICAgICAgICBjaGlsZHJlbiA9IGkuY2FsbChjaGlsZHJlbiksXG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAhKG5hbWVTb0ZhciA9IGNoaWxkcmVuLm5leHQoKSkuZG9uZTtcblxuICAgICAgICApXG4gICAgICAgICAgKG5hbWVTb0ZhciA9IG5hbWVTb0Zhci52YWx1ZSksXG4gICAgICAgICAgICAodHlwZSA9IGNoaWxkS2V5ICsgZ2V0RWxlbWVudEtleShuYW1lU29GYXIsIGkrKykpLFxuICAgICAgICAgICAgKGludm9rZUNhbGxiYWNrICs9IG1hcEludG9BcnJheShcbiAgICAgICAgICAgICAgbmFtZVNvRmFyLFxuICAgICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgICAgZXNjYXBlZFByZWZpeCxcbiAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgICkpO1xuICAgICAgZWxzZSBpZiAoXCJvYmplY3RcIiA9PT0gdHlwZSkge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgY2hpbGRyZW4udGhlbilcbiAgICAgICAgICByZXR1cm4gbWFwSW50b0FycmF5KFxuICAgICAgICAgICAgcmVzb2x2ZVRoZW5hYmxlKGNoaWxkcmVuKSxcbiAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgZXNjYXBlZFByZWZpeCxcbiAgICAgICAgICAgIG5hbWVTb0ZhcixcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgICAgKTtcbiAgICAgICAgYXJyYXkgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBcIk9iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogXCIgK1xuICAgICAgICAgICAgKFwiW29iamVjdCBPYmplY3RdXCIgPT09IGFycmF5XG4gICAgICAgICAgICAgID8gXCJvYmplY3Qgd2l0aCBrZXlzIHtcIiArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKFwiLCBcIikgKyBcIn1cIlxuICAgICAgICAgICAgICA6IGFycmF5KSArXG4gICAgICAgICAgICBcIikuIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgaW5zdGVhZC5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICAgICAgaWYgKG51bGwgPT0gY2hpbGRyZW4pIHJldHVybiBjaGlsZHJlbjtcbiAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgbWFwSW50b0FycmF5KGNoaWxkcmVuLCByZXN1bHQsIFwiXCIsIFwiXCIsIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBjb3VudCsrKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGF6eUluaXRpYWxpemVyKHBheWxvYWQpIHtcbiAgICAgIGlmICgtMSA9PT0gcGF5bG9hZC5fc3RhdHVzKSB7XG4gICAgICAgIHZhciBpb0luZm8gPSBwYXlsb2FkLl9pb0luZm87XG4gICAgICAgIG51bGwgIT0gaW9JbmZvICYmIChpb0luZm8uc3RhcnQgPSBpb0luZm8uZW5kID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICBpb0luZm8gPSBwYXlsb2FkLl9yZXN1bHQ7XG4gICAgICAgIHZhciB0aGVuYWJsZSA9IGlvSW5mbygpO1xuICAgICAgICB0aGVuYWJsZS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uIChtb2R1bGVPYmplY3QpIHtcbiAgICAgICAgICAgIGlmICgwID09PSBwYXlsb2FkLl9zdGF0dXMgfHwgLTEgPT09IHBheWxvYWQuX3N0YXR1cykge1xuICAgICAgICAgICAgICBwYXlsb2FkLl9zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICBwYXlsb2FkLl9yZXN1bHQgPSBtb2R1bGVPYmplY3Q7XG4gICAgICAgICAgICAgIHZhciBfaW9JbmZvID0gcGF5bG9hZC5faW9JbmZvO1xuICAgICAgICAgICAgICBudWxsICE9IF9pb0luZm8gJiYgKF9pb0luZm8uZW5kID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICAgICAgICB2b2lkIDAgPT09IHRoZW5hYmxlLnN0YXR1cyAmJlxuICAgICAgICAgICAgICAgICgodGhlbmFibGUuc3RhdHVzID0gXCJmdWxmaWxsZWRcIiksXG4gICAgICAgICAgICAgICAgKHRoZW5hYmxlLnZhbHVlID0gbW9kdWxlT2JqZWN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICgwID09PSBwYXlsb2FkLl9zdGF0dXMgfHwgLTEgPT09IHBheWxvYWQuX3N0YXR1cykge1xuICAgICAgICAgICAgICBwYXlsb2FkLl9zdGF0dXMgPSAyO1xuICAgICAgICAgICAgICBwYXlsb2FkLl9yZXN1bHQgPSBlcnJvcjtcbiAgICAgICAgICAgICAgdmFyIF9pb0luZm8yID0gcGF5bG9hZC5faW9JbmZvO1xuICAgICAgICAgICAgICBudWxsICE9IF9pb0luZm8yICYmIChfaW9JbmZvMi5lbmQgPSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhlbmFibGUuc3RhdHVzICYmXG4gICAgICAgICAgICAgICAgKCh0aGVuYWJsZS5zdGF0dXMgPSBcInJlamVjdGVkXCIpLCAodGhlbmFibGUucmVhc29uID0gZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGlvSW5mbyA9IHBheWxvYWQuX2lvSW5mbztcbiAgICAgICAgaWYgKG51bGwgIT0gaW9JbmZvKSB7XG4gICAgICAgICAgaW9JbmZvLnZhbHVlID0gdGhlbmFibGU7XG4gICAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdGhlbmFibGUuZGlzcGxheU5hbWU7XG4gICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRpc3BsYXlOYW1lICYmIChpb0luZm8ubmFtZSA9IGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAtMSA9PT0gcGF5bG9hZC5fc3RhdHVzICYmXG4gICAgICAgICAgKChwYXlsb2FkLl9zdGF0dXMgPSAwKSwgKHBheWxvYWQuX3Jlc3VsdCA9IHRoZW5hYmxlKSk7XG4gICAgICB9XG4gICAgICBpZiAoMSA9PT0gcGF5bG9hZC5fc3RhdHVzKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIChpb0luZm8gPSBwYXlsb2FkLl9yZXN1bHQpLFxuICAgICAgICAgIHZvaWQgMCA9PT0gaW9JbmZvICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcImxhenk6IEV4cGVjdGVkIHRoZSByZXN1bHQgb2YgYSBkeW5hbWljIGltcG9ydCgpIGNhbGwuIEluc3RlYWQgcmVjZWl2ZWQ6ICVzXFxuXFxuWW91ciBjb2RlIHNob3VsZCBsb29rIGxpa2U6IFxcbiAgY29uc3QgTXlDb21wb25lbnQgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9NeUNvbXBvbmVudCcpKVxcblxcbkRpZCB5b3UgYWNjaWRlbnRhbGx5IHB1dCBjdXJseSBicmFjZXMgYXJvdW5kIHRoZSBpbXBvcnQ/XCIsXG4gICAgICAgICAgICAgIGlvSW5mb1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICBcImRlZmF1bHRcIiBpbiBpb0luZm8gfHxcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwibGF6eTogRXhwZWN0ZWQgdGhlIHJlc3VsdCBvZiBhIGR5bmFtaWMgaW1wb3J0KCkgY2FsbC4gSW5zdGVhZCByZWNlaXZlZDogJXNcXG5cXG5Zb3VyIGNvZGUgc2hvdWxkIGxvb2sgbGlrZTogXFxuICBjb25zdCBNeUNvbXBvbmVudCA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL015Q29tcG9uZW50JykpXCIsXG4gICAgICAgICAgICAgIGlvSW5mb1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICBpb0luZm8uZGVmYXVsdFxuICAgICAgICApO1xuICAgICAgdGhyb3cgcGF5bG9hZC5fcmVzdWx0O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2hlcigpIHtcbiAgICAgIHZhciBkaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuSDtcbiAgICAgIG51bGwgPT09IGRpc3BhdGNoZXIgJiZcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkludmFsaWQgaG9vayBjYWxsLiBIb29rcyBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIG9mIHRoZSBib2R5IG9mIGEgZnVuY3Rpb24gY29tcG9uZW50LiBUaGlzIGNvdWxkIGhhcHBlbiBmb3Igb25lIG9mIHRoZSBmb2xsb3dpbmcgcmVhc29uczpcXG4xLiBZb3UgbWlnaHQgaGF2ZSBtaXNtYXRjaGluZyB2ZXJzaW9ucyBvZiBSZWFjdCBhbmQgdGhlIHJlbmRlcmVyIChzdWNoIGFzIFJlYWN0IERPTSlcXG4yLiBZb3UgbWlnaHQgYmUgYnJlYWtpbmcgdGhlIFJ1bGVzIG9mIEhvb2tzXFxuMy4gWW91IG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0IGluIHRoZSBzYW1lIGFwcFxcblNlZSBodHRwczovL3JlYWN0LmRldi9saW5rL2ludmFsaWQtaG9vay1jYWxsIGZvciB0aXBzIGFib3V0IGhvdyB0byBkZWJ1ZyBhbmQgZml4IHRoaXMgcHJvYmxlbS5cIlxuICAgICAgICApO1xuICAgICAgcmV0dXJuIGRpc3BhdGNoZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbGVhc2VBc3luY1RyYW5zaXRpb24oKSB7XG4gICAgICBSZWFjdFNoYXJlZEludGVybmFscy5hc3luY1RyYW5zaXRpb25zLS07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVucXVldWVUYXNrKHRhc2spIHtcbiAgICAgIGlmIChudWxsID09PSBlbnF1ZXVlVGFza0ltcGwpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHJlcXVpcmVTdHJpbmcgPSAoXCJyZXF1aXJlXCIgKyBNYXRoLnJhbmRvbSgpKS5zbGljZSgwLCA3KTtcbiAgICAgICAgICBlbnF1ZXVlVGFza0ltcGwgPSAobW9kdWxlICYmIG1vZHVsZVtyZXF1aXJlU3RyaW5nXSkuY2FsbChcbiAgICAgICAgICAgIG1vZHVsZSxcbiAgICAgICAgICAgIFwidGltZXJzXCJcbiAgICAgICAgICApLnNldEltbWVkaWF0ZTtcbiAgICAgICAgfSBjYXRjaCAoX2Vycikge1xuICAgICAgICAgIGVucXVldWVUYXNrSW1wbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgITEgPT09IGRpZFdhcm5BYm91dE1lc3NhZ2VDaGFubmVsICYmXG4gICAgICAgICAgICAgICgoZGlkV2FybkFib3V0TWVzc2FnZUNoYW5uZWwgPSAhMCksXG4gICAgICAgICAgICAgIFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAmJlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGEgTWVzc2FnZUNoYW5uZWwgaW1wbGVtZW50YXRpb24sIHNvIGVucXVldWluZyB0YXNrcyB2aWEgYXdhaXQgYWN0KGFzeW5jICgpID0+IC4uLikgd2lsbCBmYWlsLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzIGlmIHlvdSBlbmNvdW50ZXIgdGhpcyB3YXJuaW5nLlwiXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2Uodm9pZCAwKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICByZXR1cm4gZW5xdWV1ZVRhc2tJbXBsKHRhc2spO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZ2dyZWdhdGVFcnJvcnMoZXJyb3JzKSB7XG4gICAgICByZXR1cm4gMSA8IGVycm9ycy5sZW5ndGggJiYgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgQWdncmVnYXRlRXJyb3JcbiAgICAgICAgPyBuZXcgQWdncmVnYXRlRXJyb3IoZXJyb3JzKVxuICAgICAgICA6IGVycm9yc1swXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9wQWN0U2NvcGUocHJldkFjdFF1ZXVlLCBwcmV2QWN0U2NvcGVEZXB0aCkge1xuICAgICAgcHJldkFjdFNjb3BlRGVwdGggIT09IGFjdFNjb3BlRGVwdGggLSAxICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJZb3Ugc2VlbSB0byBoYXZlIG92ZXJsYXBwaW5nIGFjdCgpIGNhbGxzLCB0aGlzIGlzIG5vdCBzdXBwb3J0ZWQuIEJlIHN1cmUgdG8gYXdhaXQgcHJldmlvdXMgYWN0KCkgY2FsbHMgYmVmb3JlIG1ha2luZyBhIG5ldyBvbmUuIFwiXG4gICAgICAgICk7XG4gICAgICBhY3RTY29wZURlcHRoID0gcHJldkFjdFNjb3BlRGVwdGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5Rmx1c2hBc3luY0FjdFdvcmsocmV0dXJuVmFsdWUsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHF1ZXVlID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuYWN0UXVldWU7XG4gICAgICBpZiAobnVsbCAhPT0gcXVldWUpXG4gICAgICAgIGlmICgwICE9PSBxdWV1ZS5sZW5ndGgpXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZsdXNoQWN0UXVldWUocXVldWUpO1xuICAgICAgICAgICAgZW5xdWV1ZVRhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICBlbHNlIFJlYWN0U2hhcmVkSW50ZXJuYWxzLmFjdFF1ZXVlID0gbnVsbDtcbiAgICAgIDAgPCBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoXG4gICAgICAgID8gKChxdWV1ZSA9IGFnZ3JlZ2F0ZUVycm9ycyhSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMpKSxcbiAgICAgICAgICAoUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aCA9IDApLFxuICAgICAgICAgIHJlamVjdChxdWV1ZSkpXG4gICAgICAgIDogcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZsdXNoQWN0UXVldWUocXVldWUpIHtcbiAgICAgIGlmICghaXNGbHVzaGluZykge1xuICAgICAgICBpc0ZsdXNoaW5nID0gITA7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuZGlkVXNlUHJvbWlzZSA9ICExO1xuICAgICAgICAgICAgICB2YXIgY29udGludWF0aW9uID0gY2FsbGJhY2soITEpO1xuICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gY29udGludWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLmRpZFVzZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgIHF1ZXVlW2ldID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICBxdWV1ZS5zcGxpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gY29udGludWF0aW9uO1xuICAgICAgICAgICAgICB9IGVsc2UgYnJlYWs7XG4gICAgICAgICAgICB9IHdoaWxlICgxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBxdWV1ZS5zcGxpY2UoMCwgaSArIDEpLCBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaXNGbHVzaGluZyA9ICExO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gJiZcbiAgICAgIFwiZnVuY3Rpb25cIiA9PT1cbiAgICAgICAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQgJiZcbiAgICAgIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQoRXJyb3IoKSk7XG4gICAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC50cmFuc2l0aW9uYWwuZWxlbWVudFwiKSxcbiAgICAgIFJFQUNUX1BPUlRBTF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnBvcnRhbFwiKSxcbiAgICAgIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIiksXG4gICAgICBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnN0cmljdF9tb2RlXCIpLFxuICAgICAgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5wcm9maWxlclwiKSxcbiAgICAgIFJFQUNUX0NPTlNVTUVSX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QuY29uc3VtZXJcIiksXG4gICAgICBSRUFDVF9DT05URVhUX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QuY29udGV4dFwiKSxcbiAgICAgIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIiksXG4gICAgICBSRUFDVF9TVVNQRU5TRV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlXCIpLFxuICAgICAgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlX2xpc3RcIiksXG4gICAgICBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKSxcbiAgICAgIFJFQUNUX0xBWllfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpLFxuICAgICAgUkVBQ1RfQUNUSVZJVFlfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5hY3Rpdml0eVwiKSxcbiAgICAgIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IFN5bWJvbC5pdGVyYXRvcixcbiAgICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9LFxuICAgICAgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG4gICAgICAgIGlzTW91bnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgXCJmb3JjZVVwZGF0ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIFwicmVwbGFjZVN0YXRlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgICAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBcInNldFN0YXRlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXNzaWduID0gT2JqZWN0LmFzc2lnbixcbiAgICAgIGVtcHR5T2JqZWN0ID0ge307XG4gICAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIFwib2JqZWN0XCIgIT09IHR5cGVvZiBwYXJ0aWFsU3RhdGUgJiZcbiAgICAgICAgXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgcGFydGlhbFN0YXRlICYmXG4gICAgICAgIG51bGwgIT0gcGFydGlhbFN0YXRlXG4gICAgICApXG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIFwidGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuXCJcbiAgICAgICAgKTtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgXCJzZXRTdGF0ZVwiKTtcbiAgICB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssIFwiZm9yY2VVcGRhdGVcIik7XG4gICAgfTtcbiAgICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgICBpc01vdW50ZWQ6IFtcbiAgICAgICAgXCJpc01vdW50ZWRcIixcbiAgICAgICAgXCJJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiBjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy5cIlxuICAgICAgXSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogW1xuICAgICAgICBcInJlcGxhY2VTdGF0ZVwiLFxuICAgICAgICBcIlJlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuXCJcbiAgICAgIF1cbiAgICB9O1xuICAgIGZvciAoZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKVxuICAgICAgZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSAmJlxuICAgICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICBDb21wb25lbnREdW1teS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuICAgIGRlcHJlY2F0ZWRBUElzID0gUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbiAgICBkZXByZWNhdGVkQVBJcy5jb25zdHJ1Y3RvciA9IFB1cmVDb21wb25lbnQ7XG4gICAgYXNzaWduKGRlcHJlY2F0ZWRBUElzLCBDb21wb25lbnQucHJvdG90eXBlKTtcbiAgICBkZXByZWNhdGVkQVBJcy5pc1B1cmVSZWFjdENvbXBvbmVudCA9ICEwO1xuICAgIHZhciBpc0FycmF5SW1wbCA9IEFycmF5LmlzQXJyYXksXG4gICAgICBSRUFDVF9DTElFTlRfUkVGRVJFTkNFID0gU3ltYm9sLmZvcihcInJlYWN0LmNsaWVudC5yZWZlcmVuY2VcIiksXG4gICAgICBSZWFjdFNoYXJlZEludGVybmFscyA9IHtcbiAgICAgICAgSDogbnVsbCxcbiAgICAgICAgQTogbnVsbCxcbiAgICAgICAgVDogbnVsbCxcbiAgICAgICAgUzogbnVsbCxcbiAgICAgICAgYWN0UXVldWU6IG51bGwsXG4gICAgICAgIGFzeW5jVHJhbnNpdGlvbnM6IDAsXG4gICAgICAgIGlzQmF0Y2hpbmdMZWdhY3k6ICExLFxuICAgICAgICBkaWRTY2hlZHVsZUxlZ2FjeVVwZGF0ZTogITEsXG4gICAgICAgIGRpZFVzZVByb21pc2U6ICExLFxuICAgICAgICB0aHJvd25FcnJvcnM6IFtdLFxuICAgICAgICBnZXRDdXJyZW50U3RhY2s6IG51bGwsXG4gICAgICAgIHJlY2VudGx5Q3JlYXRlZE93bmVyU3RhY2tzOiAwXG4gICAgICB9LFxuICAgICAgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgY3JlYXRlVGFzayA9IGNvbnNvbGUuY3JlYXRlVGFza1xuICAgICAgICA/IGNvbnNvbGUuY3JlYXRlVGFza1xuICAgICAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH07XG4gICAgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgICByZWFjdF9zdGFja19ib3R0b21fZnJhbWU6IGZ1bmN0aW9uIChjYWxsU3RhY2tGb3JFcnJvcikge1xuICAgICAgICByZXR1cm4gY2FsbFN0YWNrRm9yRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgZGlkV2FybkFib3V0T2xkSlNYUnVudGltZTtcbiAgICB2YXIgZGlkV2FybkFib3V0RWxlbWVudFJlZiA9IHt9O1xuICAgIHZhciB1bmtub3duT3duZXJEZWJ1Z1N0YWNrID0gZGVwcmVjYXRlZEFQSXMucmVhY3Rfc3RhY2tfYm90dG9tX2ZyYW1lLmJpbmQoXG4gICAgICBkZXByZWNhdGVkQVBJcyxcbiAgICAgIFVua25vd25Pd25lclxuICAgICkoKTtcbiAgICB2YXIgdW5rbm93bk93bmVyRGVidWdUYXNrID0gY3JlYXRlVGFzayhnZXRUYXNrTmFtZShVbmtub3duT3duZXIpKTtcbiAgICB2YXIgZGlkV2FybkFib3V0TWFwcyA9ICExLFxuICAgICAgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nLFxuICAgICAgcmVwb3J0R2xvYmFsRXJyb3IgPVxuICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiByZXBvcnRFcnJvclxuICAgICAgICAgID8gcmVwb3J0RXJyb3JcbiAgICAgICAgICA6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHdpbmRvdyAmJlxuICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHdpbmRvdy5FcnJvckV2ZW50XG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuRXJyb3JFdmVudChcImVycm9yXCIsIHtcbiAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6ICEwLFxuICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogITAsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2YgZXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gZXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICA/IFN0cmluZyhlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgIDogU3RyaW5nKGVycm9yKSxcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnQpKSByZXR1cm47XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHByb2Nlc3MgJiZcbiAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBwcm9jZXNzLmVtaXRcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbWl0KFwidW5jYXVnaHRFeGNlcHRpb25cIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICBkaWRXYXJuQWJvdXRNZXNzYWdlQ2hhbm5lbCA9ICExLFxuICAgICAgZW5xdWV1ZVRhc2tJbXBsID0gbnVsbCxcbiAgICAgIGFjdFNjb3BlRGVwdGggPSAwLFxuICAgICAgZGlkV2Fybk5vQXdhaXRBY3QgPSAhMSxcbiAgICAgIGlzRmx1c2hpbmcgPSAhMSxcbiAgICAgIHF1ZXVlU2V2ZXJhbE1pY3JvdGFza3MgPVxuICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBxdWV1ZU1pY3JvdGFza1xuICAgICAgICAgID8gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVldWVNaWNyb3Rhc2soY2FsbGJhY2spO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IGVucXVldWVUYXNrO1xuICAgIGRlcHJlY2F0ZWRBUElzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICBjOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VNZW1vQ2FjaGUoc2l6ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIGZuTmFtZSA9IHtcbiAgICAgIG1hcDogbWFwQ2hpbGRyZW4sXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiAoY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICAgICAgICBtYXBDaGlsZHJlbihcbiAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3JFYWNoRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZm9yRWFjaENvbnRleHRcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBjb3VudDogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBuKys7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH0sXG4gICAgICB0b0FycmF5OiBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgICAgfSkgfHwgW11cbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBvbmx5OiBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpXG4gICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICBcIlJlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5BY3Rpdml0eSA9IFJFQUNUX0FDVElWSVRZX1RZUEU7XG4gICAgZXhwb3J0cy5DaGlsZHJlbiA9IGZuTmFtZTtcbiAgICBleHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiAgICBleHBvcnRzLkZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbiAgICBleHBvcnRzLlByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbiAgICBleHBvcnRzLlB1cmVDb21wb25lbnQgPSBQdXJlQ29tcG9uZW50O1xuICAgIGV4cG9ydHMuU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG4gICAgZXhwb3J0cy5TdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG4gICAgZXhwb3J0cy5fX0NMSUVOVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9XQVJOX1VTRVJTX1RIRVlfQ0FOTk9UX1VQR1JBREUgPVxuICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHM7XG4gICAgZXhwb3J0cy5fX0NPTVBJTEVSX1JVTlRJTUUgPSBkZXByZWNhdGVkQVBJcztcbiAgICBleHBvcnRzLmFjdCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdmFyIHByZXZBY3RRdWV1ZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLmFjdFF1ZXVlLFxuICAgICAgICBwcmV2QWN0U2NvcGVEZXB0aCA9IGFjdFNjb3BlRGVwdGg7XG4gICAgICBhY3RTY29wZURlcHRoKys7XG4gICAgICB2YXIgcXVldWUgPSAoUmVhY3RTaGFyZWRJbnRlcm5hbHMuYWN0UXVldWUgPVxuICAgICAgICAgIG51bGwgIT09IHByZXZBY3RRdWV1ZSA/IHByZXZBY3RRdWV1ZSA6IFtdKSxcbiAgICAgICAgZGlkQXdhaXRBY3RDYWxsID0gITE7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGlmICgwIDwgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aClcbiAgICAgICAgdGhyb3cgKFxuICAgICAgICAgIChwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKSxcbiAgICAgICAgICAoY2FsbGJhY2sgPSBhZ2dyZWdhdGVFcnJvcnMoUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzKSksXG4gICAgICAgICAgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGggPSAwKSxcbiAgICAgICAgICBjYWxsYmFjaylcbiAgICAgICAgKTtcbiAgICAgIGlmIChcbiAgICAgICAgbnVsbCAhPT0gcmVzdWx0ICYmXG4gICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiByZXN1bHQgJiZcbiAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgcmVzdWx0LnRoZW5cbiAgICAgICkge1xuICAgICAgICB2YXIgdGhlbmFibGUgPSByZXN1bHQ7XG4gICAgICAgIHF1ZXVlU2V2ZXJhbE1pY3JvdGFza3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRpZEF3YWl0QWN0Q2FsbCB8fFxuICAgICAgICAgICAgZGlkV2Fybk5vQXdhaXRBY3QgfHxcbiAgICAgICAgICAgICgoZGlkV2Fybk5vQXdhaXRBY3QgPSAhMCksXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIllvdSBjYWxsZWQgYWN0KGFzeW5jICgpID0+IC4uLikgd2l0aG91dCBhd2FpdC4gVGhpcyBjb3VsZCBsZWFkIHRvIHVuZXhwZWN0ZWQgdGVzdGluZyBiZWhhdmlvdXIsIGludGVybGVhdmluZyBtdWx0aXBsZSBhY3QgY2FsbHMgYW5kIG1peGluZyB0aGVpciBzY29wZXMuIFlvdSBzaG91bGQgLSBhd2FpdCBhY3QoYXN5bmMgKCkgPT4gLi4uKTtcIlxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRoZW46IGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGRpZEF3YWl0QWN0Q2FsbCA9ICEwO1xuICAgICAgICAgICAgdGhlbmFibGUudGhlbihcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKHJldHVyblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcG9wQWN0U2NvcGUocHJldkFjdFF1ZXVlLCBwcmV2QWN0U2NvcGVEZXB0aCk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPT09IHByZXZBY3RTY29wZURlcHRoKSB7XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmbHVzaEFjdFF1ZXVlKHF1ZXVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yJDApIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLnB1c2goZXJyb3IkMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoMCA8IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aHJvd25FcnJvciA9IGFnZ3JlZ2F0ZUVycm9ycyhcbiAgICAgICAgICAgICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChfdGhyb3duRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJldHVyblZhbHVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcG9wQWN0U2NvcGUocHJldkFjdFF1ZXVlLCBwcmV2QWN0U2NvcGVEZXB0aCk7XG4gICAgICAgICAgICAgICAgMCA8IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgID8gKChlcnJvciA9IGFnZ3JlZ2F0ZUVycm9ycyhcbiAgICAgICAgICAgICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoID0gMCksXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcikpXG4gICAgICAgICAgICAgICAgICA6IHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIHJldHVyblZhbHVlJGpzY29tcCQwID0gcmVzdWx0O1xuICAgICAgcG9wQWN0U2NvcGUocHJldkFjdFF1ZXVlLCBwcmV2QWN0U2NvcGVEZXB0aCk7XG4gICAgICAwID09PSBwcmV2QWN0U2NvcGVEZXB0aCAmJlxuICAgICAgICAoZmx1c2hBY3RRdWV1ZShxdWV1ZSksXG4gICAgICAgIDAgIT09IHF1ZXVlLmxlbmd0aCAmJlxuICAgICAgICAgIHF1ZXVlU2V2ZXJhbE1pY3JvdGFza3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlkQXdhaXRBY3RDYWxsIHx8XG4gICAgICAgICAgICAgIGRpZFdhcm5Ob0F3YWl0QWN0IHx8XG4gICAgICAgICAgICAgICgoZGlkV2Fybk5vQXdhaXRBY3QgPSAhMCksXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJBIGNvbXBvbmVudCBzdXNwZW5kZWQgaW5zaWRlIGFuIGBhY3RgIHNjb3BlLCBidXQgdGhlIGBhY3RgIGNhbGwgd2FzIG5vdCBhd2FpdGVkLiBXaGVuIHRlc3RpbmcgUmVhY3QgY29tcG9uZW50cyB0aGF0IGRlcGVuZCBvbiBhc3luY2hyb25vdXMgZGF0YSwgeW91IG11c3QgYXdhaXQgdGhlIHJlc3VsdDpcXG5cXG5hd2FpdCBhY3QoKCkgPT4gLi4uKVwiXG4gICAgICAgICAgICAgICkpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAoUmVhY3RTaGFyZWRJbnRlcm5hbHMuYWN0UXVldWUgPSBudWxsKSk7XG4gICAgICBpZiAoMCA8IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGgpXG4gICAgICAgIHRocm93IChcbiAgICAgICAgICAoKGNhbGxiYWNrID0gYWdncmVnYXRlRXJyb3JzKFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycykpLFxuICAgICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoID0gMCksXG4gICAgICAgICAgY2FsbGJhY2spXG4gICAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgZGlkQXdhaXRBY3RDYWxsID0gITA7XG4gICAgICAgICAgMCA9PT0gcHJldkFjdFNjb3BlRGVwdGhcbiAgICAgICAgICAgID8gKChSZWFjdFNoYXJlZEludGVybmFscy5hY3RRdWV1ZSA9IHF1ZXVlKSxcbiAgICAgICAgICAgICAgZW5xdWV1ZVRhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWN1cnNpdmVseUZsdXNoQXN5bmNBY3RXb3JrKFxuICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUkanNjb21wJDAsXG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICA6IHJlc29sdmUocmV0dXJuVmFsdWUkanNjb21wJDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhwb3J0cy5jYWNoZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhwb3J0cy5jYWNoZVNpZ25hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgZXhwb3J0cy5jYXB0dXJlT3duZXJTdGFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBnZXRDdXJyZW50U3RhY2sgPSBSZWFjdFNoYXJlZEludGVybmFscy5nZXRDdXJyZW50U3RhY2s7XG4gICAgICByZXR1cm4gbnVsbCA9PT0gZ2V0Q3VycmVudFN0YWNrID8gbnVsbCA6IGdldEN1cnJlbnRTdGFjaygpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICAgICAgaWYgKG51bGwgPT09IGVsZW1lbnQgfHwgdm9pZCAwID09PSBlbGVtZW50KVxuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBcIlRoZSBhcmd1bWVudCBtdXN0IGJlIGEgUmVhY3QgZWxlbWVudCwgYnV0IHlvdSBwYXNzZWQgXCIgK1xuICAgICAgICAgICAgZWxlbWVudCArXG4gICAgICAgICAgICBcIi5cIlxuICAgICAgICApO1xuICAgICAgdmFyIHByb3BzID0gYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKSxcbiAgICAgICAga2V5ID0gZWxlbWVudC5rZXksXG4gICAgICAgIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICBpZiAobnVsbCAhPSBjb25maWcpIHtcbiAgICAgICAgdmFyIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdDtcbiAgICAgICAgYToge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBcInJlZlwiKSAmJlxuICAgICAgICAgICAgKEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgXCJyZWZcIlxuICAgICAgICAgICAgKS5nZXQpICYmXG4gICAgICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQuaXNSZWFjdFdhcm5pbmdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9ICExO1xuICAgICAgICAgICAgYnJlYWsgYTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gdm9pZCAwICE9PSBjb25maWcucmVmO1xuICAgICAgICB9XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCAmJiAob3duZXIgPSBnZXRPd25lcigpKTtcbiAgICAgICAgaGFzVmFsaWRLZXkoY29uZmlnKSAmJlxuICAgICAgICAgIChjaGVja0tleVN0cmluZ0NvZXJjaW9uKGNvbmZpZy5rZXkpLCAoa2V5ID0gXCJcIiArIGNvbmZpZy5rZXkpKTtcbiAgICAgICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpXG4gICAgICAgICAgIWhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgfHxcbiAgICAgICAgICAgIFwia2V5XCIgPT09IHByb3BOYW1lIHx8XG4gICAgICAgICAgICBcIl9fc2VsZlwiID09PSBwcm9wTmFtZSB8fFxuICAgICAgICAgICAgXCJfX3NvdXJjZVwiID09PSBwcm9wTmFtZSB8fFxuICAgICAgICAgICAgKFwicmVmXCIgPT09IHByb3BOYW1lICYmIHZvaWQgMCA9PT0gY29uZmlnLnJlZikgfHxcbiAgICAgICAgICAgIChwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wTmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICAgICAgaWYgKDEgPT09IHByb3BOYW1lKSBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgZWxzZSBpZiAoMSA8IHByb3BOYW1lKSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9IEFycmF5KHByb3BOYW1lKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wTmFtZTsgaSsrKVxuICAgICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdFtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0O1xuICAgICAgfVxuICAgICAgcHJvcHMgPSBSZWFjdEVsZW1lbnQoXG4gICAgICAgIGVsZW1lbnQudHlwZSxcbiAgICAgICAga2V5LFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGVsZW1lbnQuX2RlYnVnU3RhY2ssXG4gICAgICAgIGVsZW1lbnQuX2RlYnVnVGFza1xuICAgICAgKTtcbiAgICAgIGZvciAoa2V5ID0gMjsga2V5IDwgYXJndW1lbnRzLmxlbmd0aDsga2V5KyspXG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1trZXldKTtcbiAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuICAgIGV4cG9ydHMuY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uIChkZWZhdWx0VmFsdWUpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAgICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgICAgICBfY3VycmVudFZhbHVlMjogZGVmYXVsdFZhbHVlLFxuICAgICAgICBfdGhyZWFkQ291bnQ6IDAsXG4gICAgICAgIFByb3ZpZGVyOiBudWxsLFxuICAgICAgICBDb25zdW1lcjogbnVsbFxuICAgICAgfTtcbiAgICAgIGRlZmF1bHRWYWx1ZS5Qcm92aWRlciA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIGRlZmF1bHRWYWx1ZS5Db25zdW1lciA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlNVTUVSX1RZUEUsXG4gICAgICAgIF9jb250ZXh0OiBkZWZhdWx0VmFsdWVcbiAgICAgIH07XG4gICAgICBkZWZhdWx0VmFsdWUuX2N1cnJlbnRSZW5kZXJlciA9IG51bGw7XG4gICAgICBkZWZhdWx0VmFsdWUuX2N1cnJlbnRSZW5kZXJlcjIgPSBudWxsO1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9O1xuICAgIGV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldKTtcbiAgICAgIGkgPSB7fTtcbiAgICAgIHZhciBrZXkgPSBudWxsO1xuICAgICAgaWYgKG51bGwgIT0gY29uZmlnKVxuICAgICAgICBmb3IgKHByb3BOYW1lIGluIChkaWRXYXJuQWJvdXRPbGRKU1hSdW50aW1lIHx8XG4gICAgICAgICAgIShcIl9fc2VsZlwiIGluIGNvbmZpZykgfHxcbiAgICAgICAgICBcImtleVwiIGluIGNvbmZpZyB8fFxuICAgICAgICAgICgoZGlkV2FybkFib3V0T2xkSlNYUnVudGltZSA9ICEwKSxcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBcIllvdXIgYXBwIChvciBvbmUgb2YgaXRzIGRlcGVuZGVuY2llcykgaXMgdXNpbmcgYW4gb3V0ZGF0ZWQgSlNYIHRyYW5zZm9ybS4gVXBkYXRlIHRvIHRoZSBtb2Rlcm4gSlNYIHRyYW5zZm9ybSBmb3IgZmFzdGVyIHBlcmZvcm1hbmNlOiBodHRwczovL3JlYWN0LmRldi9saW5rL25ldy1qc3gtdHJhbnNmb3JtXCJcbiAgICAgICAgICApKSxcbiAgICAgICAgaGFzVmFsaWRLZXkoY29uZmlnKSAmJlxuICAgICAgICAgIChjaGVja0tleVN0cmluZ0NvZXJjaW9uKGNvbmZpZy5rZXkpLCAoa2V5ID0gXCJcIiArIGNvbmZpZy5rZXkpKSxcbiAgICAgICAgY29uZmlnKSlcbiAgICAgICAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmXG4gICAgICAgICAgICBcImtleVwiICE9PSBwcm9wTmFtZSAmJlxuICAgICAgICAgICAgXCJfX3NlbGZcIiAhPT0gcHJvcE5hbWUgJiZcbiAgICAgICAgICAgIFwiX19zb3VyY2VcIiAhPT0gcHJvcE5hbWUgJiZcbiAgICAgICAgICAgIChpW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV0pO1xuICAgICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gICAgICBpZiAoMSA9PT0gY2hpbGRyZW5MZW5ndGgpIGkuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgIGVsc2UgaWYgKDEgPCBjaGlsZHJlbkxlbmd0aCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpLCBfaSA9IDA7XG4gICAgICAgICAgX2kgPCBjaGlsZHJlbkxlbmd0aDtcbiAgICAgICAgICBfaSsrXG4gICAgICAgIClcbiAgICAgICAgICBjaGlsZEFycmF5W19pXSA9IGFyZ3VtZW50c1tfaSArIDJdO1xuICAgICAgICBPYmplY3QuZnJlZXplICYmIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICAgIGkuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpXG4gICAgICAgIGZvciAocHJvcE5hbWUgaW4gKChjaGlsZHJlbkxlbmd0aCA9IHR5cGUuZGVmYXVsdFByb3BzKSwgY2hpbGRyZW5MZW5ndGgpKVxuICAgICAgICAgIHZvaWQgMCA9PT0gaVtwcm9wTmFtZV0gJiYgKGlbcHJvcE5hbWVdID0gY2hpbGRyZW5MZW5ndGhbcHJvcE5hbWVdKTtcbiAgICAgIGtleSAmJlxuICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihcbiAgICAgICAgICBpLFxuICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHR5cGVcbiAgICAgICAgICAgID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgXCJVbmtub3duXCJcbiAgICAgICAgICAgIDogdHlwZVxuICAgICAgICApO1xuICAgICAgdmFyIHByb3BOYW1lID0gMWU0ID4gUmVhY3RTaGFyZWRJbnRlcm5hbHMucmVjZW50bHlDcmVhdGVkT3duZXJTdGFja3MrKztcbiAgICAgIHJldHVybiBSZWFjdEVsZW1lbnQoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaSxcbiAgICAgICAgZ2V0T3duZXIoKSxcbiAgICAgICAgcHJvcE5hbWUgPyBFcnJvcihcInJlYWN0LXN0YWNrLXRvcC1mcmFtZVwiKSA6IHVua25vd25Pd25lckRlYnVnU3RhY2ssXG4gICAgICAgIHByb3BOYW1lID8gY3JlYXRlVGFzayhnZXRUYXNrTmFtZSh0eXBlKSkgOiB1bmtub3duT3duZXJEZWJ1Z1Rhc2tcbiAgICAgICk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNyZWF0ZVJlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWZPYmplY3QgPSB7IGN1cnJlbnQ6IG51bGwgfTtcbiAgICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gICAgICByZXR1cm4gcmVmT2JqZWN0O1xuICAgIH07XG4gICAgZXhwb3J0cy5mb3J3YXJkUmVmID0gZnVuY3Rpb24gKHJlbmRlcikge1xuICAgICAgbnVsbCAhPSByZW5kZXIgJiYgcmVuZGVyLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEVcbiAgICAgICAgPyBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgXCJmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCByZWNlaXZlZCBhIGBtZW1vYCBjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgbWVtbyhmb3J3YXJkUmVmKC4uLikpLlwiXG4gICAgICAgICAgKVxuICAgICAgICA6IFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIHJlbmRlclxuICAgICAgICAgID8gY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuXCIsXG4gICAgICAgICAgICAgIG51bGwgPT09IHJlbmRlciA/IFwibnVsbFwiIDogdHlwZW9mIHJlbmRlclxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogMCAhPT0gcmVuZGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgMiAhPT0gcmVuZGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgYWNjZXB0IGV4YWN0bHkgdHdvIHBhcmFtZXRlcnM6IHByb3BzIGFuZCByZWYuICVzXCIsXG4gICAgICAgICAgICAgIDEgPT09IHJlbmRlci5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IFwiRGlkIHlvdSBmb3JnZXQgdG8gdXNlIHRoZSByZWYgcGFyYW1ldGVyP1wiXG4gICAgICAgICAgICAgICAgOiBcIkFueSBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIHVuZGVmaW5lZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgIG51bGwgIT0gcmVuZGVyICYmXG4gICAgICAgIG51bGwgIT0gcmVuZGVyLmRlZmF1bHRQcm9wcyAmJlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IGRlZmF1bHRQcm9wcy4gRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIFJlYWN0IGNvbXBvbmVudD9cIlxuICAgICAgICApO1xuICAgICAgdmFyIGVsZW1lbnRUeXBlID0geyAkJHR5cGVvZjogUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSwgcmVuZGVyOiByZW5kZXIgfSxcbiAgICAgICAgb3duTmFtZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50VHlwZSwgXCJkaXNwbGF5TmFtZVwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gb3duTmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIG93bk5hbWUgPSBuYW1lO1xuICAgICAgICAgIHJlbmRlci5uYW1lIHx8XG4gICAgICAgICAgICByZW5kZXIuZGlzcGxheU5hbWUgfHxcbiAgICAgICAgICAgIChPYmplY3QuZGVmaW5lUHJvcGVydHkocmVuZGVyLCBcIm5hbWVcIiwgeyB2YWx1ZTogbmFtZSB9KSxcbiAgICAgICAgICAgIChyZW5kZXIuZGlzcGxheU5hbWUgPSBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVsZW1lbnRUeXBlO1xuICAgIH07XG4gICAgZXhwb3J0cy5pc1ZhbGlkRWxlbWVudCA9IGlzVmFsaWRFbGVtZW50O1xuICAgIGV4cG9ydHMubGF6eSA9IGZ1bmN0aW9uIChjdG9yKSB7XG4gICAgICBjdG9yID0geyBfc3RhdHVzOiAtMSwgX3Jlc3VsdDogY3RvciB9O1xuICAgICAgdmFyIGxhenlUeXBlID0ge1xuICAgICAgICAgICQkdHlwZW9mOiBSRUFDVF9MQVpZX1RZUEUsXG4gICAgICAgICAgX3BheWxvYWQ6IGN0b3IsXG4gICAgICAgICAgX2luaXQ6IGxhenlJbml0aWFsaXplclxuICAgICAgICB9LFxuICAgICAgICBpb0luZm8gPSB7XG4gICAgICAgICAgbmFtZTogXCJsYXp5XCIsXG4gICAgICAgICAgc3RhcnQ6IC0xLFxuICAgICAgICAgIGVuZDogLTEsXG4gICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgb3duZXI6IG51bGwsXG4gICAgICAgICAgZGVidWdTdGFjazogRXJyb3IoXCJyZWFjdC1zdGFjay10b3AtZnJhbWVcIiksXG4gICAgICAgICAgZGVidWdUYXNrOiBjb25zb2xlLmNyZWF0ZVRhc2sgPyBjb25zb2xlLmNyZWF0ZVRhc2soXCJsYXp5KClcIikgOiBudWxsXG4gICAgICAgIH07XG4gICAgICBjdG9yLl9pb0luZm8gPSBpb0luZm87XG4gICAgICBsYXp5VHlwZS5fZGVidWdJbmZvID0gW3sgYXdhaXRlZDogaW9JbmZvIH1dO1xuICAgICAgcmV0dXJuIGxhenlUeXBlO1xuICAgIH07XG4gICAgZXhwb3J0cy5tZW1vID0gZnVuY3Rpb24gKHR5cGUsIGNvbXBhcmUpIHtcbiAgICAgIG51bGwgPT0gdHlwZSAmJlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwibWVtbzogVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBjb21wb25lbnQuIEluc3RlYWQgcmVjZWl2ZWQ6ICVzXCIsXG4gICAgICAgICAgbnVsbCA9PT0gdHlwZSA/IFwibnVsbFwiIDogdHlwZW9mIHR5cGVcbiAgICAgICAgKTtcbiAgICAgIGNvbXBhcmUgPSB7XG4gICAgICAgICQkdHlwZW9mOiBSRUFDVF9NRU1PX1RZUEUsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGNvbXBhcmU6IHZvaWQgMCA9PT0gY29tcGFyZSA/IG51bGwgOiBjb21wYXJlXG4gICAgICB9O1xuICAgICAgdmFyIG93bk5hbWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcGFyZSwgXCJkaXNwbGF5TmFtZVwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gb3duTmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIG93bk5hbWUgPSBuYW1lO1xuICAgICAgICAgIHR5cGUubmFtZSB8fFxuICAgICAgICAgICAgdHlwZS5kaXNwbGF5TmFtZSB8fFxuICAgICAgICAgICAgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBcIm5hbWVcIiwgeyB2YWx1ZTogbmFtZSB9KSxcbiAgICAgICAgICAgICh0eXBlLmRpc3BsYXlOYW1lID0gbmFtZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb21wYXJlO1xuICAgIH07XG4gICAgZXhwb3J0cy5zdGFydFRyYW5zaXRpb24gPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBwcmV2VHJhbnNpdGlvbiA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlQsXG4gICAgICAgIGN1cnJlbnRUcmFuc2l0aW9uID0ge307XG4gICAgICBjdXJyZW50VHJhbnNpdGlvbi5fdXBkYXRlZEZpYmVycyA9IG5ldyBTZXQoKTtcbiAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLlQgPSBjdXJyZW50VHJhbnNpdGlvbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IHNjb3BlKCksXG4gICAgICAgICAgb25TdGFydFRyYW5zaXRpb25GaW5pc2ggPSBSZWFjdFNoYXJlZEludGVybmFscy5TO1xuICAgICAgICBudWxsICE9PSBvblN0YXJ0VHJhbnNpdGlvbkZpbmlzaCAmJlxuICAgICAgICAgIG9uU3RhcnRUcmFuc2l0aW9uRmluaXNoKGN1cnJlbnRUcmFuc2l0aW9uLCByZXR1cm5WYWx1ZSk7XG4gICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiByZXR1cm5WYWx1ZSAmJlxuICAgICAgICAgIG51bGwgIT09IHJldHVyblZhbHVlICYmXG4gICAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgcmV0dXJuVmFsdWUudGhlbiAmJlxuICAgICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy5hc3luY1RyYW5zaXRpb25zKyssXG4gICAgICAgICAgcmV0dXJuVmFsdWUudGhlbihyZWxlYXNlQXN5bmNUcmFuc2l0aW9uLCByZWxlYXNlQXN5bmNUcmFuc2l0aW9uKSxcbiAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKG5vb3AsIHJlcG9ydEdsb2JhbEVycm9yKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXBvcnRHbG9iYWxFcnJvcihlcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBudWxsID09PSBwcmV2VHJhbnNpdGlvbiAmJlxuICAgICAgICAgIGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzICYmXG4gICAgICAgICAgKChzY29wZSA9IGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzLnNpemUpLFxuICAgICAgICAgIGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzLmNsZWFyKCksXG4gICAgICAgICAgMTAgPCBzY29wZSAmJlxuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBcIkRldGVjdGVkIGEgbGFyZ2UgbnVtYmVyIG9mIHVwZGF0ZXMgaW5zaWRlIHN0YXJ0VHJhbnNpdGlvbi4gSWYgdGhpcyBpcyBkdWUgdG8gYSBzdWJzY3JpcHRpb24gcGxlYXNlIHJlLXdyaXRlIGl0IHRvIHVzZSBSZWFjdCBwcm92aWRlZCBob29rcy4gT3RoZXJ3aXNlIGNvbmN1cnJlbnQgbW9kZSBndWFyYW50ZWVzIGFyZSBvZmYgdGhlIHRhYmxlLlwiXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICBudWxsICE9PSBwcmV2VHJhbnNpdGlvbiAmJlxuICAgICAgICAgICAgbnVsbCAhPT0gY3VycmVudFRyYW5zaXRpb24udHlwZXMgJiZcbiAgICAgICAgICAgIChudWxsICE9PSBwcmV2VHJhbnNpdGlvbi50eXBlcyAmJlxuICAgICAgICAgICAgICBwcmV2VHJhbnNpdGlvbi50eXBlcyAhPT0gY3VycmVudFRyYW5zaXRpb24udHlwZXMgJiZcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIldlIGV4cGVjdGVkIGlubmVyIFRyYW5zaXRpb25zIHRvIGhhdmUgdHJhbnNmZXJyZWQgdGhlIG91dGVyIHR5cGVzIHNldCBhbmQgdGhhdCB5b3UgY2Fubm90IGFkZCB0byB0aGUgb3V0ZXIgVHJhbnNpdGlvbiB3aGlsZSBpbnNpZGUgdGhlIGlubmVyLlRoaXMgaXMgYSBidWcgaW4gUmVhY3QuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIChwcmV2VHJhbnNpdGlvbi50eXBlcyA9IGN1cnJlbnRUcmFuc2l0aW9uLnR5cGVzKSksXG4gICAgICAgICAgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLlQgPSBwcmV2VHJhbnNpdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLnVuc3RhYmxlX3VzZUNhY2hlUmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUNhY2hlUmVmcmVzaCgpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2UgPSBmdW5jdGlvbiAodXNhYmxlKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2UodXNhYmxlKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlQWN0aW9uU3RhdGUgPSBmdW5jdGlvbiAoYWN0aW9uLCBpbml0aWFsU3RhdGUsIHBlcm1hbGluaykge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlQWN0aW9uU3RhdGUoXG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgaW5pdGlhbFN0YXRlLFxuICAgICAgICBwZXJtYWxpbmtcbiAgICAgICk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUNhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBkZXBzKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VDYWxsYmFjayhjYWxsYmFjaywgZGVwcyk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUNvbnRleHQgPSBmdW5jdGlvbiAoQ29udGV4dCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgICAgQ29udGV4dC4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OU1VNRVJfVFlQRSAmJlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuQ29uc3VtZXIpIGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYnVncy4gRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkP1wiXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VDb250ZXh0KENvbnRleHQpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VEZWJ1Z1ZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBmb3JtYXR0ZXJGbikge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyRm4pO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VEZWZlcnJlZFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZURlZmVycmVkVmFsdWUodmFsdWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUVmZmVjdCA9IGZ1bmN0aW9uIChjcmVhdGUsIGRlcHMpIHtcbiAgICAgIG51bGwgPT0gY3JlYXRlICYmXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIlJlYWN0IEhvb2sgdXNlRWZmZWN0IHJlcXVpcmVzIGFuIGVmZmVjdCBjYWxsYmFjay4gRGlkIHlvdSBmb3JnZXQgdG8gcGFzcyBhIGNhbGxiYWNrIHRvIHRoZSBob29rP1wiXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VFZmZlY3QoY3JlYXRlLCBkZXBzKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlRWZmZWN0RXZlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUVmZmVjdEV2ZW50KGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VJZCgpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VJbXBlcmF0aXZlSGFuZGxlID0gZnVuY3Rpb24gKHJlZiwgY3JlYXRlLCBkZXBzKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBkZXBzKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlSW5zZXJ0aW9uRWZmZWN0ID0gZnVuY3Rpb24gKGNyZWF0ZSwgZGVwcykge1xuICAgICAgbnVsbCA9PSBjcmVhdGUgJiZcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiUmVhY3QgSG9vayB1c2VJbnNlcnRpb25FZmZlY3QgcmVxdWlyZXMgYW4gZWZmZWN0IGNhbGxiYWNrLiBEaWQgeW91IGZvcmdldCB0byBwYXNzIGEgY2FsbGJhY2sgdG8gdGhlIGhvb2s/XCJcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUluc2VydGlvbkVmZmVjdChjcmVhdGUsIGRlcHMpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VMYXlvdXRFZmZlY3QgPSBmdW5jdGlvbiAoY3JlYXRlLCBkZXBzKSB7XG4gICAgICBudWxsID09IGNyZWF0ZSAmJlxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJSZWFjdCBIb29rIHVzZUxheW91dEVmZmVjdCByZXF1aXJlcyBhbiBlZmZlY3QgY2FsbGJhY2suIERpZCB5b3UgZm9yZ2V0IHRvIHBhc3MgYSBjYWxsYmFjayB0byB0aGUgaG9vaz9cIlxuICAgICAgICApO1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlTGF5b3V0RWZmZWN0KGNyZWF0ZSwgZGVwcyk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZU1lbW8gPSBmdW5jdGlvbiAoY3JlYXRlLCBkZXBzKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VNZW1vKGNyZWF0ZSwgZGVwcyk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZU9wdGltaXN0aWMgPSBmdW5jdGlvbiAocGFzc3Rocm91Z2gsIHJlZHVjZXIpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZU9wdGltaXN0aWMocGFzc3Rocm91Z2gsIHJlZHVjZXIpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VSZWR1Y2VyID0gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZVJlZiA9IGZ1bmN0aW9uIChpbml0aWFsVmFsdWUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZVJlZihpbml0aWFsVmFsdWUpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VTdGF0ZSA9IGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZVN5bmNFeHRlcm5hbFN0b3JlID0gZnVuY3Rpb24gKFxuICAgICAgc3Vic2NyaWJlLFxuICAgICAgZ2V0U25hcHNob3QsXG4gICAgICBnZXRTZXJ2ZXJTbmFwc2hvdFxuICAgICkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlU3luY0V4dGVybmFsU3RvcmUoXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICAgICAgZ2V0U25hcHNob3QsXG4gICAgICAgIGdldFNlcnZlclNuYXBzaG90XG4gICAgICApO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VUcmFuc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlVHJhbnNpdGlvbigpO1xuICAgIH07XG4gICAgZXhwb3J0cy52ZXJzaW9uID0gXCIxOS4yLjFcIjtcbiAgICBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICYmXG4gICAgICBcImZ1bmN0aW9uXCIgPT09XG4gICAgICAgIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AgJiZcbiAgICAgIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RvcChFcnJvcigpKTtcbiAgfSkoKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QucHJvZHVjdGlvbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwgIi8qKlxuICogQGxpY2Vuc2UgUmVhY3RcbiAqIHJlYWN0LWRvbS5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiZcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICBmdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBvcnRhbCQxKGNoaWxkcmVuLCBjb250YWluZXJJbmZvLCBpbXBsZW1lbnRhdGlvbikge1xuICAgICAgdmFyIGtleSA9XG4gICAgICAgIDMgPCBhcmd1bWVudHMubGVuZ3RoICYmIHZvaWQgMCAhPT0gYXJndW1lbnRzWzNdID8gYXJndW1lbnRzWzNdIDogbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbihrZXkpO1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITE7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9ICEwO1xuICAgICAgfVxuICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ICYmXG4gICAgICAgIChjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiVGhlIHByb3ZpZGVkIGtleSBpcyBhbiB1bnN1cHBvcnRlZCB0eXBlICVzLiBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgdXNpbmcgaXQgaGVyZS5cIixcbiAgICAgICAgICAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgU3ltYm9sICYmXG4gICAgICAgICAgICBTeW1ib2wudG9TdHJpbmdUYWcgJiZcbiAgICAgICAgICAgIGtleVtTeW1ib2wudG9TdHJpbmdUYWddKSB8fFxuICAgICAgICAgICAga2V5LmNvbnN0cnVjdG9yLm5hbWUgfHxcbiAgICAgICAgICAgIFwiT2JqZWN0XCJcbiAgICAgICAgKSxcbiAgICAgICAgdGVzdFN0cmluZ0NvZXJjaW9uKGtleSkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX1BPUlRBTF9UWVBFLFxuICAgICAgICBrZXk6IG51bGwgPT0ga2V5ID8gbnVsbCA6IFwiXCIgKyBrZXksXG4gICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgY29udGFpbmVySW5mbzogY29udGFpbmVySW5mbyxcbiAgICAgICAgaW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uXG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRDcm9zc09yaWdpblN0cmluZ0FzKGFzLCBpbnB1dCkge1xuICAgICAgaWYgKFwiZm9udFwiID09PSBhcykgcmV0dXJuIFwiXCI7XG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGlucHV0KVxuICAgICAgICByZXR1cm4gXCJ1c2UtY3JlZGVudGlhbHNcIiA9PT0gaW5wdXQgPyBpbnB1dCA6IFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ09iamVjdEZvcldhcm5pbmcodGhpbmcpIHtcbiAgICAgIHJldHVybiBudWxsID09PSB0aGluZ1xuICAgICAgICA/IFwiYG51bGxgXCJcbiAgICAgICAgOiB2b2lkIDAgPT09IHRoaW5nXG4gICAgICAgICAgPyBcImB1bmRlZmluZWRgXCJcbiAgICAgICAgICA6IFwiXCIgPT09IHRoaW5nXG4gICAgICAgICAgICA/IFwiYW4gZW1wdHkgc3RyaW5nXCJcbiAgICAgICAgICAgIDogJ3NvbWV0aGluZyB3aXRoIHR5cGUgXCInICsgdHlwZW9mIHRoaW5nICsgJ1wiJztcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nRW51bUZvcldhcm5pbmcodGhpbmcpIHtcbiAgICAgIHJldHVybiBudWxsID09PSB0aGluZ1xuICAgICAgICA/IFwiYG51bGxgXCJcbiAgICAgICAgOiB2b2lkIDAgPT09IHRoaW5nXG4gICAgICAgICAgPyBcImB1bmRlZmluZWRgXCJcbiAgICAgICAgICA6IFwiXCIgPT09IHRoaW5nXG4gICAgICAgICAgICA/IFwiYW4gZW1wdHkgc3RyaW5nXCJcbiAgICAgICAgICAgIDogXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHRoaW5nXG4gICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkodGhpbmcpXG4gICAgICAgICAgICAgIDogXCJudW1iZXJcIiA9PT0gdHlwZW9mIHRoaW5nXG4gICAgICAgICAgICAgICAgPyBcImBcIiArIHRoaW5nICsgXCJgXCJcbiAgICAgICAgICAgICAgICA6ICdzb21ldGhpbmcgd2l0aCB0eXBlIFwiJyArIHR5cGVvZiB0aGluZyArICdcIic7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5IO1xuICAgICAgbnVsbCA9PT0gZGlzcGF0Y2hlciAmJlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiSW52YWxpZCBob29rIGNhbGwuIEhvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgb2YgdGhlIGJvZHkgb2YgYSBmdW5jdGlvbiBjb21wb25lbnQuIFRoaXMgY291bGQgaGFwcGVuIGZvciBvbmUgb2YgdGhlIGZvbGxvd2luZyByZWFzb25zOlxcbjEuIFlvdSBtaWdodCBoYXZlIG1pc21hdGNoaW5nIHZlcnNpb25zIG9mIFJlYWN0IGFuZCB0aGUgcmVuZGVyZXIgKHN1Y2ggYXMgUmVhY3QgRE9NKVxcbjIuIFlvdSBtaWdodCBiZSBicmVha2luZyB0aGUgUnVsZXMgb2YgSG9va3NcXG4zLiBZb3UgbWlnaHQgaGF2ZSBtb3JlIHRoYW4gb25lIGNvcHkgb2YgUmVhY3QgaW4gdGhlIHNhbWUgYXBwXFxuU2VlIGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvaW52YWxpZC1ob29rLWNhbGwgZm9yIHRpcHMgYWJvdXQgaG93IHRvIGRlYnVnIGFuZCBmaXggdGhpcyBwcm9ibGVtLlwiXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlcjtcbiAgICB9XG4gICAgXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAmJlxuICAgICAgXCJmdW5jdGlvblwiID09PVxuICAgICAgICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydCAmJlxuICAgICAgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydChFcnJvcigpKTtcbiAgICB2YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIiksXG4gICAgICBJbnRlcm5hbHMgPSB7XG4gICAgICAgIGQ6IHtcbiAgICAgICAgICBmOiBub29wLFxuICAgICAgICAgIHI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBcIkludmFsaWQgZm9ybSBlbGVtZW50LiByZXF1ZXN0Rm9ybVJlc2V0IG11c3QgYmUgcGFzc2VkIGEgZm9ybSB0aGF0IHdhcyByZW5kZXJlZCBieSBSZWFjdC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIEQ6IG5vb3AsXG4gICAgICAgICAgQzogbm9vcCxcbiAgICAgICAgICBMOiBub29wLFxuICAgICAgICAgIG06IG5vb3AsXG4gICAgICAgICAgWDogbm9vcCxcbiAgICAgICAgICBTOiBub29wLFxuICAgICAgICAgIE06IG5vb3BcbiAgICAgICAgfSxcbiAgICAgICAgcDogMCxcbiAgICAgICAgZmluZERPTU5vZGU6IG51bGxcbiAgICAgIH0sXG4gICAgICBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIiksXG4gICAgICBSZWFjdFNoYXJlZEludGVybmFscyA9XG4gICAgICAgIFJlYWN0Ll9fQ0xJRU5UX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1dBUk5fVVNFUlNfVEhFWV9DQU5OT1RfVVBHUkFERTtcbiAgICAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgTWFwICYmXG4gICAgICBudWxsICE9IE1hcC5wcm90b3R5cGUgJiZcbiAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIE1hcC5wcm90b3R5cGUuZm9yRWFjaCAmJlxuICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgU2V0ICYmXG4gICAgICBudWxsICE9IFNldC5wcm90b3R5cGUgJiZcbiAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIFNldC5wcm90b3R5cGUuY2xlYXIgJiZcbiAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIFNldC5wcm90b3R5cGUuZm9yRWFjaCkgfHxcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwiUmVhY3QgZGVwZW5kcyBvbiBNYXAgYW5kIFNldCBidWlsdC1pbiB0eXBlcy4gTWFrZSBzdXJlIHRoYXQgeW91IGxvYWQgYSBwb2x5ZmlsbCBpbiBvbGRlciBicm93c2Vycy4gaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3JlYWN0LXBvbHlmaWxsc1wiXG4gICAgICApO1xuICAgIGV4cG9ydHMuX19ET01fSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfV0FSTl9VU0VSU19USEVZX0NBTk5PVF9VUEdSQURFID1cbiAgICAgIEludGVybmFscztcbiAgICBleHBvcnRzLmNyZWF0ZVBvcnRhbCA9IGZ1bmN0aW9uIChjaGlsZHJlbiwgY29udGFpbmVyKSB7XG4gICAgICB2YXIga2V5ID1cbiAgICAgICAgMiA8IGFyZ3VtZW50cy5sZW5ndGggJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMl0gPyBhcmd1bWVudHNbMl0gOiBudWxsO1xuICAgICAgaWYgKFxuICAgICAgICAhY29udGFpbmVyIHx8XG4gICAgICAgICgxICE9PSBjb250YWluZXIubm9kZVR5cGUgJiZcbiAgICAgICAgICA5ICE9PSBjb250YWluZXIubm9kZVR5cGUgJiZcbiAgICAgICAgICAxMSAhPT0gY29udGFpbmVyLm5vZGVUeXBlKVxuICAgICAgKVxuICAgICAgICB0aHJvdyBFcnJvcihcIlRhcmdldCBjb250YWluZXIgaXMgbm90IGEgRE9NIGVsZW1lbnQuXCIpO1xuICAgICAgcmV0dXJuIGNyZWF0ZVBvcnRhbCQxKGNoaWxkcmVuLCBjb250YWluZXIsIG51bGwsIGtleSk7XG4gICAgfTtcbiAgICBleHBvcnRzLmZsdXNoU3luYyA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgdmFyIHByZXZpb3VzVHJhbnNpdGlvbiA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlQsXG4gICAgICAgIHByZXZpb3VzVXBkYXRlUHJpb3JpdHkgPSBJbnRlcm5hbHMucDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICgoKFJlYWN0U2hhcmVkSW50ZXJuYWxzLlQgPSBudWxsKSwgKEludGVybmFscy5wID0gMiksIGZuKSlcbiAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy5UID0gcHJldmlvdXNUcmFuc2l0aW9uKSxcbiAgICAgICAgICAoSW50ZXJuYWxzLnAgPSBwcmV2aW91c1VwZGF0ZVByaW9yaXR5KSxcbiAgICAgICAgICBJbnRlcm5hbHMuZC5mKCkgJiZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiZmx1c2hTeW5jIHdhcyBjYWxsZWQgZnJvbSBpbnNpZGUgYSBsaWZlY3ljbGUgbWV0aG9kLiBSZWFjdCBjYW5ub3QgZmx1c2ggd2hlbiBSZWFjdCBpcyBhbHJlYWR5IHJlbmRlcmluZy4gQ29uc2lkZXIgbW92aW5nIHRoaXMgY2FsbCB0byBhIHNjaGVkdWxlciB0YXNrIG9yIG1pY3JvIHRhc2suXCJcbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLnByZWNvbm5lY3QgPSBmdW5jdGlvbiAoaHJlZiwgb3B0aW9ucykge1xuICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGhyZWYgJiYgaHJlZlxuICAgICAgICA/IG51bGwgIT0gb3B0aW9ucyAmJiBcIm9iamVjdFwiICE9PSB0eXBlb2Ygb3B0aW9uc1xuICAgICAgICAgID8gY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJSZWFjdERPTS5wcmVjb25uZWN0KCk6IEV4cGVjdGVkIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQgKHNlY29uZCkgdG8gYmUgYW4gb2JqZWN0IGJ1dCBlbmNvdW50ZXJlZCAlcyBpbnN0ZWFkLiBUaGUgb25seSBzdXBwb3J0ZWQgb3B0aW9uIGF0IHRoaXMgdGltZSBpcyBgY3Jvc3NPcmlnaW5gIHdoaWNoIGFjY2VwdHMgYSBzdHJpbmcuXCIsXG4gICAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKG9wdGlvbnMpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBudWxsICE9IG9wdGlvbnMgJiZcbiAgICAgICAgICAgIFwic3RyaW5nXCIgIT09IHR5cGVvZiBvcHRpb25zLmNyb3NzT3JpZ2luICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIlJlYWN0RE9NLnByZWNvbm5lY3QoKTogRXhwZWN0ZWQgdGhlIGBjcm9zc09yaWdpbmAgb3B0aW9uIChzZWNvbmQgYXJndW1lbnQpIHRvIGJlIGEgc3RyaW5nIGJ1dCBlbmNvdW50ZXJlZCAlcyBpbnN0ZWFkLiBUcnkgcmVtb3ZpbmcgdGhpcyBvcHRpb24gb3IgcGFzc2luZyBhIHN0cmluZyB2YWx1ZSBpbnN0ZWFkLlwiLFxuICAgICAgICAgICAgICBnZXRWYWx1ZURlc2NyaXB0b3JFeHBlY3RpbmdPYmplY3RGb3JXYXJuaW5nKG9wdGlvbnMuY3Jvc3NPcmlnaW4pXG4gICAgICAgICAgICApXG4gICAgICAgIDogY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIFwiUmVhY3RET00ucHJlY29ubmVjdCgpOiBFeHBlY3RlZCB0aGUgYGhyZWZgIGFyZ3VtZW50IChmaXJzdCkgdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nIGJ1dCBlbmNvdW50ZXJlZCAlcyBpbnN0ZWFkLlwiLFxuICAgICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nT2JqZWN0Rm9yV2FybmluZyhocmVmKVxuICAgICAgICAgICk7XG4gICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgaHJlZiAmJlxuICAgICAgICAob3B0aW9uc1xuICAgICAgICAgID8gKChvcHRpb25zID0gb3B0aW9ucy5jcm9zc09yaWdpbiksXG4gICAgICAgICAgICAob3B0aW9ucyA9XG4gICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zXG4gICAgICAgICAgICAgICAgPyBcInVzZS1jcmVkZW50aWFsc1wiID09PSBvcHRpb25zXG4gICAgICAgICAgICAgICAgICA/IG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgIDogdm9pZCAwKSlcbiAgICAgICAgICA6IChvcHRpb25zID0gbnVsbCksXG4gICAgICAgIEludGVybmFscy5kLkMoaHJlZiwgb3B0aW9ucykpO1xuICAgIH07XG4gICAgZXhwb3J0cy5wcmVmZXRjaEROUyA9IGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIGhyZWYgfHwgIWhyZWYpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJSZWFjdERPTS5wcmVmZXRjaEROUygpOiBFeHBlY3RlZCB0aGUgYGhyZWZgIGFyZ3VtZW50IChmaXJzdCkgdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nIGJ1dCBlbmNvdW50ZXJlZCAlcyBpbnN0ZWFkLlwiLFxuICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ09iamVjdEZvcldhcm5pbmcoaHJlZilcbiAgICAgICAgKTtcbiAgICAgIGVsc2UgaWYgKDEgPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdO1xuICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2Ygb3B0aW9ucyAmJiBvcHRpb25zLmhhc093blByb3BlcnR5KFwiY3Jvc3NPcmlnaW5cIilcbiAgICAgICAgICA/IGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiUmVhY3RET00ucHJlZmV0Y2hETlMoKTogRXhwZWN0ZWQgb25seSBvbmUgYXJndW1lbnQsIGBocmVmYCwgYnV0IGVuY291bnRlcmVkICVzIGFzIGEgc2Vjb25kIGFyZ3VtZW50IGluc3RlYWQuIFRoaXMgYXJndW1lbnQgaXMgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBvcHRpb25zIGFuZCBpcyBjdXJyZW50bHkgZGlzYWxsb3dlZC4gSXQgbG9va3MgbGlrZSB0aGUgeW91IGFyZSBhdHRlbXB0aW5nIHRvIHNldCBhIGNyb3NzT3JpZ2luIHByb3BlcnR5IGZvciB0aGlzIEROUyBsb29rdXAgaGludC4gQnJvd3NlcnMgZG8gbm90IHBlcmZvcm0gRE5TIHF1ZXJpZXMgdXNpbmcgQ09SUyBhbmQgc2V0dGluZyB0aGlzIGF0dHJpYnV0ZSBvbiB0aGUgcmVzb3VyY2UgaGludCBoYXMgbm8gZWZmZWN0LiBUcnkgY2FsbGluZyBSZWFjdERPTS5wcmVmZXRjaEROUygpIHdpdGgganVzdCBhIHNpbmdsZSBzdHJpbmcgYXJndW1lbnQsIGBocmVmYC5cIixcbiAgICAgICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nRW51bUZvcldhcm5pbmcob3B0aW9ucylcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiUmVhY3RET00ucHJlZmV0Y2hETlMoKTogRXhwZWN0ZWQgb25seSBvbmUgYXJndW1lbnQsIGBocmVmYCwgYnV0IGVuY291bnRlcmVkICVzIGFzIGEgc2Vjb25kIGFyZ3VtZW50IGluc3RlYWQuIFRoaXMgYXJndW1lbnQgaXMgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBvcHRpb25zIGFuZCBpcyBjdXJyZW50bHkgZGlzYWxsb3dlZC4gVHJ5IGNhbGxpbmcgUmVhY3RET00ucHJlZmV0Y2hETlMoKSB3aXRoIGp1c3QgYSBzaW5nbGUgc3RyaW5nIGFyZ3VtZW50LCBgaHJlZmAuXCIsXG4gICAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKG9wdGlvbnMpXG4gICAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGhyZWYgJiYgSW50ZXJuYWxzLmQuRChocmVmKTtcbiAgICB9O1xuICAgIGV4cG9ydHMucHJlaW5pdCA9IGZ1bmN0aW9uIChocmVmLCBvcHRpb25zKSB7XG4gICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgaHJlZiAmJiBocmVmXG4gICAgICAgID8gbnVsbCA9PSBvcHRpb25zIHx8IFwib2JqZWN0XCIgIT09IHR5cGVvZiBvcHRpb25zXG4gICAgICAgICAgPyBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIlJlYWN0RE9NLnByZWluaXQoKTogRXhwZWN0ZWQgdGhlIGBvcHRpb25zYCBhcmd1bWVudCAoc2Vjb25kKSB0byBiZSBhbiBvYmplY3Qgd2l0aCBhbiBgYXNgIHByb3BlcnR5IGRlc2NyaWJpbmcgdGhlIHR5cGUgb2YgcmVzb3VyY2UgdG8gYmUgcHJlaW5pdGlhbGl6ZWQgYnV0IGVuY291bnRlcmVkICVzIGluc3RlYWQuXCIsXG4gICAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKG9wdGlvbnMpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBcInN0eWxlXCIgIT09IG9wdGlvbnMuYXMgJiZcbiAgICAgICAgICAgIFwic2NyaXB0XCIgIT09IG9wdGlvbnMuYXMgJiZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdSZWFjdERPTS5wcmVpbml0KCk6IEV4cGVjdGVkIHRoZSBgYXNgIHByb3BlcnR5IGluIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQgKHNlY29uZCkgdG8gY29udGFpbiBhIHZhbGlkIHZhbHVlIGRlc2NyaWJpbmcgdGhlIHR5cGUgb2YgcmVzb3VyY2UgdG8gYmUgcHJlaW5pdGlhbGl6ZWQgYnV0IGVuY291bnRlcmVkICVzIGluc3RlYWQuIFZhbGlkIHZhbHVlcyBmb3IgYGFzYCBhcmUgXCJzdHlsZVwiIGFuZCBcInNjcmlwdFwiLicsXG4gICAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKG9wdGlvbnMuYXMpXG4gICAgICAgICAgICApXG4gICAgICAgIDogY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIFwiUmVhY3RET00ucHJlaW5pdCgpOiBFeHBlY3RlZCB0aGUgYGhyZWZgIGFyZ3VtZW50IChmaXJzdCkgdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nIGJ1dCBlbmNvdW50ZXJlZCAlcyBpbnN0ZWFkLlwiLFxuICAgICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nT2JqZWN0Rm9yV2FybmluZyhocmVmKVxuICAgICAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBocmVmICYmXG4gICAgICAgIG9wdGlvbnMgJiZcbiAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMuYXNcbiAgICAgICkge1xuICAgICAgICB2YXIgYXMgPSBvcHRpb25zLmFzLFxuICAgICAgICAgIGNyb3NzT3JpZ2luID0gZ2V0Q3Jvc3NPcmlnaW5TdHJpbmdBcyhhcywgb3B0aW9ucy5jcm9zc09yaWdpbiksXG4gICAgICAgICAgaW50ZWdyaXR5ID1cbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zLmludGVncml0eSA/IG9wdGlvbnMuaW50ZWdyaXR5IDogdm9pZCAwLFxuICAgICAgICAgIGZldGNoUHJpb3JpdHkgPVxuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMuZmV0Y2hQcmlvcml0eVxuICAgICAgICAgICAgICA/IG9wdGlvbnMuZmV0Y2hQcmlvcml0eVxuICAgICAgICAgICAgICA6IHZvaWQgMDtcbiAgICAgICAgXCJzdHlsZVwiID09PSBhc1xuICAgICAgICAgID8gSW50ZXJuYWxzLmQuUyhcbiAgICAgICAgICAgICAgaHJlZixcbiAgICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMucHJlY2VkZW5jZVxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5wcmVjZWRlbmNlXG4gICAgICAgICAgICAgICAgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogY3Jvc3NPcmlnaW4sXG4gICAgICAgICAgICAgICAgaW50ZWdyaXR5OiBpbnRlZ3JpdHksXG4gICAgICAgICAgICAgICAgZmV0Y2hQcmlvcml0eTogZmV0Y2hQcmlvcml0eVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBcInNjcmlwdFwiID09PSBhcyAmJlxuICAgICAgICAgICAgSW50ZXJuYWxzLmQuWChocmVmLCB7XG4gICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBjcm9zc09yaWdpbixcbiAgICAgICAgICAgICAgaW50ZWdyaXR5OiBpbnRlZ3JpdHksXG4gICAgICAgICAgICAgIGZldGNoUHJpb3JpdHk6IGZldGNoUHJpb3JpdHksXG4gICAgICAgICAgICAgIG5vbmNlOiBcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5ub25jZSA/IG9wdGlvbnMubm9uY2UgOiB2b2lkIDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5wcmVpbml0TW9kdWxlID0gZnVuY3Rpb24gKGhyZWYsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBlbmNvdW50ZXJlZCA9IFwiXCI7XG4gICAgICAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGhyZWYgJiYgaHJlZikgfHxcbiAgICAgICAgKGVuY291bnRlcmVkICs9XG4gICAgICAgICAgXCIgVGhlIGBocmVmYCBhcmd1bWVudCBlbmNvdW50ZXJlZCB3YXMgXCIgK1xuICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ09iamVjdEZvcldhcm5pbmcoaHJlZikgK1xuICAgICAgICAgIFwiLlwiKTtcbiAgICAgIHZvaWQgMCAhPT0gb3B0aW9ucyAmJiBcIm9iamVjdFwiICE9PSB0eXBlb2Ygb3B0aW9uc1xuICAgICAgICA/IChlbmNvdW50ZXJlZCArPVxuICAgICAgICAgICAgXCIgVGhlIGBvcHRpb25zYCBhcmd1bWVudCBlbmNvdW50ZXJlZCB3YXMgXCIgK1xuICAgICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nT2JqZWN0Rm9yV2FybmluZyhvcHRpb25zKSArXG4gICAgICAgICAgICBcIi5cIilcbiAgICAgICAgOiBvcHRpb25zICYmXG4gICAgICAgICAgXCJhc1wiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgICBcInNjcmlwdFwiICE9PSBvcHRpb25zLmFzICYmXG4gICAgICAgICAgKGVuY291bnRlcmVkICs9XG4gICAgICAgICAgICBcIiBUaGUgYGFzYCBvcHRpb24gZW5jb3VudGVyZWQgd2FzIFwiICtcbiAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKG9wdGlvbnMuYXMpICtcbiAgICAgICAgICAgIFwiLlwiKTtcbiAgICAgIGlmIChlbmNvdW50ZXJlZClcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIlJlYWN0RE9NLnByZWluaXRNb2R1bGUoKTogRXhwZWN0ZWQgdXAgdG8gdHdvIGFyZ3VtZW50cywgYSBub24tZW1wdHkgYGhyZWZgIHN0cmluZyBhbmQsIG9wdGlvbmFsbHksIGFuIGBvcHRpb25zYCBvYmplY3Qgd2l0aCBhIHZhbGlkIGBhc2AgcHJvcGVydHkuJXNcIixcbiAgICAgICAgICBlbmNvdW50ZXJlZFxuICAgICAgICApO1xuICAgICAgZWxzZVxuICAgICAgICBzd2l0Y2ggKFxuICAgICAgICAgICgoZW5jb3VudGVyZWQgPVxuICAgICAgICAgICAgb3B0aW9ucyAmJiBcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5hcyA/IG9wdGlvbnMuYXMgOiBcInNjcmlwdFwiKSxcbiAgICAgICAgICBlbmNvdW50ZXJlZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2FzZSBcInNjcmlwdFwiOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIChlbmNvdW50ZXJlZCA9XG4gICAgICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ0VudW1Gb3JXYXJuaW5nKGVuY291bnRlcmVkKSksXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ1JlYWN0RE9NLnByZWluaXRNb2R1bGUoKTogQ3VycmVudGx5IHRoZSBvbmx5IHN1cHBvcnRlZCBcImFzXCIgdHlwZSBmb3IgdGhpcyBmdW5jdGlvbiBpcyBcInNjcmlwdFwiIGJ1dCByZWNlaXZlZCBcIiVzXCIgaW5zdGVhZC4gVGhpcyB3YXJuaW5nIHdhcyBnZW5lcmF0ZWQgZm9yIGBocmVmYCBcIiVzXCIuIEluIHRoZSBmdXR1cmUgb3RoZXIgbW9kdWxlIHR5cGVzIHdpbGwgYmUgc3VwcG9ydGVkLCBhbGlnbmluZyB3aXRoIHRoZSBpbXBvcnQtYXR0cmlidXRlcyBwcm9wb3NhbC4gTGVhcm4gbW9yZSBoZXJlOiAoaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtaW1wb3J0LWF0dHJpYnV0ZXMpJyxcbiAgICAgICAgICAgICAgICBlbmNvdW50ZXJlZCxcbiAgICAgICAgICAgICAgICBocmVmXG4gICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgaHJlZilcbiAgICAgICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiBvcHRpb25zICYmIG51bGwgIT09IG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAobnVsbCA9PSBvcHRpb25zLmFzIHx8IFwic2NyaXB0XCIgPT09IG9wdGlvbnMuYXMpXG4gICAgICAgICAgICAoZW5jb3VudGVyZWQgPSBnZXRDcm9zc09yaWdpblN0cmluZ0FzKFxuICAgICAgICAgICAgICBvcHRpb25zLmFzLFxuICAgICAgICAgICAgICBvcHRpb25zLmNyb3NzT3JpZ2luXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgSW50ZXJuYWxzLmQuTShocmVmLCB7XG4gICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46IGVuY291bnRlcmVkLFxuICAgICAgICAgICAgICAgIGludGVncml0eTpcbiAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zLmludGVncml0eVxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuaW50ZWdyaXR5XG4gICAgICAgICAgICAgICAgICAgIDogdm9pZCAwLFxuICAgICAgICAgICAgICAgIG5vbmNlOlxuICAgICAgICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMubm9uY2UgPyBvcHRpb25zLm5vbmNlIDogdm9pZCAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgbnVsbCA9PSBvcHRpb25zICYmIEludGVybmFscy5kLk0oaHJlZik7XG4gICAgfTtcbiAgICBleHBvcnRzLnByZWxvYWQgPSBmdW5jdGlvbiAoaHJlZiwgb3B0aW9ucykge1xuICAgICAgdmFyIGVuY291bnRlcmVkID0gXCJcIjtcbiAgICAgIChcInN0cmluZ1wiID09PSB0eXBlb2YgaHJlZiAmJiBocmVmKSB8fFxuICAgICAgICAoZW5jb3VudGVyZWQgKz1cbiAgICAgICAgICBcIiBUaGUgYGhyZWZgIGFyZ3VtZW50IGVuY291bnRlcmVkIHdhcyBcIiArXG4gICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nT2JqZWN0Rm9yV2FybmluZyhocmVmKSArXG4gICAgICAgICAgXCIuXCIpO1xuICAgICAgbnVsbCA9PSBvcHRpb25zIHx8IFwib2JqZWN0XCIgIT09IHR5cGVvZiBvcHRpb25zXG4gICAgICAgID8gKGVuY291bnRlcmVkICs9XG4gICAgICAgICAgICBcIiBUaGUgYG9wdGlvbnNgIGFyZ3VtZW50IGVuY291bnRlcmVkIHdhcyBcIiArXG4gICAgICAgICAgICBnZXRWYWx1ZURlc2NyaXB0b3JFeHBlY3RpbmdPYmplY3RGb3JXYXJuaW5nKG9wdGlvbnMpICtcbiAgICAgICAgICAgIFwiLlwiKVxuICAgICAgICA6IChcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5hcyAmJiBvcHRpb25zLmFzKSB8fFxuICAgICAgICAgIChlbmNvdW50ZXJlZCArPVxuICAgICAgICAgICAgXCIgVGhlIGBhc2Agb3B0aW9uIGVuY291bnRlcmVkIHdhcyBcIiArXG4gICAgICAgICAgICBnZXRWYWx1ZURlc2NyaXB0b3JFeHBlY3RpbmdPYmplY3RGb3JXYXJuaW5nKG9wdGlvbnMuYXMpICtcbiAgICAgICAgICAgIFwiLlwiKTtcbiAgICAgIGVuY291bnRlcmVkICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgJ1JlYWN0RE9NLnByZWxvYWQoKTogRXhwZWN0ZWQgdHdvIGFyZ3VtZW50cywgYSBub24tZW1wdHkgYGhyZWZgIHN0cmluZyBhbmQgYW4gYG9wdGlvbnNgIG9iamVjdCB3aXRoIGFuIGBhc2AgcHJvcGVydHkgdmFsaWQgZm9yIGEgYDxsaW5rIHJlbD1cInByZWxvYWRcIiBhcz1cIi4uLlwiIC8+YCB0YWcuJXMnLFxuICAgICAgICAgIGVuY291bnRlcmVkXG4gICAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBocmVmICYmXG4gICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiBvcHRpb25zICYmXG4gICAgICAgIG51bGwgIT09IG9wdGlvbnMgJiZcbiAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMuYXNcbiAgICAgICkge1xuICAgICAgICBlbmNvdW50ZXJlZCA9IG9wdGlvbnMuYXM7XG4gICAgICAgIHZhciBjcm9zc09yaWdpbiA9IGdldENyb3NzT3JpZ2luU3RyaW5nQXMoXG4gICAgICAgICAgZW5jb3VudGVyZWQsXG4gICAgICAgICAgb3B0aW9ucy5jcm9zc09yaWdpblxuICAgICAgICApO1xuICAgICAgICBJbnRlcm5hbHMuZC5MKGhyZWYsIGVuY291bnRlcmVkLCB7XG4gICAgICAgICAgY3Jvc3NPcmlnaW46IGNyb3NzT3JpZ2luLFxuICAgICAgICAgIGludGVncml0eTpcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zLmludGVncml0eSA/IG9wdGlvbnMuaW50ZWdyaXR5IDogdm9pZCAwLFxuICAgICAgICAgIG5vbmNlOiBcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5ub25jZSA/IG9wdGlvbnMubm9uY2UgOiB2b2lkIDAsXG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMudHlwZSA/IG9wdGlvbnMudHlwZSA6IHZvaWQgMCxcbiAgICAgICAgICBmZXRjaFByaW9yaXR5OlxuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMuZmV0Y2hQcmlvcml0eVxuICAgICAgICAgICAgICA/IG9wdGlvbnMuZmV0Y2hQcmlvcml0eVxuICAgICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICByZWZlcnJlclBvbGljeTpcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zLnJlZmVycmVyUG9saWN5XG4gICAgICAgICAgICAgID8gb3B0aW9ucy5yZWZlcnJlclBvbGljeVxuICAgICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICBpbWFnZVNyY1NldDpcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBvcHRpb25zLmltYWdlU3JjU2V0XG4gICAgICAgICAgICAgID8gb3B0aW9ucy5pbWFnZVNyY1NldFxuICAgICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICBpbWFnZVNpemVzOlxuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMuaW1hZ2VTaXplc1xuICAgICAgICAgICAgICA/IG9wdGlvbnMuaW1hZ2VTaXplc1xuICAgICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICBtZWRpYTogXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG9wdGlvbnMubWVkaWEgPyBvcHRpb25zLm1lZGlhIDogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5wcmVsb2FkTW9kdWxlID0gZnVuY3Rpb24gKGhyZWYsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBlbmNvdW50ZXJlZCA9IFwiXCI7XG4gICAgICAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGhyZWYgJiYgaHJlZikgfHxcbiAgICAgICAgKGVuY291bnRlcmVkICs9XG4gICAgICAgICAgXCIgVGhlIGBocmVmYCBhcmd1bWVudCBlbmNvdW50ZXJlZCB3YXMgXCIgK1xuICAgICAgICAgIGdldFZhbHVlRGVzY3JpcHRvckV4cGVjdGluZ09iamVjdEZvcldhcm5pbmcoaHJlZikgK1xuICAgICAgICAgIFwiLlwiKTtcbiAgICAgIHZvaWQgMCAhPT0gb3B0aW9ucyAmJiBcIm9iamVjdFwiICE9PSB0eXBlb2Ygb3B0aW9uc1xuICAgICAgICA/IChlbmNvdW50ZXJlZCArPVxuICAgICAgICAgICAgXCIgVGhlIGBvcHRpb25zYCBhcmd1bWVudCBlbmNvdW50ZXJlZCB3YXMgXCIgK1xuICAgICAgICAgICAgZ2V0VmFsdWVEZXNjcmlwdG9yRXhwZWN0aW5nT2JqZWN0Rm9yV2FybmluZyhvcHRpb25zKSArXG4gICAgICAgICAgICBcIi5cIilcbiAgICAgICAgOiBvcHRpb25zICYmXG4gICAgICAgICAgXCJhc1wiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgICBcInN0cmluZ1wiICE9PSB0eXBlb2Ygb3B0aW9ucy5hcyAmJlxuICAgICAgICAgIChlbmNvdW50ZXJlZCArPVxuICAgICAgICAgICAgXCIgVGhlIGBhc2Agb3B0aW9uIGVuY291bnRlcmVkIHdhcyBcIiArXG4gICAgICAgICAgICBnZXRWYWx1ZURlc2NyaXB0b3JFeHBlY3RpbmdPYmplY3RGb3JXYXJuaW5nKG9wdGlvbnMuYXMpICtcbiAgICAgICAgICAgIFwiLlwiKTtcbiAgICAgIGVuY291bnRlcmVkICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgJ1JlYWN0RE9NLnByZWxvYWRNb2R1bGUoKTogRXhwZWN0ZWQgdHdvIGFyZ3VtZW50cywgYSBub24tZW1wdHkgYGhyZWZgIHN0cmluZyBhbmQsIG9wdGlvbmFsbHksIGFuIGBvcHRpb25zYCBvYmplY3Qgd2l0aCBhbiBgYXNgIHByb3BlcnR5IHZhbGlkIGZvciBhIGA8bGluayByZWw9XCJtb2R1bGVwcmVsb2FkXCIgYXM9XCIuLi5cIiAvPmAgdGFnLiVzJyxcbiAgICAgICAgICBlbmNvdW50ZXJlZFxuICAgICAgICApO1xuICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGhyZWYgJiZcbiAgICAgICAgKG9wdGlvbnNcbiAgICAgICAgICA/ICgoZW5jb3VudGVyZWQgPSBnZXRDcm9zc09yaWdpblN0cmluZ0FzKFxuICAgICAgICAgICAgICBvcHRpb25zLmFzLFxuICAgICAgICAgICAgICBvcHRpb25zLmNyb3NzT3JpZ2luXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIEludGVybmFscy5kLm0oaHJlZiwge1xuICAgICAgICAgICAgICBhczpcbiAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5hcyAmJiBcInNjcmlwdFwiICE9PSBvcHRpb25zLmFzXG4gICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuYXNcbiAgICAgICAgICAgICAgICAgIDogdm9pZCAwLFxuICAgICAgICAgICAgICBjcm9zc09yaWdpbjogZW5jb3VudGVyZWQsXG4gICAgICAgICAgICAgIGludGVncml0eTpcbiAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2Ygb3B0aW9ucy5pbnRlZ3JpdHlcbiAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5pbnRlZ3JpdHlcbiAgICAgICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICA6IEludGVybmFscy5kLm0oaHJlZikpO1xuICAgIH07XG4gICAgZXhwb3J0cy5yZXF1ZXN0Rm9ybVJlc2V0ID0gZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgIEludGVybmFscy5kLnIoZm9ybSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzID0gZnVuY3Rpb24gKGZuLCBhKSB7XG4gICAgICByZXR1cm4gZm4oYSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUZvcm1TdGF0ZSA9IGZ1bmN0aW9uIChhY3Rpb24sIGluaXRpYWxTdGF0ZSwgcGVybWFsaW5rKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VGb3JtU3RhdGUoYWN0aW9uLCBpbml0aWFsU3RhdGUsIHBlcm1hbGluayk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUZvcm1TdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VIb3N0VHJhbnNpdGlvblN0YXR1cygpO1xuICAgIH07XG4gICAgZXhwb3J0cy52ZXJzaW9uID0gXCIxOS4yLjFcIjtcbiAgICBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICYmXG4gICAgICBcImZ1bmN0aW9uXCIgPT09XG4gICAgICAgIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AgJiZcbiAgICAgIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RvcChFcnJvcigpKTtcbiAgfSkoKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNoZWNrRENFKCkge1xuICAvKiBnbG9iYWwgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICovXG4gIGlmIChcbiAgICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSAndW5kZWZpbmVkJyB8fFxuICAgIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18uY2hlY2tEQ0UgIT09ICdmdW5jdGlvbidcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhpcyBicmFuY2ggaXMgdW5yZWFjaGFibGUgYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkXG4gICAgLy8gaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBjb25kaXRpb24gaXMgdHJ1ZSBvbmx5IGluIGRldmVsb3BtZW50LlxuICAgIC8vIFRoZXJlZm9yZSBpZiB0aGUgYnJhbmNoIGlzIHN0aWxsIGhlcmUsIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3YXNuJ3RcbiAgICAvLyBwcm9wZXJseSBhcHBsaWVkLlxuICAgIC8vIERvbid0IGNoYW5nZSB0aGUgbWVzc2FnZS4gUmVhY3QgRGV2VG9vbHMgcmVsaWVzIG9uIGl0LiBBbHNvIG1ha2Ugc3VyZVxuICAgIC8vIHRoaXMgbWVzc2FnZSBkb2Vzbid0IG9jY3VyIGVsc2V3aGVyZSBpbiB0aGlzIGZ1bmN0aW9uLCBvciBpdCB3aWxsIGNhdXNlXG4gICAgLy8gYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ15fXicpO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gVmVyaWZ5IHRoYXQgdGhlIGNvZGUgYWJvdmUgaGFzIGJlZW4gZGVhZCBjb2RlIGVsaW1pbmF0ZWQgKERDRSdkKS5cbiAgICBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18uY2hlY2tEQ0UoY2hlY2tEQ0UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBEZXZUb29scyBzaG91bGRuJ3QgY3Jhc2ggUmVhY3QsIG5vIG1hdHRlciB3aGF0LlxuICAgIC8vIFdlIHNob3VsZCBzdGlsbCByZXBvcnQgaW4gY2FzZSB3ZSBicmVhayB0aGlzIGNvZGUuXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vIERDRSBjaGVjayBzaG91bGQgaGFwcGVuIGJlZm9yZSBSZWFjdERPTSBidW5kbGUgZXhlY3V0ZXMgc28gdGhhdFxuICAvLyBEZXZUb29scyBjYW4gcmVwb3J0IGJhZCBtaW5pZmljYXRpb24gZHVyaW5nIGluamVjdGlvbi5cbiAgY2hlY2tEQ0UoKTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1kb20ucHJvZHVjdGlvbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1kb20uZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlIFJlYWN0XG4gKiByZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiZcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSkge1xuICAgICAgaWYgKG51bGwgPT0gdHlwZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgdHlwZSlcbiAgICAgICAgcmV0dXJuIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0VcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHR5cGUpIHJldHVybiB0eXBlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJGcmFnbWVudFwiO1xuICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiUHJvZmlsZXJcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN0cmljdE1vZGVcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN1c3BlbnNlXCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlN1c3BlbnNlTGlzdFwiO1xuICAgICAgICBjYXNlIFJFQUNUX0FDVElWSVRZX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiQWN0aXZpdHlcIjtcbiAgICAgIH1cbiAgICAgIGlmIChcIm9iamVjdFwiID09PSB0eXBlb2YgdHlwZSlcbiAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAoXCJudW1iZXJcIiA9PT0gdHlwZW9mIHR5cGUudGFnICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIlJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgb2JqZWN0IGluIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSgpLiBUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgdHlwZS4kJHR5cGVvZilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBvcnRhbFwiO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgXCJDb250ZXh0XCI7XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05TVU1FUl9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuICh0eXBlLl9jb250ZXh0LmRpc3BsYXlOYW1lIHx8IFwiQ29udGV4dFwiKSArIFwiLkNvbnN1bWVyXCI7XG4gICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgdmFyIGlubmVyVHlwZSA9IHR5cGUucmVuZGVyO1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUuZGlzcGxheU5hbWU7XG4gICAgICAgICAgICB0eXBlIHx8XG4gICAgICAgICAgICAgICgodHlwZSA9IGlubmVyVHlwZS5kaXNwbGF5TmFtZSB8fCBpbm5lclR5cGUubmFtZSB8fCBcIlwiKSxcbiAgICAgICAgICAgICAgKHR5cGUgPSBcIlwiICE9PSB0eXBlID8gXCJGb3J3YXJkUmVmKFwiICsgdHlwZSArIFwiKVwiIDogXCJGb3J3YXJkUmVmXCIpKTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgKGlubmVyVHlwZSA9IHR5cGUuZGlzcGxheU5hbWUgfHwgbnVsbCksXG4gICAgICAgICAgICAgIG51bGwgIT09IGlubmVyVHlwZVxuICAgICAgICAgICAgICAgID8gaW5uZXJUeXBlXG4gICAgICAgICAgICAgICAgOiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZS50eXBlKSB8fCBcIk1lbW9cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgIGlubmVyVHlwZSA9IHR5cGUuX3BheWxvYWQ7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS5faW5pdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZShpbm5lclR5cGUpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQgPSAhMTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITA7XG4gICAgICB9XG4gICAgICBpZiAoSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0KSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9IGNvbnNvbGU7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX3RlbXBfY29uc3QgPSBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQuZXJyb3I7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQkanNjb21wJDAgPVxuICAgICAgICAgIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBTeW1ib2wgJiZcbiAgICAgICAgICAgIFN5bWJvbC50b1N0cmluZ1RhZyAmJlxuICAgICAgICAgICAgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSkgfHxcbiAgICAgICAgICB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIHx8XG4gICAgICAgICAgXCJPYmplY3RcIjtcbiAgICAgICAgSlNDb21waWxlcl90ZW1wX2NvbnN0LmNhbGwoXG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0LFxuICAgICAgICAgIFwiVGhlIHByb3ZpZGVkIGtleSBpcyBhbiB1bnN1cHBvcnRlZCB0eXBlICVzLiBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgdXNpbmcgaXQgaGVyZS5cIixcbiAgICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQkanNjb21wJDBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tOYW1lKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSByZXR1cm4gXCI8PlwiO1xuICAgICAgaWYgKFxuICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2YgdHlwZSAmJlxuICAgICAgICBudWxsICE9PSB0eXBlICYmXG4gICAgICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRVxuICAgICAgKVxuICAgICAgICByZXR1cm4gXCI8Li4uPlwiO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICAgIHJldHVybiBuYW1lID8gXCI8XCIgKyBuYW1lICsgXCI+XCIgOiBcIjwuLi4+XCI7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIHJldHVybiBcIjwuLi4+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE93bmVyKCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5BO1xuICAgICAgcmV0dXJuIG51bGwgPT09IGRpc3BhdGNoZXIgPyBudWxsIDogZGlzcGF0Y2hlci5nZXRPd25lcigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBVbmtub3duT3duZXIoKSB7XG4gICAgICByZXR1cm4gRXJyb3IoXCJyZWFjdC1zdGFjay10b3AtZnJhbWVcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBcImtleVwiKSkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsIFwia2V5XCIpLmdldDtcbiAgICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHJldHVybiAhMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDAgIT09IGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICAgICAgZnVuY3Rpb24gd2FybkFib3V0QWNjZXNzaW5nS2V5KCkge1xuICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biB8fFxuICAgICAgICAgICgoc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSAhMCksXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIFwiJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSB2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50IHByb3AuIChodHRwczovL3JlYWN0LmRldi9saW5rL3NwZWNpYWwtcHJvcHMpXCIsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZVxuICAgICAgICAgICkpO1xuICAgICAgfVxuICAgICAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gITA7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsIFwia2V5XCIsIHtcbiAgICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbGVtZW50UmVmR2V0dGVyV2l0aERlcHJlY2F0aW9uV2FybmluZygpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHRoaXMudHlwZSk7XG4gICAgICBkaWRXYXJuQWJvdXRFbGVtZW50UmVmW2NvbXBvbmVudE5hbWVdIHx8XG4gICAgICAgICgoZGlkV2FybkFib3V0RWxlbWVudFJlZltjb21wb25lbnROYW1lXSA9ICEwKSxcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkFjY2Vzc2luZyBlbGVtZW50LnJlZiB3YXMgcmVtb3ZlZCBpbiBSZWFjdCAxOS4gcmVmIGlzIG5vdyBhIHJlZ3VsYXIgcHJvcC4gSXQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIEpTWCBFbGVtZW50IHR5cGUgaW4gYSBmdXR1cmUgcmVsZWFzZS5cIlxuICAgICAgICApKTtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSB0aGlzLnByb3BzLnJlZjtcbiAgICAgIHJldHVybiB2b2lkIDAgIT09IGNvbXBvbmVudE5hbWUgPyBjb21wb25lbnROYW1lIDogbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcHJvcHMsIG93bmVyLCBkZWJ1Z1N0YWNrLCBkZWJ1Z1Rhc2spIHtcbiAgICAgIHZhciByZWZQcm9wID0gcHJvcHMucmVmO1xuICAgICAgdHlwZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgICAgX293bmVyOiBvd25lclxuICAgICAgfTtcbiAgICAgIG51bGwgIT09ICh2b2lkIDAgIT09IHJlZlByb3AgPyByZWZQcm9wIDogbnVsbClcbiAgICAgICAgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJyZWZcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgICAgICBnZXQ6IGVsZW1lbnRSZWZHZXR0ZXJXaXRoRGVwcmVjYXRpb25XYXJuaW5nXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJyZWZcIiwgeyBlbnVtZXJhYmxlOiAhMSwgdmFsdWU6IG51bGwgfSk7XG4gICAgICB0eXBlLl9zdG9yZSA9IHt9O1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUuX3N0b3JlLCBcInZhbGlkYXRlZFwiLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgIHZhbHVlOiAwXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBcIl9kZWJ1Z0luZm9cIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdTdGFja1wiLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgIHZhbHVlOiBkZWJ1Z1N0YWNrXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBcIl9kZWJ1Z1Rhc2tcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogZGVidWdUYXNrXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5mcmVlemUgJiYgKE9iamVjdC5mcmVlemUodHlwZS5wcm9wcyksIE9iamVjdC5mcmVlemUodHlwZSkpO1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGpzeERFVkltcGwoXG4gICAgICB0eXBlLFxuICAgICAgY29uZmlnLFxuICAgICAgbWF5YmVLZXksXG4gICAgICBpc1N0YXRpY0NoaWxkcmVuLFxuICAgICAgZGVidWdTdGFjayxcbiAgICAgIGRlYnVnVGFza1xuICAgICkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gY29uZmlnLmNoaWxkcmVuO1xuICAgICAgaWYgKHZvaWQgMCAhPT0gY2hpbGRyZW4pXG4gICAgICAgIGlmIChpc1N0YXRpY0NoaWxkcmVuKVxuICAgICAgICAgIGlmIChpc0FycmF5SW1wbChjaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgIGlzU3RhdGljQ2hpbGRyZW4gPSAwO1xuICAgICAgICAgICAgICBpc1N0YXRpY0NoaWxkcmVuIDwgY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICBpc1N0YXRpY0NoaWxkcmVuKytcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoY2hpbGRyZW5baXNTdGF0aWNDaGlsZHJlbl0pO1xuICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZSAmJiBPYmplY3QuZnJlZXplKGNoaWxkcmVuKTtcbiAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiUmVhY3QuanN4OiBTdGF0aWMgY2hpbGRyZW4gc2hvdWxkIGFsd2F5cyBiZSBhbiBhcnJheS4gWW91IGFyZSBsaWtlbHkgZXhwbGljaXRseSBjYWxsaW5nIFJlYWN0LmpzeHMgb3IgUmVhY3QuanN4REVWLiBVc2UgdGhlIEJhYmVsIHRyYW5zZm9ybSBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICBlbHNlIHZhbGlkYXRlQ2hpbGRLZXlzKGNoaWxkcmVuKTtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgXCJrZXlcIikpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY29uZmlnKS5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICByZXR1cm4gXCJrZXlcIiAhPT0gaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlzU3RhdGljQ2hpbGRyZW4gPVxuICAgICAgICAgIDAgPCBrZXlzLmxlbmd0aFxuICAgICAgICAgICAgPyBcIntrZXk6IHNvbWVLZXksIFwiICsga2V5cy5qb2luKFwiOiAuLi4sIFwiKSArIFwiOiAuLi59XCJcbiAgICAgICAgICAgIDogXCJ7a2V5OiBzb21lS2V5fVwiO1xuICAgICAgICBkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY2hpbGRyZW4gKyBpc1N0YXRpY0NoaWxkcmVuXSB8fFxuICAgICAgICAgICgoa2V5cyA9XG4gICAgICAgICAgICAwIDwga2V5cy5sZW5ndGggPyBcIntcIiArIGtleXMuam9pbihcIjogLi4uLCBcIikgKyBcIjogLi4ufVwiIDogXCJ7fVwiKSxcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgJ0EgcHJvcHMgb2JqZWN0IGNvbnRhaW5pbmcgYSBcImtleVwiIHByb3AgaXMgYmVpbmcgc3ByZWFkIGludG8gSlNYOlxcbiAgbGV0IHByb3BzID0gJXM7XFxuICA8JXMgey4uLnByb3BzfSAvPlxcblJlYWN0IGtleXMgbXVzdCBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gSlNYIHdpdGhvdXQgdXNpbmcgc3ByZWFkOlxcbiAgbGV0IHByb3BzID0gJXM7XFxuICA8JXMga2V5PXtzb21lS2V5fSB7Li4ucHJvcHN9IC8+JyxcbiAgICAgICAgICAgIGlzU3RhdGljQ2hpbGRyZW4sXG4gICAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAgIGtleXMsXG4gICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICksXG4gICAgICAgICAgKGRpZFdhcm5BYm91dEtleVNwcmVhZFtjaGlsZHJlbiArIGlzU3RhdGljQ2hpbGRyZW5dID0gITApKTtcbiAgICAgIH1cbiAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgIHZvaWQgMCAhPT0gbWF5YmVLZXkgJiZcbiAgICAgICAgKGNoZWNrS2V5U3RyaW5nQ29lcmNpb24obWF5YmVLZXkpLCAoY2hpbGRyZW4gPSBcIlwiICsgbWF5YmVLZXkpKTtcbiAgICAgIGhhc1ZhbGlkS2V5KGNvbmZpZykgJiZcbiAgICAgICAgKGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY29uZmlnLmtleSksIChjaGlsZHJlbiA9IFwiXCIgKyBjb25maWcua2V5KSk7XG4gICAgICBpZiAoXCJrZXlcIiBpbiBjb25maWcpIHtcbiAgICAgICAgbWF5YmVLZXkgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gY29uZmlnKVxuICAgICAgICAgIFwia2V5XCIgIT09IHByb3BOYW1lICYmIChtYXliZUtleVtwcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdKTtcbiAgICAgIH0gZWxzZSBtYXliZUtleSA9IGNvbmZpZztcbiAgICAgIGNoaWxkcmVuICYmXG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKFxuICAgICAgICAgIG1heWJlS2V5LFxuICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHR5cGVcbiAgICAgICAgICAgID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgXCJVbmtub3duXCJcbiAgICAgICAgICAgIDogdHlwZVxuICAgICAgICApO1xuICAgICAgcmV0dXJuIFJlYWN0RWxlbWVudChcbiAgICAgICAgdHlwZSxcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIG1heWJlS2V5LFxuICAgICAgICBnZXRPd25lcigpLFxuICAgICAgICBkZWJ1Z1N0YWNrLFxuICAgICAgICBkZWJ1Z1Rhc2tcbiAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUpIHtcbiAgICAgIGlzVmFsaWRFbGVtZW50KG5vZGUpXG4gICAgICAgID8gbm9kZS5fc3RvcmUgJiYgKG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IDEpXG4gICAgICAgIDogXCJvYmplY3RcIiA9PT0gdHlwZW9mIG5vZGUgJiZcbiAgICAgICAgICBudWxsICE9PSBub2RlICYmXG4gICAgICAgICAgbm9kZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFICYmXG4gICAgICAgICAgKFwiZnVsZmlsbGVkXCIgPT09IG5vZGUuX3BheWxvYWQuc3RhdHVzXG4gICAgICAgICAgICA/IGlzVmFsaWRFbGVtZW50KG5vZGUuX3BheWxvYWQudmFsdWUpICYmXG4gICAgICAgICAgICAgIG5vZGUuX3BheWxvYWQudmFsdWUuX3N0b3JlICYmXG4gICAgICAgICAgICAgIChub2RlLl9wYXlsb2FkLnZhbHVlLl9zdG9yZS52YWxpZGF0ZWQgPSAxKVxuICAgICAgICAgICAgOiBub2RlLl9zdG9yZSAmJiAobm9kZS5fc3RvcmUudmFsaWRhdGVkID0gMSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiBvYmplY3QgJiZcbiAgICAgICAgbnVsbCAhPT0gb2JqZWN0ICYmXG4gICAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG4gICAgICApO1xuICAgIH1cbiAgICB2YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIiksXG4gICAgICBSRUFDVF9FTEVNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QudHJhbnNpdGlvbmFsLmVsZW1lbnRcIiksXG4gICAgICBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIiksXG4gICAgICBSRUFDVF9GUkFHTUVOVF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmZyYWdtZW50XCIpLFxuICAgICAgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5zdHJpY3RfbW9kZVwiKSxcbiAgICAgIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QucHJvZmlsZXJcIiksXG4gICAgICBSRUFDVF9DT05TVU1FUl9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmNvbnN1bWVyXCIpLFxuICAgICAgUkVBQ1RfQ09OVEVYVF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmNvbnRleHRcIiksXG4gICAgICBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpLFxuICAgICAgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZVwiKSxcbiAgICAgIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5zdXNwZW5zZV9saXN0XCIpLFxuICAgICAgUkVBQ1RfTUVNT19UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIiksXG4gICAgICBSRUFDVF9MQVpZX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QubGF6eVwiKSxcbiAgICAgIFJFQUNUX0FDVElWSVRZX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QuYWN0aXZpdHlcIiksXG4gICAgICBSRUFDVF9DTElFTlRfUkVGRVJFTkNFID0gU3ltYm9sLmZvcihcInJlYWN0LmNsaWVudC5yZWZlcmVuY2VcIiksXG4gICAgICBSZWFjdFNoYXJlZEludGVybmFscyA9XG4gICAgICAgIFJlYWN0Ll9fQ0xJRU5UX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1dBUk5fVVNFUlNfVEhFWV9DQU5OT1RfVVBHUkFERSxcbiAgICAgIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIGlzQXJyYXlJbXBsID0gQXJyYXkuaXNBcnJheSxcbiAgICAgIGNyZWF0ZVRhc2sgPSBjb25zb2xlLmNyZWF0ZVRhc2tcbiAgICAgICAgPyBjb25zb2xlLmNyZWF0ZVRhc2tcbiAgICAgICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9O1xuICAgIFJlYWN0ID0ge1xuICAgICAgcmVhY3Rfc3RhY2tfYm90dG9tX2ZyYW1lOiBmdW5jdGlvbiAoY2FsbFN0YWNrRm9yRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxTdGFja0ZvckVycm9yKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd247XG4gICAgdmFyIGRpZFdhcm5BYm91dEVsZW1lbnRSZWYgPSB7fTtcbiAgICB2YXIgdW5rbm93bk93bmVyRGVidWdTdGFjayA9IFJlYWN0LnJlYWN0X3N0YWNrX2JvdHRvbV9mcmFtZS5iaW5kKFxuICAgICAgUmVhY3QsXG4gICAgICBVbmtub3duT3duZXJcbiAgICApKCk7XG4gICAgdmFyIHVua25vd25Pd25lckRlYnVnVGFzayA9IGNyZWF0ZVRhc2soZ2V0VGFza05hbWUoVW5rbm93bk93bmVyKSk7XG4gICAgdmFyIGRpZFdhcm5BYm91dEtleVNwcmVhZCA9IHt9O1xuICAgIGV4cG9ydHMuRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xuICAgIGV4cG9ydHMuanN4ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgbWF5YmVLZXkpIHtcbiAgICAgIHZhciB0cmFja0FjdHVhbE93bmVyID1cbiAgICAgICAgMWU0ID4gUmVhY3RTaGFyZWRJbnRlcm5hbHMucmVjZW50bHlDcmVhdGVkT3duZXJTdGFja3MrKztcbiAgICAgIHJldHVybiBqc3hERVZJbXBsKFxuICAgICAgICB0eXBlLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIG1heWJlS2V5LFxuICAgICAgICAhMSxcbiAgICAgICAgdHJhY2tBY3R1YWxPd25lclxuICAgICAgICAgID8gRXJyb3IoXCJyZWFjdC1zdGFjay10b3AtZnJhbWVcIilcbiAgICAgICAgICA6IHVua25vd25Pd25lckRlYnVnU3RhY2ssXG4gICAgICAgIHRyYWNrQWN0dWFsT3duZXIgPyBjcmVhdGVUYXNrKGdldFRhc2tOYW1lKHR5cGUpKSA6IHVua25vd25Pd25lckRlYnVnVGFza1xuICAgICAgKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuanN4cyA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIG1heWJlS2V5KSB7XG4gICAgICB2YXIgdHJhY2tBY3R1YWxPd25lciA9XG4gICAgICAgIDFlNCA+IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnJlY2VudGx5Q3JlYXRlZE93bmVyU3RhY2tzKys7XG4gICAgICByZXR1cm4ganN4REVWSW1wbChcbiAgICAgICAgdHlwZSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBtYXliZUtleSxcbiAgICAgICAgITAsXG4gICAgICAgIHRyYWNrQWN0dWFsT3duZXJcbiAgICAgICAgICA/IEVycm9yKFwicmVhY3Qtc3RhY2stdG9wLWZyYW1lXCIpXG4gICAgICAgICAgOiB1bmtub3duT3duZXJEZWJ1Z1N0YWNrLFxuICAgICAgICB0cmFja0FjdHVhbE93bmVyID8gY3JlYXRlVGFzayhnZXRUYXNrTmFtZSh0eXBlKSkgOiB1bmtub3duT3duZXJEZWJ1Z1Rhc2tcbiAgICAgICk7XG4gICAgfTtcbiAgfSkoKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUucHJvZHVjdGlvbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUsIHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVhY3RET00sIHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMuanN4XCI7XHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVPcHRpb24ob3B0KSB7XHJcbiAgaWYgKCFvcHQpIHJldHVybiB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH07XHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbHVlOiBvcHQudmFsdWUgPz8gb3B0LlZhbHVlID8/IFwiXCIsXHJcbiAgICB0ZXh0OiBvcHQudGV4dCA/PyBvcHQuVGV4dCA/PyBcIlwiLFxyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IGNsYXNzTmFtZXMgPSAoLi4uY2xhc3NlcykgPT4gY2xhc3Nlcy5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XHJcblxyXG5mdW5jdGlvbiB1c2VGbG9hdGluZ1Bvc2l0aW9uKHRhcmdldFJlZiwgb3Blbikge1xyXG4gIGNvbnN0IFtzdHlsZSwgc2V0U3R5bGVdID0gdXNlU3RhdGUoeyB0b3A6IDAsIGxlZnQ6IDAsIHdpZHRoOiAwIH0pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHNldFN0eWxlKHtcclxuICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgNixcclxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXHJcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHVwZGF0ZSgpO1xyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcclxuICAgIH07XHJcbiAgfSwgW29wZW4sIHRhcmdldFJlZl0pO1xyXG5cclxuICByZXR1cm4gc3R5bGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZsb2F0aW5nTGlzdCh7IGFuY2hvclJlZiwgb3BlbiwgekluZGV4ID0gMzYwMDAwLCBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIiwgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IHN0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhbmNob3JSZWYsIG9wZW4pO1xyXG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcclxuICAgIDxkaXZcclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICAgIHRvcDogc3R5bGUudG9wLFxyXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXHJcbiAgICAgICAgd2lkdGg6IHN0eWxlLndpZHRoLFxyXG4gICAgICAgIHpJbmRleCxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LWZ1bGwgb3ZlcmZsb3ctYXV0byByb3VuZGVkLW1kIGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLW5vbmUgJHttYXhIZWlnaHRDbGFzc31gfT5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+LFxyXG4gICAgZG9jdW1lbnQuYm9keVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZU91dHNpZGVDbGljayhyZWZzLCBvbkNsb3NlKSB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxpc3QgPSBBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXTtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXYpID0+IHtcclxuICAgICAgY29uc3QgaW5zaWRlID0gbGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQpKTtcclxuICAgICAgaWYgKGluc2lkZSkgcmV0dXJuO1xyXG4gICAgICBvbkNsb3NlKCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XHJcbiAgICB9O1xyXG4gIH0sIFtvbkNsb3NlLCByZWZzXSk7XHJcbn1cclxuXHJcbmNvbnN0IFZpc2l0VHlwZUNvbWJvYm94ID0gKHsgb3B0aW9ucyA9IFtdLCB0YXJnZXRJZCA9IFwidmlzaXRUeXBlXCIgfSkgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VNZW1vKCgpID0+IG9wdGlvbnMubWFwKG5vcm1hbGl6ZU9wdGlvbiksIFtvcHRpb25zXSk7XHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlKFxyXG4gICAgbm9ybWFsaXplZC5maW5kKCh4KSA9PiB4LnZhbHVlKSA/PyB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH1cclxuICApO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgLy8gS2VlcCB0aGUgdW5kZXJseWluZyBzZWxlY3QgKGZvciBleGlzdGluZyBKUykgaW4gc3luY1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcbiAgICBpZiAoc2VsZWN0ICYmIHNlbGVjdGVkKSB7XHJcbiAgICAgIHNlbGVjdC52YWx1ZSA9IHNlbGVjdGVkLnZhbHVlO1xyXG4gICAgICBzZWxlY3QuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xyXG4gICAgfVxyXG4gIH0sIFtzZWxlY3RlZCwgdGFyZ2V0SWRdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPVxyXG4gICAgcXVlcnkudHJpbSgpID09PSBcIlwiXHJcbiAgICAgID8gbm9ybWFsaXplZFxyXG4gICAgICA6IG5vcm1hbGl6ZWQuZmlsdGVyKChvcHQpID0+XHJcbiAgICAgICAgICBvcHQudGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gIH0sIFtxdWVyeSwgbm9ybWFsaXplZC5sZW5ndGhdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzZWxlY3RlZD8udGV4dCkgc2V0UXVlcnkoc2VsZWN0ZWQudGV4dCk7XHJcbiAgfSwgW3NlbGVjdGVkXSk7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0KSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xyXG4gICAgc2V0UXVlcnkob3B0LnRleHQpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25LZXlEb3duID0gKGV2KSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gJiYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldi5rZXkgPT09IFwiRW50ZXJcIikpIHtcclxuICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFmaWx0ZXJlZC5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCArIDEpICUgZmlsdGVyZWQubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XHJcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmICghbm9ybWFsaXplZC5sZW5ndGgpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LVsxNDAwMDBdXCIgcmVmPXtjb250YWluZXJSZWZ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG10LTFcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3ctc20gZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBzbTp0ZXh0LXNtXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJvcmRlci1ub25lIGJnLXRyYW5zcGFyZW50IHB5LTIgcGwtMyBwci0xMCB0ZXh0LXNtIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLW5vbmVcIlxyXG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHNldE9wZW4odHJ1ZSl9XHJcbiAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiVGlwbyBkZSB2aXNpdGFcIlxyXG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPVwidmlzaXQtdHlwZS1vcHRpb25zXCJcclxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXtcclxuICAgICAgICAgICAgICBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGB2aXNpdC10eXBlLSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKChwcmV2KSA9PiAhcHJldil9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBcIk9jdWx0YXIgb3BjaW9uZXNcIiA6IFwiTW9zdHJhciBvcGNpb25lc1wifVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxGbG9hdGluZ0xpc3QgYW5jaG9yUmVmPXtib3hSZWZ9IG9wZW49e29wZW59IHpJbmRleD17MzYwMDAwfT5cclxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSByb2xlPVwibGlzdGJveFwiIGFyaWEtbGFiZWw9XCJUaXBvIGRlIHZpc2l0YVwiPlxyXG4gICAgICAgICAgICB7ZmlsdGVyZWQubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgcHgtNCBweS0yIHRleHQtc2xhdGUtNzAwXCI+U2luIHJlc3VsdGFkb3M8L2Rpdj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2B2aXNpdC10eXBlLSR7b3B0LnZhbHVlfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTZWxlY3RlZH1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlciBweS0yIHBsLTggcHItMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogaXNTZWxlY3RlZCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge2lzU2VsZWN0ZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZSBwci0yXCIsIGlzU2VsZWN0ZWQgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1vdW50IGhlbHBlclxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdC10eXBlLWNvbWJvYm94LXJvb3RcIik7XHJcbiAgaWYgKCFyb290KSByZXR1cm47XHJcbiAgY29uc3QgZGF0YSA9IHdpbmRvdy5fX1ZJU0lUX1RZUEVTX18gfHwgW107XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFZpc2l0VHlwZUNvbWJvYm94IG9wdGlvbnM9e2RhdGF9IHRhcmdldElkPVwidmlzaXRUeXBlXCIgLz4sXHJcbiAgICByb290XHJcbiAgKTtcclxufTtcclxuXHJcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICBtb3VudCgpO1xyXG59IGVsc2Uge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpc2l0VHlwZUNvbWJvYm94O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICBmaWxsPVwibm9uZVwiXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgID5cbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgPlxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBV0EsT0FDRyxXQUFZO0FBQ1gsaUJBQVMseUJBQXlCLFlBQVksTUFBTTtBQUNsRCxpQkFBTyxlQUFlLFVBQVUsV0FBVyxZQUFZO0FBQUEsWUFDckQsS0FBSyxXQUFZO0FBQ2Ysc0JBQVE7QUFBQSxnQkFDTjtBQUFBLGdCQUNBLEtBQUssQ0FBQztBQUFBLGdCQUNOLEtBQUssQ0FBQztBQUFBLGNBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUNBLGlCQUFTLGNBQWMsZUFBZTtBQUNwQyxjQUFJLFNBQVMsaUJBQWlCLGFBQWEsT0FBTztBQUNoRCxtQkFBTztBQUNULDBCQUNHLHlCQUF5QixjQUFjLHFCQUFxQixLQUM3RCxjQUFj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LEtBQUs7QUFBQSxZQUMzQixNQUFLO0FBQUEsWUFDTCxpQkFBZTtBQUFBLFlBQ2YsV0FBVztBQUFBLGNBQ1Q7QUFBQSxjQUNBLFdBQVcsMEJBQTBCLGFBQWEsK0JBQStCO0FBQUEsWUFDbkY7QUFBQSxZQUNBLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFBQSxZQUN0QyxTQUFTLE1BQU0sYUFBYSxHQUFHO0FBQUEsWUFFOUI7QUFBQSw0QkFDQztBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxXQUFXO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQSxXQUFXLGVBQWU7QUFBQSxrQkFDNUI7QUFBQTtBQUFBLGNBQ0Q7QUFBQSxjQUVILDZDQUFDLFVBQUssV0FBVyxXQUFXLHVCQUF1QixhQUFhLGdCQUFnQixhQUFhLEdBQzFGLGNBQUksTUFDUDtBQUFBO0FBQUE7QUFBQSxVQXJCSyxJQUFJO0FBQUEsUUFzQlg7QUFBQSxNQUVKLENBQUMsR0FFTCxHQUNGO0FBQUEsT0FDRixHQUNGO0FBQUEsRUFFSjtBQUdBLE1BQU0sUUFBUSxNQUFNO0FBQ2xCLFVBQU0sT0FBTyxTQUFTLGVBQWUsMEJBQTBCO0FBQy9ELFFBQUksQ0FBQyxLQUFNO0FBQ1gsVUFBTSxPQUFPLE9BQU8sbUJBQW1CLENBQUM7QUFDeEMscUJBQUFDLFFBQVM7QUFBQSxNQUNQLDZDQUFDLHFCQUFrQixTQUFTLE1BQU0sVUFBUyxhQUFZO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksU0FBUyxlQUFlLFlBQVk7QUFDdEMsVUFBTTtBQUFBLEVBQ1IsT0FBTztBQUNMLFdBQU8saUJBQWlCLG9CQUFvQixLQUFLO0FBQUEsRUFDbkQ7QUFFQSxNQUFPLDhCQUFROyIsCiAgIm5hbWVzIjogWyJSZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0RE9NIl0KfQo=
