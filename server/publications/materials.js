Meteor.publishComposite("materials", function() {
  return {
    find: function() {
      return Materials.find({});
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