import {fireEvent, render, screen} from '@testing-library/react';
import LanguageSelect from './LanguageSelect.tsx';

describe('Language Selection Dropdown Tests', () => {
  render(<LanguageSelect />);
  const languageSelect = screen.getByTestId('language-select');

  test('should render dropdown', () => {
    expect(languageSelect).toBeInTheDocument();
  });
  test('should trigger language change on click', () => {
    const button1 = screen.getByTestId('language-change-btn1');
    // const button2 = screen.getByTestId('language-change-btn2');
  });
});
