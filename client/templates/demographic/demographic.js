Template.countries.rendered = function() {

};

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("countries");

 Template.countries.helpers({

  router: function() {
    var router = Router.current().route.getName();
    return router

  },

});

 Template.ButtonShowCountries.events({
    'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('countries')+'/'+ this._id;
  },
});

Template.countries.events({
  'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('countries')+'/'+ this._id;
    
  }

});

Template.ShowCountries.events({

    'click .remove': function () {
    Countries.remove(this._id);
    // alert(this._id);
    Router.go('countries');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('countries');
    
  }
});

}

Template.ShowCountries.rendered = function() {
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

/////////////////////// ZONAS////////////////////////
Template.cities.rendered = function() {

};

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("zones");

 Template.zones.helpers({

  router: function() {
    var router = Router.current().route.getName();
    return router

  },

});
 

 Template.ButtonShowZones.events({
    'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('zones')+'/'+ this._id;
    
  },
});

Template.zones.events({
  'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('zones')+'/'+ this._id;
    
  }

});

Template.ShowZones.events({

    'click .remove': function () {
    Zones.remove(this._id);
    // alert(this._id);
    Router.go('zones');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('zones');
    
  }
});

}

Template.ShowZones.rendered = function() {
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

/////////////////////// CIUDADES ////////////////////////
Template.cities.rendered = function() {

};

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("cities");

 Template.cities.helpers({

  router: function() {
    var router = Router.current().route.getName();
    return router

  },

});
 

 Template.ButtonShowCities.events({
    'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('cities')+'/'+ this._id;
    
  },
});

Template.cities.events({
  'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('cities')+'/'+ this._id;
    
  }

});

Template.ShowCities.events({

    'click .remove': function () {
    Cities.remove(this._id);
    // alert(this._id);
    Router.go('cities');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('cities');
    
  }
});

}

Template.ShowCities.rendered = function() {
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

