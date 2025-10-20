const {users} =require("./user.controller")
const{PassThrough}=require("stream")
const CryptoRandom=require("../middlewares/random-number")
 
exports.view = async(req,res)=>{
    try {
     const usersarray=users
     const {pag,limit}=req.query
     
    const pag1=parseInt(pag)
    const limit1=parseInt(limit) 

     let inicio =(pag1-1)*limit1
     let final =inicio+limit1
     
    const user = usersarray.slice(inicio,final).map(u=>({
        user:u.user,
        email:u.email,
        id:u.id,
        orders:u.orders
    }))

    res.status(201).send(user)
}
catch(error){
    res.status(404).send(error)
}
}

exports.buy=async(req,res)=>{
    try {
       const customerId=req.params.id
       const customer=users.find(u=>u.id==customerId)
       const items=req.body

       customer.orders=[]

       customer.orders.push(items)

       res.status(201).send({items:items.items}) 

    } catch (error) {
        res.status(404).send(error)
    }
}   

exports.stream=async(req,res)=>{
res.setHeader("Content-type","text/csv;charset-utf-8")
res.setHeader("content-Disposition",`attachment;filename="export.csv"`)

const stream=new PassThrough()

stream.pipe(res)

users.forEach(user=>{
const order=Array.isArray(user.orders)?user.orders[0].map(o=>`${o.item}:${o.cantidad}`).join("|"):""

stream.write(`${user.user},${user.age},${user.id},${user.email},${order}`)}
)
stream.end()
}

const seen=new Map

exports.payment=async(req,res)=>{
const key =req.headers["idempotency-key"]
if(!key)return res.status(400).send("idemptency key es rquerida")
if(seen.has(key))return res.status(200).json(seen.get(key))
const result={paymentId:CryptoRandom(),status:"ok"}     
seen.set(key,result)
res.status(201).json(result)
}