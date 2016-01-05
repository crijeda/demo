Router.route('/home', {
  name: 'home',
  layoutTemplate: 'publicLayout'
});

Router.route('/', {
  name: 'dashboard'
});

Router.route('/materials', {
  name: 'materials'
});

Router.route('/login', {
  name: 'login'
});
Router.route('/loginf', {
  name: 'loginf'
});

Router.route('/users', {
  name: 'users'
});
Router.route('/users/:_id', function () {
  var item = Meteor.users.findOne({_id: this.params._id});
  this.render('ShowProfile', {data: item});
});

Router.route('/materials/:_id', function () {
  var item = Materials.findOne({_id: this.params._id});
  this.render('ShowMaterials', {data: item});
});

// Router.plugin('ensureSignedIn', {
//   only: ['dashboard','materials']
// });
