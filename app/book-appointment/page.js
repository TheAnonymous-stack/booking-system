'use client';
import { React, useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './bookappointment.module.css';
import { Calendar } from '@nextui-org/calendar';
import { today, getLocalTimeZone } from '@internationalized/date';
import Availabilities from '@/components/availabilities';
import DurationPicker from '@/components/durationPicker';
import { fetchDataFromFB, intToMonth, submitBooking, durationToTimeInt, timeStrToInt, intToTimeStr } from '@/utils/index';
import BookingSummary from '@/components/bookingSummary';
import TextareaAutosize from 'react-textarea-autosize';

const BookAppointmentPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [duration, setDuration] = useState(null);
  const [expertSelected, setExpertSelected] = useState(null);
  const [experts, setExperts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState(null);
  const [expertId, setExpertId] = useState(null);

  function handleConfirm(userId, userName, date, startTime, duration, expertSelected, expertId, notes) {
      const endTime = intToTimeStr(timeStrToInt(startTime) + durationToTimeInt(duration));
      submitBooking(userId, userName, date, startTime, endTime, expertSelected, expertId, notes);
      setIsModalOpen(false);
  }

  useEffect(() => {
    const expertsData = fetchDataFromFB('experts');
    expertsData.then(function(result) {
      setExperts(result)
    });
  },[]);

  useEffect(() => {
    const usersData = fetchDataFromFB('users');
      usersData.then(function(result) {
      for (let u of result) {
        if (u.name === session.user.name) {
          setUserId(u.id);
          break
        }
      }
  })
},[status]);
 

  useEffect(() => {
    if (![date, duration, expertSelected, startTime].some(function(e) { return e === null})) {
      setIsFilled(true);
    }
  },[date, duration, expertSelected, startTime]);

 
  function handleSelectTimeSlot (name, timeslot) {
    setExpertSelected(name);
    setExpertId(experts.find((e) => e.name === name).id);
    setStartTime(timeslot);
    if (!isStartTimeSelected) {
      setIsStartTimeSelected(true);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <h2 className={styles.header}>Select Your Date Below</h2>
        <Calendar 
          showMonthAndYearPickers
          minValue={today(getLocalTimeZone())}
          onChange={(value) => {
            setDate(`${intToMonth(value.month)} ${value.day} ${value.year}`);
            setIsDateSelected(true);
          }
          
          }
        />
        {
          isStartTimeSelected && 
            <div className={styles.detailsContainer}>
              <div className={styles.durationContainer}>
                <h3 className={styles.durationText}>Duration: </h3>
                <DurationPicker date={date} startTime={startTime} appointments={expertSelected ? experts.find((e) => e.name === expertSelected).appointments : []} handleSelect={(e) => setDuration(e)}/>
              </div>
              <TextareaAutosize 
                className={styles.notes} 
                value={notes} 
                placeholder="Notes..." 
                onChange={e => setNotes(e.target.value)}/>
              
            </div>

        }
        

        
        <button 
          className={styles.summary} 
          onClick={() => {
            if (!isFilled) {
              alert('Please select an option for all the required fields!')
            } else {
              setIsModalOpen(true);
            }
        }}>View Booking Summary</button>
        { (session && isFilled) && 
          <BookingSummary 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={() => {
              handleConfirm(userId, session.user.name, date, startTime, duration, expertSelected, expertId, notes);
              router.push('/my-bookings');
            }}
            cancelText='Edit Info'
            confirmText='Confirm'
            expertSelected={expertSelected} 
            startTime={startTime} 
            duration={duration} 
            date={date} 
            notes={notes}
            userId={userId}
          />
        }
          
         
      </div>

      <div className={styles.availabilitiesContainer}>
        <h2 className={styles.availabilitiesHeader}>Our Expert's Availabilities</h2>
        <div className={styles.displayAvailabilities}>
          {
            experts.map((e) => <Availabilities key={e.name} name={e.name} image={e.image} appointments={e.appointments} isDateSelected={isDateSelected} date={date} handleSelectTimeSlot={handleSelectTimeSlot} expertSelected={expertSelected} startTime={startTime}/>)
          }
        </div>
      </div>

    </div>
  )
}

export default BookAppointmentPage