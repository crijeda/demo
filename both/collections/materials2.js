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
  campaignId: {
    type: String,
    label: "Campaña",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Campaigns.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
        });
      }
    }
  },
  detail: {
    type: [Object],
    optional: true,

    },
    'detail.$._id': {
      type: String,
      // autoValue: function() {
      // return Random.id();
      // }
    },

    'detail.$.shopId': {
     type: String,
     optional: true,
    label: "Tienda",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Shops.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
          });
        }
      }
    },
     'detail.$.fab': {
      type: Boolean,
      optional:true,
      label: "Fabricado",
    },
      'detail.$.fabtext': {
      type: String,
      optional:true,
    },
     'detail.$.send': {
      type: Boolean,
      optional:true,
    },
      'detail.$.sendtext': {
      type: String,
      optional:true,
    },
     'detail.$.receive': {
      type: Boolean,
      optional:true,
    },
      'detail.$.receivetext': {
      type: String,
      optional:true,
    },
     'detail.$.install': {
      type: Boolean,
      optional:true,
    },
      'detail.$.installtext': {
      type: String,
      optional:true,
    },
    'detail.$.ok': {
      type: Boolean,
      optional:true,
    },
      'detail.$.oktext': {
      type: String,
      optional:true,
    },
  //  stock: {
  //   type: Number,
  //   optinal: true,
  //   label: "Stock Actual"
  // },
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
   detail: function () {
        var detail = _.pluck(Materials2.find({_id:this._id}).fetch(), 'detail');
        return detail;
        // console.log(timeline);
    },
    countdetailbuy: function () {
        var detail = _.pluck(Materials2.find({_id:this._id}).fetch(), 'detail');
        return detail[0].length;
        // console.log(timeline);
    },
    countdetailstock: function () {
        var detail = _.pluck(Materials2.find({_id:this._id}).fetch(), 'detail');
        return detail[0].length;
        // console.log(timeline);
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
    // {data: "stock", title: "Stock Actual"}
  ]

});
