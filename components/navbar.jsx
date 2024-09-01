"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './navbar.module.css';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <Link href="/" className={styles.navbarText}>Home</Link>
        {
          session && 
          <div className={styles.categorySubContainer}>
            <Link href="/book-appointment" className={styles.navbarText}>Book Appointment</Link>
            <Link href="/my-bookings" className={styles.navbarText}>My Bookings</Link>
          </div>
        }
        
      </div>

      <div>
        {
          session ? 
          <div className={styles.userContainer}>
            <Image 
            src={session.user.image}
            alt="user logo"
            height="40"
            width="40"
            className="rounded-full object-cover"

          />
          <button className={styles.signOptionsButton} onClick={ async () => signOut({ callbackUrl: '/', redirect: true })}>Sign Out</button> 
          </div>
          : 
          <div className={styles.userContainer}>
            <Image 
              src={`/assets/grey_account_img.png`}
              alt="user logo"
              height="40"
              width="40"
              className="rounded-full object-cover"
            />
            <button className={styles.signOptionsButton} onClick={() => signIn('google')}>Sign In</button>
          </div>
        }
      </div>  
        
        
        
    </div>
  )
}

export default Navbar