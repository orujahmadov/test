"use strict";

window.pixels = window.pixels || {};

const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

pixels.Core = function() {
  this.timeStr = "";
  
  this.timeEl = $("#time");
  this.dateEl = $("#date");

};

pixels.Core.prototype = {
  setTime: function() {
		var date = new Date();
		var hours = date.getHours();
		var mins = date.getMinutes() >= 10? date.getMinutes() : '0' + date.getMinutes();
		this.timeStr = hours + ':' + mins;
		this.dateStr = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
  },

  updateTime: function() {
		this.setTime();
  },
	start: function() {
		this.setTime();
		this.render();
	},
  render: function() {
		this.timeEl.text(this.timeStr);
		this.dateEl.text(this.dateStr);
  }
};
