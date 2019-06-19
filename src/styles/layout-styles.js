import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { inject } from './style-utils.js';

inject(html`
  <dom-module id="layout-styles" theme-for="vaadin-app-layout">
    <template>
      <style>
        [part='drawer'] {
          background: var(--lumo-base-color);
        }

        [part='navbar'] {
          align-items: center;
          color: var(--lumo-base-color);
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
          width: var(--lumo-size-l);
          height: var(--lumo-size-l);
          margin: 0 var(--lumo-space-m);
          padding: 0;
          background: transparent;
          color: currentColor;
        }
      </style>
    </template>
  </dom-module>
`);
