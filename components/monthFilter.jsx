'use client';
import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import styles from './picker.module.css';

const MonthFilter = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [monthSelected, setMonthSelected] = useState('Select Month');
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded">
          {monthSelected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
        onAction={(key) => {
          setMonthSelected(key);
        
        }}
      >
      {
        months.map((o) => <DropdownItem key={o} className={styles.option}>{o}</DropdownItem>)
      }
        
       </DropdownMenu>
     </Dropdown>
  )
}

export default MonthFilter