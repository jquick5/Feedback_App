import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetch Feedback
	const fetchFeedback = async () => {
		const res = await fetch('/feedback?_sort=id&_order=desc');
		const data = await res.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// Delete Feedback
	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure?')) {
			await fetch(`/feedback/${id}`, { method: 'DELETE' });

			setFeedback(feedback.filter((i) => i.id !== id));
		}
	};

	// Add Feedback
	const addFeedback = async (newFeedback) => {
		const res = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		});

		const data = await res.json();

		setFeedback([data, ...feedback]);
	};

	// Add item to update
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	// Update Feedback Data
	const updateFeedback = async (id, updItem) => {
		const res = await fetch(`/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updItem),
		});

		const data = await res.json();
		setFeedback(feedback.map((i) => (i.id === id ? { ...i, ...data } : i)));
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
