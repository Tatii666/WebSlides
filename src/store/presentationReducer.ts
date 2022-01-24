import {AnyAction} from "redux";
import {v4 as uuidv4} from "uuid";
import {
    colorType,
    ElementType,
    elementType,
    figureTypeType,
    figureBlockType,
    imageBlockType,
    textBlockType,
    idType,
    pointType,
    PresentationType,
    selectionType,
    slideType,
} from "../dataModel/editorDataModel";
import {DEFAULT_SLIDE_SIZE} from "../dataModel/slideSizes";
import {transformElementProps} from "../components/Editor/EditorArea/EditorArea";

const SET_PRESENTATION_TITLE = 'SET_PRESENTATION_TITLE';
const ADD_NEW_SLIDE = 'ADD_NEW_SLIDE';
const DELETE_SLIDE = 'DELETE_SLIDE';
const CREATE_NEW_PRESENTATION = 'CREATE_NEW_PRESENTATION';
const SAVE_PRESENTATION = 'SAVE_PRESENTATION';
const LOAD_PRESENTATION = 'LOAD_PRESENTATION';
const SELECT_SLIDE = 'SELECT_SLIDE';
const SELECT_ELEMENT = 'SELECT_ELEMENT';
const SET_EMPTY_SELECTION = 'SET_EMPTY_SELECTION';
const SELECT_FIRST_SLIDE = 'SELECT_FIRST_SLIDE';
const SELECT_NEXT_SLIDE = 'SELECT_NEXT_SLIDE';
const SELECT_PREV_SLIDE = 'SELECT_PREV_SLIDE';
const TRANSFORM_ELEMENT = 'TRANSFORM_ELEMENT';
const ADD_FIGURE_BLOCK = 'ADD_FIGURE_BLOCK';
const ADD_TEXT_BLOCK = 'ADD_TEXT_BLOCK';
const ADD_IMAGE_BLOCK = 'ADD_IMAGE_BLOCK';
const SET_NEW_VALUE_TEXT_BLOCK = 'SET_NEW_VALUE_TEXT_BLOCK';
const DELETE_SELECTED = 'DELETE_SELECTED';
const MOVE_SELECTED_ELEMENTS = 'MOVE_SELECTED_ELEMENTS';
const MOVE_SLIDE_IN_ORDER = 'MOVE_SLIDE_IN_ORDER';
const MOVE_ELEMENT_LAYER = 'MOVE_ELEMENT_LAYER';
const CHANGE_SLIDE_BACKGROUND_IMAGE = 'CHANGE_SLIDE_BACKGROUND_IMAGE';
const CHANGE_COLORS_SELECTED = 'CHANGE_COLORS_SELECTED';


export const emptySelection: selectionType = {type: 'element', selectionItems: []};
export type noneType = 'none';
const none: noneType = 'none';

const defaultFont = 'Arial';
const defaultFontSize = 30;
const defaultBackgroundColor: colorType = 'none';
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

