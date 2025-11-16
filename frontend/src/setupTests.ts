import { URL } from 'url';

(globalThis as any).URL = URL;

import '@testing-library/jest-dom';
