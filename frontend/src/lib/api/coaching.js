import client from './client';

export const getCoachingAdvice = async () => {
    try {
        const response = await client.get('/api/coaching/advice/');
        return response.data;
    } catch (error) {
        console.error('Get Coaching Advice Error:', error);
        throw error;
    }
};
