import {isValidUsername} from '6pp'


export const usernameValidator = (username) => {
    if (!isValidUsername(username) && username !== "") {
        return {isValid  :false,errorMessage : "inavlid character"}
    }
}