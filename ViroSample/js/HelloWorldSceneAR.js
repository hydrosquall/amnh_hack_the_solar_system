import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ViroAmbientLight,
  ViroARScene,
  ViroText
} from "react-viro";

import  { Observable, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { webSocket } from "rxjs/webSocket";
import io from "socket.io-client";

// Unused Websockets Code
// class ScoreDataService {
//   url = "https://ws-api.iextrading.com/1.0";
//   socket;

//   sendMessage(message) {
//     this.socket.emit("add-message", message);
//   }

//   getMessages() {
//     const observable = new Observable(observer => {
//       this.socket = io(this.url);
//       this.socket.on("message", data => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
// }

// const api = {
//   // fetchData$: from(), // This is fromPromise
//   socketData$: webSocket("ws://demos.kaazing.com/echo")
// }

const API_URL = "https://launchlibrary.net/1.3/launch/next/25";

class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "initializing AR...",
      fetchedData: []
    };

    console.log(props.sceneNavigator.viroAppProps);
    // this.scoreDataService = new ScoreDataService();
  }

  componentDidMount() {
    // REST API
    this.subscription$ = interval(2000).pipe(
      flatMap(() => fetch(API_URL)),
      flatMap(response => response.json())
    ).subscribe(value => {
      this.setState({
        fetchedData: value.launches
      })
    })

    // API data
    // api.socketData$.subscribe(
    //   msg => {
    //     console.log('message received: ', msg); // Called whenever there is a message from the server.
    //   }
    // );
    // this.scoreDataService.getMessages().subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // )
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  handleTrackingUpdated = () => {
    this.setState({ text: "Hacking the Solar System!" });
  };

  render() {
    const { fetchedData } = this.state;
    const numRockets = fetchedData.length;

    return (
      <ViroARScene onTrackingUpdated={this.handleTrackingUpdated}>
        <ViroText
          text={`Data on ${numRockets} planets`}
          scale={[0.1, 0.1, 0.1]}
          height={1}
          width={8}
          position={[0, 0.5, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text={`${this.state.text}`}
          scale={[0.1, 0.1, 0.1]}
          height={2}
          width={4}
          position={[0, 0.7, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color={"#aaaaaa"} />
      </ViroARScene>
    );
  }
}

export default HelloWorldSceneAR;

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
