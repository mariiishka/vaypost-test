import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Alert, Snackbar } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  setWelcomeAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });

  const [welcomeAlert, setWelcomeAlert] = React.useState<AlertProps>({
    show: false,
    severity: 'info',
    message: 'Welcome on board 🚀',
  });

  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert, setWelcomeAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={welcomeAlert.show}
        autoHideDuration={4000}
        onClose={() =>
          setWelcomeAlert({
            show: false,
          })
        }
      >
        <Alert
          icon={false}
          elevation={6}
          variant="filled"
          severity={welcomeAlert.severity}
        >
          {welcomeAlert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
};
