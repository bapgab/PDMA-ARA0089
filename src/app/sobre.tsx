import { Stack, router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Layout from './_layout';


export default function sobre() {

  function abrirHome(){
    router.push('/')
  }

  function abrirDenuncia() {
    router.push('/denuncia');
  }

  function abrirMinhasDenuncias() {
    router.push('/minhasdenuncias');
  }

  function contato() {
    router.push('/contato');
  }

  function sobre() {
    router.push('/sobre');
  }

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

        <View style={styles.menuInferior}>

        <TouchableOpacity onPress={abrirHome}>
          <Text style={styles.menuTexto}>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={abrirMinhasDenuncias}>
          <Text style={styles.menuTexto}>📋 Denúncias</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={contato}>
          <Text style={styles.menuTexto}>📞 Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={sobre}>
          <Text style={styles.menuTexto}>ℹ️ Sobre</Text>
        </TouchableOpacity>

      </View>

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

  menuInferior: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
  },

  menuTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
