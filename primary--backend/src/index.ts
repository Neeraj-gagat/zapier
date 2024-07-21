import  express  from "express";

const app = express();

app.post("/zapier/create/zap", (req,res) => {
    console.log("up and running")

    
    res.json({
        message:"api working"
    })
})

app.listen(3000);