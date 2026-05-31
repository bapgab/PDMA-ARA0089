import { useState, useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

// Vou precisar fazer essa parte da pior maneira possível: Usar o telegram com o token do bot exposto para a internet.
// Atualizar o nome do arquivo de acordo com o status: denuncia_toSend e denuncia_sent
// const TELEGRAM_BOT_TOKEN = "Obviamente não vou colocar isso no github";
// const CHAT_ID = "Dá para melhorar o código se eu usar switch case e trocar para quem entrega a denúncia de acordo com o tipo";

const CHAT_ID = "";
const TELEGRAM_BOT_TOKEN = "";
// ─── Opções disponíveis no dropdown de tipo de denúncia ───────────────────────
const OPCOES_DENUNCIA = [
  "Maus-tratos",
  "Abandono",
  "Animal ferido / sem assistência",
  "Envenenamento",
  "Comércio ilegal de animais",
  "Outro",
];

export default function Denuncia() {
  // ─── Referência para controlar o ScrollView ──────────────────────────────────
  const scrollRef = useRef(null);

  // ─── Estados do formulário ───────────────────────────────────────────────────
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  // ─── Estados de UI ───────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);

  // ─── Animação do botão de envio ──────────────────────────────────────────────
  const buttonScale = useSharedValue(1);
  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  function handlePressIn() {
    buttonScale.value = withSpring(0.97, { damping: 10, stiffness: 300 });
  }

  function handlePressOut() {
    buttonScale.value = withSpring(1, { damping: 10, stiffness: 300 });
  }

  // ─── Rola o ScrollView para o topo ──────────────────────────────────────────
  function scrollParaTopo() {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 50);
  }

  // ─── Lógica principal de envio da denúncia ───────────────────────────────────
  async function registrarDenuncia() {
    if (!descricao.trim() || !tipo.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    setLoading(true);

    // Monta o objeto da denúncia
    const denuncia = {
      tipo: tipo.trim(),
      descricao: descricao.trim(),
    };

    const fileUri = FileSystem.documentDirectory + "denuncia_toSend.json";
    const jsonString = JSON.stringify(denuncia, null, 2);

    try {
      // Delay artificial para feedback visual de carregamento
      await new Promise((resolve) => setTimeout(resolve, 800));

      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      console.log("Arquivo salvo em: ", fileUri);

      // Exibe a tela de sucesso e rola para o topo
      setSucesso(true);
      scrollParaTopo();

      // Limpa os campos do formulário
      setDescricao("");
      setTipo("");
      enviarDenuncia(fileUri);
    } catch (e) {
      console.log("Erro ao salvar arquivo: ", e);
      Alert.alert("Erro", "Não foi possível armazenar a denúncia para enviar");
      scrollParaTopo();
    } finally {
      setLoading(false);
    }
  }

  // ─── Enviar a denuncia para o telegram usando a api que esta em plaintext ────
  async function enviarDenuncia(fileUri) {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) return console.log("arquivo de envio não encontrado");

    const conteudo = await FileSystem.readAsStringAsync(fileUri);
    const dados = JSON.parse(conteudo);

    try {
      const constructMessagem = `
        *Nova denuncia recebida:*
        *informações*: ${JSON.stringify(dados, null, 2)}`;

      const resposta = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: constructMessagem,
          parse_mode: "Markdown",
        }),
      });

      const result = await resposta.json();

      if (result.ok) {
        console.log("Mensagem enviada com sucesso!");
        return true;
      } else {
        console.error("Erro na API do Telegram:", result.description);
        return false;
      }
    } catch (error) {
      console.error("Erro na conexão com Telegram:", error);
      return false;
    }
  }

  // ─── Retorna ao formulário a partir da tela de sucesso ───────────────────────
  function voltarParaInicio() {
    setSucesso(false);
    scrollParaTopo();
  }

  // ─── Renderização ────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {sucesso ? (
          // ── Tela de sucesso ──────────────────────────────────────────────────
          <Animated.View entering={FadeInDown.duration(600)} style={styles.successContainer}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark" size={60} color="#4CAF50" />
            </View>

            <Text style={styles.successTitulo}>Denúncia enviada</Text>
            <Text style={styles.successSubverde}>com sucesso!</Text>

            <Text style={styles.successDescription}>
              Agradecemos por fazer a diferença na vida dos animais.
            </Text>

            <Pressable style={styles.buttonMainPurple}>
              <Ionicons name="document-text-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.buttonMainPurpleText}>Acompanhar denúncia</Text>
            </Pressable>

            <Pressable onPress={voltarParaInicio} style={styles.buttonSecondaryOutline}>
              <Ionicons name="home-outline" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
              <Text style={styles.buttonSecondaryOutlineText}>Voltar para a denúncia</Text>
            </Pressable>
          </Animated.View>
        ) : (
          // ── Formulário de denúncia ───────────────────────────────────────────
          <Animated.View entering={FadeInDown.duration(500)} style={styles.container}>
            <Text style={styles.titulo}>Nova Denúncia</Text>
            <Text style={styles.subtitulo}>
              Preencha as informações detalhadamente de forma segura.
            </Text>

            {/* Dropdown de tipo de denúncia */}
            <Text style={styles.label}>Tipo da denúncia</Text>
            <Pressable
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              style={[styles.dropdownSelector, isDropdownOpen && styles.inputFocused]}
            >
              <Text style={[styles.dropdownSelectorText, !tipo && styles.placeholderText]}>
                {tipo || "Selecione o tipo de ocorrência..."}
              </Text>
              <Text style={styles.dropdownArrow}>{isDropdownOpen ? "▲" : "▼"}</Text>
            </Pressable>

            {isDropdownOpen && (
              <Animated.View
                entering={FadeInUp.duration(200)}
                exiting={FadeOutUp.duration(150)}
                style={styles.dropdownContainer}
              >
                {OPCOES_DENUNCIA.map((opcao, index) => (
                  <Pressable
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setTipo(opcao);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        tipo === opcao && styles.dropdownOptionTextSelected,
                      ]}
                    >
                      {opcao}
                    </Text>
                  </Pressable>
                ))}
              </Animated.View>
            )}

            {/* Campo de descrição */}
            <Text style={styles.label}>Descrição do ocorrido</Text>
            <TextInput
              style={[styles.textArea, isDescFocused && styles.inputFocused]}
              placeholder="Descreva aqui os detalhes com precisão..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              value={descricao}
              onChangeText={setDescricao}
              onFocus={() => setIsDescFocused(true)}
              onBlur={() => setIsDescFocused(false)}
            />

            {/* Botão de envio com animação de escala */}
            <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
              <Pressable
                disabled={loading}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={registrarDenuncia}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                  loading && styles.buttonDisabled,
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Enviar denúncia</Text>
                )}
              </Pressable>
            </Animated.View>
          </Animated.View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },
  container: {
    padding: 28,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A3A3C",
    marginBottom: 8,
    marginLeft: 2,
  },
  dropdownSelector: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  dropdownSelectorText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  placeholderText: {
    color: "#999",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  dropdownContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    marginTop: -14,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  dropdownOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#3A3A3C",
  },
  dropdownOptionTextSelected: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  textArea: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1C1C1E",
    height: 140,
    marginBottom: 32,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  inputFocused: {
    borderColor: "#4CAF50",
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.95,
  },
  buttonDisabled: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFF",
    borderRadius: 32,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  successIconCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#E8F5E9",
    borderWidth: 5,
    borderColor: "#A5D6A7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  successTitulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F1035",
    textAlign: "center",
  },
  successSubverde: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 16,
  },
  successDescription: {
    fontSize: 15,
    color: "#7F8487",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  buttonMainPurple: {
    backgroundColor: "#4CAF50",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonMainPurpleText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondaryOutline: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondaryOutlineText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
});
