Materials2 = new Mongo.Collection("materials2");

Materials2.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Materials2.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  buy: {
    type: Number,
    label: "Cantidad Comprada"
  },
   stock: {
    type: Number,
    label: "Stock Actual"
  },
  fileId: {
    type: String
  }

}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("materials2");
  Meteor.subscribe("uploads");

 Template.materials2.helpers({

  materials2: function() {
    var materials2 = Materials2.find().fetch();
    return materials2

  },

});

}

TabularTables = {};

TabularTables.Materials2 = new Tabular.Table({
  name: "Materials2",
  autoWidth: false,
  collection: Materials2,
  columns: [
    {data: "name", title: "Nombre"},
    {data: "buy", title: "Cantidad Comprada"},
    {data: "stock", title: "Stock Actual"}
  ]

});
