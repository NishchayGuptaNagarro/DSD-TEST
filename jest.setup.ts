import '@testing-library/jest-dom';

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
