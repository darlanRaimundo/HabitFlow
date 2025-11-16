// Preload shim to avoid webidl-conversions crash when SharedArrayBuffer descriptors
// aren't present in the Node environment. This script is required before Vitest/jsdom
// loads and attempts to access `SharedArrayBuffer.prototype` descriptors.
try {
  if (typeof SharedArrayBuffer !== 'undefined') {
    const sabProto = SharedArrayBuffer.prototype;
    const desc = Object.getOwnPropertyDescriptor(sabProto, 'byteLength');
    if (!desc || typeof desc.get !== 'function') {
      const abDesc = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength');
      if (abDesc && typeof abDesc.get === 'function') {
        Object.defineProperty(sabProto, 'byteLength', {
          get: function () { return abDesc.get.call(this); },
          configurable: true
        });
      }
    }
  } else {
    // Provide a minimal SharedArrayBuffer polyfill delegating to ArrayBuffer
    global.SharedArrayBuffer = function SharedArrayBuffer(size) { return new ArrayBuffer(size); };
    Object.defineProperty(SharedArrayBuffer.prototype, 'byteLength', {
      get: function () {
        const getter = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get;
        return getter.call(this);
      },
      configurable: true
    });
  }
} catch (e) {
  // swallow any errors — this shim is best-effort
}
