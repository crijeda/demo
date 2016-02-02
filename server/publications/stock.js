Meteor.publishComposite("stock", function() {
  return {
    find: function() {
      return Stock.find({});
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
