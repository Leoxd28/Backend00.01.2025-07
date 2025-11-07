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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola desde Culqi');
});

app.post('/api/process/pay', async (req, res) => {
    const{producto} = req.body;
    await culqi.tokens.createToken({
        card_number: producto.creditcard,
        cvv: producto.cvv,
        expiration_month: producto.month,
        expiration_year: producto.year,
        email: producto.email
    }).then(data=>{
        try {
            culqi.charges.createCharge({
                amount: producto.amount,
                currency_code: 'PEN',
                email: producto.email,
                installments: producto.installments,
                description: producto.description,
                source_id: data.id
            }).then(respuesta=>{
                res.json({data: respuesta});
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
