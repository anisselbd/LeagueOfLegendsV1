
// Mock window.scrollTo pour jsdom
if (typeof window !== 'undefined') {
  window.scrollTo = jest.fn();
}

import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder pour Jest
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
