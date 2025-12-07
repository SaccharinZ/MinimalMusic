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

const getConfig = (event) => {
    if (!fs.existsSync('./userConfig.json')) {
        fs.writeFileSync('./userConfig.json', JSON.stringify({
            dirs: ['D:/音乐1'],
            playMod: 0,
            colorTheme: 0,
            lightnessTheme: 'dark'
        }))
    }
    const config = JSON.parse(fs.readFileSync('./userConfig.json').toString())
    return config
}

const saveConfig = (event, index, value) => {
    const config = JSON.parse(fs.readFileSync('./userConfig.json').toString())
    config[index] = value
    fs.writeFileSync('./userConfig.json', JSON.stringify(config))
}


module.exports = {
    updatePlayList,
    getConfig,
    saveConfig
}
