import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostScreen = () => {
  const [postText, setPostText] = useState('');
  const maxLength = 280;

  const handlePost = () => {
    if (postText.trim()) {
      Alert.alert('¡Publicado!', 'Tu thread ha sido publicado exitosamente');
      setPostText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nuevo thread</Text>
        <TouchableOpacity 
          style={[styles.postButton, !postText.trim() && styles.disabledButton]}
          onPress={handlePost}
          disabled={!postText.trim()}
        >
          <Text style={[styles.postButtonText, !postText.trim() && styles.disabledText]}>
            Publicar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Tu nombre</Text>
            <Text style={styles.userHandle}>@tu_usuario</Text>
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="¿Qué está pasando?"
          multiline
          value={postText}
          onChangeText={setPostText}
          maxLength={maxLength}
          textAlignVertical="top"
        />

        <View style={styles.footer}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="image-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="camera-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="location-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.characterCount}>
            <Text style={[
              styles.countText,
              postText.length > maxLength * 0.8 && styles.warningText,
              postText.length >= maxLength && styles.errorText
            ]}>
              {postText.length}/{maxLength}
            </Text>
          </View>
        </View>
      </View>
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    padding: 5,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
    marginRight: 10,
  },
  characterCount: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
  warningText: {
    color: '#ff9500',
  },
  errorText: {
    color: '#ff3b30',
  },
});

export default PostScreen;