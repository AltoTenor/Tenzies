import React from 'react';
import Popup from 'reactjs-popup';
import {FaQuestionCircle} from 'react-icons/fa'


export default function Popup_Comp(){
    return  (<div className="wrap">
                <h1 className="title">Tenzies</h1>
                <Popup
                    trigger={<div className="trigger"><FaQuestionCircle/> </div>}
                    modal
                    nested
                >
                    { close => (
                    <div className="modal">
                        <div className="close" onClick={close}>
                        &times;
                    </div>
                        <div className="header"> How to Play? </div>
                        <div className="content">
                        {' '}
                        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                        </div>
                    </div>
                    )}
                </Popup>
            </div>
    )
}