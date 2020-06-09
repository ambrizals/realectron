import React from "react";
import fs from "fs";
import uid from "uid";

const electron = window.require("electron");
const { ipcRenderer } = electron;
const config = ipcRenderer.sendSync("apps-configuration", "ping");

class readFile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    content: [],
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
    console.log(config.appDir);
    const path = config.appDir + String.fromCharCode(92) + "assets.png";
    const gambar = <img src={path} alt="coba" />;
    return gambar;
  }

  getContent() {
    const newContent = (
      <div key={uid()}>
        {this.bacaTeks()}
        {this.bacaGambar()}
      </div>
    );
    this.setState(() => {
      return { content: this.state.content.concat(newContent) };
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
