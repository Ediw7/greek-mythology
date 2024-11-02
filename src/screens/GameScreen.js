import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

const GameScreen = ({ navigation }) => {
  const questions = [
    {
      question: 'God of the sea, storms, and horses. Carries a trident.',
      options: ['Zeus', 'Poseidon', 'Hades', 'Ares'],
      answer: 'Poseidon',
      fact: 'Poseidon was one of the three most powerful Greek gods, alongside Zeus and Hades.',
    },
    {
      question: 'God of the underworld and the dead.',
      options: ['Apollo', 'Hermes', 'Hades', 'Dionysus'],
      answer: 'Hades',
      fact: 'Despite popular belief, Hades was not an evil god, but rather a strict and just ruler.',
    },
    {
      question: 'Goddess of wisdom, courage, and warfare. Often depicted with an owl.',
      options: ['Aphrodite', 'Hera', 'Athena', 'Artemis'],
      answer: 'Athena',
      fact: 'Athena sprang fully grown and armored from the forehead of Zeus.',
    },
    {
      question: 'God of war, known for his aggression and bloodthirst.',
      options: ['Apollo', 'Ares', 'Hephaestus', 'Hermes'],
      answer: 'Ares',
      fact: 'Despite being the god of war, Ares often lost battles in mythological stories.',
    },
    {
      question: 'Goddess of love and beauty, often associated with doves.',
      options: ['Athena', 'Hera', 'Artemis', 'Aphrodite'],
      answer: 'Aphrodite',
      fact: 'Aphrodite was born from the sea foam off the coast of Cyprus.',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [highScore, setHighScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [progress] = useState(new Animated.Value(1));
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setGameStarted(false);
      setGameOver(false);
      setCurrentQuestion(0);
      setScore(0);
      setTimeLeft(10);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStarted) {
      handleAnswer(null);
    }
  }, [timeLeft, gameOver, gameStarted]);

  const animateTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(slideAnim, { toValue: -50, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const moveToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
      resetProgress();
      animateTransition();
    } else {
      const finalScore = score;
      if (finalScore > highScore) setHighScore(finalScore);
      setGameOver(true);
    }
  };

  const resetProgress = () => {
    progress.setValue(1);
    Animated.timing(progress, { toValue: 0, duration: 10000, useNativeDriver: false }).start();
  };

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].answer;
    const isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
      const questionPoints = 20;
      setScore(score + questionPoints);
      Alert.alert('Benar!', `${questions[currentQuestion].fact}\n\nPoin yang didapat: ${questionPoints}`);
    } else {
      Alert.alert('Salah!', `Jawaban yang benar adalah ${correctAnswer}.\n\n${questions[currentQuestion].fact}`);
    }

    moveToNextQuestion();
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setTimeLeft(10);
    resetProgress();
    animateTransition();
  };

  const startGame = () => {
    setGameStarted(true);
    resetGame();
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Permainan Selesai!</Text>
          <Text style={styles.resultText}>Skor Akhir: {score}</Text>
          <Text style={styles.resultText}>Skor Tertinggi: {highScore}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Main Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View style={[styles.gameContainer, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
          {gameStarted ? (
            <>
              <View style={styles.header}>
                <Text style={styles.questionTitle}>Kuis Dewa Yunani</Text>
              </View>
              <View style={styles.progressBar}>
                <Animated.View style={[styles.progressFill, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
              </View>
              <Text style={styles.questionNumber}>Pertanyaan {currentQuestion + 1}/{questions.length}</Text>
              <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
              <View style={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.scoreText}>Skor: {score}</Text>
            </>
          ) : (
            <View style={styles.startScreenContainer}>
              <Text style={styles.welcomeText}>Selamat datang di kuis!</Text>
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>Mulai Permainan</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Latar belakang gelap
    padding: 16,
  },
  gameContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E0E0', // Warna teks cerah
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  questionNumber: {
    fontSize: 18,
    color: '#E0E0E0', // Warna teks cerah
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
    color: '#E0E0E0', // Warna teks cerah
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1E3D59',
    borderColor: '#2575fc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#E0E0E0', // Warna teks cerah
  },
  scoreText: {
    fontSize: 18,
    color: '#E0E0E0', // Warna teks cerah
    marginTop: 20,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0E0E0', // Warna teks cerah
  },
  resultText: {
    fontSize: 24,
    color: '#E0E0E0', // Warna teks cerah
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: '#2575fc',
    padding: 12,
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    color: '#E0E0E0', // Warna teks cerah
  },
  startScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    color: '#E0E0E0', // Warna teks cerah
    marginBottom: 20,
    textAlign: 'center'
  },
  startButton: {
    backgroundColor: '#2575fc',
    padding: 12,
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    color: '#E0E0E0', // Warna teks cerah
  },
});

export default GameScreen;
