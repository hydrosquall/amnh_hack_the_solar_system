"use strict";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ViroAmbientLight,
  ViroARScene,
  ViroSpotLight,
  ViroText
} from "react-viro";

class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "initializing AR...",
      count: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ count: this.state.count + 1 }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTrackingUpdated = () => {
    this.setState({ text: "Hacking the Solar System!" });
  };

  render() {
    return (
      <ViroARScene onTrackingUpdated={this.handleTrackingUpdated}>
        <ViroText
          text={`${this.state.count} planets, ${this.state.text}`}
          scale={[0.1, 0.1, 0.1]}
          height={1}
          width={4}
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

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
