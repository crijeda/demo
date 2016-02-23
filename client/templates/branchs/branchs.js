Template.branchs.rendered = function() {

};

Template.map2.rendered = function() {

  Meteor.subscribe("branchs");

  var map = L.map('map', {
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false
  }).setView([-40.4724728, -70.9100195], 4);
  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={pk.eyJ1IjoiY3JpamVkYSIsImEiOiJjaWpjN25tZnYwMDBxdTBra2hjOHdjM3RrIn0.FbqsAzNSufJd1T3lifwrwQ}';
  var osmAttrib='';
  var osm = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'crijeda.ombfm14a',
            accessToken: 'pk.eyJ1IjoiY3JpamVkYSIsImEiOiJjaWpjN25tZnYwMDBxdTBra2hjOHdjM3RrIn0.FbqsAzNSufJd1T3lifwrwQ'
        }).addTo(map);

  // map.setView(new L.LatLng(-33.4724728, -70.9100195),5);
      var data = [];
      var data = Branchs.find().fetch();
      for (var name in data) {
        var id = data[name]._id;
        var lat = data[name].lat;
        var lon = data[name].lon;
        var bname = data[name].name;
        var id = L.circle([lat, lon], 90000, {
                color: 'green',
                fillColor: '#13e12b',
                fillOpacity: 0.5
            }).addTo(map);
            id.bindPopup(bname);
      }


  //  var circlehola = L.circle([-33.4724728, -70.9100195], 50000, {
  //               color: 'green',
  //               fillColor: '#13e12b',
  //               fillOpacity: 0.5
  //           }).addTo(map);
  // circlehola.bindPopup("I am a circle.");
  // var circle = L.circle([-35.4724728, -70.9100195], 50000, {
  //               color: 'green',
  //               fillColor: '#13e12b',
  //               fillOpacity: 0.5
  //           }).addTo(map);
  // circle.bindPopup("Soy el circulo2");
  L.map(element, {
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false
  });
  map.addLayer(osm);





     // GoogleMaps.load();

};

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("branchs");

  //   Meteor.startup(function() {
  //   GoogleMaps.load();
  // });

 Template.branchs.helpers({

  router: function() {
    var router = Router.current().route.getName();
    return router

  },
  branchscount: function() {
    var branchs = Branchs.find().fetch();
    return branchs.length

  },

});

Template.ShowBranchs.events({

    'click .remove': function () {
    Branchs.remove(this._id);
    // alert(this._id);
    Router.go('branchs');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('branchs');
    
  }
});
 Template.ButtonShowBranchs.events({
    'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('branchs')+'/'+ this._id;
    
  },
});

Template.branchs.events({
  'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('branchs')+'/'+ this._id;
    
  }

});

Template.ShowBranchs.events({

    'click .remove': function () {
    Branchs.remove(this._id);
    // alert(this._id);
    Router.go('branchs');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('branchs');
    
  }
});

}

Template.ShowBranchs.rendered = function() {
  $('.sidebar-toggle').each(function() {
        var group = $(this);
        $(this).find(".btn").click(function(e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });
    });

    $('.sidebar-toggle').click(function(e) {
        e.preventDefault();
        //Enable sidebar push menu
        $("body").toggleClass('sidebar-collapse');
        $("body").toggleClass('sidebar-open');
    });
    $(".content-wrapper").click(function() {
        //Enable hide menu when clicking on the content-wrapper on small screens    
        if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
        }
    });

    $("li a", $('.sidebar')).click(function(e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
            //Close the menu
            checkElement.slideUp('normal', function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp('normal');
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown('normal', function() {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
}