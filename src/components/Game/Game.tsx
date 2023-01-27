import React, {MouseEvent, useEffect, useState} from 'react';
import './Game.css';
import {Cell} from '../Cell/Cell';
import {Socket} from 'socket.io-client';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {Patterns} from '../../utils/winningPatterns';
import {clearBord} from '../../utils/clearBordTimeout';
import {AppState} from '../../context/AppProvider';
import {Room} from '../../interface/interface';

type GameType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
    room: Room | null
    setResult: (result: string) => void
}

export const Game: React.FC<GameType> = React.memo(({room, socket, setResult}) => {
    const [board, setBoard] = useState<string[]>(['', '', '', '', '', '', '', '', ''])
    const [canPlay, setCanPlay] = useState<boolean>(true)
    const [currentName, setCurrentName] = useState<string>('')
    const {user, setStatisticGames, statisticGames} = AppState()

    useEffect(() => {
        checkIfTie()
        checkWin()
    }, [board])

    useEffect(() => {
        socket.on('updateGame', (id: string) => {
            setBoard(board.map((el, i) => i === +id ? el = 'O' : el))
            setCanPlay(true)
        })
        return () => {
            socket.off('updateGame')
        }
    })

    useEffect(() => {
        socket.on('updateName', (name: string) => {
            setCurrentName(name)
        })
        return () => {
            socket.off('updateName')
        }
    })

    const handleCellClick = (e: MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id
        if (canPlay && board[+id] === '') {
            setBoard([...board, board[+id] = 'X'])
            setBoard(board.map((el, i) => i === +id ? el = 'X' : el))
            socket.emit('play', {id, roomCode: room?._id})
            socket.emit('change', {room, name: user.name})
            setCanPlay(false)
            setResult('')
        }
    }

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]]
            if (firstPlayer === '') return
            let foundWinningPattern = true

            currPattern.forEach((i) => {
                if (board[i] !== firstPlayer) {
                    foundWinningPattern = false
                }
            })
            if (foundWinningPattern) {
                setResult(currentName !== user.name ? 'Вы победили!' : `Вы проиграли`)
                if (currentName !== user.name) {
                    setStatisticGames({...statisticGames, win: statisticGames.win + 1})
                } else {
                    setStatisticGames({...statisticGames, loss: statisticGames.loss + 1})
                }
                clearBord(setBoard, 1500)
                setCanPlay(true)
            }
        })
    }

    const checkIfTie = () => {
        let filled = true
        board.forEach((square) => {
            if (square === '') {
                filled = false;
            }
        })
        if (filled) {
            setResult('Ничья')
            clearBord(setBoard, 1500)
            setCanPlay(true)
            setStatisticGames({...statisticGames, tie: statisticGames.tie + 1})
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
})
