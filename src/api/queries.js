import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserTrips } from './index';
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



