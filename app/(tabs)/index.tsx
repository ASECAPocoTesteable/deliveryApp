// index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Orders from '../../components/Orders';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ToastContainer />
      <Orders />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
