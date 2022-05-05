import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_NAME_COUNTRY,
  GET_COUNTRIE_ID,
} from "../actions/index.js";
const initialState = {
  todosCountries: [],
  activities: [],
  detalle: [],
};
function rootReducer(state = initialState, action) {
  //---------
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        todosCountries: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_NAME_COUNTRY:
      return {
        ...state,
        todosCountries: action.payload,
      };
    case GET_COUNTRIE_ID:
      return { ...state, detalle: action.payload };
    default:
      return state;
      break;
  }
}
export default rootReducer;
