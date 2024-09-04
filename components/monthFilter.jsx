'use client';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import styles from './picker.module.css';

const MonthFilter = ({ isFilterReset, handleSelect }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [monthSelected, setMonthSelected] = useState('Select Month');
  useEffect(() => {
    if (isFilterReset) {
      setMonthSelected('Select Month');
    }
  },[isFilterReset]);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" isDisabled={isFilterReset ? false : true}>
          {monthSelected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={isFilterReset ? [] : months} 
        aria-label="Action event example" 
        onAction={(key) => {
          setMonthSelected(key);
          handleSelect(key);
        
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