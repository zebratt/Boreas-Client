class Snake {
    constructor(x, y, direction) {
        this.x = x
        this.y = y
        this.direction = direction || 'right'
        this.speed = 10
    }

    changeDirection(newDirection){
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
