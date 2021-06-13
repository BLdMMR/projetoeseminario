import React from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

const STYLES = ['buttonmain', 'buttonlines']
const Sizes = ['smallbutton', 'largebutton']

export const Button= ({children, type, onClick, buttonstyle, buttonsize}) => {
    const checkButtonStyle = STYLES.includes(buttonstyle) ? buttonstyle : STYLES[0];
    const checkButtonSyze = Sizes.includes(buttonsize) ? buttonsize : Sizes[0];
    return(
        <Link to="/login" className='navLinksX'>
			<button className={`createbutton ${checkButtonStyle} ${checkButtonSyze}`}
            onClick={onClick}
            type={type}>
                {children}
            </button>
			</Link>
    )
}