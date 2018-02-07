import EventHub from '../Events/EventHub'
import Snake from './Snake'

class Canvas extends EventHub {
    constructor(ctx, config) {
        super()

        this.ctx = ctx
        this.config = config
        this.snake = new Snake(10, 10, 'right')

        this.initBrush()
    }

    clear() {
        const { width, height } = this.config

        this.context.clearRect(0, 0, width, height)
    }

    initBrush() {
        this.ctx.fillStyle = '#333'
    }

    draw(target) {
        const { x, y } = target

        this.ctx.fillRect(x, y, 50, 50)
    }

    update(t) {
        this.clear()

        this.draw(this.snake.update(t))
    }
}

export default Canvas
