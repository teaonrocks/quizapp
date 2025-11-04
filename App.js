import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	ScrollView,
	Image,
	View,
	Button,
	ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";

export default function App() {
	const questions = [
		{
			id: 1,
			image: require("./assets/img/france.jpg"),
			question: "What is the capital of France?",
			options: ["Berlin", "London", "Paris", "Madrid"],
			correctAnswer: "Paris",
		},
		{
			id: 2,
			image: require("./assets/img/germany.jpg"),
			question: "What is the capital of Germany?",
			options: ["Rome", "London", "Paris", "Berlin"],
			correctAnswer: "Berlin",
		},
		{
			id: 3,
			image: require("./assets/img/italy.jpg"),
			question: "What is the capital of Italy?",
			options: ["Paris", "Rome", "London", "Madrid"],
			correctAnswer: "Rome",
		},
	];
	function handleSubmit() {
		// Show an Android toast with the user's score
		console.log(questionsResults);
		const score = questionsResults.filter(Boolean).length;
		ToastAndroid.show(
			`Your score: ${score} / ${questions.length}`,
			ToastAndroid.SHORT
		);
	}
	const [questionsResults, setQuestionsResults] = useState([
		false,
		false,
		false,
	]);
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Geography Quiz</Text>
			{questions.map((question) => (
				<QuizQn
					key={question.id}
					id={question.id}
					image={question.image}
					question={question.question}
					options={question.options}
					correctAnswer={question.correctAnswer}
					setQuestionsResults={setQuestionsResults}
				/>
			))}
			<Button title="Submit" onPress={handleSubmit} />
			<StatusBar style="auto" />
		</ScrollView>
	);
}

function QuizQn({
	id,
	image,
	question,
	options,
	correctAnswer,
	setQuestionsResults,
}) {
	const [selectedAnswer, setSelectedAnswer] = useState(options[0]);

	const handleAnswer = (answer) => {
		setSelectedAnswer(answer);
		if (answer === correctAnswer) {
			setQuestionsResults((prev) =>
				prev.map((result, index) => (index === id - 1 ? true : result))
			);
		} else {
			setQuestionsResults((prev) =>
				prev.map((result, index) => (index === id - 1 ? false : result))
			);
		}
	};
	// Run the handleAnswer function when the component mounts
	useEffect(() => {
		handleAnswer(selectedAnswer);
	}, []);
	return (
		<View style={styles.quizQn}>
			<Text style={styles.questionNumber}>Question {id}</Text>
			<Image source={image} style={styles.image} />
			<Text style={styles.questionText}>{question}</Text>
			<View style={styles.pickerContainer}>
				<Picker
					mode="dropdown"
					style={styles.picker}
					onValueChange={handleAnswer}
				>
					{options.map((option) => (
						<Picker.Item key={option} label={option} value={option} />
					))}
				</Picker>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#f5f5f5",
		padding: 20,
		paddingTop: 60,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
		marginBottom: 30,
	},
	quizQn: {
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
	},
	questionNumber: {
		fontSize: 16,
		fontWeight: "600",
		color: "#666",
		marginBottom: 15,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: "cover",
		borderRadius: 8,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "#e0e0e0",
	},
	questionText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#333",
		textAlign: "center",
		marginBottom: 20,
		lineHeight: 24,
	},
	pickerContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#fafafa",
	},
	picker: {
		width: "100%",
		height: 50,
	},
});
