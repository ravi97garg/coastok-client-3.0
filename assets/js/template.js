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
        if (localStorage.getItem('token')) {
            $.ajax({
                type: "GET",
                url: `${API_BASE_URL}/logout`,
                dataType: 'json',
                cors: true,
                contentType: 'application/json',
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',

                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("access_token", localStorage.getItem('token'));
                },
                success: function(response) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userProfile');
                    localStorage.removeItem('both');
                    localStorage.removeItem('currentUser');
                    if (!(window.location.href === `${window.location.origin}/pages/login/index.html` || window.location.href === window.location.origin)) {
                        window.location.href = window.location.origin + '/pages/login/index.html';
                    }
                },
                error: function(err) {
                    // alert('Unable to logout. Please try again after some time.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userProfile');
                    localStorage.removeItem('both');
                    localStorage.removeItem('currentUser');
                    if (!(window.location.href === `${window.location.origin}/pages/login/index.html` || window.location.href === window.location.origin)) {
                        window.location.href = window.location.origin + '/pages/login/index.html';
                    }
                }
            });
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userProfile');
            if (!(window.location.href === `${window.location.origin}/pages/login/index.html` || window.location.href === window.location.origin)) {
                window.location.href = window.location.origin + '/pages/login/index.html';
            }
        }
    }

    function refreshRoles() {
        try {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            $.ajax({
                type: "GET",
                url: `${API_BASE_URL}/area?${$.param({
                    areaLeader: userProfile._id
                    })}`,
                dataType: 'json',
                cors: true,
                contentType: 'application/json',
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("access_token", localStorage.getItem('token'));
                },
                success: function(response1) {
                    $.ajax({
                        type: "GET",
                        url: `${API_BASE_URL}/area?${$.param({
                            assistantDirector: userProfile._id
                            })}`,
                        dataType: 'json',
                        cors: true,
                        contentType: 'application/json',
                        secure: true,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        },
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("access_token", localStorage.getItem('token'));
                        },
                        success: function(response2) {
                            if (response1.data.total_results && response2.data.total_results) {
                                localStorage.setItem('both', 'true');
                                localStorage.setItem('currentUser', '4');
                                $('#profileDropdown .nav-profile-designation').text(USER_ROLE[4]);
                                $('<a/>')
                                    .addClass('dropdown-item')
                                    .text('Login as Assistant Director')
                                    .attr('id', 'account-switch')
                                    .appendTo($('#profileDropdownList'))
                                    .click(function() {
                                        localStorage.setItem('currentUser', '5');
                                        window.location.reload();
                                    })
                            } else {
                                localStorage.setItem('both', 'false');
                                window.location.reload();
                            }
                        },
                        error: function(err) {
                            alert(JSON.stringify(err && err.responseJSON && err.responseJSON.data && err.responseJSON.data[0]));
                        },
                    });
                },
                error: function(err) {
                    alert(JSON.stringify(err && err.responseJSON && err.responseJSON.data && err.responseJSON.data[0]));
                },
            });
        } catch (err) {
            alert('Token Corrupted. Login again.');
            logout();
        }
    }

    $(document).ready(function() {
        function getQueryStringValue(key) {
            return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        }
        const feededToken = getQueryStringValue("token");
        if (feededToken) {
            localStorage.setItem("token", feededToken);
        }
        const token = localStorage.getItem('token');
        try {
            if (token) {
                $.ajax({
                    type: "GET",
                    url: `${API_BASE_URL}/verifyToken`,
                    dataType: 'json',
                    cors: true,
                    contentType: 'application/json',
                    secure: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("access_token", localStorage.getItem('token'));
                    },
                    success: function(response) {
                        if (response.data && response.data.length) {
                            const userProfile = response.data[0];
                            // userProfile = JSON.parse(userProfile);
                            localStorage.setItem('userProfile', JSON.stringify(userProfile));
                            if (userProfile.imageUrl) {
                                $('#profileDropdown > img').attr("src", userProfile.imageUrl);
                            }
                            if (userProfile.name) {
                                $('#profileDropdown .nav-profile-name').text(userProfile.name);
                            }
                            let userRole = getCurrentUserRole();
                            if (userRole) {
                                if ((userRole === 4 || userRole === 5) && (!localStorage.getItem('both'))) {
                                    refreshRoles();
                                } else if (localStorage.getItem('both') === 'true') {
                                    let up = localStorage.getItem('currentUser');
                                    $('<a/>')
                                        .addClass('dropdown-item')
                                        .text(up === '4' ? 'Login as Assistant Director' : 'Login as Area Leader')
                                        .attr('id', 'account-switch')
                                        .appendTo($('#profileDropdownList'))
                                        .click(function() {
                                            if (up === '4') {
                                                up = '5';
                                            } else {
                                                up = '4';
                                            }
                                            localStorage.setItem('currentUser', up);
                                            window.location.reload();
                                        })
                                }
                                if (userRole === 4 || userRole === 5) {
                                    $('<a/>')
                                        .addClass('dropdown-item')
                                        .text("Refresh Roles")
                                        .appendTo($('#profileDropdownList'))
                                        .click(function() {
                                            refreshRoles();
                                        })
                                }
                                $('#profileDropdown .nav-profile-designation').text(USER_ROLE[userRole]);
                            }
                        }
                    },
                    error: function(err) {
                        logout();
                    },
                });
            } else {
                logout();
            }
        } catch (err) {
            logout();
        }
        $("#logoutBtn").click(function() {
            logout();
        })
    })
})(jQuery);