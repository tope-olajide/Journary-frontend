import React from 'react'
import img1 from "../../images/8.jpeg";
import img2 from "../../images/security.jpg";
const ImageGallery =({selectImage})=> {

    return (
        <>
                <section className="image-gallery">
                  <main>
                    <img src={img1} alt={img1} />
                    <button onClick={() =>selectImage('https://res.cloudinary.com/temitope/image/upload/v1557074023/gcv7rbem66pj1uobhh1q.jpg')} className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img1} alt={img1} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                  <main>
                    <img src={img2} alt={img2} />
                    <button className="fit">Select</button>
                  </main>
                </section>
        </>
    )
}
export default ImageGallery