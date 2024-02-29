import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserTrips } from './index';
import { useUserAuth } from '../context/AuthContext';

export function useGetUserTrips() {
    const queryClient = useQueryClient();
    const user = useUserAuth();

    useEffect(() => {
        if (user) {
            // If a user is logged in, invalidate the 'trips' to do first loading
            queryClient.invalidateQueries('trips');
        }
    }, [user]);

    return useQuery({
        queryKey: ['trips'],
        queryFn: getUserTrips,
    });
}



