import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  createGroupChat,
  deleteGroup,
  getChatDetails,
  getMyAdminChats,
  getMyChats,
  getMyMessages,
  leaveMembers,
  removeMembers,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
export const chatRouter = Router();

chatRouter.use(verifyJWT);

chatRouter.route("/new").post(createGroupChat);
chatRouter.route("/my/grps").get(getMyAdminChats);
chatRouter.route("/my").get(getMyChats);
chatRouter.route("/add").put(addMembers);
chatRouter.route("/del").put(removeMembers);
chatRouter.route("/remove/:chatId").put(leaveMembers);
chatRouter
  .route("/send/attachment").post(upload.fields([{name:"photo",maxCount:1}]), sendAttachment);
chatRouter.route('/messages/:id').get(getMyMessages)
chatRouter.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteGroup)
