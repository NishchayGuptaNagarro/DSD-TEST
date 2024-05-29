import {render, screen} from '@testing-library/react';
import AlertDialog from './AlertDialog.tsx';
import {userEvent} from '@testing-library/user-event';

describe('Alert Dialog Tests', () => {
  const mockMsg = 'This is a mock message';
  const closeBtnTxtMock = 'Mock';
  const dismissMock = jest.fn();

  beforeEach(() => {
    userEvent.setup();
    render(
      <AlertDialog
        messageText={mockMsg}
        closeBtnText={closeBtnTxtMock}
        isOpen={true}
        handleDismiss={dismissMock}
      />,
    );
  });
  describe('Render Tests', () => {
    test('should render message', () => {
      expect(screen.getByText(mockMsg)).toBeInTheDocument();
    });
    test('should render closeBtn', () => {
      expect(screen.getByText(closeBtnTxtMock)).toBeInTheDocument();
    });
  });
  test('should call handleDismiss on dismiss', async () => {
    const dismissBtn = screen.getByTestId('dismiss-btn');
    await userEvent.click(dismissBtn);
    expect(dismissMock).toBeCalled();
  });
});
