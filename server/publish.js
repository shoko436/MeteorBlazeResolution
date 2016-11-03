Meteor.publish("resolutions", function () {
  return Resolutions.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId }
    ]
  });
});
