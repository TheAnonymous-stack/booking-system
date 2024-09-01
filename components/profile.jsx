import React from 'react';
import Image from 'next/image';
import styles from './profile.module.css';

const Profile = ({ name, bio, image }) => {
  return (
    <div className={styles.container}>
      
        <Image 
            src={image}
            width={200}
            height={200}
            className='rounded-full object-cover'
        />
        <h2 className={styles.name}>{name}</h2>
        <p>{bio}</p>
    </div>
  )
}

export default Profile