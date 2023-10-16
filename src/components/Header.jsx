import React from "react";

function Header(props)
{
    const headerStyle = { backgroundColor: props.bgColor, color: 'blue'}
    return (
        <header style = {headerStyle}>
            <div className='container'>
                <h2>{props.text}</h2>
            </div>
        </header>
    )
}

export default Header