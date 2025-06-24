import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,SafeAreaView,Dimensions,TouchableOpacity,ScrollView,} from 'react-native';
import {Svg,Rect,Text as SvgText,G,Polyline,Circle,} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { infoStyles } from '../styles';

const { width } = Dimensions.get('window');

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekRange = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(targetDate);
  monday.setDate(targetDate.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return { start: monday, end: sunday };
};

export default function InfoScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState([]);
  const [weekRange, setWeekRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [averageSleep, setAverageSleep] = useState({ hours: 0, minutes: 0 });
  const [selectedDayData, setSelectedDayData] = useState(null);

  const isFocused = useIsFocused();


  //JSON 예시 파일 보여주는거 여기
  //JSON 예시 파일 보여주는거 여기
  //JSON 예시 파일 보여주는거 여기
  const loadData = useCallback(async (date) => {
    try {
      const sleepRecordsJson = await AsyncStorage.getItem('sleep_records');
      console.log('1.서랍 꺼낸 직후');
      console.log(sleepRecordsJson);
      const allSleepRecords = sleepRecordsJson
        ? JSON.parse(sleepRecordsJson)
        : [];


      const qualityScoresJson = await AsyncStorage.getItem('allScores');
      const allQualityScores = qualityScoresJson
        ? JSON.parse(qualityScoresJson)
        : [];

      const { start, end } = getWeekRange(date);
      setWeekRange({ start, end });

      const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
      const currentWeekData = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        const dateString = getFormattedDate(day);

        const sleepRecord = allSleepRecords.find((r) => r.date === dateString);
        const scoreRecord = allQualityScores.find((s) => s.date === dateString);

        currentWeekData.push({
          date: dateString,
          dayLabel: dayLabels[day.getDay()],
          duration: sleepRecord ? sleepRecord.duration : 0,
          score: scoreRecord ? scoreRecord.score : null,
          sleepTime: sleepRecord ? sleepRecord.sleepTime : null,
          wakeTime: sleepRecord ? sleepRecord.wakeTime : null,
        });
      }
      setWeeklyData(currentWeekData);
      setSelectedDayData(null);

      const recordedSleep = currentWeekData.filter((d) => d.duration > 0);
      if (recordedSleep.length > 0) {
        const totalDuration = recordedSleep.reduce(
          (acc, cur) => acc + cur.duration,
          0
        );
        const avgDuration = totalDuration / recordedSleep.length;
        const avgHours = Math.floor(avgDuration);
        const avgMinutes = Math.round((avgDuration - avgHours) * 60);
        setAverageSleep({ hours: avgHours, minutes: avgMinutes });
      } else {
        setAverageSleep({ hours: 0, minutes: 0 });
      }
    } catch (e) {
      console.error('데이터 불러오기 실패', e);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadData(currentDate);
    }
  }, [isFocused, currentDate, loadData]);

  const handleBarPress = (dayData) => {
    if (dayData.duration > 0) {
      setSelectedDayData(dayData);
    } else {
      setSelectedDayData(null);
    }
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const displayDateRange = (start, end) =>
    `${start.getMonth() + 1}월 ${start.getDate()}일 ~ ${
      end.getMonth() + 1
    }월 ${end.getDate()}일`;
  const displaySelectedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
      weeklyData.find((d) => d.date === dateString)?.dayLabel
    })`;
  };

  const chartHeight = 200;
  const chartWidth = width * 0.85;
  const barWidth = 25;
  const barMargin =
    (chartWidth - barWidth * weeklyData.length) / (weeklyData.length - 1);
  const maxHours =
    weeklyData.length > 0
      ? Math.max(...weeklyData.map((d) => d.duration), 8)
      : 8;
  const maxScore = 100;

  const linePoints = weeklyData
    .map((data, index) => {
      if (data.score === null) return null;
      const x = index * (barWidth + barMargin) + barWidth / 2;
      const y = chartHeight - 20 - (data.score / maxScore) * (chartHeight - 60);
      return { x, y, score: data.score };
    })
    .filter((p) => p !== null);

  return (
    <SafeAreaView style={infoStyles.safeArea}>
      <ScrollView
        contentContainerStyle={infoStyles.container}
        showsVerticalScrollIndicator={false}>
        <View style={infoStyles.backgroundCircle2} />
        <View style={infoStyles.backgroundCircle1} />

        <Text style={infoStyles.title}>주간 수면 리포트</Text>

        <View style={infoStyles.dateNavContainer}>
          <TouchableOpacity
            onPress={handlePreviousWeek}
            style={infoStyles.arrowButton}>
            <Text style={infoStyles.arrowText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={infoStyles.dateRange}>
            {displayDateRange(weekRange.start, weekRange.end)}
          </Text>
          <TouchableOpacity
            onPress={handleNextWeek}
            style={infoStyles.arrowButton}>
            <Text style={infoStyles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={infoStyles.chartContainer}>
          <Svg height={chartHeight} width={chartWidth}>
            {weeklyData.map((data, index) => {
              const barHeight =
                data.duration > 0
                  ? (data.duration / maxHours) * (chartHeight - 40)
                  : 0;
              const x = index * (barWidth + barMargin);
              const y = chartHeight - barHeight - 20;
              const isSelected = selectedDayData?.date === data.date;
              const barColor = isSelected
                ? '#34C759'
                : data.date === getFormattedDate(new Date())
                ? '#8e97fd'
                : 'rgba(255, 255, 255, 0.5)';

              return (
                <G
                  key={`bar-${data.date}`}
                  onPress={() => handleBarPress(data)}>
                  <Rect
                    x={x}
                    y={0}
                    width={barWidth}
                    height={chartHeight}
                    fill="transparent"
                  />
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={barColor}
                    rx={8}
                  />
                  {data.duration > 0 && (
                    <SvgText
                      x={x + barWidth / 2}
                      y={y - 8}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle">
                      {data.duration.toFixed(1)}h
                    </SvgText>
                  )}
                  <SvgText
                    x={x + barWidth / 2}
                    y={chartHeight - 5}
                    fill={isSelected ? 'white' : '#d0d0d0'}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle">
                    {data.dayLabel}
                  </SvgText>
                </G>
              );
            })}
            {linePoints.length > 1 && (
              <Polyline
                points={linePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#FFD60A"
                strokeWidth="2"
                strokeDasharray="4, 4"
              />
            )}
            {linePoints.map((p, index) => (
              <Circle
                key={`point-${index}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#FFD60A"
              />
            ))}
          </Svg>
        </View>

        <View style={infoStyles.summaryContainer}>
          <Text style={infoStyles.summaryTitle}>주간 평균 수면</Text>
          <Text style={infoStyles.summaryText}>
            {averageSleep.hours}시간 {averageSleep.minutes}분
          </Text>
        </View>

        {selectedDayData && (
          <>
            <View style={infoStyles.scoreDetailContainer}>
              <Text style={infoStyles.summaryTitle}>
                {displaySelectedDate(selectedDayData.date)}의 수면의 질
              </Text>
              {selectedDayData.score !== null ? (
                <Text style={infoStyles.summaryText}>
                  {selectedDayData.score}점
                </Text>
              ) : (
                <Text style={infoStyles.summarySubtitle}>
                  기록된 점수가 없습니다.
                </Text>
              )}
            </View>

            <View style={infoStyles.timeDetailContainer}>
              <View style={infoStyles.timeRow}>
                <Ionicons name="moon-outline" size={20} color="#B9BBBE" />
                <Text style={infoStyles.timeLabel}>취침 시각</Text>
                <Text style={infoStyles.timeText}>
                  {selectedDayData.sleepTime || '--:--'}
                </Text>
              </View>
              <View style={infoStyles.timeRow}>
                <Ionicons name="sunny-outline" size={20} color="#B9BBBE" />
                <Text style={infoStyles.timeLabel}>기상 시각</Text>
                <Text style={infoStyles.timeText}>
                  {selectedDayData.wakeTime || '--:--'}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
