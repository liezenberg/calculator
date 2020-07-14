"use strict";
$(document).ready(function () {
    //#region DOM elements
    const $root = $(".calculator");

    const $input = $root.find("input");

    const $functional = $root.find("button.functional");

    const $nums = $root.find("button.num");

    const $c = $root.find("button#c");
    const $backspace = $root.find("button#backspace");
    const $minus = $root.find("button#minus");
    const $equals = $root.find("button#equals");
    //#endregion DOM elements

    const testRegex = /[0-9]/;
    const operatorsRegex = /[^-][^0-9]$/ //если в строке после чисел есть знак выключаем функциональные клавиши

    // At first - add all the needed event listeners
    //#region EventListeners
    $functional.add($nums).on("click", function () {
        const curr = $input.val();
        setValue(curr + $(this).data("value"));
    });

    $input.on("change paste keyup", function () {
        const val = $(this).val();

        //Если не пустая включам функциональные клавиши
        if (!isEmpty(val) && operatorsRegex.test(val)) {
            disableControls($functional);
        } else if (testRegex.test(val)) {
            enableControls($functional);
        }

        if (isEmpty(val)) {
            disableControls($functional.not($minus).not($c));
        }
    })

    $c.on("click", clear);

    $backspace.on("click", function () {
        const curr = $input.val();
        const newVal = curr.substring(0, curr.length - 1);
        setValue(newVal);
    });

    $equals.on("click", function () {
        try {
            const curr = $input.val();
            const result = eval(curr).toString();
            setValue(result);
        } catch (error) {
            setValue("Error!");
        }
    });
    //#endregion EventListeners

    //#region Initialize
    // Self-Invoking function
    (function () {
        // Если строка пустая выключаем все кроме цифр и -
        // function clear does the same.
        clear();
    })();

    //#endregion Initialize

    //#region Utils functions
    function setValue(string) {
        $input.val(string).change();
    }

    function clear() {
        setValue("");
    }

    function isEmpty(str) {
        // I think this way is better...
        return typeof (str) === "string" && str.length === 0;
    }

    /**
     * Adds "disabled" class and property
     * @param controls - array of $ elements or single one
     */
    function disableControls(...controls) {
        controls.map($el => $el.addClass("disabled").prop("disabled", true));
    }

    /**
     * Removes "disabled" class and property
     * @param controls - array of $ elements or single one
     */
    function enableControls(...controls) {
        controls.map($el => $el.removeClass("disabled").prop("disabled", false));
    }

    //#endregion Utils functions
});