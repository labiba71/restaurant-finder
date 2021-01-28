import React, { useState, useEffect } from "react";
import { getVenues } from "../../store/Action";
import { connect } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import { Button } from "@material-ui/core";
import { useStyle } from "./Style";
import { Search } from "../../components/search/Search";
import { MapRender } from "../../components/mapRender/MapRender";

const libraries = ["places"];

const MapComponent = (props) => {
  const classes = useStyle();

  const [latLng, setLatLng] = useState({ lat: "", lng: "" });
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [randomSelect, setRandomSelect] = useState(1);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((response) => {
      setLatLng({
        lat: response.coords.latitude,
        lng: response.coords.longitude,
      });
    });
  };

  const center = {
    lat: latLng.lat,
    lng: latLng.lng,
  };
  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    props.getVenues(latLng);
  }, [latLng.lat]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className={classes.main}>
      <h1>Find Your Nearest Restaurants</h1>
      <div className={classes.subHeader}>
        <Search value={value} setValue={setValue} />
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={() => {
            setValue(props.venueList[randomSelect]);
            setRandomSelect(Math.floor(Math.random() * 20 + 1));
          }}
        >
          Select a Random Restaurant
        </Button>
      </div>
      <MapRender
        value={value}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        center={center}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    venueList: state.venue,
  };
};

export const Map = connect(mapStateToProps, { getVenues })(MapComponent);
