const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const resizeImage = require('./utils/resizeImage')

//checking system
const isMac = process.platform === 'darwin'

// creating main window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Metalux Resizer',
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // loading the UI
  mainWindow.loadFile(path.join('renderer/main.html'))
}

// calling main window
app.whenReady().then(() => {
  createMainWindow()

  ipcMain.on('RESIZE_IMAGE', (event, data) => {
    resizeImage(data.image, data.output, data.dimensions)
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
