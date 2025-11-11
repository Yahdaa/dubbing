import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoContainer}>
        <Text style={styles.logo}>@</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
});

export default Header;