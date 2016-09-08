import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './task.html';


Template.task.events({
  'click .complete'(event) {
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .remove'(event) {
    Meteor.call('tasks.remove', this._id);
  },
});
