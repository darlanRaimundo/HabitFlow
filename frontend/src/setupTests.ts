import { URL } from 'url';
import { createRequire } from 'module';
import '@testing-library/jest-dom';

(globalThis as { URL: typeof URL }).URL = URL;

// Intercept CommonJS `require('whatwg-url')` in Node (CI) and return a lightweight shim
// so it doesn't load `webidl-conversions` which crashes in the CI environment.
const require = createRequire(import.meta.url);
try {
	const Module = require('module') as unknown as {
		_load: (request: string, parent: NodeModule | null, isMain?: boolean) => unknown;
	};
	const origLoad = Module._load;
	Module._load = function (request: string, parent: NodeModule | null, isMain?: boolean) {
		if (request === 'whatwg-url' || request.startsWith('whatwg-url/')) {
			return { URL, default: { URL } };
		}
		return origLoad.apply(this, [request, parent, isMain]);
	};
} catch (e) {
	// If this environment doesn't expose the CommonJS loader, ignore the interception.
}
