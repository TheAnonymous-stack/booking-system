'use client';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { fetchDataFromFB } from '@/utils/index';
import styles from './picker.module.css';

const ExpertFilter = () => {
  const [experts, setExperts] = useState([]);
  const [expertSelected, setExpertSelected] = useState('Select Expert');

  useEffect(() => {
    const data = fetchDataFromFB('experts');
    data.then((res) => {
        let arr = [];
        for (let e of res) {
            arr.push(e.name);
        }
        setExperts(arr);
    })
  },[]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded">
          {expertSelected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
        onAction={(key) => {
          setExpertSelected(key);
        
        }}
      >
      {
        experts.map((o) => <DropdownItem key={o} className={styles.option}>{o}</DropdownItem>)
      }
        
       </DropdownMenu>
     </Dropdown>
  )
}

export default ExpertFilter