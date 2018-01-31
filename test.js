import EventHub from './src/Events/EventHub'

EventHub.listen('aaa', () => {
    console.log('123')
})

EventHub.listen('aaa', () => {
    console.log('456')
})

console.log(EventHub)

EventHub.trigger('aaa')

EventHub.remove('aaa')

console.log(EventHub)

EventHub.listen(
    'keydown',
    evt => {
        console.log(evt.keyCode)

        if (evt.keyCode === 40) {
            EventHub.remove('keydown', document)
        }
    },
    document
)

EventHub.listen(
    'keydown',
    () => {
        console.log('666')
    },
    document
)
