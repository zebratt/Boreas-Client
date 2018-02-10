import EventHub from './Events/EventHub'
import Message from './Events/Message'
import Canvas from './Canvas'
import initWebSocket from './Socket/WebSocket'

function launch(message) {
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

    // change direction
    message.register('DIRECTION', data => {
        canvas.snake.changeDirection(data.directTo)
    })

    canvas.listen(
        'keydown',
        evt => {
            switch (evt.keyCode) {
                case 32: // space
                    Runner.toggle()
                    break
                case 37: // left
                    message.send({ type: 'DIRECTION', data: { directTo: 'LEFT' } })
                    break
                case 38: // up
                    message.send({ type: 'DIRECTION', data: { directTo: 'UP' } })
                    break
                case 39: // right
                    message.send({ type: 'DIRECTION', data: { directTo: 'RIGHT' } })
                    break
                case 40: // down
                    message.send({ type: 'DIRECTION', data: { directTo: 'DOWN' } })
                    break
            }
        },
        document
    )
}

window.onload = () => {
    const btnStart = document.querySelector('.btn')
    const text = document.querySelector('.text')
    const message = new Message()

    message.register('WAIT', () => {
        btnStart.style.display = 'none'
        text.innerText = '连接成功，等待其他玩家...'
    })

    message.register('START', () => {
        text.style.display = 'none'
        launch(message)
    })

    btnStart.addEventListener('click', () => {
        message.init(
            initWebSocket({
                onopen: () => {
                    console.log('Websocket connected!')
                },
                onmessage: message.listen(),
                onclose: () => {}
            })
        )
    })
}
