import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as firebase from "firebase";
import db from "../config";

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      allBooks: [],
      lastVisibleTransaction: null,
    };
  }

  fetchMoreBooks = async () => {
    var text = this.state.search.toUpperCase();
    var enteredText = text.split("");

    if (enteredText[0].toLowerCase() === "a") {
      const query = await db
        .collection("Book")
        .where("author", "==", text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allBooks: [...this.state.allBooks, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  searchBooks = async (text) => {
    var enteredText = text.split("");
    var text = text.toUpperCase();

    if (enteredText[0].toLowerCase() === "a") {
      const book = await db
        .collection("Book")
        .where("author", "==", text)
        .get();
      book.docs.map((doc) => {
        this.setState({
          allBooks: [...this.state.allBooks, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  componentDidMount = async () => {
    const query = await db.collection("Book").limit(10).get();
    query.docs.map((doc) => {
      this.setState({
        allBooks: [],
        lastVisibleTransaction: doc,
      });
    });
  };

  retriveStories = async () => {
    const storyRef = db.collection("Book").doc("B001");
    const collections = await storyRef.listCollections();
    collections.forEach((collection) => {
      console.log(collection.id);
    });
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          style={{ marginTop: 10 }}
          placeholder="Type Here..."
          onChangeText={(text) => {
            this.setState({ search: text });
          }}
          value={search}
        />
        <FlatList
          data={this.state.allBooks}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{"Title: " + item.title}</Text>
              <Text>{"Author: " + item.author}</Text>
              <Text>{"Story: " + item.story}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreBooks}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}
