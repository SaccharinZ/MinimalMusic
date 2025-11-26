const information = document.querySelector('#info')
const btn = document.querySelector('#btn')
information.innerText = `versions: Chrome (v${myAPI.chrome()}), Node.js (v${myAPI.node()}), Electron (v${myAPI.electron()})`


btn.addEventListener('click', async function () {
    myAPI.msg('click')
})

