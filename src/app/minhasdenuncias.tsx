import { StyleSheet, Text, View } from 'react-native';

export default function MinhasDenuncias() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Minhas Denúncias</Text>

      <View style={styles.card}>
        <Text style={styles.id}>Denúncia #001</Text>
        <Text style={styles.status}>Status: Enviando...</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.id}>Denúncia #002</Text>
        <Text style={styles.status}>Status: Recebida</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.id}>Denúncia #003</Text>
        <Text style={styles.status}>Status: Enviando...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2E7D32',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  id: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  status: {
    color: '#555',
  },
});
