export type EditorType = {
    mode: ('view'|'edit'),
	palettePicker: palettePickerType,
	fontPicker: fontPickerType,
	figurePicker: figurePickerType,
	Presentation: PresentationType,
    editLog: editLogType,
    selectedSlides: Array<idType>,
    selectedElement: elementType,
    activeSlide: number,
};

export type editLogType = {
    undoStack: Array<PresentationType>,
    redoStack: Array<PresentationType>,
}

export type PresentationType = {
    title: string,
    slidesOrder: Array<{id: idType}>,
    slides: Array<slideType>,
};

export type elementType = {
    id: idType,
    type: 'i'|'t'|'f',
};

export type slideType = {
    id: idType
    elements: Array<elementType>,
	imageBlocks: Array<imageBlockType>,
	textBlocks: Array<textBlockType>,
	figureBlocks: Array<figureBlockType>,
};

export type imageBlockType = {
    id: idType,
    position: pointType,
    width: number,
    height: number,
    image: File,
};

export type textBlockType = {
    id: idType,
    position: pointType,
    value: string,
    width: number,
    height: number,
    style: {
        color: colorType,
        size: number,
    }
};

export type figureBlockType = {
    id: idType,
    type: 't'|'c'|'r',
    position: pointType,
    width: number,
    height: number,
    borderColor: colorType,
    fillColor: colorType,
};

export type colorType  = {
    r: number,
    g: number,
    b: number
};
export type colorsType = Array<colorType>;

export type palettePickerType = {
    colors: colorsType,
    defaultColor: colorType,
    defaultBackgroundColor: colorType,
    activeColor: colorType,
};

export type fontPickerType = {
    sizes: Array<number>,
    defaultSize: number,
    defaultFont: string,
    activeSize: number,
};

export type figurePickerType = Array<triangleType|circleType|rectangleType>; //TODO

export type triangleType = {
    figureType: 't',     //TODO
    topLeft: pointType,
    bottomRight: pointType,
    borderColor: colorType,
    fillColor: colorType,
};

export type circleType = {
    figureType: 'c',    //TODO
    center: pointType,
    radius: number,
    borderColor: colorType,
    fillColor: colorType,
};

export type rectangleType = {
    figureType: 'r',    //TODO
    topLeft: pointType,
    bottomRight: pointType,
    borderColor: colorType,
    fillColor: colorType,
};

export type pointType = {
    x: number,
    y: number
};

export type idType = string;