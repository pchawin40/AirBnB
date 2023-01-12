// import react
import { useState, useContext, createContext } from 'react';

// booking context
export const BookingContext = createContext();

// use context for booking
export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({ children }) {
  // state for context
  const [bookingModal, setBookingModal] = useState(false);

  // Booking Provider
  return (
    <>
      <BookingContext.Provider
        value={{
          bookingModal, setBookingModal
        }}
      >
        {children}
      </BookingContext.Provider>
    </>
  );
}
