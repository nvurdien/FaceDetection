import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import {Particles} from "react-particles-js";

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800,
            }
        },
    move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
        }
    },
        interactivity:{
            detect_on: "canvas",
            onhover:{
                enable:true,
                mode:"repulse",
            },
            onclick:{
                enable:true,
                mode:"push",
            },
            resize:true,
            modes: {
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        }
    }
};

class App extends Component {
  render() {
    return (
      <div className="App">

          <Navigation/>
          <Logo/>
          <Rank />
          <ImageLinkForm/>
          {/*<FaceRecognition/>*/}
          <Particles className="particles"
                     params={particlesOptions}
          />
      </div>
    );
  }
}

export default App;
