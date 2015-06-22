/**
 * 
 * 
 */

import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component{
  render() {
    return (
      <footer>
        <p>Made by the <a href="http://ofitsownkind.com">Brother of the bride :P</a></p>
        <p>You can <a href="mailto:jonthomas0@gmail.com">email</a> me if you have photos to add.</p>
        <p>The site's <a href="https://github.com/captainill/react-wedding">source</a> is on Github</p>
      </footer>
    );
  }
};
