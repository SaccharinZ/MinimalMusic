const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    msg: (data) => {
        ipcRenderer.send('msg', data)
    }
    // 除函数之外，我们也可以暴露变量
})