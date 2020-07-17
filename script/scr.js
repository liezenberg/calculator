"use strict";
import './calculator_module.js';
$(document).ready(function () {
    let historyObject={historyId : 0};
    const $calculator_container = $('.calc1');
    $calculator_container.calculator(historyObject);
    $('.calc2').calculator(historyObject);
});