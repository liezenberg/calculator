"use strict";
import "./calculator_module.js";

$(document).ready(function () {
    $(".calc1").calculator({historyId: 0});
    $(".calc2").calculator({historyId: 1});
    $(".calc3").calculator({historyId: 1});
});