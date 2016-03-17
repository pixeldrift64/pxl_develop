<?php
/**
 * @file
 * PXL Develop theme implementation for banner template
 *
 * This template contains all the markup for the PXL Develop banner. The banner
 * is called on every site page whilst it is enabled and contains the changelog
 * form and other information useful for site development.
 *
 * Available variables:
 *
 * - $dev_mode: An integer containing the dev mode setting value, either
 *   0 -> development or 1 -> live
 * - $bannercolour: A text string containing a HEX value for banner colour
 * - $fontcolour: A text string containing a HEX value for the font colour
 * - $version: A text string containing the PHP version number
 * - $docroot: A text string containing the path to the current document root
 *   on the server
 * - $host: A text string containing the hostname for the server
 * - $theme: A text string containing the name of the currently active theme
 * - $themepath: A text string containing the path to the currently active theme
 *   directory
 * - $cronlast: The value of when cron last ran on the site.
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * @see pxl_develop_changelog_theme()
 */

//Setup variables to add to dev message with variables from db
$style = '';
if($dev_mode == 0) {
  $devMessage = 'Development Mode';
  $style .= 'background: '.$bannercolour.'; ';
} else {
  $devMessage = 'Live Site';
}

$style .= 'color: '.$fontcolour.'!important; ';

?>
<style>
  #pxl_dev_msg p,
  #pxl_dev_msg a,
  #pxl_dev_msg b,
  #pxl_dev_msg h1 {
    color: <?=$fontcolour?>!important;
  }
</style>

<div id="pxl_dev_msg" class="closed" style="<?=$style?>">

  <ul class="dev_msg_carousel">
    <li><p>Drupal <b>v<?=$version?></b></p></li>
    <li><p>PHP <b>v<?=$phpver?></b></p></li>
    <li><p>Hostname: <b><?=$host?></b></p></li>
    <li><p>Doc Root: <b><?=$docroot?></b></p></li>
    <li><p>Current Theme: <b><?=$theme?> (<?=$themepath?>)</b></p></li>
    <li><p>Cron last ran: <b><?php print t('%cron-last ago.', array('%cron-last' => format_interval(REQUEST_TIME - $cronlast))); ?></b></p></li>
    <?php if($dev_mode == 0) {
      print '<li><p>Dev - Robots: <b>'.$dev_bots.'</b></p></li>';
      print '<li><p>Dev - Caching: <b>'.$dev_cache.'</b></p></li>';
      print '<li><p>Dev - Mail Sending: <b>'.$dev_mail.'</b></p></li>';
    } ?>


  </ul>

  <p style="color: <?=$fontcolour?>" class="dev_msg_note"><?=$devMessage?></p>

  <span class="pxl_dev_expand">Changelog</span>
  <span class="pxl_dev_close">X</span>

  <div id="pxl_dev_log" style="background: <?=$bannercolour?>">

    <div class="pxl_dev_log_form">
      <h1>Add notes to Changelog:</h1>
      <?php
        //Render the form for adding changelog entries
        $form = drupal_get_form('pxl_develop_changelog_add_form');
        print drupal_render($form);
      ?>
    </div>

    <div class="pxl_dev_log_messages">
      <h1 class="pxl_dev_changelog_title">Changelog:</h1>
      <a class="pxl_dev_changelog_viewall" href="/admin/config/pxl_develop/changelog">View all</a>
      <?php
        $entries = pxl_develop_changelog_get_entries();

        //If no entries, add an empty div so it doesn't break the jQuery
        if(!$entries) {
          print '<div class="pxl_dev_log_msg"></div>';
        }

        foreach($entries as $key => $entry) {
          print '<div class="pxl_dev_log_msg">';
            print '<p class="pxl_dev_log_msg_name">'.$entry->name.':</p>';
            print '<p class="pxl_dev_log_msg_date">'.date("jS M \'y - g:ia", $entry->date).'</p>';
            print '<p class="pxl_dev_log_msg_body">'.$entry->notes.'</p>';
          print '</div>';
        }
      ?>

    </div>

  </div>

</div>
