import axios from "axios";
import { GET_VENUES } from "./Type";

export const getVenues = (latLng) => async (dispatch, getState) => {
  try {
    const endPint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "OC0JL41MHQVCWI4VSSCNYP2Z141HYMKX0GQKJ104HVGHWEUV",
      client_secret: "NYQO524BRT11GWGHDHAM3WA4AZCRYOPUC55WTAVOFP5OWUN5",
      ll: `${latLng.lat.length === 0 ? "23.781699" : latLng.lat}, 
      ${latLng.lng.length === 0 ? "90.400519" : latLng.lng}`,
      query: "food",
      v: "20182507",
      radius: "3000",
    };
    const response = await axios.get(endPint + new URLSearchParams(params));
    dispatch({
      type: GET_VENUES,
      payload: response.data.response.groups[0].items,
    });
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};
