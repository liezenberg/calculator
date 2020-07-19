"use strict";
/**
 *
 * @param {{historyId: number}=} historyObj
 */
$.fn.calculator = function (historyObj) {
    //insert html calculator
    const htmlText = `
        <div class="button-wrapper">
            <button id="history">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock-history" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                    <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                    <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>
        </div>
        <div class="history list-group">
            <button type="button" id="historyHeader" class="list-group-item list-group-item-action active">
            History
            </button>
        </div>
        
        <table>
            <tr>
                <td colspan="4">
                    <input class="result" type="text" readonly aria-label="Result">
                </td>
            </tr>
            <tr id="1">
                <td><button id="c" class="">C</button></td>
                <td><button class="functional" data-value="()">()</button></td>
                <td><button class="functional" data-value="%">%</button></td>
                <td><button class="functional" data-value="/">/</button></td>
            </tr>
            <tr id="2">
                <td><button class="num" data-value="1">1</button></td>
                <td><button class="num" data-value="2">2</button></td>
                <td><button class="num" data-value="3">3</button></td>
                <td><button class="functional" data-value="*">*</button></td>
            </tr>
            <tr id="3">
                <td><button class="num" data-value="4">4</button></td>
                <td><button class="num" data-value="5">5</button></td>
                <td><button class="num" data-value="6">6</button></td>
                <td><button class="functional" data-value="+">+</button></td>
            </tr>
            <tr id="4">
                <td><button class="num" data-value="7">7</button></td>
                <td><button class="num" data-value="8">8</button></td>
                <td><button class="num" data-value="9">9</button></td>
                <td><button class="functional" data-value="-">-</button></td>
            </tr>
            <tr id="5">
                <td><button id="backspace" class="">&#8701</button></td>
                <td><button class="num" data-value="0">0</button></td>
                <td><button class="functional" data-value=".">.</button></td>
                <td><button id="equals" class="">=</button></td>
            </tr>
        </table>`;

    $(this).addClass("calculator").html(htmlText);

    //#region DOM elements
    const $root = $(this);

    const $input = $root.find("input");

    const $functional = $root.find("button.functional");

    const $nums = $root.find("button.num");
    const $hstrButton = $root.find("button#history");
    const $c = $root.find("button#c");
    const $backspace = $root.find("button#backspace");
    const $minus = $root.find("button#minus");
    const $historyBlock = $root.find(".history");
    const $equals = $root.find("button#equals");
    const $historyList = $root.find("#historyHeader");

    //#endregion DOM elements

    const calculatorHistory = (function () {
        if (typeof (historyObj) !== "undefined" && typeof (historyObj.historyId) === "number") {
            return new CalculatorHistory({historyKey: historyObj.historyId.toString()});
        }
        return new CalculatorHistory();
    }());
    const testRegexp = /[0-9]/;
    const operatorsRegex = /[^-][^0-9]$/; //если в строке после чисел есть знак выключаем функциональные клавиши
    // At first - add all the needed event listeners


    //#region EventListeners
    $functional.add($nums).on("click", function () {
        const current = $input.val();
        setValue(current + $(this).data("value"));
    });

    $input.on("change paste keyup", function () {
        const val = $(this).val();

        //Если не пустая включам функциональные клавиши
        if (!isEmpty(val) && operatorsRegex.test(val)) {
            disableControls($functional);
            //реагирует на любое изменение поетому результат тоже заноситься
        } else if (testRegexp.test(val)) {
            enableControls($functional);
        }

        if (isEmpty(val)) {
            disableControls($functional.not($minus).not($c));
        }
    });

    $c.on("click", clear);

    $backspace.on("click", function () {
        const current = $input.val();
        const newVal = current.substring(0, current.length - 1);
        setValue(newVal);
    });


    $equals.on("click", function () {
        try {
            const expression = $input.val();
            const result = eval(expression).toString();
            const record = {input: expression, result: result};
            calculatorHistory.add(record);
            renderHistoryItem(record);
            setValue(result);
        } catch (error) {
            setValue("Error!");
        }
    });
    //show history-block
    $hstrButton.on("click", function () {
        $historyBlock.slideToggle(300);
    });

    $historyBlock.on("click", "button.buttHis", function () {
        const localVal = $(this).data("value");
        setValue(localVal);
        $historyBlock.slideToggle(300);
    });
    //#endregion EventListeners

    //#region Initialize
    // Self-Invoking function
    (function () {
        // Если строка пустая выключаем все кроме цифр и -
        // function clear does the same.
        clear();
        loadAndRenderHistory();
    })();

    //#endregion Initialize

    //#region Utils functions

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

    /**
     *
     * @param {{input: string, result: number}} record
     */
    function renderHistoryItem(record) {
        const htmlToInsert = wrapHistoryRecordToHtml(record);
        $historyList.after(htmlToInsert);
    }

    function setValue(string) {
        $input.val(string).change();
    }

    function clear() {
        setValue("");
    }

    function isEmpty(string) {
        return typeof (string) === "string" && string.length === 0;
    }

    function loadAndRenderHistory() {
        const historyRecords = calculatorHistory.getAll();
        historyRecords.forEach(record => renderHistoryItem(record));
    }

    /**
     * Converts record to HTML
     * @param {{input: string, result: number}} record
     */
    function wrapHistoryRecordToHtml(record) {
        return `
        <button type="button" data-expresion="${record.input}" data-value="${record.result}" 
            class="buttHis list-group-item list-group-item-action">
            ${record.input}=${record.result}
        </button>
        `;
    }

    //#endregion Utils functions

    return $root;
};

