import { makeStyles } from '@mui/styles';
import heroImage from './hero.png';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  boxWithImage: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  imageContainer: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  boxWithForm: {
    maxWidth: '100%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '375px',
      paddingTop: '100px',
      paddingBottom: '70px',
    },
  },
});

export default useStyles;
