import React, {MouseEvent} from 'react';
import './Cell.css';

type CellType = {
    text: string
    id: string
    handleCellClick: (e: MouseEvent<HTMLDivElement>) => void
}

export const Cell: React.FC<CellType> = React.memo(({handleCellClick, id, text}) => {
    return (
        <div id={id} className="cell" onClick={handleCellClick}>
            {text}
        </div>
    )
})

