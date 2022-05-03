import React from 'react';
import firebase from 'firebase';
import { Box, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import SearchCityForm from '../SearchCityForm';
import { Flat } from '../../../../types';
import { UIContext } from '../UIContext';
import FlatCard from '../../FlatCard';

const useStyles = makeStyles({
  stickyBox: {
    position: 'sticky',
    backgroundColor: '#fff',
    top: '0',
  },
});

const FlatListing: React.FC = () => {
  const classes = useStyles();
  const [flats, setFlats] = React.useState<Flat[]>([]);
  const [filteredFlats, setFilteredFlats] = React.useState<Flat[]>([]);
  const { setAlert } = React.useContext(UIContext);

  const [searchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      country: searchParams.get('city') || '',
    },
    onSubmit: () => {},
  });

  React.useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection('flats').doc('D9F954xYEGVCVMl5yJzZ');

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setFlats(doc.data()?.flats);
          setFilteredFlats(doc.data()?.flats);
        }
      })
      .catch(() => {
        setAlert({
          show: true,
          severity: 'error',
          message: 'Something went wrong',
        });
      });
  }, [setAlert]);

  const toFilterFlats = React.useCallback(() => {
    const newFlats = formik.values.country
      ? flats.filter((flat) => formik.values.country.includes(flat.cityName))
      : flats;

    setFilteredFlats(newFlats);
  }, [flats, formik.values.country]);

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
          {filteredFlats.map((flat) => (
            <FlatCard key={flat.id} flat={flat} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FlatListing;
