import {AnyAction} from "redux";
import {
    colorType,
    elementType,
    ElementType,
    figureTypeType,
    idType,
    PresentationType,
    selectionType,
    slideType,
} from "../dataModel/editorDataModel";
import {v4 as uuidv4} from "uuid";
import {DEFAULT_SLIDE_SIZE} from "../dataModel/slideSizes";

const SET_PRESENTATION_TITLE = 'SET_PRESENTATION_TITLE';
const ADD_NEW_SLIDE = 'ADD_NEW_SLIDE';
const DELETE_SLIDE = 'DELETE_SLIDE';
const CREATE_NEW_PRESENTATION = 'CREATE_NEW_PRESENTATION';
const SAVE_PRESENTATION = 'SAVE_PRESENTATION';
const LOAD_PRESENTATION = 'LOAD_PRESENTATION';
const SELECT_SLIDE = 'SELECT_SLIDE';
const SELECT_ELEMENT = 'SELECT_ELEMENT';
const SELECT_FIRST_SLIDE = 'SELECT_FIRST_SLIDE';
const SELECT_NEXT_SLIDE = 'SELECT_NEXT_SLIDE';
const SELECT_PREV_SLIDE = 'SELECT_PREV_SLIDE';
const TRANSFORM_ELEMENT = 'TRANSFORM_ELEMENT';
const ADD_FIGURE_BLOCK = 'ADD_FIGURE_BLOCK';
const ADD_TEXT_BLOCK = 'ADD_TEXT_BLOCK';
const ADD_IMAGE_BLOCK = 'ADD_IMAGE_BLOCK';
const SET_NEW_VALUE_TEXT_BLOCK = 'SET_NEW_VALUE_TEXT_BLOCK';
const DELETE_SELECTED = 'DELETE_SELECTED';

const defaultBackgroundColor: colorType = {
    r: 255,
    g: 255,
    b: 255,
}

export const emptySelection: selectionType = {type: 'slide', selectionItems: []};
export type noneType = 'none';
const none: noneType = 'none';

const defaultColor: colorType = {
    r: 0,
    g: 0,
    b: 0,
}

const DEFAULT_FIGURE_WIDTH = 150;
const DEFAULT_FIGURE_HEIGHT = 150;
const DEFAULT_TEXT_WIDTH = 350;
const DEFAULT_TEXT_HEIGHT = 200;

const newSlideSelectionType: 'slide' = 'slide';
const newElementSelectionType: 'element' = 'element';

