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
            var userProfile = JSON.parse(localStorage.getItem('userProfile'));
            var userRole = userProfile.userRole;
            if (userRole === 4) {
                $('#manage-area').hide();
            }
        } catch (err) {
            console.log(err);
        }
    })
})(jQuery);