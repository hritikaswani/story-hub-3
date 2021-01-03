// import * as React from "react";
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   TextInput,
//   StyleSheet,
//   ToastAndroid,
//   KeyboardAvoidingView,
// } from "react-native";
// import { Header } from "react-native-elements";
// // import * as firebase from "firebase";
// import db from "../config";

// export default class WriteStoryScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       author: "",
//       title: "",
//       story: "",
//     };
//   }
//   submit = () => {
//     db.collection("Book").add({
//       Author: this.state.author,
//       Title: this.state.title,
//       Story: this.state.story,
//     });
//     this.setState({
//       title: "",
//       author: "",
//       story: "",
//     });
//     ToastAndroid.show("Your story has been sumitted", ToastAndroid.SHORT);
//   };

//   render() {
//     return (
//       <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//         <Header
//           backgroundColor={"#F2CEDF"}
//           centerComponent={{
//             text: "STORY HUB",
//             style: { fontSize: 24 },
//           }}
//         ></Header>
//         <TextInput
//           style={styles.titleInput}
//           placeholder="Title of the story"
//           value={this.state.title}
//           onChangeText={(text) => {
//             this.setState({
//               title: text,
//             });
//           }}
//         />
//         <TextInput
//           style={styles.titleInput}
//           placeholder="Author of the story"
//           value={this.state.author}
//           onChangeText={(text) => {
//             this.setState({
//               author: text,
//             });
//           }}
//         />
//         <TextInput
//           style={styles.contentInput}
//           placeholder="Content of the story"
//           value={this.state.story}
//           onChangeText={(text) => {
//             this.setState({
//               story: text,
//             });
//           }}
//           multiline={true}
//         />
//         <TouchableOpacity
//           style={{ backgroundColor: "#F2CEDF", margin: 150, width: 100 }}
//           onPress={() => {
//             this.submit();
//           }}
//         >
//           <Text style={{ fontSize: 24, textAlign: "center" }}>Submit</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   titleInput: {
//     borderWidth: 1.5,
//     width: 380,
//     marginLeft: 10,
//     marginTop: 10,
//   },
//   contentInput: {
//     borderWidth: 1.5,
//     width: 380,
//     marginLeft: 10,
//     marginTop: 10,
//     height: 200,
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Header } from "react-native-elements";
import db from "../config";
//import firebase from 'firebase'

export default class WriteStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      storyText: "",
    };
  }

  submitStory = () => {
    db.collection("Book").add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
      //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
    });
    this.setState({
      title: "",
      author: "",
      storyText: "",
    });
    ToastAndroid.show("Your story has been sumitted", ToastAndroid.SHORT);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Header
          backgroundColor={"pink"}
          centerComponent={{
            text: "Bed Time Stories",
            style: { color: "white", fontSize: 20 },
          }}
        />
        <TextInput
          placeholder="Story Title"
          onChangeText={(text) => {
            this.setState({
              title: text,
            });
          }}
          value={this.state.title}
          style={styles.title}
        />
        <TextInput
          placeholder="Author"
          onChangeText={(text) => {
            this.setState({
              author: text,
            });
          }}
          value={this.state.author}
          style={styles.author}
        />
        <TextInput
          placeholder="Write your story"
          onChangeText={(text) => {
            this.setState({
              storyText: text,
            });
          }}
          value={this.state.storyText}
          style={styles.storyText}
          multiline={true}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.submitStory}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    height: 40,
    borderWidth: 2,
    marginTop: 40,
    margin: 10,
  },
  author: {
    height: 40,
    borderWidth: 2,
    margin: 10,
  },
  storyText: {
    height: 250,
    borderWidth: 2,
    margin: 10,
  },
  submitButton: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "pink",
    width: 80,
    height: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
