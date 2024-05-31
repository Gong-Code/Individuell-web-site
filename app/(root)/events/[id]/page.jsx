"use client"

import { useAuth } from "@/components/auth-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventDetailsPage = ({ params }) => {
    const [event, setEvent] = useState(null);
    const id = params.id;
    const [isBooked, setIsBooked] = useState(false);

    const router = useRouter();

    const { user } = useAuth();

    useEffect(() => {
        let isSubscribed = true;
        const getEventById = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/events/${id}`);

                if(!response.ok) {
                    throw new Error('Failed to get event', response.status);
                }

                const data = await response.json();

                if (isSubscribed) {
                    setEvent(data);                
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        if (user && event && event.bookedUsers) {
            const checkIfBooked = () => {
                const booked = event.bookedUsers.some(bookedUser => bookedUser.id === user.uid);
                setIsBooked(booked);
            };
            checkIfBooked();
        }

        getEventById();

        return () => {
            isSubscribed = false; 
        }
    }, [id]);

    useEffect(() => {
        if (user && event) {
            const checkIfBooked = () => {
                const booked = event.bookedUsers.some(bookedUser => bookedUser.id === user.uid);
                setIsBooked(booked);
            };
            checkIfBooked();
        }
    }, [user, event]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const handleBook = async () => {
        if (!user) {
            toast.error('You must sign in to book an event');
            router.push('/sign-in')
            return;
        } 
        else if(event.bookedUsers.length >= event.numberOfSpots) {
            toast.error('This event is full');
            return;
        }
        else {
            
            try {
                const response = await fetch(`http://localhost:3000/api/events/booked`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eventId: id, id: user.uid, email: user.email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to book event');
                }

                const updatedEvent = await response.json();

                setEvent(prevState => ({
                    ...prevState,
                    ...updatedEvent,
                    bookedUsers: [
                        ...prevState.bookedUsers,
                        { id: user.uid, email: user.email },
                    ],
                }));

                setIsBooked(true); 
                toast.success('Event booked successfully');
        } catch (error) {
            toast.error('Failed to book event');
            console.error(error);
        }
        }
    };

    const handleUnbook = async () => {
        if (!user) {
            toast.error('You must sign in to unbook an event');
            router.push('/sign-in');
            return;
        }


        console.log(user)
        
        try {
            const response = await fetch(`http://localhost:3000/api/events/booked`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: id, id: user.uid, email: user.email }),
            });
            
            if (!response.ok) throw new Error('Failed to unbook event');
    
            const updatedEvent = await response.json();
            console.log('Unbooked:', updatedEvent); 

            setEvent(prevState => {
                const updatedBookedUsers = prevState.bookedUsers.filter(bookedUser => bookedUser.id !== user.uid);

                return {
                    ...prevState,
                    ...updatedEvent,
                    bookedUsers: updatedBookedUsers,
                };
            });
            
            setIsBooked(false); 
            toast.success('Event unbooked successfully');
        } catch (error) {
            toast.error('Failed to unbook event');
            console.error(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="flex flex-col">
                <div className="w-full">
                    {event.image ? (
                        <Image
                            src={event.image}
                            width={400}
                            height={400}
                            alt='event'
                            className='w-full object-cover'
                        />
                    ) : (
                    <div>No image available</div>
                )}
                </div>
                <div className="p-8 bg-slate-700">
                    <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">{event.name}</div>
                    <div className="mt-2 text-white">{event.description}</div>
                    <div className="mt-2 text-white">Location: <span className="text-amber-600">{event.location}</span></div>
                    <div className="mt-2 text-white">Date: <span className="text-amber-600">{event.date}</span></div>
                    <div className="mt-2 text-white">Available Spots: 
                        <span className="text-amber-600">
                            {
                                event && event.bookedUsers ? event.numberOfSpots - event.bookedUsers.length : event.numberOfSpots
                            }
                        </span> 
                    </div>
                    <div>
                    {isBooked ? (
                        <button 
                            className="mt-4 bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={handleUnbook}
                        >
                            Unbook
                        </button>
                    ) : (
                        <button 
                            className="mt-4 bg-emerald-600 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={handleBook}
                        >
                            Book
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default EventDetailsPage;