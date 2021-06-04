let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d');
let lineWidth = 3
let eraserEnabled = false

autoSetCanvas(canvas)
listenToMouse(canvas)

pen.onclick = () => {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = () => {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

black.onclick = () => {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick = () => {
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}
blue.onclick = () => {
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
}
green.onclick = () => {
    context.strokeStyle = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')

}




small.onclick = () => {
    lineWidth = 3
    small.classList.add('active')
    large.classList.remove('active')
    medium.classList.remove('active')
}
medium.onclick = () => {
    lineWidth = 6
    medium.classList.add('active')
    small.classList.remove('active')
    large.classList.remove('active')
}
large.onclick = () => {
    lineWidth = 9
    large.classList.add('active')
    small.classList.remove('active')
    medium.classList.remove('active')
}

save.onclick = () => {
    let url = canvas.toDataURL("image/png")
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'undefined'
    a.click()
}

function listenToMouse(canvas) {
    let using = false
    let lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY

            using = true
            if (eraserEnabled) {

                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
            }
        }
        canvas.ontouchmove = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x, y, 20, 20)
            } else {
                let newPoint = {
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = () => {
            using = false
        }
    } else {

        canvas.onmousedown = (e) => {
            let x = e.clientX
            let y = e.clientY
            console.log(e)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
            }
        }

        canvas.onmousemove = (e) => {
            let x = e.clientX
            let y = e.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)

            } else {
                let newPoint = {
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = () => {
            using = false
        }
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.closePath()
    context.stroke()
}

function autoSetCanvas(canvas) {
    setCanvasSize()
    window.onresize = () => {
        setCanvasSize()
    }

    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}