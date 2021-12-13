import {
    colorType,
    EditorType, figuresElementsType,
    idType, imagesElementsType,
    PresentationType, slidesType, textsElementsType,
} from "./dataModel/editorDataModel";
import {v4 as uuidv4} from 'uuid';

const defaultBackgroundColor: colorType = {
    r: 255,
    g: 255,
    b: 255,
}

function toStringColor(color: colorType) {
    return color === 'none' ? 'none' : `rgb(${color.r}, ${color.g}, ${color.b})`;
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function setEditMode(editor: EditorType) {
    return {
        ...editor,
        mode: 'edit',
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function setViewMode(editor: EditorType) {
    return {
        ...editor,
        mode: 'view',
    }
}

/**
 * @param {EditorType} editor
 * @param {string} newTitle
 * @return {EditorType}
 */
function setPresentationTitle(editor: EditorType, newTitle: string) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            title: newTitle,
        }
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function addNewSlide(editor: EditorType) {
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
        ...editor,
        Presentation: {
            ...editor.Presentation,
            slidesOrder: [
                ...editor.Presentation.slidesOrder,
                {id: newId},
            ],
            slides: {
                ...editor.Presentation.slides,
                ...newSlide
            }
        }
    }
}

type selectSlidePropsType = {
    slideId: string,
    isCtrlPressed: boolean,
}

/**
 * @param {EditorType} editor
 * @param {{
 *   slideId: string,
 *   isCtrlPressed: boolean,
 * }}
 * @return {EditorType}
 */
function selectSlide(editor: EditorType, {slideId, isCtrlPressed}: selectSlidePropsType) {
    let newSelectedSlides;
    if (!isCtrlPressed) {
        newSelectedSlides = [{id: slideId}];
    } else {
        newSelectedSlides = [...editor.selectedSlides];

        // проверяем выделен ли уже слайд и снимаем выделение, если выделен, и наоборот
        const slideIndex = newSelectedSlides.findIndex(el => el.id === slideId)
        if (slideIndex === -1) {
            newSelectedSlides.push({id: slideId});
        } else {
            newSelectedSlides.splice(slideIndex, 1);
            if (!newSelectedSlides.length) {
                newSelectedSlides = [{id: slideId}];
            }
        }
    }
    return {
        ...editor,
        selectedSlides: newSelectedSlides,
        activeSlide: slideId,
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function selectFirstSlide(editor: EditorType) {
    const slidesOrder = editor.Presentation.slidesOrder;
    let newActiveSlide: idType = '';

    if (slidesOrder.length) {
        newActiveSlide = slidesOrder[0].id;
    }
    return {
        ...editor,
        activeSlide: newActiveSlide,
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function selectNextSlide(editor: EditorType) {
    const slidesOrder = editor.Presentation.slidesOrder;
    const activeSlide = editor.activeSlide;
    let newActiveSlide: idType = '';
    if (!activeSlide) {
        newActiveSlide = slidesOrder.length? slidesOrder[0].id : '';
    } else {
        const slideIndex = slidesOrder.findIndex(el => el.id === activeSlide);

        if (slideIndex !== -1) {
            if (!!slidesOrder[slideIndex + 1]) {
                newActiveSlide = slidesOrder[slideIndex + 1].id;
            } else {
                newActiveSlide = slidesOrder[slideIndex].id;
            }
        }
    }
    return {
        ...editor,
        activeSlide: newActiveSlide,
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function selectPrevSlide(editor: EditorType) {
    const slidesOrder = editor.Presentation.slidesOrder;
    const activeSlide = editor.activeSlide;
    let newActiveSlide: idType = '';

    if (activeSlide) {
        const slideIndex = slidesOrder.findIndex(el => el.id === activeSlide);

        if (slideIndex !== -1) {
            if (!!slidesOrder[slideIndex - 1]) {
                newActiveSlide = slidesOrder[slideIndex - 1].id;
            } else {
                newActiveSlide = slidesOrder[slideIndex].id;
            }
        }
    }
    return {
        ...editor,
        activeSlide: newActiveSlide,
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function newPresentation(editor: EditorType) {
    let newEditor: EditorType = {
        ...editor,
        selectedSlides: [],
        activeSlide: '',
        selectedElements: [],
        editLog: {
            undoStack: [],
            redoStack: [],
        },
        Presentation: {
            title: 'New presentation',
            slidesOrder: [],
            slides: {},
        }
    }
    newEditor = addNewSlide(newEditor);
    return selectNextSlide(newEditor)
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function savePresentation(editor: EditorType) {
    const type = 'data:application/octet-stream;base64, ';
    const text = JSON.stringify(editor.Presentation);
    const base = btoa(unescape(encodeURIComponent(text)))
    const res = type + base;
    const link = document.createElement('a');

    link.href = res;
    link.download = editor.Presentation.title + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const newEditor = {
        ...editor
    }

    return newEditor;
}


type loadPresentationPropsType = {
    presentation: PresentationType,
}
/**
 * @param {EditorType} editor
 * @param {{
 *   presentation: PresentationType,
 * }}
 * @return {EditorType}
 */
function loadPresentation(editor: EditorType, {presentation}: loadPresentationPropsType) {
    const newEditor = {
        ...editor,
        editLog: {
            undoStack: [],
            redoStack: [],
        },
        Presentation: presentation,
    }

    return newEditor;
}


type addToUndoPropsType = {
    EditorBeforeOperation: EditorType,
}
/**
 * @param {EditorType} editor
 * @param {{
 *   EditorBeforeOperation: EditorType,
 * }} payload
 * @return {EditorType}
 */
function addToUndo(editor: EditorType, {EditorBeforeOperation}: addToUndoPropsType) {
    const newEditor = {
        ...editor,
        editLog: {
            undoStack: [
                ...editor.editLog.undoStack,
                EditorBeforeOperation,
            ],
            redoStack: [],
        },
    }

    return newEditor;
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function doRedo(editor: EditorType) {
    const undoStack = [...editor.editLog.undoStack]
    const redoStack = [...editor.editLog.redoStack]
    let newEditor = redoStack.pop()
    if (newEditor) {
        undoStack.push(editor)
        return {
            ...newEditor,
            editLog: {
                ...newEditor.editLog,
                undoStack
            }
        }
    }
    return editor;
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function doUndo(editor: EditorType) {
    const undoStack = [...editor.editLog.undoStack]
    const redoStack = [...editor.editLog.redoStack]
    let newEditor = undoStack.pop()
    if (newEditor) {
        redoStack.push(editor)
        return {
            ...newEditor,
            editLog: {
                ...newEditor.editLog,
                redoStack
            }
        }
    }
    return editor;
}

type modifyElementPropsType = {
    slideId: string,
    elementId: string,
    newData: {
        x: number,
        y: number,
        width: number,
        height: number,
    }
}

function modifyElement(editor: EditorType, {slideId, elementId, newData}: modifyElementPropsType) {
    const slide = editor.Presentation.slides[slideId];
    const orderElement = slide.elements.find((el) => el.id === elementId);

    if (!orderElement) {
        return editor;
    }
    let imagesBlocks = slide.imageBlocks;
    let figuresBlocks = slide.figureBlocks;
    let textsBlocks = slide.textBlocks;
    let newFiguresBlocks: figuresElementsType = {};

    const newElementProperties = {
        position: {
            x: newData.x,
            y: newData.y,
        },
        width: newData.width,
        height: newData.height,
    };


    switch (orderElement.type) {
        case 'i':
            imagesBlocks = {
                ...imagesBlocks,
                [elementId]: {
                    ...imagesBlocks[elementId],
                    ...newElementProperties,
                }
            }
            break
        case 't':
            textsBlocks = {
                ...textsBlocks,
                [elementId]: {
                    ...textsBlocks[elementId],
                    ...newElementProperties,
                }
            }
            break
        case 'f':
            newFiguresBlocks = {
                ...figuresBlocks,
                [elementId]: {
                    ...figuresBlocks[elementId],
                    ...newElementProperties,
                }
            }
            break
    }

    let newSlides = {
        ...editor.Presentation.slides,
    }

    newSlides[slideId] =  {
    ...editor.Presentation.slides[slideId],
            imageBlocks: imagesBlocks,
            textBlocks: textsBlocks,
            figureBlocks: {...newFiguresBlocks},
    }
    const newEditor = {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            slides: {...newSlides},
        }
    }
    return newEditor
}

export {
    setEditMode,
    setViewMode,
    setPresentationTitle,
    addNewSlide,
    selectSlide,
    selectFirstSlide,
    selectNextSlide,
    selectPrevSlide,
    newPresentation,
    savePresentation,
    loadPresentation,
    addToUndo,
    doRedo,
    doUndo,
    toStringColor,
    modifyElement,
}