import express from 'express'
import Cats from '../model/index.js'
import valid from '../validation/validation.js'
const router = express.Router()

router.get(async(req,res,next)=>{
    console.log(req.url)
    next()
})

router.get('/',async(req,res,next)=>{
    try{
        const cats=await Cats.getAll()
        res.json({status:'success',code:200,data:{cats}})
    }catch(error){
        next(error)
    }
})

router.get('/:id',async(req,res,next)=>{
    try{
        const cat=await Cats.getById(req.params.id)
        if(cat){
            return res.json({status:'success',code:200,data:{cat}})
        }
        return res.json({status:'error',code:404,message:'Not found'})
    }catch(error){
        next(error)
    }
})

router.post('/',valid.createCat,async(req,res,next)=>{
    try{
        const cat=await Cats.create(req.body)
        res.status(201).json({status:'success',code:201,data:{cat}})
    }catch(error){
        next(error)
    }
})

router.delete('/:id',async(req,res,next)=>{
    try{
        const cat=await Cats.remove(req.params.id)
        if(cat){
            res.status(201).json({status:'success',code:204,data:{cat}})
        }
        return res.json({status:'error',code:404,message:'Not found'})
    }catch(error){
        next(error)
    }
})

router.put('/:id',valid.updateCat,async(req,res,next)=>{
    try{
        const cat=await Cats.update(req.params.id,req.body)
        if(cat){
            res.status(201).json({status:'success',code:204,data:{cat}})
        }
        return res.json({status:'error',code:404,message:'Not found'})
    }catch(error){
        next(error)
    }
})

export default router