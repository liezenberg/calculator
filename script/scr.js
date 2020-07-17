"use strict";
import './calculator_module.js';
$(document).ready(function () {
    
    const $calculator_container = $('.calc1');
    $calculator_container.calculator();
    $('.calc2').calculator();



});