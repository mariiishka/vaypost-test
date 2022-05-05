import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar, SnackbarOrigin } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  haveIcon?: boolean;
  severity?: AlertColor;
  message?: string;
  ancorOrigin?: SnackbarOrigin;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    haveIcon: true,
    severity: 'info',
    ancorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    message: '',
  });

  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        anchorOrigin={alert.ancorOrigin}
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <MuiAlert
          icon={alert.haveIcon}
          elevation={6}
          variant="filled"
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
