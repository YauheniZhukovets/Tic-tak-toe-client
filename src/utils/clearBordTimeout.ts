export const clearBord = (changeFn: (bord: string[]) => void, time: number) => {
    setTimeout(() => {
        changeFn(['', '', '', '', '', '', '', '', ''])
    }, time)
}
