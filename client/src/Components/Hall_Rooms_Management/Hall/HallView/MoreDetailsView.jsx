
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import card from './card.css';
import StripeCheckout from "react-stripe-checkout";

import Navbar from '../../../Navbar/RoomNavbar';

function Halls () {

    const [hall, setHall]= useState('');
    const params = useParams();
    const [ amount, setAmount ] = useState(0);
  



     const getHallData = () => {
        axios.get(`http://localhost:8345/hall/gethall/${params.id}`)
         .then((res) => {
            console.log(res.data);
            setHall(res.data);

         })
        }

         useEffect(() => {
              getHallData();
         }, []);
     

         const handleToken = (token) => {
            fetch("/payment/donate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token, amount }),
            })
            .then(res => res.json())
            .then(_ => {
              window.alert("Transaction Successful.");
              console.log("Transaction Successful.");
            }).catch(_ => window.alert("Transaction Failed."))
          }
        
          const handleAmountChange = (e) => {
            const value = e.target.value;
            setAmount(value);
          };

        return (
            <div>
            <Navbar/>
            <br/>
            <div className="cont">
            <div className="container mt-12">
                
                   <div class="mmm">
                        
                            <div class="col-md">
                               
                                <img src={hall.hallImage} class="img-fluid rounded-start" alt={hall.hallType}/>
                            </div>
                            <div class="col-md-24">
                                <div class="card-body px-5">
                                    <h3 class="card-title">{hall.hallType}</h3>
                                    <hr />

                                    <h6 class="text-dark">Hall Name</h6>
                                    <h6 class="text-secondary">{hall.name}</h6>

                                    <h6 class="text-dark">Number of Guest :</h6>
                                    <h6 class="text-secondary">{hall.Guest}</h6>

                                 

                                    <h6 class="text-dark">Description :</h6>
                                    <h6 class="text-secondary">{hall.description}</h6>

                                    <h3 class="text-danger text-end">RS: {hall.price} /-</h3>

                                    <div class="">
                            {/* <button type="button" class="submit" >Rent</button> */}
                          </div>
                          <StripeCheckout
                                className = "submit"
                           
                            stripeKey={process.env.REACT_APP_STRIPE_KEY || "pk_test_51Kx0rgIU9jSTt3OCJMP7GDgMje3tFcR8lA1gwHyeakh17PGmMdUAc50PFkfNwqL1NXJ5i14CZj99nG78OWFTG1FP00cRCW7t0m"}
                            token={handleToken}
                            name=""
                            panelLabel={`Donate`}
                            currency="USD"
                            amount={amount * 100}
                        >
                            
                        </StripeCheckout>
          

                                </div>
                            </div>
                        </div>
                    </div> 
              
            </div>
            </div>
        );
    }

export default Halls;