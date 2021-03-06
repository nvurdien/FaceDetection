import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from './components/SignIn/SignIn'
import {Particles} from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./components/Register/Register";

const deploy = "https://blooming-harbor-84136.herokuapp.com"

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

const initialState = {
    input: '',
    imageURL: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
};

class App extends Component {
    constructor(){
        super();
        this.state = initialState
    }

    loadUser = (data) => {
        console.log(data);
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    };

    calculateFaceLocation = (response) => {
        const clarifaiFace = [];
        response.outputs[0].data.regions.forEach((item, index) => {
            clarifaiFace.push(item.region_info.bounding_box)
        });
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return clarifaiFace.map((item, index) => ({
            leftCol: clarifaiFace[index].left_col * width,
            topRow: clarifaiFace[index].top_row * height,
            rightCol: width - (clarifaiFace[index].right_col * width),
            bottomRow: height - (clarifaiFace[index].bottom_row * height),
        }))
    };

    displayFaceBox = (box) => {
        this.setState({box:box});
    };

    onInputChange = (event) => {
        this.setState({
            input: event.target.value,
        })
    };

    onButtonSubmit = () => {
        this.setState({
            imageURL: this.state.input,
        });
        fetch(`${deploy}/imageurl`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if(response){
                    fetch(`${deploy}/image`, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count =>
                            this.setState(
                                Object.assign(this.state.user, {entries: count})
                            ))
                        .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };

    onRouteChange = (newRoute) => {
        if(newRoute === 'signout'){
            this.setState(initialState)
        }else if(newRoute === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({
            route: newRoute
        })
    };

  render() {
      const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">

          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          {route === 'home'
              ? <div>
                  <Logo/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                  />
                  <FaceRecognition box={box} image={imageURL}/>
              </div>
              :
              (
                  route === 'signin'
                      ?
                      <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
              }


          <Particles className="particles"
                     params={particlesOptions}
          />

      </div>
    );
  }
}

export default App;
