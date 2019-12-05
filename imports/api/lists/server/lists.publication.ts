import { Lists } from '../../../models/list.model';

Meteor.publish('lists-publication', function() {
  if (!this.userId) return;

  return Lists.collection.find();
});