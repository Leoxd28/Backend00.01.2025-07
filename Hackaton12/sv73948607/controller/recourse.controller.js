const recourse=require("../models/recourse")
const money=require("../models/money")

    exports.create= async(req,res)=>{
    try{
    const newrecourse=  await recourse.create(req.body)
    const moneys =await money.findById("68eaf604ae202e460c3f95b0")

    moneys.count-=newrecourse.count*newrecourse.price
    await moneys.save()


    res.status(201).send({newrecourse,dineroactual:moneys.count})
    }
    catch(error){
        res.status(500).send("error")
    }
    }

    exports.add= async(req,res)=>{
       const add =Number(req.body.add)
        try {
       const recourses=await recourse.findById(req.params.id)
       const moneys=await money.findById("68eaf604ae202e460c3f95b0")
        
       recourses.count+=add
       recourses.save()
       
       moneys.count -= add*recourses.price
       await moneys.save()

      res.status(201).send({recourses,dineroactual:moneys.count})

    } catch (error) {
        
       res.status(404).send("error")
      }
        
    }


