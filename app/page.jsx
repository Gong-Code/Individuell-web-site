"use client"

import { useEffect, useState } from 'react';
import { useEvent } from "@/components/event-provider";
import { EventCard } from "@/components/eventCard";

const LandingPage = () => {

  const { events } = useEvent();

  const [sortEvent, setSortEvent] = useState(events)

  useEffect(() => {
    setSortEvent(events);
  }, [events]);

  const sortByDate = () => {
    const sortEvent = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    setSortEvent(sortEvent);
  };

  const sortByLocation = () => {
    const sortEvent = [...events].sort((a, b) => a.location.localeCompare(b.location));
    setSortEvent(sortEvent);
  };

  return(
    <div>
        <div className='flex flex-col py-12 md:py-28 px-6 md:px-16 lg:px-36 justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-6xl font-bold">Welcome to EVENT BASE</h1>
                <p className="text-lg mt-10 text-muted-foreground">View upcoming events and participate</p>
                <div className="flex space-x-2 mt-2">
                  <button onClick={sortByDate} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Sort by Date
                  </button>
                  <button onClick={sortByLocation} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Sort by Location
                  </button>
                </div>
            </div>
            <h3 className='flex mt-16 justify-center items-center'>
                Check out the current events!
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-2'>
              {sortEvent && sortEvent.map(_event => {
                return (
                <EventCard 
                  key={_event.id}
                  name={_event.name}
                  image={_event.image}
                  location={_event.location}
                  date={_event.date}
                  numberOfSpots={_event.numberOfSpots}
                  eventId={_event.id}
                  bookedUsers={_event.bookedUsers}
                />
              ) 
              })}
            </div>
        </div>
    </div>
  )
};

export default LandingPage