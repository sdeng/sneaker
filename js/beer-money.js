// Load data file
data = null;
$.ajax({
    url: '/beer-money/data.json',
    dataType: 'json',
    complete: function(response) {
        // TODO: Handle non-200 status codes
        if (response.status == 200) {
            data = $.parseJSON(response.responseText);
        }

        render(data);
    }
});

// Inject data into the DOM
var render = function() {
    var body_string = $('body').html();

    for (var key in data) {
        var pattern = new RegExp('{{'+key+'}}', 'gi');
        body_string = body_string.replace(pattern, data[key]);
    }

    $('body').html(body_string);
};
