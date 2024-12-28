import styles from './index.module.css';
import { signal } from 'viewjs/core';
import { Component, html } from 'viewjs/dom';
import { boostrap } from 'viewjs/boot';

import logo from '../images/viewjs-logo.svg';

export const app = Component('app-counter', () => {
  const counter = signal(0);

  const increment = () => {
    counter.set(counter() + 1);
  };

  return () => html`
    <div class="${styles.counter_container}">
      <img src="${logo}" />
      <p>ViewJS is running!</p>
      <button onclick=${increment}>counter is ${counter()}</button>
      <a href="https://viewjs.gitbook.io/home" target="_blank">Learn ViewJS!</a>
    </div>
  `;
});

const root = document.querySelector('#app') as Element;

boostrap(root, app);
