import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

async function fetchDataFromFB(spec) {
    const querySnapshot = await getDocs(collection(db, spec));
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return data
    
}

function intToMonth(num) {
    const obj = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      };
    return obj[num];
}

function timeStrToInt(s) {
    const sliceEnd = s.length - 3;
    let minute = s.slice(-2);
    return Number(s.slice(0,sliceEnd).concat(s.slice(-2)));

}
  
function intToTimeStr(i) {
    const temp = (((i - 60) % 100 === 0) ? (i+40).toString() : i.toString());
    const sliceEnd = temp.length - 2;
    return temp.slice(0, sliceEnd).concat(':'.concat(temp.slice(-2)))
}
  
function timeIntToDuration(t) {
    if (t < 100) {
        return '30 minutes';
    } else if (t === 100) {
        return '1 hour';
    } else if ((100 < t) && (t < 200)) {
        return '1 hour and 30 minutes';
    } else {
        return '2 hours';
    }
}

function durationToTimeInt(d) {
    const obj = {
        '30 minutes': 30,
        '1 hour': 100,
        '1 hour and 30 minutes': 130,
        '2 hours': 200,
    }
    return obj[d];
}

function checkNewUser(name) {
    const data = fetchDataFromFB('users');
    data.then( async function(result) {
        let userFound = false;
        for (let u of result) {
            if (u.name === name) {
                userFound = true;
                break
            }
        }
        if (!userFound) {
            const docRef = await addDoc(collection(db, 'users'), {
                name: name,
                id: docRef.id,
                bookings: {
                    'past':[],
                    'upcoming': []
                }
            })
        }
    })
    
}

async function submitBooking(userId, userName, date, startTime, endTime, expert, expertId, notes) {
    const userRef = doc(db, 'users', userId);
    const expertRef = doc(db, 'experts', expertId);
    await updateDoc(userRef, {
        'bookings.upcoming': arrayUnion({
            date: date,
            startTime: startTime,
            expert: expert,
            endTime: endTime,
            notes: notes,
            review: ''
        })
    });
    await updateDoc(expertRef, {
        appointments: arrayUnion({
            date: date,
            startTime: startTime,
            endTime: endTime,
            name: userName,
        })
    });

}

async function updateBookingStatus(userId, expertId, date, startTime, status) {
    
    const userRef = doc(db, 'users', userId);
    const expertRef = doc(db, 'experts', expertId);
    const userSnap = await getDoc(userRef);
    const expertSnap = await getDoc(expertRef);
    const userBookingsCollection = userSnap.data().bookings.upcoming;
    const expertAppointmentsCollection = expertSnap.data().appointments;
    const userBooking = userBookingsCollection.find((b) => (b.date === date && b.startTime === startTime));
    const expertAppointment = expertAppointmentsCollection.find((a) => (a.date === date && a.startTime === startTime));
    await updateDoc(userRef, {
        'bookings.upcoming': arrayRemove(userBooking)
    });
    userBooking['status'] = status;
    await updateDoc(userRef, {
        'bookings.past': arrayUnion(userBooking)
    })
    await updateDoc(expertRef, {
        appointments: arrayRemove(expertAppointment)
    })
}  
    

export { fetchDataFromFB, 
         intToMonth, 
         checkNewUser, 
         submitBooking, 
         timeStrToInt,
         intToTimeStr,
         timeIntToDuration,
         durationToTimeInt,
         updateBookingStatus };