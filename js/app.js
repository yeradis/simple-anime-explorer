(function ($, MyApp, undefined) {

    function displayNext() {
        var next = $('#next');
        var previous = $('#previous');
        var index = next.data('index') % items['anime'].length || 0;
        next.data('index', index + offset);
        previous.data('index', index - offset);
        displayPage(index, index + offset)
    }

    function displayPrevious() {
        var next = $('#next');
        var previous = $('#previous');
        var index = previous.data('index') % items['anime'].length || 0;
        if (index >= 0) {
            next.data('index', index + offset);
            previous.data('index', index - offset);
            displayPage(index, index + offset)
        }
    }

    function displayPage(offset, limit) {
        var columns = $('#columns');
        if (offset >= 0) {
            columns.html('');
            columns.html($.map(items['anime'].slice(offset, limit),function (data) {
                var item = '<div class="pin"><img src="http://sizing.yeradis.com/sizing/100/207/{thumb}"><h2>{name}</h2><h3>{nameorig}</h3><p>{plot}</p></div>'.format({thumb: data.thumb, name: data.name, nameorig: data.nameorig, plot: data.plot});
                return item;
            }).join(''));

            columns.listview('refresh');
            columns.trigger("updatelayout");
        }


    }

    function setupOffset() {

        offset = (window.matchMedia("(min-width: 480px)").matches ? 1 : offset);
        offset = (window.matchMedia("(min-width: 600px)").matches ? 1 : offset);
        offset = (window.matchMedia("(min-width: 960px)").matches ? 3 : offset);
        offset = (window.matchMedia("(min-width: 1100px)").matches ? 3 : offset);
        offset = (window.matchMedia("(min-width: 1200px)").matches ? 4 : offset);
        offset = (window.matchMedia("(min-width: 1400px)").matches ? 4 : offset);
        offset = (window.matchMedia("(min-width: 1900px)").matches ? 7 : offset);
        offset = (window.matchMedia("(min-width: 2200px)").matches ? 8 : offset);
        offset = (window.matchMedia("(min-width: 2500px)").matches ? 8 : offset);
    }

    function setupBindings() {
        $(document).delegate('#next', 'click', function () {
            displayNext();
        });

        $(document).delegate('#previous', 'click', function () {
            displayPrevious();
        });

        $('#list').keydown(function (event) {
            event.preventDefault();
            if (event.keyCode == '39') {
                displayNext();
            }

            if (event.keyCode == '37') {
                displayPrevious();
            }
        });
    }

    function setupData(){
        $.getJSON(url, function (data) {
            items = data;
            displayNext();
        });
    }

    MyApp.init = function () {
        setupOffset();
        setupBindings();
        setupData();
    }

    var items;
    var index = 0;
    var offset = 10;
    var url = "http://anime.yeradis.com/v1/list/";

}(jQuery, window.MyApp = window.MyApp || {}));

$(function () {
    MyApp.init();
});