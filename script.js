$(document).ready(function() {
  $('#form-container').submit(function() {
    return loadData();
  });
});

function loadData() {
  var $search = $('#search').val();
  var $wikiElem = $('#wikipedia-links');
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
      $search + '&format=json&origin=*';

  $wikiElem.html('');
  $('#intro').html('');

  $.ajax({
    url: wikiUrl,
    dataType: 'json'

  }).done(function(data) {
    var query = data[0];
    var titles = data[1];
    var sums = data[2];
    var links = data[3];

    $('#wikipedia-header').html('Articles about ' + query);

    for (var i = 1; i < titles.length; i++) {
        var title = titles[i];
        var summary = sums[i];
        var url = links[i];

        $wikiElem.append('<li><a href="' + url + '">' + title + '</a></li>');
        $wikiElem.append('<li>' + summary + '</li>');
    }



  }).fail(function() {
    alert('error!');
  });

  $('#search').val('');

  return false;
};
