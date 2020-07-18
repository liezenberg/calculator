"use strict";
import "./calculator_module.js";
$(document).ready(function () {
    let historyObject={historyId : 0};
    const $calculatorСontainer = $(".calc1");
    $calculatorСontainer.calculator(historyObject);
    $(".calc2").calculator(historyObject);
});