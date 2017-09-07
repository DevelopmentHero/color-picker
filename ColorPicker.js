"use strict";
/**
 * Initializes a new instance of the ColorPicker class.
 * @class Represents a visual control for picking colors.
 * @param {Color} InitialColor Initializes the ColorPicker with the specified color.
 * @property {Color} Color Gets or sets the current picked color of the ColorPicker.
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
let ColorPicker = function (InitialColor) {

    /**
     * The instance itself
     * @type vDesk.Controls.ColorPicker
     * @ignore
     */
    let _oInstance = null;
    /**
     * The underlying domnode.
     * @type HTMLElement
     * @ignore
     */
    let _oControl = null;
    /**
     * The current selected color of the colorpicker.
     * @type vDesk.Media.Drawing.Color
     * @ignore
     */
    let _oSelectedColor = null;
    /**
     * The colors of the colorpicker.
     * @type Array<vDesk.Media.Drawing.Color>
     * @ignore
     */
    let _aoColors = null;
    /**
     * The colormap of the colorpicker.
     * @type Array<Array<Uint16Array>>
     * @ignore
     */
    let _aoColorMap = null;
    /**
     * The underlying ArrayBuffer of the ColorMap of the colorpicker.
     * @type ArrayBuffer
     * @ignore
     */
    let _oColorBuffer = null;
    /**
     * The left offset of the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iOffsetLeftSL = null;
    /**
     * The top offset of the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iOffsetTopSL = null;
    /**
     * The horizontal startposition of the mouse according the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iStartPositionSLX = null;
    /**
     * The vertical startposition of the mouse according the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iStartPositionSLY = null;
    /**
     * The saturation of the current selected color. 
     * Acts as the index for fetching the proper Color off of the ColorMap
     * aswell as being the x-coordinate for the left offset of the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iSaturation = null;
    /**
     * The lightness of the current selected color. 
     * Acts as the index for fetching the proper Color off of the ColorMap
     * aswell as being the y-coordinate for the top offset of the 'saturation&lightness'-indicator.
     * @type Number
     * @ignore
     */
    let _iLightness = null;
    /**
     * The 'saturation&lightness'-picker of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSLPicker = null;
    /**
     * The 'saturation&lightness'-indicator of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSLIndicator = null;
    /**
     * The 'saturation&lightness'-canvas of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSLCanvas = null;
    /**
     * The 'saturation&lightness'-renderingcontext of the colorpicker.
     * @type CanvasRenderingContext2D
     * @ignore
     */
    let _oSLCanvasContext = null;
    /**
     * The selection-container of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSelection = null;
    /**
     * The value list of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oValueList = null;
    /**
     * The 'red'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oRedRow = null;
    /**
     * The 'red'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oRedLabel = null;
    /**
     * The 'red'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oRedTextBox = null;
    /**
     * The 'green'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oGreenRow = null;
    /**
     * The 'green'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oGreenLabel = null;
    /**
     * The 'green'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oGreenTextBox = null;
    /**
     * The 'blue'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oBlueRow = null;
    /**
     * The 'blue'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oBlueLabel = null;
    /**
     * The 'blue'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oBlueTextBox = null;
    /**
     * The 'hue'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHueRow = null;
    /**
     * The 'hue'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHueLabel = null;
    /**
     * The 'hue'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHueTextBox = null;
    /**
     * The 'saturation'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSaturationRow = null;
    /**
     * The 'saturation'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSaturationLabel = null;
    /**
     * The 'saturation'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSaturationTextBox = null;
    /**
     * The 'lightness'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oLightnessRow = null;
    /**
     * The 'lightness'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oLightnessLabel = null;
    /**
     * The 'lightness'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oLightnessTextBox = null;
    /**
     * The 'hex'-row of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHexRow = null;
    /**
     * The 'hex'-label of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHexLabel = null;
    /**
     * The 'hex'-textbox of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHexTextBox = null;
    /**
     * The 'selection'-canvas of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oSelectionCanvas = null;
    /**
     * The 'selection'-renderingcontext of the colorpicker.
     * @type CanvasRenderingContext2D
     * @ignore
     */
    let _oSelectionCanvasContext = null;
    /**
     * The current selected 'hue'-color of the colorpicker.
     * @type vDesk.Media.Drawing.Color
     * @ignore
     */
    let _oCurrentHue = null;
    /**
     * The left offset of the 'hue'-indicator.
     * @type Number
     * @ignore
     */
    let _iOffsetLeftH = null;
    /**
     * The startposition of the mouse according the 'hue'-indicator.
     * @type Number
     * @ignore
     */
    let _iStartPositionH = null;
    /**
     * The hue of the current selected color. 
     * Acts as the index for fetching the proper Color off of the Hue-Colorarray.
     * aswell as being the x-coordinate for the left offset of the 'hue'-indicator.
     * @type Number
     * @ignore
     */
    let _iHue = null;
    /**
     * The 'hue'-picker of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHPicker = null;
    /**
     * The 'hue'-indicator of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHIndicator = null;
    /**
     * The 'hue'-canvas of the colorpicker.
     * @type HTMLElement
     * @ignore
     */
    let _oHCanvas = null;
    /**
     * The 'hue'-renderingcontext of the colorpicker.
     * @type CanvasRenderingContext2D
     * @ignore
     */
    let _oHCanvasContext = null;
    /**
     * Eventhandler that listens on the mousedown event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseDownSLCanvas = null;
    /**
     * Eventhandler that listens on the mousedown event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseDownSLIndicator = null;
    /**
     * Eventhandler that listens on the mousemove event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseMoveSLIndicator = null;
    /**
     * Eventhandler that listens on the mouseup event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseUpSLIndicator = null;
    /**
     * Eventhandler that listens on the mousedown event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseDownHCanvas = null;
    /**
     * Eventhandler that listens on the mousedown event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseDownHIndicator = null;
    /**
     * Eventhandler that listens on the mousemove event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseMoveHIndicator = null;
    /**
     * Eventhandler that listens on the mouseup event.
     * @type Function
     * @ignore
     */
    let _fnOnMouseUpHIndicator = null;
    /**
     * Eventhandler htat listens on the input event.
     * @type Function
     * @ignore
     */
    let _fnOnInput = null;

    Object.defineProperty(this, "Control", {
        enumerable: true,
        get: function () {
            return _oControl;
        }
    });

    Object.defineProperty(this, "Color", {
        enumerable: true,
        get: function () {
            return _oSelectedColor;
        },
        set: function (value) {
            _oSelectedColor = value;
            _oCurrentHue = _aoColors[_oSelectedColor.Hue];
            _iSaturation = _oSelectedColor.Saturation * 2 - 1;
            _iLightness = _oSelectedColor.Lightness * 2 - 1;
            _iHue = _oSelectedColor.Hue;
            window.requestAnimationFrame(UpdateHue);
        }
    });

    /**
     * Updates the position of the 'hue'-indicator and draws a relation-curve into the 'saturation&lightness'-canvas.
     * @ignore
     */
    function UpdateHue() {
        _oHIndicator.style.left = `${_iHue}px`;
        for (let iSaturation = 0; iSaturation < 101; iSaturation++) {
            for (let iLightness = 0, y = 100; iLightness < 101; iLightness++, y--) {
                _aoColorMap[iSaturation][y][0] = _oCurrentHue.Hue;
                _aoColorMap[iSaturation][y][1] = iSaturation;
                _aoColorMap[iSaturation][y][2] = iLightness;
                _oSLCanvasContext.fillStyle = `hsl(${_oCurrentHue.Hue},${iSaturation}%,${iLightness}%)`;
                _oSLCanvasContext.fillRect(iSaturation, y, 1, 1);
            }
        }
        window.requestAnimationFrame(UpdateSaturationLightness);
    }

    /**
     * Updates the position of the 'saturation&lightness'-indicator.
     * @ignore
     */
    function UpdateSaturationLightness() {
        _oSLIndicator.style.left = `${_iSaturation}px`;
        _oSLIndicator.style.top = `${_iLightness}px`;
        window.requestAnimationFrame(UpdateSelection);
    }

    /**
     * Updates the color of the selection canvas and the values of the textboxes of the colorpicker according the current selected color.
     * @ignore
     */
    function UpdateSelection() {
        _oSelectionCanvasContext.fillStyle = _oSelectedColor.ToHexString();
        _oSelectionCanvasContext.fillRect(0, 0, 50, 30);
        _oRedTextBox.value = _oSelectedColor.Red;
        _oGreenTextBox.value = _oSelectedColor.Green;
        _oBlueTextBox.value = _oSelectedColor.Blue;
        _oHueTextBox.value = `${_oSelectedColor.Hue}°`;
        _oSaturationTextBox.value = `${_oSelectedColor.Saturation}%`;
        _oLightnessTextBox.value = `${_oSelectedColor.Lightness}%`;
        _oHexTextBox.value = _oSelectedColor.ToHexString();
    }

    /**
     * Selects the Color according the offset pointer and oves the 'saturation&lightness'-indicator to the affected position.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseDownSLCanvas = Event => {
        ({left: _iOffsetLeftSL, top: _iOffsetTopSL} = TreeHelper.GetOffset(_oSLCanvas));
        _iStartPositionSLX = Event.pageX;
        _iStartPositionSLY = Event.pageY;
        _iLightness = Math.min(Math.max(_iStartPositionSLY - _iOffsetTopSL - 2, 0), 199);
        _iSaturation = Math.min(Math.max(_iStartPositionSLX - _iOffsetLeftSL - 2, 0), 199);
        _oSelectedColor.HSL = _aoColorMap[Math.round(_iSaturation / 2)][Math.round(_iLightness / 2)];
        UpdateSaturationLightness();
        _iOffsetTopSL = _oSLIndicator.offsetTop + 5;
        _iOffsetLeftSL = _oSLIndicator.offsetLeft + 5;
        window.addEventListener("mousemove", _fnOnMouseMoveSLIndicator, true);
        window.addEventListener("mouseup", _fnOnMouseUpSLIndicator, true);
    };

    /**
     * Starts the 'drag'-operation off the 'saturation&lightness'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseDownSLIndicator = Event => {
        _iOffsetTopSL = _oSLIndicator.offsetTop + 5;
        _iOffsetLeftSL = _oSLIndicator.offsetLeft + 5;
        _iStartPositionSLX = Event.pageX;
        _iStartPositionSLY = Event.pageY;
        window.addEventListener("mousemove", _fnOnMouseMoveSLIndicator, true);
        window.addEventListener("mouseup", _fnOnMouseUpSLIndicator, true);
    };

    /**
     * Fetches the proper Color according the offset of the 'saturation&lightness'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseMoveSLIndicator = Event => {
        _iLightness = Math.min(Math.max(_iOffsetTopSL + (Event.pageY - _iStartPositionSLY), 0), 199);
        _iSaturation = Math.min(Math.max(_iOffsetLeftSL + (Event.pageX - _iStartPositionSLX), 0), 199);
        _oSelectedColor.HSL = _aoColorMap[Math.round(_iSaturation / 2)][Math.round(_iLightness / 2)];
        window.requestAnimationFrame(UpdateSaturationLightness);
    };

    /**
     * Ends the 'drag'-operation off the 'saturation&lightness'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseUpSLIndicator = Event => {
        window.removeEventListener("mousemove", _fnOnMouseMoveSLIndicator, true);
        window.removeEventListener("mouseup", _fnOnMouseUpSLIndicator, true);
    };

    /**
     * Selects the Color according the offset pointer and oves the 'hue'-indicator to the affected position.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseDownHCanvas = Event => {
        _iOffsetLeftH = TreeHelper.GetOffset(_oHCanvas).left;
        _iStartPositionH = Event.pageX;
        _iHue = Math.min(Math.max(_iStartPositionH - _iOffsetLeftH - 2, 0), 359);
        _oCurrentHue = _aoColors[_iHue];
        _oSelectedColor.Hue = _iHue;
        window.requestAnimationFrame(UpdateHue);
        _iOffsetLeftH = _oHIndicator.offsetLeft + 5;
        window.addEventListener("mousemove", _fnOnMouseMoveHIndicator, true);
        window.addEventListener("mouseup", _fnOnMouseUpHIndicator, true);
    };

    /**
     * Starts the 'drag'-operation off the 'hue'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseDownHIndicator = Event => {
        _iOffsetLeftH = _oHIndicator.offsetLeft + 5;
        _iStartPositionH = Event.pageX;
        window.addEventListener("mousemove", _fnOnMouseMoveHIndicator, true);
        window.addEventListener("mouseup", _fnOnMouseUpHIndicator, true);
    };

    /**
     * Fetches the proper Color according the offset of the 'hue'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseMoveHIndicator = Event => {
        _iHue = Math.min(Math.max(_iOffsetLeftH + (Event.pageX - _iStartPositionH), 0), 359);
        _oCurrentHue = _aoColors[_iHue];
        _oSelectedColor.HSL = _aoColorMap[Math.round(_iSaturation / 2)][Math.round(_iLightness / 2)];
        window.requestAnimationFrame(UpdateHue);
    };

    /**
     * Ends the 'drag'-operation off the 'hue'-indicator.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnMouseUpHIndicator = Event => {
        window.removeEventListener("mousemove", _fnOnMouseMoveHIndicator, true);
        window.removeEventListener("mouseup", _fnOnMouseUpHIndicator, true);
    };

    /**
     * Updates the values of the current selected Color according the specified value of the changed textbox.
     * @param {Event} Event The event.
     * @ignore
     */
    _fnOnInput = Event => {
        let bChanged = false;

        switch (Event.target) {
            case _oRedTextBox:
            {
                let iValue = Number.parseInt(_oRedTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Red = iValue;
                    bChanged = true;
                }
                break;
            }
            case _oGreenTextBox:
            {
                let iValue = Number.parseInt(_oGreenTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Green = iValue;
                    bChanged = true;
                }
                break;
            }
            case _oBlueTextBox:
            {
                let iValue = Number.parseInt(_oBlueTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Blue = iValue;
                    bChanged = true;
                }
                break;
            }
            case _oHueTextBox:
            {
                let iValue = Number.parseInt(_oHueTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Hue = Math.min(Math.max(iValue, 0), 360);
                    bChanged = true;
                }
                break;
            }
            case _oSaturationTextBox:
            {
                let iValue = Number.parseInt(_oSaturationTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Saturation = Math.min(Math.max(iValue, 0), 100);
                    bChanged = true;
                }
                break;
            }
            case _oLightnessTextBox:
            {
                let iValue = Number.parseInt(_oLightnessTextBox.value);
                if (Number.isFinite(iValue)) {
                    _oCurrentHue.Lightness = Math.min(Math.max(iValue, 0), 100);
                    bChanged = true;
                }
                break;
            }
            case _oHexTextBox:
                if (/#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.test(_oHexTextBox.value)) {
                    _oCurrentHue = Color.FromHexString(_oHexTextBox.value);
                    bChanged = true;
                }
                break;
        }

        if (bChanged) {

            _oSelectedColor = _oCurrentHue;

            _iSaturation = _oCurrentHue.Saturation * 2 - 1;
            _iLightness = _oCurrentHue.Lightness * 2 - 1;
            _iHue = _oCurrentHue.Hue;

            window.requestAnimationFrame(UpdateHue);
        }

    };

    _oInstance = this;
    _aoColors = new Array(360);
    _aoColorMap = new Array(101);
    _oColorBuffer = new ArrayBuffer(61206);

    //Initialize colormap.
    for (let x = 0, i = 0; x < 101; x++) {
        _aoColorMap[x] = new Array(101);
        for (let y = 0; y < 101; y++) {
            _aoColorMap[x][y] = new Uint16Array(_oColorBuffer, i, 3);
            i += 6;
        }
    }

    //Create colorspace [H: 0 - 360].
    for (let i = 0; i < 360; i++) {
        _aoColors[i] = Color.FromHSL(i, 100, 50);
    }

    _oCurrentHue = (InitialColor instanceof Color) ? InitialColor : _aoColors[0];
    _oSelectedColor = _oCurrentHue;
    _iOffsetLeftSL = 0;
    _iOffsetTopSL = 0;
    _iStartPositionSLX = 0;
    _iStartPositionSLY = 0;
    _iSaturation = _oCurrentHue.Saturation * 2 - 1;
    _iLightness = _oCurrentHue.Lightness * 2 - 1;
    _iOffsetLeftH = 0;
    _iStartPositionH = 0;
    _iHue = _oCurrentHue.Hue;

    //Setup control.
    _oControl = document.createElement("div");
    _oControl.className = "colorpicker";

    //Setup 'saturation&lightness'-picker.
    _oSLPicker = document.createElement("div");
    _oSLPicker.className = "saturationlightness";

    //Setup 'saturation&lightness'-indicator.
    _oSLIndicator = document.createElement("div");
    _oSLIndicator.className = "indicator";
    _oSLIndicator.addEventListener("mousedown", _fnOnMouseDownSLIndicator, false);

    //Setup 'saturation&lightness'-canvas.
    _oSLCanvas = document.createElement("canvas");
    _oSLCanvas.className = "canvas";
    _oSLCanvas.width = 100;
    _oSLCanvas.height = 100;
    _oSLCanvas.addEventListener("mousedown", _fnOnMouseDownSLCanvas, false);

    //Setup 'saturation&lightness'-renderingcontext.
    _oSLCanvasContext = _oSLCanvas.getContext("2d");

    _oSLPicker.appendChild(_oSLIndicator);
    _oSLPicker.appendChild(_oSLCanvas);

    //Setup 'selection'-container.
    _oSelection = document.createElement("div");
    _oSelection.className = "selection";

    //Setup 'selection'-canvas.
    _oSelectionCanvas = document.createElement("canvas");
    _oSelectionCanvas.className = "canvas";
    _oSelectionCanvas.width = 50;
    _oSelectionCanvas.height = 30;

    //Setup 'selection'-renderingcontext.
    _oSelectionCanvasContext = _oSelectionCanvas.getContext("2d");

    //Setup value list.
    _oValueList = document.createElement("ul");
    _oValueList.className = "list values basefont";

    //Setup 'red'-row.
    _oRedRow = document.createElement("li");
    _oRedRow.className = "row red";

    //Setup 'red'-label.
    _oRedLabel = document.createElement("span");
    _oRedLabel.className = "label red";
    _oRedLabel.textContent = "R";

    //Setup 'red'-textbox.
    _oRedTextBox = document.createElement("input");
    _oRedTextBox.type = "text";
    _oRedTextBox.className = "textbox red";
    _oRedTextBox.addEventListener("input", _fnOnInput, false);

    _oRedRow.appendChild(_oRedLabel);
    _oRedRow.appendChild(_oRedTextBox);

    //Setup 'green'-row.
    _oGreenRow = document.createElement("li");
    _oGreenRow.className = "row green";

    //Setup 'green'-label.
    _oGreenLabel = document.createElement("span");
    _oGreenLabel.className = "label green";
    _oGreenLabel.textContent = "G";

    //Setup 'green'-textbox.
    _oGreenTextBox = document.createElement("input");
    _oGreenTextBox.type = "text";
    _oGreenTextBox.className = "textbox green";
    _oGreenTextBox.addEventListener("input", _fnOnInput, false);

    _oGreenRow.appendChild(_oGreenLabel);
    _oGreenRow.appendChild(_oGreenTextBox);

    //Setup 'blue'-row.
    _oBlueRow = document.createElement("li");
    _oBlueRow.className = "row blue";

    //Setup 'blue'-label.
    _oBlueLabel = document.createElement("span");
    _oBlueLabel.className = "label blue";
    _oBlueLabel.textContent = "B";

    //Setup 'blue'-textbox.
    _oBlueTextBox = document.createElement("input");
    _oBlueTextBox.type = "text";
    _oBlueTextBox.className = "textbox blue";
    _oBlueTextBox.addEventListener("input", _fnOnInput, false);

    _oBlueRow.appendChild(_oBlueLabel);
    _oBlueRow.appendChild(_oBlueTextBox);

    //Setup 'hue'-row.
    _oHueRow = document.createElement("li");
    _oHueRow.className = "row hue";

    //Setup 'hue'-label.
    _oHueLabel = document.createElement("span");
    _oHueLabel.className = "label hue";
    _oHueLabel.textContent = "H";

    //Setup 'hue'-textbox.
    _oHueTextBox = document.createElement("input");
    _oHueTextBox.type = "text";
    _oHueTextBox.className = "textbox hue";
    _oHueTextBox.addEventListener("input", _fnOnInput, false);

    _oHueRow.appendChild(_oHueLabel);
    _oHueRow.appendChild(_oHueTextBox);

    //Setup 'saturation'-row.
    _oSaturationRow = document.createElement("li");
    _oSaturationRow.className = "row saturation";

    //Setup 'saturation'-label.
    _oSaturationLabel = document.createElement("span");
    _oSaturationLabel.className = "label saturation";
    _oSaturationLabel.textContent = "S";

    //Setup 'saturation'-textbox.
    _oSaturationTextBox = document.createElement("input");
    _oSaturationTextBox.type = "text";
    _oSaturationTextBox.className = "textbox saturation";
    _oSaturationTextBox.addEventListener("input", _fnOnInput, false);

    _oSaturationRow.appendChild(_oSaturationLabel);
    _oSaturationRow.appendChild(_oSaturationTextBox);

    //Setup 'lightness'-row.
    _oLightnessRow = document.createElement("li");
    _oLightnessRow.className = "row lightness";

    //Setup 'lightness'-label.
    _oLightnessLabel = document.createElement("span");
    _oLightnessLabel.className = "label lightness";
    _oLightnessLabel.textContent = "L";

    //Setup 'lightness'-textbox.
    _oLightnessTextBox = document.createElement("input");
    _oLightnessTextBox.type = "text";
    _oLightnessTextBox.className = "textbox lightness";
    _oLightnessTextBox.addEventListener("input", _fnOnInput, false);

    _oLightnessRow.appendChild(_oLightnessLabel);
    _oLightnessRow.appendChild(_oLightnessTextBox);

    //Setup 'hex'-row.
    _oHexRow = document.createElement("li");
    _oHexRow.className = "row hex";

    //Setup 'hex'-label.
    _oHexLabel = document.createElement("span");
    _oHexLabel.className = "label hex";
    _oHexLabel.textContent = "#";

    //Setup 'hex'-textbox.
    _oHexTextBox = document.createElement("input");
    _oHexTextBox.type = "text";
    _oHexTextBox.className = "textbox hex";
    _oHexTextBox.addEventListener("input", _fnOnInput, false);

    _oHexRow.appendChild(_oHexLabel);
    _oHexRow.appendChild(_oHexTextBox);

    _oValueList.appendChild(_oRedRow);
    _oValueList.appendChild(_oGreenRow);
    _oValueList.appendChild(_oBlueRow);
    _oValueList.appendChild(_oHueRow);
    _oValueList.appendChild(_oSaturationRow);
    _oValueList.appendChild(_oLightnessRow);
    _oValueList.appendChild(_oHexRow);

    _oSelection.appendChild(_oSelectionCanvas);
    _oSelection.appendChild(_oValueList);

    //Setup 'hue'-picker.
    _oHPicker = document.createElement("div");
    _oHPicker.className = "hue";

    //Setup 'hue'-indicator.
    _oHIndicator = document.createElement("div");
    _oHIndicator.className = "indicator";
    _oHIndicator.addEventListener("mousedown", _fnOnMouseDownHIndicator, false);

    //Setup 'hue'-canvas.
    _oHCanvas = document.createElement("canvas");
    _oHCanvas.className = "canvas";
    _oHCanvas.width = 360;
    _oHCanvas.height = 20;
    _oHCanvas.addEventListener("mousedown", _fnOnMouseDownHCanvas, false);

    //Setup 'hue'-renderingcontext.
    _oHCanvasContext = _oHCanvas.getContext("2d");

    _oHPicker.appendChild(_oHIndicator);
    _oHPicker.appendChild(_oHCanvas);

    _oControl.appendChild(_oSLPicker);
    _oControl.appendChild(_oSelection);
    _oControl.appendChild(_oHPicker);

    //Draw hue colors.
    _aoColors.forEach((Color, Index) => {
        _oHCanvasContext.fillStyle = Color.ToHexString();
        _oHCanvasContext.fillRect(Index, 0, 1, 20);
    });

    window.requestAnimationFrame(UpdateHue);

};