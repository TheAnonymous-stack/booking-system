'use client';
import {useState, useEffect} from 'react';
import ExpertFilter from './expertFilter';
import MonthFilter from './monthFilter';
import { fetchDataFromFB } from '@/utils/index';
import styles from './searchBar.module.css';

const SearchBar = ({ bookings, handleSearch, updateFilterStatus }) => {
  const [yearSelected, setYearSelected] = useState('');
  const [expertSelected, setExpertSelected] = useState(null);
  const [monthSelected, setMonthSelected] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);


  useEffect(() => {
    if (isFilterApplied) {
      const data = bookings.filter((b) => (yearSelected.length > 0 ? b.date.split(' ')[2] === yearSelected : true) && (expertSelected ? b.expert === expertSelected : true) && (monthSelected ? b.date.split(' ')[0] === monthSelected : true));
      handleSearch(data);
      updateFilterStatus(true);
    } else {
      setExpertSelected(null);
      setMonthSelected(null);
      setYearSelected('');
      updateFilterStatus(false);

    }
  },[isFilterApplied])
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Filter Options</h3>
      <div className='flex flex-row gap-2'>
        <ExpertFilter isFilterReset={!isFilterApplied} handleSelect={setExpertSelected}/>
        <MonthFilter isFilterReset={!isFilterApplied} handleSelect={setMonthSelected}/>
        <input
          disabled={isFilterApplied ? true : false}
          className={isFilterApplied ? `${styles.yearFilter} ${styles.disabledYearFilter}` : `${styles.yearFilter}`}
          placeholder='Type in a year...'
          value={yearSelected} 
          onChange={(e) => setYearSelected(e.target.value)}
          onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }
          }
        
        />
      <button 
        className={styles.button} 
        onClick={() => {
          if (!expertSelected && !monthSelected && yearSelected.length === 0) {
            alert('Please specify filter options!')
          } else {
            setIsFilterApplied(!isFilterApplied);
          }

        }
        }>{isFilterApplied ? 'Reset' : 'Apply'}</button>
      </div>
      
    </div>
  )
}

export default SearchBar