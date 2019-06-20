import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { inject } from './style-utils.js';

inject(html`
  <custom-style>
    <style include="lumo-color">
      html {
        background-image: linear-gradient(
          var(--lumo-contrast-5pct),
          var(--lumo-contrast-5pct)
        );
      }
    </style>
  </custom-style>
`);

inject(html`
  <dom-module id="layout-styles" theme-for="vaadin-app-layout">
    <template>
      <style>
        [part='drawer'] {
          background: var(--lumo-base-color);
        }

        [part='navbar'] {
          color: var(--lumo-primary-contrast-color);
          background: var(--lumo-primary-color);
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
          margin: 0 var(--lumo-space-m);
          color: currentColor;
        }
      </style>
    </template>
  </dom-module>
`);
