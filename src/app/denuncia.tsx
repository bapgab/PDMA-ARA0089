import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Denuncia() {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  function enviarDenuncia() {
    if (descricao === "" || tipo === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    Alert.alert(
      "Denúncia enviada",
      "Sua denúncia foi registrada com sucesso."
    );

    setDescricao("");
    setTipo("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Denúncia</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo da denúncia"
        value={tipo}
        onChangeText={setTipo}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Descreva o ocorrido"
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button title="Enviar denúncia" onPress={enviarDenuncia} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    height: 120,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});