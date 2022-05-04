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
});

export default useStyles;
