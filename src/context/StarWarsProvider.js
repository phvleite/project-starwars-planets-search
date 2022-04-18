import React, { Component } from 'react';
import getStarWarsApi from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

class StarWarsProvider extends Component {
  constructor() {
    super();
    this.state = {
      dbStarWars: [],
      error: '',
    };
  }

  requestStarWarsData = async () => {
    try {
      const data = await getStarWarsApi();
      this.setState({
        dbStarWars: [data],
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { Provider } = StarWarsContext;
    const { children } = this.props;
    return (
      <Provider
        value={ { ...this.state,
          requestStarWarsData: this.requestStarWarsData,
        } }
      >
        {children}
      </Provider>
    );
  }
}

export default StarWarsProvider;
