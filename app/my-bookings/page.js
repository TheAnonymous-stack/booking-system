'use client';
import { React, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './mybookings.module.css';
import Booking from '@/components/booking';
import { fetchDataFromFB } from '@/utils/index';

const MyBookingsPage = () => {
  const { data: session, status } = useSession();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [userName, setUserName] = useState(null);


  function loadData(booking) {
  setUpcomingBookings(upcomingBookings.filter((b) => (b.date !== booking.date || b.startTime !== booking.startTime || b.expert !== booking.expert)));
  setPastBookings([...pastBookings, booking]);
}
  function getData() {
    const myBookings = fetchDataFromFB('users');
    myBookings.then(function(result) {
    for (let u of result) {
      if (u.name === session.user.name) {
        setUpcomingBookings(u.bookings.upcoming);
        setPastBookings(u.bookings.past);
        setUserName(u.name);
        }
      }
    });
  }

  useEffect(() => {
    getData();
  },[status]);

  useEffect(() => {
    getData();
  },[]);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Upcoming Bookings
      </h1>
      {
        upcomingBookings.length > 0 ? 
        <div>
          {upcomingBookings.map((b, index) => <Booking key={index} loadData={loadData} isPast={false} userName={userName} expert={b.expert} startTime={b.startTime} endTime={b.endTime} date={b.date} notes={b.notes}/>)}
        </div> :
        <h3 className={styles.emptyBookings}>No upcoming bookings at the moment... </h3>
      }
      
      <h1 className={styles.header}>
        Past Bookings
      </h1>
      {
        pastBookings.length > 0 ?
        <div>
          {
            pastBookings.map((b, index) => <Booking key={index} loadData={loadData} isPast={true} userName={userName} expert={b.expert} startTime={b.startTime} endTime={b.endTime} date={b.date} notes={b.notes} status={b.status}/>) 
          }
        </div>
        :
        <h3 className={styles.emptyBookings}>No past bookings at the moment...</h3>
      }
    </div>
  )
}

export default MyBookingsPage