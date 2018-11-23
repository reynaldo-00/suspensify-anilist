import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Studio from './Studio';
import Header from './Header';
import AnimeDetails from './AnimeDetails';
import StudioDetails from './StudioDetails';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search : '',
      studios: [
        // '8-bit',
        'Shaft',
        // 'MadHouse',
        // 'Kyoto Animation',
        // 'BONES',
        // 'Trigger',
        // 'Studio Ghibli',
        // 'A-1 Pictures',
        // 'ufotable'
      ]
    }
  }

  onChangeHandler = search => {
    this.setState({search})
  }

  displayStudios = (props) => {
    return this.state.studios.map((studio, index) => <Studio key={index} studio={studio} {...props} />);
  }

  displaySearchResults = (props) => {
    return <Studio studio={this.state.search} {...props}/>
  }

  render() {
    return (
      <Container>
          <Route
            path="/"
            exact
            render={props => (
              <>
                <Header search={this.state.search} onChange={this.onChangeHandler} />
                {!this.state.search.length ? this.displayStudios(props) : this.displaySearchResults(props)}
              </>
            )}
          />

          <Route 
            path="/anime/:id"
            render={props => <AnimeDetails {...props}/>}
          />

          <Route 
            path="/studio/:id"
            render={props => <StudioDetails {...props}/>}
          />

      </Container>
    );
  }
}

export default App;


const Container = styled.div`
  width: 700px;
  /* width: 100%; */
  /* max-width: 950px; */
  /* min-width: 550px; */
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 50px 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;