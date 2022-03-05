import { Model, attr, hasOne, hasMany } from 'ember-orbit';

export default class TimeTrial extends Model {
  @attr('string') name;
  @hasOne('course', { inverse: 'timeTrials' }) course;
}
