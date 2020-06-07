import types from "../types";

const increment = () => ({
  type: types.counters.increment,
});

const decrement = () => ({
  type: types.counters.decrement,
});

export default {
  increment,
  decrement,
};
