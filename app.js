import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const [tokens, setTokens] = useState(3);
  const [alarmActive, setAlarmActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let timer;
    if (alarmActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && alarmActive) {
      Alert.alert("⏰ Alarm!", "Wake up!");
    }

    return () => clearInterval(timer);
  }, [alarmActive, timeLeft]);

  const startAlarm = () => {
    setTimeLeft(10);
    setAlarmActive(true);
  };

  const snooze = () => {
    if (tokens > 0) {
      setTokens(tokens - 1);
      setTimeLeft(10);
      Alert.alert("😴 Snoozed", "1 token deducted");
    } else {
      Alert.alert("🚫 No Tokens", "Buy more tokens to snooze!");
    }
  };

  const buyToken = () => {
    // Placeholder for real payment integration
    setTokens(tokens + 1);
    Alert.alert("💰 Purchased", "You bought 1 token for $1 (simulated)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snooze Coin</Text>

      <Text style={styles.text}>Tokens: {tokens}</Text>

      {alarmActive ? (
        <>
          <Text style={styles.timer}>⏳ {timeLeft}s</Text>
          <Button title="Snooze (-1 Token)" onPress={snooze} />
        </>
      ) : (
        <Button title="Start Alarm" onPress={startAlarm} />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Buy Token ($1)" onPress={buyToken} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    fontSize: 40,
    color: '#ff4444',
    marginBottom: 20,
  },
});
