import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

const $template = document.createElement('template');

$template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="lumo-color lumo-typography">
      h2 {
        margin: var(--lumo-space-m) 0;
      }
      .card {
        margin: var(--lumo-space-m);
        padding: var(--lumo-space-m);
        border-radius: var(--lumo-border-radius);
        background: var(--lumo-base-color);
        box-shadow: var(--lumo-box-shadow-s);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($template.content);
