import { URL } from 'url';
import '@testing-library/jest-dom';

(globalThis as { URL: typeof URL }).URL = URL;
