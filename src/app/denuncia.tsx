import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as FileSystem from "expo-file-system/legacy";

export default function Denuncia() {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  async function enviarDenuncia() {
    if (descricao === "" || tipo === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // Monta o objeto da denúncia
    const denuncia = {
      tipo,
      descricao,
      dataCriacao: new Date().toISOString(), // usar depois, pode ser o cabeçalho do email junto com a descrição
    };

    // Nome do arquivo usa timestamp para evitar sobrescrever denúncias anteriores
    const fileName = `denuncia.json`;
    const fileUri = FileSystem.documentDirectory + fileName;
    const jsonString = JSON.stringify(denuncia, null, 2);

    try {
      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      console.log("Finalmente funcionando, Salvo em:", fileUri);

      Alert.alert("Denúncia enviada", "denúncia registrada com sucesso.");
      setDescricao("");
      setTipo("");
    } catch (e) {
      console.error("Deu merda dnv, não salvou:", e);
      Alert.alert("Erro", "Não foi possível salvar a denúncia.");
    }
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
