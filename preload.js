const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    updatePlayList: (dir) => ipcRenderer.invoke('updatePlayList', dir),
    getConfig: () => ipcRenderer.invoke('getConfig'),
    saveConfig: (index, value) => ipcRenderer.invoke('saveConfig', index, value)

})