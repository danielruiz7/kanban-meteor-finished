import { MongoObservable } from 'meteor-rxjs';
import SimpleSchema from 'simpl-schema';

export interface ITask {
  _id?: string,
  title: string,
  listId: string,
  user: {
    _id: string, // ref to users collection
    username: string // denormalized
  }
};

export const TaskSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    min: 3,
    max: 12
  },
  listId: {
    type: String
  },
  user: {
    type: Object
  },
  'user._id': String,
  'user.username': String
});

export const Tasks = new MongoObservable.Collection<ITask>('tasks');

Tasks.collection.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Tasks.collection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});