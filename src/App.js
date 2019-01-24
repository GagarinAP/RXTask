import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, lifecycle } from 'recompose';
import { Container } from 'reactstrap';
import { Table, Header } from './components';
import { setItems } from './components/tableReducer';

import './App.css';
import properties$ from './mock';

const App = () => (
  <Container>
    <Header />
    <Table />
  </Container>
);

export default compose(
  setDisplayName('App'),
  connect(null, { setItems }),
  lifecycle({
    componentDidMount() {
      let array = {};
      properties$.subscribe(data => array = ({ ...array, [data.id]: data }));
      setInterval(() => {
        this.props.setItems(array);
      }, 2000);
    }
  })
)(App);
