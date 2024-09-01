import styles from './bookingSummary.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const BookingSummary = ({ isOpen, onConfirm, onClose, cancelText, confirmText, expertSelected, startTime, duration, date, notes, userId}) => {
  if (!isOpen || !userId) return null;
  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <h2 className={styles.header}> Review Your Booking</h2>
        <label className={styles.label}>Date</label>
        <input className={styles.input} type='text' readOnly value={date}/>
        <label className={styles.label}>Expert</label>
        <input className={styles.input} type='text' readOnly value={expertSelected}/>
        <label className={styles.label}>Start Time</label>
        <input className={styles.input} type='text' readOnly value={startTime}/>
        <label className={styles.label}>Duration</label>
        <input className={styles.input} type='text' readOnly value={duration}/>
        <label className={styles.label}>Notes</label>
        <textarea className={styles.notes} value={notes} readOnly/>

        <div className={styles.optionDisplay}>
          <button className={styles.cancel} onClick={onClose}>{cancelText}</button>
          <button className={styles.confirm} onClick={onConfirm}>{confirmText}</button>
        </div>
        
      </div>
    </div>
  )
}

export default BookingSummary