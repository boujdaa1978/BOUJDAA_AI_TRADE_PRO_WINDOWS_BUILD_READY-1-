const { app, BrowserWindow, Menu, shell } = require("electron");

const APP_URL = "https://boujdaa-forex-pro.boukitar2017.chatgpt.site";

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1050,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#080c14",
    title: "BOUJDAA AI TRADE PRO",
    icon: `${__dirname}/icon.ico`,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      partition: "persist:boujdaa-ai-trade-pro"
    }
  });

  window.once("ready-to-show", () => {
    window.maximize();
    window.show();
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (
      url.startsWith(APP_URL) ||
      url.startsWith("https://chatgpt.com") ||
      url.startsWith("https://auth.openai.com")
    ) {
      return { action: "allow" };
    }

    void shell.openExternal(url);
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (
      !url.startsWith(APP_URL) &&
      !url.startsWith("https://chatgpt.com") &&
      !url.startsWith("https://auth.openai.com")
    ) {
      event.preventDefault();
      void shell.openExternal(url);
    }
  });

  window.loadURL(APP_URL).catch(() => {
    window.loadFile(`${__dirname}/offline.html`);
  });
}

app.setName("BOUJDAA AI TRADE PRO");

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
