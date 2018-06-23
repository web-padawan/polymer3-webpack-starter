import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '../styles/shared-styles.js';

/**
 * 404 view.
 *
 * @class App404
 * @extends {PolymerElement}
 */
class App404 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block
        }
      </style>
      <div class="card">
        <h2>404</h2>
        <p>Page not found.</p>
      </div>
    `;
  }

  static get is() {
    return 'app-404';
  }
}

customElements.define(App404.is, App404);
