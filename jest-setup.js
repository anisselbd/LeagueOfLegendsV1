if (typeof window !== "undefined") {
  window.scrollTo = jest.fn();
}
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
