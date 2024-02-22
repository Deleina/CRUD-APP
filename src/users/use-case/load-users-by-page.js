/**
 * 
 * @param {Number} page 
 * @returns {Promise <User[]>}
 */

import { localHostUserToModel } from "../mappers/localHost-user.mapper";


export const loadUsersByPage = async (page = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`

    const res = await fetch(url);
    const data = await res.json();

    const users = data.map(userLike => localHostUserToModel(userLike));

    console.log(users);
    return users;

}
