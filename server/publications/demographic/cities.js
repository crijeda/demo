Meteor.publishComposite("cities", function() {
  return {
    find: function() {
      return Cities.find({});
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
