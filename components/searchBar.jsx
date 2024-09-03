'use client';
import {useState} from 'react';
import ExpertFilter from './expertFilter';
import MonthFilter from './monthFilter';
import styles from './searchBar.module.css';

const SearchBar = () => {
  const [yearSelected, setYearSelected] = useState(null);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Filter Options</h3>
      <div className='flex flex-row gap-5'>
        <ExpertFilter />
        <MonthFilter />
        <input className={styles.yearFilter}
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
      <button className={styles.button}>Apply</button>
      </div>
      
    </div>
  )
}

export default SearchBar