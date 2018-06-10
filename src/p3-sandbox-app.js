import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-lumo-styles/icons.js';
import {Router} from '@vaadin/router/dist/vaadin-router.js';
import './shared-styles.js';

class P3SandboxApp extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        app-header {
          color: var(--lumo-base-color);
          background: var(--lumo-primary-color);
        }
        vaadin-button {
          margin-right: var(--lumo-space-m);
          background: var(--lumo-tint);
        }
        vaadin-item {
          padding: 0;
        }
        a {
          display: block;
          color: inherit;
          outline: none;
          line-height: 36px;
        }
        a:hover {
          text-decoration: none;
        }
      </style>

      <app-drawer-layout fullbleed narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <vaadin-list-box selected="{{selected}}">
            <vaadin-item>
              <a href="/employee-list">Employee list</a>
            </vaadin-item>
            <vaadin-item>
              <a href="/employee-new">New employee</a>
            </vaadin-item>
          </vaadin-list-box>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout>
          <app-header slot="header">
            <app-toolbar>
              <vaadin-button theme="icon" hidden$="[[!narrow]]" aria-label="Toggle menu" drawer-toggle>
                <iron-icon icon="lumo:menu"></iron-icon>
              </vaadin-button>
              <div main-title>Vaadin App</div>
            </app-toolbar>
          </app-header>
          <main>
            <!-- view content -->
          </main>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get is() {
    return 'p3-sandbox-app';
  }

  static get properties() {
    return {
      selected: Number
    };
  }

  ready() {
    super.ready();

    const router = new Router(this.shadowRoot.querySelector('main'));
    router.setRoutes([
      {
        path: '/',
        redirect: '/employee-list'
      },
      {
        path: '/employee-list',
        action: context => new Promise(resolve => {
          import(/* webpackChunkName: "employee-list" */ './employee-list.js')
            .then(() => {
              this.selected = 0;
              resolve(context.component('employee-list'));
            });
        })
      },
      {
        path: '/employee-new',
        action: context => new Promise(resolve => {
          import(/* webpackChunkName: "employee-new" */ './employee-new.js')
            .then(() => {
              this.selected = 1;
              resolve(context.component('employee-new'));
            });
        })
      },
      {
        path: '(.*)+',
        action: context => new Promise(resolve => {
          import(/* webpackChunkName: "404" */ './404.js')
            .then(() => {
              this.selected = null;
              resolve(context.component('app-404'));
            });
        })
      },
    ]);
  }
}

customElements.define(P3SandboxApp.is, P3SandboxApp);
