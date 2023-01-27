import {$host} from './index';

export const createGame = async (ownId: string, userId: string) => {
    const {data} = await $host.post('game', {ownId, userId})
    return data
}

export const finishGame = async (gameId: string) => {
    const {data} = await $host.delete(`game?id=${gameId}`,)
    return data
}