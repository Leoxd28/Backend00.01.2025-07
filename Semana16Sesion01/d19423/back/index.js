const express =  require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const SKSTRIPE = process.env.SKSTRIPE;

const stripe = require('stripe')(SKSTRIPE);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("Hola desde el backend");
})

app.post('/api/create-checkout-session',async(req,res)=>{
    const {product} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[
            {
                price_data:{
                    currency:"pen",
                    product_data:{
                        name: product.name
                    },
                    unit_amount: product.price * 100 //no olvidar
                },
                qantity: product.quantity
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    });
    res.json({id: session.id})
})

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en el puerto: ${PORT}`)
})