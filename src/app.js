import EventHub from './Events/EventHub'
import Canvas from './Canvas'
import initSocket from './Socket/WebSocket'

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

    const Runner = {
        status: 'stop',
        time: 1,
        run: () => {
            function cycle() {
                canvas.update(Runner.time)
                Runner.time++

                ws.send(
                    JSON.stringify({
                        x: canvas.snake.x,
                        y: canvas.snake.y
                    })
                )
            }

            const ws = initSocket({
                onopen: () => {
                    ws.send('open')
                },
                onmessage: evt => {
                    if (Runner.status === 'running') {
                        requestAnimationFrame(cycle)
                    }
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
            const snake = canvas.snake

            switch (evt.keyCode) {
                case 32: // space
                    Runner.toggle()
                    break
                case 37: // left
                    snake.changeDirection('left')
                    break
                case 38: // up
                    snake.changeDirection('up')
                    break
                case 39: // right
                    snake.changeDirection('right')
                    break
                case 40: // down
                    snake.changeDirection('down')
                    break
            }
        },
        document
    )
}

//Entry
launch()
