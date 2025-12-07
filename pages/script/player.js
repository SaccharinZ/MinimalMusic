const playList = document.querySelector('.play-list')
const modBtns = document.querySelectorAll('.play-mod-btn')
const audioPlayer = document.getElementById('audioPlayer')
const playBtn = document.getElementById('playBtn')
const progressBar = document.getElementById('progressBar')
const progressContainer = document.getElementById('progressContainer')
const timeDisplay = document.getElementById('timeDisplay')
const volumeSlider = document.getElementById('volumeSlider')
const volumeLevel = document.getElementById('volumeLevel')
const audioTitle = document.getElementById('audio-title')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

document.getElementById('settingBtn').addEventListener('click', function () {
    routePage('settingPage')
})



audioPlayer.volume = 0.7
volumeLevel.style.width = '70%'
let isDraggingVolume = false

const init = async () => {
    config = await myAPI.getConfig()
    if (config.lightnessTheme == 'dark') {
        root.style.setProperty('--lightness', '0%')
    } else {
        root.style.setProperty('--lightness', '100%')
    }
    await playListInit()
}
init()

async function playListInit() {
    routePage('playListPage')

    config.playList = await myAPI.updatePlayList(config.dirs[0])
    for (let songIdx = 0; songIdx < config.playList.length; songIdx++) {
        let li = document.createElement('li')
        li.innerHTML = config.playList[songIdx]
        li.classList.add('play-list-item')
        li.addEventListener('click', function () {

            changeSong(songIdx)

        })
        playList.appendChild(li)
    }
    changeSong(0, false)
    // 为每个按钮绑定点击事件
    config.playMod %= modBtns.length
    modBtns.forEach((btn) => {
        btn.style.display = 'none'
        btn.addEventListener('click', () => {
            modBtns[config.playMod].style.display = 'none'
            config.playMod = (config.playMod + 1) % modBtns.length
            modBtns[config.playMod].style.display = 'inline-block'
        })
    })
    modBtns[config.playMod].style.display = 'inline-block'
    // console.log(config.playList)
}





// 播放/暂停切换
const playAndPause = () => {
    if (audioPlayer.paused) {


        audioPlayer.play().catch((err) => {
            console.error('播放失败:', err)
        })
        playBtn.textContent = '⏸'
        playBtn.classList.add('playing')
    } else {
        audioPlayer.pause()
        playBtn.textContent = '▶'
        playBtn.classList.remove('playing')
    }
}
playBtn.addEventListener('click', () => {
    playAndPause()


})



// 更新进度条和时间显示
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.style.width = `${progress}%`

    // 格式化时间（分:秒）
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')
            }`
    }
    timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)
        }`
})

// 播放下一首
const playNextSong = () => {
    if (config.playMod === 0) {
        //随机播放
        let nextSong = Math.floor(Math.random() * config.playList.length)
        changeSong(nextSong)
    } else if (config.playMod === 1) {
        //列表循环
        changeSong((config.curSongIdx + 1) % config.playList.length)
    } else {
        //单曲循环
        changeSong(config.curSongIdx)
    }
}
audioPlayer.addEventListener('ended', () => {

    playNextSong()
})

nextBtn.addEventListener('click', () => {
    playNextSong()
})

// 点击进度条跳转播放位置
progressContainer.addEventListener('click', (e) => {
    const progressWidth = progressContainer.clientWidth
    const clickX = e.offsetX
    const duration = audioPlayer.duration
    audioPlayer.currentTime = (clickX / progressWidth) * duration
})


// 静音
document.querySelector('.volume-icon').addEventListener('click', function () {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0
        volumeLevel.style.width = 0
        this.innerText = '🔇'
    } else {
        audioPlayer.volume = 0.7
        volumeLevel.style.width = '70%'
        this.innerText = '🔊'
    }
})


// 鼠标按下：开始拖动
volumeSlider.addEventListener('mousedown', (e) => {
    isDraggingVolume = true
    updateVolume(e)
})

// 鼠标移动：实时更新音量
document.addEventListener('mousemove', (e) => {
    if (isDraggingVolume) {
        updateVolume(e)
    }
})

// 鼠标松开：结束拖动
document.addEventListener('mouseup', () => {
    isDraggingVolume = false
})

// 音量更新逻辑
function updateVolume(e) {
    const volumeWidth = volumeSlider.clientWidth
    const rect = volumeSlider.getBoundingClientRect()
    // 限制鼠标X坐标在音量条范围内（0 ~ volumeWidth）
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, volumeWidth))
    const volume = clickX / volumeWidth
    audioPlayer.volume = volume
    volumeLevel.style.width = `${volume * 100}%`
}

function changeSong(songIndex, playnow = true) {
    console.log(config)
    config.curSongIdx = songIndex
    console.log('change to', config.curSongIdx)

    audioTitle.innerText = `Playing: ${config.playList[config.curSongIdx]}`
    audioPlayer.src = config.playList[config.curSongIdx]
    if (playnow) {
        audioPlayer.play().catch((err) => {
            console.error('播放失败:', err)
        })
        playBtn.textContent = '⏸'
        playBtn.classList.add('playing')
    }

}
