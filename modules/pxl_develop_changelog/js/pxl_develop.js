
/**
 * PXL Develop Changelog functions
 *
 * This file contains functions necessary to make the PXL Develop Changelog run
 * Please don't hack my code
 *
 * by James Mayell
 */

jQuery(document).ready(function($) {

/**
 * Handles adding new changelog entries without reloading the page
 *
 * This function is triggered when the form submit button is clicked on the
 * changelog to add a new submission to the log. Instead of running through
 * Drupal and having to reload the page, we intercept this and process the data,
 * send an ajax HTTP request off to process through drupal and then return data
 * without having to reload the page at all
 *
 */
$("#pxl-develop-changelog-add-form .form-submit").click(function() {

  //Set variables for the form values from the page
  var name = (jQuery("#edit-pxl-develop-changelog-name").val() != '') ? jQuery("#edit-pxl-develop-changelog-name").val() : false;
  var notes = (jQuery("#edit-pxl-develop-changelog-notes").val() != '') ? jQuery("#edit-pxl-develop-changelog-notes").val() : false;

  //If the form values are empty, return false because of error
  if(name == false || notes == false) {
    //returning false to handle errors
    return false;
  }

  //ajax HTTP request to our module page on Drupal to handle submitting the
  //values to the database properly
  $.ajax({
    url: '/pxl_develop/changelog-post',
    type: 'POST',
    data: {
    name: name,
    notes: notes
    },
    dataType: 'json',

    //If the ajax request was a success, handle the data for the page
    success: function (data) {

      //Prepend the last entry on the changelog with a new element containing
      //The data we just pushed so that we don't have to reload the page
      $(".pxl_dev_log_msg:first").prepend("<div class='pxl_dev_log_msg'><p class='pxl_dev_log_msg_name'>"+data.name+":</p><p class='pxl_dev_log_msg_date'>"+data.date+"</p><p class='pxl_dev_log_msg_body'>"+data.notes+"</p></div>");

    }

  });

  //Remove the value of the notes field on the form, so that the user can't
  //keep submitting the same data
  jQuery("#edit-pxl-develop-changelog-notes").val("");


  //return false to prevent page reload
  return false;

});


/**
 * Handles update of Changelog entries on click of the edit button
 *
 * When the edit option is clicked in the changelog list for an entry, this
 * function is triggered to handle user input and updating of the entry through
 * ajax rather than having to reload the page every time.
 *
 */
$(".pxl_dev_changelog_edit").click(function() {

    //Set variables for row data, id and find the table row
    var row = $(this).parents('tr');
    var id = row.data('id');
    var note = document.getElementById('note-'+id);
    var noteText = note.textContent;

    //Replace the row in the table with a textarea containing the text
    $(note).html('<textarea id="nText-'+id+'">'+noteText+'</textarea><input class="form-submit noteSubmit nsub-'+id+'" type="submit" value="Submit">');

    //Fucntion to run when submit button is pressed
    $(".noteSubmit").click(function() {

      var noteVal = $('#nText-'+id+'').val();

      //push data to drupal module page to update the changelog entry
      $.ajax({
          url: '/pxl_develop/changelog/update',
          type: 'POST',
          data: {
            id: id,
            notes: noteVal
          },
          dataType: 'json',

          //If the update is a success and drupal returns data
          success: function (data) {

            //now push the new note back into the table and remove the textarea
            $(note).text(noteVal);

          }
        });

    });

});


/**
 * Handles deletion of Changelog entries on click
 *
 * When the delete option is clicked in the changelog list for an entry, this
 * function is triggered to handle deletion of the entry through ajax rather
 * than having to reload the page every time. This function always returns
 * false on completion to prevent page reload.
 *
 * @return false
 */
$(".pxl_dev_changelog_delete_check").click(function() {

  //If the delete option is selected, confirm this with the user
  if(confirm('Are you sure you want to delete')) {

    //Set variables for row data and id from this
    var row = $(this).parents('tr');
    var id = row.data('id');

    //ajax HTTP request to drupal module's delete function
    //Sending through the id to delete within the drupal module
    $.ajax({
      url: '/pxl_develop/changelog/delete',
      type: 'POST',
      data: {
        id: id,
      },
      dataType: 'json',

      //If the deletion is a success and drupal returns data
      success: function (data) {

        //The row is deleted in the database, now hide it from the user so no
        //page refresh is needed
        row.hide('slow');

      }
    });
  }

  //Always return false to prevent page from reloading
  return false;

});


/**
 * Simple function to toggle dev banner and changelog open and close class on
 * click of the span with class
 */
$(".pxl_dev_expand").click(function() {
  $("#pxl_dev_log").toggleClass('closed open');
  $("#pxl_dev_msg").toggleClass('closed open');
});

/**
 * Simple function to hide the dev banner from view when a button with a class
 * is clicked
 */
$(".pxl_dev_close").click(function() {
  $("#pxl_dev_msg").hide();
});

/**
 * Display site information in a carousel on the left of the banner
 */

//Set up variables for the carousel data from items already loaded on the page
var list_slideshow = $(".dev_msg_carousel"),
    listItems = list_slideshow.children('li'),
    listLen = listItems.length,
    i = 0;

//function to handle changing the list data
changeList = function () {
  listItems.eq(i).fadeOut(150, function () {
    i += 1;
    if (i === listLen) {
      i = 0;
    }
    listItems.eq(i).fadeIn(150);
  });
};

//hide list items and change list every 4 seconds
listItems.not(':first').hide();
setInterval(changeList, 3000);


//End of main jQuery function
});
