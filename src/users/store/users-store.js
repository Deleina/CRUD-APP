import { User } from "../models/user";
import { loadUsersByPage } from "../use-case/load-users-by-page"

const state = {
    currentpage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentpage + 1);

    if (users.length === 0) {
        return;
    }
    state.currentpage += 1;
    state.users = users;
}


const loadPreviousPage = async () => {
    if (state.currentpage == 1) {
        return;
    }
    const users = await loadUsersByPage(state.currentpage - 1);
    
    state.users = users;
    state.currentpage -= 1;
    
}


/**
 * 
 * @param {User} updatedUser 
 */

const onUserChanged = async (updatedUser) => {
    let wasFound = false;

    state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if ( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    }
}



const reloadPage = async () => {
    const users = await loadUsersByPage( state.currentpage );
    if ( users.length === 0 ) {
        await loadPreviousPage();
        return;
    } 
    
    state.users = users;
}


export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,


    /**
     * 
     * @returns {User{}}
     */

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentpage
}
