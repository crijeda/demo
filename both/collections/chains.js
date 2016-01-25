Chains = new Mongo.Collection("chains");

Chains.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Chains.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
    channelId: {
    type: String,
    label: "Canal",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Channels.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
        });
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
  Meteor.subscribe("chains");
  Meteor.subscribe("uploads");

 Template.chains.helpers({

  chains: function() {
    var chains = Chains.find().fetch();
    return chains

  },

});

}

TabularTables = {};

TabularTables.Chains = new Tabular.Table({
  name: "Chains",
  autoWidth: false,
  collection: Chains,
  columns: [
   // { data: "_id", title: "Logo", render: function (val, type, doc) {
   //          var x = Chains.findOne(val);
   //          return '<img src="localhost:3000/cfs/files/uploads/'+x.fileId+'" alt="" height="42" width="42">';
   //  }},
    {data: "name", title: "Nombre"},
    { data: "channelId", title: "Canal", render: function (val, type, doc) {
            var x = Channels.findOne(val);
            if(!x)
                 return val + " not found";
            return x.name;
      }},
    {tmpl: Meteor.isClient && Template.ButtonShowChains}
  ]

});
