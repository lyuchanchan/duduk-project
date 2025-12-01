import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getCoachingAdvice = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/coaching/advice/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coaching advice:', error);
        return [];
    }
};

export const submitFeedback = async (isLiked, dislikeReason = '') => {
    try {
        const response = await axios.post(`${API_BASE_URL}/coaching/feedback/`, {
            is_liked: isLiked,
            dislike_reason: dislikeReason
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};
