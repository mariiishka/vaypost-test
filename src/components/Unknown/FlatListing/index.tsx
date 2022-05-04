import React, { useState } from 'react';
import 'firebase/firestore';
import { Box, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useSearchParams } from 'react-router-dom';
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
      <Box maxWidth="580px" pt={3}>
        <Box className={classes.stickyBox}>
          <SearchCityForm formik={formik} toFilterFlats={toFilterFlats} />
        </Box>
        <Box>
          <Typography variant="h4" my={5}>
            Flats to rent
          </Typography>
          <Box className={classes.flatsList}>
            {status === 'success' ? (
              flats.map((flat) => <FlatCard key={flat.id} flat={flat} />)
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FlatListing;
