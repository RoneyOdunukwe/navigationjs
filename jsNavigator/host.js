const express = require("express");
const cors=require("cors");
const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.static("files"));

// app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("My web works")
// })

// app.post("/data", (req, res) => {
//     res.send('something')
//     console.log('Collect', req.body);
//     res.send("OK")
// });

app.post('/data',(req,res)=>{
    const data=req.body
    console.log(data);

    res.status(200).json({
        message:'recieved',
        data
    })
    
})
app.listen(`1234`, () => {
    console.log('yeah');
});
