Meteor.publishComposite("branchs", function() {
  return {
    find: function() {
      return Branchs.find({});
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
