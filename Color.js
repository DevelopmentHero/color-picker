"use strict";
/**
 * Initializes a new instance of the Color class.
 * @class Represents a container for a color within the RGB-/HSL-colorspace.
 * @see https://en.wikipedia.org/wiki/RGB_color_model
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * @param {Number} [Red=0] Initializes the Color with the specified value for red.
 * @param {Number} [Green={Color.MinValue}] Initializes the Color with the specified value for green.
 * @param {Number} [Blue=0] Initializes the Color with the specified value for blue.
 * @property {Number} Red Gets or sets the 'Red' amount of the Color.
 * @property {Number} Green Gets or sets the 'Green' amount of the Color.
 * @property {Number} Blue Gets or sets the 'Blue' amount of the Color.
 * @property {Uint8ClampedArray} RGB Gets or sets the RGB-values of the Color. 
 * Note: this is a convenience-property for avoiding multiple recalculations of the HSL-values.
 * @property {Number} Hue Gets or sets the Hue of the Color.
 * @property {Number} Saturation Gets or sets the Saturation of the Color.
 * @property {Number} Lightness Gets or sets the Lightness of the Color.
 * @property {Uint16Array} HSL Gets or sets the HSL-values of the Color. 
 * Note: this is a convenience-property for avoiding multiple recalculations of the RGB-values.
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
let Color = function (Red, Green, Blue) {


    /**
     * The rgb values of the Color.
     * @type Uint8ClampedArray
     * @ignore
     */
    let _aiRGBValues = null;

    /**
     * The hsl values of the Color.
     * @type Uint16Array
     * @ignore
     */
    let _aiHSLValues = null;

    Object.defineProperties(this, {
        Red: {
            get: function () {
                return _aiRGBValues[0];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiRGBValues[0] = value;
                    [_aiHSLValues[0],_aiHSLValues[1],_aiHSLValues[2]] = Color.ConvertRGBToHSL(..._aiRGBValues);
                }
            },
            enumerable: true
        },
        Green: {
            get: function () {
                return _aiRGBValues[1];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiRGBValues[1] = value;
                    [_aiHSLValues[0],_aiHSLValues[1],_aiHSLValues[2]] = Color.ConvertRGBToHSL(..._aiRGBValues);
                }
            },
            enumerable: true
        },
        Blue: {
            get: function () {
                return _aiRGBValues[2];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiRGBValues[2] = value;
                    [_aiHSLValues[0],_aiHSLValues[1],_aiHSLValues[2]] = Color.ConvertRGBToHSL(..._aiRGBValues);
                }
            },
            enumerable: true
        },
        RGB: {
            get: function () {
                return _aiRGBValues;
            },
            set: function (value) {
                if (!(value instanceof Uint8ClampedArray)) {
                    throw new TypeError("Parameter for value must be an instance of Uint8ClampedArray.");
                }
                [_aiRGBValues[0],_aiRGBValues[1],_aiRGBValues[2]] = value;
                [_aiHSLValues[0],_aiHSLValues[1],_aiHSLValues[2]] = Color.ConvertRGBToHSL(..._aiRGBValues);
            },
            enumerable: true
        },
        Hue: {
            get: function () {
                return _aiHSLValues[0];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiHSLValues[0] = value;
                    [_aiRGBValues[0],_aiRGBValues[1],_aiRGBValues[2]] = Color.ConvertHSLToRGB(..._aiHSLValues);
                }
            },
            enumerable: true
        },
        Saturation: {
            get: function () {
                return _aiHSLValues[1];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiHSLValues[1] = value;
                    [_aiRGBValues[0],_aiRGBValues[1],_aiRGBValues[2]] = Color.ConvertHSLToRGB(..._aiHSLValues);
                }
            },
            enumerable: true
        },
        Lightness: {
            get: function () {
                return _aiHSLValues[2];
            },
            set: function (value) {
                if (Number.isFinite(value)) {
                    _aiHSLValues[2] = value;
                    [_aiRGBValues[0],_aiRGBValues[1],_aiRGBValues[2]] = Color.ConvertHSLToRGB(..._aiHSLValues);
                }
            },
            enumerable: true
        },
        HSL: {
            get: function () {
                return _aiHSLValues;
            },
            set: function (value) {
                if (!(value instanceof Uint16Array)) {
                    throw new TypeError("Parameter for value must be an instance of Uint16Array.");
                }
                [_aiHSLValues[0],_aiHSLValues[1],_aiHSLValues[2]] = value;
                [_aiRGBValues[0],_aiRGBValues[1],_aiRGBValues[2]] = Color.ConvertHSLToRGB(..._aiHSLValues);
            },
            enumerable: true
        }
    });

    // Construct
    _aiRGBValues = Uint8ClampedArray.of(Red, Green, Blue);
    _aiHSLValues = Uint16Array.of(...Color.ConvertRGBToHSL(Red, Green, Blue));
};

