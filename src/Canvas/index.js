import EventHub from '../Events/EventHub'

class Canvas extends EventHub {
    constructor(ctx, config){
        super()

        this.ctx = ctx
        this.config = config
    }

    clear() {
        const {width, height} = this.config

        this.context.clearRect(0, 0, width, height)
    }

    
}

export default Canvas
