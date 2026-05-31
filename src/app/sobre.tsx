import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Layout from './_layout';

export default function sobre() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sobre' }} />

      <View style={styles.container}>
        <Layout></Layout>

        <Text style={styles.title}>
          SOBRE
        </Text>

        <Text style={styles.subtitle}>
         O PetAlerta é um aplicativo de denuncias anônimas para mals traros a animais, suas denuncias são direcionadas de forma anônima para prefeiura de Ribeirão Preto
        </Text>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 24,
  },

  // button: {
  //   backgroundColor: '#2E7D32',
  //   paddingVertical: 14,
  //   paddingHorizontal: 30,
  //   borderRadius: 12,
  // },

  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});