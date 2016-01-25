Shops = new Mongo.Collection("shops");

Shops.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

ContactSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  lastname: {
    type: String,
    label: 'Apellido'
  },
  position: {
    type: String,
    label: 'Cargo'
  },
  email: {
    type: String,
    label: 'Email'
  },
  phone: {
    type: String,
    label: 'Telefono'
  }
});

Shops.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  code: {
    type: String,
    label: "Codigo Sucursal",
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
  address: {
    type: String,
    label: "Dirección",
    max: 200
  },
  phone: {
    type: String,
    label: "Teléfono",
    autoform: {
      afFieldInput: {
        type: "tel"
      }
    }
  },
  lat: {
    type: String,
    label: "latitud",
    max: 200
  },
  lon: {
    type: String,
    label: "longitud",
    max: 200
  },

  // buy: {
  //   type: Number,
  //   label: "Cantidad Comprada"
  // },
  //  stock: {
  //   type: Number,
  //   label: "Stock Actual"
  // },
  fileId: {
    type: String,
    optional: true
  },
  contact: {
    type: [ContactSchema],
    label: 'CONTACTO'
  }

}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("shops");
  Meteor.subscribe("uploads");
  

 Template.shops.helpers({

  shops: function() {
    var shops = Shops.find().fetch();
    return shops

  },

});

}

TabularTables = {};

TabularTables.Shops = new Tabular.Table({
  name: "Shops",
  autoWidth: false,
  collection: Shops,
  columns: [
    {data: "name", title: "Nombre"},
    {data: "address", title: "Dirección"},
    { data: "_id", title: "Teléfono", render: function (val, type, doc) {
            var x = Shops.findOne(val);
            return '<a href="tel:'+ x.phone +'">'+ x.phone +' </a>';
    }},
     { data: "_id", title: "Contactos", render: function (val, type, doc) {
            var x = Shops.findOne(val);
            if(!x)
                 return "Sin Contacto";
      var y = "";
      for (var name in x.contact) {
      if(x.contact[name]==null){
        // var field = x.contact[name];

        Shops.update({'_id':x._id},{'$pull':{'contact':null}})

      }
      else{
       var y = '<b>'+x.contact[name].name + ' ' + x.contact[name].lastname +'</b><br>'+ 
      x.contact[name].position+'<br>'+ x.contact[name].email+'<br><a href="tel:'+ x.contact[name].phone +'">'+ x.contact[name].phone +' </a><br>'+ y;
            }
      }
      return y;
      }
    },
    {tmpl: Meteor.isClient && Template.ButtonShowShops}
  ]

});