export function toStringColor(color: colorType) {
    return color === 'none' ? 'none' : `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function toHexStringColor(color: colorType) {
    function componentToHex(c: number) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return color === 'none' ? '#FFFFFF' : `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`;
}

export function parseColor(color: string): colorType {
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)

    return {r, g, b};
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

function moveSlideElement(slide: slideType, elementId: idType, delta: pointType) {
    const orderElement = slide.elements.find((el) => el.id === elementId);
    if (!orderElement) {
        return slide;
    }

    let imageBlocks = slide.imageBlocks;
    let figureBlocks = slide.figureBlocks;
    let textBlocks = slide.textBlocks;


    switch (orderElement.type) {
        case 'i':
            imageBlocks = {
                ...imageBlocks,
                [elementId]: {
                    ...imageBlocks[elementId],
                    position: {
                        x: imageBlocks[elementId].position.x + delta.x,
                        y: imageBlocks[elementId].position.y + delta.y,
                    },
                }
            }
            break;
        case 'f':
            figureBlocks = {
                ...figureBlocks,
                [elementId]: {
                    ...figureBlocks[elementId],
                    position: {
                        x: figureBlocks[elementId].position.x + delta.x,
                        y: figureBlocks[elementId].position.y + delta.y,
                    },
                }
            }
            break;
        case 't':
            textBlocks = {
                ...textBlocks,
                [elementId]: {
                    ...textBlocks[elementId],
                    position: {
                        x: textBlocks[elementId].position.x + delta.x,
                        y: textBlocks[elementId].position.y + delta.y,
                    },
                }
            }
            break;
    }

    return {
        ...slide,
        imageBlocks: imageBlocks,
        textBlocks: textBlocks,
        figureBlocks: figureBlocks,
    }
}

function setTransformedData(el: figureBlockType|textBlockType|imageBlockType, delta: transformElementProps): figureBlockType|textBlockType|imageBlockType{
    return {
        ...el,
        width: el.width + delta.width,
        height: el.height + delta.height,
        position: {
            x: el.position.x + delta.x,
            y: el.position.y + delta.y,
        }
    }
}

function setChangedColors(el: figureBlockType|textBlockType|imageBlockType, color?: colorType, backgroundColor?: colorType): figureBlockType|textBlockType|imageBlockType{
    return {
        ...el,
        styles: {
            ...el.styles,
            color: color || el.styles.color,
            backgroundColor: backgroundColor || el.styles.backgroundColor,
        }
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
            return state.title ? {
                ...state,
                title: action.newTitle,
            } : state;
        case ADD_NEW_SLIDE:
            if (!state.title) {
                return state;
            }
            const newId = uuidv4();
            const newSlide = {
                [newId]: {
                    id: newId,
                    elements: [],
                    imageBlocks: {},
                    textBlocks: {},
                    figureBlocks: {},
                    styles: {
                        backgroundColor: defaultBackgroundColor,
                    },
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
                activeSlide: newId,
            }
        case DELETE_SLIDE: {
            const newSlides = {
                ...state.slides,
            }
            delete newSlides[action.slideId]

            return {
                ...state,
                slidesOrder: state.slidesOrder.filter(id => id !== action.slideId),
                slides: newSlides
            }
        }
        case CHANGE_SLIDE_BACKGROUND_IMAGE: {
            const newSlides = {
                ...state.slides,
            }

            newSlides[action.slideId] = {
                ...newSlides[action.slideId],
                styles: {
                    ...newSlides[action.slideId].styles,
                    backgroundImage: action.image || '',
                }
            }

            return {
                ...state,
                slides: newSlides
            }
        }
        case SET_EMPTY_SELECTION:
            return {
                ...state,
                selection: emptySelection,
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
                    styles: {
                        backgroundColor: defaultBackgroundColor,
                    },
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
            if (state.title) {
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
            }
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
            const slide = state.slides[state.activeSlide];
            if (!slide || state.selection.type === 'slide' || !state.selection.selectionItems.length) {
                return state;
            }

            const elementId = state.selection.selectionItems[state.selection.selectionItems.length - 1]
            const orderElement = slide.elements.find((el) => el.id === elementId);
            if (!orderElement) {
                return state;
            }

            let imagesBlocks = slide.imageBlocks;
            let figuresBlocks = slide.figureBlocks;
            let textsBlocks = slide.textBlocks;

            switch (orderElement.type) {
                case 'i':
                    const image = imagesBlocks[elementId]
                    imagesBlocks = {
                        ...imagesBlocks,
                        [elementId]: setTransformedData(image, action.delta) as imageBlockType,
                    }
                    break;
                case 't':
                    const text = textsBlocks[elementId]
                    textsBlocks = {
                        ...textsBlocks,
                        [elementId]: setTransformedData(text, action.delta) as textBlockType,
                    }
                    break;
                case 'f':
                    const figure = figuresBlocks[elementId]
                    figuresBlocks = {
                        ...figuresBlocks,
                        [elementId]: setTransformedData(figure, action.delta) as figureBlockType,
                    }
                    break;
            }

            let newSlides = {
                ...state.slides,
            }

            newSlides[state.activeSlide] = {
                ...state.slides[state.activeSlide],
                imageBlocks: imagesBlocks,
                textBlocks: textsBlocks,
                figureBlocks: figuresBlocks,
            }

            return {
                ...state,
                slides: {...newSlides},
            }
        }
        case CHANGE_COLORS_SELECTED: {
            const newState: PresentationType = {...state};

            if (state.selection.type === 'slide') {
                if (!state.selection.selectionItems.length || !action.backgroundColor) {
                    return state;
                }
                const selectedSlides = state.selection.selectionItems;
                newState.slides = {...newState.slides};

                for(let i = 0; i < selectedSlides.length; i++) {
                    const slideData = {...newState.slides[selectedSlides[i]]};
                    slideData.styles = {...slideData.styles, backgroundColor: action.backgroundColor};
                    newState.slides[selectedSlides[i]] = slideData;
                }
            }

            if (state.selection.type === 'element') {
                if (!state.selection.selectionItems.length) {
                    return state;
                }
                newState.slides = {...state.slides};
                const slide = state.slides[state.activeSlide];
                const selectedElements = state.selection.selectionItems;

                let imagesBlocks = slide.imageBlocks;
                let figuresBlocks = slide.figureBlocks;
                let textsBlocks = slide.textBlocks;

                for(let i = 0; i < selectedElements.length; i++) {
                    const elementId = selectedElements[i]
                    const orderElement = slide.elements.find((el) => el.id === elementId);
                    if (!orderElement) {
                        continue;
                    }

                    switch (orderElement.type) {
                        case 'i':
                            const image = imagesBlocks[elementId]
                            imagesBlocks = {
                                ...imagesBlocks,
                                [elementId]: setChangedColors(image, action.color, action.backgroundColor) as imageBlockType,
                            }
                            break;
                        case 't':
                            const text = textsBlocks[elementId]
                            textsBlocks = {
                                ...textsBlocks,
                                [elementId]: setChangedColors(text, action.color, action.backgroundColor) as textBlockType,
                            }
                            break;
                        case 'f':
                            const figure = figuresBlocks[elementId]
                            figuresBlocks = {
                                ...figuresBlocks,
                                [elementId]: setChangedColors(figure, action.color, action.backgroundColor) as figureBlockType,
                            }
                            break;
                    }
                }

                newState.slides[state.activeSlide] = {
                    ...state.slides[state.activeSlide],
                    imageBlocks: imagesBlocks,
                    textBlocks: textsBlocks,
                    figureBlocks: figuresBlocks,
                }
            }

            return newState;
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
                styles: {
                    color: defaultColor,
                    backgroundColor: defaultBackgroundColor
                }
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
                value: '',
                styles: {
                    color: defaultColor,
                    backgroundColor: none,
                    fontSize: defaultFontSize,
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
                    x: DEFAULT_SLIDE_SIZE.width / 2 - newWidth / 2 - 3,
                    y: DEFAULT_SLIDE_SIZE.height / 2 - newHeight / 2 - 3,
                },
                width: newWidth,
                height: newHeight,
                image: action.dataURL,
                styles: {
                    color: none,
                    backgroundColor: none,
                }
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
            if(state.selection.type === 'slide')
            {
                let newState = {
                    ...state,
                    slides: {...state.slides},
                };
                let selectedItems = state.selection.selectionItems;

                for(let i = 0; i < selectedItems.length; i++){
                    if(selectedItems[i] === state.activeSlide){
                        state.activeSlide = '';
                    }
                    delete newState.slides[selectedItems[i]];
                }
                return {
                    ...state,
                    slidesOrder: state.slidesOrder.filter((id) => !state.selection.selectionItems.includes(id)),
                    selection: emptySelection,
                }
            }
            if(state.selection.type === 'element')
            {
                let newState = {
                    ...state,
                    slides: {...state.slides}
                };

                const activeSlideId = state.activeSlide;
                const currentSlide = {
                    ...state.slides[activeSlideId]
                };

                if(!state.activeSlide || !currentSlide){
                    return state;
                }

                currentSlide.elements = currentSlide.elements.filter((element) => {
                    const isSelected = state.selection.selectionItems.includes(element.id);
                    if (isSelected) {
                        delete currentSlide.imageBlocks[element.id];
                        delete currentSlide.textBlocks[element.id];
                        delete currentSlide.figureBlocks[element.id];
                    }
                    return !isSelected
                });

                // Удалить сами элементы из данных слайда

                newState.slides[activeSlideId] = currentSlide;
                newState.selection = emptySelection;
                return newState;
            }
            return state;
        case MOVE_SELECTED_ELEMENTS: {
            if (state.selection.type === 'slide' || !state.selection.selectionItems.length) {
                return state;
            }
            const newState = {
                ...state,
                slides: {...state.slides}
            };
            let currentSlide = {
                ...state.slides[state.activeSlide]
            };

            for (let i = 0; i < state.selection.selectionItems.length; i++) {
                const element = currentSlide.elements.find((el) => el.id === state.selection.selectionItems[i])
                if (!element) {
                    continue;
                }
                currentSlide = moveSlideElement(currentSlide, element.id, action.delta)
            }

            newState.slides[state.activeSlide] = currentSlide;
            return newState;
        }
        case MOVE_SLIDE_IN_ORDER: {
            const slideIndex = state.slidesOrder.findIndex(id => id === action.slideId);
            if (slideIndex < 0) {
                return state;
            }
            const newSlideOrder = [...state.slidesOrder];
            const temp = state.slidesOrder[slideIndex];
            switch (action.toWhere) {
                case 'prev':
                    if (slideIndex === 0) {
                        return state;
                    }
                    //меняем местами с предыдущим
                    newSlideOrder[slideIndex] = newSlideOrder[slideIndex - 1];
                    newSlideOrder[slideIndex - 1] = temp;
                    break;
                case 'next':
                    if (slideIndex === newSlideOrder.length - 1) {
                        return state;
                    }
                    //меняем местами со следующим
                    newSlideOrder[slideIndex] = newSlideOrder[slideIndex + 1];
                    newSlideOrder[slideIndex + 1] = temp;
                    break;
            }
            const newState = {
                ...state,
                slidesOrder: newSlideOrder,
            };
            return newState;
        }
        case MOVE_ELEMENT_LAYER: {
            if (!state.activeSlide || state.selection.type === 'slide' || !state.selection.selectionItems.length) {
                return state;
            }
            const newState = {
                ...state,
                slides: {...state.slides}
            };
            const currentSlide = {
                ...state.slides[state.activeSlide]
            };
            if (!currentSlide) {
                return state;
            }

            const elementIndex = currentSlide.elements.findIndex(el => el.id === state.selection.selectionItems[state.selection.selectionItems.length - 1]);
            if (elementIndex < 0) {
                return state;
            }
            const newElementsArray = [...currentSlide.elements];
            const temp = newElementsArray[elementIndex];
            switch (action.toWhere) {
                case 'down':
                    if (elementIndex === 0) {
                        return state;
                    }
                    //меняем местами с предыдущим
                    newElementsArray[elementIndex] = newElementsArray[elementIndex - 1];
                    newElementsArray[elementIndex - 1] = temp;
                    break;
                case 'up':
                    if (elementIndex === newElementsArray.length - 1) {
                        return state;
                    }
                    //меняем местами со следующим
                    newElementsArray[elementIndex] = newElementsArray[elementIndex + 1];
                    newElementsArray[elementIndex + 1] = temp;
                    break;
            }

            newState.slides[state.activeSlide] = {
                ...currentSlide,
                elements: newElementsArray,
            };
            return newState;
        }
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
export type transformElementACPropsType = {
    delta: {
        x: number,
        y: number,
        width: number,
        height: number,
    }
}
export type changeColorsSelectedACPropsType = {
    color?: colorType,
    backgroundColor?: colorType,
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
export const transformElementAC = ({delta}: transformElementACPropsType) => ({type: TRANSFORM_ELEMENT, delta});
export const changeColorsSelectedAC = (colors: changeColorsSelectedACPropsType) => ({type: CHANGE_COLORS_SELECTED, ...colors});
export const changeSlideBackgroundImageAC = (slideId: idType, image?: string) => ({type: CHANGE_SLIDE_BACKGROUND_IMAGE, slideId, image});
export const addFigureBlockAC = (figureType: figureTypeType) => ({type: ADD_FIGURE_BLOCK, figureType});
export const addTextBlockAC = () => ({type: ADD_TEXT_BLOCK});
export const addImageBlockAC = (dataURL: string, width: number, height: number) => ({type: ADD_IMAGE_BLOCK, dataURL, width, height});
export const setNewValueTextBlockAC = (value: string, slideId: idType, elementId: idType) => ({type: SET_NEW_VALUE_TEXT_BLOCK, value, slideId, elementId});
export const deleteSelectedAC = () => ({type: DELETE_SELECTED});
export const setEmptySelectionAC = () => ({type: SET_EMPTY_SELECTION});
export const moveSelectedElementsAC = (delta: pointType) => ({type: MOVE_SELECTED_ELEMENTS, delta});
export const moveSlideInOrdersAC = (slideId: idType, toWhere: 'next'|'prev') => ({type: MOVE_SLIDE_IN_ORDER, slideId, toWhere});
export const moveElementLayerAC = (toWhere: 'up'|'down') => ({type: MOVE_ELEMENT_LAYER, toWhere});
