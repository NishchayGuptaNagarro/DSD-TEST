import {render, screen, waitFor, within} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {Drivers} from 'models/Driver.ts';
import {ReactNode} from 'react';
import DriverSelectionGrid from './DriverSelectionGrid.tsx';

describe('Driver Selection Grid Tests', () => {
  const driverSelectionMock = jest.fn();
  const typeChangeMock = jest.fn();
  const driverTypeMock = 'VAN-SELLER';
  const driverArrMock: Drivers = {
    'VAN-SELLER': [
      {
        driverId: '1A',
        driverType: 'VAN-SELLER',
        driverName: 'ABC',
      },
      {
        driverId: '2B',
        driverType: 'VAN-SELLER',
        driverName: 'XYZ',
      },
    ],
    DELIVERY: [
      {
        driverId: '1A',
        driverType: 'DELIVERY',
        driverName: 'ABCD',
      },
    ],
    HYBRID: [
      {
        driverId: '1A',
        driverType: 'HYBRID',
        driverName: 'ABCD',
      },
    ],
  };
  let rerenderFunc: (ui: ReactNode) => void;
  beforeEach(() => {
    userEvent.setup();
    const {rerender} = render(
      <DriverSelectionGrid
        selectedDriverId={''}
        driverType={driverTypeMock}
        handleDriverSelection={driverSelectionMock}
        driverArray={driverArrMock}
        isDriverGridLoading={false}
        handleTypeChange={typeChangeMock}
      />,
    );
    rerenderFunc = rerender;
  });

  describe('Driver Selection Grid search box Tests', () => {
    let searchBox: HTMLElement;
    beforeEach(() => {
      searchBox = screen.getByTestId('search-box');
    });

    test('should render', () => {
      expect(searchBox).toBeInTheDocument();
    });
    test('should have given class', () => {
      expect(searchBox).toHaveAttribute('class', 'search-box');
    });
    test('should have value', () => {
      expect(searchBox).toHaveAttribute('value');
    });
    test('should reflect input value on change', async () => {
      await userEvent.type(searchBox, 'abcdef');
      expect(searchBox).toHaveValue('abcdef');
    });
    test('should display only searched driver', async () => {
      expect(screen.getByText('ABC')).toBeInTheDocument();
      expect(screen.getByText('XYZ')).toBeInTheDocument();
      await userEvent.type(searchBox, 'abc');
      await waitFor(
        () => {
          expect(screen.queryByText('XYZ')).not.toBeInTheDocument();
          expect(screen.getByText('ABC')).toBeInTheDocument();
        },
        {timeout: 500},
      );
    });
  });
  describe('Toggle Button Tests', () => {
    let toggleParent: HTMLElement;
    let toggleBtnArr: HTMLElement[];
    beforeEach(() => {
      toggleParent = screen.getByTestId('toggle-parent');
      toggleBtnArr = within(toggleParent).getAllByRole('button');
    });

    test('should have passed driver type selected', () => {
      expect(toggleParent).toBeInTheDocument();
      expect(toggleBtnArr[0]).toHaveValue(driverTypeMock);
      expect(toggleBtnArr[0]).toHaveAttribute('aria-pressed', 'true');
    });

    test('should call driver type change function on click and display', async () => {
      await userEvent.click(toggleBtnArr[1]);
      expect(typeChangeMock).toBeCalled();
    });

    test('should only display driver based on driver types', () => {
      expect(screen.queryByText('ABC')).toBeInTheDocument();
      expect(screen.queryByText('XYZ')).toBeInTheDocument();
      rerenderFunc(
        <DriverSelectionGrid
          selectedDriverId={''}
          driverType={'DELIVERY'}
          handleDriverSelection={driverSelectionMock}
          driverArray={driverArrMock}
          isDriverGridLoading={false}
          handleTypeChange={typeChangeMock}
        />,
      );
      expect(screen.queryByText('ABC')).not.toBeInTheDocument();
      expect(screen.queryByText('XYZ')).not.toBeInTheDocument();
    });
  });
  describe('Driver Button Tests', () => {
    let driverBtnArr: HTMLElement[];

    beforeEach(() => {
      driverBtnArr = screen.getAllByTestId('driver-btn');
    });

    test('should have selected class on selected driver', () => {
      expect(driverBtnArr[0]).toHaveClass('selected');
      expect(driverBtnArr[1]).not.toHaveClass('selected');
    });
    test('should call handle driver selection on change', async () => {
      const selectBtn = within(driverBtnArr[1]).getByRole('radio');
      await userEvent.click(selectBtn);
      expect(driverSelectionMock).toBeCalled();
    });
  });
});

