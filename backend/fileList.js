const fs = require('fs')
const path = require('path')

const updatePlayList = (event, dirPath) => {
    const Ext = new Set(['.m4a', '.mp3', '.flac'])
    try {
        const files = fs.readdirSync(dirPath)
        const filePaths = files.map(file => path.join(dirPath, file)).filter(fullPath => {
            return fs.statSync(fullPath).isFile() && Ext.has(path.extname(fullPath))
        })
        return filePaths
    } catch (err) {
        console.error('读取目录失败:', err)
        return []
    }
}


module.exports = {
    updatePlayList
}
