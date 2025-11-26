const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

    win.loadFile('./pages/index.html')
}

const recMsg = (event, data) => {
    console.log('msg:', data)
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.on('msg', recMsg)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})