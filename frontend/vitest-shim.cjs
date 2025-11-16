// CommonJS preload shim for Vitest that ensures SharedArrayBuffer descriptors exist.
// Use with: NODE_OPTIONS=--require=$GITHUB_WORKSPACE/frontend/vitest-shim.cjs
try {
  var root = typeof globalThis !== 'undefined' ? globalThis :
    (typeof global !== 'undefined' ? global :
      (typeof window !== 'undefined' ? window : {}));

  if (typeof root.SharedArrayBuffer !== 'undefined') {
    var sabProto = root.SharedArrayBuffer.prototype;
    var desc = Object.getOwnPropertyDescriptor(sabProto, 'byteLength');
    if (!desc || typeof desc.get !== 'function') {
      var abDesc = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength');
      if (abDesc && typeof abDesc.get === 'function') {
        Object.defineProperty(sabProto, 'byteLength', {
          get: function () { return abDesc.get.call(this); },
          configurable: true
        });
      }
    }
  } else {
    root.SharedArrayBuffer = function SharedArrayBuffer(size) { return new ArrayBuffer(size); };
    Object.defineProperty(root.SharedArrayBuffer.prototype, 'byteLength', {
      get: function () {
        var getter = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get;
        return getter.call(this);
      },
      configurable: true
    });
  }
} catch (e) {
  // best-effort shim — ignore errors
}
