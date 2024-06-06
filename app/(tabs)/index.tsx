import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Orders from '@/components/Orders';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  return (
      <SafeAreaView style={styles.container}>
        <Orders />
        <Toast />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30
  },
});

export default App;
