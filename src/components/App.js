import React, { Component } from 'react';
import styled from 'styled-components';
import Studio from './Studio';

class App extends Component {
  render() {
    const studios = [
      '8-bit',
      'Shaft',
      'MadHouse',
      // 'Kyoto Animation',
      // 'BONES',
      // 'Trigger',
      // 'Studio Ghibli',
      // 'A-1 Pictures',
      // 'ufotable'
    ];

    return (
      <Container>
          {
            studios.map((studio, index) => {
              return (
                <Studio key={index} studio={studio} />
                );
            })
          }
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