import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
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

      <iron-ajax auto url="employees.json" handle-as="json" last-response="{{_employees}}"></iron-ajax>

      <div class="card">
        <vaadin-grid items="[[_employees]]">
          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-filter aria-label="First Name" path="firstName" value="[[_filterFirstName]]">
                <vaadin-text-field slot="filter" placeholder="First Name" value="{{_filterFirstName}}" focus-target></vaadin-text-field>
              </vaadin-grid-filter>
            </template>
            <template>[[item.firstName]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-filter aria-label="Last Name" path="lastName" value="[[_filterLastName]]">
                <vaadin-text-field slot="filter" placeholder="Last Name" value="{{_filterLastName}}"></vaadin-text-field>
              </vaadin-grid-filter>
            </template>
            <template>[[item.lastName]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">Email</template>
            <template>[[item.email]]</template>
          </vaadin-grid-column>
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
      },
      _filterFirstName: String,
      _filterLastName: String
    };
  }
}

customElements.define(EmployeeList.is, EmployeeList);
