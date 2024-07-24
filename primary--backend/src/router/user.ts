
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signinSchema, signupSchema } from "../types/types";
import { prismaClient } from "../db";
const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body.username;
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email:parsedData.data.username
        }
    })

    if (userExists) {
        return res.status(403).json({
            message:"User already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password:parsedData.data.password,
            name:parsedData.data.name
        }
    })

    // send email logic

    return res.json({
        message:"Please verify account"
    })

})

router.post("/signin", (req, res) => {
    console.log("signin handler");
})

router.get("/user", authMiddleware, (req, res) => {
    console.log("signup handler")
})


export const userRouter = router;