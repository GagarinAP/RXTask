import React from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'reactstrap';
import {
  compose,
  setDisplayName
} from "recompose";
import styled from 'styled-components';
import { setSearch } from '../tableReducer';

const RowStyle = styled(Row)`
  padding: 2rem 0;
`;

const Header = ({ search, setSearch }) => (
  <RowStyle>
    <Col>
      <Input placeholder="Search by ID, Address and Type" value={search} onChange={e => setSearch(e.target.value)}/>
    </Col>
  </RowStyle>
);

export default compose(
  setDisplayName('Header'),
  connect(state => ({ search: state.table.search }), { setSearch })
)(Header);
