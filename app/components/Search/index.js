/**
 *
 * Search
 *
 */

import React from 'react';
import { Input, Button } from 'antd';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// const { Search } = Input;
class Searchx extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.handlerFromParent(this.state.inputField);
    this.setState({
      inputField: '',
    });
  }

  handleChange(event) {
    this.setState({
      inputField: event.target.value,
    });
  }

  render() {
    return (
      <div style={{ background: '#fafafa', padding: '20px' }}>
        <div style={{ display: 'flex' }}>
          <Input
            placeholder="Search"
            value={this.state.inputField}
            onChange={this.handleChange}
          />
          <Button type="primary" onClick={this.submitHandler}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}

export default Searchx;
