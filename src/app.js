import EventHub from './Events/EventHub'
import Canvas from './Canvas'
import initWebSocket from './Socket/WebSocket'

function launch(ws) {
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

window.onload = () => {
    let ws = null
    const btnStart = document.querySelector('.btn')
    const text = document.querySelector('.text')
    const Events = {
        onopen: () => {
            console.log('on open!')
        },
        onmessage: evt => {
            const msg = JSON.parse(evt.data)

            switch (msg.type) {
                case 'WAIT':
                    btnStart.style.display = 'none'
                    text.innerText = '连接成功，等待其他玩家...'
                    break
                case 'START':
                    text.style.display = 'none'
                    launch(ws)
            }
        },
        onclose: () => {}
    }

    btnStart.addEventListener('click', () => {
        ws = initWebSocket(Events)
    })
}
