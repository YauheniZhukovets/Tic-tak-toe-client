import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {AppState} from '../../context/AppProvider';
import {Game} from '../Game/Game';
import {Header} from './Header';
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {createGame, finishGame} from '../../http/gameAPI';
import {Room} from '../../interface/interface';


const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:5000/'
const socket = io(ENDPOINT);

export const GameBox = React.memo(() => {
    const {user, setStatisticGames} = AppState()
    const {id} = useParams<{ id: string }>()
    const [room, setRoom] = useState<Room | null>(null)
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        if (room) {
            socket.emit('joinRoom', room._id)
        }
    }, [room])

    const onClickNewGameHandler = async () => {
        if (id && user) {
            try {
                const room = await createGame(user._id, id)
                setRoom(room)
                setResult('')
                setStatisticGames({win: 0, loss: 0, tie: 0})
            } catch (e: any) {
                throw new Error(e.message)
            }
        }
    }

    const onClickEndGameHandler = async () => {
        if (room) {
            try {
                await finishGame(room._id)
                setRoom(null)
                setResult('')
            } catch (e: any) {
                throw new Error(e.message)
            }
        }
    }

    return (
        <Card style={{height: '85vh'}}>
            {
                id ? <>
                        <Header room={room}
                                crateGame={onClickNewGameHandler}
                                endGame={onClickEndGameHandler}
                                result={result}
                        />
                        {
                            room
                                ? <Game socket={socket}
                                        room={room}
                                        setResult={setResult}
                                />
                                : <h3 className="align-self-center m-auto">
                                    Нажмите "Начнить игру"
                                </h3>
                        }
                    </>
                    : <h3 className="align-self-center m-auto">
                        Выберите игрока
                    </h3>
            }
        </Card>
    )
})