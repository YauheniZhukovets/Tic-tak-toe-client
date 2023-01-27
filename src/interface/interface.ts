export interface User {
    _id: string
    name: string
}

export interface Room {
    _id: string
    users: User []
}

export interface StatisticGame {
    win: number
    loss: number
    tie: number
}