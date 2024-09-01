'use client';
import { React, useState, useEffect } from 'react';
import styles from './home.module.css';
import Profile from '@/components/profile';
import Image from 'next/image';
import Link from 'next/link';
import Testimonial from '@/components/testimonial';
import { useSession, signIn } from 'next-auth/react';
import { fetchDataFromFB, checkNewUser } from '@/utils/index';

export default function Home() {
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState([]);
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    const testimonialsData = fetchDataFromFB('testimonials');
    testimonialsData.then(function(result) {
      setTestimonials(result)
    });
    const expertsData = fetchDataFromFB('experts');
    expertsData.then(function(result) {
      setExperts(result)
    });
  },[]);

  useEffect(() => {
    if (session) {
      checkNewUser(session.user.name);
    }
  },[session]);

  if (!experts || !testimonials) return <div>Loading...</div>

  return (
    <div className={styles.container}>
    
      <div className={styles.imageContainer}>
        <Image 
          src={`/assets/homepage_background.png`}
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: '100%', height: '400px' }}
        />
        <h1 className={styles.headerText}>Welcome to Booking System!</h1>
        <p className={styles.description}>- A simple and convenient platform to manage your scheduling hassle with the experts -</p>
        {
          session ? 
          <Link href='/book-appointment'>
            <button className={styles.getStarted}>
              Get Started Now!
            </button>
          </Link> :
          <button className={styles.getStarted} onClick={() => signIn('google')}>
              Get Started Now!
          </button>
        }
        
         
          
      </div>

      <h1 className={styles.expertHeader}>Meet Our Experts!</h1>
      <div className={styles.expertDisplay}>
        {
          experts.map((e) => <Profile name={e.name} bio={e.bio} image={e.image}/>)
        }
      </div>

      <div className={styles.testimonialContainer}>
        <div className={styles.testimonialText}>
          Testimonials
        </div>
        <div className={styles.testimonialDisplay}>
          {
            testimonials.map((t) => <Testimonial name={t.name} date={t.date} content={t.content}/>)
          }
        </div>
      </div>
    </div>
  );
}
