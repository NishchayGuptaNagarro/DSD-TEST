import {render, screen} from '@testing-library/react';
import DetailsCard from './DetailsCard.tsx';

describe('Details Card Tests', () => {
  const mockHeading = 'Mock Heading';
  const mockIcon = 'Mock Icon';
  const mockMainInfo = 'Main Info';
  const mockSecondaryInfo = 'Secondary Info';

  beforeEach(() => {
    render(
      <DetailsCard
        heading={mockHeading}
        icon={mockIcon}
        mainInfo={mockMainInfo}
        secondaryInfo={mockSecondaryInfo}
      />,
    );
  });
  describe('Render Tests', () => {
    test('should render heading', () => {
      expect(screen.getByText(mockHeading)).toBeInTheDocument();
    });
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
