import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import axios from 'axios';

const db = getFirestore();

export const getUserTrips = async () => {
    try {
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error('User data not found in localStorage.');
            return [];
        }
        const user = JSON.parse(userData);
        const userId = user.uid;

        const tripCollectionRef = collection(db, 'trips');
        const userTripsQuery = query(tripCollectionRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(userTripsQuery);
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

export const getTripById = async (tripId) => {
    try {
        const tripDocRef = doc(db, 'trips', tripId);
        const tripDocSnapshot = await getDoc(tripDocRef);

        if (!tripDocSnapshot.exists()) {
            console.error('Trip document not found.');
            return null;
        }

        const tripData = tripDocSnapshot.data();
        const trip = {
            id: tripDocSnapshot.id,
            ...tripData
        };

        return trip;
    } catch (error) {
        console.error('Error getting trip by ID:', error);
        throw error;
    }
};



export const getDayWeather = async (cityName) => {
    try {
        const key = 'GJSG9X7EXWMMVWCZ6YK9Y27P3';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/today?unitGroup=metric&include=days&key=${key}&contentType=json`;

        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to retrieve weather data');
        }
    } catch (error) {
        console.error('Error getting weather for the day:', error);
        throw error;
    }
}

export const getWeekWeather = async (cityName, dateStart, dateEnd) => {
    try {
        const key = 'GJSG9X7EXWMMVWCZ6YK9Y27P3';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${dateStart}/${dateEnd}?unitGroup=metric&key=${key} `;

        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to retrieve weather data');
        }
    } catch (error) {
        console.error('Error getting weather for the day:', error);
        throw error;
    }
}


export const addTripToDb = async (dateStart, dateEnd, userId, cityName) => {
    try {
        // Add a new document with a generated id to the 'trips' collection
        const tripRef = await addDoc(collection(db, 'trips'), {
            dateStart,
            dateEnd,
            userId,
            cityName
        });
        console.log('Trip added with ID: ', tripRef.id);

        const updatedUserTrips = await getUserTrips();
        return updatedUserTrips;
    } catch (error) {
        console.error('Error adding trip to database: ', error);
        throw error;
    }
};

// export const getCitiesToChoose = async () => {

// }


