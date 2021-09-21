type EditorType = {
    mode: ('view'|'edit'),
	palettePicker: palettePickerType,
	fontPicker: fontPickerType,
	figurePicker: figurePickerType,
	Presentation: PresentationType,
};
type PresentationType = {
    title: string,
    log: unknown, //TODO,
    activeSlide: number,
    selectedSlides: Array<number>,
    slides: Array<slideType>,
};
type elementType = {
    id: number,
    type: 'i'|'t'|'f',
};
type slideType = {
    elements: Array<elementType>,
	imageBlocks: Array<imageBlockType>,
	textBlocks: Array<textBlockType>,
	figureBlocks: Array<figureBlockType>,
};
type imageBlockType = {
    id: number,
    position: pointType,
    width: number,
    height: number,
    image: File,
};
type textBlockType = {
    id: number,
    position: pointType,
    value: string,
    width: number,
    height: number,
    style: {
        color: colorType,
        size: number,
    }
};
type figureBlockType = {
    id: number,
    type: 't'|'c'|'r',
    position: pointType,
    width: number,
    height: number,
    borderColor: colorType,
    fillColor: colorType,
};

type colorType  = {
    r: number,
    g: number,
    b: number
};
type colorsType = Array<colorType>;
type palettePickerType = {
    colors: colorsType,
    defaultColor: colorType,
    defaultBackgroundColor: colorType,
    activeColor: colorType,
};
type fontPickerType = {
    sizes: Array<number>,
    defaultSize: number,
    defaultFont: string,
    activeSize: number,
};
type figurePickerType = Array<triangleType|circleType|rectangleType>; //TODO
type triangleType = {
    figureType: 't',     //TODO
    topLeft: pointType,
    bottomRight: pointType,
    borderColor: colorType,
    fillColor: colorType,
};
type circleType = {
    figureType: 'c',    //TODO
    center: pointType,
    radius: number,
    borderColor: colorType,
    fillColor: colorType,
};
type rectangleType = { 
    figureType: 'r',    //TODO
    topLeft: pointType,
    bottomRight: pointType,
    borderColor: colorType,
    fillColor: colorType,
};
type pointType = {
    x: number,
    y: number
};
