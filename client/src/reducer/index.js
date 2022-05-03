import { GET_COUNTRIES, GET_ACTIVITIES } from "../actions/index.js";
const initialState = {
  todosCountries: [],
  activities: [],
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

    default:
      return state;
      break;
  }
}
export default rootReducer;
