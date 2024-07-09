import express from "express";
import {
  acceptFriendRequest,
  getUserByName,
  loginUser,
  logoutUser,
  registerUser,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerValidator, validation } from "../utils/validator.js";

export const userRouter = express();

userRouter.route("/reg").post(upload.single("avatar"), registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(verifyJWT, logoutUser);
userRouter.route("/search").get(verifyJWT, getUserByName);
userRouter.route("/sendReq").put(verifyJWT, sendFriendRequest);
userRouter.route("/acceptReq").put(verifyJWT, acceptFriendRequest);
