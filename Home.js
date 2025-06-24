import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeStyles } from '../styles'; 


const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const displayDate = (date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};


export default function HomeScreen({ navigation }) {
  const [recordDate, setRecordDate] = useState(new Date());
  const [bedtime, setBedtime] = useState(new Date());
  const [wakeUpTime, setWakeUpTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBedtimePicker, setShowBedtimePicker] = useState(false);
  const [showWakeUpPicker, setShowWakeUpPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDate) {
      setRecordDate(selectedDate);
    }
  };

  const onBedtimeChange = (event, selectedDate) => {
    setShowBedtimePicker(false);
    if (event.type === 'set' && selectedDate) {
      setBedtime(selectedDate);
    }
  };

  const onWakeUpTimeChange = (event, selectedDate) => {
    setShowWakeUpPicker(false);
    if (event.type === 'set' && selectedDate) {
      setWakeUpTime(selectedDate);
    }
  };
  
  const handleSaveAndNavigate = async () => {
    let bed = new Date(recordDate);
    bed.setHours(bedtime.getHours()); bed.setMinutes(bedtime.getMinutes()); bed.setSeconds(0); bed.setMilliseconds(0);
    let wakeUp = new Date(recordDate);
    wakeUp.setHours(wakeUpTime.getHours()); wakeUp.setMinutes(wakeUpTime.getMinutes()); wakeUp.setSeconds(0); wakeUp.setMilliseconds(0);

    if (wakeUp.getTime() <= bed.getTime()) wakeUp.setDate(wakeUp.getDate() + 1);
    
    const diffMs = wakeUp.getTime() - bed.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const durationInHours = totalMinutes / 60;

    if (isNaN(durationInHours) || durationInHours < 0 || durationInHours >= 24) {
        Alert.alert("계산 오류", "유효한 시간을 입력해주세요.");
        return;
    }
    try {
      const recordDateString = getFormattedDate(recordDate);
      const newRecord = {
        date: recordDateString,
        duration: durationInHours,
        sleepTime: bedtime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        wakeTime: wakeUpTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        hours, minutes
      };
      const existingData = await AsyncStorage.getItem('sleep_records');
      let records = existingData ? JSON.parse(existingData) : [];
      
      const recordIndex = records.findIndex(record => record.date === recordDateString);
      if (recordIndex > -1) records[recordIndex] = newRecord;
      else records.push(newRecord);
      
      records.sort((a, b) => new Date(a.date) - new Date(b.date));
      await AsyncStorage.setItem('sleep_records', JSON.stringify(records));
      
      navigation.navigate('Info');
    } catch (e) {
      console.error("데이터 저장 실패", e);
      Alert.alert("오류", "데이터 저장에 실패했습니다.");
    }
  };
  
  const displayTime = (date) => date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.container}>
        <View style={homeStyles.backgroundCircle1} />
        <View style={homeStyles.backgroundCircle2} />

        <Text style={homeStyles.title}>수면 기록하기</Text>
        <Text style={homeStyles.subtitle}>기록하고 싶은 날짜를 선택하세요.</Text>
        
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={homeStyles.dateButton}>
            <Text style={homeStyles.dateButtonText}>{displayDate(recordDate)}</Text>
        </TouchableOpacity>

        <View style={homeStyles.timeContainer}>
            <View style={homeStyles.pickerBox}>
              <Text style={homeStyles.pickerLabel}>취침 시간</Text>
              <TouchableOpacity onPress={() => setShowBedtimePicker(true)} style={homeStyles.timeDisplayButton}>
                <Text style={homeStyles.timeDisplayText}>{displayTime(bedtime)}</Text>
              </TouchableOpacity>
            </View>
            <View style={homeStyles.pickerBox}>
              <Text style={homeStyles.pickerLabel}>기상 시각</Text>
              <TouchableOpacity onPress={() => setShowWakeUpPicker(true)} style={homeStyles.timeDisplayButton}>
                <Text style={homeStyles.timeDisplayText}>{displayTime(wakeUpTime)}</Text>
              </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity style={homeStyles.saveButton} onPress={handleSaveAndNavigate}>
          <Text style={homeStyles.saveButtonText}>작성완료</Text>
        </TouchableOpacity>
        
       
        {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={recordDate}
              mode={'date'}
              display="spinner"
              onChange={onDateChange}
            />
        )}
        {showBedtimePicker && (
           <DateTimePicker
              testID="bedtimePicker"
              value={bedtime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onBedtimeChange}
            />
        )}
         {showWakeUpPicker && (
            <DateTimePicker
              testID="wakeUpTimePicker"
              value={wakeUpTime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onWakeUpTimeChange}
            />
         )}
      </View>
    </SafeAreaView>
  );
}
