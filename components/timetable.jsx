import React from 'react';
import styles from './timetable.module.css';

const Timetable = ({ name, appointments, date, handleSelectTimeSlot, expertSelected, startTime}) => {
  const timeslots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30','13:00','13:30', '14:00','14:30' ,'15:00', '15:30','16:00', '16:30'];
  const appointmentsSameDate = appointments.filter(a => a.date === date);
  if (appointmentsSameDate.length > 0) {
    for (let a of appointmentsSameDate) {
      let indexStart = timeslots.indexOf(a.startTime);
      let indexEnd = timeslots.indexOf(a.endTime);
      if (indexEnd === -1) {
        indexEnd = indexStart + 1;
      }
      timeslots.splice(indexStart, indexEnd - indexStart);
    }
  }
  return (
    <div className={styles.container}>
        {
            timeslots.map((t) => {
              return (
                <button onClick={() => handleSelectTimeSlot(name, t)} className={(expertSelected === name && t === startTime) ? styles.timeslotSelected : styles.timeslot}>
                  {t}
                </button> 
              )
              
            }
            
            
            )
        }
    </div>
  )
}

export default Timetable