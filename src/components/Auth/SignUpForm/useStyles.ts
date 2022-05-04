import { makeStyles } from '@mui/styles';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(8),
    },
  },
});

export default useStyles;
