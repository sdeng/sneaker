// TODO: Make the document not flash


// Load data file
var data = null;
$.ajax({
    url: '/beer-money/data.json',
    dataType: 'json',
    complete: function(response) {
        // TODO: Handle non-200 status codes
        if (response.status == 200) {
            data = $.parseJSON(response.responseText);
        }

        if (start_routing() == true) { return; }
        render_body();
    }
});


// Inject data into the DOM
var render_body = function() {
    var body_string = $('body').html();
    for (var key in data) {
        var pattern = new RegExp('{{'+key+'}}', 'gi');
        body_string = body_string.replace(pattern, data[key]);
    }

    $('body').html(body_string);
}


// Watch location fragments
var start_routing = function() {
    if (typeof(data.generator) == 'undefined') { return false; }

    var route = window.location.hash.replace('#', ''); 
    var route_found = false;
    var generator = data['generator'];

    generator.forEach(function(template_config) {
        var template = template_config['template'];
        template_config.pages.forEach(function(page) {
            if (page['name'] == route) {
                render_html(template, page['data']);
                route_found = true;
            }
        });
    });
    return route_found;
}


// Print templated HTML
var render_html = function(template, data) {
    $.ajax({
        url: template,
        dataType: 'text',
        complete: function(response) {
            // TODO: Handle non-200 status codes
            if (response.status == 200) {
                var html_string = response.responseText;
                for (var key in data) {
                    var pattern = new RegExp('{{'+key+'}}', 'gi');
                    html_string = html_string.replace(pattern, data[key]);
                }

                $('html').html(html_string);
            }
        }
    });

}
