import {Router} from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {addMembers, createGroupChat, getMyAdminChats, getMyChats} from '../controllers/chat.controller.js'

export const chatRouter = Router();


chatRouter.use(verifyJWT)

chatRouter.route('/new').post(createGroupChat)
chatRouter.route('/my/grps').get(getMyAdminChats)
chatRouter.route("/my").get(getMyChats)
chatRouter.route("/add").put(addMembers)