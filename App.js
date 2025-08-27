import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    // Cabeçalho
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Minhas tarefas</Text>
        <TouchableOpacity>
          <Text>🌛</Text>
        </TouchableOpacity>
      </View>

      {/* Local onde o usuario inseri a tarefa */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      {/* Manda em formato de listagem em sequencia */}
      <FlatList
        style={styles.flatList}
        // Quando a listagem for vazio faz algo
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhum tarefa adicionada ainda.
          </Text>
        )}
        // caixa de estilo da lista
        contentContainerStyle={styles.flatListContent}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(153, 89, 238, 0.17)",
  },
  topBar: {
    backgroundColor:"#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50, //Ajuste para a barra de status
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBlockColor: "rgba(0, 0, 0, 0.17)",
  },
  topBarTitle: {
    color:"#0079",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor:"#fff",
    color:"#000",
    shadowColor: "#000",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    backgroundColor:"#fcfcfc",
    color:"#333",
    borderColor:"rgba(0, 0, 0, 0.17)",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#0096"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10, // Espaçamento no final da lista
  },
  taskItem: {
    backgroundColor: "#fff",
    color: "#333",
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
  },
  taskTextContainer:{
    flex: 1, //Permitir que o texto ocupe o espaço disponivel
    marginRight: 10,
  },
  taskText: {
    color:"#333",
    fontSize: 18,
    flexWrap: "wrap", //permite que o texto quebre linha
  },
  completedTaskItem:{
    textDecorationLine:"line-through", // risca do texto
    opacity: 0.6,
  },
  deleteButton:{
    padding:8,
    borderRadius:5,
  },
  deleteButtonText:{
    // color: #fff
    fontSize:22,
    fontWeight:"bold",
  },
  emptyListText:{
    color:"#9e9e9e",
    textAlign:"center",
    marginTop:50,
    fontSize:16,
  }
});
