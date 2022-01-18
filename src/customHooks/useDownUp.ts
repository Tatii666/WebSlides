
function useDownUp() {
    const [isDown, setIsDown] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})
    const [delta, setDelta] = useState({x: 0, y: 0})

    const handleMouseDown = (e) => {
        const {pageX: x, pageY: y} = e
        setIsDown(true)
        setPosition({x, y})
    }

    const handleMouseUp = e => {
        if(!isDown) {
            return
        }

        const {pageX: x, pageY: y} = e
        let deltaX = x - position.x
        let deltaY = y - position.y
        setIsDown(false)
        setDelta({
            x: deltaX,
            y: deltaY,
        })
    }

    return {
        delta,
        handleMouseDown,
        handleMouseUp,
    }
}
