import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
  Meteor.subscribe('resolutions');

  Template.body.helpers({
    resolutions: function () {
      if (Session.get('hideFinished')) {
        //Revisa si la propiedad checked es false
        return Resolutions.find({ checked: { $ne: true } });
      } else {
        return Resolutions.find();
      }
    },
    hideFinished: function () {
      return Session.get('hideFinished');
    }
  });

  Template.body.events({
    'submit .new-resolution': function (event) {
      var title = event.target.title.value;

      Meteor.call('addResolution', title);

      event.target.title.value = "";

      return false;
    },
    'change .hide-finished': function (event) {
      Session.set('hideFinished', event.target.checked);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}