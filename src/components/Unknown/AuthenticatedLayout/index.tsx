import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default AuthenticatedLayout;
