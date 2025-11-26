const audioPlayer = document.getElementById('audioPlayer')
const playBtn = document.getElementById('playBtn')
const progressBar = document.getElementById('progressBar')
const progressContainer = document.getElementById('progressContainer')
const timeDisplay = document.getElementById('timeDisplay')
const volumeSlider = document.getElementById('volumeSlider')
const volumeLevel = document.getElementById('volumeLevel')
const audioTitle = document.getElementById('audio-title')

// 播放/暂停切换
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        const audiopath = 'D:/音乐1/Sleepwalker.m4a'
        audioPlayer.src = audiopath

        audioTitle.innerText = `当前播放: ${audiopath}`
        audioPlayer.play().catch(err => {
            console.error('播放失败:', err)
        })
        myAPI.msg('play')
        playBtn.textContent = '⏸'
        playBtn.classList.add('playing')
    } else {
        audioPlayer.pause()
        playBtn.textContent = '▶'
        playBtn.classList.remove('playing')
    }
})

// 更新进度条和时间显示
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.style.width = `${progress}%`

    // 格式化时间（分:秒）
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`
})

// 点击进度条跳转播放位置
progressContainer.addEventListener('click', (e) => {
    const progressWidth = progressContainer.clientWidth
    const clickX = e.offsetX
    const duration = audioPlayer.duration
    audioPlayer.currentTime = (clickX / progressWidth) * duration
})

// 音量控制
// 初始化音量
audioPlayer.volume = 0.7
volumeLevel.style.width = '70%'

// 音量条拖动相关变量
let isDraggingVolume = false

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

// 音量更新逻辑（封装为函数）
function updateVolume(e) {
    const volumeWidth = volumeSlider.clientWidth
    const rect = volumeSlider.getBoundingClientRect()
    // 限制鼠标X坐标在音量条范围内（0 ~ volumeWidth）
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, volumeWidth))
    const volume = clickX / volumeWidth
    audioPlayer.volume = volume
    volumeLevel.style.width = `${volume * 100}%`
}
