"use client";
import React from 'react';
import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import styles from './picker.module.css';
import { timeStrToInt, intToTimeStr, timeIntToDuration } from '@/utils/index';

const DurationPicker = ({ date, startTime, appointments, handleSelect }) => {
  const [duration, setDuration] = useState("Select Duration");
  let options = ['30 minutes', '1 hour', '1 hour and 30 minutes', '2 hours'];
  let maxDuration = 200;
  const startTimeInt = timeStrToInt(startTime);
  const appointmentsSelectedDate = appointments.filter((a) => a.date === date);
  for (let a of appointmentsSelectedDate) {
    const start = timeStrToInt(a.startTime);
    if ((startTimeInt < start) && ( start < startTimeInt + maxDuration) && (start - startTimeInt < maxDuration)) {
      console.log(start, startTimeInt)
      maxDuration = start - startTimeInt;
    }
  }
  options.splice(options.indexOf(timeIntToDuration(maxDuration)) + 1);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded">
          {duration}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
        onAction={(key) => {
          setDuration(key);
          handleSelect(key);
        
        }}
      >
      {
        options.map((o) => <DropdownItem key={o} className={styles.option}>{o}</DropdownItem>)
      }
        
      </DropdownMenu>
    </Dropdown>
  )
}

export default DurationPicker