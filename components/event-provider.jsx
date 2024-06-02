"use client"

import { createContext, useContext, useEffect, useState } from "react";

export const EventContext = createContext();

const EventContextProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    
    const checkDatesOnEvents = (events) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return events.filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= currentDate;
        });
    }

    useEffect(() => {
        let isSubscribed = true;
    
        const getAllEvent = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/events');
                if(!response.ok) {
                    throw new Error('Failed to get all event', response.status)
                }
    
                const data = await response.json();
                console.log(data)
    
                const futureEvents = checkDatesOnEvents(data)
                if (isSubscribed) {
                    setEvents(futureEvents)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    
        getAllEvent()
    
        return () => {
            isSubscribed = false; 
        }
    }, [])


    const value = {
        events,
    }

    return(
        <EventContext.Provider value={value}>
            { children }
        </EventContext.Provider>
    )

}

export default EventContextProvider;

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context)
        throw new Error(
            'useEvent must be used within an EventContextProvider'
        );
    return context;
}