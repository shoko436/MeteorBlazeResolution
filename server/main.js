import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
  Meteor.methods({
    addResolution: function (title) {
      Resolutions.insert({
        title: title,
        checked: false,
        createdAt: new Date(),
        owner: Meteor.userId(),
        private: false
      });
    },
    deleteResolution: function (id) {
      var res = Resolutions.findOne(id);

      if (res.owner !== Meteor.userId()) {
        throw new Meteor.Error('not authorized.')
      }

      Resolutions.remove(id);
    },
    updateResolution: function (id, checked) {
      var res = Resolutions.findOne(id);

      if (res.owner !== Meteor.userId()) {
        throw new Meteor.Error('not authorized.')
      }
      
      Resolutions.update(id, { $set: { checked: checked } });
    },
    setPrivate: function (id, isPrivate) {
      var res = Resolutions.findOne(id);

      if (res.owner !== Meteor.userId()) {
        throw new Meteor.Error('not authorized.')
      }

      Resolutions.update(id, { $set: { private: isPrivate } });
    }
  });
}