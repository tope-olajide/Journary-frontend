import React from 'react'
import MainNav from '../commons/MainNavigationBar'
import encryptionImage from '../../images/8.jpeg'
import expression from '../../images/dairy-expression.jpg'
import a_friendly_reminder from '../../images/a_friendly_reminder.png'
import security from '../../images/security.jpg'
import Image from 'react-graceful-image'
const EntriesView = ({title, entry_image_url}) => {
    return (
        <>
{/* <MainNav />
<section class="hero-image"></section> */}
    
      <section class="entry">
      <Image className="column-img"alt={entry_image_url} src={entry_image_url} />
        <div class="entry-title">
          <h1>{title}</h1>
        </div>
      </section>
    
        </>
    )
}
export default EntriesView