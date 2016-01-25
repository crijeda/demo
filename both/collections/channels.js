Channels = new Mongo.Collection("channels");

// Channels.before.insert(function (userId, doc) {
//   doc.createdAt = moment().toDate();
// });

Channels.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  }
}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("channels");

 Template.channels.helpers({

  channels: function() {
    var channels = Channels.find().fetch();
    return channels

  },

});

}

TabularTables = {};

TabularTables.Channels = new Tabular.Table({
  name: "Channels",
  autoWidth: true,
  collection: Channels,
  order: [[0, "asc"]],
  columns: [
    // {data: "_id", title: "ID"},
    {data: "name", title: "Nombre"},
    {tmpl: Meteor.isClient && Template.ButtonShowChannels}
  ]

});