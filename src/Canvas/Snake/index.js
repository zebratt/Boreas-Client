class Snake {
    constructor(x, y, width, direction) {
        this.x = x
        this.y = y
        this.width = width
        this.direction = direction || 'RIGHT'
        this.speed = 2
    }

    changeDirection(newDirection) {
        this.direction = newDirection
    }

    update(t) {
        switch (this.direction) {
            case 'UP':
                this.y -= this.speed
                break
            case 'RIGHT':
                this.x += this.speed
                break
            case 'DOWN':
                this.y += this.speed
                break
            case 'LEFT':
                this.x -= this.speed
                break
        }

        return this
    }
}

export default Snake
