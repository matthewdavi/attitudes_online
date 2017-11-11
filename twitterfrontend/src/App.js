//@flow
import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ScoreBox from './ScoreBox';
import SearchBar from 'material-ui-search-bar';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
const base = 'http://localhost:8080/api/';
const colors = {
  '-1500': `#F44336`,
  '-1000': `#D81B60`,
  '-500': `#C51116`,
  '0': `#E1F5FE`,
  '500': `#7986CB`,
  '1000': `#00E676`,
  '1500': `#00C853`
};
function colorMap(score: number): string {
  if (score > 1500) {
    return colors[1500];
  } else if (score < -1500) {
    return colors[-1500];
  }
  let roundNum = Math.round(score / 500) * 500;
  if (roundNum === 0 && score < 0) {
    return colors[-500];
  }
  return colors[roundNum];
}
class SearchBox extends React.Component {
  render() {
    if (this.props.loading.length > 0) {
      return (
        <div id="search">
          <h1>How are your tweets feeling?</h1>
          <SearchBar
            hintText={`@account`}
            value={this.props.value}
            onChange={value => this.props.handleChange(value)}
            onRequestSearch={() => this.props.handleSearch(this.props.value)}
          />
          <ul>
            {this.props.loading.map((load, ind) => (
              <li key={ind} style={{ listStyleType: 'none' }}>
                <CircularProgress
                  color="#80D8FF"
                  key={ind}
                  size={60}
                  thickness={7}
                  className="progress"
                  style={{ marginTop: 50 }}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div id="search">
          <h1>How are your tweets feeling?</h1>
          <SearchBar
            hintText={`@account`}
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
class AboutDrawer extends React.Component {
  render() {
    return (
      <div>
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={this.props.closeDrawer}
        >
          <MenuItem>About</MenuItem>
          <MenuItem>GitHub</MenuItem>
          <MenuItem href="https://matthewdavis.co">
            Created by Matthew Davis
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newestWord: '', list: [], loading: [], open: false };
  }

  handleSearch(item) {
    if (this.state.newestWord.trim() !== '') {
      let load = this.state.loading;
      load.push(1);
      this.setState({ newestWord: '', loading: load });
      grab(item)
        .then(data => {
          let newList = this.state.list;
          newList.unshift(data);
          this.setState({ list: newList });
        })
        .then(data => {
          load.pop();
          this.setState({ loading: load });
        });
    }
  }
  handleChange(value) {
    this.setState({ newestWord: value });
  }
  openDrawer() {
    this.setState({ open: !this.state.open });
  }
  closeDrawer() {
    this.setState({ open: false });
  }
  render() {
    return (
      <div className="App">
        <HeaderBox onTouch={() => this.openDrawer()} />
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
                scoreColor={colorMap(score)}
              />
            )
          )}
        </section>
        <AboutDrawer
          open={this.state.open}
          closeDrawer={() => this.closeDrawer()}
        />
      </div>
    );
  }
}
const HeaderBox = props => (
  <AppBar
    onLeftIconButtonTouchTap={props.onTouch}
    title="Attitudes Online"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    style={{ background: '#2196F3' }}
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
