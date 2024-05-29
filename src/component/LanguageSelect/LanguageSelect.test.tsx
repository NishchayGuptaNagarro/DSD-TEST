import {cleanup, render, screen} from '@testing-library/react';
import LanguageSelect from './LanguageSelect.tsx';
import {userEvent} from '@testing-library/user-event';

describe('Language Selection Dropdown Tests', () => {
  let languageSelect: HTMLElement;
  beforeEach(() => {
    userEvent.setup();
    render(<LanguageSelect />);
    languageSelect = screen.getByTestId('language-select');
  });
  afterEach(cleanup);
  test('should render dropdown', () => {
    expect(languageSelect).toBeInTheDocument();
  });
  test('should trigger language change on click', async () => {
    const enBtn = screen.getByTestId('en-btn');
    const changeBtn = screen.getByTestId('language-select-btn');
    expect(enBtn).toBeInTheDocument();
    await userEvent.click(changeBtn);
    const frBtn = screen.getByTestId('fr-btn');
    expect(frBtn).toBeInTheDocument();
  });
  test('should expand and collapse menu', async () => {
    const expandBtn = screen.getByTestId('expand-btn');
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(screen.queryByTestId('language-select-menu')).toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
  });
});
