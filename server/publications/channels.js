Meteor.publishComposite("channels", function() {
  return {
    find: function() {
      return Channels.find({});
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
