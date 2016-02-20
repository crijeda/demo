Meteor.publishComposite("implementation", function() {
  return {
    find: function() {
      return Implementation.find({});
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
