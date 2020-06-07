import React from "react";

class Increments extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.counter.value}</h1>
        <button onClick={this.props.postIncrement}>Tambah Angka</button>
        <button onClick={this.props.postDecrement}>Kurangi Angka</button>
      </div>
    );
  }
}

export default Increments;
