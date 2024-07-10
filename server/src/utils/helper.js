import { userSocketIDs } from "../app.js"

export const getOtherMember = (members,userId) => {
    return members.find((member) => member._id.toString() !== userId)
}

export const getSocket = (users) => {
    return users.map((user) => userSocketIDs.get(user._id.toString()))
}