export const DEFAULT_SLIDE_SIZE = {
    width: 960,
    height: 540,
}

const MINIATURE_SLIDE_WIDTH = 370;

export const MINIATURE_SLIDE_SIZE = {
    width: MINIATURE_SLIDE_WIDTH,
    height: MINIATURE_SLIDE_WIDTH * DEFAULT_SLIDE_SIZE.height / DEFAULT_SLIDE_SIZE.width,
}
