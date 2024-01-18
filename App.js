import React, { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QuizItem = ({ item, onPress }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 18, marginBottom: 10 }}>{item.quiz}</Text>
    <TouchableOpacity
      onPress={() => onPress(item, "a")}
      style={styles.optionButton}
    >
      <Text>a. {item.a}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item, "b")}
      style={styles.optionButton}
    >
      <Text>b. {item.b}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item, "c")}
      style={styles.optionButton}
    >
      <Text>c. {item.c}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(item, "d")}
      style={styles.optionButton}
    >
      <Text>d. {item.d}</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getQuiz = async () => {
    try {
      const response = await fetch(
        "https://8689-182-2-41-142.ngrok-free.app/api/quizzes/"
      );
      const json = await response.json();
      setData(json.dataQuiz);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleAnswer = (question, selectedOption) => {
    if (question.key === selectedOption) {
      Alert.alert("Jawaban Benar!", "Selamat, jawaban Anda benar!");
    } else {
      Alert.alert(
        "Jawaban Salah!",
        "Maaf, jawaban Anda salah. Silakan coba lagi!"
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <QuizItem item={item} onPress={handleAnswer} />
          )}
        />
      )}
    </View>
  );
};

const styles = {
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
};

export default App;
