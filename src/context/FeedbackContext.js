import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: 'This item is from context 1',
			rating: 8,
		},
		{
			id: 2,
			text: 'This item is from context 2',
			rating: 7,
		},
		{
			id: 3,
			text: 'This item is from context 3',
			rating: 10,
		},
	]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	// Delete Feedback
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure?')) {
			setFeedback(feedback.filter((i) => i.id !== id));
		}
	};

	// Add Feedback
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	// Add item to update
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	// Update Feedback Data
	const updateFeedback = (id, updItem) => {
		setFeedback(feedback.map((i) => (i.id === id ? { ...i, ...updItem } : i)));
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
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
