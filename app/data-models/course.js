import { Model, attr, hasMany } from 'ember-orbit';

export default class Course extends Model {
  @attr('string') name;
  @hasMany('timeTrial', { inverse: 'course' }) timeTrials;
}
