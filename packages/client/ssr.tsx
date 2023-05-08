import { renderToString } from 'react-dom/server'
import { App } from './src/App';
import React from 'react';

export function render() {
  return renderToString(
    <App />
  )
}
