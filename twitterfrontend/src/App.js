//@flow
import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ScoreBox from './ScoreBox';
import SearchBar from 'material-ui-search-bar';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
const base = 'http://localhost:8080/api/';
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.loading == true){ 
    return (
      <div id="search">
        <h1></h1>
        <SearchBar
          hintText="@"
          value={this.props.value}
          onChange={value => this.props.handleChange(value)}
          onRequestSearch={() => this.props.handleSearch(this.props.value)}
        />
        <CircularProgress size={60} thickness={7} className="progress" style={{"marginTop": 50}} />
      </div>
    );
  }
  else{
    return (
      <div id="search">
      <h1></h1>
        <SearchBar
          hintText="@"
          value={this.props.value}
          onChange={value => this.props.handleChange(value)}
          onRequestSearch={() => this.props.handleSearch(this.props.value)}
        />
      </div>
    );

  }
  }
}
function grab(word) {
  return fetch(base + word)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      return json;
    })
    .catch(function(error) {
      console.log(error);
    });
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newestWord: '', list: [], loading: false };
  }

  handleSearch(item) {
    if (this.state.newestWord.trim() != '') {
      this.setState({newestWord: '', loading: true})
      grab(item).then(data => {
        console.log(data);
        let newList = this.state.list;
        newList.unshift(data);
        this.setState({ list: newList});
      })
      .then(data => {
        this.setState({loading: false});
      })
    }
  }
  handleChange(value) {
    this.setState({ newestWord: value });
  }

  render() {
    return (
      <div className="App">
        <HeaderBox/>
        <SearchBox
          handleSearch={item => this.handleSearch(item)}
          value={this.state.newestWord}
          handleChange={value => this.handleChange(value)}
          loading={this.state.loading}
        />

        <section id="collection">
          {this.state.list.map(
            ({ user, score, mostNegative, mostPositive, avi, name }, index) => (
              <ScoreBox
                key={index}
                username={'@' + user}
                score={score}
                mostNegative={mostNegative}
                mostPositive={mostPositive}
                avi={avi}
                name={name}
              />
            )
          )}
        </section>
      </div>
    );
  }
}
const HeaderBox = () => (
  <AppBar
    title="Attitudes Online"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Box />
      </MuiThemeProvider>
    );
  }
}

export default App;
