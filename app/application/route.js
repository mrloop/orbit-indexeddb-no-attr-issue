import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;
  @service dataCoordinator;

  async beforeModel() {
    console.log('Sources:', this.dataCoordinator.sourceNames);

    // If a backup source is present, populate the store from backup prior to
    // activating the coordinator
    const backup = this.dataCoordinator.getSource('backup');
    if (backup) {
      const records = await backup.query((q) => q.findRecords());
      await this.store.sync((t) => records.map((r) => t.addRecord(r)));
    }

    await this.dataCoordinator.activate();
    await this.store.query((q) => q.findRecords());

    // create default course
    let course = this.store.cache.findRecords('course')[0];
    if (!course) {
      course = await this.store.addRecord({
        type: 'course',
        name: 'default course',
      });
    }
  }
}
