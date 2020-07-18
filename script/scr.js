"use strict";
import "./calculator_module.js";
$(document).ready(function () {
    let historyObject={historyId : 0};
    const $calculatorContainer = $(".calc1");
    $calculatorContainer.calculator(historyObject);
    $(".calc2").calculator(historyObject);
});