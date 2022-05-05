import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_NAME_COUNTRY,
  GET_COUNTRIE_ID,
  ORDER_NAME,
  ORDER_PEOPLE,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  DETALLE_RESTAURAR,
} from "../actions/index.js";
const initialState = {
  todosCountries: [],
  todosCountriesSinFiltro: [],
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
        todosCountriesSinFiltro: action.payload,
      };
    case GET_ACTIVITIES:
      //---------------

      return {
        ...state,
        activities: action.payload,
      };
    //---------------

    case GET_NAME_COUNTRY:
      return {
        ...state,
        todosCountries: action.payload,
      };
    //---------------

    case GET_COUNTRIE_ID:
      return { ...state, detalle: action.payload };
    //---------------
    case ORDER_NAME:
      let paisesOrdenados;
      // let arrayNamePaises = state.todosCountries.map((e) => e);
      if (action.payload === "Asc") {
        paisesOrdenados = state.todosCountries.sort(function (a, b) {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
        console.log(">>ascendete  ordenados", paisesOrdenados);
      } else {
        if (action.payload === "Des") {
          paisesOrdenados = state.todosCountries.sort(function (a, b) {
            return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
          });
          console.log("<<descentete ordenados", paisesOrdenados);
        }
      }

      return { ...state, todosCountries: paisesOrdenados };
    //---------------
    case ORDER_PEOPLE:
      let paisesOrdenadosByPeople;
      // let arrayNamePaises = state.todosCountries.map((e) => e);
      if (action.payload === "min") {
        paisesOrdenadosByPeople = state.todosCountries.sort(function (a, b) {
          return Number(a.people) > Number(b.people)
            ? 1
            : Number(a.people) < Number(b.people)
            ? -1
            : 0;
        });
        console.log(
          ">>ascendete  ordenados-----------people\n",
          paisesOrdenadosByPeople.map((e) => e.people)
        );
      } else {
        if (action.payload === "max") {
          paisesOrdenadosByPeople = state.todosCountries.sort(function (a, b) {
            return Number(a.people) > Number(b.people)
              ? -1
              : Number(a.people) < Number(b.people)
              ? 1
              : 0;
          });
        }
      }
      return { ...state, todosCountries: paisesOrdenadosByPeople };
    //---------------
    case FILTER_CONTINENT:
      let todos = state.todosCountriesSinFiltro;
      let paisesFiltrados;
      if (action.payload === "All") {
        console.log("entro en el si*****************");
        paisesFiltrados = todos;
        return { ...state, todosCountries: paisesFiltrados };
      } else {
        console.log("entro en el no*****************");

        paisesFiltrados = todos.filter((e) => e.continent === action.payload);
        return { ...state, todosCountries: paisesFiltrados };
      }
    //---------------
    case FILTER_ACTIVITY:
      let paisesFiltrados_Activity;
      let todosA = state.todosCountriesSinFiltro;

      // console.log("mostrando los paises-----", todosA[0].activities[0].name);
      if (action.payload === "All") {
        paisesFiltrados_Activity = todosA;
      } else {
        paisesFiltrados_Activity = todosA.filter((e) =>
          e.activities.map((e) => e.name).includes(action.payload)
        );
        console.log(
          "el pais que contiene esa actividad filtrada es~~~~~~~~~",
          paisesFiltrados_Activity
        );
      }

      return {
        ...state,
        todosCountries: paisesFiltrados_Activity,
      };
    //---------------

    case DETALLE_RESTAURAR:
      return {
        ...state,
        detalle: {},
      };
    //---------------

    default:
      return state;
      break;
  }
}
export default rootReducer;
