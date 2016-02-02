Stock = new Mongo.Collection("stock");

Stock.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

SendSchema = new SimpleSchema({
  senddate: {
    type: Date,
    label: 'Fecha de Envio'
  },
  id: {
    type: String,
    label: 'Orden de Despacho (Nº de Seguimiento)'
  },
  operator: {
    type: String,
    label: "Operador",
    optional: true,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Chilexpress", value: "Chilexpress"},
          {label: "Turbus", value: "Turbus"},
          {label: "Medio Propio", value: "Medio Propio"}
        ];
      }
    }
  },
  branchId: {
    type: String,
    label: "Destino (Sucursal)",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Branchs.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
        });
      }
    }
  },
  userId: {
    type: String,
    label: "Receptor",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Meteor.users.find().fetch(), 'username')), function (c, i) {
          return {label: c.username, value: c._id};
        });
      }
    }
  },
  arrivedate: {
    type: Date,
    label: 'Fecha de Llegada'
  },
  //  fileId: {
  //   type: String,
  //   optional: true,
  //   label: "Comprobante de Envío",
  //   autoform: {
  //     afFieldInput: {
  //       type: "cfs-file",
  //       collection: "uploads"
  //     }
  //   }
  // }
});

ReceiveSchema = new SimpleSchema({
  receive: {
    type: Boolean,
    label: 'Recepcionado'
  },
  receivedate: {
    type: Date,
    label: 'Fecha de Recepción'
  },
  status: {
    type: String,
    label: "Estado",
    optional: true,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Ok", value: "Ok"},
          {label: "Dañado", value: "Dañado"}
        ];
      }
    }
  },
   fileId: {
    type: String,
    label: "Fotografia del Paquete Recibido",
    autoform: {
      afFieldInput: {
        type: "cfs-file",
        collection: "uploads"
      }
    }
  }
});


Stock.attachSchema(new SimpleSchema({

  send: {
        optional: false,
        label: "Materiales a Enviar",
        type: [Object]
    },
  "send.$.materialId": {
        type: String,
    label: "Material",
    autoform: {
      options: function () {
        return _.map((_.sortBy(Materials.find().fetch(), 'name')), function (c, i) {
          return {label: c.name, value: c._id};
         });
        }
      }
    },
  "send.$.units": {
        optional: false,
        type: Number,
        label:"Cantidad a Enviar"
    },  
  sendorder: {
    optional: false,
    type: [SendSchema],
    label: 'Detalle del Envio'
    },
   receive: {
    optional: true,
    type: [ReceiveSchema],
    label: 'Recepción'
    },
}));

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("stock");
  Meteor.subscribe("uploads");

 Template.stock.helpers({

  stock: function() {
    var stock = Stock.find().fetch();
    return stock

  },

});

}

TabularTables = {};

TabularTables.Stock = new Tabular.Table({
  name: "Stock",
  autoWidth: false,
  collection: Stock,
  // order: [[1, "desc"]],
  columns: [
    {data: "sendorder[0].id", title: "Orden Nº"},
    { data: "_id", title: "Sucursal", render: function (val, type, doc) {
            var x = Stock.findOne(val);
            if(!x)
                 return "Sin Contacto";
      var y = "";
      for (var name in x.sendorder) {
      if(x.sendorder[name]==null){
        // var field = x.contact[name];

        Stock.update({'_id':x._id},{'$pull':{'sendorder':null}})

      }
      else{
       var y = '<span class="label label-primary">'+Branchs.findOne(x.sendorder[name].branchId).name+'</span>'+ y;
            }
      }
      return y;
      }
    },
    { data: "_id", title: "Materiales", render: function (val, type, doc) {
            var x = Stock.findOne(val);
            if(!x)
                 return "Sin Contacto";
      var y = "";
      for (var name in x.send) {
      if(x.send[name]==null){
        // var field = x.send[name];

        Stock.update({'_id':x._id},{'$pull':{'send':null}})

      }
      else{
       var y = Materials.findOne(x.send[name].materialId).name+' ('+x.send[name].units+')'+'<br>'+ y;
            }
      }
      return y;
      }
    },
    { data: "_id", title: "Fecha de Envio", render: function (val, type, doc) {
            var x = Stock.findOne(val);
            if(!x)
                 return "Sin Contacto";
      var y = "";
      for (var name in x.sendorder) {
      if(x.sendorder[name]==null){
        // var field = x.contact[name];

        Stock.update({'_id':x._id},{'$pull':{'sendorder':null}})

      }
      else{
       var y = moment(x.sendorder[name].senddate).format('DD-MM-YYYY')+ y;
            }
      }
      return y;
      }
    },
    { data: "_id", title: "Fecha de Llegada", render: function (val, type, doc) {
            var x = Stock.findOne(val);
            if(!x)
                 return "Sin Contacto";
      var y = "";
      for (var name in x.sendorder) {
      if(x.sendorder[name]==null){
        // var field = x.contact[name];

        Stock.update({'_id':x._id},{'$pull':{'sendorder':null}})

      }
      else{
       var y = moment(x.sendorder[name].arrivedate).format('DD-MM-YYYY')+ y;
            }
      }
      return y;
      }
    },
    { data: "_id", title: "Status", render: function (val, type, doc) {
            var x = Stock.findOne(val);
          if(!x.receive){

            // Stock.update({'_id':x._id},{'$pull':{'receive':null}})
            return  '<span class="label label-warning">No Recibido</span>';
          }
          else{
           return '<span class="label label-success">Recibido</span>';
          }

    }},
     {tmpl: Meteor.isClient && Template.ButtonShowStock}
  ]

});
