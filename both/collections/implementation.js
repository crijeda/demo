Implementation = new Mongo.Collection("implementation");

Implementation.attachSchema(new SimpleSchema({

   material2Id: {
    type: String,
    // autoValue: function() {
    //   return this._id;
    // }
  },
    shopId: {
     type: String,
     optional: false,
    label: "Tienda",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Shops.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
          });
        }
      }
    },
     fab: {
      type: String,
      optional:true,
      label: "Fabricado",
    },
      fabtext: {
      type: String,
      optional:true,
    },
     send: {
      type: String,
      optional:true,
    },
      sendtext: {
      type: String,
      optional:true,
    },
     receive: {
      type: String,
      optional:true,
    },
     receivetext: {
      type: String,
      optional:true,
    },
     install: {
      type: String,
      optional:true,
    },
      installtext: {
      type: String,
      optional:true,
    },
    ok: {
      type: String,
      optional:true,
    },
      oktext: {
      type: String,
      optional:true,
    },
    fileId: {
    type: String,
    optional: true
    }


}));