import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Room} from '../../interface/interface';
import {AppState} from '../../context/AppProvider';

type HeaderType = {
    crateGame: () => void
    endGame: () => void
    room: Room | null
    result: string
}

export const Header: React.FC<HeaderType> = React.memo(({crateGame, endGame, room, result}) => {
    const {statisticGames} = AppState()

    return (
        <Container className="d-flex justify-content-between align-items-center">
            {
                !room
                    ? <Button className="m-1"
                              variant="outline-primary"
                              onClick={crateGame}
                    >Начать игру
                    </Button>
                    : <Button className="m-1"
                              onClick={endGame}
                              variant="outline-danger"
                    >
                        Завершить игру
                    </Button>
            }
            <div className="m-auto align-self-center">
                {<h3 className="m-0 text-warning">{result}</h3>}
            </div>
            <div className="d-flex">
                <h4 style={{color: 'lightgreen'}} className="p-1">Win: {statisticGames.win}</h4>
                <h4 style={{color: 'indianred'}} className="p-1">Loss: {statisticGames.loss}</h4>
                <h4 className="p-1">Tie: {statisticGames.tie}</h4>
            </div>
            <div></div>
        </Container>
    )
})
