import React from 'react';
import 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Flat } from '../../../../types';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: true,
};

const FlatMap: React.FC = () => {
  const { flatId } = useParams();

  const firestore = useFirestore();
  const flatDoc = firestore.collection('flats').doc(`${flatId}`);

  const { status, data: flat } = useFirestoreDocData<Flat>(flatDoc);

  if (status === 'loading') {
    return <>Loading flat details..</>;
  }

  if (status === 'success' && !flat) {
    return <>Failed to load the flat</>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{
        lat: flat.latitude,
        lng: flat.longitude,
      }}
      zoom={16}
      options={options}
    >
      <Marker position={{ lat: flat.latitude, lng: flat.longitude }} />
    </GoogleMap>
  );
};

export default FlatMap;
