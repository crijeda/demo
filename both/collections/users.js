Schema = {};

Schema.createUserFormSchema = new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String
        // create a regex here to restrict password to a format
    },
    passwordConfirmation: {
        type: String,
        // this is a custom validation to ensure the password match
        custom: function () {
            if (this.value !== this.field('password').value) {
                return ("passwordMismatch");
            }
        }
    },
    roles: {
        type: String,
        optional: true
    }
});

// Meteor.users.attachSchema(Schema.createUserFormSchema);
/*
 * custom errors message for autoform
 * we use it for the error 'passwordMismatch', since it is a
 * custom validation and autoform have no predefined messages for it
 */

Schema.createUserFormSchema.messages({
    "passwordMismatch": "Passwords do not match",
});
// you can specify [String] as the type

Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});


// Meteor.users.attachSchema(Schema.User);

TabularTables = {};

TabularTables.Users = new Tabular.Table({
  name: "Users",
  autoWidth: false,
  collection: Meteor.users,
  columns: [
    {data: "_id", title: "ID"},
    {data: "username", title: "Nombre Usuario"},
    // {data: "status", title: "Rol"},
    {data: "emails.[0].address", title: "Email"},
    {data: "createdAt", title: "Fecha de Creación"},
    {tmpl: Meteor.isClient && Template.ButtonShowUsers}
  ]

});
