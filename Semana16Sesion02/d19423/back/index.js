const cors = require('cors');
const express = require('express');
require('dotenv').config();
const Culqi = require('culqi-node');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({origin: '*'}));
app.use(express.json());

const culqi = new Culqi({
  privateKey: process.env.privateKey,
  publicKey: process.env.publicKey,
  pciCompliant: true
});
console.log('Culqi initialized with public key:', process.env.publicKey);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola desde Culqi');
});

app.post('/api/process/pay', async (req, res) => {

    const{customer, shipping, notes, cart, totals, payment} = req.body;
    await culqi.tokens.createToken({
        card_number: payment.number,
        cvv: payment.cvc,
        expiration_month: payment.exp.split('/')[0],
        expiration_year: payment.exp.split('/')[1],
        email: customer.email
    }).then((data)=>{
        console.log(data.id);
        let dataCharge = {
                amount: (totals.total) * 100,
                currency_code: totals.currency,
                email: customer.email,
                installments: 1,
                description: "Compra en mi tienda del cliente " + customer.fullName,
                source_id: data.id
            }
            console.log(dataCharge);
        try {
            culqi.charges.createCharge(dataCharge).then(respuesta=>{
                console.log(respuesta);
                res.json({msg: respuesta});
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Error processing payment'});
        }
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({error: 'Error creating token'});
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
