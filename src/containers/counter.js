import { connect } from "react-redux";
import IncrementPage from "../pages/increments";
import types from "../stores/types";

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postIncrement: () => {
      dispatch({ type: types.counters.increment });
    },
    postDecrement: () => {
      dispatch({ type: types.counters.decrement });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncrementPage);
