const axios = require("axios");
// import axios from "axios";
export const GET_COUNTRIES = "getCountries";
export const GET_ACTIVITIES = "getActivities";
export const GET_NAME_COUNTRY = "getNameCountry";
export const GET_COUNTRIE_ID = "getCountryById";
//~~~~~~~~~~~~~~~~~~~~~~~

export function getActivities() {
  console.log("--Action getActivitiesOk!--");

  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/activity`, {});
      let activities = json.data.map((e) => e);
      console.log("actividades: ", activities);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: activities,
      });
    } catch (error) {}
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function getNameCountry(name) {
  console.log("--Action getNameCountry ok!--", name);
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      // console.log("--desde action el json e es!--", json);
      return dispatch({ type: GET_NAME_COUNTRY, payload: json.data });
    } catch (error) {}
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~

export function getCountryById(id) {
  console.log("--Action getCountryById!--", id);

  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({ type: GET_COUNTRIE_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~

export default function getCountries() {
  console.log("--Action getCountriesOk!--");
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries`, {});

      console.log("--Action getCountriesOk!--dato[0]: ", json.data[0]);
      const conti = json.data.slice(1, 5).map((e) => e);
      // const filteredArray = conti.filter(function (ele, pos) {
      //   return conti.indexOf(ele) == pos;
      // });
      // console.log("--Action getCountriesOk! --continent: ", conti);
      let aa = [1, 2, 3, 4];

      return dispatch({
        type: GET_COUNTRIES,
        payload: json.data,
      });
    } catch (error) {
      alert("Falla en obtencion de Pias desde Servidor ");
      console.log(error);
    }
  };
}
