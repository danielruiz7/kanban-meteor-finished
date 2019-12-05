import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { Lists } from '../../models/list.model';
import { Tasks } from '../../models/task.model';

export const addTaskMethod = new ValidatedMethod({
  name: 'add-task',

  validate: new SimpleSchema({
    title: String,
    listId: String
  }).validator(),

  run({ title, listId }: {title: string, listId: string}) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const list = Lists.collection.findOne(listId);
    if (!list) {
      throw new Meteor.Error('List does not exist');
    }

    const user = Meteor.user();

    return Tasks.collection.insert({
      title,
      listId,
      user: {
        _id: user._id,
        username: user.username
      }
    });
  }
});

export const removeTaskMethod = new ValidatedMethod({
  name: 'remove-task',

  validate: new SimpleSchema({
    taskId: String
  }).validator(),

  run({ taskId }: { taskId: string }) {

    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    Tasks.collection.remove(taskId);
  }
});