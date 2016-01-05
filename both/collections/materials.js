Materials = new Mongo.Collection("materials");

Materials.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Materials.attachSchema(new SimpleSchema({
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

  media: {
    type: String,
    label: "Fotografia del Material",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "file"
      }
    }
  }
}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("materials");

 Template.materials.helpers({

  materials: function() {
    var materials = Materials.find().fetch();
    return materials

  },

});

}

TabularTables = {};

TabularTables.Materials = new Tabular.Table({
  name: "Materials",
  autoWidth: false,
  collection: Materials,
  columns: [
    {data: "name", title: "Nombre"},
    {data: "buy", title: "Cantidad Comprada"},
    {data: "stock", title: "Stock Actual"}
  ]

});
