class EventHub {
    constructor() {
        this.events = {}
    }

    /**
     * 绑定事件
     * @param {string} type
     * @param {func} listener
     * @param {dom} target // 将事件绑定至target
     */
    listen(type, listener, target) {
        if (type in this.events) {
            const event = this.events[type]

            event.listeners.push(listener)
        } else {
            const event = {
                type,
                listeners: [listener]
            }

            if (target) {
                event.targetListeners = (evt) => {
                    event.listeners.forEach(fn => {
                        fn(evt)
                    })
                }
                // 将原生事件绑定到target
                target.addEventListener(type, event.targetListeners, false)
            }

            this.events[type] = event
        }
    }

    /**
     * 解绑事件
     * @param {string} type
     * @param {dom} target
     */
    remove(type, target) {
        const event = this.events[type]

        if (event) {
            if (target) {
                target.removeEventListener(type, event.targetListeners)
            }

            delete this.events[type]
        }
    }

    /**
     * 触发事件
     * @param {string} type
     */
    trigger(type) {
        const event = this.events[type]

        if (event) {
            event.listeners.forEach(fn => {
                fn()
            })
        }
    }
}

export default new EventHub()
