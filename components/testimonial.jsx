import React from 'react';
import styles from './testimonial.module.css';

const Testimonial = ({ name, date, content }) => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.reviewerHeader}>{name}</h2>
            <h2 className={styles.reviewerHeader}>{date}</h2>
        </div>
        <p>{content}</p>
    </div>
  )
}

export default Testimonial