import { makeStyles } from '@mui/styles';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  flatCard: {
    display: 'flex',
  },
  flatCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flatStreet: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
  flatDescription: {
    maxWidth: '200px',
    fontSize: '8px',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '3',
  },
});

export default useStyles;
