import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  stickyBox: {
    position: 'sticky',
    backgroundColor: '#fff',
    top: '0',
  },
  flatsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(12),
  },
  flatMap: {
    position: 'sticky',
    top: '0',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: grey[400],
  },
});

export default useStyles;
