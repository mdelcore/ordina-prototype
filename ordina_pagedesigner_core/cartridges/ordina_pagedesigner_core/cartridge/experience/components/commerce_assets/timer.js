'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for storefront.timer component.
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.myProp = 'YAY';

    return new Template('experience/components/commerce_assets/timer').render(model).text;
};
