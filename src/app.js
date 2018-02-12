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
        canvas.pushSnake(
            new Snake({
                id: msg.uuid,
                isMaster: isMasterSnake
            })
        )

        isMasterSnake = false
    })

    connection.register('direction', msg => {
        const snake = find(canvas.snakes, ['id', msg.uuid])

        if(snake){
            snake.changeDirection(msg.data.directTo)
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
