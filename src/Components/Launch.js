import Canvas from '../Canvas'
import find from 'lodash/find'

export default function Launch(connection) {
    const domCanvas = document.createElement('canvas')
    const domText = document.querySelector('.text')
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
        time: 0,
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

    setInterval(() => {
        domText.innerHTML = 'FPS:' + Runner.time
        Runner.time = 0
    }, 1000)

    canvas.listen(
        'keydown',
        evt => {
            if (!canvas.snakes.length) return

            if (!masterSnake) {
                masterSnake = find(canvas.snakes, 'isMaster')
            }

            switch (evt.keyCode) {
                case 13: // enter
                    Runner.toggle()
                    break
                case 37: // left
                    connection.send({
                        uuid: masterSnake.id,
                        type: 'direction',
                        data: { directTo: 'LEFT', x: masterSnake.x, y: masterSnake.y }
                    })
                    break
                case 38: // up
                    connection.send({
                        uuid: masterSnake.id,
                        type: 'direction',
                        data: { directTo: 'UP', x: masterSnake.x, y: masterSnake.y }
                    })
                    break
                case 39: // right
                    connection.send({
                        uuid: masterSnake.id,
                        type: 'direction',
                        data: { directTo: 'RIGHT', x: masterSnake.x, y: masterSnake.y }
                    })
                    break
                case 40: // down
                    connection.send({
                        uuid: masterSnake.id,
                        type: 'direction',
                        data: { directTo: 'DOWN', x: masterSnake.x, y: masterSnake.y }
                    })
                    break
                case 32: // space
                    connection.send({
                        uuid: masterSnake.id,
                        type: 'direction',
                        data: { directTo: '', x: masterSnake.x, y: masterSnake.y }
                    })
                    break
            }
        },
        document
    )

    return canvas
}
