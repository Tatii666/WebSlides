import {EditorType, PresentationType} from "./editorDataModel";

function getTitle(Editor: EditorType): string {
    return Editor.Presentation.title;
}

function setTitle(Editor: EditorType, newTitle: string): EditorType {
    const Presentation: PresentationType = Editor.Presentation;
    const newEditor: EditorType = {
        ...Editor,
        Presentation: {
            ...Presentation,
            title: newTitle,
        },
    }
    return newEditor;
}

export {getTitle, setTitle}