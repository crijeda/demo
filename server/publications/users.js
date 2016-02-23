Meteor.publishComposite("users", function() {
  return {
    find: function() {
      return Meteor.users.find({});
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
