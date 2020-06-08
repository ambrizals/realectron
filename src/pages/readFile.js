import React from "react";
import fs from "fs";

const electron = window.require("electron");
const { ipcRenderer } = electron;
const config = ipcRenderer.sendSync("apps-configuration", "ping");

class readFile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    content: null,
  };

  componentDidMount() {
    this.getContent();
  }

  bacaTeks() {
    const text = fs.readFileSync(
      config.appDir + String.fromCharCode(92) + "text.txt",
      "utf8"
    );
    return text;
  }

  bacaGambar() {
    const path = config.appDir + String.fromCharCode(92) + "assets.png";
    const gambar = <img src={path} alt="coba" />;
    return gambar;
  }

  getContent() {
    this.setState(() => {
      return {
        content: (
          <div>
            {this.bacaTeks()}
            {this.bacaGambar()}
          </div>
        ),
      };
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.getContent()}>Coba</button>
        {this.state.content}
      </div>
    );
  }
}

export default readFile;
