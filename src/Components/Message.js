const Message = {
    direction: (snake) => ({
        uuid: snake.id,
        type : 'direction',
        data: {
            x: snake.x,
            y: snake.y
        }
    }) 
}

export default Message