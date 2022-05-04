import React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { usePlacesWidget } from 'react-google-autocomplete';
import { FormikProps } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

type MyValues = {
  country: string;
};

type Props = {
  formik: FormikProps<MyValues>;
  toFilterFlats: () => void;
};

const SearchCityForm: React.FC<Props> = ({ formik, toFilterFlats }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (value: string) => {
    const newState: URLSearchParamsInit = value
      ? { ...searchParams, city: value }
      : {};

    formik.setFieldValue('country', value);

    setSearchParams(newState);
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_API_KEY,
    onPlaceSelected: (place) => {
      if (place && place.address_components) {
        const city = place.address_components[0].long_name;

        formik.setFieldValue('country', city);
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField
        fullWidth
        type="text"
        autoComplete="off"
        label="City"
        variant="filled"
        inputRef={ref}
        id="country"
        name="country"
        placeholder="Type something"
        onChange={(event) => {
          const value = event.target.value.split(',')[0];

          handleChange(value);
        }}
        onBlur={(event) => {
          const value = event.target.value.split(',')[0];

          handleChange(value);
        }}
        value={formik.values.country}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  toFilterFlats();
                }}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchCityForm;
