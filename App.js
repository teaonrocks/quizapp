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
		<View style={styles.appContainer}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Geography Quiz</Text>
				</View>
				<View style={styles.questionsContainer}>
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
				</View>
				<View style={styles.buttonContainer}>
					<Button title="Submit" onPress={handleSubmit} />
				</View>
				<StatusBar style="auto" />
			</ScrollView>
		</View>
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
			<View style={styles.questionHeader}>
				<Text style={styles.questionNumber}>Question {id}</Text>
			</View>
			<View style={styles.imageContainer}>
				<Image source={image} style={styles.image} />
			</View>
			<View style={styles.questionTextContainer}>
				<Text style={styles.questionText}>{question}</Text>
			</View>
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
	appContainer: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	container: {
		flexGrow: 1,
		flexDirection: "column",
		padding: 20,
		paddingTop: 60,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
	},
	questionsContainer: {
		flexDirection: "column",
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	quizQn: {
		flexDirection: "column",
		flex: 0,
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
		justifyContent: "flex-start",
	},
	questionHeader: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 15,
	},
	questionNumber: {
		fontSize: 16,
		fontWeight: "600",
		color: "#666",
		textTransform: "uppercase",
		letterSpacing: 1,
		textAlign: "center",
	},
	imageContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 20,
	},
	image: {
		width: 150,
		height: 150,
		maxWidth: 200,
		maxHeight: 200,
		resizeMode: "cover",
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#e0e0e0",
	},
	questionTextContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 20,
	},
	questionText: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#333",
		textAlign: "center",
		lineHeight: 24,
	},
	pickerContainer: {
		flexDirection: "row",
		width: "100%",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#fafafa",
		justifyContent: "center",
		alignItems: "center",
	},
	picker: {
		flex: 1,
		width: "100%",
		height: 50,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});
