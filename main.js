// Desktop app: opens your live Lingo website in its own window.
const { app, BrowserWindow, shell } = require("electron");
const fs = require("fs");
const path = require("path");

const SITE = fs.readFileSync(path.join(__dirname, "site.txt"), "utf8").trim();

function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 780, minWidth: 380, minHeight: 520,
    title: "Lingo", icon: path.join(__dirname, "icon.png"),
    autoHideMenuBar: true, backgroundColor: "#f4f6fb",
  });
  win.loadURL(SITE);
  // Links to other websites open in your normal browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
