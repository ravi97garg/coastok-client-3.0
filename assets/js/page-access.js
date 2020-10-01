/*
Dashboard Page: [4,5,6,7]           
Area: [5,6,7]                       #manage-area
My Area: [4]                        #my-area
Answer Question: [4,5,6,7]
Pending Members: [4,5,6,7]
All Members: [4,5,6,7]
Manage Static Content: [4,5,6,7]
*/

(function($) {
    'use strict';
    $(function() {
        try {
            setTimeout(function() {
                const userRole = getCurrentUserRole();
                switch (userRole) {
                    case 4:
                        {
                            $('#dashboard-page').show();
                            $('#my-area').show();
                            $('#question-page').show();
                            $('#user-page').show();
                            $('#static-page').show();
                            break;
                        }
                    case 5:
                        {
                            $('#dashboard-page').show();
                            $('#manage-area').show();
                            $('#question-page').show();
                            $('#user-page').show();
                            $('#static-page').show();
                            break;
                        }
                    case 6:
                        {
                            $('#dashboard-page').show();
                            $('#manage-area').show();
                            $('#question-page').show();
                            $('#user-page').show();
                            $('#static-page').show();
                            break;
                        }
                    case 7:
                        {
                            $('#dashboard-page').show();
                            $('#manage-area').show();
                            $('#question-page').show();
                            $('#user-page').show();
                            $('#static-page').show();
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }, 1000)
        } catch (err) {
            console.log(err);
        }
    })
})(jQuery);