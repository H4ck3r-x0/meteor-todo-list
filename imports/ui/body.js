import { Template } from 'meteor/templating';
import { ReactiveDict} from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});


Template.body.helpers({
  tasks() {
    const instance = Template.instance();

      if (instance.state.get('hideCompleted')) {
        // If hide completed is checked, filter tasks
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
      // Otherwise, return all of the tasks
         return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: {$ne: true} }).count();
  },
});

Template.body.events({
  'submit form.new-task'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    if (text == '') {
      alert('empty');
      return false;
    }
    Meteor.call('tasks.insert', text);

    target.text.value = '';

  },
  'change .hide-completed'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
