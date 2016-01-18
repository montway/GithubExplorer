'use strict';

import React from 'react-native';
import moment from 'moment';

import AuthService from './AuthService';
import PushPayload from './PushPayload';

const {
  Text,
  StyleSheet,
  View,
  Component,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} = React;

export default class Feed extends Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      const url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        const feedItems = responseData.filter((ev) => {
          return ev.type == 'PushEvent';
        });

        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(feedItems),
          showProgress: false
        });
      })
    });
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor='#DDD'
      >

        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1
        }}>
          <Image
            source={{uri: rowData.actor.avatar_url}}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }} />

          <View style={{paddingLeft: 20}}>
            <Text style={{backgroundColor: '#FFF'}}>
              {moment(rowData.created_at).fromNow()}
            </Text>
            <Text style={{
              backgroundColor: '#FFF',
              fontWeight: '600'
            }}>
              {rowData.actor.login}
            </Text>
            <Text style={{backgroundColor: '#FFF'}}>
              {rowData.payload.ref.replace('refs/heads/', '')}
            </Text>
            <Text style={{backgroundColor: '#FFF'}}>
              at <Text style={{fontWeight: '600'}}>
                {rowData.repo.name}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicatorIOS
            size={'large'}
            animating={true} />
        </View>
      );
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View> 
    );
  }
};
