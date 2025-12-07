const information = document.getElementById('info')
information.innerText = `versions: Chrome (v${myAPI.chrome()}), Node.js (v${myAPI.node()}), Electron (v${myAPI.electron()})`


document.getElementById('backBtn').addEventListener('click', function () {
    routePage('playListPage')
})


document.getElementById('lightnessBtn').addEventListener('click', function () {
    if (getComputedStyle(root).getPropertyValue(`--lightness`).trim() == '100%') {
        root.style.setProperty('--lightness', '0%')
        myAPI.saveConfig('lightnessTheme', 'dark')
    } else {
        root.style.setProperty('--lightness', '100%')
        myAPI.saveConfig('lightnessTheme', 'light')
    }
})


const themeColorBox = document.getElementById('themeColorBox')



