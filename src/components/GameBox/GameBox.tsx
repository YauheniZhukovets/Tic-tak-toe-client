import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {AppState} from '../../context/AppProvider';
import {Game} from '../Game/Game';
import {Header} from './Header';
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {createGame, finishGame} from '../../http/gameAPI';


const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:5000/'
const socket = io(ENDPOINT);

export const GameBox = () => {
    const {user} = AppState()
    const {id} = useParams<{ id: string }>()
    const [roomCode, setRoomCode] = useState<string | null>(null);

    useEffect(() => {
        console.log(roomCode)
        if (roomCode) {
            socket.emit('joinRoom', roomCode)
        }
    }, [roomCode])

    const onClickNewGameHandler = async () => {
        if (id && user) {
            try {
                const game = await createGame(user._id, id)
                setRoomCode(game._id)
            } catch (e: any) {
                throw new Error(e.message)
            }
        }
    }

    const onClickEndGameHandler = async () => {
        if (roomCode) {
            try {
                await finishGame(roomCode)
                setRoomCode(null)
            } catch (e: any) {
                throw new Error(e.message)
            }
        }
    }

    return (
        <Card style={{height: '85vh'}}>
            {
                id ? <>
                        <Header roomCode={roomCode}
                                crateGame={onClickNewGameHandler}
                                endGame={onClickEndGameHandler}
                        />
                        {
                            roomCode
                                ? <Game socket={socket} roomCode={roomCode}/>
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
}