'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for storefront.timer component.
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    // Get Current Time from Server
    var currentTime = new Date().getTime();

    // Build Campaign Start from Component
    var startDateTime = content.startDateMonth + ' ' + content.startDateDay + ', ' + content.startDateYear + ' ' + content.startDateHour + ':' + content.startDateMinute + ' ' + content.startDateMeridiem;
    var campaignStart = new Date(startDateTime).getTime();

    // Build Campaign End from Component
    var endDateTime = content.endDateMonth + ' ' + content.endDateDay + ', ' + content.endDateYear + ' ' + content.endDateHour + ':' + content.endDateMinute + ' ' + content.endDateMeridiem;
    var campaignEnd = new Date(endDateTime).getTime();

    // Calculate Campaign Status
    var isRunning = currentTime >= campaignStart && currentTime <= campaignEnd;
    var hasStarted = currentTime >= campaignStart;
    var hasEnded = currentTime > campaignEnd;

    /**
     * STEPS:
     *
     * #1: Get Current Server Time
     * #2: Get Configured Start Date & Time from Component
     * #3: Get Configured End Date & Time from Component
     * #4: Get Difference between #1 & #2 for Start Info
     * #5: Get Difference between #1 & #3 for End Info
     * #6: Figure out if campaign has yet to start, ongoing, or expired
     * #7: Based off of #6, look at what we want to do via `timerCountdown`
     */

    model.currentTime = new Date(currentTime).toUTCString();
    model.campaignStart = new Date(campaignStart).toUTCString();
    model.campaignEnd = new Date(campaignEnd).toUTCString();
    model.isRunning = isRunning;
    model.hasStarted = hasStarted;
    model.hasEnded = hasEnded;
    model.mode = content.timerCountdown;
    model.color = content.timerColor;

    return new Template('experience/components/commerce_assets/timer').render(model).text;
};
