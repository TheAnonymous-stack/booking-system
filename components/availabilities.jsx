import React from 'react';
import Image from 'next/image';
import styles from './availabilities.module.css';
import Timetable from './timetable';

const Availabilities = ({name, image, appointments, isDateSelected, date, handleSelectTimeSlot, expertSelected, startTime}) => {
  return (
    <div className={styles.container}>
        <Image 
            src={image}
            alt="expert photo"
            width="100"
            height="100"
            className="rounded-full object-cover"
        />
        <p className={styles.name}>{name}</p>
        {
          isDateSelected ? <Timetable name={name} appointments={appointments} date={date} handleSelectTimeSlot={handleSelectTimeSlot} expertSelected={expertSelected} startTime={startTime}/> : <p>Select a Date to View Availabilities...</p>
        }
        
        
        
    </div>
  )
}

export default Availabilities