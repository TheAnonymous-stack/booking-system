'use client';
import { useState, useEffect } from 'react';
import styles from './booking.module.css';
import { fetchDataFromFB, updateBookingStatus, timeIntToDuration, timeStrToInt } from '@/utils/index';
import BookingSummary from '@/components/bookingSummary';
import toast, { Toaster } from 'react-hot-toast';

const Booking = ({ loadData, isPast, userName, expert, startTime, endTime, date, notes, status='Completed' }) => {
  const [userId, setUserId] = useState(null);
  const [expertId, setExpertId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const duration  = timeIntToDuration(timeStrToInt(endTime) - timeStrToInt(startTime))
  useEffect(() => {
    const usersData = fetchDataFromFB('users');
    usersData.then((result) => {
      for (let u of result) {
        if (u.name === userName) {
          setUserId(u.id);
          break
        }
      }
    });
    const expertsData = fetchDataFromFB('experts');
    expertsData.then((result) => {
      for (let e of result) {
        if (e.name === expert) {
          setExpertId(e.id);
          break
        }
      }
    })
  },[])
  return (
    <div className={styles.container}>
      <Toaster position='top-center' reverseOrder={false}/>
        <div>
            <h3 className={styles.name}>{expert} - {date} &#40;{startTime} - {endTime}&#41;</h3>
            <p>{notes}</p>
        </div>
        {
            isPast ? 
            <p className={status === 'Completed' ? styles.completed : styles.cancelled}>{status}</p>
            : 
            <div className={styles.options}>
                <button 
                  className={styles.finish} 
                  onClick={() => {
                    updateBookingStatus(userId, expertId, date, startTime, 'Completed')
                    loadData({
                      date: date,
                      startTime: startTime,
                      endTime: endTime,
                      expert: expert,
                      notes: notes,
                      review: '',
                      status: 'Completed'
                    });
                    toast.success('Updated booking status successfully!')
                  }}>Finish</button>
                <button className={styles.cancel} onClick={() => {
                  setIsModalOpen(true);
                  }
                }>Cancel</button>
            </div>
        }
        <BookingSummary 
          isOpen={isModalOpen} 
          onConfirm={() => {
            updateBookingStatus(userId, expertId, date, startTime, 'Cancelled');
            setIsModalOpen(false);
            loadData({
              date: date,
              startTime: startTime,
              endTime: endTime,
              expert: expert,
              notes: notes,
              review: '',
              status: 'Cancelled'
            });
          }}
          onClose={() => {
            setIsModalOpen(false);
          }}
          cancelText='Back'
          confirmText='Confirm Cancellation'
          expertSelected={expert}
          startTime={startTime}
          duration={duration}
          notes={notes}
          userId={userId}
          date={date}
        />

        
        
    </div>
  )
}

export default Booking