import app from '../app.js'
import dotenv from 'dotenv/config'
const PORT=process.env.PORT||3000

app.listen(PORT,(req,res)=>{
    console.log('херня малята')
})