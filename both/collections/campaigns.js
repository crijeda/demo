Campaigns = new Mongo.Collection("campaigns");

Campaigns.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

TimelineSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      return moment().toDate();
    }
  },
  user: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    }
  },
  type: {
    type: String,
    optional: true,
    allowedValues: ["Comunicado", "Petición", "Imagen", "Video"]
  },
  url: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "url"
      }
    }
  },
  userIdsend: {
    type: String,
    optional: true,
    label: "Receptor",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Meteor.users.find().fetch(), 'username')), function (c, i) {
          return {label: c.username, value: c._id};
        });
      }
    }
  },
  userIdreceive: {
    type: String,
    optional: true,
    label: "Receptor",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Meteor.users.find().fetch(), 'username')), function (c, i) {
          return {label: c.username, value: c._id};
        });
      }
    }
  },
  comment: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
   fileId: {
    optional: true,
      type: String
    },

});

Campaigns.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  fileId: {
    type: String
  },
   description: {
    type: String
  },
  color: {
    type: String,
    label:"Color de la Campaña",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "color"
      }
    }
  },
   timeline: {
    optional: true,
    type: [TimelineSchema],
    label: 'Timeline'
    },

}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("campaigns");
  Meteor.subscribe("uploads");

 Template.campaigns.helpers({

  campaigns: function() {
    var campaigns = Campaigns.find().fetch();
    return campaigns

  },

});

}

TabularTables = {};

TabularTables.Campaigns = new Tabular.Table({
  name: "Campaigns",
  autoWidth: false,
  collection: Campaigns,
  columns: [
    {data: "name", title: "Nombre"},
    {data: "description", title: "Descripción"},

  ]

});
