import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Checkbox from 'expo-checkbox';

import { checkListStyles } from '../styles';

const CHECKLIST_DATA = [
  { id: 1, label: '오늘 낮잠을 주무셨나요?', score: 5, checked: false },
  { id: 2, label: '잠자기 전, 따뜻한 물로 샤워했나요?', score: 5, checked: false },
  { id: 3, label: '30분 이상 운동했나요?', score: 5, checked: false },
  { id: 4, label: '주위가 조용하고 어두운가요?', score: 5, checked: false },
  { id: 5, label: '간단한 스트레칭을 했나요?', score: 5, checked: false },
  { id: 6, label: '침실의 온도가 적당한가요?', score: 5, checked: false },
  { id: 7, label: '야식을 먹었나요?', score: -5, checked: false },
  { id: 8, label: '햇빛을 30분 이상 쬐었나요?', score: 5, checked: false },
];

export default function CheckList({ navigation }) {
  const [checklist, setChecklist] = useState(CHECKLIST_DATA);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const score = checklist
      .filter(item => item.checked)
      .reduce((sum, item) => sum + item.score, 0);
    setTotalScore(score);
  }, [checklist]);

  const handleCheckboxChange = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleComplete = () => {
    navigation.navigate('CheckList_Loading', { score: totalScore });
  };

  return (
    <View style={checkListStyles.screen}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={checkListStyles.safeArea}>
        <View style={checkListStyles.card}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                <Text style={checkListStyles.cardTitle}>수면의 질 예측 체크리스트</Text>
                <Text style={checkListStyles.cardSubtitle}>작성된 체크리스트를 기반으로 수면의 질을 예측할 수 있어요.</Text>

                {checklist.map((item, index) => (
                    <View key={item.id}>
                      <TouchableOpacity 
                          style={checkListStyles.checklistItem} 
                          onPress={() => handleCheckboxChange(item.id)}
                          activeOpacity={0.7}
                      >
                          <Checkbox
                              style={checkListStyles.checkbox}
                              value={item.checked}
                              onValueChange={() => handleCheckboxChange(item.id)}
                              color={item.checked ? '#8A7FBE' : '#7D7992'}
                          />
                          <Text style={checkListStyles.checkboxLabel}>{item.label}</Text>
                      </TouchableOpacity>
                      {index < checklist.length - 1 && <View style={checkListStyles.divider} />}
                    </View>
                ))}
                
                <TouchableOpacity 
                  style={checkListStyles.submitButton} 
                  activeOpacity={0.8}
                  onPress={handleComplete}
                >
                    <Text style={checkListStyles.submitButtonText}>작성 완료</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}