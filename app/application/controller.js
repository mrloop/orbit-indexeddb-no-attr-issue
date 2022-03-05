import Controller from '@ember/controller';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked timeTrialName;

  @service store;

  @action onNameInput({ target: { value } }) {
    this.timeTrialName = value;
  }

  @action addTimeTrial(evt) {
    evt.preventDefault();
    this.store.addRecord({
      type: 'timeTrial',
      name: this.timeTrialName,
      course: this.course,
    });

    // if this is not undefined but instead set to 'null' or '""' then will work
    // but undefined results in no attributes key being saved to indexeddb store and when app is reloaded then `timeTrial.course.name` is not displayed correctly
    // if the timeTrial model is saved without any @attr set then no attributes key saved to indexeddb and when app is reloaded `timeTrial.course.name` does not display anything
    this.timeTrialName = undefined;
  }

  get timeTrials() {
    return this.store.cache.liveQuery((q) => q.findRecords('timeTrial'));
  }

  get course() {
    return this.store.cache.findRecords('course')[0];
  }
}
