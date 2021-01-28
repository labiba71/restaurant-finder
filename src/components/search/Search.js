import React from "react";
import { useStyle } from "./Style";
import { Grid, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";

const SearchComponent = ({ venueList, value, setValue }) => {
  const classes = useStyle();
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.search}
      id="combo-box-demo"
      options={venueList && venueList.length > 0 ? venueList : []}
      getOptionLabel={(option) => option && option.venue?.name}
      renderOption={(option) => (
        <Grid container spacing={1} direction="column">
          <Grid item>
            <h5 className={classes.venueName}>{option.venue?.name}</h5>
          </Grid>
          {option.venue?.location.address?.length > 0 && (
            <Grid item>
              <label className={classes.venueSubtitle}>
                {option.venue?.location.address},{option.venue?.location.city}
              </label>
            </Grid>
          )}
          <Grid item className={classes.venueSubtitle}>
            <label>{option.venue?.location.distance / 1000} km</label>
          </Grid>
        </Grid>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Search Restaurants" variant="outlined" />
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    venueList: state.venue,
  };
};

export const Search = connect(mapStateToProps, null)(SearchComponent);
