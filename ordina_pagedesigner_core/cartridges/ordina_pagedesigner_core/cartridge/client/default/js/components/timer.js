'use strict';

function updateCounter (start, end, $elm, status) {
  var diff = end - start;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  var remaining = '';

  if (days > 0) {
    remaining += days + ' Days ';
  }

  if (hours > 0) {
    remaining += hours + ' Hours ';
  }

  if (minutes > 0) {
    remaining += minutes + ' Minutes ';
  }

  if (seconds > 0) {
    remaining += seconds + ' Seconds';
  }

  // Build Countdown String
  var text = (diff >= 0) ? remaining : status;

  // Update DOM Element
  $elm.text(text);

  // Check if we have time left, and run update again if we do
  if (diff >= 0) {
    setTimeout(function(){
      updateCounter((start + 1000), end, $elm);
    }, 1000);
  }
}

/**
 * Initialize Page Designer Component
 */
$(document).ready(function() {
  // Only initialize countdown timers not already running
  $('.campaign-countdown-timer:not(.running)').each(function(index, element) {
    var $timer = $(element);

    // Build Timestamps
    var current = new Date($timer.data('campaign-current-time')).getTime();
    var start = new Date($timer.data('campaign-start')).getTime();
    var end = new Date($timer.data('campaign-end')).getTime();

    // Get Component Settings
    var mode = $timer.data('campaign-mode');
    var isRunning = $timer.data('campaign-is-running');
    var hasStarted = $timer.data('campaign-has-started');
    var hasEnded = $timer.data('campaign-has-ended');

    // Check which countdown to use
    if (mode === 'Campaign Start') {
      updateCounter(current, start, $timer, 'active');
    } else if (mode === 'Campaign End') {
      updateCounter(current, end, $timer, 'expired');
    } else if (!hasStarted) {
      updateCounter(current, start, $timer, 'active');
    } else if (hasStarted && isRunning) {
      updateCounter(current, end, $timer, 'expired');
    } else if (hasEnded) {
      // Update DOM Element
      $timer.text('expired');
    }

    // Add custom class to track countdowns already running
    $timer.addClass('running');
  })
});
