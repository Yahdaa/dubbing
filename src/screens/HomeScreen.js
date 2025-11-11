import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import PostCard from '../components/PostCard';

const HomeScreen = () => {
  const [posts] = useState([
    {
      id: 1,
      user: { name: 'Ana García', username: '@ana_garcia', avatar: '👩💻' },
      content: 'Trabajando en un nuevo proyecto increíble. ¡No puedo esperar a compartirlo con ustedes! 🚀',
      timestamp: '2h',
      likes: 24,
      replies: 5,
      reposts: 2
    },
    {
      id: 2,
      user: { name: 'Carlos López', username: '@carlos_dev', avatar: '👨💼' },
      content: 'La tecnología está cambiando tan rápido. Es emocionante ser parte de esta revolución digital.',
      timestamp: '4h',
      likes: 18,
      replies: 3,
      reposts: 1
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.feed}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
  },
});

export default HomeScreen;