Object.defineProperties(Color, {
    /**
     * Describes the maximum numeric value of a color within a 8-bit colorchannel.
     * @constant
     * @type Number
     * @name Color.MaxValue
     */
    MaxValue: {
        value: 255
    },
    /**
     * Describes the minimum numeric value of a color within a 8-bit colorchannel.
     * @constant
     * @type Number
     * @name Color.MinValue
     */
    MinValue: {
        value: 0
    },
    /**
     * Describes the maximum numeric value of the color-angle(Hue) within the HSL-colorspace.
     * @constant
     * @type Number
     * @name Color.MaxHue
     */
    MaxHue: {
        value: 360
    },
    /**
     * Describes the maximum numeric value of the saturation within the HSL-colorspace.
     * @constant
     * @type Number
     * @name Color.MaxSaturation
     */
    MaxSaturation: {
        value: 100
    },
    /**
     * Describes the maximum numeric value of the lightness within the HSL-colorspace.
     * @constant
     * @type Number
     * @name Color.MaxLightness
     */
    MaxLightness: {
        value: 100
    },
    /**
     * Converts a RGB value to HSL.
     */
    ConvertRGBToHSL: {
        /**
         * Converts a RGB value to HSL.
         * @function
         * @name Color.ConvertRGBToHSL
         * @param {Number} Red The value of the red-colorchannel.
         * @param {Number} Green The value of the green-colorchannel.
         * @param {Number} Blue The value of the blue-colorchannel.
         * @returns {Uint16Array} The HSL representation of the RGB-values. [Hue, Saturation, Lightness].
         */
        value: function (Red, Green, Blue) {

            Red /= this.MaxValue;
            Green /= this.MaxValue;
            Blue /= this.MaxValue;
            let iMaxValue = Math.max(Red, Green, Blue);
            let iMinValue = Math.min(Red, Green, Blue);
            let iHue, iSaturation, iLightness = (iMaxValue + iMinValue) / 2;
            let iDelta = iMaxValue - iMinValue;

            if (iDelta === 0) {
                iHue = 0;
                iSaturation = 0;
            } else {
                iSaturation = (iLightness > 0.5) ? iDelta / (2 - iMaxValue - iMinValue) : iDelta / (iMaxValue + iMinValue);
                switch (iMaxValue) {
                    case Red:
                        iHue = (Green - Blue) / iDelta + (Green < Blue ? 6 : 0);
                        break;
                    case Green:
                        iHue = (Blue - Red) / iDelta + 2;
                        break;
                    case Blue:
                        iHue = (Red - Green) / iDelta + 4;
                        break;
                }
                iHue /= 6;
            }
            return Uint16Array.of(iHue * this.MaxHue, iSaturation * this.MaxSaturation, iLightness * this.MaxLightness);
        }},
    /**
     * Converts a HSL value to RGB.
     */
    ConvertHSLToRGB: {
        /**
         * Converts a HSL value to RGB.
         * @function
         * @name Color.ConvertHSLToRGB
         * @param {type} Hue The value of the color-angle.
         * @param {type} Saturation The value of the saturation.
         * @param {type} Lightness The value of the lightness.
         * @returns {Uint8ClampedArray} The RGB representation of the HSL-values. [Red, Green, Blue].
         */
        value: function (Hue, Saturation, Lightness) {

            Hue /= this.MaxHue;
            Saturation /= this.MaxSaturation;
            Lightness /= this.MaxLightness;

            let iTemp1 = null;
            let iTemp2 = null;

            //Check if the color is a grayscale.
            if (Saturation === this.MinValue) {
                let iValue = Lightness * this.MaxValue;
                return [iValue, iValue, iValue];
            } else {
                if (Lightness < 0.5) {
                    iTemp2 = Lightness * (Saturation + 1);
                } else {
                    iTemp2 = Lightness + Saturation - Lightness * Saturation;
                }
            }
            iTemp1 = 2 * Lightness - iTemp2;

            return Uint8ClampedArray.of(
                    Math.round(this.ConvertHueToRGB(iTemp1, iTemp2, Hue + 0.3333333333333333) * this.MaxValue),
                    Math.round(this.ConvertHueToRGB(iTemp1, iTemp2, Hue) * this.MaxValue),
                    Math.round(this.ConvertHueToRGB(iTemp1, iTemp2, Hue - 0.3333333333333333) * this.MaxValue)
                    );
        }
    },
    ConvertHueToRGB: {
        value: function (Temp1, Temp2, Hue) {
            if (Hue < 0) {
                Hue += 1;
            } else if (Hue > 1) {
                Hue -= 1;
            }
            if (Hue < 0.16666666666666666) {
                return Temp1 + (Temp2 - Temp1) * 6 * Hue;
            }
            if (Hue < 0.5) {
                return Temp2;
            }
            if (Hue < 0.6666666666666666) {
                return Temp1 + (Temp2 - Temp1) * (0.6666666666666666 - Hue) * 6;
            }
            return Temp1;
        }
    },
    /**
     * Creates a new color from a set of specified HSL-Values.
     */
    FromHSL: {
        /**
         * Creates a new color from a set of specified HSL-Values.
         * @function
         * @name Color.FromHSL
         * @param {Number} Hue The hue of the color.
         * @param {Number} Saturation The saturation of the color.
         * @param {Number} Lightness The lightness of the color.
         * @returns {Color} The color yielding the specified values.
         */
        value: function (Hue, Saturation, Lightness) {
            return new Color(...this.ConvertHSLToRGB(Hue, Saturation, Lightness));
        }
    },
    /**
     * Creates a new color from a specified RGB-String.
     */
    FromRGBString: {
        /**
         * Creates a new color from a specified RGB-String.
         * @function
         * @name Color.FromRGBString
         * @param {String} String The string that contains the RGB-Values.
         * @returns {Color} The color yielding the values according the specified RGB-String.
         */
        value: function (String) {
            let oResult = /rgba?\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)/i.exec(String);
            return new Color(...(oResult !== null) ? oResult.slice(1).map(Number) : [0, 0, 0]);
        }
    },
    /**
     * Creates a new color from a specified Hex-String.
     */
    FromHexString: {
        /**
         * Creates a new color from a specified Hex-String.
         * @function
         * @name Color.FromHexString
         * @param {String} String The string that contains the hexadecimal value of the color.
         * @returns {Color} The color yielding the values according the specified Hex-String.
         */
        value: function (String) {
            let oResult = /#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(String);
            return new Color(...(oResult !== null) ? oResult.slice(1).map(N => Number.parseInt(N, 16)) : [0, 0, 0]);
        }
    }
});

/**
 * Creates a string containing the RGB value of the Color.
 * @returns {String} The RGB-String representation of the Color.
 */
Color.prototype.ToRGBString = function () {
    return `rgb(${this.Red}, ${this.Green}, ${this.Blue})`;
};

/**
 * Creates a string containing the hexadecimal value of the Color.
 * @returns {String} The hexadecimal-String representation of the Color.
 */
Color.prototype.ToHexString = function () {
    return `#${((1 << 24) + (this.Red << 16) + (this.Green << 8) + this.Blue).toString(16).slice(1)}`;
};

/**
 * Calulates the euclidean distance among another Color.
 * @see https://en.wikipedia.org/wiki/Color_difference#Euclidean
 * @param {Color} Color The Color to calcualte the distance to.
 * @returns Number The euclidean distance among the specified Color.
 */
Color.prototype.Distance = function (Color) {
    return (Color !== this) ? Math.sqrt((Color.Red - this.Red) ** 2 + (Color.Green - this.Green) ** 2 + (Color.Blue - this.Blue) ** 2) : 0;
};