const axios = require("axios");
// import axios from "axios";
export const GET_COUNTRIES = "getCountries";
export const GET_ACTIVITIES = "getActivities";
export const GET_NAME_COUNTRY = "getNameCountry";
export const GET_COUNTRIE_ID = "getCountryById";
export const ORDER_NAME = "orderAscDes";
export const ORDER_PEOPLE = "orderMaxMinPobla";
export const FILTER_CONTINENT = "filterByContinent";
export const FILTER_ACTIVITY = "filterByActivity";
export const DETALLE_RESTAURAR = "restartDetalle";
export const POST_COUNTRY = "postCountry";
export const FILTER_POBLACION20 = "filterByPoblacion20";

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
export function orderAscDes(params) {
  console.log("--Action orderAscDes ok!--", params);
  return { type: ORDER_NAME, payload: params };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function orderMaxMinPobla(params) {
  console.log("--Action orderMaxMinPobla ok!--", params);
  return { type: ORDER_PEOPLE, payload: params };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function filterByContinent(params) {
  console.log("--Action filterByContinent ok!--", params);
  return { type: FILTER_CONTINENT, payload: params };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function filterByActivity(params) {
  console.log("--Action filterByActivity ok!--", params);

  return { type: FILTER_ACTIVITY, payload: params };
}
//~~~~~~~~~~~~~~~~~~~~~~~

export function restartDetalle(params) {
  console.log("----restartDetalle Ok!");

  return {
    type: DETALLE_RESTAURAR,
    payload: params,
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function postCountry(params) {
  console.log("--Action postCountry!--", params);
  return async function (dispatch) {
    try {
      const json = await axios.post(`http://localhost:3001/activity`, params);
      return dispatch({ type: POST_COUNTRY, payload: json });
    } catch (error) {
      console.log(error);
    }
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~
export function filterByPoblacion20(params) {
  console.log("--Action filterByContinent ok!--", params);
  return { type: FILTER_POBLACION20, payload: params };
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
