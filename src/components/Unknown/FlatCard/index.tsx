import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Flat } from '../../../../types';
import img from './images/flat-1.png';
import useStyles from './useStyles';

type Props = {
  flat: Flat;
};

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
