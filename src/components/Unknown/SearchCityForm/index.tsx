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
  const [, setSearchParams] = useSearchParams();

  const handleChange = (value: string) => {
    const newState: URLSearchParamsInit = value ? { city: value } : {};

    formik.setFieldValue('country', value);

    setSearchParams(newState);
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_API_KEY,
    onPlaceSelected: (place) => {
      const city = place.formatted_address.split(',')[0];

      handleChange(city);
      toFilterFlats();
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
        onChange={(event) => handleChange(event.target.value)}
        onBlur={(event) => handleChange(event.target.value)}
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
