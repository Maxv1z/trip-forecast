import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const db = getFirestore();

export const getUserTrips = async () => {
    try {
        // Check if user data is available in localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error('User data not found in localStorage.');
            return [];
        }
        const user = JSON.parse(userData);
        const userId = user.uid;

        // Create a reference to the 'trips' collection in Firestore
        const tripCollectionRef = collection(db, 'trips');
        // Create a query to filter trips by userId
        const userTripsQuery = query(tripCollectionRef, where('userId', '==', userId));
        // Get the documents that match the query
        const querySnapshot = await getDocs(userTripsQuery);
        // Map the query snapshot to extract data
        const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('trips from index.js', trips);
        return [...trips];
    } catch (error) {
        console.error('Error getting own cities from database:', error);
        throw error;
    }
};



// export const getCitiesToChoose = async () => {

// }


// export const addCityToDb = async () => {

// }

// export const getWeekWeather = async () => {

// }
// export const getDayWeather = async () => {

// }