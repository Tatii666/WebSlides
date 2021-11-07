import React from 'react';
import s from './Popup.module.css'

type propsType = {
    active: boolean,
    setActive: (x: boolean) => void,
    children: any,
}

const Popup = ({active, setActive, children}: propsType) => {
    return (
        <div className={active ? s.modal + s.modalActive : s.modal} onClick={() => setActive(false)}>
            <div className={active ? s.modalContent + s.modalContentActive: s.modalContent} onClick={e => e.stopPropagation()}>
                 {children}
            </div>
        </div>
    );
}

export {Popup}