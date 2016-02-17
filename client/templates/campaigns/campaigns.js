Template.campaigns.rendered = function() {

};

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("campaigns");
  Meteor.subscribe("uploads");

 Template.campaigns.helpers({

  router: function() {
    var router = Router.current().route.getName();
    return router

  },

  // uploads:function(){
  //     var file = _.pluck(campaigns.find({_id: "Hd3MQbByRp6M5CqzY"}).fetch(), 'fileId');
  //     var media = _.pluck(Uploads.find({_id: file}).fetch(), 'url');
  //     console.log(media) 

  // },
  // media:function(){
  //       var id = campaigns.findOne({_id:this._id});
  //     return Uploads.find({_id:id}).url;
  // }     

});
Template.registerHelper('formatDate2', function(date) {
  return moment(date).format('DD MMM YYYY');
});
Template.registerHelper('formatTime', function(date) {
  return moment(date).format('HH:MM');
});
Template.registerHelper('username', function(string) {
  var user = Meteor.users.find({_id:string}).fetch();
  return user[0].username.toUpperCase();
});

  Template.Detail.helpers({

    materials: function () {
        var Materials = Materials2.find({campaignId:this._id}).fetch();
        return Materials;
        // console.log(Materials);
    },
    file: function () {
        var file = Campaigns.find({_id:this._id}).fetch();
        return file;
        // console.log(Materials);
    },
  });



  Template.Timeline.helpers({

    schema: function () {
        return Schema.TimelineSchema;
    },
    timeline: function () {
        var timeline = _.pluck(Campaigns.find({_id:this._id}).fetch(), 'timeline');
        return timeline;
        // console.log(timeline);
    },
    typeIs: function(type) {
    return this.type === type;
  }
  });

Template.campaigns.events({
  'click .edit': function () {
    // alert(this._id);
    window.location = Router.url('campaigns')+'/'+ this._id;
    
  },
  // 'change .fileInput':function(event,template){
  //     FS.Utility.eachFile(event,function(file){
  //     var fileObj= new FS.File(file);
  //     Uploads.insert(fileObj,function(err){
  //       console.log(err)
  //     })
  //   })
  //   }
});

Template.ShowCampaigns.events({

    'click .remove': function () {
    Campaigns.remove(this._id);
    // alert(this._id);
    Router.go('campaigns');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('campaigns');
    
  }
});

}

Template.ShowCampaigns.rendered = function() {
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
Template.Timeline.rendered = function() {
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
Template.Detail.rendered = function() {
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