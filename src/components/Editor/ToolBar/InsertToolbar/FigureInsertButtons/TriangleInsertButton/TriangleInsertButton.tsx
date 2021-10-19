import React from 'react';
import s from './TriangleInsertButton.module.css';

function TriangleInsertButton() {
    return (
        <div className={s.triangleInsertButton}>
            <div className={s.buttonIcon}>Triangle</div>
        </div>
    );
}

export {TriangleInsertButton};