import SourceClass from '@orbit/indexeddb';
import { applyStandardSourceInjections } from 'ember-orbit';

export default {
  create(injections = {}) {
    applyStandardSourceInjections(injections);
    injections.name = 'backup';
    return new SourceClass(injections);
  },
};
