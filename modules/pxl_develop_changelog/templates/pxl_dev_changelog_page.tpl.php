<?php
/**
 * @file
 * PXL Develop theme implementation for admin page
 *
 * This template contains data for the changelog page in the back end of the
 * site. it gathers the data and prints it out formatted.
 *
 * @see pxl_develop_changelog_theme()
 */

//Set up array for table headers
$header = array(
            'Name:',
            'Time / Date:',
            array(
              'data' => 'Notes:',
              'class' => array(
                'pxl_changelog_table_notes',
              )
            ),
            'Options:',
          );

//Foreach loop to process results into table format
foreach ($results as $key => $entry) {

  $rows[$key] = array(
    'data' => array(
      $entry->name,
      date("jS M \'y - g:ia", $entry->date),
      array(
        'data' => $entry->notes,
        'id' => array(
          'note-'.$entry->id
        ),
      ),
      '<a class="pxl_dev_changelog_edit" href="#">Edit</a> | <a class="pxl_dev_changelog_delete_check" href="#">Delete</a>',
    ),
    'data-id' => array($entry->id),
  );

}

//Output theme table and pager
?>
<?=theme('table', array('header' => $header, 'rows' => $rows));?>
<?=theme('pager', array('quantity', $count));?>
