import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { checkListResultStyles } from '../styles';

const BONUS_MISSIONS = [
  { id: 'stretch', text: '스트레칭 10분', icon: 'body-outline', points: 5, completed: false },
  { id: 'tea', text: '따듯한 차 마시기', icon: 'cafe-outline', points: 2, completed: false },
  { id: 'meditate', text: '명상하기', icon: 'leaf-outline', points: 2, completed: false },
  { id: 'no_device', text: '잠들기 30분 전\n전자기기 사용 중단', icon: 'phone-portrait-outline', points: 7, completed: false },
  { id: 'bath', text: '반신욕 30분', icon: 'water-outline', points: 7, completed: false },
  { id: 'clear', text: '밤공기 마시며 생각 정리하기', icon: 'cloudy-night-outline', points: 7, completed: false },
  { id: 'eye_patch', text: '수면안대 사용하기', icon: 'eye-off-outline', points: 7, completed: false },
  { id: 'asmr', text: '백색소음(ASMR)듣기', icon: 'headset-outline', points: 7, completed: false },
];

export default function CheckList_Result({ navigation, route }) {
  const initialScore = route.params.score;

  const [score, setScore] = useState(initialScore);
  const [missions, setMissions] = useState(
    BONUS_MISSIONS.map(m => ({ ...m, completed: false }))
  );
  const [isSaved, setIsSaved] = useState(false);

  const getResultMessage = (currentScore) => {
    if (currentScore >= 55) return "최고의 수면 환경을 가지셨네요! 완벽한 밤이에요.";
    if (currentScore >= 40) return "좋은 수면 습관을 가지고 계세요. 꿀잠 주무세요!";
    if (currentScore >= 25) return "괜찮아요. 조금만 더 신경쓰면 수면의 질이 올라갈 거예요.";
    return "오늘은 푹 쉬는게 어떨까요? 컨디션 관리가 필요해 보여요.";
  };

  const handleMissionPress = (missionId) => {
    if (isSaved) {
      Alert.alert("알림", "이미 기록이 저장되어 점수를 변경할 수 없습니다.");
      return;
    }

    const newMissions = missions.map(mission => {
      if (mission.id === missionId && !mission.completed) {
        setScore(prevScore => prevScore + mission.points);
        return { ...mission, completed: true };
      }
      return mission;
    });
    setMissions(newMissions);
  };

  const handleSaveScore = async () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const newRecord = { date: dateString, score: score };

    try {
      const existingData = await AsyncStorage.getItem('allScores');
      const allScores = existingData ? JSON.parse(existingData) : [];
      const todayIndex = allScores.findIndex(record => record.date === dateString);

      if (todayIndex > -1) {
        allScores[todayIndex] = newRecord;
      } else {
        allScores.push(newRecord);
      }
      
      allScores.sort((a, b) => new Date(b.date) - new Date(a.date));
      await AsyncStorage.setItem('allScores', JSON.stringify(allScores));
      
      setIsSaved(true);
      Alert.alert("저장 완료!", "오늘의 수면 점수가 성공적으로 기록되었습니다.");

    } catch (e) {
      console.error(e);
      Alert.alert("오류", "데이터 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={checkListResultStyles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={checkListResultStyles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={checkListResultStyles.title}>수면의 질 점수</Text>
        <View style={checkListResultStyles.scoreContainer}>
            <Text style={checkListResultStyles.scoreNumber}>{score}</Text>
            <Text style={checkListResultStyles.scoreUnit}>점</Text>
        </View>
        <Text style={checkListResultStyles.message}>{getResultMessage(score)}</Text>
        
        {missions.map(mission => (
          <TouchableOpacity 
            key={mission.id} 
            style={[checkListResultStyles.missionItem, mission.completed && checkListResultStyles.missionItemCompleted]} 
            onPress={() => handleMissionPress(mission.id)} 
            disabled={mission.completed || isSaved} 
            activeOpacity={0.7}
          >
            <Ionicons name={mission.icon} size={24} color={mission.completed || isSaved ? '#888' : '#fff'} />
            <Text style={[checkListResultStyles.missionText, (mission.completed || isSaved) && checkListResultStyles.missionTextCompleted]}>
              {mission.text}
            </Text>
            <View style={checkListResultStyles.missionPointsContainer}>
              <Text style={checkListResultStyles.missionPointsText}>+{mission.points}점</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[checkListResultStyles.saveButton, isSaved && checkListResultStyles.saveButtonDisabled]}
          onPress={handleSaveScore}
          disabled={isSaved}
        >
          <Text style={checkListResultStyles.saveButtonText}>
            {isSaved ? '오늘의 기록 저장 완료!' : '오늘의 기록 저장하기'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
