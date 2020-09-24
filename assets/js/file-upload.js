(function($) {
    'use strict';
    $(function() {
        $('.file-upload-browse').on('click', function() {
            var file = $(this).parent().parent().parent().find('.file-upload-default');
            file.trigger('click');
        });
        $('.file-upload-default').on('change', function() {
            const fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
            const formData = new FormData();
            formData.append('file', this.files[0], fileName);
            $.ajax({
                type: "POST",
                url: `${API_BASE_URL}/upload`,
                cors: true,
                contentType: false,
                processData: false,
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("access_token", localStorage.getItem('token'));
                },
                data: formData,
                success: function(response) {
                    if (typeof uploadSuccessCb === 'function') {
                        uploadSuccessCb(response);
                    }
                },
                error: function(err) {
                    alert(JSON.stringify(err));
                },
            });
        });
    });
})(jQuery);