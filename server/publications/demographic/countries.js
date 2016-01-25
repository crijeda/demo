Meteor.publishComposite("countries", function() {
  return {
    find: function() {
      return Countries.find({});
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