class CalculatorHistory {
    _isEnabled = false;
    _historyKey = undefined;
    _historyArray = [];

    /**
     *
     * @param {{historyKey: string}=} parameters
     */
    constructor(parameters) {
        if (typeof (parameters) === "undefined" || typeof (parameters.historyKey) === "undefined") {
            console.warn("CalculatorHistory will be mocked!");
            return;
        }
        if (typeof (parameters.historyKey) !== "string") {
            console.error("Incorrect parameter historyKey. String expected:", parameters.historyKey);
            return;
        }
        console.log("Initialized CalculatorHistory with", parameters)

        this._historyKey = `calc-history-${parameters.historyKey}`;
        this._isEnabled = true;

        this._loadHistory();
    }

    getAll() {
        return this._historyArray;
    }

    /**
     * Add record to history
     * @param {{input: string, result: number}} item
     */
    add(item) {
        if (!this._isEnabled) {
            return;
        }
        if (!this._isValidRecord(item)) {
            console.error("Invalid parameter format. Ignoring:", item);
            return;
        }

        this._historyArray.push(item);
        this._serialize();
    }

    _serialize() {
        if (this._isEnabled) {
            localStorage.setItem(this._historyKey, JSON.stringify(this._historyArray));
        }
    }

    _loadHistory() {
        this._historyArray = [];
        if (this._isEnabled === false) {
            return;
        }

        const storageJson = localStorage.getItem(this._historyKey);
        if (typeof (storageJson) === "undefined") {
            console.log("No initial history data for CalculatorHistory");
            return;
        }
        let storageArray;
        try {
            storageArray = JSON.parse(storageJson);
        } catch (e) {
            console.warn("Failed to parse JSON data for CalculatorHistory:", storageJson, e);
            this._clearStorage();
            return;
        }
        if (storageArray !== null && !Array.isArray(storageArray)) {
            console.warn("Not an Array - CalculatorHistory:", storageArray);
            this._clearStorage();
            return;
        }

        if (storageArray && storageArray.length > 0 && !storageArray.every((element) => this._isValidRecord(element))) {
            console.warn("Storage array items have incorrect structure. Cleaning up...", storageArray);
            this._clearStorage();
            return;
        }
        if (storageArray) {
            this._historyArray = storageArray;
        }
    }

    _clearStorage() {
        if (this._isEnabled) {
            localStorage.removeItem(this._historyKey);
            this._historyArray = [];
        }
    }

    _isValidRecord(record) {
        const defaultRecord = {input: null, result: null};
        return Object.keys(defaultRecord).every(function (prop) {
            return record.hasOwnProperty(prop);
        });
    }
}