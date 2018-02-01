import EventHub from './Events/EventHub'
import initCanvas from './Canvas'

function launch() {
    const domCanvas = document.createElement('canvas')
    const initHeight = innerHeight - 100
    const initWidth = document.documentElement.offsetWidth - 100

    domCanvas.classList.add('canvas')
    domCanvas.setAttribute('height', initHeight)
    domCanvas.setAttribute('width', initWidth)

    document.body.appendChild(domCanvas)

    initCanvas(domCanvas.getContext('2d'), {
        height: initHeight,
        width: initWidth
    })
}

//Entry
launch()