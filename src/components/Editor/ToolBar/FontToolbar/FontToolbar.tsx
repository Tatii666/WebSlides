import React from 'react';
import s from './FontToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FontSelect} from "./FontSelect/FontSelect";
import {FontSizeSelect} from "./FontSizeSelect/FontSizeSelect";
import {AlignButton} from "./AlignButton/AlignButton";
import {ReactComponent as alignLeft} from "../../../../img/alignLeft.svg";
import {ReactComponent as alignCenter} from "../../../../img/alignCenter.svg";
import {ReactComponent as alignRight} from "../../../../img/alignRight.svg";
import {dispatchType, stateType} from "../../../../store/store";
import {connect} from "react-redux";
import {changeFontStylesAC, changeFontStylesACPropsType} from "../../../../store/presentationReducer";
import {fontPickerType} from "../../../../dataModel/editorDataModel";

type propsType = {
    changeFontStyles: Function,
    fontPicker: fontPickerType,
}

function FontToolbar({changeFontStyles, fontPicker}: propsType) {
    return (
        <div className={s.fontToolbar}>
            <div className={s.fontToolbarButtons}>
                <FontSelect fonts={fontPicker.fonts} changeFontStyles={changeFontStyles}/>
                <FontSizeSelect sizes={fontPicker.sizes} changeFontStyles={changeFontStyles}/>
            </div>
            <div className={s.alignButtons}>
                <AlignButton icon={alignLeft} onClick={() => changeFontStyles({align: 'left'})}/>
                <AlignButton icon={alignCenter} onClick={() => changeFontStyles({align: 'center'})}/>
                <AlignButton icon={alignRight} onClick={() => changeFontStyles({align: 'right'})}/>
            </div>
            <ToolbarText text="font" />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        fontPicker: state.view.fontPicker,
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        changeFontStyles: (fontStyles: changeFontStylesACPropsType) => dispatch(changeFontStylesAC(fontStyles)),
    }
}

const FontToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(FontToolbar);

export {FontToolbarContainer};