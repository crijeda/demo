var  initScheduler = function () {

            $(".myscheduler").dhx_scheduler({
                xml_date:"%Y-%m-%d %H:%i",
                prevent_cache:true,
                date:new Date(),
                mode:"month"
            });

            scheduler.attachEvent("onEventAdded", function(id,ev){
                Meteor.call("insert", ev, function(error, event_id) {
                }); 
            });
            scheduler.attachEvent("onEventChanged", function(id,ev){
                Meteor.call("update", ev, function(error, event_id) {
                });
            });
            scheduler.attachEvent("onEventDeleted", function(id){
                Meteor.call("delete", id, function(error, event_id) {
                }); 
            });
};
Template.scheduler.rendered = function(){

    initScheduler();
    Meteor.subscribe("jobs");
    Meteor.autorun(function(){
        var evs = Meteor.events.find().fetch();
        var load = [];
        $.each( evs, function(i, e){
        load[i] = {id:e._id,start_date:e.start_date,end_date:e.end_date,text:e.text} ;
        });
        scheduler.clearAll();
        scheduler.parse(load, 'json');
    });

};
Template.calendar.rendered = function() {
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