import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import '@vaadin/vaadin-material-styles/typography.js';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout.js';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle.js';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs.js';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab.js';
import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox.js';
import '../styles/layout-styles.js';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from '../routes/urls';
import { onLocationChanged } from '../routes/utils';

/**
 * Starter application shell.
 *
 * @class StarterApp
 * @extends {PolymerElement}
 */
class StarterApp extends PolymerElement {
  static get template() {
    return html`
      <style include="material-typography">
        :host {
          display: block;
        }

        [main-title] {
          font-size: 20px;
          line-height: 1.2;
          font-weight: 400;
        }

        section {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .dark-mode {
          margin: auto 16px 16px;
        }
      </style>

      <vaadin-app-layout>
        <!-- Navbar content -->
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <div main-title slot="navbar">
          <slot></slot>
        </div>

        <!-- Drawer content -->
        <section slot="drawer">
          <vaadin-tabs
            selected="{{selected}}"
            orientation="vertical"
            aria-controls="mainContent"
          >
            <vaadin-tab>
              <a href="/employee-list">Employee list</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/employee-new">New employee</a>
            </vaadin-tab>
          </vaadin-tabs>
          <vaadin-checkbox checked="{{dark}}" class="dark-mode">
            Use dark mode
          </vaadin-checkbox>
        </section>

        <!-- Main content -->
        <main aria-live="polite" id="mainContent">
          <!-- view content -->
        </main>
      </vaadin-app-layout>
    `;
  }

  static get is() {
    return 'starter-app';
  }

  static get properties() {
    return {
      selected: Number,
      dark: {
        type: Boolean,
        observer: '_darkChanged'
      }
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  ready() {
    super.ready();

    this.removeAttribute('unresolved');

    onLocationChanged(this.__onRouteChanged.bind(this));

    import(/* webpackChunkName: "router" */ '../routes/router.js').then(
      router => {
        router.init(this.shadowRoot.querySelector('main'));
      }
    );
  }

  _darkChanged(dark, oldDark) {
    if (dark) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }

  __onRouteChanged(e) {
    switch (e.detail.location.pathname) {
      case EMPLOYEE_LIST:
        this.selected = 0;
        break;
      case NEW_EMPLOYEE:
        this.selected = 1;
        break;
      default:
        this.selected = null;
    }
  }
}

customElements.define(StarterApp.is, StarterApp);
