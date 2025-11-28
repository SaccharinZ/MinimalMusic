const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { updatePlayList } = require('./backend/fileList.js')

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



app.whenReady().then(() => {
    ipcMain.handle('getConfig', () => {
        if (!fs.existsSync('./config.json')) {
            fs.writeFileSync('./config.json', JSON.stringify({
                dirs: ['D:/音乐1'],
                playMod: 0
            }))
        }
        const config = JSON.parse(fs.readFileSync('./config.json').toString())
        return config
    })
    ipcMain.handle('updatePlayList', updatePlayList)


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