(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required

    function addActiveClass(element) {
      if (current === "") {
        //for root url
        if (element.attr('href').indexOf("index.html") !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
        }
      } else {
        //for other url
        if (element.attr('href').indexOf(current) !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
          if (element.parents('.submenu-item').length) {
            element.addClass('active');
          }
        }
      }
    }

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


    //Change sidebar

    $('[data-toggle="minimize"]').on("click", function() {
      body.toggleClass('sidebar-icon-only');
    });

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
  });

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    if(!(window.location.href === `${window.location.origin}/pages/login/index.html` || window.location.href === window.location.origin)){
      console.log(window.location.href, window.location.origin, window.location.href === `${window.location.origin}/pages/login/index.html`, window.location.href !== window.location.origin);
      window.location.href = window.location.origin + '/pages/login/index.html';
    }
  }

  $(document).ready(function() {
    const token = localStorage.getItem('token');
    let userProfile = localStorage.getItem('userProfile');
    try{
      if(token && userProfile){
        userProfile = JSON.parse(userProfile);
        $('#profileDropdown > img').attr("src",userProfile.imageUrl || "../../assets/images/avatar-person.svg");
        $('#profileDropdown > span').text(userProfile.name || "Anonymous");
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
    $("#logoutBtn").click(function (){
      logout();
    })
  })
})(jQuery);