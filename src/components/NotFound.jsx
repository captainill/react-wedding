/**
 *
 *
 */

import React from 'react';

export default class NotFound extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className='not-found'>
        <p>This Route was not found!</p>
      </div>
    );

  }
};
