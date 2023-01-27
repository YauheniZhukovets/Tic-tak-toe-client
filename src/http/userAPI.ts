import {$host} from './index';
import {User} from '../interface/interface';

export const getAllUsers = async (search: string) => {
    const {data} = await $host.get<User[]>(`user?search=${search}`)
    return data
}