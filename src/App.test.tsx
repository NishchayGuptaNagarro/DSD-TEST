import {render} from '@testing-library/react';
import App from './App.tsx';

describe('Main Test', () => {
  test('should pass', () => {
    expect(true).toBeTruthy();
  });
  test('should render app', () => {
    render(<App />);
  });
});
