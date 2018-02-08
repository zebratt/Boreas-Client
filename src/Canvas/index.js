import EventHub from '../Events/EventHub'
import Snake from './Snake'

class Canvas extends EventHub {
    constructor(ctx, config) {
        super()

        this.ctx = ctx
        this.config = config
        this.snake = new Snake(20, 20, 20, 'right')

        this.initBrush()
    }

    clear() {
        const { width, height } = this.config

        this.ctx.clearRect(0, 0, width, height)
    }

    initBrush() {
        this.ctx.fillStyle = '#333'
    }

    draw(target) {
        const { x, y, width } = target

        this.ctx.fillRect(x, y, width, width)
    }

    update(t) {
        this.clear()

        this.draw(this.snake.update(t))
    }
}

export default Canvas
