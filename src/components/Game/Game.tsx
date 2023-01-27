import React, {MouseEvent, useEffect, useState} from 'react';
import './Game.css';
import {Cell} from '../Cell/Cell';
import {Socket} from 'socket.io-client';
import {DefaultEventsMap} from '@socket.io/component-emitter';

type GameType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
    roomCode: string | null
}

export const Game: React.FC<GameType> = ({roomCode, socket}) => {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
    const [canPlay, setCanPlay] = useState(true)

    useEffect(() => {
        socket.on('updateGame', (id: string) => {
            console.log('use Effect', id);
            setBoard((data) => ({...data, [id]: 'O'}));
            setCanPlay(true);
        });

        return () => {
            socket.off('updateGame')
        }
    });

    const handleCellClick = (e: MouseEvent<HTMLDivElement>) => {
        const id: any = e.currentTarget.id
        if (canPlay && board[id] === '') {
            setBoard((data) => ({...data, [id]: 'X'}))
            socket.emit('play', {id, roomCode})
            setCanPlay(false)
        }

        if (
            (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
            (board[0] === 'O' && board[1] === 'O' && board[2] === 'O')
        ) {
            setBoard(['', '', '', '', '', '', '', '', ''])
        }
    }

    return (
        <main>
            <section className="main-section">
                <Cell handleCellClick={handleCellClick} id={'0'} text={board[0]}/>
                <Cell handleCellClick={handleCellClick} id={'1'} text={board[1]}/>
                <Cell handleCellClick={handleCellClick} id={'2'} text={board[2]}/>

                <Cell handleCellClick={handleCellClick} id={'3'} text={board[3]}/>
                <Cell handleCellClick={handleCellClick} id={'4'} text={board[4]}/>
                <Cell handleCellClick={handleCellClick} id={'5'} text={board[5]}/>

                <Cell handleCellClick={handleCellClick} id={'6'} text={board[6]}/>
                <Cell handleCellClick={handleCellClick} id={'7'} text={board[7]}/>
                <Cell handleCellClick={handleCellClick} id={'8'} text={board[8]}/>
            </section>
        </main>
    )
}
