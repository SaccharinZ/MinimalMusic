const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { updatePlayList, getConfig, saveConfig } = require('./backend/handleAPI.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'icon.png'),
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

    win.loadFile('./pages/index.html')
}



app.whenReady().then(() => {
    if (!fs.existsSync('./userConfig.json')) {
        fs.writeFileSync('./userConfig.json', JSON.stringify({
            dirs: ['D:/音乐1'],
            playMod: 0,
            colorTheme: 0,
            lightnessTheme: 'dark'
        }))
    }
    ipcMain.handle('getConfig', getConfig)
    ipcMain.handle('updatePlayList', updatePlayList)
    ipcMain.handle('saveConfig', saveConfig)


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

