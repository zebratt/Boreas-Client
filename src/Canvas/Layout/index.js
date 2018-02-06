class Layout {
    constructor(context, width, height) {
        this.context = context
        this.width = width
        this.height = height
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    
}
