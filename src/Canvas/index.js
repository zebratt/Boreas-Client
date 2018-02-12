import EventHub from '../Events/EventHub'
import Snake from './Snake'

class Canvas extends EventHub {
    constructor(ctx, config) {
        super()

        this.ctx = ctx
        this.config = config
        this.snakes = []

        this.initBrush()
    }

    pushSnake(snake) {
        this.snakes.push(snake)
    }

    clear() {
        const { width, height } = this.config

        this.ctx.clearRect(0, 0, width, height)
    }

    initBrush() {
        const { width, height } = this.config

        this.ctx.fillStyle = '#333'
        this.ctx.strokeStyle = '#333'
        this.ctx.font = '30px Georgia'
        this.ctx.fillText('Press space to start', width / 2 - 150, height / 2)
    }

    draw(target) {
        const { x, y, width } = target

        this.ctx.beginPath()
        this.ctx.fillRect(x, y, width, width)
        // this.ctx.arc(x, y, width, 0, Math.PI * 2, false)
    }

    update(t) {
        this.clear()

        this.snakes.forEach(snake => {
            this.draw(snake.update(t))
        })
    }
}

export default Canvas
