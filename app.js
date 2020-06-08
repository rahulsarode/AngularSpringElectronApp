const {
    app,
    BrowserWindow
  } = require('electron')
  const url = require("url");
  const path = require("path");
  const kill = require("tree-kill");
  let appWindow
  
  function initWindow() {
    appWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    })

    //Start spring backend api
    let jarPath = app.getAppPath() + '\\springboot2-jpa-crud-example-0.0.1-SNAPSHOT.jar';
    let child = require('child_process').spawn( 'java', ['-jar', jarPath, ''] );
  
    // Electron Build Path
    appWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  
    // Initialize the DevTools.
    //appWindow.webContents.openDevTools()
  
    appWindow.on('closed', function () {
      //Next Line is used to stop backend api
      kill(child.pid);
      appWindow = null
    })

  }
  
  app.on('ready', initWindow)
  
  // Close when all windows are closed.
  app.on('window-all-closed', function () {
  
    // On macOS specific close process
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', function () {
    if (win === null) {
      initWindow()
    }
  })