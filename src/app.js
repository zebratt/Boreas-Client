import EventHub from './Events/EventHub'
import Canvas from './Canvas'

function launch() {
    const domCanvas = document.createElement('canvas')
    const initHeight = innerHeight - 100
    const initWidth = document.documentElement.offsetWidth - 100

    domCanvas.classList.add('canvas')
    domCanvas.setAttribute('height', initHeight)
    domCanvas.setAttribute('width', initWidth)

    document.body.appendChild(domCanvas)

    const canvas = new Canvas(domCanvas.getContext('2d'), {
        height: initHeight,
        width: initWidth
    })

    const run = () => {
        requestAnimationFrame(function cycle() {
            canvas.update(run.time)
            run.time++

            if (!run.needStop) {
                requestAnimationFrame(cycle)
            } else {
                run.needStop = false
            }
        })
    }

    run.needStop = false
    run.time = 1

    canvas.listen(
        'keydown',
        evt => {
            const snake = canvas.snake

            switch (evt.keyCode) {
                case 32: // space
                    if (!run.needStop) {
                        run()
                    } else {
                        run.needStop = true
                    }
                    break
                case 37: // left
                    snake.changeDirection('left')
                    break
                case 38: // up
                    snake.changeDirection('up')
                    break
                case 39: // right
                    snake.changeDirection('right')
                    break
                case 40: // down
                    snake.changeDirection('down')
                    break
            }
        },
        document
    )
}

//Entry
launch()
