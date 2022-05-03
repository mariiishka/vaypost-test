import React, { useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { AlertColor } from '@mui/lab/Alert';
import app from '../../../common/firebaseApp';
import Header from '../Header';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  const userMetadata = app.auth().currentUser?.metadata;
  const [welcomeAlert, setWelcomeAlert] = React.useState<AlertProps>({
    show: false,
    severity: 'info',
    message: 'Welcome on board 🚀',
  });

  const handleClose = () =>
    setWelcomeAlert({
      show: false,
    });

  useEffect(() => {
    if (userMetadata?.creationTime === userMetadata?.lastSignInTime) {
      setWelcomeAlert((state) => ({
        ...state,
        show: true,
      }));
    }
  }, [userMetadata?.creationTime, userMetadata?.lastSignInTime]);

  return (
    <Box>
      <Header />
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={welcomeAlert.show}
        autoHideDuration={4000}
        onClose={handleClose}
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
    </Box>
  );
};

export default AuthenticatedLayout;
