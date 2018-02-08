class Snake {
    constructor(x, y, width, direction) {
        this.x = x
        this.y = y
        this.width = width
        this.direction = direction || 'right'
        this.speed = 2
    }

    changeDirection(newDirection) {
        this.direction = newDirection
    }

    update(t) {
        switch (this.direction) {
            case 'up':
                this.y -= this.speed
                break
            case 'right':
                this.x += this.speed
                break
            case 'down':
                this.y += this.speed
                break
            case 'left':
                this.x -= this.speed
                break
        }

        return this
    }
}

export default Snake
