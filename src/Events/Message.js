class Message {
    constructor() {
        this.handlers = {}
    }

    init(ws){
        this.ws = ws
    }

    send(data) {
        this.ws.send(JSON.stringify(data))
    }

    register(name, handler) {
        this.handlers[name] = handler
    }

    listen() {
        return evt => {
            const msg = JSON.parse(evt.data)
            const handler = this.handlers[msg.type]

            if (handler) {
                handler(msg.data)
            } else {
                console.error(`data type: ${msg.type} can not be handle`)
            }
        }
    }
}

export default Message 
