Meteor.publishComposite("materials2", function() {
  return {
    find: function() {
      return Materials2.find({});
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
