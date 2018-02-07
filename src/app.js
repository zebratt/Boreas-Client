import EventHub from './Events/EventHub'
import Canvas from './Canvas'

function launch() {
    const domCanvas = document.createElement('canvas')
    const initHeight = innerHeight - 100
    const initWidth = document.documentElement.offsetWidth - 100

    domCanvas.classList.add('canvas')
    domCanvas.setAttribute('height', initHeight)
    domCanvas.setAttribute('width', initWidth)

    document.body.appendChild(domCanvas)

    const canvas = new Canvas(domCanvas.getContext('2d'), {
        height: initHeight,
        width: initWidth
    })

    canvas.listen(
        'keydown',
        evt => {
            switch (evt.keyCode) {
                case 32: // space
                    break
                case 37: // left
                    break
                case 38: // up
                    break
                case 39: // right
                    break
                case 40: // down
                    break
            }
        },
        document
    )
}

//Entry
launch()
