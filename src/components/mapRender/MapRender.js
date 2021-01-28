import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { connect } from "react-redux";

const MapRenderComponent = ({
  venueList,
  center,
  value,
  setSelectedValue,
  selectedValue,
}) => {
  const mapContainerStyle = {
    width: "90vw",
    height: "80vh",
  };
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {value ? (
        <Marker
          key={value.venue.id}
          position={{
            lat: value.venue.location.lat,
            lng: value.venue.location.lng,
          }}
          onClick={() => {
            setSelectedValue(value);
          }}
        />
      ) : (
        venueList &&
        venueList.map((item) => (
          <Marker
            key={item.venue.id}
            position={{
              lat: item.venue.location.lat,
              lng: item.venue.location.lng,
            }}
            onClick={() => {
              setSelectedValue(item);
            }}
          />
        ))
      )}
      {selectedValue ? (
        <InfoWindow
          position={{
            lat: selectedValue.venue.location.lat,
            lng: selectedValue.venue.location.lng,
          }}
          onCloseClick={() => {
            setSelectedValue(null);
          }}
        >
          <div>
            <h3>{selectedValue.venue.name}</h3>
            <p>
              {selectedValue.venue.location.address},
              {selectedValue.venue.location.city},
              {selectedValue.venue.location.country}
            </p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

const mapStateToProps = (state) => {
  return {
    venueList: state.venue,
  };
};

export const MapRender = connect(mapStateToProps, null)(MapRenderComponent);
