import React from 'react'
import encryptionImage from '../../images/8.jpeg'
import expression from '../../images/dairy-expression.jpg'
import a_friendly_reminder from '../../images/a_friendly_reminder.png'
import security from '../../images/security.jpg'
import AuthNav from '../commons/AuthNav';
import Footer from '../commons/Footer'
const IntroPage = () => {
    return (
        <>
        <AuthNav />
        <section className="hero-image"></section>
<main className="feature-container">
<section className="column-1"><img className="column-img"alt={expression} src={expression} /></section>
<article className="column-2">
  <div className="feature-content"><h1>Express yourself with pictures and words.</h1>
    <p>Keep a journal of your daily activities, your travel, exercise, diet, or thoughts and prayers</p></div>
</article>
</main>
<main className="feature-container">
  <section className="column-1"><img className="column-img" alt={a_friendly_reminder} src={a_friendly_reminder}/></section>
  <article className="column-2">
    <div className="feature-content"><h1>Custom Email Reminder.</h1>
      <p>Never Forget to Write! Custom email reminders help you make sure you never forget to write.</p></div>
  </article>
  </main>

  <main className="feature-container">
    <section className="column-1"><img className="column-img"alt={encryptionImage} src={encryptionImage}/></section>
    <article className="column-2">
      <div className="feature-content"><h1>Military Grade Encryption</h1>
        <p>Secure, Encrypted using the same security as banks, even we can’t see your private entries!
        </p></div>
    </article>
    </main>

    <main className="feature-container">
      <section className="column-1"><img className="column-img"alt={security} src={security}/></section>
      <article className="column-2">
        <div className="feature-content"><h1>Your Privacy First</h1>
          <p>100% Private Designed to focus on privacy, your entries are totally private by default!</p></div>
      </article>
      </main>
      <Footer />
        </>
    )
}
export default IntroPage