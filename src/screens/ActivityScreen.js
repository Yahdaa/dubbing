import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const ActivityScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const activities = [
    {
      id: 1,
      type: 'like',
      user: 'Ana García',
      action: 'le gustó tu thread',
      time: '2h',
      content: 'Trabajando en un nuevo proyecto...'
    },
    {
      id: 2,
      type: 'reply',
      user: 'Carlos López',
      action: 'respondió a tu thread',
      time: '4h',
      content: 'Gran punto de vista sobre la tecnología'
    },
    {
      id: 3,
      type: 'follow',
      user: 'María Silva',
      action: 'comenzó a seguirte',
      time: '1d',
      content: null
    },
    {
      id: 4,
      type: 'repost',
      user: 'Diego Ruiz',
      action: 'reposteó tu thread',
      time: '2d',
      content: 'La innovación nunca se detiene...'
    }
  ];

  const tabs = [
    { id: 'all', label: 'Todo' },
    { id: 'mentions', label: 'Menciones' },
    { id: 'likes', label: 'Me gusta' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'reply': return '💬';
      case 'follow': return '👤';
      case 'repost': return '🔄';
      default: return '📱';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Actividad</Text>
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

      <ScrollView style={styles.activityList}>
        {activities.map(activity => (
          <TouchableOpacity key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.iconText}>{getActivityIcon(activity.type)}</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.userName}>{activity.user}</Text>
                {' '}{activity.action}
              </Text>
              {activity.content && (
                <Text style={styles.contentPreview}>{activity.content}</Text>
              )}
              <Text style={styles.timeText}>{activity.time}</Text>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  activityList: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userName: {
    fontWeight: '600',
  },
  contentPreview: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default ActivityScreen;