Brands = new Mongo.Collection("brands");

Brands.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Brands.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  category: {
    type: String,
    optional: true,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Masivo", value: "Masivo"},
          {label: "Premium", value: "Premium"}
        ];
      }
    }
  },
  fileId: {
    type: String,
    optional: true
  }

}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("brands");
  Meteor.subscribe("uploads");

 Template.brands.helpers({

  brands: function() {
    var brands = Brands.find().fetch();
    return brands

  },

});

}

TabularTables = {};

TabularTables.Brands = new Tabular.Table({
  name: "Brands",
  autoWidth: false,
  collection: Brands,
  columns: [
    {data: "name", title: "Nombre"},
    {data: "category", title: "Categoria"},
    {tmpl: Meteor.isClient && Template.ButtonShowBrands}
  ]

});
