import { Tasks } from '../../../models/task.model';

Meteor.publish('tasks-publication', function() {
  if (!this.userId) {
    throw new Meteor.Error('Not authorized');
  }

  return Tasks.collection.find();
});