
## Project Overview

This is a web app that serves as a booking tool between small businesses and their clients. It offers a straightforward platform for scheduling and managing appointments. The UI/UX design leans towards a minimalistic and simple aesthetic. Users can explore the functionalities of the web upon signing in with their Google account. In addition to the availabilities of the experts being updated in real time, users can see immediate status change of a booking when they finish or cancel one. There is also a search bar where users are able to filter their bookings to be displayed based on the month, year, and the expert of choice. 

## Technology Stack

- NextJS
- NextAuth
- Google Cloud
- Google Firestore Database
- Github
- Vercel

## Web App Usage Instructions

- Sign in with a Google Account
- Navigate to "Book Appointment" tab on Navigation Bar or press "Get Started!" button on Home Page
- Select a date on the calendar
- Select a timeslot from the availabilities of the experts
- Select a duration of choice for the appointment (ranging from 30 minutes to 2 hours depending on the selected expert's availabilities)
- View Booking Summary then hit 'Confirm' to schedule the booking or 'Edit Info' to make changes to the booking
- View upcoming and past bookings on 'My Bookings' page
- Update status of upcoming bookings as desired

## Repo Clone Usage Instructions

- Users must generate their own OAuth IDs for Google Authentication
- Users must create their own Firestore database and update the Firebase Configurations
