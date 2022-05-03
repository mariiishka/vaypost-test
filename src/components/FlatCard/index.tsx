import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Flat } from '../../../types';
import img from './images/flat-1.png';

type Props = {
  flat: Flat;
};

const useStyles = makeStyles({
  flatCard: {
    display: 'flex',
    marginBottom: '50px',
  },
  flatCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flatStreet: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  flatDescription: {
    maxWidth: '200px',
    fontSize: '8px',
    color: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '3',
  },
});

const FlatCard: React.FC<Props> = ({ flat }) => {
  const classes = useStyles();

  return (
    <Card className={classes.flatCard}>
      <Box maxWidth="290px">
        <CardMedia
          component="img"
          alt={flat.address}
          height="255px"
          image={img}
        />
      </Box>
      <CardContent className={classes.flatCardContent}>
        <Box>
          <Typography
            variant="h5"
            lineHeight="50px"
          >{`$${flat.dailyPriceUsd} / night`}</Typography>
          <Typography className={classes.flatStreet}>{flat.address}</Typography>
          {flat.description && (
            <Typography className={classes.flatDescription}>
              {flat.description}
            </Typography>
          )}
        </Box>
        <Box maxWidth="67px">
          <Button size="small">details</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
