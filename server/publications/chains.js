Meteor.publishComposite("chains", function() {
  return {
    find: function() {
      return Chains.find({});
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
