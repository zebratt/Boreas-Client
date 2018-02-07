import View from '../View'

class Snake extends View {
    constructor(x, y, direction){
        this.x = x
        this.y = y
        this.direction = direction || 'right'
    }

    
}

export default Snake