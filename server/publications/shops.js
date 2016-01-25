Meteor.publishComposite("shops", function() {
  return {
    find: function() {
      return Shops.find({});
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
