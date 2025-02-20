import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface MessageSnackbarProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  handleClose: () => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function MessageSnackbar({isOpen, message, severity, handleClose}: MessageSnackbarProps) {

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      onClose={() => handleClose()}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}