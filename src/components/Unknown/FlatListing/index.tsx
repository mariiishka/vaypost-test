import React, { useState } from 'react';
import 'firebase/firestore';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import SearchCityForm from '../SearchCityForm';
import { Flat } from '../../../../types';
import FlatCard from '../FlatCard';
import useStyles from './useStyles';

const FlatListing: React.FC = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [searchedCity, setSearchedCity] = useState(
    searchParams.get('city') || '',
  );

  const { flatId } = useParams();

  const formik = useFormik({
    initialValues: {
      country: searchParams.get('city') || '',
    },
    onSubmit: () => {},
  });

  const firestore = useFirestore();
  const flatsCollection = firestore.collection('flats');
  const allFlats = searchedCity
    ? flatsCollection.where('cityName', '==', `${searchedCity}`)
    : flatsCollection;

  const { status, data: flats }: { status: string; data: Flat[] } =
    useFirestoreCollectionData(allFlats);

  const toFilterFlats = React.useCallback(() => {
    setSearchedCity(formik.values.country);
  }, [formik.values.country]);

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={5}>
        <Grid item xs={5} pt={3}>
          <Box className={classes.stickyBox}>
            <SearchCityForm formik={formik} toFilterFlats={toFilterFlats} />
          </Box>
          <Box>
            <Typography variant="h4" my={5}>
              Flats to rent
            </Typography>
            <Box className={classes.flatsList}>
              {status === 'success' && !flats.length ? (
                <p>No flats with such city</p>
              ) : (
                <></>
              )}

              {status === 'success' ? (
                flats.map((flat) => {
                  const active = flat.id === flatId;

                  return <FlatCard key={flat.id} flat={flat} active={active} />;
                })
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box className={classes.flatMap}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlatListing;
