import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flat } from '../../../../types';
import img from './images/flat-1.png';
import useStyles from './useStyles';

type Props = {
  flat: Flat;
  active: boolean;
};

const FlatCard: React.FC<Props> = ({ flat, active }) => {
  const classes = useStyles();
  const { search } = useLocation();

  return (
    <Card
      className={classes.flatCard}
      variant={active ? 'outlined' : 'elevation'}
    >
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
          <Button
            component={Link}
            to={`/flats/${flat.id}${search}`}
            size="small"
          >
            details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
