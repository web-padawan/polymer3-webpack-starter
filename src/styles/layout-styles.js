import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { inject } from './style-utils.js';

inject(html`
  <custom-style>
    <style include="material-typography material-color-light">
      body {
        background: var(--material-secondary-background-color);
      }
    </style>
  </custom-style>
`);

inject(html`
  <dom-module id="layout-styles" theme-for="vaadin-app-layout">
    <template>
      <style>
        :host {
          background-color: inherit;
        }

        [part='navbar'] {
          color: var(--material-primary-contrast-color);
          background: var(--material-primary-color);
        }
      </style>
    </template>
  </dom-module>
`);

inject(html`
  <dom-module id="drawer-styles" theme-for="vaadin-drawer-toggle">
    <template>
      <style>
        :host {
          color: var(--material-primary-contrast-color);
        }

        :host(:hover) {
          background: rgba(255, 255, 255, 0.12);
        }
      </style>
    </template>
  </dom-module>
`);
