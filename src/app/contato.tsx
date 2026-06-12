import { Stack, router } from 'expo-router';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';


export default function contato() {
  const abrirEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };
  
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
      <Stack.Screen options={{ title: 'Contato' }} />

      <View style={styles.container}>

        <Text style={styles.title}>
          Suporte técnico:
        </Text>

        <View style={styles.card}>
         <Text style={styles.subtitle}>
          Solicitamos que entre em contato conosco exclusivamente por problemas técnicos com o aplicativo.
          </Text>
        </View>

        <View style={styles.card}>
         <Text style={styles.listarContatos}>
          E-mails:
          </Text>

          <TouchableOpacity onPress={() => abrirEmail('202403852497@alunos.estacio.br')}>
            <Text style={styles.legenda}>
              {'\n'}202403852497@alunos.estacio.br
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => abrirEmail('202309398567@alunos.estacio.br')}>
            <Text style={styles.legenda}>
              {'\n'}202309398567@alunos.estacio.br
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => abrirEmail('202202198943@alunos.estacio.br')}>
            <Text style={styles.legenda}>
              {'\n'}202202198943@alunos.estacio.br
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => abrirEmail('202302326617@alunos.estacio.br')}>
            <Text style={styles.legenda}>
              {'\n'}202302326617@alunos.estacio.br
            </Text>
          </TouchableOpacity>
        
        </View>

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
    justifyContent: 'top',
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
    fontSize: 15,
    fontWeight:'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 15,
    paddingRight: 10,
  },

  listarContatos: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    paddingRight: 15,
  },
  
  legenda: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    lineHeight: 15,
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
