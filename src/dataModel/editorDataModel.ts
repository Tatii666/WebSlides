export type EditorType = {
    mode: editorModeType,
	palettePicker: palettePickerType,
	fontPicker: fontPickerType,
	figurePicker: figurePickerType,
	Presentation: PresentationType,
    editLog: editLogType,
    selectedSlides: selectedSlidesType,
    selectedElements: Array<idType>,
    activeSlide: idType,
};

export type selectedSlidesType = Array<slidesOrderItemType>;

export type selectedElementsType = Array<idType>;

export type editorModeType = ('view'|'edit');

export type editLogType = {
    undoStack: Array<EditorType>,
    redoStack: Array<EditorType>,
}

export type editLogTypeGood = {
    undoStack: Array<PresentationType>,
    redoStack: Array<PresentationType>,
}

export type slidesOrderItemType = {id: idType};

export type slidesOrderType = Array<idType>;

export type slidesType = {[slideId: idType]: slideType};

export type selectionType = {
    type: 'slide'|'element',
    selectionItems: Array<idType>,
}

export const getSelectedSlides = (selection: selectionType): Array<idType> => {
    if (selection.type === 'slide') {
        return selection.selectionItems;
    }
    return []
}

export const getSelectedElements = (selection: selectionType): Array<idType> => {
    if (selection.type === 'element') {
        return selection.selectionItems;
    }
    return []
}

export type PresentationType = {
    title: string,
    slidesOrder: slidesOrderType,
    slides: slidesType,
    activeSlide: idType,
    selection: selectionType,
};

export type elementType = {
    id: idType,
    type: 'i'|'t'|'f',
};

export type slideType = {
    id: idType,
    elements: Array<elementType>,
	imageBlocks: imagesElementsType,
	textBlocks: textsElementsType,
	figureBlocks: figuresElementsType,
    styles: slideStylesType,
};

export type imagesElementsType = {[id: idType]: imageBlockType};

export type imageBlockType = {
    id: idType,
    position: pointType,
    width: number,
    height: number,
    image: string,
    styles: stylesType,
};

export type stylesType = {
    color: colorType,
    backgroundColor: colorType,
}

export type slideStylesType = {
    backgroundColor: colorType,
    backgroundImage?: string,
}

export type fontStylesType = {
    fontSize?: number,
    font?: string,
    align?: 'left'|'center'|'right',
}

export type textsElementsType = {[id: idType]: textBlockType};

export type textBlockType = {
    id: idType,
    position: pointType,
    width: number,
    height: number,
    value: string,
    styles: stylesType & fontStylesType,
};

export type figuresElementsType = {[id: idType]: figureBlockType};
export type figureTypeType = 't'|'c'|'r';
export type elementTypeType = 'i'|'f'|'t';

export type figureBlockType = {
    id: idType,
    type: figureTypeType,
    position: pointType,
    width: number,
    height: number,
    styles: stylesType,
};

export type colorType  = {
    r: number,
    g: number,
    b: number,
} | 'none';

export type colorsType = Array<colorType>;

export type palettePickerType = {
    colors: colorsType,
    defaultColor: colorType,
    defaultBackgroundColor: colorType,
    activeColor: colorType,
};

export type colorPickerType = {
    defaultColors: Array<colorType>,
    userColors: Array<colorType>,
    userMaxColors: number,
};

export type viewType = {
    colorPicker: colorPickerType,
    fontPicker: fontPickerType,
}

export type alignType = 'left'|'center'|'right';

export type fontPickerType = {
    sizes: Array<number>,
    fonts: Array<string>,
};

export type figurePickerType = Array<triangleType|circleType|rectangleType>; //TODO

export type triangleType = {
    figureType: 't',
    topLeft: pointType,
    bottomRight: pointType,
    borderColor: colorType,
    fillColor: colorType,
};

export type circleType = {
    figureType: 'c',
    center: pointType,
    radius: number,
    borderColor: colorType,
    fillColor: colorType,
};

export type rectangleType = {
    figureType: 'r',
    topLeft: pointType,
    wid: pointType,
    borderColor: colorType,
    fillColor: colorType,
};

export type pointType = {
    x: number,
    y: number
};

export type idType = string;

export const figureType = {
    CIRCLE: 'c',
    TRIANGLE: 't',
    RECTANGLE: 'r',
}

export type ElementTypetype = {
    IMAGE: 'i',
    TEXT: 't',
    FIGURE: 'f',
}

export const ElementType: ElementTypetype = {
    IMAGE: 'i',
    TEXT: 't',
    FIGURE: 'f',
}

