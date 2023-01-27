import {$host} from "./index";

export const login = async (name: string) => {
    const {data} = await $host.post('user/login', {name})
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
}