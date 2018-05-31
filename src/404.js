import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import './shared-styles.js';
class App404 extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        background: transparent;
      }
    </style>
    <div class="card">
      <h1>404, page not found...</h1>
    </div>
`;
  }

  static get is() {
    return 'app-404';
  }
}
window.customElements.define(App404.is, App404);
