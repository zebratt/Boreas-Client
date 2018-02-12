const url = 'ws://67.209.184.140:8000'

export default function initWebSocketService(options) {
    const ws = new WebSocket(url)

    ws.onopen = options.onopen
    ws.onmessage = options.onmessage

    return ws
}
