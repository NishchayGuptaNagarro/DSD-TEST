import '@testing-library/jest-dom';
import {server} from 'mockServices/server.ts';
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translation hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en',
      },
      language: 'en',
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

export const localStorageMock = (function () {
  let store: {[key: string]: string} = {};

  return {
    getItem(key: string): string {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {value: localStorageMock});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
