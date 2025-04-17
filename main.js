const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  // Allow node integration
      contextIsolation: false,  // Allow access to Node APIs from renderer
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Handle the request for screen sources
ipcMain.handle('getScreens', () => {
  return desktopCapturer.getSources({ types: ['screen'] })
    .then(sources => {
      return sources.map(source => ({
        id: source.id,
        name: source.name,
      }));
    })
    .catch(err => {
      console.error('Error getting screen sources:', err);
      return [];
    });
});

// Handle the request for webcam stream
ipcMain.handle('getWebcam', () => {
  return true;  // Indicate that webcam access is available
});
