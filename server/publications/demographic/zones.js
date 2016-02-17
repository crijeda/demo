Meteor.publishComposite("zones", function() {
  return {
    find: function() {
      return Zones.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
