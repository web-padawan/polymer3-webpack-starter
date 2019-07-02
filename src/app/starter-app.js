import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '@vaadin/vaadin-tabs/vaadin-tab.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
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
      <style include="lumo-typography">
        :host {
          display: block;
        }

        [main-title] {
          padding: var(--lumo-space-m) 0;
          font-size: var(--lumo-font-size-xl);
          line-height: var(--lumo-line-height-m);
          font-weight: 400;
        }

        section {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .dark-mode {
          margin: auto var(--lumo-space-m) var(--lumo-space-m);
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
