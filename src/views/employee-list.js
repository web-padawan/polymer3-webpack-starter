import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-filter-column.js';
import '../styles/shared-styles.js';

/**
 * Employee list view.
 *
 * @class EmployeeList
 * @extends {PolymerElement}
 */
class EmployeeList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        vaadin-grid-filter,
        vaadin-text-field {
          width: 100%;
        }
      </style>

      <iron-ajax
        auto
        url="/api/users"
        handle-as="json"
        last-response="{{_employees}}"
      ></iron-ajax>

      <div class="card">
        <vaadin-grid items="[[_employees]]">
          <vaadin-grid-filter-column
            path="firstName"
          ></vaadin-grid-filter-column>
          <vaadin-grid-filter-column
            path="lastName"
          ></vaadin-grid-filter-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }

  static get is() {
    return 'employee-list';
  }

  static get properties() {
    return {
      _employees: {
        type: Array,
        value: () => []
      }
    };
  }
}

customElements.define(EmployeeList.is, EmployeeList);
