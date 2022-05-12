
import React from 'react'
import Navbar from "../../Components/Navbar";


export const About = () => {
  return (
<div>

    <Navbar />
    <div style = {{textAlign: 'center', fontSize: 50}}> FAQ</div>
    <h3>What is ToyExchange App? </h3>
    <p>Toy Exchange is an app that allows you to exchange toys with other people either by buying it or by having it for free. Is up to the user itself to decide which of the two options wants to go on with. </p>
    <h3>What is its purpose? </h3>
   <p>The purpose with this service is to cut down the toy consumption. On the other hand, it is safe to say that by giving away toys you help  other people who can't afford them.</p>

   <h3>How does it work?</h3>
   <p>Simple. You just need to sign up with a valid email and then follow the steps regarding registration. Ater that you will be able to see the marketplace and you can post an "announcement" or you can buy for a certain amount of money, give away toys or buy it for free.</p>

   <h3>How do you use my data? </h3>
    <p>All the information shared are protected under the Europian Law of GDPR and by Swedish laws.</p>
     </div>
  )
}

export default About
