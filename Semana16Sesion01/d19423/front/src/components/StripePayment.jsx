
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Card } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const PKSTRIPE = import.meta.env.VITE_PKSTRIPE;

export default function StripePayment(){
    const[product, setProduct] = useState({
        name: "Curso IOS 2025",
        price: 199,
        productOwner: "Roberto Pineda",
        description: "Cusro de desarrollo IOS con Swift para avanzados",
        quantity: 1
        
    })

    const hacerPago = async()=>{
        console.log("Haciendo pago");
        console.log(PKSTRIPE)
        console.log(API_BASE)
        const stripe = await loadStripe(PKSTRIPE);
        const body = {product};
        const headers={
            "Content-Type": "application/json"
        }
        const response = await fetch(
            API_BASE+'/api/create-checkout-session',{
                method:"POST",
                headers:headers,
                body: JSON.stringify(body)
            }
        );
        const session = await response.json();
        console.log(session)
        console.log(session.session.url)
        window.location.href = session.session.url
        //window.location.href = session.url
        // console.log(result);
        // if(result.error){
        //     console.log(result.error)
        // }
    }
    return(
        <Card style={{width:"40rem"}}>
            <Card.Img variant='top' src='https://picsum.photos/300/150'/>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button variant='primary' onClick={hacerPago}>
                compra este curso por S./{product.price}
            </Button>
        </Card>
    )
}