import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import DriverSelectionGrid from './DriverSelectionGrid.tsx';

describe('Driver Selection Grid search box Tests', () => {
  let searchBox: HTMLElement;

  beforeEach(() => {
    render(
      <DriverSelectionGrid
        driverType={'VAN-SELLER'}
        handleDriverSelection={jest.fn()}
        selectedDriverId={''}
        driverArray={[]}
        isDriverGridLoading={false}
        handleTypeChange={jest.fn()}
      />,
    );
    searchBox = screen.getByTestId('search-box');
  });

  afterEach(cleanup);
  test('should render', () => {
    expect(searchBox).toBeInTheDocument();
  });
  test('should have given class', () => {
    expect(searchBox).toHaveAttribute('class', 'search-box');
  });
  test('should have value', () => {
    expect(searchBox).toHaveAttribute('value');
  });
  test('should reflect input value on change', () => {
    fireEvent.change(searchBox, {target: {value: 'a'}});
    expect(searchBox).toHaveAttribute('value', 'a');
  });
});
