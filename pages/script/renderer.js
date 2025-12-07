const root = document.documentElement
const playListPage = document.getElementById('playListPage')
const settingPage = document.getElementById('settingPage')


let config

function routePage(page) {
    switch (page) {
        case 'playListPage':
            settingPage.classList.add('hide-page')
            playListPage.classList.remove('hide-page')
            break
        case 'settingPage':
            playListPage.classList.add('hide-page')
            settingPage.classList.remove('hide-page')
            break
    }
}



