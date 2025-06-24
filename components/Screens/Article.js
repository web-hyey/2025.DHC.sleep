import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

import { articleStyles } from '../styles'; 

const ARTICLE_DATA = [
  {
    id: 'article-1',
    title: '이걸 읽으면 꿀잠을 잘 수 있어요',
    subtitle: '내가 잠에 들지 못하는 이유, 이것 때문이라고?',
    image: require('../../image/sleeping_cat.jpg'), 
  },
  {
    id: 'article-2',
    title: '밤마다 깊게 잠들지 못한 이유',
    subtitle: '좋은 수면 위생이 그날의 수면의 질을 결정합니다.',
    image: require('../../image/insomnia.jpg'),
  },
  {
    id: 'article-3',
    title: '명상이 수면에 미치는 놀라운 효과',
    subtitle: '생각을 비우고, 깊은 잠에 빠져보세요.',
    image: require('../../image/meditation.jpg'),
  }
];

export default function Article({ navigation }) {
  return (
    <SafeAreaView style={articleStyles.safeArea}>
      <ScrollView contentContainerStyle={articleStyles.container}>
        <Text style={articleStyles.headerTitle}>잠에 대한 진실</Text>
        <Text style={articleStyles.headerSubtitle}>오늘보다 더 나은 내일을 위한 수면 정보</Text>
        
        {ARTICLE_DATA.map((article) => (
          <TouchableOpacity 
            key={article.id} 
            style={articleStyles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ArticleDetail', { articleData: article })}
          >
            <Image source={article.image} style={articleStyles.cardImage} />
            <View style={articleStyles.cardTextContainer}>
              <Text style={articleStyles.cardTitle}>{article.title}</Text>
              <Text style={articleStyles.cardSubtitle}>{article.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
