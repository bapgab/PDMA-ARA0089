import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function contato() {
  return (
    <>
      <Stack.Screen options={{ title: 'Contato' }} />

      <View style={styles.container}>

        <Text style={styles.title}>
          Entre em contato{"\n"} conosco
        </Text>

        <div style={styles.card}>
         <Text style={styles.subtitle}>
          telefone
          </Text>

          <Text style={styles.legenda}>
           92656126
           </Text>

        </div>

        <div style={styles.card}>
         <Text style={styles.subtitle}>
          whatsap
          </Text>

          <Text style={styles.legenda}>
           92656126
           </Text>

        </div>

        <div style={styles.card}>
         <Text style={styles.subtitle}>
          email
          </Text>

          <Text style={styles.legenda}>
           usuarios@gmail.com
           </Text>

        </div>


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
    marginBottom: 150,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 24,
    paddingRight:12,
  },

  card: {
    padding: 5,
    paddingLeft:0,
  },
  
  legenda: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 24,
},

});