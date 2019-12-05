import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { Lists } from '../../models/list.model';

export const addListMethod = new ValidatedMethod({
  name: 'add-list',

  validate: new SimpleSchema({
    name: String
  }).validator(),

  run({ name }: { name: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    return Lists.collection.insert({ name });
  }
});

export const removeListMethod = new ValidatedMethod({
  name: 'remove-list',

  validate: new SimpleSchema({
    listId: String
  }).validator(),

  run({ listId }: { listId: string }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    return Lists.collection.remove({ _id: listId });
  }
});
