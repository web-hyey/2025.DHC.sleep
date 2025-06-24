import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import { articleStyles } from '../styles';

export default function ArticleDetailScreen({ route, navigation }) {
  const { articleData } = route.params;

  return (
    <SafeAreaView style={articleStyles.safeArea}>
      <ScrollView>
        <Image source={articleData.image} style={articleStyles.detailImage} />
        <View style={articleStyles.detailContentContainer}>
            <Text style={articleStyles.detailTitle}>{articleData.title}</Text>
            <Text style={articleStyles.detailSectionTitle}>정상수면이란?</Text>
            <Text style={articleStyles.detailContent}>수면은 빠른 안구운동이 수면중에 빠른 안구운동 수면 또는 렘수면(REM 수면)과 빠른안구운동이 나타나지 않는 비렘수면(non-REM수면)으로 구성되어 있습니다. 렘수면에서는 꿈을 꾸게 되고 이때는 몸을 움직일 수 없어 꿈을 꾸면서도 행동을 직접 하지 않게 만들어 줍니다. 렘수면은 전체수면의 20~25%를 차지하고...</Text>

            <Text style={articleStyles.detailSectionTitle}>수면의 단계</Text>
          
          
            <View style={articleStyles.detailSubSection}>
                <Text style={articleStyles.detailSubTitle}>1. 비렘수면(NREM): 조용한 잠</Text>
                <Text style={articleStyles.detailListItem}>• 1단계: 가장 얕은 잠으로, 잠에 빠져드는 단계입니다. 쉽게 깰 수 있습니다.</Text>
                <Text style={articleStyles.detailListItem}>• 2단계: 본격적인 수면이 시작되는 단계로, 신체 활동이 더욱 둔화됩니다.</Text>
                <Text style={articleStyles.detailListItem}>• 3단계: 가장 깊은 잠(서파수면)으로, 신체 회복과 성장에 매우 중요합니다. 이 단계에서는 깨우기가 어렵습니다.</Text>
            </View>
            
            {/* 수정된 부분 1 */}
            <View style={articleStyles.detailSubSection}>
                <Text style={articleStyles.detailSubTitle}>2. 렘수면(REM): 꿈꾸는 잠</Text>
                <Text style={articleStyles.detailContent}>{articleData?.content?.rem_sleep}</Text>
            </View>

            {/* 수정된 부분 2 */}
            <Text style={articleStyles.detailSectionTitle}>수면 주기</Text>
            <Text style={articleStyles.detailContent}>{articleData?.content?.cycle}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}