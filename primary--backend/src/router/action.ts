import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
    const availableACtions = await prismaClient.availableTrigger.findMany({});
    res.json({
        availableACtions
    })
})


export const actionRouter = router;