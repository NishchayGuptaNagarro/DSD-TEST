import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import LanguageSelect from './LanguageSelect.tsx';

describe('Language Selection Dropdown Tests', () => {
  let languageSelect: HTMLElement;
  beforeEach(() => {
    render(<LanguageSelect />);
    languageSelect = screen.getByTestId('language-select');
  });
  afterEach(cleanup);
  test('should render dropdown', () => {
    expect(languageSelect).toBeInTheDocument();
  });
  test('should trigger language change on click', () => {
    const enBtn = screen.getByTestId('en-btn');
    const changeBtn = screen.getByTestId('language-select-btn');
    expect(enBtn).toBeInTheDocument();
    fireEvent.click(changeBtn);
    const frBtn = screen.getByTestId('fr-btn');
    expect(frBtn).toBeInTheDocument();
  });
});
