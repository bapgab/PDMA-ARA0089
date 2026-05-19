import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  function abrirDenuncia() {
    router.push('/denuncia');
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>🐾 PetAlerta</Text>

      <Text style={styles.subtitulo}>
        Sistema de denúncias de maus-tratos animais
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirDenuncia}
      >
        <Text style={styles.textoBotao}>
          Fazer denúncia
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },

  botao: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});