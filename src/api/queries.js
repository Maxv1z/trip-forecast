import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDayWeather, getUserTrips } from './index';
import { UserAuth } from '../context/AuthContext';

export function useGetUserTrips() {
    const queryClient = useQueryClient();
    const user = UserAuth();

    useEffect(() => {
        if (user) {
            // If a user is logged in, invalidate the 'trips' query
            queryClient.invalidateQueries('trips');
        }
    }, [user]);

    return useQuery({
        queryKey: ['trips'],
        queryFn: getUserTrips,
    });
}



// export function useGetTodayWeather() {
//     const queryClient = useQueryClient();
//     const city = useContext(ActiveCityContext);
//     console.log(city);

//     useEffect(() => {
//         if (city) {
//             queryClient.invalidateQueries('todays-weather');
//         }
//     }, [city]);

//     return useQuery({
//         queryKey: ['todays-weather'],
//         queryFn: () => getDayWeather(city.cityName),
//     });
// }


