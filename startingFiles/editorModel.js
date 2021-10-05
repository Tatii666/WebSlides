const Editor = {
	mode: ('view'|'edit'),
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
	Presentation: {
		title: 'NewPresentation',
		log: [], //TODO,
		activeSlide: 2,
		selectedSlides: [],
		slides: [
			slide1,
			slide2,
		]
	}
}

const slide1 = {
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
			color: Editor.defaultColor,
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
		borderColor: Editor.defaultColor,
		fillColor: Editor.defaultBackgroundColor,
	}],
}

const slide2 = {
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
			color: Editor.defaultColor,
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
		borderColor: Editor.defaultColor,
		fillColor: Editor.defaultBackgroundColor,
	}],
}