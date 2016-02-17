Countries = new Mongo.Collection("countries");

// Countries.before.insert(function (userId, doc) {
//   doc.createdAt = moment().toDate();
// });

Countries.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  }
}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("countries");

 Template.countries.helpers({

  countries: function() {
    var countries = Countries.find().fetch();
    return countries

  },

});

}

TabularTables = {};

TabularTables.Countries = new Tabular.Table({
  name: "Countries",
  autoWidth: true,
  collection: Countries,
  order: [[0, "asc"]],
  columns: [
    // {data: "_id", title: "ID"},
    {data: "name", title: "Nombre"},
    {tmpl: Meteor.isClient && Template.ButtonShowCountries}
  ]

});