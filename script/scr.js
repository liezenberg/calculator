"use strict";
import "./calculator_module.js";
$(document).ready(function () {
    const $calculatorContainer = $(".calc1");
    $calculatorContainer.calculator({historyId : 0});
    $(".calc2").calculator({historyId : 1});
});