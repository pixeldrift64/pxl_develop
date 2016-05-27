# PXL Develop Drupal Module
## V1.0.1

## Overview

**pxl_develop** is a module for Drupal 7 which adds useful functions to aid developers. It is intended to be used on both live and dev sites, and it has different modes to accomodate for each. When the live mode is enabled, the development settings are all automatically disabled, and the changelog will remain for admin users.

## Changelog functionality
When this is enabled, a small banner is displayed at the bottom of the site pages. It rotates information such as server details, when cron last ran, the site's host name, the currently enabled theme etc.
There's also a changelog button which expands out into an area where you can add notes to it for other developers, just in case you're changing something that you want people to know about.
This will only display for logged in admin users and can be configured through Drupal permissions.

## Functionality for Development sites

### Caching settings
pxl_develop provides an override for cache settings for theme development which turns off all front end caching, while taking a copy of the current settings and restoring them when you re enable caching from the module.

### Search Robot Blocking
to prevent search crawlers from Google, Yahoo, Bing etc from indexing development sites, this setting injects a bit of code into the site which acts to stop this. With the flick of a switch this function can be disabled and the site will be able to be indexed again.

### Site mail disabling
If you're working on a dev site that has pre existing users in it, you won't want them to be recieving emails from it. This function will block any outgoing mail, and to avoid confusion it keeps a log of this in the Drupal report.
