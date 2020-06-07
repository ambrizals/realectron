import types from "../types";

const initialState = {
  value: 0,
};

const counters = (state = initialState, action) => {
  switch (action.type) {
    case types.counters.increment:
      return {
        ...state,
        value: state.value + 1,
      };

    case types.counters.decrement:
      return {
        ...state,
        value: state.value - 1,
      };

    default:
      return state;
  }
};

export default counters;
