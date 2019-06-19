import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-form/iron-form.js';
import '@vaadin/vaadin-button/theme/material/vaadin-button.js';
import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox.js';
import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/theme/material/vaadin-date-picker.js';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog.js';
import '@vaadin/vaadin-select/theme/material/vaadin-select.js';
import '@vaadin/vaadin-form-layout/theme/material/vaadin-form-layout.js';
import '@vaadin/vaadin-form-layout/theme/material/vaadin-form-item.js';
import '@vaadin/vaadin-item/theme/material/vaadin-item.js';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box.js';
import '@vaadin/vaadin-notification/theme/material/vaadin-notification.js';
import '@vaadin/vaadin-ordered-layout/theme/material/vaadin-vertical-layout.js';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group.js';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button.js';
import '@vaadin/vaadin-text-field/theme/material/vaadin-email-field.js';
import '@vaadin/vaadin-text-field/theme/material/vaadin-text-area.js';
import '@vaadin/vaadin-time-picker/theme/material/vaadin-time-picker.js';
import '@vaadin/vaadin-upload/theme/material/vaadin-upload.js';
import '../styles/shared-styles.js';
import { EMPLOYEE_LIST } from '../routes/urls';
import { navigateTo } from '../routes/utils';

/**
 * New employee view.
 *
 * @class EmployeeNew
 * @extends {PolymerElement}
 */
class EmployeeNew extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <div class="card">
        <iron-form id="form">
          <form>
            <vaadin-vertical-layout>
              <h2>Register a new employee</h2>
              <vaadin-form-layout>
                <vaadin-form-item>
                  <label slot="label">Title</label>
                  <vaadin-select class="full-width">
                    <template>
                      <vaadin-list-box>
                        <vaadin-item>Mr</vaadin-item>
                        <vaadin-item>Mrs</vaadin-item>
                        <vaadin-item>Ms</vaadin-item>
                        <vaadin-item>Miss</vaadin-item>
                        <vaadin-item>Other</vaadin-item>
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">First Name</label>
                  <vaadin-text-field
                    required
                    error-message="Please enter first name"
                    class="full-width"
                  ></vaadin-text-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Last Name</label>
                  <vaadin-text-field
                    required
                    error-message="Please enter last name"
                    class="full-width"
                  ></vaadin-text-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Email</label>
                  <vaadin-email-field
                    required
                    error-message="Please enter email"
                    class="full-width"
                  ></vaadin-email-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Birth date</label>
                  <vaadin-date-picker class="full-width"></vaadin-date-picker>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Dietary Restrictions</label>
                  <vaadin-combo-box
                    class="full-width"
                    items="[[dietarys]]"
                  ></vaadin-combo-box>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Add profile picture</label>
                  <vaadin-upload
                    class="full-width"
                    max-files="1"
                  ></vaadin-upload>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Preferred language</label>
                  <vaadin-radio-group value="{{radioValue}}">
                    <vaadin-radio-button value="en">
                      English
                    </vaadin-radio-button>
                    <vaadin-radio-button value="fr">
                      French
                    </vaadin-radio-button>
                    <vaadin-radio-button value="de">
                      German
                    </vaadin-radio-button>
                  </vaadin-radio-group>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Arrival hour</label>
                  <vaadin-time-picker class="full-width"></vaadin-time-picker>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Departure</label>
                  <vaadin-time-picker class="full-width"></vaadin-time-picker>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <label slot="label">Free word (allergies)</label>
                  <vaadin-text-area class="full-width"></vaadin-text-area>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <vaadin-checkbox checked="{{_canSubmit}}">
                    I have read the
                    <a href="#" on-click="toggleDialog">terms and conditions</a>
                  </vaadin-checkbox>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <vaadin-button
                    disabled$="[[!_canSubmit]]"
                    on-click="_submitForm"
                    >Submit
                  </vaadin-button>
                </vaadin-form-item>
              </vaadin-form-layout>
            </vaadin-vertical-layout>
          </form>
        </iron-form>
      </div>

      <vaadin-notification opened="{{formSubmittedOpen}}" duration="2000">
        <template>
          <div>
            <p><b>Submitted</b></p>
            <p>Your registration was successful</p>
          </div>
        </template>
      </vaadin-notification>

      <vaadin-notification opened="{{formInvalidOpen}}">
        <template>
          <div>
            <p><b>Some fields invalid</b></p>
            <p>Please fill all the required fields and try again</p>
          </div>
        </template>
      </vaadin-notification>

      <vaadin-dialog
        no-close-on-esc
        no-close-on-outside-click
        opened="{{dialogOpen}}"
      >
        <template>
          <vaadin-vertical-layout theme="spacing">
            <div>
              <p><b>Terms and conditions</b></p>
              <p>
                This software might just work or not, there is no third option.
              </p>
            </div>
            <vaadin-button on-click="toggleDialog">Ok</vaadin-button>
          </vaadin-vertical-layout>
        </template>
      </vaadin-dialog>
    `;
  }

  static get is() {
    return 'employee-new';
  }
  static get properties() {
    return {
      dietarys: {
        type: Array,
        value: () => [
          'Ovo-Vegetarian',
          'Lacto-Vegetarian',
          'Lacto-Ovo Vegetarians',
          'Pescetarians',
          'Other'
        ]
      },
      dialogOpen: Boolean,
      formSubmittedOpen: {
        type: Boolean,
        observer: '_formSubmittedOpenChanged'
      },
      formInvalidOpen: Boolean,
      radioValue: String
    };
  }

  toggleDialog(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dialogOpen = !this.dialogOpen;
  }

  _formSubmittedOpenChanged(value, oldValue) {
    // once notification is closed, redirect to the list page
    if (oldValue && !value) {
      navigateTo(EMPLOYEE_LIST);
    }
  }

  _submitForm() {
    if (this.$.form.validate()) {
      this.formSubmittedOpen = true;
    } else {
      this.formInvalidOpen = true;
    }
  }
}

customElements.define(EmployeeNew.is, EmployeeNew);
