import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const searchResults = [
    { id: 1, type: 'user', name: 'Ana García', username: '@ana_garcia', followers: '1.2K' },
    { id: 2, type: 'hashtag', tag: '#tecnología', posts: '45.2K posts' },
    { id: 3, type: 'user', name: 'Carlos López', username: '@carlos_dev', followers: '890' },
  ];

  const tabs = [
    { id: 'all', label: 'Todo' },
    { id: 'users', label: 'Usuarios' },
    { id: 'hashtags', label: 'Hashtags' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios, hashtags..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.results}>
        {searchResults.map(result => (
          <TouchableOpacity key={result.id} style={styles.resultItem}>
            <View style={styles.resultContent}>
              {result.type === 'user' ? (
                <>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>👤</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{result.name}</Text>
                    <Text style={styles.userHandle}>{result.username} • {result.followers} seguidores</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.hashtagIcon}>
                    <Text style={styles.hashtagText}>#</Text>
                  </View>
                  <View style={styles.hashtagInfo}>
                    <Text style={styles.hashtagName}>{result.tag}</Text>
                    <Text style={styles.hashtagPosts}>{result.posts}</Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  results: {
    flex: 1,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userHandle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  hashtagIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hashtagText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hashtagInfo: {
    flex: 1,
  },
  hashtagName: {
    fontSize: 16,
    fontWeight: '600',
  },
  hashtagPosts: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default SearchScreen;