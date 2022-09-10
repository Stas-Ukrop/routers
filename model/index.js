import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {v4 as uuidv4} from 'uuid'

const readData=async()=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const data=await fs.readFile(path.join(__dirname,'cats.json'),'utf8')
    return JSON.parse(data)
}

const getAll=async()=>{
    return readData()
}

const getById=async(id)=>{
    const data=await readData()
    const [result]=data.filter((cat)=>cat.id===id)
    return result
}

const remove = async(id)=>{
    const data=await readData()
    
    function el(cat){
        return cat.id===id
    } 
    const indexEl=data.findIndex(el)
    if(indexEl){
        const result=data.splice(indexEl,1)
    
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        await fs.writeFile(path.join(__dirname,'cats.json'), JSON.stringify(data))
    }
    return result
}

const create = async(body)=>{
    console.log(body)
    const id=uuidv4()
    const record ={
        id,
        ...body,
        ...(body.isVaccinated?{}:{isVaccinated:false})
    }
    const data =await readData()
    data.push(record)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    await fs.writeFile(path.join(__dirname,'cats.json'), JSON.stringify(data))
    return record
}

    const update=async(id,body)=>{
    const data =await readData()
    const [result]=data.filter((cat)=>cat.id===id)
    if(result){
        Object.assign(result,body)
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        await fs.writeFile(path.join(__dirname,'cats.json'), JSON.stringify(data))
    }
    return result    
    }

export default {
    getAll,
    getById,
    remove,
    create,
    update
}