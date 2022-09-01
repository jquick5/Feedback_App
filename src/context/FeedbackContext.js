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

	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure?')) {
			setFeedback(feedback.filter((i) => i.id !== id));
		}
	};

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
