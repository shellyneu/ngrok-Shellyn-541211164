import React, { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QuizItem = ({ item, onPress, clickedOptions }) => (
  <View style={styles.questionContainer}>
    <Text style={styles.questionText}>{item.quiz}</Text>
    <TouchableOpacity
      onPress={() => onPress(item.id, "a")}
      style={[
        styles.optionButton,
        clickedOptions[item.id] === "a" && styles.clickedOption,
      ]}
    >
      <Text style={styles.optionText}>a. {item.a}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item.id, "b")}
      style={[
        styles.optionButton,
        clickedOptions[item.id] === "b" && styles.clickedOption,
      ]}
    >
      <Text style={styles.optionText}>b. {item.b}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item.id, "c")}
      style={[
        styles.optionButton,
        clickedOptions[item.id] === "c" && styles.clickedOption,
      ]}
    >
      <Text style={styles.optionText}>c. {item.c}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item.id, "d")}
      style={[
        styles.optionButton,
        clickedOptions[item.id] === "d" && styles.clickedOption,
      ]}
    >
      <Text style={styles.optionText}>d. {item.d}</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});

  const getQuiz = async () => {
    try {
      const response = await fetch(
        "https://8689-182-2-41-142.ngrok-free.app/api/quizzes/"
      );
      const json = await response.json();
      setData(json.dataQuiz);
      const initialAnswers = {};
      const initialClickedOptions = {};
      json.dataQuiz.forEach((item) => {
        initialAnswers[item.id] = null;
        initialClickedOptions[item.id] = null;
      });
      setSelectedAnswers(initialAnswers);
      setClickedOptions(initialClickedOptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    setClickedOptions((prevClickedOptions) => ({
      ...prevClickedOptions,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    Object.keys(selectedAnswers).forEach((questionId) => {
      const selectedOption = selectedAnswers[questionId];
      const question = data.find((item) => item.id === parseInt(questionId));
      if (question && question.key === selectedOption) {
        correctCount++;
      }
    });

    setCorrectAnswers(correctCount);
    Alert.alert(
      "Quiz Selesai",
      `Anda menjawab ${correctCount} pertanyaan dengan benar dari total ${data.length} pertanyaan.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <QuizItem
                item={item}
                onPress={handleAnswer}
                clickedOptions={clickedOptions}
              />
            )}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4285f4",
  },
  loadingIndicator: {
    marginTop: 50,
  },
  questionContainer: {
    backgroundColor: "#cfd8dc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1a237e",
  },
  optionButton: {
    backgroundColor: "#90a4ae",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: "#1a237e",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#64b5f6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  clickedOption: {
    backgroundColor: "#2ecc71",
  },
});

export default App;
