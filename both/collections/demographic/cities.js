Cities = new Mongo.Collection("cities");

// Cities.before.insert(function (userId, doc) {
//   doc.createdAt = moment().toDate();
// });

Cities.attachSchema(new SimpleSchema({
 name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  zoneId: {
    type: String,
    label: "Zona",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Zones.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
        });
      }
    }
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
  Meteor.subscribe("cities");

 Template.cities.helpers({

  cities: function() {
    var cities = Cities.find().fetch();
    return cities

  },

});

}

TabularTables = {};

TabularTables.Cities = new Tabular.Table({
  name: "Cities",
  autoWidth: false,
  collection: Cities,
  order: [[0, "asc"]],
  columns: [
    // {data: "_id", title: "ID"},
    {data: "name", title: "Nombre"},
    // {data: "countryId", title: "CountryId"},
    { data: "zoneId", title: "Zona", render: function (val, type, doc) {
            var x = Zones.findOne(val);
            if(!x)
                 return val + " not found";
            return x.name;
      }
    },
     { data: "countryId", title: "Pais", render: function (val, type, doc) {
            var x = Countries.findOne(val);
            if(!x)
                 return val + " not found";
            return x.name;
      }
    },
    {tmpl: Meteor.isClient && Template.ButtonShowCities}
  ]

});