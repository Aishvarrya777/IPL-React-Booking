# IPL React Ticket Booking System

A web-based IPL ticket booking application built using **React, Vite, and Supabase**. Users can view upcoming matches, select ticket categories, choose the number of tickets, and book tickets with dynamically calculated prices.

## Features

- Display IPL matches fetched from Supabase.
- View match details, dates, venues, and available seats.
- Book multiple tickets for a match.
- Choose from three ticket categories:
  - General – ₹500 per ticket
  - Premium – ₹1,500 per ticket
  - VIP – ₹3,000 per ticket
- Automatically calculate the total ticket price.
- Update available seats after successful booking.
- Display the total number of booked tickets.
- Store booking details in the Supabase database.
- Realtime updates when match seat availability changes.
- Booking data persists after refreshing the page.

## Technologies Used

- **Frontend:** React.js
- **Build Tool:** Vite
- **Database:** Supabase
- **Database Type:** PostgreSQL
- **Styling:** CSS
- **Programming Language:** JavaScript

## Database Structure

### 1. Matches Table

| Column | Description |
|---|---|
| id | Unique match ID |
| team1 | First team |
| team2 | Second team |
| match_date | Match date |
| venue | Match venue |
| available_seats | Available tickets |

### 2. Bookings Table

| Column | Description |
|---|---|
| id | Unique booking ID |
| match_id | Associated match ID |
| customer_name | Customer name |
| tickets | Number of tickets |
| ticket_category | Selected ticket category |
| price_per_ticket | Price of one ticket |
| total_amount | Total booking amount |
| created_at | Booking timestamp |

## React Concepts Used

- Functional Components
- React Hooks (`useState`, `useEffect`)
- Props
- Event Handling
- Conditional Rendering
- Fetching data from a database
- Realtime subscriptions

## Supabase Integration

Supabase is used to:

- Fetch match details from the database.
- Insert new booking records.
- Update available seats after booking.
- Retrieve the total number of booked tickets.
- Receive realtime updates for match availability.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Aishvarrya777/IPL-React-Booking.git
   ```

2. Navigate to the project folder:

   ```bash
   cd IPL-React-Booking
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your Supabase project URL and publishable key in `src/supabase.js`.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal.

## Project Purpose

This project was developed as part of an academic assignment to understand React development, database connectivity, CRUD operations, and realtime data handling using Supabase.

---

**Developed by:** Aishvarrya  
**GitHub:** [Aishvarrya777](https://github.com/Aishvarrya777)