import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-selector/iron-selector.js';
import {Router} from '@vaadin/router';
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
          background-color: var(--lumo-primary-color);
        }
        .drawer-list {
          margin: var(--lumo-space-tall-m);
        }
        .drawer-list a {
          display: block;
          padding: 0 var(--lumo-space-m);
          color: var(--lumo-secondary-text-color);
          line-height: var(--lumo-size-m);
          text-decoration: none;
        }
        .drawer-list a.iron-selected {
          color: var(--lumo-body-text-color);
          font-weight: bold;
        }
      </style>

      <app-drawer-layout fullbleed>
        <!-- Drawer content -->
        <app-drawer slot="drawer">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector attr-for-selected="href" class="drawer-list" role="navigation">
            <a href="/employee-list">Employee list</a>
            <a href="/employee-new">New employee</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout>
          <app-header slot="header">
            <app-toolbar>
              <div main-title>p3-dev-app</div>
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
              resolve(context.component('employee-list'));
            });
        })
      },
      {
        path: '/employee-new',
        action: context => new Promise(resolve => {
          import(/* webpackChunkName: "employee-new" */ './employee-new.js')
            .then(() => {
              resolve(context.component('employee-new'));
            });
        })
      },
      {
        path: '(.*)+',
        action: context => new Promise(resolve => {
          import(/* webpackChunkName: "404" */ './404.js')
            .then(() => {
              resolve(context.component('app-404'));
            });
        })
      },
    ]);
  }
}
window.customElements.define(P3SandboxApp.is, P3SandboxApp);
