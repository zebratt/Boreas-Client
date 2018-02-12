class Snake {
    constructor(options) {
        if(!options.id){
            throw new Error('Snake must have a unique identifier!')
        }

        const defaultOptions = {
            x : 20,
            y: 20,
            width: 20,
            direction: 'RIGHT',
            speed: 2,
            isMaster: false // 是否是玩家自己控制的
        }

        Object.assign(this, defaultOptions, options)
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
