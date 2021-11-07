import {EditorType, idType, PresentationType} from "./dataModel/editorDataModel";

const defaultColor = {
    r: 0,
    g: 0,
    b: 0,
}

const defaultBackgroundColor = {
    r: 255,
    g: 255,
    b: 255,
}

/**
 * @type EditorType
 */
let editor = {
    mode: 'edit',
    palettePicker: {
        colors: [
            {
                r: 10,
                g: 78,
                b: 56,
            },
            {
                r: 100,
                g: 78,
                b: 220,
            },
            {
                r: 9,
                g: 8,
                b: 5,
            },
        ],
        defaultColor: {r:0, g:0, b:0},
        defaultBackgroundColor: {r:255, g:255, b:255},
        activeColor: {
            r: 10,
            g: 78,
            b: 56,
        },
    },
    fontPicker: {
        sizes: [5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 72],
        defaultSize: 12,
        defaultFont: 'Times New Roman',
        activeSize: 14
    },
    figurePicker: [
        {figureType: 't'}, //TODO
        {figureType: 'c'}, //TODO
        {figureType: 'r'}, //TODO
    ],
    editLog: {
        undoStack: [],
        redoStack: [],
    },
    selectedSlides: [],
    Presentation: {
        title: 'NewPresentation',
        slidesOrder: [{id: '1111'}, {id: '2222'}],
        slides: {
            '1111': {
                id: '1111',
                elements: [{id: 2, type: 'i'}, {id: 3, type: 't'}, {id: 4, type: 'f'}],
                imageBlocks: [{
                    id: '2',
                    x: 500,
                    y: 550,
                    width: 400,
                    height: 300,
                    image: new Image(),
                }],
                textBlocks: [{
                    id: 3,
                    x: 50,
                    y: 55,
                    value: 'hello world',
                    width: 200,
                    height: 300,
                    style: {
                        color: defaultColor,
                        size: 40,
                    }
                }],
                figureBlocks: [{
                    id: 4,
                    type: 't',
                    x: 50,
                    y: 55,
                    width: 200,
                    height: 300,
                    borderColor: defaultColor,
                    fillColor: defaultColor,
                }],
                backgroundColor: defaultBackgroundColor,
            },
            '2222': {
                id: '2222',
                elements: [{id: 2, type: 'i'}, {id: 3, type: 't'}, {id: 4, type: 'f'}],
                imageBlocks: [{
                    id: 2,
                    x: 500,
                    y: 550,
                    width: 400,
                    height: 300,
                    image: new Image(),
                }],
                textBlocks: [{
                    id: 3,
                    x: 50,
                    y: 55,
                    value: 'hello world',
                    width: 200,
                    height: 300,
                    style: {
                        color: defaultColor,
                        size: 40,
                    }
                }],
                figureBlocks: [{
                    id: 4,
                    figureType: 't',
                    x: 50,
                    y: 55,
                    width: 200,
                    height: 300,
                    borderColor: defaultColor,
                    fillColor: defaultColor,
                }],
                backgroundColor: defaultBackgroundColor,
            },
        }
    }
}

let editorChangeHandler = null;

/**
 * @return {EditorType}
 */
function getEditor() {
    return editor;
}

/**
 * @param {EditorType} newEditor
 */
function setEditor(newEditor) {
    editor = newEditor;
}

function addEditorChangeHandler(handler) {
    editorChangeHandler = handler;
}

/**
 * @param {Function} modifyFn
 * @param {Object} payload
 */
function dispatch(modifyFn, payload) {
    const newEditor = modifyFn(editor, payload);
    setEditor(newEditor);
    console.log(getEditor());

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler,
}