function toStringColor(color: colorType) {
    return color === 'none' ? 'none' : `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function getElementData(el: elementType, slide: slideType) {
    switch (el.type) {
        case ElementType.IMAGE:
            return slide.imageBlocks[el.id]
        case ElementType.TEXT:
            return slide.textBlocks[el.id]
        case ElementType.FIGURE:
            return slide.figureBlocks[el.id]
        default:
            return null
    }
}

const initalState: PresentationType = {
    title: '',
    slides: {},
    slidesOrder: [],
    activeSlide: '',
    selection: emptySelection,
};

export const presentationReducer = (state = initalState, action: AnyAction): PresentationType => {
    switch (action.type) {
        case SET_PRESENTATION_TITLE:
            return {
                ...state,
                title: action.newTitle,
            }
        case ADD_NEW_SLIDE:
            const newId = uuidv4();
            const newSlide = {
                [newId]: {
                    id: newId,
                    elements: [],
                    imageBlocks: {},
                    textBlocks: {},
                    figureBlocks: {},
                    backgroundColor: defaultBackgroundColor,
                }
            }

            return {
                ...state,
                slidesOrder: [
                    ...state.slidesOrder,
                    newId,
                ],
                slides: {
                    ...state.slides,
                    ...newSlide
                },
            }
        case DELETE_SLIDE:
            const newSlides = {
                ...state.slides,
            }
            delete newSlides[action.slideId]

            return {
                ...state,
                slidesOrder: state.slidesOrder.filter(id => id !== action.slideId),
                slides: newSlides
            }
        case CREATE_NEW_PRESENTATION: {
            const newId = uuidv4();
            const newSlide = {
                [newId]: {
                    id: newId,
                    elements: [],
                    imageBlocks: {},
                    textBlocks: {},
                    figureBlocks: {},
                    backgroundColor: defaultBackgroundColor,
                }
            }

            return {
                title: 'New presentation',
                slides: {...newSlide},
                slidesOrder: [newId],
                activeSlide: newId,
                selection: emptySelection,
            }
        }
        case SAVE_PRESENTATION: {
            const type = 'data:application/octet-stream;base64, ';
            const text = JSON.stringify(state);
            const base = btoa(unescape(encodeURIComponent(text)))
            const res = type + base;
            const link = document.createElement('a');

            link.href = res;
            link.download = state.title + '.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return state;
        }
        case LOAD_PRESENTATION: {
            return {
                ...action.presentation,
            };
        }
        case SELECT_SLIDE: {
            let newSelection: selectionType = {...state.selection};
            if (!action.isCtrlPressed || state.selection.type === 'element') {
                newSelection = {
                    type: newSlideSelectionType,
                    selectionItems: [action.slideId],
                };
            } else {
                // проверяем выделен ли уже слайд и снимаем выделение, если выделен, и наоборот
                const slideIndex = newSelection.selectionItems.findIndex(id => id === action.slideId);
                if (slideIndex === -1) {
                    newSelection.selectionItems.push(action.slideId);
                } else {
                    newSelection.selectionItems.splice(slideIndex, 1);
                    if (!newSelection.selectionItems.length) {
                        newSelection.selectionItems = [action.slideId];
                    }
                }
            }
            return {
                ...state,
                selection: newSelection,
                activeSlide: action.slideId,
            }
        }
        case SELECT_ELEMENT: {
            let newSelection: selectionType = {...state.selection};
            if (!action.isCtrlPressed || state.selection.type === 'slide') {
                newSelection = {
                    type: newElementSelectionType,
                    selectionItems: [action.elementId],
                };
            } else {
                // проверяем выделен ли уже слайд и снимаем выделение, если выделен, и наоборот
                const elementIndex = newSelection.selectionItems.findIndex(id => id === action.elementId);
                if (elementIndex === -1) {
                    newSelection.selectionItems.push(action.elementId);
                } else {
                    newSelection.selectionItems.splice(elementIndex, 1);
                    if (!newSelection.selectionItems.length) {
                        newSelection.selectionItems = [action.elementId];
                    }
                }
            }
            return {
                ...state,
                selection: newSelection,
            }
        }
        case SELECT_FIRST_SLIDE: {
            const slidesOrder = state.slidesOrder;
            let newActiveSlide: idType = '';

            if (slidesOrder.length) {
                newActiveSlide = slidesOrder[0];
            }
            return {
                ...state,
                activeSlide: newActiveSlide,
            }
        }
        case SELECT_NEXT_SLIDE: {
            const slidesOrder = state.slidesOrder;
            const activeSlide = state.activeSlide;
            let newActiveSlide: idType = '';

            if (!activeSlide) {
                newActiveSlide = slidesOrder.length ? slidesOrder[0] : '';
            } else {
                const slideIndex = slidesOrder.findIndex(el => el === activeSlide);

                if (slideIndex !== -1) {
                    if (!!slidesOrder[slideIndex + 1]) {
                        newActiveSlide = slidesOrder[slideIndex + 1];
                    } else {
                        newActiveSlide = slidesOrder[slideIndex];
                    }
                }
            }
            return {
                ...state,
                activeSlide: newActiveSlide,
            }
        }
        case SELECT_PREV_SLIDE: {
            const slidesOrder = state.slidesOrder;
            const activeSlide = state.activeSlide;
            let newActiveSlide: idType = '';

            if (activeSlide) {
                const slideIndex = slidesOrder.findIndex(el => el === activeSlide);

                if (slideIndex !== -1) {
                    if (!!slidesOrder[slideIndex - 1]) {
                        newActiveSlide = slidesOrder[slideIndex - 1];
                    } else {
                        newActiveSlide = slidesOrder[slideIndex];
                    }
                }
            }
            return {
                ...state,
                activeSlide: newActiveSlide,
            }
        }
        case TRANSFORM_ELEMENT: {
            const slide = state.slides[action.slideId];
            const orderElement = slide.elements.find((el) => el.id === action.elementId);
            if (!orderElement) {
                return state;
            }

            let imagesBlocks = slide.imageBlocks;
            let figuresBlocks = slide.figureBlocks;
            let textsBlocks = slide.textBlocks;

            const newElementProperties = {
                position: {
                    x: action.newData.x,
                    y: action.newData.y,
                },
                width: action.newData.width,
                height: action.newData.height,
            };


            switch (orderElement.type) {
                case 'i':
                    imagesBlocks = {
                        ...imagesBlocks,
                        [action.elementId]: {
                            ...imagesBlocks[action.elementId],
                            ...newElementProperties,
                        }
                    }
                    break;
                case 't':
                    textsBlocks = {
                        ...textsBlocks,
                        [action.elementId]: {
                            ...textsBlocks[action.elementId],
                            ...newElementProperties,
                        }
                    }
                    break;
                case 'f':
                    figuresBlocks = {
                        ...figuresBlocks,
                        [action.elementId]: {
                            ...figuresBlocks[action.elementId],
                            ...newElementProperties,
                        }
                    }
                    break;
            }

            let newSlides = {
                ...state.slides,
            }

            newSlides[action.slideId] =  {
                ...state.slides[action.slideId],
                imageBlocks: imagesBlocks,
                textBlocks: textsBlocks,
                figureBlocks: figuresBlocks,
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case ADD_FIGURE_BLOCK: {
            const slide = state.slides[state.activeSlide];
            if(!slide)
                return state;

            let figuresBlocks = slide.figureBlocks;
            const id = uuidv4();
            const newFigure = {
                id: id,
                type: action.figureType,
                position: {
                    x: DEFAULT_SLIDE_SIZE.width / 2 - DEFAULT_FIGURE_WIDTH / 2,
                    y: DEFAULT_SLIDE_SIZE.height / 2 - DEFAULT_FIGURE_HEIGHT / 2,
                },
                width: DEFAULT_FIGURE_WIDTH,
                height: DEFAULT_FIGURE_HEIGHT,
                borderColor: defaultColor,
                fillColor: defaultBackgroundColor,
            };

            let newSlides = {
                ...state.slides,
            }
            newSlides[state.activeSlide] =  {
                ...state.slides[state.activeSlide],
                figureBlocks: {
                    ...figuresBlocks,
                    [id]: newFigure,
                },
                elements: [...state.slides[state.activeSlide].elements, {
                    id: id,
                    type: ElementType.FIGURE,
                }]
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case ADD_TEXT_BLOCK: {
            const slide = state.slides[state.activeSlide];
            if(!slide)
                return state;

            let textBlocks = slide.textBlocks;
            const id = uuidv4();
            const newTextBlock = {
                id: id,
                position: {
                    x: DEFAULT_SLIDE_SIZE.width / 2 - DEFAULT_TEXT_WIDTH / 2,
                    y: DEFAULT_SLIDE_SIZE.height / 2 - DEFAULT_TEXT_HEIGHT / 2,
                },
                width: DEFAULT_TEXT_WIDTH,
                height: DEFAULT_TEXT_HEIGHT,
                value: 'Здесь должен быть ваш текст',
                style: {
                    color: defaultColor,
                    backgroundColor: none,
                    size: 40,
                }
            };

            let newSlides = {
                ...state.slides,
            }
            newSlides[state.activeSlide] =  {
                ...state.slides[state.activeSlide],
                textBlocks: {
                    ...textBlocks,
                    [id]: newTextBlock,
                },
                elements: [...state.slides[state.activeSlide].elements, {
                    id: id,
                    type: ElementType.TEXT,
                }]
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case ADD_IMAGE_BLOCK: {
            const slide = state.slides[state.activeSlide];
            if(!slide)
                return state;

            let imageBlocks = slide.imageBlocks;
            const id = uuidv4();
            let newWidth = action.width
            let newHeight = action.height
            // вписывание картинки в размер слайда, если её размеры превышают слайд
            const minRel = Math.min(...[
                DEFAULT_SLIDE_SIZE.width / newWidth,
                DEFAULT_SLIDE_SIZE.height / newHeight,
            ])
            if(minRel < 1) {
                newWidth = newWidth * minRel;
                newHeight = newHeight * minRel;
            }
            const newImageBlock = {
                id: id,
                position: {
                    x: DEFAULT_SLIDE_SIZE.width / 2 - newWidth / 2,
                    y: DEFAULT_SLIDE_SIZE.height / 2 - newHeight / 2,
                },
                width: newWidth,
                height: newHeight,
                image: action.dataURL,
            };

            let newSlides = {
                ...state.slides,
            }
            newSlides[state.activeSlide] =  {
                ...state.slides[state.activeSlide],
                imageBlocks: {
                    ...imageBlocks,
                    [id]: newImageBlock,
                },
                elements: [...state.slides[state.activeSlide].elements, {
                    id: id,
                    type: ElementType.IMAGE,
                }]
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case SET_NEW_VALUE_TEXT_BLOCK: {
            const slide = state.slides[action.slideId];
            if(!slide)
                return state;

            let textBlocks = slide.textBlocks;
            const newTextBlock = {
                ...textBlocks[action.elementId],
                value: action.value,
            };

            let newSlides = {
                ...state.slides,
            }
            newSlides[action.slideId] = {
                ...state.slides[action.slideId],
                textBlocks: {
                    ...textBlocks,
                    [action.elementId]: newTextBlock,
                },
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case DELETE_SELECTED:
            // if(state.selection.type === 'slide')
            // {
            //     return {
            //         ...state,
            //         slidesOrder: state.slidesOrder.filter((id) => !state.selection.selectionItems.includes(id)),
            //
            //     }
            // }
            // if(state.selection.type === 'element')
            // {
            //
            // }
            return state;
        default:
            return state;
    }
};

export type selectSlidePropsType = {
    slideId: string,
    isCtrlPressed: boolean,
}
export type selectElementPropsType = {
    elementId: string,
    isCtrlPressed: boolean,
}
export type transformElementPropsType = {
    slideId: string,
    elementId: string,
    newData: {
        x: number,
        y: number,
        width: number,
        height: number,
    }
}
export const setPresentationTitleAC = (newTitle: string) => ({type: SET_PRESENTATION_TITLE, newTitle});
export const addNewSlideAC = () => ({type: ADD_NEW_SLIDE});
export const deleteSlideAC = (slideId: idType) => ({type: DELETE_SLIDE, slideId});
export const createNewPresentationAC = () => ({type: CREATE_NEW_PRESENTATION});
export const savePresentationAC = () => ({type: SAVE_PRESENTATION});
export const loadPresentationAC = (presentation: PresentationType) => ({type: LOAD_PRESENTATION, presentation});
export const selectSlideAC = ({slideId, isCtrlPressed}: selectSlidePropsType) => ({type: SELECT_SLIDE, slideId, isCtrlPressed});
export const selectElementAC = ({elementId, isCtrlPressed}: selectElementPropsType) => ({type: SELECT_ELEMENT, elementId, isCtrlPressed});
export const setFirstSlideActiveAC = () => ({type: SELECT_FIRST_SLIDE});
export const setNextSlideActiveAC = () => ({type: SELECT_NEXT_SLIDE});
export const setPrevSlideActiveAC = () => ({type: SELECT_PREV_SLIDE});
export const transformElementAC = ({slideId, elementId, newData}: transformElementPropsType) => ({type: TRANSFORM_ELEMENT, slideId, elementId, newData}); // &&&&&&&&&&&
export const addFigureBlockAC = (figureType: figureTypeType) => ({type: ADD_FIGURE_BLOCK, figureType});
export const addTextBlockAC = () => ({type: ADD_TEXT_BLOCK});
export const addImageBlockAC = (dataURL: string, width: number, height: number) => ({type: ADD_IMAGE_BLOCK, dataURL, width, height});
export const setNewValueTextBlockAC = (value: string, slideId: idType, elementId: idType) => ({type: SET_NEW_VALUE_TEXT_BLOCK, value, slideId, elementId});
export const deleteSelectedAC = () => ({type: DELETE_SELECTED});
