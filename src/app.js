import EventHub from './Events/EventHub'

function initCanvas() {
    const domCanvas = document.createElement('canvas')
    domCanvas.classList.add('canvas')
    domCanvas.setAttribute('height', innerHeight - 100)
    domCanvas.setAttribute('width', document.documentElement.offsetWidth - 100)

    document.body.appendChild(domCanvas)
}

//Entry
initCanvas()
