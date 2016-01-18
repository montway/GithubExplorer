'use strict';

import React from 'react-native';
import SearchResults from './SearchResults';

const {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component
} = React;

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onSearchPressed() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searyQuery: this.state.searyQuery
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({
            searchQuery: text
          })}
          placeholder='Seach Repos' />

        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Search Github
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 68,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});
