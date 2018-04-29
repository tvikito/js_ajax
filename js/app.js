$(document).ready(function() {

  $("#flickrInput").submit(function(e) {
    e.preventDefault(); // stop default behaviour
    var searchButton = $("#submit");
    var searchButtonValue = searchButton.val(); // for load it again after AJAX
    var searchInput = $("#search");
    
    //DISABLE INPUT and BUTTON while ajax is processing
    searchInput.prop("disabled",true);
    searchButton.attr("disabled",true).val("Searching...");
    
    // AJAX part
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var flickerOptions = {
      tags: searchInput.val(),
      format: "json"
    };
    function displayPhotos(photos) {
      var $ul = $("<ul></ul>");
      
      if (photos.items.length < 1) {
        // When nothing was found
        $("#photos").text("Nothing found for your search term '" + searchInput.val() + "'!");
      } else {
        $.each(photos.items, function(index, photo) {
          // create ELEMENTS for each photo
          var $li = $("<li></li>").addClass("grid-25 tablet-grid-50");
          var $a = $("<a></a>").attr("href", photo.link).addClass("image");
          var $img = $("<img>").attr("src", photo.media.m);
          
          // And append them
          $img.appendTo($a);
          $a.appendTo($li);
          $li.appendTo($ul);
        });
        
        $("#photos").html($ul);
      }
    
      // ENABLE INPUT and BUTTON again
      searchInput.prop("disabled",false);
      searchButton.attr("disabled",false).val(searchButtonValue);
   }
    $.getJSON(flickerAPI, flickerOptions, displayPhotos);
  });
  
}); //end ready