/*
Dashboard Page: [4,5,6,7]           
Area: [5,6,7]                       #manage-area
Answer Question: [4,5,6,7]
View Members: [4,5,6,7]
Pending Members: [4,5,6,7]
Update Members: [4,6]
Manage Static Content: [4,5,6,7]
*/

(function($) {
    'use strict';
    $(function() {
        try {
            const userRole = getCurrentUserRole();
            if (userRole === 4) {
                $('#my-area').show();
            } else {
                $('#manage-area').show();
            }
        } catch (err) {
            console.log(err);
        }
    })
})(jQuery);