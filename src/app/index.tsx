import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

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
    <View style={styles.container}>

      <Text style={styles.titulo}>🐾 PetAlerta</Text>

      <Text style={styles.subtitulo}>
        Protegendo animais através de denúncias anônimas e responsáveis.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Bem-vindo ao PetAlerta
        </Text>

        <Text style={styles.cardTexto}>
          Utilize o aplicativo para registrar denúncias de maus-tratos,
          acompanhar denúncias já realizadas e acessar informações sobre
          proteção animal.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirDenuncia}
      >
        <Text style={styles.textoBotao}>
          Fazer Denúncia
        </Text>
      </TouchableOpacity>

      <View style={styles.menuInferior}>

        <TouchableOpacity>
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
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    width: '95%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 4,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },

  cardTexto: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },

  botao: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: 250,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});