import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} localHostUser 
 * @returns {User}
 */
export const localHostUserToModel = (localhostUser) => {

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;

    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });

}
