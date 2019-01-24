import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Table as TableContent, Row, Col, Button } from 'reactstrap';
import {
  compose,
  setDisplayName,
  onlyUpdateForKeys
} from "recompose";
import {
  itemsSelector,
  elementSort,
  clear,
  setFavorites,
  unSetFavorites,
  favoriteSelector
} from '../tableReducer';

const ButtonStyle = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonClearStyle = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`;

const Item = onlyUpdateForKeys(['item'])(({ item, setFavorites }) => (
  <tr>
    <td><div dangerouslySetInnerHTML={{ __html: item.id }} /></td>
    <td><div dangerouslySetInnerHTML={{ __html: item.address }} /></td>
    <td>{item.price}</td>
    <td>{item.lastUpdate}</td>
    <td><div dangerouslySetInnerHTML={{ __html: item.type }} /></td>
    <td>
      <ButtonStyle color="link" onClick={() => setFavorites(item)}>
        <i className="far fa-heart"/>
      </ButtonStyle>
    </td>
  </tr>
));

const ItemFav = onlyUpdateForKeys(['item'])(({ item, unSetFavorites }) => (
  <tr>
    <td><div dangerouslySetInnerHTML={{ __html: item.id }} /></td>
    <td><div dangerouslySetInnerHTML={{ __html: item.address }} /></td>
    <td>{item.price}</td>
    <td>{item.lastUpdate}</td>
    <td><div dangerouslySetInnerHTML={{ __html: item.type }} /></td>
    <td>
      <ButtonStyle color="link" onClick={() => unSetFavorites(item)}>
        <i className="fas fa-heart" />
      </ButtonStyle>
    </td>
  </tr>
));

const Table = (props) => {
  const setSortDrop = (el) => {
    if (props.el === el) {
      if (props.sort === 'ASC') {
        return props.elementSort(el, 'DESC');
      }
      return props.elementSort(el, 'ASC');
    }
    return props.elementSort(el, 'ASC');
  };
  return (
    <div>
      <Row>
        <Col>
          <ButtonClearStyle outline color="info" onClick={() => props.clear()}>
            Clear
          </ButtonClearStyle>
        </Col>
      </Row>
      <Row>
        <Col>
          <TableContent size="sm">
            <thead>
            <tr>
              <th>
                <ButtonStyle outline={props.el !== 'id'} color="primary" onClick={() => setSortDrop('id')}>
                  # {props.el === 'id' && props.sort}
                </ButtonStyle>
              </th>
              <th>
                <ButtonStyle outline={props.el !== 'address'} color="primary" onClick={() => setSortDrop('address')}>
                  Address {props.el === 'address' && props.sort}
                </ButtonStyle>
              </th>
              <th>
                <ButtonStyle outline={props.el !== 'price'} color="primary" onClick={() => setSortDrop('price')}>
                  Price {props.el === 'price' && props.sort}
                </ButtonStyle>
              </th>
              <th>
                <ButtonStyle outline={props.el !== 'lastUpdate'} color="primary" onClick={() => setSortDrop('lastUpdate')}>
                  Last Update {props.el === 'lastUpdate' && props.sort}
                </ButtonStyle>
              </th>
              <th>
                <ButtonStyle outline={props.el !== 'type'} color="primary" onClick={() => setSortDrop('type')}>
                  Type {props.el === 'type' && props.sort}
                </ButtonStyle>
              </th>
              <th>
                <ButtonStyle outline color="primary">
                  Fav
                </ButtonStyle>
              </th>
            </tr>
            </thead>
            <tbody>
            {props.fav.map(item => (
              <ItemFav
                key={`fav_${item.price}${item.id}${item.lastUpdate}`}
                item={item}
                unSetFavorites={props.unSetFavorites}
              />
            ))}
            {props.items.map(item => (
              <Item
                key={`items_${item.price}${item.id}${item.lastUpdate}`}
                item={item}
                setFavorites={props.setFavorites}
              />
            ))}
            </tbody>
          </TableContent>
        </Col>
      </Row>
    </div>
  );
};

export default compose(
  setDisplayName('Table'),
  connect(
    state => ({
      fav: favoriteSelector(state),
      items: itemsSelector(state),
      el: state.table.el,
      sort: state.table.sort
    }), {
      elementSort,
      clear,
      setFavorites,
      unSetFavorites
    })
)(Table);
