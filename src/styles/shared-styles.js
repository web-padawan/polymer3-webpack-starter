import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/shadow.js';
import '@vaadin/vaadin-material-styles/typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { inject } from './style-utils.js';

inject(html`
  <dom-module id="shared-styles">
    <template>
      <style include="material-typography">
        h2 {
          margin: 16px 0;
        }

        .card {
          margin: 16px;
          padding: 16px;
          background: var(--material-background-color);
          box-shadow: var(--material-shadow-elevation-4dp);
        }

        a {
          color: inherit;
        }
      </style>
    </template>
  </dom-module>
`);
