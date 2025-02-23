import { act, render, screen, waitFor } from '@testing-library/react';
import MessageSnackbar from '@/components/MessageSnackbar'; 

describe('MessageSnackbar', () => {
  it('should render the snackbar with the correct message and severity', () => {
    render(
      <MessageSnackbar 
        isOpen={true} 
        message="Test message" 
        severity="success" 
        handleClose={jest.fn()} 
      />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess');
  });

  it('should not render snackbar if isOpen is false', () => {
    render(
      <MessageSnackbar 
        isOpen={false} 
        message="Test message" 
        severity="warning" 
        handleClose={jest.fn()} 
      />
    );

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('should automatically close after the duration', async () => {
    jest.useFakeTimers(); 

    const handleClose = jest.fn();

    render(
      <MessageSnackbar 
        isOpen={true} 
        message="Test message" 
        severity="info" 
        duration={3000} 
        handleClose={handleClose} 
      />
    );

    act(async () => {
      jest.advanceTimersByTime(3000); 
      
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    })
    

    jest.useRealTimers();
  });
});
