Zones = new Mongo.Collection("zones");

// Zones.before.insert(function (userId, doc) {
//   doc.createdAt = moment().toDate();
// });

Zones.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  countryId: {
    type: String,
    label: "Pais",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Countries.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
        });
      }
    }
  }

}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("zones");

 Template.zones.helpers({

  zones: function() {
    var zones = Zones.find().fetch();
    return zones

  }

});

}

TabularTables = {};

TabularTables.Zones = new Tabular.Table({
  name: "Zones",
  autoWidth: true,
  collection: Zones,
  order: [[0, "asc"]],
  columns: [
    // {data: "_id", title: "ID"},
    {data: "name", title: "Nombre"},
    // {data: "countryId", title: "CountryId"},
     { data: "countryId", title: "Pais", render: function (val, type, doc) {
            var x = Countries.findOne(val);
            if(!x)
                 return val + " not found";
            return x.name;
      }
    },
    {tmpl: Meteor.isClient && Template.ButtonShowZones}
  ]

});