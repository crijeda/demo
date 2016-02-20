if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("materials2");
  Meteor.subscribe("uploads");
  Meteor.subscribe("implementation");

Template.Implementation.helpers({

    implement: function() {
    var implement = Implementation.find({material2Id:this._id}).fetch();
    return implement
  },
    router: function() {
    var router = this._id;
    return router

  },
   implementcount: function() {
    var implement = Implementation.find({material2Id:this._id}).fetch();
    return implement.length;
  },
   options: function () {
        return [
          {label: "OK", value: true},
          {label: "Pendiente", value: false},
        ];
    },
});
}

Template.registerHelper('validator', function(string) {
         if (string == "true") {
            return "validador"
        }
         else { 

        return ""

        }
});

Template.Implementation.events({

   'click .btn-delete': function(event, template) {

    var r = confirm('Seguro que quieres borrar el Material?');

          if(r){

                Implementation.remove({_id:this._id});
            }

  }
});

Template.Implementation.rendered = function() {
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


