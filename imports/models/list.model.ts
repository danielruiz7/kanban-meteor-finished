import { MongoObservable } from 'meteor-rxjs';
import SimpleSchema from 'simpl-schema';

export interface IList {
  _id?: string,
  name: string
}

export const ListSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    min: 3,
    max: 12
  }
});

export const Lists = new MongoObservable.Collection<IList>('lists');

Lists.collection.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Lists.collection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});