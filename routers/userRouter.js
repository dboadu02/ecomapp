import Router from "express";
import {createUser, makeAdmin, getUser, getAllUsers, updateUser, deleteUser} from "../controllers/userApis/barrel.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const userRouter = Router();

userRouter
        .post("/user/register", createUser)
        .post("/user/makeAdmin/:id", authMiddleware, makeAdmin)//make a user an admin

        .get("/user/:id", authMiddleware, getUser)
        .get("/users/:id", authMiddleware, getAllUsers)

        .put("user/edit/:id", authMiddleware, updateUser)

        .delete("user/delete/:id", deleteUser);


export default userRouter;

