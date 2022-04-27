import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ListItem from "./components/ListItem";

const App = () => {
  //create a arry of type Title=[{title: '', description: '',index: ''}]
  const [tasks, setTasks] = React.useState([
    {
      title: "React Native1",
      description:
        "React Native is an open-source, cross-platform mobile application framework created by Facebook.",
      index: 0,
    },
    {
      title: "React Native2",
      description:
        "React Native is an open-source, cross-platform mobile application framework created by Facebook.",
      index: 1,
    },
    {
      title: "React Native3",
      description:
        "React Native is an open-source, cross-platform mobile application framework created by Facebook.",
      index: 2,
    },
    {
      title: "React Native4",
      description:
        "React Native is an open-source, cross-platform mobile application framework created by Facebook.",
      index: 3,
    },
  ]);

  const handleClick = React.useCallback(() => {
    console.log("handleClick");
    // handle the click event
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Hello World</Text>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem key={task.index} task={task} onDismiss={handleClick} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  text: {
    fontSize: 60,
    marginVertical: 20,

    marginLeft: 10,
  },
});

export default App;
