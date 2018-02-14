import Connection from './Components/Connection'
import initWebSocket from './Socket/WebSocket'
import launch from './Components/Launch'
import Snake from './Canvas/Snake'
import find from 'lodash/find'

window.onload = () => {
    const btnStart = document.querySelector('.btn')
    const connection = new Connection()
    let canvas = null
    let isMasterSnake = true

    connection.register('connection', msg => {
        switch (msg.action) {
            case 'connected':
                const masterSnake = find(canvas.snakes, 'isMaster')

                if (masterSnake) {
                    connection.send({
                        type: 'sync',
                        uuid: masterSnake.id,
                        data: { directTo: masterSnake.direction, x: masterSnake.x, y: masterSnake.y }
                    })
                }

                canvas.pushSnake(
                    new Snake({
                        id: msg.uuid,
                        isMaster: isMasterSnake
                    })
                )

                isMasterSnake = false
                break
            case 'sync':
                canvas.pushSnake(
                    new Snake({
                        id: msg.uuid,
                        isMaster: false
                    })
                )
                break
            case 'disconnected':
                canvas.removeSnake(msg.uuid)
                break
        }
    })

    connection.register('sync', msg => {
        const snake = find(canvas.snakes, ['id', msg.uuid])

        if (snake) {
            const { directTo, x, y } = msg.data
            snake.changeDirection(directTo)
            snake.sync(x, y)
        }
    })

    btnStart.addEventListener('click', () => {
        connection.init(
            initWebSocket({
                onopen: () => {
                    btnStart.style.display = 'none'
                    canvas = launch(connection)
                },
                onmessage: connection.listen(),
                onclose: () => {}
            })
        )
    })
}
