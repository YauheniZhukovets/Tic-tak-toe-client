import React from 'react';
import {Button, Container} from 'react-bootstrap';

type HeaderType = {
    crateGame: () => void
    endGame: () => void
    roomCode: string | null
}

export const Header: React.FC<HeaderType> = ({crateGame, endGame, roomCode}) => {

    return (
        <Container>
            {
                !roomCode
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
        </Container>
    )
}
