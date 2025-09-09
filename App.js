import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas
  const [newTask, setNewTask] = useState(""); //Estado para texto da nova tarefa
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para alternar o tema

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks"); // se existe coisas salvas
        savedTasks && setTasks(JSON.parse(savedTasks)); // se existir ele salva as tarefas
      } catch (error) {
        console.error("Erro ao carregar tarefas;", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => { //fazer com causa e efeito
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks)); //vai no local storage salva as tarefas em formato JSON
      } catch (error) {
        console.error("Erro ao salvar tarefas;", error);
      }
    };
    saveTasks(); // ira fazer o que eu determinei
  }, [tasks]); // depende das tarefas

  const addTask = () => {
    if (newTask.trim().length > 0) {
      //Garante que a tarefa não sejá vazia
      setTasks((prevTasks) => [
        ...prevTasks, // lista tudo o que o usurio escreve
        { id: Date.now().toString(), text: newTask.trim(), completed: false },
      ]); // cada coisa que ele digitar iá ser um iD unico, para poder ser captado
      setNewTask(""); //Limpar o campo de input
      Keyboard.dismiss(); //Fecha o teclado do usúario
    } else {
      // se não
      Alert.alert("Atenção", "Digite ou informe uma tarefa!"); // Dá um alertade usurio
    }
  };

  const toggleTaskCompleted = (id) => {
    // precisa de um id para poder comparar ele com outro
    setTasks((prevTasks) =>
      prevTasks.map(
        (
          task //mapeo a previa das tarefas e nomeio todas elas de tarefas
        ) => (task.id === id ? { ...task, completed: !task.completed } : task) // se o id da tarefa for realmente o id que eu cliquei, que todo o conteudo que ela tem, e mude só o completed
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      // Mensagem para esclusão
      "Conformar exclusão",
      "Tem certeza que deseja excluir essa tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Alterna entre claro e escuro
  };

  const renderList = (
    { item } // isso não é um codigo de javaScript, é só codigos para visualização
  ) => (
    //Preciso colocar o id do item se não ele não acha
    <View style={[styles.taskItem, isDarkMode && darkStyles.taskItem]} key={item.id}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleTaskCompleted(item.id)}
      >
        {/* Se  */}
        <Text
          style={[
            styles.taskText,
            isDarkMode && darkStyles.taskText,
            item.completed && styles.completedTaskItem,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={[styles.taskText, isDarkMode && darkStyles.taskText]}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    // Cabeçalho
    <View style={[styles.container, isDarkMode && darkStyles.container]}>
      <View style={[styles.topBar, isDarkMode && darkStyles.topBar]}>
        <Text style={[styles.topBarTitle, isDarkMode && darkStyles.topBarTitle]}>
          Minhas tarefas
        </Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Text>{isDarkMode ? "☀️" : "🌛"}</Text>
        </TouchableOpacity>
      </View>

      {/* Local onde o usuario inseri a tarefa */}
      <View style={[styles.card, isDarkMode && darkStyles.card]}>
        <TextInput
          style={[styles.input, isDarkMode && darkStyles.input]}
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
          value={newTask} // será uma nova tarefa ou irá fazer referencia de uma nova tarefa
          onChangeText={setNewTask} //Quando você escreve ele mostra no input e quando clica para enviar ele addTask
          onSubmitEditing={addTask} // Adiciona a tarefa ao pressionar Enter no teclado
        />
        <TouchableOpacity
          style={[styles.addButton, isDarkMode && darkStyles.addButton]}
          onPress={addTask}
        >
          <Text style={[styles.buttonText, isDarkMode && darkStyles.buttonText]}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      {/* Manda em formato de listagem em sequencia */}
      <FlatList
        style={styles.flatList}
        data={tasks} // dou um dado para ele
        keyExtractor={(item) => item.id} //seleciono um item, tudo que estiver la dentro ele traz
        renderItem={renderList}
        // renderItem={({item})=>(
        //    //Preciso colocar o id do item se não ele não acha
        //   <View key={item.id} style={styles.taskItem}>
        //     <Text>{item.text}</Text>
        //     <TouchableOpacity>
        //       <Text>🗑️</Text>
        //     </TouchableOpacity>
        //   </View>
        // )} // preciso importar o item extrator (eles trabalham juntos)
        ListEmptyComponent={() => (
          // Quando a listagem for vazio faz algo
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
    backgroundColor: "rgba(184, 141, 240, 0.17)",
  },
  topBar: {
    backgroundColor: "#fff",
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
    color: "#0079",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    color: "#000",
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
    backgroundColor: "#fcfcfc",
    color: "#333",
    borderColor: "rgba(0, 0, 0, 0.17)",
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
    backgroundColor: "#0096",
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
  taskTextContainer: {
    flex: 1, //Permitir que o texto ocupe o espaço disponivel
    marginRight: 10,
  },
  taskText: {
    color: "#333",
    fontSize: 18,
    flexWrap: "wrap", //permite que o texto quebre linha
  },
  completedTaskItem: {
    textDecorationLine: "line-through", // risca do texto
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    // color: #fff
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyListText: {
    color: "#9e9e9e",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  topBar: {
    backgroundColor: "rgba(68, 8, 146, 0.81)",
  },
  topBarTitle: {
    color: "#fff",
  },
  card: {
    backgroundColor: "rgba(68, 8, 146, 0.81)",
  },
  input: {
    borderBottomColor: "#555",
    color: "#000",
  },
  addButton: {
    backgroundColor: "rgba(173, 138, 219, 0.81)",
  },
  buttonText: {
    color: "#000",
  },
  taskItem: {
    backgroundColor: "#1f1f1f",
  },
  taskText: {
    color: "#fff",
  },
});
