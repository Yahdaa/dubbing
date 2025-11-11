import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('threads');
  
  const userPosts = [
    {
      id: 1,
      user: { name: 'Tu nombre', username: '@tu_usuario', avatar: '👤' },
      content: 'Mi primer thread en esta increíble plataforma. ¡Emocionado de estar aquí!',
      timestamp: '1d',
      likes: 15,
      replies: 3,
      reposts: 1
    }
  ];

  const tabs = [
    { id: 'threads', label: 'Threads' },
    { id: 'replies', label: 'Respuestas' },
    { id: 'reposts', label: 'Reposts' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={styles.displayName}>Tu nombre</Text>
              <Text style={styles.username}>@tu_usuario</Text>
            </View>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>

          <Text style={styles.bio}>
            Desarrollador apasionado por la tecnología. Creando el futuro una línea de código a la vez. 🚀
          </Text>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>seguidores</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>890</Text>
              <Text style={styles.statLabel}>siguiendo</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
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

        <View style={styles.postsSection}>
          {userPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  menuButton: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  profileInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    marginRight: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  postsSection: {
    flex: 1,
  },
});

export default ProfileScreen;