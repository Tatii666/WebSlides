import {
    colorType,
    EditorType,
} from "./dataModel/editorDataModel";
import {v4 as uuidv4} from 'uuid';

const defaultBackgroundColor: colorType = {
    r: 255,
    g: 255,
    b: 255,
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
            imageBlocks: [],
            textBlocks: [],
            figureBlocks: [],
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
    }
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function newPresentation(editor: EditorType) {
    const newEditor = {
        ...editor,
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

    return addNewSlide(newEditor);
}

/**
 * @param {EditorType} editor
 * @return {EditorType}
 */
function savePresentation(editor: EditorType) {
    const type = 'data:application/octet-stream;base64, ';
    const text = JSON.stringify(editor.Presentation);
    const base = btoa(text);
    const res = type + base;
    const link = document.createElement('a');
    link.href = res;
    link.download = editor.Presentation.title + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const newEditor = {
        ...editor,
        editLog: {
            undoStack: [],
            redoStack: [],
        },
    }

    return newEditor;
}

export {
    setEditMode,
    setViewMode,
    setPresentationTitle,
    addNewSlide,
    selectSlide,
    newPresentation,
    savePresentation,

}