import React from 'react';
import Image from 'react-graceful-image'
const heroContainer = {
    height:400,
    width: '100%',
}
const heroImg = {
    height:'100%',
    width: '100%',
    objectFit:'cover',
}
const heroText = {
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'

}
const HeroImage = ({heroImage,heroCaption}) =>{
    return (
    <>
<section class="hero-image"style={heroContainer}>
<Image src ={heroImage} alt={""} style={heroImg}/>
<section style={heroText}>
    <h1 className="hero-text">{heroCaption}</h1>
</section>
</section>
</>
)

}
export default HeroImage