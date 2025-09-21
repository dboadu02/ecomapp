import Router from "express";
import {createUser, makeAdmin, getUser, getAllUsers, updateUser, deleteUser} from "../controllers/userApis/barrel.js";
import authMiddleware from "../middlewares/authmiddleware.js"
import checkUlitimateAdmin from "../middlewares/checkUltimateAdmin.js";

const userRouter = Router();

userRouter
        .post("/user/register", createUser)
        .post("/user/makeAdmin/:id", authMiddleware,checkUlitimateAdmin, makeAdmin)//make a user an admin

        .get("/user/:id", authMiddleware, getUser)
        .get("/users/:id", authMiddleware, getAllUsers)

        .put("user/edit/:id", authMiddleware, updateUser)

        .delete("user/delete/:id",authMiddleware, deleteUser)


export default userRouter;

