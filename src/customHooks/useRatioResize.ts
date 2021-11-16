import {useCallback, useEffect, useState} from "react";
import {DEFAULT_SLIDE_SIZE} from "../dataModel/slideSizes";

function useRatioResize(ref: React.RefObject<HTMLDivElement>) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scaleKoef, setScaleKoef] = useState(0);

    const handleResize = useCallback(() => {
        const maxWidth = ref.current ? ref.current.offsetWidth : 0;
        const maxHeight = ref.current ? ref.current.offsetHeight : 0;
        const scaleKoef = Math.min(maxWidth / DEFAULT_SLIDE_SIZE.width, maxHeight / DEFAULT_SLIDE_SIZE.height);

        setScaleKoef(scaleKoef);
        setHeight(DEFAULT_SLIDE_SIZE.height * scaleKoef);
        setWidth(DEFAULT_SLIDE_SIZE.width * scaleKoef);
    }, [ref])

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return {
        width,
        height,
        scaleKoef,
    }
}

export {useRatioResize};