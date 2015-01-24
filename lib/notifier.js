var path         = require('path');
var Notification = require('node-notifier');
var fs           = require('fs.extra');
var mv = require('node-mv');
var config = require('../config.json');
module.exports = function Notifier() {
  this.notify_upload_and_copy_success = function(file) {
    var notification_params = {
      title: "Uploaded & Copied",
      contentImage: escape(file.path),
      message: file.name,
      open: file.url,
      appIcon: path.resolve(__dirname, '../assets/icon-green.png')
    };

    this.notify(notification_params);
    var dest = config.move + "/" + file.name;
    fs.move(file.path, dest);
  };

  this.notify_upload_success = function(file) {
    var notification_params = {
      title: "Uploaded",
      contentImage: escape(file.path),
      message: file.name,
      open: file.url,
      appIcon: path.resolve(__dirname, '../assets/icon-yellow.png')
    };

    this.notify(notification_params);
  };

  this.notify_upload_failure = function(file) {
    var notification_params = {
      appIcon: path.resolve(__dirname, '../assets/icon-red.png'),
      title: "Upload Failed",
      message: file.name
    };

    this.notify(notification_params);
  };

  this.notify = function(notification_params) {
    //var notification = new Notification();

    Notification.notify(notification_params);
  };
};
