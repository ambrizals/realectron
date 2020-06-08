const electron = require("electron");
const { ipcMain, app } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      experimentalFeatures: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../public/index.html")}`
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  ipcMain.on("apps-configuration", (event, arg) => {
    // console.log(arg); // prints "ping"
    if (isDev) {
      prodDir = app
        .getAppPath()
        .replace("bbd", "bbd" + String.fromCharCode(92) + "localStorage");
      event.returnValue = {
        appDir: prodDir,
      };
    } else {
      prodDir = app.getAppPath().replace("app.asar", "localStorage");
      event.returnValue = {
        appDir: prodDir,
      };
    }
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
