import styles from './index.module.css';
import { signal } from 'vistajs/core';
import { Component, html } from 'vistajs/dom';
import { boostrap } from 'vistajs/boot';

import logo from '../images/viewjs-logo.svg';

export const app = Component('app-counter', () => {
  const counter = signal(0);

  const increment = () => {
    counter.set(counter() + 1);
  };

  return () => html`
    <div class="${styles.counter_container}">
      <img src="${logo}" />
      <p>VistaJS is running!</p>
      <button onclick=${increment}>counter is ${counter()}</button>
      <a href="https://vistajs.gitbook.io/home" target="_blank"
        >Learn VistaJS!</a
      >
    </div>
  `;
});

const root = document.querySelector('#app') as Element;

boostrap(root, app);
