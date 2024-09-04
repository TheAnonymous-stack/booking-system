'use client';
import { React, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './mybookings.module.css';
import Booking from '@/components/booking';
import { fetchDataFromFB } from '@/utils/index';
import SearchBar from '@/components/searchBar';

const MyBookingsPage = () => {
  const { data: session, status } = useSession();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [userName, setUserName] = useState(null);
  const [isUpcomingFilterApplied, setIsUpcomingFilterApplied] = useState(false);
  const [isPastFilterApplied, setIsPastFilterApplied] = useState(false);

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

  useEffect(() => {
    if (userName && (!isUpcomingFilterApplied || !isPastFilterApplied)) {
      const data = fetchDataFromFB('users');
      data.then((res) => {
        for (let u of res) {
          if (u.name === userName) {
            if (!isUpcomingFilterApplied) {
              setUpcomingBookings(u.bookings.upcoming);
            }
            if (!isPastFilterApplied) {
              setPastBookings(u.bookings.past);
            }
          break; 
          }
        }
      })
    }
  },[isUpcomingFilterApplied, isPastFilterApplied])
  
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerText}>
          Upcoming Bookings
        </h1>
        <SearchBar 
          bookings={upcomingBookings}
          handleSearch={setUpcomingBookings} 
          updateFilterStatus={setIsUpcomingFilterApplied}
        />
      </div>
      
      {
        upcomingBookings.length > 0 ? 
        <div>
          {upcomingBookings.reverse().map((b, index) => <Booking key={index} loadData={loadData} isPast={false} userName={userName} expert={b.expert} startTime={b.startTime} endTime={b.endTime} date={b.date} notes={b.notes}/>)}
        </div> :
        <h3 className={styles.emptyBookings}>No upcoming bookings at the moment... </h3>
      }
      
      <div className={styles.headerContainer}>
        <h1 className={styles.headerText}>
          Past Bookings
        </h1>
        <SearchBar 
          bookings={pastBookings}
          handleSearch={setPastBookings}
          updateFilterStatus={setIsPastFilterApplied}
        />
      </div>
      
      {
        pastBookings.length > 0 ?
        <div>
          {
            pastBookings.reverse().map((b, index) => <Booking key={index} loadData={loadData} isPast={true} userName={userName} expert={b.expert} startTime={b.startTime} endTime={b.endTime} date={b.date} notes={b.notes} status={b.status}/>) 
          }
        </div>
        :
        <h3 className={styles.emptyBookings}>No past bookings at the moment...</h3>
      }
    </div>
  )
}

export default MyBookingsPage