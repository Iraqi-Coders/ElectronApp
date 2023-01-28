const { app, BrowserWindow } = require('electron')
const path = require('path')

//checking system
const isMac = process.platform === 'darwin'

// creating main window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Metalux Resizer',
    width: 1000,
    height: 600
  })

  // loading the UI
  mainWindow.loadFile(path.join('renderer/main.html'))
}

// calling main window
app.whenReady().then(() => {
  createMainWindow()

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
