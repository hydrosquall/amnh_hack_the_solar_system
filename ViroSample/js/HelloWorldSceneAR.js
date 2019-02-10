import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ViroAmbientLight,
  ViroARScene,
  ViroText
} from "react-viro";

import  { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

// This is fromPromise
const api = {
  getData$: from(fetch("https://launchlibrary.net/1.3/launch/next/25"))
}

class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "initializing AR...",
      fetchedData: []
    };
  }

  componentDidMount() {
    this.subscription$ = api.getData$.pipe(
      flatMap(fetchResponse => fetchResponse.json())
    ).subscribe(value => {
      this.setState({
        fetchedData: value.launches
      })
    })
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
