Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        Router.go('login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login','loginf']
});
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
Router.route('/materials2', {
  name: 'materials2'
});
Router.route('/stock', {
  name: 'stock'
});
Router.route('/campaigns', {
  name: 'campaigns'
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
Router.route('/cities', {
  name: 'cities'
});
Router.route('/countries', {
  name: 'countries'
});
Router.route('/zones', {
  name: 'zones'
});
Router.route('/messages', {
  name: 'meteorchat'
});
Router.route('/calendar', {
  name: 'calendar'
});

Router.route('/branchs', {
  name: 'branchs'
});
Router.route('/shops', {
  name: 'shops'
});
Router.route('/brands', {
  name: 'brands'
});
Router.route('/channels', {
  name: 'channels'
});
Router.route('/chains', {
  name: 'chains'
});

Router.route('/cities/:_id', function () {
  var item = Cities.findOne({_id: this.params._id});
  this.render('ShowCities', {data: item});
});
Router.route('/countries/:_id', function () {
  var item = Countries.findOne({_id: this.params._id});
  this.render('ShowCountries', {data: item});
});
Router.route('/zones/:_id', function () {
  var item = Zones.findOne({_id: this.params._id});
  this.render('ShowZones', {data: item});
});
Router.route('/users/:_id', function () {
  var item = Meteor.users.findOne({_id: this.params._id});
  this.render('ShowProfile', {data: item});
});

Router.route('/materials/:_id', function () {
  var item = Materials.findOne({_id: this.params._id});
  this.render('ShowMaterials', {data: item});
});
Router.route('/materials2/:_id', function () {
  var item = Materials2.findOne({_id: this.params._id});
  this.render('ShowMaterials2', {data: item});
});
Router.route('/campaigns/implementation/:_id', function () {
  var item = Materials2.findOne({_id: this.params._id});
  this.render('Implementation', {data: item});
});
Router.route('/campaigns/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('ShowCampaigns', {data: item});
});
Router.route('/campaigns/timeline/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('Timeline', {data: item});
});
Router.route('/campaigns/detail/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('Detail', {data: item});
});
Router.route('/stock/:_id', function () {
  var item = Stock.findOne({_id: this.params._id});
  this.render('ShowStock', {data: item});
});
Router.route('/branchs/:_id', function () {
  var item = Branchs.findOne({_id: this.params._id});
  this.render('ShowBranchs', {data: item});
});
Router.route('/shops/:_id', function () {
  var item = Shops.findOne({_id: this.params._id});
  this.render('ShowShops', {data: item});
});
Router.route('/brands/:_id', function () {
  var item = Brands.findOne({_id: this.params._id});
  this.render('ShowBrands', {data: item});
});
Router.route('/channels/:_id', function () {
  var item = Channels.findOne({_id: this.params._id});
  this.render('ShowChannels', {data: item});
});
Router.route('/chains/:_id', function () {
  var item = Chains.findOne({_id: this.params._id});
  this.render('ShowChains', {data: item});
});


// Router.plugin('ensureSignedIn', {
//   only: ['dashboard','materials']
// });
