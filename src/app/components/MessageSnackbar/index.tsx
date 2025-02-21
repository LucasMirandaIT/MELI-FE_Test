import {
  Alert,
  AlertColor,
  Slide,
  SlideProps,
  Snackbar
} from "@mui/material";

interface MessageSnackbarProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
  handleClose: () => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function MessageSnackbar({ isOpen, message, severity, duration = 5000, handleClose }: MessageSnackbarProps) {

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={duration}
      TransitionComponent={SlideTransition}
      onClose={() => handleClose()}
    >
      <Alert
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}