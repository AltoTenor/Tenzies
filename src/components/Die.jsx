import React from 'react';

export default function Die({id,obj,handleClick}){
    return (
        <div 
            className={` die ${ obj.isHeld && 'is_held'} `}
            onClick={ ( )=>{ handleClick(id) } }
        >
            {obj.value}
        </div>
    )
}