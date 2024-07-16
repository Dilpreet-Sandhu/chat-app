import { getSocket } from "./helper.js";


export const emitEvent = (req,event,users,data) => {
    const io = req.app.get("io");
    const userSockets = getSocket(users);

    io.to(userSockets).emit(event,data)
}