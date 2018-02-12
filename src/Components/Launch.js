import Canvas from '../Canvas'
import find from 'lodash/find'

export default function Launch(connection) {
    const domCanvas = document.createElement('canvas')
    const initHeight = innerHeight - 100
    const initWidth = document.documentElement.offsetWidth - 100
    let masterSnake = null

    domCanvas.classList.add('canvas')
    domCanvas.setAttribute('height', initHeight)
    domCanvas.setAttribute('width', initWidth)

    document.body.appendChild(domCanvas)

    const canvas = new Canvas(domCanvas.getContext('2d'), {
        height: initHeight,
        width: initWidth
    })

    const Runner = {
        status: 'stop',
        time: 1,
        run: () => {
            requestAnimationFrame(function cycle() {
                canvas.update(Runner.time)
                Runner.time++

                if (Runner.status === 'running') {
                    requestAnimationFrame(cycle)
                }
            })
        },
        toggle: () => {
            if (Runner.status === 'stop') {
                Runner.status = 'running'
                Runner.run(Runner.time)
            } else {
                Runner.status = 'stop'
            }
        }
    }

    canvas.listen(
        'keydown',
        evt => {
            if (!canvas.snakes.length) return

            if (!masterSnake) {
                masterSnake = find(canvas.snakes, 'isMaster')
            }

            switch (evt.keyCode) {
                case 32: // space
                    Runner.toggle()
                    break
                case 37: // left
                    connection.send({ uuid: masterSnake.id, type: 'direction', data: { directTo: 'LEFT' } })
                    break
                case 38: // up
                    connection.send({ uuid: masterSnake.id, type: 'direction', data: { directTo: 'UP' } })
                    break
                case 39: // right
                    connection.send({ uuid: masterSnake.id, type: 'direction', data: { directTo: 'RIGHT' } })
                    break
                case 40: // down
                    connection.send({ uuid: masterSnake.id, type: 'direction', data: { directTo: 'DOWN' } })
                    break
            }
        },
        document
    )

    return canvas
}
