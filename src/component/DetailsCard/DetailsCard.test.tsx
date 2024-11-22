import {render, screen} from '@testing-library/react';
import DetailsCard from './DetailsCard.tsx';

describe('Details Card Tests', () => {
  const mockIcon = 'Mock Icon';
  const mockIconBackground = 'red';
  const mockCardBackground = 'blue';
  const mockMainInfo = 'Main Info';
  const mockMainInfoColor = 'black';
  const mockSecondaryInfo = 'Secondary Info';
  const mockSecondaryInfoColor = 'gray';

  beforeEach(() => {
    render(
      <DetailsCard
        icon={mockIcon}
        iconBackground={mockIconBackground}
        cardBackground={mockCardBackground}
        mainInfo={mockMainInfo}
        mainInfoColor={mockMainInfoColor}
        secondaryInfo={mockSecondaryInfo}
        secondaryInfoColor={mockSecondaryInfoColor}
      />,
    );
  });
  describe('Render Tests', () => {
    test('should render image', () => {
      expect(screen.getByTestId('icon')).toHaveAttribute('src', mockIcon);
    });
    test('should render main info', () => {
      expect(screen.getByText(mockMainInfo)).toBeInTheDocument();
    });
    test('should render secondary Info', () => {
      expect(screen.getByText(mockSecondaryInfo)).toBeInTheDocument();
    });
  });
});

