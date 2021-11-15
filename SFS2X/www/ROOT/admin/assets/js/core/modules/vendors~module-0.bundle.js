/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["vendors~module-0"],{

/***/ "./node_modules/chroma-js/chroma.js":
/*!******************************************!*\
  !*** ./node_modules/chroma-js/chroma.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
     true ? module.exports = factory() :
    undefined;
}(this, (function () { 'use strict';

    var limit = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var clip_rgb = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
        var name = list[i];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var unpack = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var last = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb,
    	limit: limit,
    	type: type,
    	unpack: unpack,
    	last: last,
    	PI: PI,
    	TWOPI: PI*2,
    	PITHIRD: PI/3,
    	DEG2RAD: PI / 180,
    	RAD2DEG: 180 / PI
    };

    var input = {
    	format: {},
    	autodetect: []
    };

    var last$1 = utils.last;
    var clip_rgb$1 = utils.clip_rgb;
    var type$1 = utils.type;


    var Color = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$1(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$1(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!input.sorted) {
                input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
                input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (input.format[mode]) {
            var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$1(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color.prototype.toString = function toString () {
        if (type$1(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color;

    var chroma = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
    };

    chroma.Color = Color_1;
    chroma.version = '2.1.0';

    var chroma_1 = chroma;

    var unpack$1 = utils.unpack;
    var max = Math.max;

    var rgb2cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$1(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max(r,max(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk;

    var unpack$2 = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$2(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var unpack$3 = utils.unpack;
    var type$2 = utils.type;



    Color_1.prototype.cmyk = function() {
        return rgb2cmyk_1(this._rgb);
    };

    chroma_1.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
    };

    input.format.cmyk = cmyk2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'cmyk');
            if (type$2(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$4 = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$4(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css;

    var unpack$5 = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$5(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl;

    var unpack$6 = utils.unpack;
    var last$3 = utils.last;


    var round = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$6(args, 'rgba');
        var mode = last$3(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css_1(rgb2hsl_1(rgba), mode);
        }
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css;

    var unpack$7 = utils.unpack;
    var round$1 = Math.round;

    var hsl2rgb = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$7(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$2 = Math.round;

    var css2rgb = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input.format.named) {
            try {
                return input.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb_1(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb_1(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb;

    var type$3 = utils.type;




    Color_1.prototype.css = function(mode) {
        return rgb2css_1(this._rgb, mode);
    };

    chroma_1.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
    };

    input.format.css = css2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
                return 'css';
            }
        }
    });

    var unpack$8 = utils.unpack;

    input.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$8(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma_1.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
    };

    Color_1.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$9 = utils.unpack;

    var rgb2hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$9(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg;

    var unpack$a = utils.unpack;
    var floor = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$a(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$b = utils.unpack;
    var type$4 = utils.type;






    Color_1.prototype.hcg = function() {
        return rgb2hcg_1(this._rgb);
    };

    chroma_1.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
    };

    input.format.hcg = hcg2rgb_1;

    input.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$b(args, 'hcg');
            if (type$4(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$c = utils.unpack;
    var last$4 = utils.last;
    var round$3 = Math.round;

    var rgb2hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$c(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$4(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb;

    var type$5 = utils.type;




    Color_1.prototype.hex = function(mode) {
        return rgb2hex_1(this._rgb, mode);
    };

    chroma_1.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
    };

    input.format.hex = hex2rgb_1;
    input.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$d = utils.unpack;
    var TWOPI = utils.TWOPI;
    var min = Math.min;
    var sqrt = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi;

    var unpack$e = utils.unpack;
    var limit$1 = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$e(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit$1(i*r*3);
        g = limit$1(i*g*3);
        b = limit$1(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$f = utils.unpack;
    var type$6 = utils.type;






    Color_1.prototype.hsi = function() {
        return rgb2hsi_1(this._rgb);
    };

    chroma_1.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
    };

    input.format.hsi = hsi2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'hsi');
            if (type$6(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$g = utils.unpack;
    var type$7 = utils.type;






    Color_1.prototype.hsl = function() {
        return rgb2hsl_1(this._rgb);
    };

    chroma_1.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
    };

    input.format.hsl = hsl2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$g(args, 'hsl');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$h = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$h(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv = rgb2hsl$1;

    var unpack$i = utils.unpack;
    var floor$1 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$i(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$1(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$j = utils.unpack;
    var type$8 = utils.type;






    Color_1.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma_1.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
    };

    input.format.hsv = hsv2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$j(args, 'hsv');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var unpack$k = utils.unpack;
    var pow = Math.pow;

    var rgb2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$k(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > labConstants.t3) { return pow(t, 1 / 3); }
        return t / labConstants.t2 + labConstants.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab;

    var unpack$l = utils.unpack;
    var pow$1 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$l(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = labConstants.Yn * lab_xyz(y);
        x = labConstants.Xn * lab_xyz(x);
        z = labConstants.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
    };

    var lab2rgb_1 = lab2rgb;

    var unpack$m = utils.unpack;
    var type$9 = utils.type;






    Color_1.prototype.lab = function() {
        return rgb2lab_1(this._rgb);
    };

    chroma_1.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
    };

    input.format.lab = lab2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'lab');
            if (type$9(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$n = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$1 = Math.sqrt;
    var atan2 = Math.atan2;
    var round$4 = Math.round;

    var lab2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$n(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$1(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch;

    var unpack$o = utils.unpack;



    var rgb2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab_1(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch_1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch;

    var unpack$p = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos$1 = Math.cos;

    var lch2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$p(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$1(h) * c, sin(h) * c]
    };

    var lch2lab_1 = lch2lab;

    var unpack$q = utils.unpack;



    var lch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$q(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab_1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb_1 (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb;

    var unpack$r = utils.unpack;


    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$r(args, 'hcl').reverse();
        return lch2rgb_1.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$s = utils.unpack;
    var type$a = utils.type;






    Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
    Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

    chroma_1.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
    };
    chroma_1.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
    };

    input.format.lch = lch2rgb_1;
    input.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$s(args, m);
            if (type$a(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11;

    var type$b = utils.type;





    Color_1.prototype.name = function() {
        var hex = rgb2hex_1(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
        throw new Error('unknown color name: '+name);
    };

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$t = utils.unpack;

    var rgb2num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$t(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num;

    var type$c = utils.type;

    var num2rgb = function (num) {
        if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var type$d = utils.type;



    Color_1.prototype.num = function() {
        return rgb2num_1(this._rgb);
    };

    chroma_1.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
    };

    input.format.num = num2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var unpack$u = utils.unpack;
    var type$e = utils.type;
    var round$5 = Math.round;

    Color_1.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$5);
    };

    Color_1.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$5(v)) : v;
        });
    };

    chroma_1.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
    };

    input.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$u(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$u(args, 'rgba');
            if (type$e(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log = Math.log;

    var temperature2rgb = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/


    var unpack$v = utils.unpack;
    var round$6 = Math.round;

    var rgb2temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$v(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb_1(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round$6(temp);
    };

    var rgb2temperature_1 = rgb2temperature;

    Color_1.prototype.temp =
    Color_1.prototype.kelvin =
    Color_1.prototype.temperature = function() {
        return rgb2temperature_1(this._rgb);
    };

    chroma_1.temp =
    chroma_1.kelvin =
    chroma_1.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
    };

    input.format.temp =
    input.format.kelvin =
    input.format.temperature = temperature2rgb_1;

    var type$f = utils.type;

    Color_1.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$f(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    Color_1.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    Color_1.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= labConstants.Kn * amount;
    	return new Color_1(lab, 'lab').alpha(me.alpha(), true);
    };

    Color_1.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color_1.prototype.darker = Color_1.prototype.darken;
    Color_1.prototype.brighter = Color_1.prototype.brighten;

    Color_1.prototype.get = function(mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var type$g = utils.type;
    var pow$2 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color_1.prototype.luminance = function(lum) {
        if (lum !== undefined && type$g(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color_1([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color_1([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
            return new Color_1(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
    };

    var interpolator = {};

    var type$h = utils.type;


    var mix = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
        if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    Color_1.prototype.mix =
    Color_1.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    Color_1.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    Color_1.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += labConstants.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color_1(lch, 'lch').alpha(me.alpha(), true);
    };

    Color_1.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var type$i = utils.type;

    Color_1.prototype.set = function(mc, value, mutate) {
        if ( mutate === void 0 ) mutate=false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) {
                if (type$i(value) == 'string') {
                    switch(value.charAt(0)) {
                        case '+': src[i] += +value; break;
                        case '-': src[i] += +value; break;
                        case '*': src[i] *= +(value.substr(1)); break;
                        case '/': src[i] /= +(value.substr(1)); break;
                        default: src[i] = +value;
                    }
                } else if (type$i(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color_1(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var rgb$1 = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator.rgb = rgb$1;

    var sqrt$2 = Math.sqrt;
    var pow$3 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color_1(
            sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
            sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
            sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator.lrgb = lrgb;

    var lab$1 = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator.lab = lab$1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1-(hue0+360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1+360-hue0;
            } else{
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1-lbv0);
        return new Color_1([hue, sat, lbv], m);
    };

    var lch$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator.lch = lch$1;
    interpolator.hcl = lch$1;

    var num$1 = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color_1(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator.num = num$1;

    var hcg$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator.hcg = hcg$1;

    var hsi$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator.hsi = hsi$1;

    var hsl$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator.hsl = hsl$1;

    var hsv$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator.hsv = hsv$1;

    var clip_rgb$2 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$3 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$1 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color_1(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$1(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$1(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$3(xyz[0]);
        xyz[1] = sqrt$3(xyz[1]);
        xyz[2] = sqrt$3(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color_1(clip_rgb$2(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze


    var type$j = utils.type;

    var pow$5 = Math.pow;

    var scale = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma_1('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
                chroma_1.brewer[colors.toLowerCase()]) {
                colors = chroma_1.brewer[colors.toLowerCase()];
            }
            if (type$j(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma_1(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$5(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$j(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$j(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma_1(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$j(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma_1.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma_1.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors, _pos);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$j(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma_1[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma_1(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab




    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color_1(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 5) {
            var I0 = bezier(colors.slice(0, 3));
            var I1 = bezier(colors.slice(2, 5));
            I = function(t) {
                if (t < 0.5) {
                    return I0(t*2);
                } else {
                    return I1((t-0.5)*2);
                }
            };
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */




    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma_1(top).rgb();
            var c1 = chroma_1(bottom).rgb();
            return chroma_1.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken$1 = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken$1));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$k = utils.type;
    var clip_rgb$3 = utils.clip_rgb;
    var TWOPI$2 = utils.TWOPI;
    var pow$6 = Math.pow;
    var sin$2 = Math.sin;
    var cos$3 = Math.cos;


    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$k(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
            var l = pow$6(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$3(a);
            var sin_a = sin$2(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$k(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$k(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma_1.scale(f); };

        f.hue(hue);

        return f;
    };

    var digits = '0123456789abcdef';

    var floor$2 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$2(random() * 16));
        }
        return new Color_1(code, 'hex');
    };

    var log$1 = Math.log;
    var pow$7 = Math.pow;
    var floor$3 = Math.floor;
    var abs = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log$1(min);
            var max_log = Math.LOG10E * log$1(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor$3(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var sqrt$4 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var abs$1 = Math.abs;
    var cos$4 = Math.cos;
    var PI$2 = Math.PI;

    var deltaE = function(a, b, L, C) {
        if ( L === void 0 ) L=1;
        if ( C === void 0 ) C=1;

        // Delta E (CMC)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
        a = new Color_1(a);
        b = new Color_1(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var c1 = sqrt$4((a1 * a1) + (b1 * b1));
        var c2 = sqrt$4((a2 * a2) + (b2 * b2));
        var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
        var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
        var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
        while (h1 < 0) { h1 += 360; }
        while (h1 >= 360) { h1 -= 360; }
        var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
        var c4 = c1 * c1 * c1 * c1;
        var f = sqrt$4(c4 / (c4 + 1900.0));
        var sh = sc * (((f * t) + 1.0) - f);
        var delL = L1 - L2;
        var delC = c1 - c2;
        var delA = a1 - a2;
        var delB = b1 - b2;
        var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
    };

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:




    var scales = {
    	cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff'], [0,.25,.75,1]).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors















    // operators --> modify existing Colors










    // interpolators










    // generators -- > create new colors
    chroma_1.average = average;
    chroma_1.bezier = bezier_1;
    chroma_1.blend = blend_1;
    chroma_1.cubehelix = cubehelix;
    chroma_1.mix = chroma_1.interpolate = mix;
    chroma_1.random = random_1;
    chroma_1.scale = scale;

    // other utility methods
    chroma_1.analyze = analyze_1.analyze;
    chroma_1.contrast = contrast;
    chroma_1.deltaE = deltaE;
    chroma_1.distance = distance;
    chroma_1.limits = analyze_1.limits;
    chroma_1.valid = valid;

    // scale
    chroma_1.scales = scales;

    // colors
    chroma_1.colors = w3cx11_1;
    chroma_1.brewer = colorbrewer_1;

    var chroma_js = chroma_1;

    return chroma_js;

})));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy92ZW5kb3Jzfm1vZHVsZS0wLmJ1bmRsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vbm9kZV9tb2R1bGVzL2Nocm9tYS1qcy9jaHJvbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjaHJvbWEuanMgLSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIGNvbG9yIGNvbnZlcnNpb25zXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTksIEdyZWdvciBBaXNjaFxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogMy4gVGhlIG5hbWUgR3JlZ29yIEFpc2NoIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiAqIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAqIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEdSRUdPUiBBSVNDSCBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsXG4gKiBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLFxuICogREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWVxuICogT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAqIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSxcbiAqIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIGNocm9tYS5qcyBpbmNsdWRlcyBjb2xvcnMgZnJvbSBjb2xvcmJyZXdlcjIub3JnLCB3aGljaCBhcmUgcmVsZWFzZWQgdW5kZXJcbiAqIHRoZSBmb2xsb3dpbmcgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDIgQ3ludGhpYSBCcmV3ZXIsIE1hcmsgSGFycm93ZXIsXG4gKiBhbmQgVGhlIFBlbm5zeWx2YW5pYSBTdGF0ZSBVbml2ZXJzaXR5LlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELFxuICogZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWNcbiAqIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogTmFtZWQgY29sb3JzIGFyZSB0YWtlbiBmcm9tIFgxMSBDb2xvciBOYW1lcy5cbiAqIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3N2Zy1jb2xvclxuICpcbiAqIEBwcmVzZXJ2ZVxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbC5jaHJvbWEgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbGltaXQgPSBmdW5jdGlvbiAoeCwgbWluLCBtYXgpIHtcbiAgICAgICAgaWYgKCBtaW4gPT09IHZvaWQgMCApIG1pbj0wO1xuICAgICAgICBpZiAoIG1heCA9PT0gdm9pZCAwICkgbWF4PTE7XG5cbiAgICAgICAgcmV0dXJuIHggPCBtaW4gPyBtaW4gOiB4ID4gbWF4ID8gbWF4IDogeDtcbiAgICB9O1xuXG4gICAgdmFyIGNsaXBfcmdiID0gZnVuY3Rpb24gKHJnYikge1xuICAgICAgICByZ2IuX2NsaXBwZWQgPSBmYWxzZTtcbiAgICAgICAgcmdiLl91bmNsaXBwZWQgPSByZ2Iuc2xpY2UoMCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTw9MzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmdiW2ldIDwgMCB8fCByZ2JbaV0gPiAyNTUpIHsgcmdiLl9jbGlwcGVkID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIHJnYltpXSA9IGxpbWl0KHJnYltpXSwgMCwgMjU1KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJnYltpXSA9IGxpbWl0KHJnYltpXSwgMCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJnYjtcbiAgICB9O1xuXG4gICAgLy8gcG9ydGVkIGZyb20galF1ZXJ5J3MgJC50eXBlXG4gICAgdmFyIGNsYXNzVG9UeXBlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxpc3QgPSBbJ0Jvb2xlYW4nLCAnTnVtYmVyJywgJ1N0cmluZycsICdGdW5jdGlvbicsICdBcnJheScsICdEYXRlJywgJ1JlZ0V4cCcsICdVbmRlZmluZWQnLCAnTnVsbCddOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgbmFtZSA9IGxpc3RbaV07XG5cbiAgICAgICAgY2xhc3NUb1R5cGVbKFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIildID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gY2xhc3NUb1R5cGVbT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaildIHx8IFwib2JqZWN0XCI7XG4gICAgfTtcblxuICAgIHZhciB1bnBhY2sgPSBmdW5jdGlvbiAoYXJncywga2V5T3JkZXIpIHtcbiAgICAgICAgaWYgKCBrZXlPcmRlciA9PT0gdm9pZCAwICkga2V5T3JkZXI9bnVsbDtcblxuICAgIFx0Ly8gaWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIDMgYXJndW1lbnRzLCB3ZSByZXR1cm4gdGhlIGFyZ3VtZW50c1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykgeyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7IH1cbiAgICAgICAgLy8gd2l0aCBsZXNzIHRoYW4gMyBhcmdzIHdlIGNoZWNrIGlmIGZpcnN0IGFyZyBpcyBvYmplY3RcbiAgICAgICAgLy8gYW5kIHVzZSB0aGUga2V5T3JkZXIgc3RyaW5nIHRvIGV4dHJhY3QgYW5kIHNvcnQgcHJvcGVydGllc1xuICAgIFx0aWYgKHR5cGUoYXJnc1swXSkgPT0gJ29iamVjdCcgJiYga2V5T3JkZXIpIHtcbiAgICBcdFx0cmV0dXJuIGtleU9yZGVyLnNwbGl0KCcnKVxuICAgIFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGFyZ3NbMF1ba10gIT09IHVuZGVmaW5lZDsgfSlcbiAgICBcdFx0XHQubWFwKGZ1bmN0aW9uIChrKSB7IHJldHVybiBhcmdzWzBdW2tdOyB9KTtcbiAgICBcdH1cbiAgICBcdC8vIG90aGVyd2lzZSB3ZSBqdXN0IHJldHVybiB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICBcdC8vICh3aGljaCB3ZSBzdXBwb3NlIGlzIGFuIGFycmF5IG9mIGFyZ3MpXG4gICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH07XG5cbiAgICB2YXIgbGFzdCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgdmFyIGwgPSBhcmdzLmxlbmd0aC0xO1xuICAgICAgICBpZiAodHlwZShhcmdzW2xdKSA9PSAnc3RyaW5nJykgeyByZXR1cm4gYXJnc1tsXS50b0xvd2VyQ2FzZSgpOyB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgUEkgPSBNYXRoLlBJO1xuXG4gICAgdmFyIHV0aWxzID0ge1xuICAgIFx0Y2xpcF9yZ2I6IGNsaXBfcmdiLFxuICAgIFx0bGltaXQ6IGxpbWl0LFxuICAgIFx0dHlwZTogdHlwZSxcbiAgICBcdHVucGFjazogdW5wYWNrLFxuICAgIFx0bGFzdDogbGFzdCxcbiAgICBcdFBJOiBQSSxcbiAgICBcdFRXT1BJOiBQSSoyLFxuICAgIFx0UElUSElSRDogUEkvMyxcbiAgICBcdERFRzJSQUQ6IFBJIC8gMTgwLFxuICAgIFx0UkFEMkRFRzogMTgwIC8gUElcbiAgICB9O1xuXG4gICAgdmFyIGlucHV0ID0ge1xuICAgIFx0Zm9ybWF0OiB7fSxcbiAgICBcdGF1dG9kZXRlY3Q6IFtdXG4gICAgfTtcblxuICAgIHZhciBsYXN0JDEgPSB1dGlscy5sYXN0O1xuICAgIHZhciBjbGlwX3JnYiQxID0gdXRpbHMuY2xpcF9yZ2I7XG4gICAgdmFyIHR5cGUkMSA9IHV0aWxzLnR5cGU7XG5cblxuICAgIHZhciBDb2xvciA9IGZ1bmN0aW9uIENvbG9yKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlJDEoYXJnc1swXSkgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBhcmdzWzBdLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICBhcmdzWzBdLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAvLyB0aGUgYXJndW1lbnQgaXMgYWxyZWFkeSBhIENvbG9yIGluc3RhbmNlXG4gICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxhc3QgYXJndW1lbnQgY291bGQgYmUgdGhlIG1vZGVcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDEoYXJncyk7XG4gICAgICAgIHZhciBhdXRvZGV0ZWN0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFtb2RlKSB7XG4gICAgICAgICAgICBhdXRvZGV0ZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghaW5wdXQuc29ydGVkKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuYXV0b2RldGVjdCA9IGlucHV0LmF1dG9kZXRlY3Quc29ydChmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBiLnAgLSBhLnA7IH0pO1xuICAgICAgICAgICAgICAgIGlucHV0LnNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhdXRvLWRldGVjdCBmb3JtYXRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsaXN0ID0gaW5wdXQuYXV0b2RldGVjdDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hrID0gbGlzdFtpXTtcblxuICAgICAgICAgICAgICAgIG1vZGUgPSBjaGsudGVzdC5hcHBseShjaGssIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuZm9ybWF0W21vZGVdKSB7XG4gICAgICAgICAgICB2YXIgcmdiID0gaW5wdXQuZm9ybWF0W21vZGVdLmFwcGx5KG51bGwsIGF1dG9kZXRlY3QgPyBhcmdzIDogYXJncy5zbGljZSgwLC0xKSk7XG4gICAgICAgICAgICBtZS5fcmdiID0gY2xpcF9yZ2IkMShyZ2IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGZvcm1hdDogJythcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBhbHBoYSBjaGFubmVsXG4gICAgICAgIGlmIChtZS5fcmdiLmxlbmd0aCA9PT0gMykgeyBtZS5fcmdiLnB1c2goMSk7IH1cbiAgICB9O1xuXG4gICAgQ29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgICAgICBpZiAodHlwZSQxKHRoaXMuaGV4KSA9PSAnZnVuY3Rpb24nKSB7IHJldHVybiB0aGlzLmhleCgpOyB9XG4gICAgICAgIHJldHVybiAoXCJbXCIgKyAodGhpcy5fcmdiLmpvaW4oJywnKSkgKyBcIl1cIik7XG4gICAgfTtcblxuICAgIHZhciBDb2xvcl8xID0gQ29sb3I7XG5cbiAgICB2YXIgY2hyb21hID0gZnVuY3Rpb24gKCkge1xuICAgIFx0dmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBcdHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICBcdHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBjaHJvbWEuQ29sb3IsIFsgbnVsbCBdLmNvbmNhdCggYXJncykgKSk7XG4gICAgfTtcblxuICAgIGNocm9tYS5Db2xvciA9IENvbG9yXzE7XG4gICAgY2hyb21hLnZlcnNpb24gPSAnMi4xLjAnO1xuXG4gICAgdmFyIGNocm9tYV8xID0gY2hyb21hO1xuXG4gICAgdmFyIHVucGFjayQxID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBtYXggPSBNYXRoLm1heDtcblxuICAgIHZhciByZ2IyY215ayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgcmVmID0gdW5wYWNrJDEoYXJncywgJ3JnYicpO1xuICAgICAgICB2YXIgciA9IHJlZlswXTtcbiAgICAgICAgdmFyIGcgPSByZWZbMV07XG4gICAgICAgIHZhciBiID0gcmVmWzJdO1xuICAgICAgICByID0gciAvIDI1NTtcbiAgICAgICAgZyA9IGcgLyAyNTU7XG4gICAgICAgIGIgPSBiIC8gMjU1O1xuICAgICAgICB2YXIgayA9IDEgLSBtYXgocixtYXgoZyxiKSk7XG4gICAgICAgIHZhciBmID0gayA8IDEgPyAxIC8gKDEtaykgOiAwO1xuICAgICAgICB2YXIgYyA9ICgxLXItaykgKiBmO1xuICAgICAgICB2YXIgbSA9ICgxLWctaykgKiBmO1xuICAgICAgICB2YXIgeSA9ICgxLWItaykgKiBmO1xuICAgICAgICByZXR1cm4gW2MsbSx5LGtdO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMmNteWtfMSA9IHJnYjJjbXlrO1xuXG4gICAgdmFyIHVucGFjayQyID0gdXRpbHMudW5wYWNrO1xuXG4gICAgdmFyIGNteWsycmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIGFyZ3MgPSB1bnBhY2skMihhcmdzLCAnY215aycpO1xuICAgICAgICB2YXIgYyA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBtID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIHkgPSBhcmdzWzJdO1xuICAgICAgICB2YXIgayA9IGFyZ3NbM107XG4gICAgICAgIHZhciBhbHBoYSA9IGFyZ3MubGVuZ3RoID4gNCA/IGFyZ3NbNF0gOiAxO1xuICAgICAgICBpZiAoayA9PT0gMSkgeyByZXR1cm4gWzAsMCwwLGFscGhhXTsgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYyA+PSAxID8gMCA6IDI1NSAqICgxLWMpICogKDEtayksIC8vIHJcbiAgICAgICAgICAgIG0gPj0gMSA/IDAgOiAyNTUgKiAoMS1tKSAqICgxLWspLCAvLyBnXG4gICAgICAgICAgICB5ID49IDEgPyAwIDogMjU1ICogKDEteSkgKiAoMS1rKSwgLy8gYlxuICAgICAgICAgICAgYWxwaGFcbiAgICAgICAgXTtcbiAgICB9O1xuXG4gICAgdmFyIGNteWsycmdiXzEgPSBjbXlrMnJnYjtcblxuICAgIHZhciB1bnBhY2skMyA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgdHlwZSQyID0gdXRpbHMudHlwZTtcblxuXG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5jbXlrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IyY215a18xKHRoaXMuX3JnYik7XG4gICAgfTtcblxuICAgIGNocm9tYV8xLmNteWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yXzEsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydjbXlrJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQuY215ayA9IGNteWsycmdiXzE7XG5cbiAgICBpbnB1dC5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAyLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayQzKGFyZ3MsICdjbXlrJyk7XG4gICAgICAgICAgICBpZiAodHlwZSQyKGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjbXlrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVucGFjayQ0ID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBsYXN0JDIgPSB1dGlscy5sYXN0O1xuICAgIHZhciBybmQgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gTWF0aC5yb3VuZChhKjEwMCkvMTAwOyB9O1xuXG4gICAgLypcbiAgICAgKiBzdXBwb3J0ZWQgYXJndW1lbnRzOlxuICAgICAqIC0gaHNsMmNzcyhoLHMsbClcbiAgICAgKiAtIGhzbDJjc3MoaCxzLGwsYSlcbiAgICAgKiAtIGhzbDJjc3MoW2gscyxsXSwgbW9kZSlcbiAgICAgKiAtIGhzbDJjc3MoW2gscyxsLGFdLCBtb2RlKVxuICAgICAqIC0gaHNsMmNzcyh7aCxzLGwsYX0sIG1vZGUpXG4gICAgICovXG4gICAgdmFyIGhzbDJjc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIGhzbGEgPSB1bnBhY2skNChhcmdzLCAnaHNsYScpO1xuICAgICAgICB2YXIgbW9kZSA9IGxhc3QkMihhcmdzKSB8fCAnbHNhJztcbiAgICAgICAgaHNsYVswXSA9IHJuZChoc2xhWzBdIHx8IDApO1xuICAgICAgICBoc2xhWzFdID0gcm5kKGhzbGFbMV0qMTAwKSArICclJztcbiAgICAgICAgaHNsYVsyXSA9IHJuZChoc2xhWzJdKjEwMCkgKyAnJSc7XG4gICAgICAgIGlmIChtb2RlID09PSAnaHNsYScgfHwgKGhzbGEubGVuZ3RoID4gMyAmJiBoc2xhWzNdPDEpKSB7XG4gICAgICAgICAgICBoc2xhWzNdID0gaHNsYS5sZW5ndGggPiAzID8gaHNsYVszXSA6IDE7XG4gICAgICAgICAgICBtb2RlID0gJ2hzbGEnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHNsYS5sZW5ndGggPSAzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobW9kZSArIFwiKFwiICsgKGhzbGEuam9pbignLCcpKSArIFwiKVwiKTtcbiAgICB9O1xuXG4gICAgdmFyIGhzbDJjc3NfMSA9IGhzbDJjc3M7XG5cbiAgICB2YXIgdW5wYWNrJDUgPSB1dGlscy51bnBhY2s7XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSByZ2IyaHNsKHIsZyxiKVxuICAgICAqIC0gcmdiMmhzbChyLGcsYixhKVxuICAgICAqIC0gcmdiMmhzbChbcixnLGJdKVxuICAgICAqIC0gcmdiMmhzbChbcixnLGIsYV0pXG4gICAgICogLSByZ2IyaHNsKHtyLGcsYixhfSlcbiAgICAgKi9cbiAgICB2YXIgcmdiMmhzbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICBhcmdzID0gdW5wYWNrJDUoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgdmFyIHIgPSBhcmdzWzBdO1xuICAgICAgICB2YXIgZyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBiID0gYXJnc1syXTtcblxuICAgICAgICByIC89IDI1NTtcbiAgICAgICAgZyAvPSAyNTU7XG4gICAgICAgIGIgLz0gMjU1O1xuXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXG4gICAgICAgIHZhciBsID0gKG1heCArIG1pbikgLyAyO1xuICAgICAgICB2YXIgcywgaDtcblxuICAgICAgICBpZiAobWF4ID09PSBtaW4pe1xuICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgICBoID0gTnVtYmVyLk5hTjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBsIDwgMC41ID8gKG1heCAtIG1pbikgLyAobWF4ICsgbWluKSA6IChtYXggLSBtaW4pIC8gKDIgLSBtYXggLSBtaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHIgPT0gbWF4KSB7IGggPSAoZyAtIGIpIC8gKG1heCAtIG1pbik7IH1cbiAgICAgICAgZWxzZSBpZiAoZyA9PSBtYXgpIHsgaCA9IDIgKyAoYiAtIHIpIC8gKG1heCAtIG1pbik7IH1cbiAgICAgICAgZWxzZSBpZiAoYiA9PSBtYXgpIHsgaCA9IDQgKyAociAtIGcpIC8gKG1heCAtIG1pbik7IH1cblxuICAgICAgICBoICo9IDYwO1xuICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPjMgJiYgYXJnc1szXSE9PXVuZGVmaW5lZCkgeyByZXR1cm4gW2gscyxsLGFyZ3NbM11dOyB9XG4gICAgICAgIHJldHVybiBbaCxzLGxdO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMmhzbF8xID0gcmdiMmhzbDtcblxuICAgIHZhciB1bnBhY2skNiA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgbGFzdCQzID0gdXRpbHMubGFzdDtcblxuXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcblxuICAgIC8qXG4gICAgICogc3VwcG9ydGVkIGFyZ3VtZW50czpcbiAgICAgKiAtIHJnYjJjc3MocixnLGIpXG4gICAgICogLSByZ2IyY3NzKHIsZyxiLGEpXG4gICAgICogLSByZ2IyY3NzKFtyLGcsYl0sIG1vZGUpXG4gICAgICogLSByZ2IyY3NzKFtyLGcsYixhXSwgbW9kZSlcbiAgICAgKiAtIHJnYjJjc3Moe3IsZyxiLGF9LCBtb2RlKVxuICAgICAqL1xuICAgIHZhciByZ2IyY3NzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZ2JhID0gdW5wYWNrJDYoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDMoYXJncykgfHwgJ3JnYic7XG4gICAgICAgIGlmIChtb2RlLnN1YnN0cigwLDMpID09ICdoc2wnKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsMmNzc18xKHJnYjJoc2xfMShyZ2JhKSwgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmdiYVswXSA9IHJvdW5kKHJnYmFbMF0pO1xuICAgICAgICByZ2JhWzFdID0gcm91bmQocmdiYVsxXSk7XG4gICAgICAgIHJnYmFbMl0gPSByb3VuZChyZ2JhWzJdKTtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdyZ2JhJyB8fCAocmdiYS5sZW5ndGggPiAzICYmIHJnYmFbM108MSkpIHtcbiAgICAgICAgICAgIHJnYmFbM10gPSByZ2JhLmxlbmd0aCA+IDMgPyByZ2JhWzNdIDogMTtcbiAgICAgICAgICAgIG1vZGUgPSAncmdiYSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChtb2RlICsgXCIoXCIgKyAocmdiYS5zbGljZSgwLG1vZGU9PT0ncmdiJz8zOjQpLmpvaW4oJywnKSkgKyBcIilcIik7XG4gICAgfTtcblxuICAgIHZhciByZ2IyY3NzXzEgPSByZ2IyY3NzO1xuXG4gICAgdmFyIHVucGFjayQ3ID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciByb3VuZCQxID0gTWF0aC5yb3VuZDtcblxuICAgIHZhciBoc2wycmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXNzaWduO1xuXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG4gICAgICAgIGFyZ3MgPSB1bnBhY2skNyhhcmdzLCAnaHNsJyk7XG4gICAgICAgIHZhciBoID0gYXJnc1swXTtcbiAgICAgICAgdmFyIHMgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgbCA9IGFyZ3NbMl07XG4gICAgICAgIHZhciByLGcsYjtcbiAgICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgICAgIHIgPSBnID0gYiA9IGwqMjU1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHQzID0gWzAsMCwwXTtcbiAgICAgICAgICAgIHZhciBjID0gWzAsMCwwXTtcbiAgICAgICAgICAgIHZhciB0MiA9IGwgPCAwLjUgPyBsICogKDErcykgOiBsK3MtbCpzO1xuICAgICAgICAgICAgdmFyIHQxID0gMiAqIGwgLSB0MjtcbiAgICAgICAgICAgIHZhciBoXyA9IGggLyAzNjA7XG4gICAgICAgICAgICB0M1swXSA9IGhfICsgMS8zO1xuICAgICAgICAgICAgdDNbMV0gPSBoXztcbiAgICAgICAgICAgIHQzWzJdID0gaF8gLSAxLzM7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8MzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHQzW2ldIDwgMCkgeyB0M1tpXSArPSAxOyB9XG4gICAgICAgICAgICAgICAgaWYgKHQzW2ldID4gMSkgeyB0M1tpXSAtPSAxOyB9XG4gICAgICAgICAgICAgICAgaWYgKDYgKiB0M1tpXSA8IDEpXG4gICAgICAgICAgICAgICAgICAgIHsgY1tpXSA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzW2ldOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMiAqIHQzW2ldIDwgMSlcbiAgICAgICAgICAgICAgICAgICAgeyBjW2ldID0gdDI7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgzICogdDNbaV0gPCAyKVxuICAgICAgICAgICAgICAgICAgICB7IGNbaV0gPSB0MSArICh0MiAtIHQxKSAqICgoMiAvIDMpIC0gdDNbaV0pICogNjsgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgeyBjW2ldID0gdDE7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChhc3NpZ24gPSBbcm91bmQkMShjWzBdKjI1NSkscm91bmQkMShjWzFdKjI1NSkscm91bmQkMShjWzJdKjI1NSldLCByID0gYXNzaWduWzBdLCBnID0gYXNzaWduWzFdLCBiID0gYXNzaWduWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAvLyBrZWVwIGFscGhhIGNoYW5uZWxcbiAgICAgICAgICAgIHJldHVybiBbcixnLGIsYXJnc1szXV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyLGcsYiwxXTtcbiAgICB9O1xuXG4gICAgdmFyIGhzbDJyZ2JfMSA9IGhzbDJyZ2I7XG5cbiAgICB2YXIgUkVfUkdCID0gL15yZ2JcXChcXHMqKC0/XFxkKyksXFxzKigtP1xcZCspXFxzKixcXHMqKC0/XFxkKylcXHMqXFwpJC87XG4gICAgdmFyIFJFX1JHQkEgPSAvXnJnYmFcXChcXHMqKC0/XFxkKyksXFxzKigtP1xcZCspXFxzKixcXHMqKC0/XFxkKylcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpJC87XG4gICAgdmFyIFJFX1JHQl9QQ1QgPSAvXnJnYlxcKFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSUsXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pJVxccypcXCkkLztcbiAgICB2YXIgUkVfUkdCQV9QQ1QgPSAvXnJnYmFcXChcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpJC87XG4gICAgdmFyIFJFX0hTTCA9IC9eaHNsXFwoXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqXFwpJC87XG4gICAgdmFyIFJFX0hTTEEgPSAvXmhzbGFcXChcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyksXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKihbMDFdfFswMV0/XFwuXFxkKylcXCkkLztcblxuICAgIHZhciByb3VuZCQyID0gTWF0aC5yb3VuZDtcblxuICAgIHZhciBjc3MycmdiID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgICBjc3MgPSBjc3MudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAgIHZhciBtO1xuXG4gICAgICAgIGlmIChpbnB1dC5mb3JtYXQubmFtZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmZvcm1hdC5uYW1lZChjc3MpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmdiKDI1MCwyMCwwKVxuICAgICAgICBpZiAoKG0gPSBjc3MubWF0Y2goUkVfUkdCKSkpIHtcbiAgICAgICAgICAgIHZhciByZ2IgPSBtLnNsaWNlKDEsNCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8MzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmdiW2ldID0gK3JnYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJnYlszXSA9IDE7ICAvLyBkZWZhdWx0IGFscGhhXG4gICAgICAgICAgICByZXR1cm4gcmdiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmdiYSgyNTAsMjAsMCwwLjQpXG4gICAgICAgIGlmICgobSA9IGNzcy5tYXRjaChSRV9SR0JBKSkpIHtcbiAgICAgICAgICAgIHZhciByZ2IkMSA9IG0uc2xpY2UoMSw1KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkkMT0wOyBpJDE8NDsgaSQxKyspIHtcbiAgICAgICAgICAgICAgICByZ2IkMVtpJDFdID0gK3JnYiQxW2kkMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmdiJDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZ2IoMTAwJSwwJSwwJSlcbiAgICAgICAgaWYgKChtID0gY3NzLm1hdGNoKFJFX1JHQl9QQ1QpKSkge1xuICAgICAgICAgICAgdmFyIHJnYiQyID0gbS5zbGljZSgxLDQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQyPTA7IGkkMjwzOyBpJDIrKykge1xuICAgICAgICAgICAgICAgIHJnYiQyW2kkMl0gPSByb3VuZCQyKHJnYiQyW2kkMl0gKiAyLjU1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJnYiQyWzNdID0gMTsgIC8vIGRlZmF1bHQgYWxwaGFcbiAgICAgICAgICAgIHJldHVybiByZ2IkMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJnYmEoMTAwJSwwJSwwJSwwLjQpXG4gICAgICAgIGlmICgobSA9IGNzcy5tYXRjaChSRV9SR0JBX1BDVCkpKSB7XG4gICAgICAgICAgICB2YXIgcmdiJDMgPSBtLnNsaWNlKDEsNSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpJDM9MDsgaSQzPDM7IGkkMysrKSB7XG4gICAgICAgICAgICAgICAgcmdiJDNbaSQzXSA9IHJvdW5kJDIocmdiJDNbaSQzXSAqIDIuNTUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmdiJDNbM10gPSArcmdiJDNbM107XG4gICAgICAgICAgICByZXR1cm4gcmdiJDM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoc2woMCwxMDAlLDUwJSlcbiAgICAgICAgaWYgKChtID0gY3NzLm1hdGNoKFJFX0hTTCkpKSB7XG4gICAgICAgICAgICB2YXIgaHNsID0gbS5zbGljZSgxLDQpO1xuICAgICAgICAgICAgaHNsWzFdICo9IDAuMDE7XG4gICAgICAgICAgICBoc2xbMl0gKj0gMC4wMTtcbiAgICAgICAgICAgIHZhciByZ2IkNCA9IGhzbDJyZ2JfMShoc2wpO1xuICAgICAgICAgICAgcmdiJDRbM10gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHJnYiQ0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHNsYSgwLDEwMCUsNTAlLDAuNSlcbiAgICAgICAgaWYgKChtID0gY3NzLm1hdGNoKFJFX0hTTEEpKSkge1xuICAgICAgICAgICAgdmFyIGhzbCQxID0gbS5zbGljZSgxLDQpO1xuICAgICAgICAgICAgaHNsJDFbMV0gKj0gMC4wMTtcbiAgICAgICAgICAgIGhzbCQxWzJdICo9IDAuMDE7XG4gICAgICAgICAgICB2YXIgcmdiJDUgPSBoc2wycmdiXzEoaHNsJDEpO1xuICAgICAgICAgICAgcmdiJDVbM10gPSArbVs0XTsgIC8vIGRlZmF1bHQgYWxwaGEgPSAxXG4gICAgICAgICAgICByZXR1cm4gcmdiJDU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3NzMnJnYi50ZXN0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIFJFX1JHQi50ZXN0KHMpIHx8XG4gICAgICAgICAgICBSRV9SR0JBLnRlc3QocykgfHxcbiAgICAgICAgICAgIFJFX1JHQl9QQ1QudGVzdChzKSB8fFxuICAgICAgICAgICAgUkVfUkdCQV9QQ1QudGVzdChzKSB8fFxuICAgICAgICAgICAgUkVfSFNMLnRlc3QocykgfHxcbiAgICAgICAgICAgIFJFX0hTTEEudGVzdChzKTtcbiAgICB9O1xuXG4gICAgdmFyIGNzczJyZ2JfMSA9IGNzczJyZ2I7XG5cbiAgICB2YXIgdHlwZSQzID0gdXRpbHMudHlwZTtcblxuXG5cblxuICAgIENvbG9yXzEucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICAgICAgcmV0dXJuIHJnYjJjc3NfMSh0aGlzLl9yZ2IsIG1vZGUpO1xuICAgIH07XG5cbiAgICBjaHJvbWFfMS5jc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yXzEsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydjc3MnXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0LmZvcm1hdC5jc3MgPSBjc3MycmdiXzE7XG5cbiAgICBpbnB1dC5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiA1LFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHJlc3RbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgICAgICAgICAgIGlmICghcmVzdC5sZW5ndGggJiYgdHlwZSQzKGgpID09PSAnc3RyaW5nJyAmJiBjc3MycmdiXzEudGVzdChoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnY3NzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVucGFjayQ4ID0gdXRpbHMudW5wYWNrO1xuXG4gICAgaW5wdXQuZm9ybWF0LmdsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZ2IgPSB1bnBhY2skOChhcmdzLCAncmdiYScpO1xuICAgICAgICByZ2JbMF0gKj0gMjU1O1xuICAgICAgICByZ2JbMV0gKj0gMjU1O1xuICAgICAgICByZ2JbMl0gKj0gMjU1O1xuICAgICAgICByZXR1cm4gcmdiO1xuICAgIH07XG5cbiAgICBjaHJvbWFfMS5nbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3JfMSwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2dsJ10pICkpO1xuICAgIH07XG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5nbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmdiID0gdGhpcy5fcmdiO1xuICAgICAgICByZXR1cm4gW3JnYlswXS8yNTUsIHJnYlsxXS8yNTUsIHJnYlsyXS8yNTUsIHJnYlszXV07XG4gICAgfTtcblxuICAgIHZhciB1bnBhY2skOSA9IHV0aWxzLnVucGFjaztcblxuICAgIHZhciByZ2IyaGNnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skOShhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgICAgICB2YXIgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgIHZhciBjID0gZGVsdGEgKiAxMDAgLyAyNTU7XG4gICAgICAgIHZhciBfZyA9IG1pbiAvICgyNTUgLSBkZWx0YSkgKiAxMDA7XG4gICAgICAgIHZhciBoO1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgIGggPSBOdW1iZXIuTmFOO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHIgPT09IG1heCkgeyBoID0gKGcgLSBiKSAvIGRlbHRhOyB9XG4gICAgICAgICAgICBpZiAoZyA9PT0gbWF4KSB7IGggPSAyKyhiIC0gcikgLyBkZWx0YTsgfVxuICAgICAgICAgICAgaWYgKGIgPT09IG1heCkgeyBoID0gNCsociAtIGcpIC8gZGVsdGE7IH1cbiAgICAgICAgICAgIGggKj0gNjA7XG4gICAgICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2gsIGMsIF9nXTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJoY2dfMSA9IHJnYjJoY2c7XG5cbiAgICB2YXIgdW5wYWNrJGEgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuICAgIC8qXG4gICAgICogdGhpcyBpcyBiYXNpY2FsbHkganVzdCBIU1Ygd2l0aCBzb21lIG1pbm9yIHR3ZWFrc1xuICAgICAqXG4gICAgICogaHVlLi4gWzAuLjM2MF1cbiAgICAgKiBjaHJvbWEgLi4gWzAuLjFdXG4gICAgICogZ3JheW5lc3MgLi4gWzAuLjFdXG4gICAgICovXG5cbiAgICB2YXIgaGNnMnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFzc2lnbiwgYXNzaWduJDEsIGFzc2lnbiQyLCBhc3NpZ24kMywgYXNzaWduJDQsIGFzc2lnbiQ1O1xuXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG4gICAgICAgIGFyZ3MgPSB1bnBhY2skYShhcmdzLCAnaGNnJyk7XG4gICAgICAgIHZhciBoID0gYXJnc1swXTtcbiAgICAgICAgdmFyIGMgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgX2cgPSBhcmdzWzJdO1xuICAgICAgICB2YXIgcixnLGI7XG4gICAgICAgIF9nID0gX2cgKiAyNTU7XG4gICAgICAgIHZhciBfYyA9IGMgKiAyNTU7XG4gICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICByID0gZyA9IGIgPSBfZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoID09PSAzNjApIHsgaCA9IDA7IH1cbiAgICAgICAgICAgIGlmIChoID4gMzYwKSB7IGggLT0gMzYwOyB9XG4gICAgICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgICAgIGggLz0gNjA7XG4gICAgICAgICAgICB2YXIgaSA9IGZsb29yKGgpO1xuICAgICAgICAgICAgdmFyIGYgPSBoIC0gaTtcbiAgICAgICAgICAgIHZhciBwID0gX2cgKiAoMSAtIGMpO1xuICAgICAgICAgICAgdmFyIHEgPSBwICsgX2MgKiAoMSAtIGYpO1xuICAgICAgICAgICAgdmFyIHQgPSBwICsgX2MgKiBmO1xuICAgICAgICAgICAgdmFyIHYgPSBwICsgX2M7XG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IChhc3NpZ24gPSBbdiwgdCwgcF0sIHIgPSBhc3NpZ25bMF0sIGcgPSBhc3NpZ25bMV0sIGIgPSBhc3NpZ25bMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgMTogKGFzc2lnbiQxID0gW3EsIHYsIHBdLCByID0gYXNzaWduJDFbMF0sIGcgPSBhc3NpZ24kMVsxXSwgYiA9IGFzc2lnbiQxWzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDI6IChhc3NpZ24kMiA9IFtwLCB2LCB0XSwgciA9IGFzc2lnbiQyWzBdLCBnID0gYXNzaWduJDJbMV0sIGIgPSBhc3NpZ24kMlsyXSk7IGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAzOiAoYXNzaWduJDMgPSBbcCwgcSwgdl0sIHIgPSBhc3NpZ24kM1swXSwgZyA9IGFzc2lnbiQzWzFdLCBiID0gYXNzaWduJDNbMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgNDogKGFzc2lnbiQ0ID0gW3QsIHAsIHZdLCByID0gYXNzaWduJDRbMF0sIGcgPSBhc3NpZ24kNFsxXSwgYiA9IGFzc2lnbiQ0WzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IChhc3NpZ24kNSA9IFt2LCBwLCBxXSwgciA9IGFzc2lnbiQ1WzBdLCBnID0gYXNzaWduJDVbMV0sIGIgPSBhc3NpZ24kNVsyXSk7IGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyLCBnLCBiLCBhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciBoY2cycmdiXzEgPSBoY2cycmdiO1xuXG4gICAgdmFyIHVucGFjayRiID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciB0eXBlJDQgPSB1dGlscy50eXBlO1xuXG5cblxuXG5cblxuICAgIENvbG9yXzEucHJvdG90eXBlLmhjZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmdiMmhjZ18xKHRoaXMuX3JnYik7XG4gICAgfTtcblxuICAgIGNocm9tYV8xLmhjZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3JfMSwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2hjZyddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQuZm9ybWF0LmhjZyA9IGhjZzJyZ2JfMTtcblxuICAgIGlucHV0LmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDEsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgICAgICBhcmdzID0gdW5wYWNrJGIoYXJncywgJ2hjZycpO1xuICAgICAgICAgICAgaWYgKHR5cGUkNChhcmdzKSA9PT0gJ2FycmF5JyAmJiBhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnaGNnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVucGFjayRjID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBsYXN0JDQgPSB1dGlscy5sYXN0O1xuICAgIHZhciByb3VuZCQzID0gTWF0aC5yb3VuZDtcblxuICAgIHZhciByZ2IyaGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skYyhhcmdzLCAncmdiYScpO1xuICAgICAgICB2YXIgciA9IHJlZlswXTtcbiAgICAgICAgdmFyIGcgPSByZWZbMV07XG4gICAgICAgIHZhciBiID0gcmVmWzJdO1xuICAgICAgICB2YXIgYSA9IHJlZlszXTtcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDQoYXJncykgfHwgJ2F1dG8nO1xuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7IGEgPSAxOyB9XG4gICAgICAgIGlmIChtb2RlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIG1vZGUgPSBhIDwgMSA/ICdyZ2JhJyA6ICdyZ2InO1xuICAgICAgICB9XG4gICAgICAgIHIgPSByb3VuZCQzKHIpO1xuICAgICAgICBnID0gcm91bmQkMyhnKTtcbiAgICAgICAgYiA9IHJvdW5kJDMoYik7XG4gICAgICAgIHZhciB1ID0gciA8PCAxNiB8IGcgPDwgOCB8IGI7XG4gICAgICAgIHZhciBzdHIgPSBcIjAwMDAwMFwiICsgdS50b1N0cmluZygxNik7IC8vIy50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSA2KTtcbiAgICAgICAgdmFyIGh4YSA9ICcwJyArIHJvdW5kJDMoYSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgICAgICBoeGEgPSBoeGEuc3Vic3RyKGh4YS5sZW5ndGggLSAyKTtcbiAgICAgICAgc3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JnYmEnOiByZXR1cm4gKFwiI1wiICsgc3RyICsgaHhhKTtcbiAgICAgICAgICAgIGNhc2UgJ2FyZ2InOiByZXR1cm4gKFwiI1wiICsgaHhhICsgc3RyKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAoXCIjXCIgKyBzdHIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZ2IyaGV4XzEgPSByZ2IyaGV4O1xuXG4gICAgdmFyIFJFX0hFWCA9IC9eIz8oW0EtRmEtZjAtOV17Nn18W0EtRmEtZjAtOV17M30pJC87XG4gICAgdmFyIFJFX0hFWEEgPSAvXiM/KFtBLUZhLWYwLTldezh9fFtBLUZhLWYwLTldezR9KSQvO1xuXG4gICAgdmFyIGhleDJyZ2IgPSBmdW5jdGlvbiAoaGV4KSB7XG4gICAgICAgIGlmIChoZXgubWF0Y2goUkVfSEVYKSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9wdGlvbmFsIGxlYWRpbmcgI1xuICAgICAgICAgICAgaWYgKGhleC5sZW5ndGggPT09IDQgfHwgaGV4Lmxlbmd0aCA9PT0gNykge1xuICAgICAgICAgICAgICAgIGhleCA9IGhleC5zdWJzdHIoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBleHBhbmQgc2hvcnQtbm90YXRpb24gdG8gZnVsbCBzaXgtZGlnaXRcbiAgICAgICAgICAgIGlmIChoZXgubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgaGV4ID0gaGV4LnNwbGl0KCcnKTtcbiAgICAgICAgICAgICAgICBoZXggPSBoZXhbMF0raGV4WzBdK2hleFsxXStoZXhbMV0raGV4WzJdK2hleFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1ID0gcGFyc2VJbnQoaGV4LCAxNik7XG4gICAgICAgICAgICB2YXIgciA9IHUgPj4gMTY7XG4gICAgICAgICAgICB2YXIgZyA9IHUgPj4gOCAmIDB4RkY7XG4gICAgICAgICAgICB2YXIgYiA9IHUgJiAweEZGO1xuICAgICAgICAgICAgcmV0dXJuIFtyLGcsYiwxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1hdGNoIHJnYmEgaGV4IGZvcm1hdCwgZWcgI0ZGMDAwMDc3XG4gICAgICAgIGlmIChoZXgubWF0Y2goUkVfSEVYQSkpIHtcbiAgICAgICAgICAgIGlmIChoZXgubGVuZ3RoID09PSA1IHx8IGhleC5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgb3B0aW9uYWwgbGVhZGluZyAjXG4gICAgICAgICAgICAgICAgaGV4ID0gaGV4LnN1YnN0cigxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGV4cGFuZCBzaG9ydC1ub3RhdGlvbiB0byBmdWxsIGVpZ2h0LWRpZ2l0XG4gICAgICAgICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGhleCA9IGhleC5zcGxpdCgnJyk7XG4gICAgICAgICAgICAgICAgaGV4ID0gaGV4WzBdK2hleFswXStoZXhbMV0raGV4WzFdK2hleFsyXStoZXhbMl0raGV4WzNdK2hleFszXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1JDEgPSBwYXJzZUludChoZXgsIDE2KTtcbiAgICAgICAgICAgIHZhciByJDEgPSB1JDEgPj4gMjQgJiAweEZGO1xuICAgICAgICAgICAgdmFyIGckMSA9IHUkMSA+PiAxNiAmIDB4RkY7XG4gICAgICAgICAgICB2YXIgYiQxID0gdSQxID4+IDggJiAweEZGO1xuICAgICAgICAgICAgdmFyIGEgPSBNYXRoLnJvdW5kKCh1JDEgJiAweEZGKSAvIDB4RkYgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgcmV0dXJuIFtyJDEsZyQxLGIkMSxhXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIHVzZWQgdG8gY2hlY2sgZm9yIGNzcyBjb2xvcnMgaGVyZVxuICAgICAgICAvLyBpZiBfaW5wdXQuY3NzPyBhbmQgcmdiID0gX2lucHV0LmNzcyBoZXhcbiAgICAgICAgLy8gICAgIHJldHVybiByZ2JcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwidW5rbm93biBoZXggY29sb3I6IFwiICsgaGV4KSk7XG4gICAgfTtcblxuICAgIHZhciBoZXgycmdiXzEgPSBoZXgycmdiO1xuXG4gICAgdmFyIHR5cGUkNSA9IHV0aWxzLnR5cGU7XG5cblxuXG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5oZXggPSBmdW5jdGlvbihtb2RlKSB7XG4gICAgICAgIHJldHVybiByZ2IyaGV4XzEodGhpcy5fcmdiLCBtb2RlKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEuaGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnaGV4J10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQuaGV4ID0gaGV4MnJnYl8xO1xuICAgIGlucHV0LmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDQsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgcmVzdFsgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgICAgICAgICAgaWYgKCFyZXN0Lmxlbmd0aCAmJiB0eXBlJDUoaCkgPT09ICdzdHJpbmcnICYmIFszLDQsNSw2LDcsOCw5XS5pbmRleE9mKGgubGVuZ3RoKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoZXgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJGQgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIFRXT1BJID0gdXRpbHMuVFdPUEk7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluO1xuICAgIHZhciBzcXJ0ID0gTWF0aC5zcXJ0O1xuICAgIHZhciBhY29zID0gTWF0aC5hY29zO1xuXG4gICAgdmFyIHJnYjJoc2kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgLypcbiAgICAgICAgYm9ycm93ZWQgZnJvbSBoZXJlOlxuICAgICAgICBodHRwOi8vaHVtbWVyLnN0YW5mb3JkLmVkdS9tdXNlaW5mby9kb2MvZXhhbXBsZXMvaHVtZHJ1bS9rZXlzY2FwZTIvcmdiMmhzaS5jcHBcbiAgICAgICAgKi9cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRkKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgciAvPSAyNTU7XG4gICAgICAgIGcgLz0gMjU1O1xuICAgICAgICBiIC89IDI1NTtcbiAgICAgICAgdmFyIGg7XG4gICAgICAgIHZhciBtaW5fID0gbWluKHIsZyxiKTtcbiAgICAgICAgdmFyIGkgPSAocitnK2IpIC8gMztcbiAgICAgICAgdmFyIHMgPSBpID4gMCA/IDEgLSBtaW5fL2kgOiAwO1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgaCA9IE5hTjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGggPSAoKHItZykrKHItYikpIC8gMjtcbiAgICAgICAgICAgIGggLz0gc3FydCgoci1nKSooci1nKSArIChyLWIpKihnLWIpKTtcbiAgICAgICAgICAgIGggPSBhY29zKGgpO1xuICAgICAgICAgICAgaWYgKGIgPiBnKSB7XG4gICAgICAgICAgICAgICAgaCA9IFRXT1BJIC0gaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggLz0gVFdPUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtoKjM2MCxzLGldO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMmhzaV8xID0gcmdiMmhzaTtcblxuICAgIHZhciB1bnBhY2skZSA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgbGltaXQkMSA9IHV0aWxzLmxpbWl0O1xuICAgIHZhciBUV09QSSQxID0gdXRpbHMuVFdPUEk7XG4gICAgdmFyIFBJVEhJUkQgPSB1dGlscy5QSVRISVJEO1xuICAgIHZhciBjb3MgPSBNYXRoLmNvcztcblxuICAgIC8qXG4gICAgICogaHVlIFswLi4zNjBdXG4gICAgICogc2F0dXJhdGlvbiBbMC4uMV1cbiAgICAgKiBpbnRlbnNpdHkgWzAuLjFdXG4gICAgICovXG4gICAgdmFyIGhzaTJyZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgLypcbiAgICAgICAgYm9ycm93ZWQgZnJvbSBoZXJlOlxuICAgICAgICBodHRwOi8vaHVtbWVyLnN0YW5mb3JkLmVkdS9tdXNlaW5mby9kb2MvZXhhbXBsZXMvaHVtZHJ1bS9rZXlzY2FwZTIvaHNpMnJnYi5jcHBcbiAgICAgICAgKi9cbiAgICAgICAgYXJncyA9IHVucGFjayRlKGFyZ3MsICdoc2knKTtcbiAgICAgICAgdmFyIGggPSBhcmdzWzBdO1xuICAgICAgICB2YXIgcyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBpID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHIsZyxiO1xuXG4gICAgICAgIGlmIChpc05hTihoKSkgeyBoID0gMDsgfVxuICAgICAgICBpZiAoaXNOYU4ocykpIHsgcyA9IDA7IH1cbiAgICAgICAgLy8gbm9ybWFsaXplIGh1ZVxuICAgICAgICBpZiAoaCA+IDM2MCkgeyBoIC09IDM2MDsgfVxuICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgaCAvPSAzNjA7XG4gICAgICAgIGlmIChoIDwgMS8zKSB7XG4gICAgICAgICAgICBiID0gKDEtcykvMztcbiAgICAgICAgICAgIHIgPSAoMStzKmNvcyhUV09QSSQxKmgpL2NvcyhQSVRISVJELVRXT1BJJDEqaCkpLzM7XG4gICAgICAgICAgICBnID0gMSAtIChiK3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGggPCAyLzMpIHtcbiAgICAgICAgICAgIGggLT0gMS8zO1xuICAgICAgICAgICAgciA9ICgxLXMpLzM7XG4gICAgICAgICAgICBnID0gKDErcypjb3MoVFdPUEkkMSpoKS9jb3MoUElUSElSRC1UV09QSSQxKmgpKS8zO1xuICAgICAgICAgICAgYiA9IDEgLSAocitnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGggLT0gMi8zO1xuICAgICAgICAgICAgZyA9ICgxLXMpLzM7XG4gICAgICAgICAgICBiID0gKDErcypjb3MoVFdPUEkkMSpoKS9jb3MoUElUSElSRC1UV09QSSQxKmgpKS8zO1xuICAgICAgICAgICAgciA9IDEgLSAoZytiKTtcbiAgICAgICAgfVxuICAgICAgICByID0gbGltaXQkMShpKnIqMyk7XG4gICAgICAgIGcgPSBsaW1pdCQxKGkqZyozKTtcbiAgICAgICAgYiA9IGxpbWl0JDEoaSpiKjMpO1xuICAgICAgICByZXR1cm4gW3IqMjU1LCBnKjI1NSwgYioyNTUsIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXTtcbiAgICB9O1xuXG4gICAgdmFyIGhzaTJyZ2JfMSA9IGhzaTJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrJGYgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkNiA9IHV0aWxzLnR5cGU7XG5cblxuXG5cblxuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuaHNpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IyaHNpXzEodGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEuaHNpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnaHNpJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQuaHNpID0gaHNpMnJnYl8xO1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skZihhcmdzLCAnaHNpJyk7XG4gICAgICAgICAgICBpZiAodHlwZSQ2KGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoc2knO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJGcgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkNyA9IHV0aWxzLnR5cGU7XG5cblxuXG5cblxuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuaHNsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IyaHNsXzEodGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEuaHNsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnaHNsJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQuaHNsID0gaHNsMnJnYl8xO1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skZyhhcmdzLCAnaHNsJyk7XG4gICAgICAgICAgICBpZiAodHlwZSQ3KGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoc2wnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJGggPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIG1pbiQxID0gTWF0aC5taW47XG4gICAgdmFyIG1heCQxID0gTWF0aC5tYXg7XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSByZ2IyaHN2KHIsZyxiKVxuICAgICAqIC0gcmdiMmhzdihbcixnLGJdKVxuICAgICAqIC0gcmdiMmhzdih7cixnLGJ9KVxuICAgICAqL1xuICAgIHZhciByZ2IyaHNsJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgYXJncyA9IHVucGFjayRoKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSBhcmdzWzBdO1xuICAgICAgICB2YXIgZyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBiID0gYXJnc1syXTtcbiAgICAgICAgdmFyIG1pbl8gPSBtaW4kMShyLCBnLCBiKTtcbiAgICAgICAgdmFyIG1heF8gPSBtYXgkMShyLCBnLCBiKTtcbiAgICAgICAgdmFyIGRlbHRhID0gbWF4XyAtIG1pbl87XG4gICAgICAgIHZhciBoLHMsdjtcbiAgICAgICAgdiA9IG1heF8gLyAyNTUuMDtcbiAgICAgICAgaWYgKG1heF8gPT09IDApIHtcbiAgICAgICAgICAgIGggPSBOdW1iZXIuTmFOO1xuICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gZGVsdGEgLyBtYXhfO1xuICAgICAgICAgICAgaWYgKHIgPT09IG1heF8pIHsgaCA9IChnIC0gYikgLyBkZWx0YTsgfVxuICAgICAgICAgICAgaWYgKGcgPT09IG1heF8pIHsgaCA9IDIrKGIgLSByKSAvIGRlbHRhOyB9XG4gICAgICAgICAgICBpZiAoYiA9PT0gbWF4XykgeyBoID0gNCsociAtIGcpIC8gZGVsdGE7IH1cbiAgICAgICAgICAgIGggKj0gNjA7XG4gICAgICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2gsIHMsIHZdXG4gICAgfTtcblxuICAgIHZhciByZ2IyaHN2ID0gcmdiMmhzbCQxO1xuXG4gICAgdmFyIHVucGFjayRpID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBmbG9vciQxID0gTWF0aC5mbG9vcjtcblxuICAgIHZhciBoc3YycmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXNzaWduLCBhc3NpZ24kMSwgYXNzaWduJDIsIGFzc2lnbiQzLCBhc3NpZ24kNCwgYXNzaWduJDU7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcbiAgICAgICAgYXJncyA9IHVucGFjayRpKGFyZ3MsICdoc3YnKTtcbiAgICAgICAgdmFyIGggPSBhcmdzWzBdO1xuICAgICAgICB2YXIgcyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciB2ID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHIsZyxiO1xuICAgICAgICB2ICo9IDI1NTtcbiAgICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgICAgIHIgPSBnID0gYiA9IHY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaCA9PT0gMzYwKSB7IGggPSAwOyB9XG4gICAgICAgICAgICBpZiAoaCA+IDM2MCkgeyBoIC09IDM2MDsgfVxuICAgICAgICAgICAgaWYgKGggPCAwKSB7IGggKz0gMzYwOyB9XG4gICAgICAgICAgICBoIC89IDYwO1xuXG4gICAgICAgICAgICB2YXIgaSA9IGZsb29yJDEoaCk7XG4gICAgICAgICAgICB2YXIgZiA9IGggLSBpO1xuICAgICAgICAgICAgdmFyIHAgPSB2ICogKDEgLSBzKTtcbiAgICAgICAgICAgIHZhciBxID0gdiAqICgxIC0gcyAqIGYpO1xuICAgICAgICAgICAgdmFyIHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogKGFzc2lnbiA9IFt2LCB0LCBwXSwgciA9IGFzc2lnblswXSwgZyA9IGFzc2lnblsxXSwgYiA9IGFzc2lnblsyXSk7IGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAxOiAoYXNzaWduJDEgPSBbcSwgdiwgcF0sIHIgPSBhc3NpZ24kMVswXSwgZyA9IGFzc2lnbiQxWzFdLCBiID0gYXNzaWduJDFbMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgMjogKGFzc2lnbiQyID0gW3AsIHYsIHRdLCByID0gYXNzaWduJDJbMF0sIGcgPSBhc3NpZ24kMlsxXSwgYiA9IGFzc2lnbiQyWzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDM6IChhc3NpZ24kMyA9IFtwLCBxLCB2XSwgciA9IGFzc2lnbiQzWzBdLCBnID0gYXNzaWduJDNbMV0sIGIgPSBhc3NpZ24kM1syXSk7IGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSA0OiAoYXNzaWduJDQgPSBbdCwgcCwgdl0sIHIgPSBhc3NpZ24kNFswXSwgZyA9IGFzc2lnbiQ0WzFdLCBiID0gYXNzaWduJDRbMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgNTogKGFzc2lnbiQ1ID0gW3YsIHAsIHFdLCByID0gYXNzaWduJDVbMF0sIGcgPSBhc3NpZ24kNVsxXSwgYiA9IGFzc2lnbiQ1WzJdKTsgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3IsZyxiLGFyZ3MubGVuZ3RoID4gMz9hcmdzWzNdOjFdO1xuICAgIH07XG5cbiAgICB2YXIgaHN2MnJnYl8xID0gaHN2MnJnYjtcblxuICAgIHZhciB1bnBhY2skaiA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgdHlwZSQ4ID0gdXRpbHMudHlwZTtcblxuXG5cblxuXG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5oc3YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJnYjJoc3YodGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEuaHN2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnaHN2J10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQuaHN2ID0gaHN2MnJnYl8xO1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skaihhcmdzLCAnaHN2Jyk7XG4gICAgICAgICAgICBpZiAodHlwZSQ4KGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoc3YnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbGFiQ29uc3RhbnRzID0ge1xuICAgICAgICAvLyBDb3JyZXNwb25kcyByb3VnaGx5IHRvIFJHQiBicmlnaHRlci9kYXJrZXJcbiAgICAgICAgS246IDE4LFxuXG4gICAgICAgIC8vIEQ2NSBzdGFuZGFyZCByZWZlcmVudFxuICAgICAgICBYbjogMC45NTA0NzAsXG4gICAgICAgIFluOiAxLFxuICAgICAgICBabjogMS4wODg4MzAsXG5cbiAgICAgICAgdDA6IDAuMTM3OTMxMDM0LCAgLy8gNCAvIDI5XG4gICAgICAgIHQxOiAwLjIwNjg5NjU1MiwgIC8vIDYgLyAyOVxuICAgICAgICB0MjogMC4xMjg0MTg1NSwgICAvLyAzICogdDEgKiB0MVxuICAgICAgICB0MzogMC4wMDg4NTY0NTIsICAvLyB0MSAqIHQxICogdDFcbiAgICB9O1xuXG4gICAgdmFyIHVucGFjayRrID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBwb3cgPSBNYXRoLnBvdztcblxuICAgIHZhciByZ2IybGFiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skayhhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IHJnYjJ4eXoocixnLGIpO1xuICAgICAgICB2YXIgeCA9IHJlZiQxWzBdO1xuICAgICAgICB2YXIgeSA9IHJlZiQxWzFdO1xuICAgICAgICB2YXIgeiA9IHJlZiQxWzJdO1xuICAgICAgICB2YXIgbCA9IDExNiAqIHkgLSAxNjtcbiAgICAgICAgcmV0dXJuIFtsIDwgMCA/IDAgOiBsLCA1MDAgKiAoeCAtIHkpLCAyMDAgKiAoeSAtIHopXTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYl94eXogPSBmdW5jdGlvbiAocikge1xuICAgICAgICBpZiAoKHIgLz0gMjU1KSA8PSAwLjA0MDQ1KSB7IHJldHVybiByIC8gMTIuOTI7IH1cbiAgICAgICAgcmV0dXJuIHBvdygociArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIH07XG5cbiAgICB2YXIgeHl6X2xhYiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0ID4gbGFiQ29uc3RhbnRzLnQzKSB7IHJldHVybiBwb3codCwgMSAvIDMpOyB9XG4gICAgICAgIHJldHVybiB0IC8gbGFiQ29uc3RhbnRzLnQyICsgbGFiQ29uc3RhbnRzLnQwO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMnh5eiA9IGZ1bmN0aW9uIChyLGcsYikge1xuICAgICAgICByID0gcmdiX3h5eihyKTtcbiAgICAgICAgZyA9IHJnYl94eXooZyk7XG4gICAgICAgIGIgPSByZ2JfeHl6KGIpO1xuICAgICAgICB2YXIgeCA9IHh5el9sYWIoKDAuNDEyNDU2NCAqIHIgKyAwLjM1NzU3NjEgKiBnICsgMC4xODA0Mzc1ICogYikgLyBsYWJDb25zdGFudHMuWG4pO1xuICAgICAgICB2YXIgeSA9IHh5el9sYWIoKDAuMjEyNjcyOSAqIHIgKyAwLjcxNTE1MjIgKiBnICsgMC4wNzIxNzUwICogYikgLyBsYWJDb25zdGFudHMuWW4pO1xuICAgICAgICB2YXIgeiA9IHh5el9sYWIoKDAuMDE5MzMzOSAqIHIgKyAwLjExOTE5MjAgKiBnICsgMC45NTAzMDQxICogYikgLyBsYWJDb25zdGFudHMuWm4pO1xuICAgICAgICByZXR1cm4gW3gseSx6XTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJsYWJfMSA9IHJnYjJsYWI7XG5cbiAgICB2YXIgdW5wYWNrJGwgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHBvdyQxID0gTWF0aC5wb3c7XG5cbiAgICAvKlxuICAgICAqIEwqIFswLi4xMDBdXG4gICAgICogYSBbLTEwMC4uMTAwXVxuICAgICAqIGIgWy0xMDAuLjEwMF1cbiAgICAgKi9cbiAgICB2YXIgbGFiMnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICBhcmdzID0gdW5wYWNrJGwoYXJncywgJ2xhYicpO1xuICAgICAgICB2YXIgbCA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBhID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIGIgPSBhcmdzWzJdO1xuICAgICAgICB2YXIgeCx5LHosIHIsZyxiXztcblxuICAgICAgICB5ID0gKGwgKyAxNikgLyAxMTY7XG4gICAgICAgIHggPSBpc05hTihhKSA/IHkgOiB5ICsgYSAvIDUwMDtcbiAgICAgICAgeiA9IGlzTmFOKGIpID8geSA6IHkgLSBiIC8gMjAwO1xuXG4gICAgICAgIHkgPSBsYWJDb25zdGFudHMuWW4gKiBsYWJfeHl6KHkpO1xuICAgICAgICB4ID0gbGFiQ29uc3RhbnRzLlhuICogbGFiX3h5eih4KTtcbiAgICAgICAgeiA9IGxhYkNvbnN0YW50cy5abiAqIGxhYl94eXooeik7XG5cbiAgICAgICAgciA9IHh5el9yZ2IoMy4yNDA0NTQyICogeCAtIDEuNTM3MTM4NSAqIHkgLSAwLjQ5ODUzMTQgKiB6KTsgIC8vIEQ2NSAtPiBzUkdCXG4gICAgICAgIGcgPSB4eXpfcmdiKC0wLjk2OTI2NjAgKiB4ICsgMS44NzYwMTA4ICogeSArIDAuMDQxNTU2MCAqIHopO1xuICAgICAgICBiXyA9IHh5el9yZ2IoMC4wNTU2NDM0ICogeCAtIDAuMjA0MDI1OSAqIHkgKyAxLjA1NzIyNTIgKiB6KTtcblxuICAgICAgICByZXR1cm4gW3IsZyxiXyxhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciB4eXpfcmdiID0gZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgcmV0dXJuIDI1NSAqIChyIDw9IDAuMDAzMDQgPyAxMi45MiAqIHIgOiAxLjA1NSAqIHBvdyQxKHIsIDEgLyAyLjQpIC0gMC4wNTUpXG4gICAgfTtcblxuICAgIHZhciBsYWJfeHl6ID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPiBsYWJDb25zdGFudHMudDEgPyB0ICogdCAqIHQgOiBsYWJDb25zdGFudHMudDIgKiAodCAtIGxhYkNvbnN0YW50cy50MClcbiAgICB9O1xuXG4gICAgdmFyIGxhYjJyZ2JfMSA9IGxhYjJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrJG0gPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkOSA9IHV0aWxzLnR5cGU7XG5cblxuXG5cblxuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUubGFiID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IybGFiXzEodGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEubGFiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnbGFiJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQubGFiID0gbGFiMnJnYl8xO1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skbShhcmdzLCAnbGFiJyk7XG4gICAgICAgICAgICBpZiAodHlwZSQ5KGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsYWInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJG4gPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIFJBRDJERUcgPSB1dGlscy5SQUQyREVHO1xuICAgIHZhciBzcXJ0JDEgPSBNYXRoLnNxcnQ7XG4gICAgdmFyIGF0YW4yID0gTWF0aC5hdGFuMjtcbiAgICB2YXIgcm91bmQkNCA9IE1hdGgucm91bmQ7XG5cbiAgICB2YXIgbGFiMmxjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgcmVmID0gdW5wYWNrJG4oYXJncywgJ2xhYicpO1xuICAgICAgICB2YXIgbCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGEgPSByZWZbMV07XG4gICAgICAgIHZhciBiID0gcmVmWzJdO1xuICAgICAgICB2YXIgYyA9IHNxcnQkMShhICogYSArIGIgKiBiKTtcbiAgICAgICAgdmFyIGggPSAoYXRhbjIoYiwgYSkgKiBSQUQyREVHICsgMzYwKSAlIDM2MDtcbiAgICAgICAgaWYgKHJvdW5kJDQoYyoxMDAwMCkgPT09IDApIHsgaCA9IE51bWJlci5OYU47IH1cbiAgICAgICAgcmV0dXJuIFtsLCBjLCBoXTtcbiAgICB9O1xuXG4gICAgdmFyIGxhYjJsY2hfMSA9IGxhYjJsY2g7XG5cbiAgICB2YXIgdW5wYWNrJG8gPSB1dGlscy51bnBhY2s7XG5cblxuXG4gICAgdmFyIHJnYjJsY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRvKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gcmdiMmxhYl8xKHIsZyxiKTtcbiAgICAgICAgdmFyIGwgPSByZWYkMVswXTtcbiAgICAgICAgdmFyIGEgPSByZWYkMVsxXTtcbiAgICAgICAgdmFyIGJfID0gcmVmJDFbMl07XG4gICAgICAgIHJldHVybiBsYWIybGNoXzEobCxhLGJfKTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJsY2hfMSA9IHJnYjJsY2g7XG5cbiAgICB2YXIgdW5wYWNrJHAgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIERFRzJSQUQgPSB1dGlscy5ERUcyUkFEO1xuICAgIHZhciBzaW4gPSBNYXRoLnNpbjtcbiAgICB2YXIgY29zJDEgPSBNYXRoLmNvcztcblxuICAgIHZhciBsY2gybGFiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIC8qXG4gICAgICAgIENvbnZlcnQgZnJvbSBhIHF1YWxpdGF0aXZlIHBhcmFtZXRlciBoIGFuZCBhIHF1YW50aXRhdGl2ZSBwYXJhbWV0ZXIgbCB0byBhIDI0LWJpdCBwaXhlbC5cbiAgICAgICAgVGhlc2UgZm9ybXVsYXMgd2VyZSBpbnZlbnRlZCBieSBEYXZpZCBEYWxyeW1wbGUgdG8gb2J0YWluIG1heGltdW0gY29udHJhc3Qgd2l0aG91dCBnb2luZ1xuICAgICAgICBvdXQgb2YgZ2FtdXQgaWYgdGhlIHBhcmFtZXRlcnMgYXJlIGluIHRoZSByYW5nZSAwLTEuXG5cbiAgICAgICAgQSBzYXR1cmF0aW9uIG11bHRpcGxpZXIgd2FzIGFkZGVkIGJ5IEdyZWdvciBBaXNjaFxuICAgICAgICAqL1xuICAgICAgICB2YXIgcmVmID0gdW5wYWNrJHAoYXJncywgJ2xjaCcpO1xuICAgICAgICB2YXIgbCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGMgPSByZWZbMV07XG4gICAgICAgIHZhciBoID0gcmVmWzJdO1xuICAgICAgICBpZiAoaXNOYU4oaCkpIHsgaCA9IDA7IH1cbiAgICAgICAgaCA9IGggKiBERUcyUkFEO1xuICAgICAgICByZXR1cm4gW2wsIGNvcyQxKGgpICogYywgc2luKGgpICogY11cbiAgICB9O1xuXG4gICAgdmFyIGxjaDJsYWJfMSA9IGxjaDJsYWI7XG5cbiAgICB2YXIgdW5wYWNrJHEgPSB1dGlscy51bnBhY2s7XG5cblxuXG4gICAgdmFyIGxjaDJyZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgYXJncyA9IHVucGFjayRxKGFyZ3MsICdsY2gnKTtcbiAgICAgICAgdmFyIGwgPSBhcmdzWzBdO1xuICAgICAgICB2YXIgYyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBoID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHJlZiA9IGxjaDJsYWJfMSAobCxjLGgpO1xuICAgICAgICB2YXIgTCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGEgPSByZWZbMV07XG4gICAgICAgIHZhciBiXyA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gbGFiMnJnYl8xIChMLGEsYl8pO1xuICAgICAgICB2YXIgciA9IHJlZiQxWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZiQxWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZiQxWzJdO1xuICAgICAgICByZXR1cm4gW3IsIGcsIGIsIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXTtcbiAgICB9O1xuXG4gICAgdmFyIGxjaDJyZ2JfMSA9IGxjaDJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrJHIgPSB1dGlscy51bnBhY2s7XG5cblxuICAgIHZhciBoY2wycmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciBoY2wgPSB1bnBhY2skcihhcmdzLCAnaGNsJykucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gbGNoMnJnYl8xLmFwcGx5KHZvaWQgMCwgaGNsKTtcbiAgICB9O1xuXG4gICAgdmFyIGhjbDJyZ2JfMSA9IGhjbDJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrJHMgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkYSA9IHV0aWxzLnR5cGU7XG5cblxuXG5cblxuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUubGNoID0gZnVuY3Rpb24oKSB7IHJldHVybiByZ2IybGNoXzEodGhpcy5fcmdiKTsgfTtcbiAgICBDb2xvcl8xLnByb3RvdHlwZS5oY2wgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHJnYjJsY2hfMSh0aGlzLl9yZ2IpLnJldmVyc2UoKTsgfTtcblxuICAgIGNocm9tYV8xLmxjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3JfMSwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2xjaCddKSApKTtcbiAgICB9O1xuICAgIGNocm9tYV8xLmhjbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3JfMSwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2hjbCddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQuZm9ybWF0LmxjaCA9IGxjaDJyZ2JfMTtcbiAgICBpbnB1dC5mb3JtYXQuaGNsID0gaGNsMnJnYl8xO1xuXG4gICAgWydsY2gnLCdoY2wnXS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7IHJldHVybiBpbnB1dC5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAyLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayRzKGFyZ3MsIG0pO1xuICAgICAgICAgICAgaWYgKHR5cGUkYShhcmdzKSA9PT0gJ2FycmF5JyAmJiBhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7IH0pO1xuXG4gICAgLyoqXG4gICAgXHRYMTEgY29sb3IgbmFtZXNcblxuICAgIFx0aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jc3ZnLWNvbG9yXG4gICAgKi9cblxuICAgIHZhciB3M2N4MTEgPSB7XG4gICAgICAgIGFsaWNlYmx1ZTogJyNmMGY4ZmYnLFxuICAgICAgICBhbnRpcXVld2hpdGU6ICcjZmFlYmQ3JyxcbiAgICAgICAgYXF1YTogJyMwMGZmZmYnLFxuICAgICAgICBhcXVhbWFyaW5lOiAnIzdmZmZkNCcsXG4gICAgICAgIGF6dXJlOiAnI2YwZmZmZicsXG4gICAgICAgIGJlaWdlOiAnI2Y1ZjVkYycsXG4gICAgICAgIGJpc3F1ZTogJyNmZmU0YzQnLFxuICAgICAgICBibGFjazogJyMwMDAwMDAnLFxuICAgICAgICBibGFuY2hlZGFsbW9uZDogJyNmZmViY2QnLFxuICAgICAgICBibHVlOiAnIzAwMDBmZicsXG4gICAgICAgIGJsdWV2aW9sZXQ6ICcjOGEyYmUyJyxcbiAgICAgICAgYnJvd246ICcjYTUyYTJhJyxcbiAgICAgICAgYnVybHl3b29kOiAnI2RlYjg4NycsXG4gICAgICAgIGNhZGV0Ymx1ZTogJyM1ZjllYTAnLFxuICAgICAgICBjaGFydHJldXNlOiAnIzdmZmYwMCcsXG4gICAgICAgIGNob2NvbGF0ZTogJyNkMjY5MWUnLFxuICAgICAgICBjb3JhbDogJyNmZjdmNTAnLFxuICAgICAgICBjb3JuZmxvd2VyOiAnIzY0OTVlZCcsXG4gICAgICAgIGNvcm5mbG93ZXJibHVlOiAnIzY0OTVlZCcsXG4gICAgICAgIGNvcm5zaWxrOiAnI2ZmZjhkYycsXG4gICAgICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICAgICAgY3lhbjogJyMwMGZmZmYnLFxuICAgICAgICBkYXJrYmx1ZTogJyMwMDAwOGInLFxuICAgICAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgICAgICBkYXJrZ29sZGVucm9kOiAnI2I4ODYwYicsXG4gICAgICAgIGRhcmtncmF5OiAnI2E5YTlhOScsXG4gICAgICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgICAgICBkYXJrZ3JleTogJyNhOWE5YTknLFxuICAgICAgICBkYXJra2hha2k6ICcjYmRiNzZiJyxcbiAgICAgICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICAgICAgZGFya29saXZlZ3JlZW46ICcjNTU2YjJmJyxcbiAgICAgICAgZGFya29yYW5nZTogJyNmZjhjMDAnLFxuICAgICAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgICAgIGRhcmtyZWQ6ICcjOGIwMDAwJyxcbiAgICAgICAgZGFya3NhbG1vbjogJyNlOTk2N2EnLFxuICAgICAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICAgICAgZGFya3NsYXRlYmx1ZTogJyM0ODNkOGInLFxuICAgICAgICBkYXJrc2xhdGVncmF5OiAnIzJmNGY0ZicsXG4gICAgICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICAgICAgZGFya3R1cnF1b2lzZTogJyMwMGNlZDEnLFxuICAgICAgICBkYXJrdmlvbGV0OiAnIzk0MDBkMycsXG4gICAgICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgICAgIGRlZXBza3libHVlOiAnIzAwYmZmZicsXG4gICAgICAgIGRpbWdyYXk6ICcjNjk2OTY5JyxcbiAgICAgICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgICAgICBkb2RnZXJibHVlOiAnIzFlOTBmZicsXG4gICAgICAgIGZpcmVicmljazogJyNiMjIyMjInLFxuICAgICAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgICAgICBmb3Jlc3RncmVlbjogJyMyMjhiMjInLFxuICAgICAgICBmdWNoc2lhOiAnI2ZmMDBmZicsXG4gICAgICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgICAgICBnaG9zdHdoaXRlOiAnI2Y4ZjhmZicsXG4gICAgICAgIGdvbGQ6ICcjZmZkNzAwJyxcbiAgICAgICAgZ29sZGVucm9kOiAnI2RhYTUyMCcsXG4gICAgICAgIGdyYXk6ICcjODA4MDgwJyxcbiAgICAgICAgZ3JlZW46ICcjMDA4MDAwJyxcbiAgICAgICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICAgICAgZ3JleTogJyM4MDgwODAnLFxuICAgICAgICBob25leWRldzogJyNmMGZmZjAnLFxuICAgICAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgICAgIGluZGlhbnJlZDogJyNjZDVjNWMnLFxuICAgICAgICBpbmRpZ286ICcjNGIwMDgyJyxcbiAgICAgICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICAgICAga2hha2k6ICcjZjBlNjhjJyxcbiAgICAgICAgbGFzZXJsZW1vbjogJyNmZmZmNTQnLFxuICAgICAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgICAgICBsYXZlbmRlcmJsdXNoOiAnI2ZmZjBmNScsXG4gICAgICAgIGxhd25ncmVlbjogJyM3Y2ZjMDAnLFxuICAgICAgICBsZW1vbmNoaWZmb246ICcjZmZmYWNkJyxcbiAgICAgICAgbGlnaHRibHVlOiAnI2FkZDhlNicsXG4gICAgICAgIGxpZ2h0Y29yYWw6ICcjZjA4MDgwJyxcbiAgICAgICAgbGlnaHRjeWFuOiAnI2UwZmZmZicsXG4gICAgICAgIGxpZ2h0Z29sZGVucm9kOiAnI2ZhZmFkMicsXG4gICAgICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiAnI2ZhZmFkMicsXG4gICAgICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgICAgICBsaWdodGdyZWVuOiAnIzkwZWU5MCcsXG4gICAgICAgIGxpZ2h0Z3JleTogJyNkM2QzZDMnLFxuICAgICAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICAgICAgbGlnaHRzYWxtb246ICcjZmZhMDdhJyxcbiAgICAgICAgbGlnaHRzZWFncmVlbjogJyMyMGIyYWEnLFxuICAgICAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICAgICAgbGlnaHRzbGF0ZWdyYXk6ICcjNzc4ODk5JyxcbiAgICAgICAgbGlnaHRzbGF0ZWdyZXk6ICcjNzc4ODk5JyxcbiAgICAgICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICAgICAgbGlnaHR5ZWxsb3c6ICcjZmZmZmUwJyxcbiAgICAgICAgbGltZTogJyMwMGZmMDAnLFxuICAgICAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICAgICAgbGluZW46ICcjZmFmMGU2JyxcbiAgICAgICAgbWFnZW50YTogJyNmZjAwZmYnLFxuICAgICAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICAgICAgbWFyb29uMjogJyM3ZjAwMDAnLFxuICAgICAgICBtYXJvb24zOiAnI2IwMzA2MCcsXG4gICAgICAgIG1lZGl1bWFxdWFtYXJpbmU6ICcjNjZjZGFhJyxcbiAgICAgICAgbWVkaXVtYmx1ZTogJyMwMDAwY2QnLFxuICAgICAgICBtZWRpdW1vcmNoaWQ6ICcjYmE1NWQzJyxcbiAgICAgICAgbWVkaXVtcHVycGxlOiAnIzkzNzBkYicsXG4gICAgICAgIG1lZGl1bXNlYWdyZWVuOiAnIzNjYjM3MScsXG4gICAgICAgIG1lZGl1bXNsYXRlYmx1ZTogJyM3YjY4ZWUnLFxuICAgICAgICBtZWRpdW1zcHJpbmdncmVlbjogJyMwMGZhOWEnLFxuICAgICAgICBtZWRpdW10dXJxdW9pc2U6ICcjNDhkMWNjJyxcbiAgICAgICAgbWVkaXVtdmlvbGV0cmVkOiAnI2M3MTU4NScsXG4gICAgICAgIG1pZG5pZ2h0Ymx1ZTogJyMxOTE5NzAnLFxuICAgICAgICBtaW50Y3JlYW06ICcjZjVmZmZhJyxcbiAgICAgICAgbWlzdHlyb3NlOiAnI2ZmZTRlMScsXG4gICAgICAgIG1vY2Nhc2luOiAnI2ZmZTRiNScsXG4gICAgICAgIG5hdmFqb3doaXRlOiAnI2ZmZGVhZCcsXG4gICAgICAgIG5hdnk6ICcjMDAwMDgwJyxcbiAgICAgICAgb2xkbGFjZTogJyNmZGY1ZTYnLFxuICAgICAgICBvbGl2ZTogJyM4MDgwMDAnLFxuICAgICAgICBvbGl2ZWRyYWI6ICcjNmI4ZTIzJyxcbiAgICAgICAgb3JhbmdlOiAnI2ZmYTUwMCcsXG4gICAgICAgIG9yYW5nZXJlZDogJyNmZjQ1MDAnLFxuICAgICAgICBvcmNoaWQ6ICcjZGE3MGQ2JyxcbiAgICAgICAgcGFsZWdvbGRlbnJvZDogJyNlZWU4YWEnLFxuICAgICAgICBwYWxlZ3JlZW46ICcjOThmYjk4JyxcbiAgICAgICAgcGFsZXR1cnF1b2lzZTogJyNhZmVlZWUnLFxuICAgICAgICBwYWxldmlvbGV0cmVkOiAnI2RiNzA5MycsXG4gICAgICAgIHBhcGF5YXdoaXA6ICcjZmZlZmQ1JyxcbiAgICAgICAgcGVhY2hwdWZmOiAnI2ZmZGFiOScsXG4gICAgICAgIHBlcnU6ICcjY2Q4NTNmJyxcbiAgICAgICAgcGluazogJyNmZmMwY2InLFxuICAgICAgICBwbHVtOiAnI2RkYTBkZCcsXG4gICAgICAgIHBvd2RlcmJsdWU6ICcjYjBlMGU2JyxcbiAgICAgICAgcHVycGxlOiAnIzgwMDA4MCcsXG4gICAgICAgIHB1cnBsZTI6ICcjN2YwMDdmJyxcbiAgICAgICAgcHVycGxlMzogJyNhMDIwZjAnLFxuICAgICAgICByZWJlY2NhcHVycGxlOiAnIzY2MzM5OScsXG4gICAgICAgIHJlZDogJyNmZjAwMDAnLFxuICAgICAgICByb3N5YnJvd246ICcjYmM4ZjhmJyxcbiAgICAgICAgcm95YWxibHVlOiAnIzQxNjllMScsXG4gICAgICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgICAgIHNhbG1vbjogJyNmYTgwNzInLFxuICAgICAgICBzYW5keWJyb3duOiAnI2Y0YTQ2MCcsXG4gICAgICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgICAgIHNlYXNoZWxsOiAnI2ZmZjVlZScsXG4gICAgICAgIHNpZW5uYTogJyNhMDUyMmQnLFxuICAgICAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICAgICAgc2t5Ymx1ZTogJyM4N2NlZWInLFxuICAgICAgICBzbGF0ZWJsdWU6ICcjNmE1YWNkJyxcbiAgICAgICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgICAgIHNsYXRlZ3JleTogJyM3MDgwOTAnLFxuICAgICAgICBzbm93OiAnI2ZmZmFmYScsXG4gICAgICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgICAgIHN0ZWVsYmx1ZTogJyM0NjgyYjQnLFxuICAgICAgICB0YW46ICcjZDJiNDhjJyxcbiAgICAgICAgdGVhbDogJyMwMDgwODAnLFxuICAgICAgICB0aGlzdGxlOiAnI2Q4YmZkOCcsXG4gICAgICAgIHRvbWF0bzogJyNmZjYzNDcnLFxuICAgICAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICAgICAgdmlvbGV0OiAnI2VlODJlZScsXG4gICAgICAgIHdoZWF0OiAnI2Y1ZGViMycsXG4gICAgICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgICAgIHdoaXRlc21va2U6ICcjZjVmNWY1JyxcbiAgICAgICAgeWVsbG93OiAnI2ZmZmYwMCcsXG4gICAgICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMidcbiAgICB9O1xuXG4gICAgdmFyIHczY3gxMV8xID0gdzNjeDExO1xuXG4gICAgdmFyIHR5cGUkYiA9IHV0aWxzLnR5cGU7XG5cblxuXG5cblxuICAgIENvbG9yXzEucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhleCA9IHJnYjJoZXhfMSh0aGlzLl9yZ2IsICdyZ2InKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxpc3QgPSBPYmplY3Qua2V5cyh3M2N4MTFfMSk7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgbiA9IGxpc3RbaV07XG5cbiAgICAgICAgICAgIGlmICh3M2N4MTFfMVtuXSA9PT0gaGV4KSB7IHJldHVybiBuLnRvTG93ZXJDYXNlKCk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQubmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodzNjeDExXzFbbmFtZV0pIHsgcmV0dXJuIGhleDJyZ2JfMSh3M2N4MTFfMVtuYW1lXSk7IH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGNvbG9yIG5hbWU6ICcrbmFtZSk7XG4gICAgfTtcblxuICAgIGlucHV0LmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDUsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgcmVzdFsgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgICAgICAgICAgaWYgKCFyZXN0Lmxlbmd0aCAmJiB0eXBlJGIoaCkgPT09ICdzdHJpbmcnICYmIHczY3gxMV8xW2gudG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hbWVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVucGFjayR0ID0gdXRpbHMudW5wYWNrO1xuXG4gICAgdmFyIHJnYjJudW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayR0KGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgcmV0dXJuIChyIDw8IDE2KSArIChnIDw8IDgpICsgYjtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJudW1fMSA9IHJnYjJudW07XG5cbiAgICB2YXIgdHlwZSRjID0gdXRpbHMudHlwZTtcblxuICAgIHZhciBudW0ycmdiID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAodHlwZSRjKG51bSkgPT0gXCJudW1iZXJcIiAmJiBudW0gPj0gMCAmJiBudW0gPD0gMHhGRkZGRkYpIHtcbiAgICAgICAgICAgIHZhciByID0gbnVtID4+IDE2O1xuICAgICAgICAgICAgdmFyIGcgPSAobnVtID4+IDgpICYgMHhGRjtcbiAgICAgICAgICAgIHZhciBiID0gbnVtICYgMHhGRjtcbiAgICAgICAgICAgIHJldHVybiBbcixnLGIsMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biBudW0gY29sb3I6IFwiK251bSk7XG4gICAgfTtcblxuICAgIHZhciBudW0ycmdiXzEgPSBudW0ycmdiO1xuXG4gICAgdmFyIHR5cGUkZCA9IHV0aWxzLnR5cGU7XG5cblxuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUubnVtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IybnVtXzEodGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEubnVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnbnVtJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQubnVtID0gbnVtMnJnYl8xO1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogNSxcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiB0eXBlJGQoYXJnc1swXSkgPT09ICdudW1iZXInICYmIGFyZ3NbMF0gPj0gMCAmJiBhcmdzWzBdIDw9IDB4RkZGRkZGKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdudW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJHUgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkZSA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIHJvdW5kJDUgPSBNYXRoLnJvdW5kO1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUucmdiID0gZnVuY3Rpb24ocm5kKSB7XG4gICAgICAgIGlmICggcm5kID09PSB2b2lkIDAgKSBybmQ9dHJ1ZTtcblxuICAgICAgICBpZiAocm5kID09PSBmYWxzZSkgeyByZXR1cm4gdGhpcy5fcmdiLnNsaWNlKDAsMyk7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYi5zbGljZSgwLDMpLm1hcChyb3VuZCQ1KTtcbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUucmdiYSA9IGZ1bmN0aW9uKHJuZCkge1xuICAgICAgICBpZiAoIHJuZCA9PT0gdm9pZCAwICkgcm5kPXRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYi5zbGljZSgwLDQpLm1hcChmdW5jdGlvbiAodixpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTwzID8gKHJuZCA9PT0gZmFsc2UgPyB2IDogcm91bmQkNSh2KSkgOiB2O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY2hyb21hXzEucmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsncmdiJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dC5mb3JtYXQucmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZ2JhID0gdW5wYWNrJHUoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgaWYgKHJnYmFbM10gPT09IHVuZGVmaW5lZCkgeyByZ2JhWzNdID0gMTsgfVxuICAgICAgICByZXR1cm4gcmdiYTtcbiAgICB9O1xuXG4gICAgaW5wdXQuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMyxcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skdShhcmdzLCAncmdiYScpO1xuICAgICAgICAgICAgaWYgKHR5cGUkZShhcmdzKSA9PT0gJ2FycmF5JyAmJiAoYXJncy5sZW5ndGggPT09IDMgfHxcbiAgICAgICAgICAgICAgICBhcmdzLmxlbmd0aCA9PT0gNCAmJiB0eXBlJGUoYXJnc1szXSkgPT0gJ251bWJlcicgJiYgYXJnc1szXSA+PSAwICYmIGFyZ3NbM10gPD0gMSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogQmFzZWQgb24gaW1wbGVtZW50YXRpb24gYnkgTmVpbCBCYXJ0bGV0dFxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uZWlsYmFydGxldHQvY29sb3ItdGVtcGVyYXR1cmVcbiAgICAgKi9cblxuICAgIHZhciBsb2cgPSBNYXRoLmxvZztcblxuICAgIHZhciB0ZW1wZXJhdHVyZTJyZ2IgPSBmdW5jdGlvbiAoa2VsdmluKSB7XG4gICAgICAgIHZhciB0ZW1wID0ga2VsdmluIC8gMTAwO1xuICAgICAgICB2YXIgcixnLGI7XG4gICAgICAgIGlmICh0ZW1wIDwgNjYpIHtcbiAgICAgICAgICAgIHIgPSAyNTU7XG4gICAgICAgICAgICBnID0gLTE1NS4yNTQ4NTU2MjcwOTE3OSAtIDAuNDQ1OTY5NTA0Njk1NzkxMzMgKiAoZyA9IHRlbXAtMikgKyAxMDQuNDkyMTYxOTkzOTM4ODggKiBsb2coZyk7XG4gICAgICAgICAgICBiID0gdGVtcCA8IDIwID8gMCA6IC0yNTQuNzY5MzUxODQxMjA5MDIgKyAwLjgyNzQwOTYwNjQwMDczOTUgKiAoYiA9IHRlbXAtMTApICsgMTE1LjY3OTk0NDAxMDY2MTQ3ICogbG9nKGIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgciA9IDM1MS45NzY5MDU2NjgwNTY5MyArIDAuMTE0MjA2NDUzNzg0MTY1ICogKHIgPSB0ZW1wLTU1KSAtIDQwLjI1MzY2MzA5MzMyMTI3ICogbG9nKHIpO1xuICAgICAgICAgICAgZyA9IDMyNS40NDk0MTI1NzExOTc0ICsgMC4wNzk0MzQ1NjUzNjY2MjM0MiAqIChnID0gdGVtcC01MCkgLSAyOC4wODUyOTYzNTA3OTU3ICogbG9nKGcpO1xuICAgICAgICAgICAgYiA9IDI1NTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3IsZyxiLDFdO1xuICAgIH07XG5cbiAgICB2YXIgdGVtcGVyYXR1cmUycmdiXzEgPSB0ZW1wZXJhdHVyZTJyZ2I7XG5cbiAgICAvKlxuICAgICAqIEJhc2VkIG9uIGltcGxlbWVudGF0aW9uIGJ5IE5laWwgQmFydGxldHRcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmVpbGJhcnRsZXR0L2NvbG9yLXRlbXBlcmF0dXJlXG4gICAgICoqL1xuXG5cbiAgICB2YXIgdW5wYWNrJHYgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHJvdW5kJDYgPSBNYXRoLnJvdW5kO1xuXG4gICAgdmFyIHJnYjJ0ZW1wZXJhdHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgcmdiID0gdW5wYWNrJHYoYXJncywgJ3JnYicpO1xuICAgICAgICB2YXIgciA9IHJnYlswXSwgYiA9IHJnYlsyXTtcbiAgICAgICAgdmFyIG1pblRlbXAgPSAxMDAwO1xuICAgICAgICB2YXIgbWF4VGVtcCA9IDQwMDAwO1xuICAgICAgICB2YXIgZXBzID0gMC40O1xuICAgICAgICB2YXIgdGVtcDtcbiAgICAgICAgd2hpbGUgKG1heFRlbXAgLSBtaW5UZW1wID4gZXBzKSB7XG4gICAgICAgICAgICB0ZW1wID0gKG1heFRlbXAgKyBtaW5UZW1wKSAqIDAuNTtcbiAgICAgICAgICAgIHZhciByZ2IkMSA9IHRlbXBlcmF0dXJlMnJnYl8xKHRlbXApO1xuICAgICAgICAgICAgaWYgKChyZ2IkMVsyXSAvIHJnYiQxWzBdKSA+PSAoYiAvIHIpKSB7XG4gICAgICAgICAgICAgICAgbWF4VGVtcCA9IHRlbXA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pblRlbXAgPSB0ZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3VuZCQ2KHRlbXApO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMnRlbXBlcmF0dXJlXzEgPSByZ2IydGVtcGVyYXR1cmU7XG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS50ZW1wID1cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5rZWx2aW4gPVxuICAgIENvbG9yXzEucHJvdG90eXBlLnRlbXBlcmF0dXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IydGVtcGVyYXR1cmVfMSh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWFfMS50ZW1wID1cbiAgICBjaHJvbWFfMS5rZWx2aW4gPVxuICAgIGNocm9tYV8xLnRlbXBlcmF0dXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvcl8xLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsndGVtcCddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQuZm9ybWF0LnRlbXAgPVxuICAgIGlucHV0LmZvcm1hdC5rZWx2aW4gPVxuICAgIGlucHV0LmZvcm1hdC50ZW1wZXJhdHVyZSA9IHRlbXBlcmF0dXJlMnJnYl8xO1xuXG4gICAgdmFyIHR5cGUkZiA9IHV0aWxzLnR5cGU7XG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5hbHBoYSA9IGZ1bmN0aW9uKGEsIG11dGF0ZSkge1xuICAgICAgICBpZiAoIG11dGF0ZSA9PT0gdm9pZCAwICkgbXV0YXRlPWZhbHNlO1xuXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQgJiYgdHlwZSRmKGEpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKG11dGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JnYlszXSA9IGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yXzEoW3RoaXMuX3JnYlswXSwgdGhpcy5fcmdiWzFdLCB0aGlzLl9yZ2JbMl0sIGFdLCAncmdiJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYlszXTtcbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuY2xpcHBlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmdiLl9jbGlwcGVkIHx8IGZhbHNlO1xuICAgIH07XG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5kYXJrZW4gPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBcdGlmICggYW1vdW50ID09PSB2b2lkIDAgKSBhbW91bnQ9MTtcblxuICAgIFx0dmFyIG1lID0gdGhpcztcbiAgICBcdHZhciBsYWIgPSBtZS5sYWIoKTtcbiAgICBcdGxhYlswXSAtPSBsYWJDb25zdGFudHMuS24gKiBhbW91bnQ7XG4gICAgXHRyZXR1cm4gbmV3IENvbG9yXzEobGFiLCAnbGFiJykuYWxwaGEobWUuYWxwaGEoKSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIENvbG9yXzEucHJvdG90eXBlLmJyaWdodGVuID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgXHRpZiAoIGFtb3VudCA9PT0gdm9pZCAwICkgYW1vdW50PTE7XG5cbiAgICBcdHJldHVybiB0aGlzLmRhcmtlbigtYW1vdW50KTtcbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuZGFya2VyID0gQ29sb3JfMS5wcm90b3R5cGUuZGFya2VuO1xuICAgIENvbG9yXzEucHJvdG90eXBlLmJyaWdodGVyID0gQ29sb3JfMS5wcm90b3R5cGUuYnJpZ2h0ZW47XG5cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihtYykge1xuICAgICAgICB2YXIgcmVmID0gbWMuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIG1vZGUgPSByZWZbMF07XG4gICAgICAgIHZhciBjaGFubmVsID0gcmVmWzFdO1xuICAgICAgICB2YXIgc3JjID0gdGhpc1ttb2RlXSgpO1xuICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtb2RlLmluZGV4T2YoY2hhbm5lbCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7IHJldHVybiBzcmNbaV07IH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJ1bmtub3duIGNoYW5uZWwgXCIgKyBjaGFubmVsICsgXCIgaW4gbW9kZSBcIiArIG1vZGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcmM7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHR5cGUkZyA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIHBvdyQyID0gTWF0aC5wb3c7XG5cbiAgICB2YXIgRVBTID0gMWUtNztcbiAgICB2YXIgTUFYX0lURVIgPSAyMDtcblxuICAgIENvbG9yXzEucHJvdG90eXBlLmx1bWluYW5jZSA9IGZ1bmN0aW9uKGx1bSkge1xuICAgICAgICBpZiAobHVtICE9PSB1bmRlZmluZWQgJiYgdHlwZSRnKGx1bSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAobHVtID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHB1cmUgYmxhY2tcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yXzEoWzAsMCwwLHRoaXMuX3JnYlszXV0sICdyZ2InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsdW0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gcHVyZSB3aGl0ZVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3JfMShbMjU1LDI1NSwyNTUsdGhpcy5fcmdiWzNdXSwgJ3JnYicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29tcHV0ZSBuZXcgY29sb3IgdXNpbmcuLi5cbiAgICAgICAgICAgIHZhciBjdXJfbHVtID0gdGhpcy5sdW1pbmFuY2UoKTtcbiAgICAgICAgICAgIHZhciBtb2RlID0gJ3JnYic7XG4gICAgICAgICAgICB2YXIgbWF4X2l0ZXIgPSBNQVhfSVRFUjtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBmdW5jdGlvbiAobG93LCBoaWdoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pZCA9IGxvdy5pbnRlcnBvbGF0ZShoaWdoLCAwLjUsIG1vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBsbSA9IG1pZC5sdW1pbmFuY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMobHVtIC0gbG0pIDwgRVBTIHx8ICFtYXhfaXRlci0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGVub3VnaFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbG0gPiBsdW0gPyB0ZXN0KGxvdywgbWlkKSA6IHRlc3QobWlkLCBoaWdoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByZ2IgPSAoY3VyX2x1bSA+IGx1bSA/IHRlc3QobmV3IENvbG9yXzEoWzAsMCwwXSksIHRoaXMpIDogdGVzdCh0aGlzLCBuZXcgQ29sb3JfMShbMjU1LDI1NSwyNTVdKSkpLnJnYigpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKHJnYi5jb25jYXQoIFt0aGlzLl9yZ2JbM11dKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJnYjJsdW1pbmFuY2UuYXBwbHkodm9pZCAwLCAodGhpcy5fcmdiKS5zbGljZSgwLDMpKTtcbiAgICB9O1xuXG5cbiAgICB2YXIgcmdiMmx1bWluYW5jZSA9IGZ1bmN0aW9uIChyLGcsYikge1xuICAgICAgICAvLyByZWxhdGl2ZSBsdW1pbmFuY2VcbiAgICAgICAgLy8gc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDgvUkVDLVdDQUcyMC0yMDA4MTIxMS8jcmVsYXRpdmVsdW1pbmFuY2VkZWZcbiAgICAgICAgciA9IGx1bWluYW5jZV94KHIpO1xuICAgICAgICBnID0gbHVtaW5hbmNlX3goZyk7XG4gICAgICAgIGIgPSBsdW1pbmFuY2VfeChiKTtcbiAgICAgICAgcmV0dXJuIDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYjtcbiAgICB9O1xuXG4gICAgdmFyIGx1bWluYW5jZV94ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgeCAvPSAyNTU7XG4gICAgICAgIHJldHVybiB4IDw9IDAuMDM5MjggPyB4LzEyLjkyIDogcG93JDIoKHgrMC4wNTUpLzEuMDU1LCAyLjQpO1xuICAgIH07XG5cbiAgICB2YXIgaW50ZXJwb2xhdG9yID0ge307XG5cbiAgICB2YXIgdHlwZSRoID0gdXRpbHMudHlwZTtcblxuXG4gICAgdmFyIG1peCA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIGlmICggZiA9PT0gdm9pZCAwICkgZj0wLjU7XG4gICAgICAgIHZhciByZXN0ID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAzO1xuICAgICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHJlc3RbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAzIF07XG5cbiAgICAgICAgdmFyIG1vZGUgPSByZXN0WzBdIHx8ICdscmdiJztcbiAgICAgICAgaWYgKCFpbnRlcnBvbGF0b3JbbW9kZV0gJiYgIXJlc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBmYWxsIGJhY2sgdG8gdGhlIGZpcnN0IHN1cHBvcnRlZCBtb2RlXG4gICAgICAgICAgICBtb2RlID0gT2JqZWN0LmtleXMoaW50ZXJwb2xhdG9yKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWludGVycG9sYXRvclttb2RlXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcImludGVycG9sYXRpb24gbW9kZSBcIiArIG1vZGUgKyBcIiBpcyBub3QgZGVmaW5lZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUkaChjb2wxKSAhPT0gJ29iamVjdCcpIHsgY29sMSA9IG5ldyBDb2xvcl8xKGNvbDEpOyB9XG4gICAgICAgIGlmICh0eXBlJGgoY29sMikgIT09ICdvYmplY3QnKSB7IGNvbDIgPSBuZXcgQ29sb3JfMShjb2wyKTsgfVxuICAgICAgICByZXR1cm4gaW50ZXJwb2xhdG9yW21vZGVdKGNvbDEsIGNvbDIsIGYpXG4gICAgICAgICAgICAuYWxwaGEoY29sMS5hbHBoYSgpICsgZiAqIChjb2wyLmFscGhhKCkgLSBjb2wxLmFscGhhKCkpKTtcbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUubWl4ID1cbiAgICBDb2xvcl8xLnByb3RvdHlwZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKGNvbDIsIGYpIHtcbiAgICBcdGlmICggZiA9PT0gdm9pZCAwICkgZj0wLjU7XG4gICAgXHR2YXIgcmVzdCA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgICBcdHdoaWxlICggbGVuLS0gPiAwICkgcmVzdFsgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDIgXTtcblxuICAgIFx0cmV0dXJuIG1peC5hcHBseSh2b2lkIDAsIFsgdGhpcywgY29sMiwgZiBdLmNvbmNhdCggcmVzdCApKTtcbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUucHJlbXVsdGlwbHkgPSBmdW5jdGlvbihtdXRhdGUpIHtcbiAgICBcdGlmICggbXV0YXRlID09PSB2b2lkIDAgKSBtdXRhdGU9ZmFsc2U7XG5cbiAgICBcdHZhciByZ2IgPSB0aGlzLl9yZ2I7XG4gICAgXHR2YXIgYSA9IHJnYlszXTtcbiAgICBcdGlmIChtdXRhdGUpIHtcbiAgICBcdFx0dGhpcy5fcmdiID0gW3JnYlswXSphLCByZ2JbMV0qYSwgcmdiWzJdKmEsIGFdO1xuICAgIFx0XHRyZXR1cm4gdGhpcztcbiAgICBcdH0gZWxzZSB7XG4gICAgXHRcdHJldHVybiBuZXcgQ29sb3JfMShbcmdiWzBdKmEsIHJnYlsxXSphLCByZ2JbMl0qYSwgYV0sICdyZ2InKTtcbiAgICBcdH1cbiAgICB9O1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuc2F0dXJhdGUgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBcdGlmICggYW1vdW50ID09PSB2b2lkIDAgKSBhbW91bnQ9MTtcblxuICAgIFx0dmFyIG1lID0gdGhpcztcbiAgICBcdHZhciBsY2ggPSBtZS5sY2goKTtcbiAgICBcdGxjaFsxXSArPSBsYWJDb25zdGFudHMuS24gKiBhbW91bnQ7XG4gICAgXHRpZiAobGNoWzFdIDwgMCkgeyBsY2hbMV0gPSAwOyB9XG4gICAgXHRyZXR1cm4gbmV3IENvbG9yXzEobGNoLCAnbGNoJykuYWxwaGEobWUuYWxwaGEoKSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIENvbG9yXzEucHJvdG90eXBlLmRlc2F0dXJhdGUgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBcdGlmICggYW1vdW50ID09PSB2b2lkIDAgKSBhbW91bnQ9MTtcblxuICAgIFx0cmV0dXJuIHRoaXMuc2F0dXJhdGUoLWFtb3VudCk7XG4gICAgfTtcblxuICAgIHZhciB0eXBlJGkgPSB1dGlscy50eXBlO1xuXG4gICAgQ29sb3JfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obWMsIHZhbHVlLCBtdXRhdGUpIHtcbiAgICAgICAgaWYgKCBtdXRhdGUgPT09IHZvaWQgMCApIG11dGF0ZT1mYWxzZTtcblxuICAgICAgICB2YXIgcmVmID0gbWMuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIG1vZGUgPSByZWZbMF07XG4gICAgICAgIHZhciBjaGFubmVsID0gcmVmWzFdO1xuICAgICAgICB2YXIgc3JjID0gdGhpc1ttb2RlXSgpO1xuICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtb2RlLmluZGV4T2YoY2hhbm5lbCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUkaSh2YWx1ZSkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHZhbHVlLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnKyc6IHNyY1tpXSArPSArdmFsdWU7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLSc6IHNyY1tpXSArPSArdmFsdWU7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnKic6IHNyY1tpXSAqPSArKHZhbHVlLnN1YnN0cigxKSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6IHNyY1tpXSAvPSArKHZhbHVlLnN1YnN0cigxKSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogc3JjW2ldID0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlJGkodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzcmNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCB2YWx1ZSBmb3IgQ29sb3Iuc2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgb3V0ID0gbmV3IENvbG9yXzEoc3JjLCBtb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JnYiA9IG91dC5fcmdiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJ1bmtub3duIGNoYW5uZWwgXCIgKyBjaGFubmVsICsgXCIgaW4gbW9kZSBcIiArIG1vZGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcmM7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJnYiQxID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICAgICAgdmFyIHh5ejAgPSBjb2wxLl9yZ2I7XG4gICAgICAgIHZhciB4eXoxID0gY29sMi5fcmdiO1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yXzEoXG4gICAgICAgICAgICB4eXowWzBdICsgZiAqICh4eXoxWzBdLXh5ejBbMF0pLFxuICAgICAgICAgICAgeHl6MFsxXSArIGYgKiAoeHl6MVsxXS14eXowWzFdKSxcbiAgICAgICAgICAgIHh5ejBbMl0gKyBmICogKHh5ejFbMl0teHl6MFsyXSksXG4gICAgICAgICAgICAncmdiJ1xuICAgICAgICApXG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvci5yZ2IgPSByZ2IkMTtcblxuICAgIHZhciBzcXJ0JDIgPSBNYXRoLnNxcnQ7XG4gICAgdmFyIHBvdyQzID0gTWF0aC5wb3c7XG5cbiAgICB2YXIgbHJnYiA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIHZhciByZWYgPSBjb2wxLl9yZ2I7XG4gICAgICAgIHZhciB4MSA9IHJlZlswXTtcbiAgICAgICAgdmFyIHkxID0gcmVmWzFdO1xuICAgICAgICB2YXIgejEgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IGNvbDIuX3JnYjtcbiAgICAgICAgdmFyIHgyID0gcmVmJDFbMF07XG4gICAgICAgIHZhciB5MiA9IHJlZiQxWzFdO1xuICAgICAgICB2YXIgejIgPSByZWYkMVsyXTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKFxuICAgICAgICAgICAgc3FydCQyKHBvdyQzKHgxLDIpICogKDEtZikgKyBwb3ckMyh4MiwyKSAqIGYpLFxuICAgICAgICAgICAgc3FydCQyKHBvdyQzKHkxLDIpICogKDEtZikgKyBwb3ckMyh5MiwyKSAqIGYpLFxuICAgICAgICAgICAgc3FydCQyKHBvdyQzKHoxLDIpICogKDEtZikgKyBwb3ckMyh6MiwyKSAqIGYpLFxuICAgICAgICAgICAgJ3JnYidcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IubHJnYiA9IGxyZ2I7XG5cbiAgICB2YXIgbGFiJDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgICAgICB2YXIgeHl6MCA9IGNvbDEubGFiKCk7XG4gICAgICAgIHZhciB4eXoxID0gY29sMi5sYWIoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKFxuICAgICAgICAgICAgeHl6MFswXSArIGYgKiAoeHl6MVswXS14eXowWzBdKSxcbiAgICAgICAgICAgIHh5ejBbMV0gKyBmICogKHh5ejFbMV0teHl6MFsxXSksXG4gICAgICAgICAgICB4eXowWzJdICsgZiAqICh4eXoxWzJdLXh5ejBbMl0pLFxuICAgICAgICAgICAgJ2xhYidcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IubGFiID0gbGFiJDE7XG5cbiAgICB2YXIgX2hzeCA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmLCBtKSB7XG4gICAgICAgIHZhciBhc3NpZ24sIGFzc2lnbiQxO1xuXG4gICAgICAgIHZhciB4eXowLCB4eXoxO1xuICAgICAgICBpZiAobSA9PT0gJ2hzbCcpIHtcbiAgICAgICAgICAgIHh5ejAgPSBjb2wxLmhzbCgpO1xuICAgICAgICAgICAgeHl6MSA9IGNvbDIuaHNsKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobSA9PT0gJ2hzdicpIHtcbiAgICAgICAgICAgIHh5ejAgPSBjb2wxLmhzdigpO1xuICAgICAgICAgICAgeHl6MSA9IGNvbDIuaHN2KCk7XG4gICAgICAgIH0gZWxzZSBpZiAobSA9PT0gJ2hjZycpIHtcbiAgICAgICAgICAgIHh5ejAgPSBjb2wxLmhjZygpO1xuICAgICAgICAgICAgeHl6MSA9IGNvbDIuaGNnKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobSA9PT0gJ2hzaScpIHtcbiAgICAgICAgICAgIHh5ejAgPSBjb2wxLmhzaSgpO1xuICAgICAgICAgICAgeHl6MSA9IGNvbDIuaHNpKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobSA9PT0gJ2xjaCcgfHwgbSA9PT0gJ2hjbCcpIHtcbiAgICAgICAgICAgIG0gPSAnaGNsJztcbiAgICAgICAgICAgIHh5ejAgPSBjb2wxLmhjbCgpO1xuICAgICAgICAgICAgeHl6MSA9IGNvbDIuaGNsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaHVlMCwgaHVlMSwgc2F0MCwgc2F0MSwgbGJ2MCwgbGJ2MTtcbiAgICAgICAgaWYgKG0uc3Vic3RyKDAsIDEpID09PSAnaCcpIHtcbiAgICAgICAgICAgIChhc3NpZ24gPSB4eXowLCBodWUwID0gYXNzaWduWzBdLCBzYXQwID0gYXNzaWduWzFdLCBsYnYwID0gYXNzaWduWzJdKTtcbiAgICAgICAgICAgIChhc3NpZ24kMSA9IHh5ejEsIGh1ZTEgPSBhc3NpZ24kMVswXSwgc2F0MSA9IGFzc2lnbiQxWzFdLCBsYnYxID0gYXNzaWduJDFbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNhdCwgaHVlLCBsYnYsIGRoO1xuXG4gICAgICAgIGlmICghaXNOYU4oaHVlMCkgJiYgIWlzTmFOKGh1ZTEpKSB7XG4gICAgICAgICAgICAvLyBib3RoIGNvbG9ycyBoYXZlIGh1ZVxuICAgICAgICAgICAgaWYgKGh1ZTEgPiBodWUwICYmIGh1ZTEgLSBodWUwID4gMTgwKSB7XG4gICAgICAgICAgICAgICAgZGggPSBodWUxLShodWUwKzM2MCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGh1ZTEgPCBodWUwICYmIGh1ZTAgLSBodWUxID4gMTgwKSB7XG4gICAgICAgICAgICAgICAgZGggPSBodWUxKzM2MC1odWUwO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgIGRoID0gaHVlMSAtIGh1ZTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodWUgPSBodWUwICsgZiAqIGRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihodWUwKSkge1xuICAgICAgICAgICAgaHVlID0gaHVlMDtcbiAgICAgICAgICAgIGlmICgobGJ2MSA9PSAxIHx8IGxidjEgPT0gMCkgJiYgbSAhPSAnaHN2JykgeyBzYXQgPSBzYXQwOyB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKGh1ZTEpKSB7XG4gICAgICAgICAgICBodWUgPSBodWUxO1xuICAgICAgICAgICAgaWYgKChsYnYwID09IDEgfHwgbGJ2MCA9PSAwKSAmJiBtICE9ICdoc3YnKSB7IHNhdCA9IHNhdDE7IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh1ZSA9IE51bWJlci5OYU47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2F0ID09PSB1bmRlZmluZWQpIHsgc2F0ID0gc2F0MCArIGYgKiAoc2F0MSAtIHNhdDApOyB9XG4gICAgICAgIGxidiA9IGxidjAgKyBmICogKGxidjEtbGJ2MCk7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3JfMShbaHVlLCBzYXQsIGxidl0sIG0pO1xuICAgIH07XG5cbiAgICB2YXIgbGNoJDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIF9oc3goY29sMSwgY29sMiwgZiwgJ2xjaCcpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IubGNoID0gbGNoJDE7XG4gICAgaW50ZXJwb2xhdG9yLmhjbCA9IGxjaCQxO1xuXG4gICAgdmFyIG51bSQxID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICAgICAgdmFyIGMxID0gY29sMS5udW0oKTtcbiAgICAgICAgdmFyIGMyID0gY29sMi5udW0oKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKGMxICsgZiAqIChjMi1jMSksICdudW0nKVxuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IubnVtID0gbnVtJDE7XG5cbiAgICB2YXIgaGNnJDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIF9oc3goY29sMSwgY29sMiwgZiwgJ2hjZycpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IuaGNnID0gaGNnJDE7XG5cbiAgICB2YXIgaHNpJDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIF9oc3goY29sMSwgY29sMiwgZiwgJ2hzaScpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IuaHNpID0gaHNpJDE7XG5cbiAgICB2YXIgaHNsJDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIF9oc3goY29sMSwgY29sMiwgZiwgJ2hzbCcpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IuaHNsID0gaHNsJDE7XG5cbiAgICB2YXIgaHN2JDEgPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIF9oc3goY29sMSwgY29sMiwgZiwgJ2hzdicpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IuaHN2ID0gaHN2JDE7XG5cbiAgICB2YXIgY2xpcF9yZ2IkMiA9IHV0aWxzLmNsaXBfcmdiO1xuICAgIHZhciBwb3ckNCA9IE1hdGgucG93O1xuICAgIHZhciBzcXJ0JDMgPSBNYXRoLnNxcnQ7XG4gICAgdmFyIFBJJDEgPSBNYXRoLlBJO1xuICAgIHZhciBjb3MkMiA9IE1hdGguY29zO1xuICAgIHZhciBzaW4kMSA9IE1hdGguc2luO1xuICAgIHZhciBhdGFuMiQxID0gTWF0aC5hdGFuMjtcblxuICAgIHZhciBhdmVyYWdlID0gZnVuY3Rpb24gKGNvbG9ycywgbW9kZSwgd2VpZ2h0cykge1xuICAgICAgICBpZiAoIG1vZGUgPT09IHZvaWQgMCApIG1vZGU9J2xyZ2InO1xuICAgICAgICBpZiAoIHdlaWdodHMgPT09IHZvaWQgMCApIHdlaWdodHM9bnVsbDtcblxuICAgICAgICB2YXIgbCA9IGNvbG9ycy5sZW5ndGg7XG4gICAgICAgIGlmICghd2VpZ2h0cykgeyB3ZWlnaHRzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkobCkpLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiAxOyB9KTsgfVxuICAgICAgICAvLyBub3JtYWxpemUgd2VpZ2h0c1xuICAgICAgICB2YXIgayA9IGwgLyB3ZWlnaHRzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhICsgYjsgfSk7XG4gICAgICAgIHdlaWdodHMuZm9yRWFjaChmdW5jdGlvbiAodyxpKSB7IHdlaWdodHNbaV0gKj0gazsgfSk7XG4gICAgICAgIC8vIGNvbnZlcnQgY29sb3JzIHRvIENvbG9yIG9iamVjdHNcbiAgICAgICAgY29sb3JzID0gY29sb3JzLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gbmV3IENvbG9yXzEoYyk7IH0pO1xuICAgICAgICBpZiAobW9kZSA9PT0gJ2xyZ2InKSB7XG4gICAgICAgICAgICByZXR1cm4gX2F2ZXJhZ2VfbHJnYihjb2xvcnMsIHdlaWdodHMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpcnN0ID0gY29sb3JzLnNoaWZ0KCk7XG4gICAgICAgIHZhciB4eXogPSBmaXJzdC5nZXQobW9kZSk7XG4gICAgICAgIHZhciBjbnQgPSBbXTtcbiAgICAgICAgdmFyIGR4ID0gMDtcbiAgICAgICAgdmFyIGR5ID0gMDtcbiAgICAgICAgLy8gaW5pdGlhbCBjb2xvclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8eHl6Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB4eXpbaV0gPSAoeHl6W2ldIHx8IDApICogd2VpZ2h0c1swXTtcbiAgICAgICAgICAgIGNudC5wdXNoKGlzTmFOKHh5eltpXSkgPyAwIDogd2VpZ2h0c1swXSk7XG4gICAgICAgICAgICBpZiAobW9kZS5jaGFyQXQoaSkgPT09ICdoJyAmJiAhaXNOYU4oeHl6W2ldKSkge1xuICAgICAgICAgICAgICAgIHZhciBBID0geHl6W2ldIC8gMTgwICogUEkkMTtcbiAgICAgICAgICAgICAgICBkeCArPSBjb3MkMihBKSAqIHdlaWdodHNbMF07XG4gICAgICAgICAgICAgICAgZHkgKz0gc2luJDEoQSkgKiB3ZWlnaHRzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFscGhhID0gZmlyc3QuYWxwaGEoKSAqIHdlaWdodHNbMF07XG4gICAgICAgIGNvbG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjLGNpKSB7XG4gICAgICAgICAgICB2YXIgeHl6MiA9IGMuZ2V0KG1vZGUpO1xuICAgICAgICAgICAgYWxwaGEgKz0gYy5hbHBoYSgpICogd2VpZ2h0c1tjaSsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTx4eXoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHh5ejJbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNudFtpXSArPSB3ZWlnaHRzW2NpKzFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZS5jaGFyQXQoaSkgPT09ICdoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIEEgPSB4eXoyW2ldIC8gMTgwICogUEkkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ICs9IGNvcyQyKEEpICogd2VpZ2h0c1tjaSsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5ICs9IHNpbiQxKEEpICogd2VpZ2h0c1tjaSsxXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHh5eltpXSArPSB4eXoyW2ldICogd2VpZ2h0c1tjaSsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSQxPTA7IGkkMTx4eXoubGVuZ3RoOyBpJDErKykge1xuICAgICAgICAgICAgaWYgKG1vZGUuY2hhckF0KGkkMSkgPT09ICdoJykge1xuICAgICAgICAgICAgICAgIHZhciBBJDEgPSBhdGFuMiQxKGR5IC8gY250W2kkMV0sIGR4IC8gY250W2kkMV0pIC8gUEkkMSAqIDE4MDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoQSQxIDwgMCkgeyBBJDEgKz0gMzYwOyB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKEEkMSA+PSAzNjApIHsgQSQxIC09IDM2MDsgfVxuICAgICAgICAgICAgICAgIHh5eltpJDFdID0gQSQxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4eXpbaSQxXSA9IHh5eltpJDFdL2NudFtpJDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFscGhhIC89IGw7XG4gICAgICAgIHJldHVybiAobmV3IENvbG9yXzEoeHl6LCBtb2RlKSkuYWxwaGEoYWxwaGEgPiAwLjk5OTk5ID8gMSA6IGFscGhhLCB0cnVlKTtcbiAgICB9O1xuXG5cbiAgICB2YXIgX2F2ZXJhZ2VfbHJnYiA9IGZ1bmN0aW9uIChjb2xvcnMsIHdlaWdodHMpIHtcbiAgICAgICAgdmFyIGwgPSBjb2xvcnMubGVuZ3RoO1xuICAgICAgICB2YXIgeHl6ID0gWzAsMCwwLDBdO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb2wgPSBjb2xvcnNbaV07XG4gICAgICAgICAgICB2YXIgZiA9IHdlaWdodHNbaV0gLyBsO1xuICAgICAgICAgICAgdmFyIHJnYiA9IGNvbC5fcmdiO1xuICAgICAgICAgICAgeHl6WzBdICs9IHBvdyQ0KHJnYlswXSwyKSAqIGY7XG4gICAgICAgICAgICB4eXpbMV0gKz0gcG93JDQocmdiWzFdLDIpICogZjtcbiAgICAgICAgICAgIHh5elsyXSArPSBwb3ckNChyZ2JbMl0sMikgKiBmO1xuICAgICAgICAgICAgeHl6WzNdICs9IHJnYlszXSAqIGY7XG4gICAgICAgIH1cbiAgICAgICAgeHl6WzBdID0gc3FydCQzKHh5elswXSk7XG4gICAgICAgIHh5elsxXSA9IHNxcnQkMyh4eXpbMV0pO1xuICAgICAgICB4eXpbMl0gPSBzcXJ0JDMoeHl6WzJdKTtcbiAgICAgICAgaWYgKHh5elszXSA+IDAuOTk5OTk5OSkgeyB4eXpbM10gPSAxOyB9XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3JfMShjbGlwX3JnYiQyKHh5eikpO1xuICAgIH07XG5cbiAgICAvLyBtaW5pbWFsIG11bHRpLXB1cnBvc2UgaW50ZXJmYWNlXG5cbiAgICAvLyBAcmVxdWlyZXMgdXRpbHMgY29sb3IgYW5hbHl6ZVxuXG5cbiAgICB2YXIgdHlwZSRqID0gdXRpbHMudHlwZTtcblxuICAgIHZhciBwb3ckNSA9IE1hdGgucG93O1xuXG4gICAgdmFyIHNjYWxlID0gZnVuY3Rpb24oY29sb3JzKSB7XG5cbiAgICAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgdmFyIF9tb2RlID0gJ3JnYic7XG4gICAgICAgIHZhciBfbmFjb2wgPSBjaHJvbWFfMSgnI2NjYycpO1xuICAgICAgICB2YXIgX3NwcmVhZCA9IDA7XG4gICAgICAgIC8vIGNvbnN0IF9maXhlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgX2RvbWFpbiA9IFswLCAxXTtcbiAgICAgICAgdmFyIF9wb3MgPSBbXTtcbiAgICAgICAgdmFyIF9wYWRkaW5nID0gWzAsMF07XG4gICAgICAgIHZhciBfY2xhc3NlcyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2NvbG9ycyA9IFtdO1xuICAgICAgICB2YXIgX291dCA9IGZhbHNlO1xuICAgICAgICB2YXIgX21pbiA9IDA7XG4gICAgICAgIHZhciBfbWF4ID0gMTtcbiAgICAgICAgdmFyIF9jb3JyZWN0TGlnaHRuZXNzID0gZmFsc2U7XG4gICAgICAgIHZhciBfY29sb3JDYWNoZSA9IHt9O1xuICAgICAgICB2YXIgX3VzZUNhY2hlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9nYW1tYSA9IDE7XG5cbiAgICAgICAgLy8gcHJpdmF0ZSBtZXRob2RzXG5cbiAgICAgICAgdmFyIHNldENvbG9ycyA9IGZ1bmN0aW9uKGNvbG9ycykge1xuICAgICAgICAgICAgY29sb3JzID0gY29sb3JzIHx8IFsnI2ZmZicsICcjMDAwJ107XG4gICAgICAgICAgICBpZiAoY29sb3JzICYmIHR5cGUkaihjb2xvcnMpID09PSAnc3RyaW5nJyAmJiBjaHJvbWFfMS5icmV3ZXIgJiZcbiAgICAgICAgICAgICAgICBjaHJvbWFfMS5icmV3ZXJbY29sb3JzLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgY29sb3JzID0gY2hyb21hXzEuYnJld2VyW2NvbG9ycy50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlJGooY29sb3JzKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzaW5nbGUgY29sb3JcbiAgICAgICAgICAgICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcnMgPSBbY29sb3JzWzBdLCBjb2xvcnNbMF1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBtYWtlIGEgY29weSBvZiB0aGUgY29sb3JzXG4gICAgICAgICAgICAgICAgY29sb3JzID0gY29sb3JzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gY2hyb21hIGNsYXNzZXNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjPTA7IGM8Y29sb3JzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yc1tjXSA9IGNocm9tYV8xKGNvbG9yc1tjXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGF1dG8tZmlsbCBjb2xvciBwb3NpdGlvblxuICAgICAgICAgICAgICAgIF9wb3MubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjJDE9MDsgYyQxPGNvbG9ycy5sZW5ndGg7IGMkMSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wb3MucHVzaChjJDEvKGNvbG9ycy5sZW5ndGgtMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHJldHVybiBfY29sb3JzID0gY29sb3JzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRDbGFzcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoX2NsYXNzZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gX2NsYXNzZXMubGVuZ3RoLTE7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbiAmJiB2YWx1ZSA+PSBfY2xhc3Nlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdE1hcExpZ2h0bmVzcyA9IGZ1bmN0aW9uICh0KSB7IHJldHVybiB0OyB9O1xuICAgICAgICB2YXIgdE1hcERvbWFpbiA9IGZ1bmN0aW9uICh0KSB7IHJldHVybiB0OyB9O1xuXG4gICAgICAgIC8vIGNvbnN0IGNsYXNzaWZ5VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyAgICAgbGV0IHZhbCA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgaWYgKF9jbGFzc2VzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBuID0gX2NsYXNzZXMubGVuZ3RoLTE7XG4gICAgICAgIC8vICAgICAgICAgY29uc3QgaSA9IGdldENsYXNzKHZhbHVlKTtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBtaW5jID0gX2NsYXNzZXNbMF0gKyAoKF9jbGFzc2VzWzFdLV9jbGFzc2VzWzBdKSAqICgwICsgKF9zcHJlYWQgKiAwLjUpKSk7ICAvLyBjZW50ZXIgb2YgMXN0IGNsYXNzXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgbWF4YyA9IF9jbGFzc2VzW24tMV0gKyAoKF9jbGFzc2VzW25dLV9jbGFzc2VzW24tMV0pICogKDEgLSAoX3NwcmVhZCAqIDAuNSkpKTsgIC8vIGNlbnRlciBvZiBsYXN0IGNsYXNzXG4gICAgICAgIC8vICAgICAgICAgdmFsID0gX21pbiArICgoKChfY2xhc3Nlc1tpXSArICgoX2NsYXNzZXNbaSsxXSAtIF9jbGFzc2VzW2ldKSAqIDAuNSkpIC0gbWluYykgLyAobWF4Yy1taW5jKSkgKiAoX21heCAtIF9taW4pKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVybiB2YWw7XG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgdmFyIGdldENvbG9yID0gZnVuY3Rpb24odmFsLCBieXBhc3NNYXApIHtcbiAgICAgICAgICAgIHZhciBjb2wsIHQ7XG4gICAgICAgICAgICBpZiAoYnlwYXNzTWFwID09IG51bGwpIHsgYnlwYXNzTWFwID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmIChpc05hTih2YWwpIHx8ICh2YWwgPT09IG51bGwpKSB7IHJldHVybiBfbmFjb2w7IH1cbiAgICAgICAgICAgIGlmICghYnlwYXNzTWFwKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jbGFzc2VzICYmIChfY2xhc3Nlcy5sZW5ndGggPiAyKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBjbGFzc1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IGdldENsYXNzKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHQgPSBjIC8gKF9jbGFzc2VzLmxlbmd0aC0yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9tYXggIT09IF9taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIG1pbi9tYXhcbiAgICAgICAgICAgICAgICAgICAgdCA9ICh2YWwgLSBfbWluKSAvIChfbWF4IC0gX21pbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ID0gdmFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkb21haW4gbWFwXG4gICAgICAgICAgICB0ID0gdE1hcERvbWFpbih0KTtcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXApIHtcbiAgICAgICAgICAgICAgICB0ID0gdE1hcExpZ2h0bmVzcyh0KTsgIC8vIGxpZ2h0bmVzcyBjb3JyZWN0aW9uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfZ2FtbWEgIT09IDEpIHsgdCA9IHBvdyQ1KHQsIF9nYW1tYSk7IH1cblxuICAgICAgICAgICAgdCA9IF9wYWRkaW5nWzBdICsgKHQgKiAoMSAtIF9wYWRkaW5nWzBdIC0gX3BhZGRpbmdbMV0pKTtcblxuICAgICAgICAgICAgdCA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHQpKTtcblxuICAgICAgICAgICAgdmFyIGsgPSBNYXRoLmZsb29yKHQgKiAxMDAwMCk7XG5cbiAgICAgICAgICAgIGlmIChfdXNlQ2FjaGUgJiYgX2NvbG9yQ2FjaGVba10pIHtcbiAgICAgICAgICAgICAgICBjb2wgPSBfY29sb3JDYWNoZVtrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUkaihfY29sb3JzKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciBpIGluIFswLi5fcG9zLmxlbmd0aC0xXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8X3Bvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBfcG9zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPD0gcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA9IF9jb2xvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHQgPj0gcCkgJiYgKGkgPT09IChfcG9zLmxlbmd0aC0xKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wgPSBfY29sb3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPiBwICYmIHQgPCBfcG9zW2krMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gKHQtcCkvKF9wb3NbaSsxXS1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wgPSBjaHJvbWFfMS5pbnRlcnBvbGF0ZShfY29sb3JzW2ldLCBfY29sb3JzW2krMV0sIHQsIF9tb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSRqKF9jb2xvcnMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbCA9IF9jb2xvcnModCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfdXNlQ2FjaGUpIHsgX2NvbG9yQ2FjaGVba10gPSBjb2w7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2w7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlc2V0Q2FjaGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfY29sb3JDYWNoZSA9IHt9OyB9O1xuXG4gICAgICAgIHNldENvbG9ycyhjb2xvcnMpO1xuXG4gICAgICAgIC8vIHB1YmxpYyBpbnRlcmZhY2VcblxuICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIHZhciBjID0gY2hyb21hXzEoZ2V0Q29sb3IodikpO1xuICAgICAgICAgICAgaWYgKF9vdXQgJiYgY1tfb3V0XSkgeyByZXR1cm4gY1tfb3V0XSgpOyB9IGVsc2UgeyByZXR1cm4gYzsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGYuY2xhc3NlcyA9IGZ1bmN0aW9uKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmIChjbGFzc2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSRqKGNsYXNzZXMpID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jbGFzc2VzID0gY2xhc3NlcztcbiAgICAgICAgICAgICAgICAgICAgX2RvbWFpbiA9IFtjbGFzc2VzWzBdLCBjbGFzc2VzW2NsYXNzZXMubGVuZ3RoLTFdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IGNocm9tYV8xLmFuYWx5emUoX2RvbWFpbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2xhc3NlcyA9IFtkLm1pbiwgZC5tYXhdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NsYXNzZXMgPSBjaHJvbWFfMS5saW1pdHMoZCwgJ2UnLCBjbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfY2xhc3NlcztcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGYuZG9tYWluID0gZnVuY3Rpb24oZG9tYWluKSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2RvbWFpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9taW4gPSBkb21haW5bMF07XG4gICAgICAgICAgICBfbWF4ID0gZG9tYWluW2RvbWFpbi5sZW5ndGgtMV07XG4gICAgICAgICAgICBfcG9zID0gW107XG4gICAgICAgICAgICB2YXIgayA9IF9jb2xvcnMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKChkb21haW4ubGVuZ3RoID09PSBrKSAmJiAoX21pbiAhPT0gX21heCkpIHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcG9zaXRpb25zXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxpc3QgPSBBcnJheS5mcm9tKGRvbWFpbik7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gbGlzdFtpXTtcblxuICAgICAgICAgICAgICAgICAgX3Bvcy5wdXNoKChkLV9taW4pIC8gKF9tYXgtX21pbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYz0wOyBjPGs7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICBfcG9zLnB1c2goYy8oay0xKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkb21haW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgZG9tYWluIG1hcFxuICAgICAgICAgICAgICAgICAgICB2YXIgdE91dCA9IGRvbWFpbi5tYXAoZnVuY3Rpb24gKGQsaSkgeyByZXR1cm4gaS8oZG9tYWluLmxlbmd0aC0xKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0QnJlYWtzID0gZG9tYWluLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gKGQgLSBfbWluKSAvIChfbWF4IC0gX21pbik7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRCcmVha3MuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkgeyByZXR1cm4gdE91dFtpXSA9PT0gdmFsOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdE1hcERvbWFpbiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPD0gMCB8fCB0ID49IDEpIHsgcmV0dXJuIHQ7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHQgPj0gdEJyZWFrc1tpKzFdKSB7IGkrKzsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gKHQgLSB0QnJlYWtzW2ldKSAvICh0QnJlYWtzW2krMV0gLSB0QnJlYWtzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ID0gdE91dFtpXSArIGYgKiAodE91dFtpKzFdIC0gdE91dFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9kb21haW4gPSBbX21pbiwgX21heF07XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLm1vZGUgPSBmdW5jdGlvbihfbSkge1xuICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX21vZGUgPSBfbTtcbiAgICAgICAgICAgIHJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYucmFuZ2UgPSBmdW5jdGlvbihjb2xvcnMsIF9wb3MpIHtcbiAgICAgICAgICAgIHNldENvbG9ycyhjb2xvcnMsIF9wb3MpO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5vdXQgPSBmdW5jdGlvbihfbykge1xuICAgICAgICAgICAgX291dCA9IF9vO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5zcHJlYWQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc3ByZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3NwcmVhZCA9IHZhbDtcbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuY29ycmVjdExpZ2h0bmVzcyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIGlmICh2ID09IG51bGwpIHsgdiA9IHRydWU7IH1cbiAgICAgICAgICAgIF9jb3JyZWN0TGlnaHRuZXNzID0gdjtcbiAgICAgICAgICAgIHJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgIGlmIChfY29ycmVjdExpZ2h0bmVzcykge1xuICAgICAgICAgICAgICAgIHRNYXBMaWdodG5lc3MgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBMMCA9IGdldENvbG9yKDAsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgTDEgPSBnZXRDb2xvcigxLCB0cnVlKS5sYWIoKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvbCA9IEwwID4gTDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBMX2FjdHVhbCA9IGdldENvbG9yKHQsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgTF9pZGVhbCA9IEwwICsgKChMMSAtIEwwKSAqIHQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgTF9kaWZmID0gTF9hY3R1YWwgLSBMX2lkZWFsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdDAgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdDEgPSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4X2l0ZXIgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChNYXRoLmFicyhMX2RpZmYpID4gMWUtMikgJiYgKG1heF9pdGVyLS0gPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2wpIHsgTF9kaWZmICo9IC0xOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKExfZGlmZiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDAgPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ICs9ICh0MSAtIHQpICogMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxID0gdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCArPSAodDAgLSB0KSAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTF9hY3R1YWwgPSBnZXRDb2xvcih0LCB0cnVlKS5sYWIoKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTF9kaWZmID0gTF9hY3R1YWwgLSBMX2lkZWFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0TWFwTGlnaHRuZXNzID0gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQ7IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLnBhZGRpbmcgPSBmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICBpZiAocCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUkaihwKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcCA9IFtwLHBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcGFkZGluZyA9IHA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcGFkZGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmLmNvbG9ycyA9IGZ1bmN0aW9uKG51bUNvbG9ycywgb3V0KSB7XG4gICAgICAgICAgICAvLyBJZiBubyBhcmd1bWVudHMgYXJlIGdpdmVuLCByZXR1cm4gdGhlIG9yaWdpbmFsIGNvbG9ycyB0aGF0IHdlcmUgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgeyBvdXQgPSAnaGV4JzsgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9jb2xvcnMuc2xpY2UoMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtQ29sb3JzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW2YoMC41KV07XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtQ29sb3JzID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBkbSA9IF9kb21haW5bMF07XG4gICAgICAgICAgICAgICAgdmFyIGRkID0gX2RvbWFpblsxXSAtIGRtO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9fcmFuZ2VfXygwLCBudW1Db2xvcnMsIGZhbHNlKS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGYoIGRtICsgKChpLyhudW1Db2xvcnMtMSkpICogZGQpICk7IH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyByZXR1cm5zIGFsbCBjb2xvcnMgYmFzZWQgb24gdGhlIGRlZmluZWQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgIGNvbG9ycyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzYW1wbGVzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKF9jbGFzc2VzICYmIChfY2xhc3Nlcy5sZW5ndGggPiAyKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMSwgZW5kID0gX2NsYXNzZXMubGVuZ3RoLCBhc2MgPSAxIDw9IGVuZDsgYXNjID8gaSA8IGVuZCA6IGkgPiBlbmQ7IGFzYyA/IGkrKyA6IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlcy5wdXNoKChfY2xhc3Nlc1tpLTFdK19jbGFzc2VzW2ldKSowLjUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2FtcGxlcyA9IF9kb21haW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNhbXBsZXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBmKHYpOyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNocm9tYV8xW291dF0pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjW291dF0oKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuY2FjaGUgPSBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICBpZiAoYyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgX3VzZUNhY2hlID0gYztcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF91c2VDYWNoZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmLmdhbW1hID0gZnVuY3Rpb24oZykge1xuICAgICAgICAgICAgaWYgKGcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF9nYW1tYSA9IGc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2FtbWE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5ub2RhdGEgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZiAoZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgX25hY29sID0gY2hyb21hXzEoZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfbmFjb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9fcmFuZ2VfXyhsZWZ0LCByaWdodCwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICAgIHZhciBhc2NlbmRpbmcgPSBsZWZ0IDwgcmlnaHQ7XG4gICAgICB2YXIgZW5kID0gIWluY2x1c2l2ZSA/IHJpZ2h0IDogYXNjZW5kaW5nID8gcmlnaHQgKyAxIDogcmlnaHQgLSAxO1xuICAgICAgZm9yICh2YXIgaSA9IGxlZnQ7IGFzY2VuZGluZyA/IGkgPCBlbmQgOiBpID4gZW5kOyBhc2NlbmRpbmcgPyBpKysgOiBpLS0pIHtcbiAgICAgICAgcmFuZ2UucHVzaChpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIGludGVycG9sYXRlcyBiZXR3ZWVuIGEgc2V0IG9mIGNvbG9ycyB1emluZyBhIGJlemllciBzcGxpbmVcbiAgICAvL1xuXG4gICAgLy8gQHJlcXVpcmVzIHV0aWxzIGxhYlxuXG5cblxuXG4gICAgdmFyIGJlemllciA9IGZ1bmN0aW9uKGNvbG9ycykge1xuICAgICAgICB2YXIgYXNzaWduLCBhc3NpZ24kMSwgYXNzaWduJDI7XG5cbiAgICAgICAgdmFyIEksIGxhYjAsIGxhYjEsIGxhYjI7XG4gICAgICAgIGNvbG9ycyA9IGNvbG9ycy5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIG5ldyBDb2xvcl8xKGMpOyB9KTtcbiAgICAgICAgaWYgKGNvbG9ycy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgICAgICAoYXNzaWduID0gY29sb3JzLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5sYWIoKTsgfSksIGxhYjAgPSBhc3NpZ25bMF0sIGxhYjEgPSBhc3NpZ25bMV0pO1xuICAgICAgICAgICAgSSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiID0gKFswLCAxLCAyXS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGxhYjBbaV0gKyAodCAqIChsYWIxW2ldIC0gbGFiMFtpXSkpOyB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKGxhYiwgJ2xhYicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xvcnMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvLyBxdWFkcmF0aWMgYmV6aWVyIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIChhc3NpZ24kMSA9IGNvbG9ycy5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubGFiKCk7IH0pLCBsYWIwID0gYXNzaWduJDFbMF0sIGxhYjEgPSBhc3NpZ24kMVsxXSwgbGFiMiA9IGFzc2lnbiQxWzJdKTtcbiAgICAgICAgICAgIEkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYiA9IChbMCwgMSwgMl0ubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiAoKDEtdCkqKDEtdCkgKiBsYWIwW2ldKSArICgyICogKDEtdCkgKiB0ICogbGFiMVtpXSkgKyAodCAqIHQgKiBsYWIyW2ldKTsgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3JfMShsYWIsICdsYWInKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoY29sb3JzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgLy8gY3ViaWMgYmV6aWVyIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIHZhciBsYWIzO1xuICAgICAgICAgICAgKGFzc2lnbiQyID0gY29sb3JzLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5sYWIoKTsgfSksIGxhYjAgPSBhc3NpZ24kMlswXSwgbGFiMSA9IGFzc2lnbiQyWzFdLCBsYWIyID0gYXNzaWduJDJbMl0sIGxhYjMgPSBhc3NpZ24kMlszXSk7XG4gICAgICAgICAgICBJID0gZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgIHZhciBsYWIgPSAoWzAsIDEsIDJdLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gKCgxLXQpKigxLXQpKigxLXQpICogbGFiMFtpXSkgKyAoMyAqICgxLXQpICogKDEtdCkgKiB0ICogbGFiMVtpXSkgKyAoMyAqICgxLXQpICogdCAqIHQgKiBsYWIyW2ldKSArICh0KnQqdCAqIGxhYjNbaV0pOyB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcl8xKGxhYiwgJ2xhYicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xvcnMubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICB2YXIgSTAgPSBiZXppZXIoY29sb3JzLnNsaWNlKDAsIDMpKTtcbiAgICAgICAgICAgIHZhciBJMSA9IGJlemllcihjb2xvcnMuc2xpY2UoMiwgNSkpO1xuICAgICAgICAgICAgSSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodCA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSTAodCoyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSTEoKHQtMC41KSoyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJO1xuICAgIH07XG5cbiAgICB2YXIgYmV6aWVyXzEgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gICAgICAgIHZhciBmID0gYmV6aWVyKGNvbG9ycyk7XG4gICAgICAgIGYuc2NhbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2FsZShmKTsgfTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogaW50ZXJwb2xhdGVzIGJldHdlZW4gYSBzZXQgb2YgY29sb3JzIHV6aW5nIGEgYmV6aWVyIHNwbGluZVxuICAgICAqIGJsZW5kIG1vZGUgZm9ybXVsYXMgdGFrZW4gZnJvbSBodHRwOi8vd3d3LnZlbnR1cmUtd2FyZS5jb20va2V2aW4vY29kaW5nL2xldHMtbGVhcm4tbWF0aC1waG90b3Nob3AtYmxlbmQtbW9kZXMvXG4gICAgICovXG5cblxuXG5cbiAgICB2YXIgYmxlbmQgPSBmdW5jdGlvbiAoYm90dG9tLCB0b3AsIG1vZGUpIHtcbiAgICAgICAgaWYgKCFibGVuZFttb2RlXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGJsZW5kIG1vZGUgJyArIG1vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibGVuZFttb2RlXShib3R0b20sIHRvcCk7XG4gICAgfTtcblxuICAgIHZhciBibGVuZF9mID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChib3R0b20sdG9wKSB7XG4gICAgICAgICAgICB2YXIgYzAgPSBjaHJvbWFfMSh0b3ApLnJnYigpO1xuICAgICAgICAgICAgdmFyIGMxID0gY2hyb21hXzEoYm90dG9tKS5yZ2IoKTtcbiAgICAgICAgICAgIHJldHVybiBjaHJvbWFfMS5yZ2IoZihjMCwgYzEpKTtcbiAgICAgICAgfTsgfTtcblxuICAgIHZhciBlYWNoID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZ1bmN0aW9uIChjMCwgYzEpIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIG91dFswXSA9IGYoYzBbMF0sIGMxWzBdKTtcbiAgICAgICAgICAgIG91dFsxXSA9IGYoYzBbMV0sIGMxWzFdKTtcbiAgICAgICAgICAgIG91dFsyXSA9IGYoYzBbMl0sIGMxWzJdKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07IH07XG5cbiAgICB2YXIgbm9ybWFsID0gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGE7IH07XG4gICAgdmFyIG11bHRpcGx5ID0gZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYSAqIGIgLyAyNTU7IH07XG4gICAgdmFyIGRhcmtlbiQxID0gZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYSA+IGIgPyBiIDogYTsgfTtcbiAgICB2YXIgbGlnaHRlbiA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGEgPiBiID8gYSA6IGI7IH07XG4gICAgdmFyIHNjcmVlbiA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIDI1NSAqICgxIC0gKDEtYS8yNTUpICogKDEtYi8yNTUpKTsgfTtcbiAgICB2YXIgb3ZlcmxheSA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGIgPCAxMjggPyAyICogYSAqIGIgLyAyNTUgOiAyNTUgKiAoMSAtIDIgKiAoMSAtIGEgLyAyNTUgKSAqICggMSAtIGIgLyAyNTUgKSk7IH07XG4gICAgdmFyIGJ1cm4gPSBmdW5jdGlvbiAoYSxiKSB7IHJldHVybiAyNTUgKiAoMSAtICgxIC0gYiAvIDI1NSkgLyAoYS8yNTUpKTsgfTtcbiAgICB2YXIgZG9kZ2UgPSBmdW5jdGlvbiAoYSxiKSB7XG4gICAgICAgIGlmIChhID09PSAyNTUpIHsgcmV0dXJuIDI1NTsgfVxuICAgICAgICBhID0gMjU1ICogKGIgLyAyNTUpIC8gKDEgLSBhIC8gMjU1KTtcbiAgICAgICAgcmV0dXJuIGEgPiAyNTUgPyAyNTUgOiBhXG4gICAgfTtcblxuICAgIC8vICMgYWRkID0gKGEsYikgLT5cbiAgICAvLyAjICAgICBpZiAoYSArIGIgPiAyNTUpIHRoZW4gMjU1IGVsc2UgYSArIGJcblxuICAgIGJsZW5kLm5vcm1hbCA9IGJsZW5kX2YoZWFjaChub3JtYWwpKTtcbiAgICBibGVuZC5tdWx0aXBseSA9IGJsZW5kX2YoZWFjaChtdWx0aXBseSkpO1xuICAgIGJsZW5kLnNjcmVlbiA9IGJsZW5kX2YoZWFjaChzY3JlZW4pKTtcbiAgICBibGVuZC5vdmVybGF5ID0gYmxlbmRfZihlYWNoKG92ZXJsYXkpKTtcbiAgICBibGVuZC5kYXJrZW4gPSBibGVuZF9mKGVhY2goZGFya2VuJDEpKTtcbiAgICBibGVuZC5saWdodGVuID0gYmxlbmRfZihlYWNoKGxpZ2h0ZW4pKTtcbiAgICBibGVuZC5kb2RnZSA9IGJsZW5kX2YoZWFjaChkb2RnZSkpO1xuICAgIGJsZW5kLmJ1cm4gPSBibGVuZF9mKGVhY2goYnVybikpO1xuICAgIC8vIGJsZW5kLmFkZCA9IGJsZW5kX2YoZWFjaChhZGQpKTtcblxuICAgIHZhciBibGVuZF8xID0gYmxlbmQ7XG5cbiAgICAvLyBjdWJlaGVsaXggaW50ZXJwb2xhdGlvblxuICAgIC8vIGJhc2VkIG9uIEQuQS4gR3JlZW4gXCJBIGNvbG91ciBzY2hlbWUgZm9yIHRoZSBkaXNwbGF5IG9mIGFzdHJvbm9taWNhbCBpbnRlbnNpdHkgaW1hZ2VzXCJcbiAgICAvLyBodHRwOi8vYXN0cm9uLXNvYy5pbi9idWxsZXRpbi8xMUp1bmUvMjg5MzkyMDExLnBkZlxuXG4gICAgdmFyIHR5cGUkayA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIGNsaXBfcmdiJDMgPSB1dGlscy5jbGlwX3JnYjtcbiAgICB2YXIgVFdPUEkkMiA9IHV0aWxzLlRXT1BJO1xuICAgIHZhciBwb3ckNiA9IE1hdGgucG93O1xuICAgIHZhciBzaW4kMiA9IE1hdGguc2luO1xuICAgIHZhciBjb3MkMyA9IE1hdGguY29zO1xuXG5cbiAgICB2YXIgY3ViZWhlbGl4ID0gZnVuY3Rpb24oc3RhcnQsIHJvdGF0aW9ucywgaHVlLCBnYW1tYSwgbGlnaHRuZXNzKSB7XG4gICAgICAgIGlmICggc3RhcnQgPT09IHZvaWQgMCApIHN0YXJ0PTMwMDtcbiAgICAgICAgaWYgKCByb3RhdGlvbnMgPT09IHZvaWQgMCApIHJvdGF0aW9ucz0tMS41O1xuICAgICAgICBpZiAoIGh1ZSA9PT0gdm9pZCAwICkgaHVlPTE7XG4gICAgICAgIGlmICggZ2FtbWEgPT09IHZvaWQgMCApIGdhbW1hPTE7XG4gICAgICAgIGlmICggbGlnaHRuZXNzID09PSB2b2lkIDAgKSBsaWdodG5lc3M9WzAsMV07XG5cbiAgICAgICAgdmFyIGRoID0gMCwgZGw7XG4gICAgICAgIGlmICh0eXBlJGsobGlnaHRuZXNzKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgZGwgPSBsaWdodG5lc3NbMV0gLSBsaWdodG5lc3NbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkbCA9IDA7XG4gICAgICAgICAgICBsaWdodG5lc3MgPSBbbGlnaHRuZXNzLCBsaWdodG5lc3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGYgPSBmdW5jdGlvbihmcmFjdCkge1xuICAgICAgICAgICAgdmFyIGEgPSBUV09QSSQyICogKCgoc3RhcnQrMTIwKS8zNjApICsgKHJvdGF0aW9ucyAqIGZyYWN0KSk7XG4gICAgICAgICAgICB2YXIgbCA9IHBvdyQ2KGxpZ2h0bmVzc1swXSArIChkbCAqIGZyYWN0KSwgZ2FtbWEpO1xuICAgICAgICAgICAgdmFyIGggPSBkaCAhPT0gMCA/IGh1ZVswXSArIChmcmFjdCAqIGRoKSA6IGh1ZTtcbiAgICAgICAgICAgIHZhciBhbXAgPSAoaCAqIGwgKiAoMS1sKSkgLyAyO1xuICAgICAgICAgICAgdmFyIGNvc19hID0gY29zJDMoYSk7XG4gICAgICAgICAgICB2YXIgc2luX2EgPSBzaW4kMihhKTtcbiAgICAgICAgICAgIHZhciByID0gbCArIChhbXAgKiAoKC0wLjE0ODYxICogY29zX2EpICsgKDEuNzgyNzcqIHNpbl9hKSkpO1xuICAgICAgICAgICAgdmFyIGcgPSBsICsgKGFtcCAqICgoLTAuMjkyMjcgKiBjb3NfYSkgLSAoMC45MDY0OSogc2luX2EpKSk7XG4gICAgICAgICAgICB2YXIgYiA9IGwgKyAoYW1wICogKCsxLjk3Mjk0ICogY29zX2EpKTtcbiAgICAgICAgICAgIHJldHVybiBjaHJvbWFfMShjbGlwX3JnYiQzKFtyKjI1NSxnKjI1NSxiKjI1NSwxXSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuc3RhcnQgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICBpZiAoKHMgPT0gbnVsbCkpIHsgcmV0dXJuIHN0YXJ0OyB9XG4gICAgICAgICAgICBzdGFydCA9IHM7XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLnJvdGF0aW9ucyA9IGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIGlmICgociA9PSBudWxsKSkgeyByZXR1cm4gcm90YXRpb25zOyB9XG4gICAgICAgICAgICByb3RhdGlvbnMgPSByO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5nYW1tYSA9IGZ1bmN0aW9uKGcpIHtcbiAgICAgICAgICAgIGlmICgoZyA9PSBudWxsKSkgeyByZXR1cm4gZ2FtbWE7IH1cbiAgICAgICAgICAgIGdhbW1hID0gZztcbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuaHVlID0gZnVuY3Rpb24oaCkge1xuICAgICAgICAgICAgaWYgKChoID09IG51bGwpKSB7IHJldHVybiBodWU7IH1cbiAgICAgICAgICAgIGh1ZSA9IGg7XG4gICAgICAgICAgICBpZiAodHlwZSRrKGh1ZSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBkaCA9IGh1ZVsxXSAtIGh1ZVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGggPT09IDApIHsgaHVlID0gaHVlWzFdOyB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYubGlnaHRuZXNzID0gZnVuY3Rpb24oaCkge1xuICAgICAgICAgICAgaWYgKChoID09IG51bGwpKSB7IHJldHVybiBsaWdodG5lc3M7IH1cbiAgICAgICAgICAgIGlmICh0eXBlJGsoaCkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBsaWdodG5lc3MgPSBoO1xuICAgICAgICAgICAgICAgIGRsID0gaFsxXSAtIGhbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpZ2h0bmVzcyA9IFtoLGhdO1xuICAgICAgICAgICAgICAgIGRsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuc2NhbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjaHJvbWFfMS5zY2FsZShmKTsgfTtcblxuICAgICAgICBmLmh1ZShodWUpO1xuXG4gICAgICAgIHJldHVybiBmO1xuICAgIH07XG5cbiAgICB2YXIgZGlnaXRzID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gICAgdmFyIGZsb29yJDIgPSBNYXRoLmZsb29yO1xuICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuICAgIHZhciByYW5kb21fMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvZGUgPSAnIyc7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTw2OyBpKyspIHtcbiAgICAgICAgICAgIGNvZGUgKz0gZGlnaXRzLmNoYXJBdChmbG9vciQyKHJhbmRvbSgpICogMTYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvbG9yXzEoY29kZSwgJ2hleCcpO1xuICAgIH07XG5cbiAgICB2YXIgbG9nJDEgPSBNYXRoLmxvZztcbiAgICB2YXIgcG93JDcgPSBNYXRoLnBvdztcbiAgICB2YXIgZmxvb3IkMyA9IE1hdGguZmxvb3I7XG4gICAgdmFyIGFicyA9IE1hdGguYWJzO1xuXG5cbiAgICB2YXIgYW5hbHl6ZSA9IGZ1bmN0aW9uIChkYXRhLCBrZXkpIHtcbiAgICAgICAgaWYgKCBrZXkgPT09IHZvaWQgMCApIGtleT1udWxsO1xuXG4gICAgICAgIHZhciByID0ge1xuICAgICAgICAgICAgbWluOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgbWF4OiBOdW1iZXIuTUFYX1ZBTFVFKi0xLFxuICAgICAgICAgICAgc3VtOiAwLFxuICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlKGRhdGEpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGF0YSA9IE9iamVjdC52YWx1ZXMoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmIChrZXkgJiYgdHlwZSh2YWwpID09PSAnb2JqZWN0JykgeyB2YWwgPSB2YWxba2V5XTsgfVxuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gbnVsbCAmJiAhaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgICAgIHIudmFsdWVzLnB1c2godmFsKTtcbiAgICAgICAgICAgICAgICByLnN1bSArPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IHIubWluKSB7IHIubWluID0gdmFsOyB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA+IHIubWF4KSB7IHIubWF4ID0gdmFsOyB9XG4gICAgICAgICAgICAgICAgci5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByLmRvbWFpbiA9IFtyLm1pbiwgci5tYXhdO1xuXG4gICAgICAgIHIubGltaXRzID0gZnVuY3Rpb24gKG1vZGUsIG51bSkgeyByZXR1cm4gbGltaXRzKHIsIG1vZGUsIG51bSk7IH07XG5cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuXG4gICAgdmFyIGxpbWl0cyA9IGZ1bmN0aW9uIChkYXRhLCBtb2RlLCBudW0pIHtcbiAgICAgICAgaWYgKCBtb2RlID09PSB2b2lkIDAgKSBtb2RlPSdlcXVhbCc7XG4gICAgICAgIGlmICggbnVtID09PSB2b2lkIDAgKSBudW09NztcblxuICAgICAgICBpZiAodHlwZShkYXRhKSA9PSAnYXJyYXknKSB7XG4gICAgICAgICAgICBkYXRhID0gYW5hbHl6ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluID0gZGF0YS5taW47XG4gICAgICAgIHZhciBtYXggPSBkYXRhLm1heDtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGRhdGEudmFsdWVzLnNvcnQoZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYS1iOyB9KTtcblxuICAgICAgICBpZiAobnVtID09PSAxKSB7IHJldHVybiBbbWluLG1heF07IH1cblxuICAgICAgICB2YXIgbGltaXRzID0gW107XG5cbiAgICAgICAgaWYgKG1vZGUuc3Vic3RyKDAsMSkgPT09ICdjJykgeyAvLyBjb250aW51b3VzXG4gICAgICAgICAgICBsaW1pdHMucHVzaChtaW4pO1xuICAgICAgICAgICAgbGltaXRzLnB1c2gobWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlLnN1YnN0cigwLDEpID09PSAnZScpIHsgLy8gZXF1YWwgaW50ZXJ2YWxcbiAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1pbik7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTE7IGk8bnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaW1pdHMucHVzaChtaW4rKChpL251bSkqKG1heC1taW4pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW1pdHMucHVzaChtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAobW9kZS5zdWJzdHIoMCwxKSA9PT0gJ2wnKSB7IC8vIGxvZyBzY2FsZVxuICAgICAgICAgICAgaWYgKG1pbiA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb2dhcml0aG1pYyBzY2FsZXMgYXJlIG9ubHkgcG9zc2libGUgZm9yIHZhbHVlcyA+IDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtaW5fbG9nID0gTWF0aC5MT0cxMEUgKiBsb2ckMShtaW4pO1xuICAgICAgICAgICAgdmFyIG1heF9sb2cgPSBNYXRoLkxPRzEwRSAqIGxvZyQxKG1heCk7XG4gICAgICAgICAgICBsaW1pdHMucHVzaChtaW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQxPTE7IGkkMTxudW07IGkkMSsrKSB7XG4gICAgICAgICAgICAgICAgbGltaXRzLnB1c2gocG93JDcoMTAsIG1pbl9sb2cgKyAoKGkkMS9udW0pICogKG1heF9sb2cgLSBtaW5fbG9nKSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1heCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChtb2RlLnN1YnN0cigwLDEpID09PSAncScpIHsgLy8gcXVhbnRpbGUgc2NhbGVcbiAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1pbik7XG4gICAgICAgICAgICBmb3IgKHZhciBpJDI9MTsgaSQyPG51bTsgaSQyKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9ICgodmFsdWVzLmxlbmd0aC0xKSAqIGkkMikvbnVtO1xuICAgICAgICAgICAgICAgIHZhciBwYiA9IGZsb29yJDMocCk7XG4gICAgICAgICAgICAgICAgaWYgKHBiID09PSBwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0cy5wdXNoKHZhbHVlc1twYl0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHAgPiBwYlxuICAgICAgICAgICAgICAgICAgICB2YXIgcHIgPSBwIC0gcGI7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0cy5wdXNoKCh2YWx1ZXNbcGJdKigxLXByKSkgKyAodmFsdWVzW3BiKzFdKnByKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGltaXRzLnB1c2gobWF4KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAobW9kZS5zdWJzdHIoMCwxKSA9PT0gJ2snKSB7IC8vIGstbWVhbnMgY2x1c3RlcmluZ1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uXG4gICAgICAgICAgICBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZmlndWUvc291cmNlL2Jyb3dzZS90cnVuay9maWd1ZS5qcyMzMzZcbiAgICAgICAgICAgIHNpbXBsaWZpZWQgZm9yIDEtZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgY2x1c3RlcjtcbiAgICAgICAgICAgIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBhc3NpZ25tZW50cyA9IG5ldyBBcnJheShuKTtcbiAgICAgICAgICAgIHZhciBjbHVzdGVyU2l6ZXMgPSBuZXcgQXJyYXkobnVtKTtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG5iX2l0ZXJzID0gMDtcbiAgICAgICAgICAgIHZhciBjZW50cm9pZHMgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBnZXQgc2VlZCB2YWx1ZXNcbiAgICAgICAgICAgIGNlbnRyb2lkcyA9IFtdO1xuICAgICAgICAgICAgY2VudHJvaWRzLnB1c2gobWluKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkkMz0xOyBpJDM8bnVtOyBpJDMrKykge1xuICAgICAgICAgICAgICAgIGNlbnRyb2lkcy5wdXNoKG1pbiArICgoaSQzL251bSkgKiAobWF4LW1pbikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbnRyb2lkcy5wdXNoKG1heCk7XG5cbiAgICAgICAgICAgIHdoaWxlIChyZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAvLyBhc3NpZ25tZW50IHN0ZXBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqPTA7IGo8bnVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNpemVzW2pdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSQ0PTA7IGkkNDxuOyBpJDQrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbaSQ0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbmRpc3QgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmVzdCA9ICh2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqJDE9MDsgaiQxPG51bTsgaiQxKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXN0ID0gYWJzKGNlbnRyb2lkc1tqJDFdLXZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluZGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmRpc3QgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3QgPSBqJDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyU2l6ZXNbYmVzdF0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRzW2kkNF0gPSBiZXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGNlbnRyb2lkcyBzdGVwXG4gICAgICAgICAgICAgICAgdmFyIG5ld0NlbnRyb2lkcyA9IG5ldyBBcnJheShudW0pO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGokMj0wOyBqJDI8bnVtOyBqJDIrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdDZW50cm9pZHNbaiQyXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkkNT0wOyBpJDU8bjsgaSQ1KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlciA9IGFzc2lnbm1lbnRzW2kkNV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDZW50cm9pZHNbY2x1c3Rlcl0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NlbnRyb2lkc1tjbHVzdGVyXSA9IHZhbHVlc1tpJDVdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2VudHJvaWRzW2NsdXN0ZXJdICs9IHZhbHVlc1tpJDVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGokMz0wOyBqJDM8bnVtOyBqJDMrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdDZW50cm9pZHNbaiQzXSAqPSAxL2NsdXN0ZXJTaXplc1tqJDNdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGNvbnZlcmdlbmNlXG4gICAgICAgICAgICAgICAgcmVwZWF0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiQ0PTA7IGokNDxudW07IGokNCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDZW50cm9pZHNbaiQ0XSAhPT0gY2VudHJvaWRzW2okNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNlbnRyb2lkcyA9IG5ld0NlbnRyb2lkcztcbiAgICAgICAgICAgICAgICBuYl9pdGVycysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5iX2l0ZXJzID4gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmluaXNoZWQgay1tZWFucyBjbHVzdGVyaW5nXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCBwYXJ0IGlzIGJvcnJvd2VkIGZyb20gZ2FicmllbGZsb3IuaXRcbiAgICAgICAgICAgIHZhciBrQ2x1c3RlcnMgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGokNT0wOyBqJDU8bnVtOyBqJDUrKykge1xuICAgICAgICAgICAgICAgIGtDbHVzdGVyc1tqJDVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpJDY9MDsgaSQ2PG47IGkkNisrKSB7XG4gICAgICAgICAgICAgICAgY2x1c3RlciA9IGFzc2lnbm1lbnRzW2kkNl07XG4gICAgICAgICAgICAgICAga0NsdXN0ZXJzW2NsdXN0ZXJdLnB1c2godmFsdWVzW2kkNl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRtcEtNZWFuc0JyZWFrcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiQ2PTA7IGokNjxudW07IGokNisrKSB7XG4gICAgICAgICAgICAgICAgdG1wS01lYW5zQnJlYWtzLnB1c2goa0NsdXN0ZXJzW2okNl1bMF0pO1xuICAgICAgICAgICAgICAgIHRtcEtNZWFuc0JyZWFrcy5wdXNoKGtDbHVzdGVyc1tqJDZdW2tDbHVzdGVyc1tqJDZdLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0bXBLTWVhbnNCcmVha3MgPSB0bXBLTWVhbnNCcmVha3Muc29ydChmdW5jdGlvbiAoYSxiKXsgcmV0dXJuIGEtYjsgfSk7XG4gICAgICAgICAgICBsaW1pdHMucHVzaCh0bXBLTWVhbnNCcmVha3NbMF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQ3PTE7IGkkNyA8IHRtcEtNZWFuc0JyZWFrcy5sZW5ndGg7IGkkNys9IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHRtcEtNZWFuc0JyZWFrc1tpJDddO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4odikgJiYgKGxpbWl0cy5pbmRleE9mKHYpID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXRzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaW1pdHM7XG4gICAgfTtcblxuICAgIHZhciBhbmFseXplXzEgPSB7YW5hbHl6ZTogYW5hbHl6ZSwgbGltaXRzOiBsaW1pdHN9O1xuXG4gICAgdmFyIGNvbnRyYXN0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgLy8gV0NBRyBjb250cmFzdCByYXRpb1xuICAgICAgICAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNjb250cmFzdC1yYXRpb2RlZlxuICAgICAgICBhID0gbmV3IENvbG9yXzEoYSk7XG4gICAgICAgIGIgPSBuZXcgQ29sb3JfMShiKTtcbiAgICAgICAgdmFyIGwxID0gYS5sdW1pbmFuY2UoKTtcbiAgICAgICAgdmFyIGwyID0gYi5sdW1pbmFuY2UoKTtcbiAgICAgICAgcmV0dXJuIGwxID4gbDIgPyAobDEgKyAwLjA1KSAvIChsMiArIDAuMDUpIDogKGwyICsgMC4wNSkgLyAobDEgKyAwLjA1KTtcbiAgICB9O1xuXG4gICAgdmFyIHNxcnQkNCA9IE1hdGguc3FydDtcbiAgICB2YXIgYXRhbjIkMiA9IE1hdGguYXRhbjI7XG4gICAgdmFyIGFicyQxID0gTWF0aC5hYnM7XG4gICAgdmFyIGNvcyQ0ID0gTWF0aC5jb3M7XG4gICAgdmFyIFBJJDIgPSBNYXRoLlBJO1xuXG4gICAgdmFyIGRlbHRhRSA9IGZ1bmN0aW9uKGEsIGIsIEwsIEMpIHtcbiAgICAgICAgaWYgKCBMID09PSB2b2lkIDAgKSBMPTE7XG4gICAgICAgIGlmICggQyA9PT0gdm9pZCAwICkgQz0xO1xuXG4gICAgICAgIC8vIERlbHRhIEUgKENNQylcbiAgICAgICAgLy8gc2VlIGh0dHA6Ly93d3cuYnJ1Y2VsaW5kYmxvb20uY29tL2luZGV4Lmh0bWw/RXFuX0RlbHRhRV9DTUMuaHRtbFxuICAgICAgICBhID0gbmV3IENvbG9yXzEoYSk7XG4gICAgICAgIGIgPSBuZXcgQ29sb3JfMShiKTtcbiAgICAgICAgdmFyIHJlZiA9IEFycmF5LmZyb20oYS5sYWIoKSk7XG4gICAgICAgIHZhciBMMSA9IHJlZlswXTtcbiAgICAgICAgdmFyIGExID0gcmVmWzFdO1xuICAgICAgICB2YXIgYjEgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IEFycmF5LmZyb20oYi5sYWIoKSk7XG4gICAgICAgIHZhciBMMiA9IHJlZiQxWzBdO1xuICAgICAgICB2YXIgYTIgPSByZWYkMVsxXTtcbiAgICAgICAgdmFyIGIyID0gcmVmJDFbMl07XG4gICAgICAgIHZhciBjMSA9IHNxcnQkNCgoYTEgKiBhMSkgKyAoYjEgKiBiMSkpO1xuICAgICAgICB2YXIgYzIgPSBzcXJ0JDQoKGEyICogYTIpICsgKGIyICogYjIpKTtcbiAgICAgICAgdmFyIHNsID0gTDEgPCAxNi4wID8gMC41MTEgOiAoMC4wNDA5NzUgKiBMMSkgLyAoMS4wICsgKDAuMDE3NjUgKiBMMSkpO1xuICAgICAgICB2YXIgc2MgPSAoKDAuMDYzOCAqIGMxKSAvICgxLjAgKyAoMC4wMTMxICogYzEpKSkgKyAwLjYzODtcbiAgICAgICAgdmFyIGgxID0gYzEgPCAwLjAwMDAwMSA/IDAuMCA6IChhdGFuMiQyKGIxLCBhMSkgKiAxODAuMCkgLyBQSSQyO1xuICAgICAgICB3aGlsZSAoaDEgPCAwKSB7IGgxICs9IDM2MDsgfVxuICAgICAgICB3aGlsZSAoaDEgPj0gMzYwKSB7IGgxIC09IDM2MDsgfVxuICAgICAgICB2YXIgdCA9IChoMSA+PSAxNjQuMCkgJiYgKGgxIDw9IDM0NS4wKSA/ICgwLjU2ICsgYWJzJDEoMC4yICogY29zJDQoKFBJJDIgKiAoaDEgKyAxNjguMCkpIC8gMTgwLjApKSkgOiAoMC4zNiArIGFicyQxKDAuNCAqIGNvcyQ0KChQSSQyICogKGgxICsgMzUuMCkpIC8gMTgwLjApKSk7XG4gICAgICAgIHZhciBjNCA9IGMxICogYzEgKiBjMSAqIGMxO1xuICAgICAgICB2YXIgZiA9IHNxcnQkNChjNCAvIChjNCArIDE5MDAuMCkpO1xuICAgICAgICB2YXIgc2ggPSBzYyAqICgoKGYgKiB0KSArIDEuMCkgLSBmKTtcbiAgICAgICAgdmFyIGRlbEwgPSBMMSAtIEwyO1xuICAgICAgICB2YXIgZGVsQyA9IGMxIC0gYzI7XG4gICAgICAgIHZhciBkZWxBID0gYTEgLSBhMjtcbiAgICAgICAgdmFyIGRlbEIgPSBiMSAtIGIyO1xuICAgICAgICB2YXIgZEgyID0gKChkZWxBICogZGVsQSkgKyAoZGVsQiAqIGRlbEIpKSAtIChkZWxDICogZGVsQyk7XG4gICAgICAgIHZhciB2MSA9IGRlbEwgLyAoTCAqIHNsKTtcbiAgICAgICAgdmFyIHYyID0gZGVsQyAvIChDICogc2MpO1xuICAgICAgICB2YXIgdjMgPSBzaDtcbiAgICAgICAgcmV0dXJuIHNxcnQkNCgodjEgKiB2MSkgKyAodjIgKiB2MikgKyAoZEgyIC8gKHYzICogdjMpKSk7XG4gICAgfTtcblxuICAgIC8vIHNpbXBsZSBFdWNsaWRlYW4gZGlzdGFuY2VcbiAgICB2YXIgZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiLCBtb2RlKSB7XG4gICAgICAgIGlmICggbW9kZSA9PT0gdm9pZCAwICkgbW9kZT0nbGFiJztcblxuICAgICAgICAvLyBEZWx0YSBFIChDSUUgMTk3NilcbiAgICAgICAgLy8gc2VlIGh0dHA6Ly93d3cuYnJ1Y2VsaW5kYmxvb20uY29tL2luZGV4Lmh0bWw/RXF1YXRpb25zLmh0bWxcbiAgICAgICAgYSA9IG5ldyBDb2xvcl8xKGEpO1xuICAgICAgICBiID0gbmV3IENvbG9yXzEoYik7XG4gICAgICAgIHZhciBsMSA9IGEuZ2V0KG1vZGUpO1xuICAgICAgICB2YXIgbDIgPSBiLmdldChtb2RlKTtcbiAgICAgICAgdmFyIHN1bV9zcSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgaW4gbDEpIHtcbiAgICAgICAgICAgIHZhciBkID0gKGwxW2ldIHx8IDApIC0gKGwyW2ldIHx8IDApO1xuICAgICAgICAgICAgc3VtX3NxICs9IGQqZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHN1bV9zcSk7XG4gICAgfTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3JfMSwgWyBudWxsIF0uY29uY2F0KCBhcmdzKSApKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gc29tZSBwcmUtZGVmaW5lZCBjb2xvciBzY2FsZXM6XG5cblxuXG5cbiAgICB2YXIgc2NhbGVzID0ge1xuICAgIFx0Y29vbDogZnVuY3Rpb24gY29vbCgpIHsgcmV0dXJuIHNjYWxlKFtjaHJvbWFfMS5oc2woMTgwLDEsLjkpLCBjaHJvbWFfMS5oc2woMjUwLC43LC40KV0pIH0sXG4gICAgXHRob3Q6IGZ1bmN0aW9uIGhvdCgpIHsgcmV0dXJuIHNjYWxlKFsnIzAwMCcsJyNmMDAnLCcjZmYwJywnI2ZmZiddLCBbMCwuMjUsLjc1LDFdKS5tb2RlKCdyZ2InKSB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAgICBDb2xvckJyZXdlciBjb2xvcnMgZm9yIGNocm9tYS5qc1xuXG4gICAgICAgIENvcHlyaWdodCAoYykgMjAwMiBDeW50aGlhIEJyZXdlciwgTWFyayBIYXJyb3dlciwgYW5kIFRoZVxuICAgICAgICBQZW5uc3lsdmFuaWEgU3RhdGUgVW5pdmVyc2l0eS5cblxuICAgICAgICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgICAgICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICAgICAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgICAgICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkXG4gICAgICAgIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SXG4gICAgICAgIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gICAgICAgIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gICAgKi9cblxuICAgIHZhciBjb2xvcmJyZXdlciA9IHtcbiAgICAgICAgLy8gc2VxdWVudGlhbFxuICAgICAgICBPclJkOiBbJyNmZmY3ZWMnLCAnI2ZlZThjOCcsICcjZmRkNDllJywgJyNmZGJiODQnLCAnI2ZjOGQ1OScsICcjZWY2NTQ4JywgJyNkNzMwMWYnLCAnI2IzMDAwMCcsICcjN2YwMDAwJ10sXG4gICAgICAgIFB1QnU6IFsnI2ZmZjdmYicsICcjZWNlN2YyJywgJyNkMGQxZTYnLCAnI2E2YmRkYicsICcjNzRhOWNmJywgJyMzNjkwYzAnLCAnIzA1NzBiMCcsICcjMDQ1YThkJywgJyMwMjM4NTgnXSxcbiAgICAgICAgQnVQdTogWycjZjdmY2ZkJywgJyNlMGVjZjQnLCAnI2JmZDNlNicsICcjOWViY2RhJywgJyM4Yzk2YzYnLCAnIzhjNmJiMScsICcjODg0MTlkJywgJyM4MTBmN2MnLCAnIzRkMDA0YiddLFxuICAgICAgICBPcmFuZ2VzOiBbJyNmZmY1ZWInLCAnI2ZlZTZjZScsICcjZmRkMGEyJywgJyNmZGFlNmInLCAnI2ZkOGQzYycsICcjZjE2OTEzJywgJyNkOTQ4MDEnLCAnI2E2MzYwMycsICcjN2YyNzA0J10sXG4gICAgICAgIEJ1R246IFsnI2Y3ZmNmZCcsICcjZTVmNWY5JywgJyNjY2VjZTYnLCAnIzk5ZDhjOScsICcjNjZjMmE0JywgJyM0MWFlNzYnLCAnIzIzOGI0NScsICcjMDA2ZDJjJywgJyMwMDQ0MWInXSxcbiAgICAgICAgWWxPckJyOiBbJyNmZmZmZTUnLCAnI2ZmZjdiYycsICcjZmVlMzkxJywgJyNmZWM0NGYnLCAnI2ZlOTkyOScsICcjZWM3MDE0JywgJyNjYzRjMDInLCAnIzk5MzQwNCcsICcjNjYyNTA2J10sXG4gICAgICAgIFlsR246IFsnI2ZmZmZlNScsICcjZjdmY2I5JywgJyNkOWYwYTMnLCAnI2FkZGQ4ZScsICcjNzhjNjc5JywgJyM0MWFiNWQnLCAnIzIzODQ0MycsICcjMDA2ODM3JywgJyMwMDQ1MjknXSxcbiAgICAgICAgUmVkczogWycjZmZmNWYwJywgJyNmZWUwZDInLCAnI2ZjYmJhMScsICcjZmM5MjcyJywgJyNmYjZhNGEnLCAnI2VmM2IyYycsICcjY2IxODFkJywgJyNhNTBmMTUnLCAnIzY3MDAwZCddLFxuICAgICAgICBSZFB1OiBbJyNmZmY3ZjMnLCAnI2ZkZTBkZCcsICcjZmNjNWMwJywgJyNmYTlmYjUnLCAnI2Y3NjhhMScsICcjZGQzNDk3JywgJyNhZTAxN2UnLCAnIzdhMDE3NycsICcjNDkwMDZhJ10sXG4gICAgICAgIEdyZWVuczogWycjZjdmY2Y1JywgJyNlNWY1ZTAnLCAnI2M3ZTljMCcsICcjYTFkOTliJywgJyM3NGM0NzYnLCAnIzQxYWI1ZCcsICcjMjM4YjQ1JywgJyMwMDZkMmMnLCAnIzAwNDQxYiddLFxuICAgICAgICBZbEduQnU6IFsnI2ZmZmZkOScsICcjZWRmOGIxJywgJyNjN2U5YjQnLCAnIzdmY2RiYicsICcjNDFiNmM0JywgJyMxZDkxYzAnLCAnIzIyNWVhOCcsICcjMjUzNDk0JywgJyMwODFkNTgnXSxcbiAgICAgICAgUHVycGxlczogWycjZmNmYmZkJywgJyNlZmVkZjUnLCAnI2RhZGFlYicsICcjYmNiZGRjJywgJyM5ZTlhYzgnLCAnIzgwN2RiYScsICcjNmE1MWEzJywgJyM1NDI3OGYnLCAnIzNmMDA3ZCddLFxuICAgICAgICBHbkJ1OiBbJyNmN2ZjZjAnLCAnI2UwZjNkYicsICcjY2NlYmM1JywgJyNhOGRkYjUnLCAnIzdiY2NjNCcsICcjNGViM2QzJywgJyMyYjhjYmUnLCAnIzA4NjhhYycsICcjMDg0MDgxJ10sXG4gICAgICAgIEdyZXlzOiBbJyNmZmZmZmYnLCAnI2YwZjBmMCcsICcjZDlkOWQ5JywgJyNiZGJkYmQnLCAnIzk2OTY5NicsICcjNzM3MzczJywgJyM1MjUyNTInLCAnIzI1MjUyNScsICcjMDAwMDAwJ10sXG4gICAgICAgIFlsT3JSZDogWycjZmZmZmNjJywgJyNmZmVkYTAnLCAnI2ZlZDk3NicsICcjZmViMjRjJywgJyNmZDhkM2MnLCAnI2ZjNGUyYScsICcjZTMxYTFjJywgJyNiZDAwMjYnLCAnIzgwMDAyNiddLFxuICAgICAgICBQdVJkOiBbJyNmN2Y0ZjknLCAnI2U3ZTFlZicsICcjZDRiOWRhJywgJyNjOTk0YzcnLCAnI2RmNjViMCcsICcjZTcyOThhJywgJyNjZTEyNTYnLCAnIzk4MDA0MycsICcjNjcwMDFmJ10sXG4gICAgICAgIEJsdWVzOiBbJyNmN2ZiZmYnLCAnI2RlZWJmNycsICcjYzZkYmVmJywgJyM5ZWNhZTEnLCAnIzZiYWVkNicsICcjNDI5MmM2JywgJyMyMTcxYjUnLCAnIzA4NTE5YycsICcjMDgzMDZiJ10sXG4gICAgICAgIFB1QnVHbjogWycjZmZmN2ZiJywgJyNlY2UyZjAnLCAnI2QwZDFlNicsICcjYTZiZGRiJywgJyM2N2E5Y2YnLCAnIzM2OTBjMCcsICcjMDI4MThhJywgJyMwMTZjNTknLCAnIzAxNDYzNiddLFxuICAgICAgICBWaXJpZGlzOiBbJyM0NDAxNTQnLCAnIzQ4Mjc3NycsICcjM2Y0YThhJywgJyMzMTY3OGUnLCAnIzI2ODM4ZicsICcjMWY5ZDhhJywgJyM2Y2NlNWEnLCAnI2I2ZGUyYicsICcjZmVlODI1J10sXG5cbiAgICAgICAgLy8gZGl2ZXJnaW5nXG5cbiAgICAgICAgU3BlY3RyYWw6IFsnIzllMDE0MicsICcjZDUzZTRmJywgJyNmNDZkNDMnLCAnI2ZkYWU2MScsICcjZmVlMDhiJywgJyNmZmZmYmYnLCAnI2U2ZjU5OCcsICcjYWJkZGE0JywgJyM2NmMyYTUnLCAnIzMyODhiZCcsICcjNWU0ZmEyJ10sXG4gICAgICAgIFJkWWxHbjogWycjYTUwMDI2JywgJyNkNzMwMjcnLCAnI2Y0NmQ0MycsICcjZmRhZTYxJywgJyNmZWUwOGInLCAnI2ZmZmZiZicsICcjZDllZjhiJywgJyNhNmQ5NmEnLCAnIzY2YmQ2MycsICcjMWE5ODUwJywgJyMwMDY4MzcnXSxcbiAgICAgICAgUmRCdTogWycjNjcwMDFmJywgJyNiMjE4MmInLCAnI2Q2NjA0ZCcsICcjZjRhNTgyJywgJyNmZGRiYzcnLCAnI2Y3ZjdmNycsICcjZDFlNWYwJywgJyM5MmM1ZGUnLCAnIzQzOTNjMycsICcjMjE2NmFjJywgJyMwNTMwNjEnXSxcbiAgICAgICAgUGlZRzogWycjOGUwMTUyJywgJyNjNTFiN2QnLCAnI2RlNzdhZScsICcjZjFiNmRhJywgJyNmZGUwZWYnLCAnI2Y3ZjdmNycsICcjZTZmNWQwJywgJyNiOGUxODYnLCAnIzdmYmM0MScsICcjNGQ5MjIxJywgJyMyNzY0MTknXSxcbiAgICAgICAgUFJHbjogWycjNDAwMDRiJywgJyM3NjJhODMnLCAnIzk5NzBhYicsICcjYzJhNWNmJywgJyNlN2Q0ZTgnLCAnI2Y3ZjdmNycsICcjZDlmMGQzJywgJyNhNmRiYTAnLCAnIzVhYWU2MScsICcjMWI3ODM3JywgJyMwMDQ0MWInXSxcbiAgICAgICAgUmRZbEJ1OiBbJyNhNTAwMjYnLCAnI2Q3MzAyNycsICcjZjQ2ZDQzJywgJyNmZGFlNjEnLCAnI2ZlZTA5MCcsICcjZmZmZmJmJywgJyNlMGYzZjgnLCAnI2FiZDllOScsICcjNzRhZGQxJywgJyM0NTc1YjQnLCAnIzMxMzY5NSddLFxuICAgICAgICBCckJHOiBbJyM1NDMwMDUnLCAnIzhjNTEwYScsICcjYmY4MTJkJywgJyNkZmMyN2QnLCAnI2Y2ZThjMycsICcjZjVmNWY1JywgJyNjN2VhZTUnLCAnIzgwY2RjMScsICcjMzU5NzhmJywgJyMwMTY2NWUnLCAnIzAwM2MzMCddLFxuICAgICAgICBSZEd5OiBbJyM2NzAwMWYnLCAnI2IyMTgyYicsICcjZDY2MDRkJywgJyNmNGE1ODInLCAnI2ZkZGJjNycsICcjZmZmZmZmJywgJyNlMGUwZTAnLCAnI2JhYmFiYScsICcjODc4Nzg3JywgJyM0ZDRkNGQnLCAnIzFhMWExYSddLFxuICAgICAgICBQdU9yOiBbJyM3ZjNiMDgnLCAnI2IzNTgwNicsICcjZTA4MjE0JywgJyNmZGI4NjMnLCAnI2ZlZTBiNicsICcjZjdmN2Y3JywgJyNkOGRhZWInLCAnI2IyYWJkMicsICcjODA3M2FjJywgJyM1NDI3ODgnLCAnIzJkMDA0YiddLFxuXG4gICAgICAgIC8vIHF1YWxpdGF0aXZlXG5cbiAgICAgICAgU2V0MjogWycjNjZjMmE1JywgJyNmYzhkNjInLCAnIzhkYTBjYicsICcjZTc4YWMzJywgJyNhNmQ4NTQnLCAnI2ZmZDkyZicsICcjZTVjNDk0JywgJyNiM2IzYjMnXSxcbiAgICAgICAgQWNjZW50OiBbJyM3ZmM5N2YnLCAnI2JlYWVkNCcsICcjZmRjMDg2JywgJyNmZmZmOTknLCAnIzM4NmNiMCcsICcjZjAwMjdmJywgJyNiZjViMTcnLCAnIzY2NjY2NiddLFxuICAgICAgICBTZXQxOiBbJyNlNDFhMWMnLCAnIzM3N2ViOCcsICcjNGRhZjRhJywgJyM5ODRlYTMnLCAnI2ZmN2YwMCcsICcjZmZmZjMzJywgJyNhNjU2MjgnLCAnI2Y3ODFiZicsICcjOTk5OTk5J10sXG4gICAgICAgIFNldDM6IFsnIzhkZDNjNycsICcjZmZmZmIzJywgJyNiZWJhZGEnLCAnI2ZiODA3MicsICcjODBiMWQzJywgJyNmZGI0NjInLCAnI2IzZGU2OScsICcjZmNjZGU1JywgJyNkOWQ5ZDknLCAnI2JjODBiZCcsICcjY2NlYmM1JywgJyNmZmVkNmYnXSxcbiAgICAgICAgRGFyazI6IFsnIzFiOWU3NycsICcjZDk1ZjAyJywgJyM3NTcwYjMnLCAnI2U3Mjk4YScsICcjNjZhNjFlJywgJyNlNmFiMDInLCAnI2E2NzYxZCcsICcjNjY2NjY2J10sXG4gICAgICAgIFBhaXJlZDogWycjYTZjZWUzJywgJyMxZjc4YjQnLCAnI2IyZGY4YScsICcjMzNhMDJjJywgJyNmYjlhOTknLCAnI2UzMWExYycsICcjZmRiZjZmJywgJyNmZjdmMDAnLCAnI2NhYjJkNicsICcjNmEzZDlhJywgJyNmZmZmOTknLCAnI2IxNTkyOCddLFxuICAgICAgICBQYXN0ZWwyOiBbJyNiM2UyY2QnLCAnI2ZkY2RhYycsICcjY2JkNWU4JywgJyNmNGNhZTQnLCAnI2U2ZjVjOScsICcjZmZmMmFlJywgJyNmMWUyY2MnLCAnI2NjY2NjYyddLFxuICAgICAgICBQYXN0ZWwxOiBbJyNmYmI0YWUnLCAnI2IzY2RlMycsICcjY2NlYmM1JywgJyNkZWNiZTQnLCAnI2ZlZDlhNicsICcjZmZmZmNjJywgJyNlNWQ4YmQnLCAnI2ZkZGFlYycsICcjZjJmMmYyJ10sXG4gICAgfTtcblxuICAgIC8vIGFkZCBsb3dlcmNhc2UgYWxpYXNlcyBmb3IgY2FzZS1pbnNlbnNpdGl2ZSBtYXRjaGVzXG4gICAgZm9yICh2YXIgaSQxID0gMCwgbGlzdCQxID0gT2JqZWN0LmtleXMoY29sb3JicmV3ZXIpOyBpJDEgPCBsaXN0JDEubGVuZ3RoOyBpJDEgKz0gMSkge1xuICAgICAgICB2YXIga2V5ID0gbGlzdCQxW2kkMV07XG5cbiAgICAgICAgY29sb3JicmV3ZXJba2V5LnRvTG93ZXJDYXNlKCldID0gY29sb3JicmV3ZXJba2V5XTtcbiAgICB9XG5cbiAgICB2YXIgY29sb3JicmV3ZXJfMSA9IGNvbG9yYnJld2VyO1xuXG4gICAgLy8gZmVlbCBmcmVlIHRvIGNvbW1lbnQgb3V0IGFueXRoaW5nIHRvIHJvbGx1cFxuICAgIC8vIGEgc21hbGxlciBjaHJvbWEuanMgYnVpbHRcblxuICAgIC8vIGlvIC0tPiBjb252ZXJ0IGNvbG9yc1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIC8vIG9wZXJhdG9ycyAtLT4gbW9kaWZ5IGV4aXN0aW5nIENvbG9yc1xuXG5cblxuXG5cblxuXG5cblxuXG4gICAgLy8gaW50ZXJwb2xhdG9yc1xuXG5cblxuXG5cblxuXG5cblxuXG4gICAgLy8gZ2VuZXJhdG9ycyAtLSA+IGNyZWF0ZSBuZXcgY29sb3JzXG4gICAgY2hyb21hXzEuYXZlcmFnZSA9IGF2ZXJhZ2U7XG4gICAgY2hyb21hXzEuYmV6aWVyID0gYmV6aWVyXzE7XG4gICAgY2hyb21hXzEuYmxlbmQgPSBibGVuZF8xO1xuICAgIGNocm9tYV8xLmN1YmVoZWxpeCA9IGN1YmVoZWxpeDtcbiAgICBjaHJvbWFfMS5taXggPSBjaHJvbWFfMS5pbnRlcnBvbGF0ZSA9IG1peDtcbiAgICBjaHJvbWFfMS5yYW5kb20gPSByYW5kb21fMTtcbiAgICBjaHJvbWFfMS5zY2FsZSA9IHNjYWxlO1xuXG4gICAgLy8gb3RoZXIgdXRpbGl0eSBtZXRob2RzXG4gICAgY2hyb21hXzEuYW5hbHl6ZSA9IGFuYWx5emVfMS5hbmFseXplO1xuICAgIGNocm9tYV8xLmNvbnRyYXN0ID0gY29udHJhc3Q7XG4gICAgY2hyb21hXzEuZGVsdGFFID0gZGVsdGFFO1xuICAgIGNocm9tYV8xLmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgY2hyb21hXzEubGltaXRzID0gYW5hbHl6ZV8xLmxpbWl0cztcbiAgICBjaHJvbWFfMS52YWxpZCA9IHZhbGlkO1xuXG4gICAgLy8gc2NhbGVcbiAgICBjaHJvbWFfMS5zY2FsZXMgPSBzY2FsZXM7XG5cbiAgICAvLyBjb2xvcnNcbiAgICBjaHJvbWFfMS5jb2xvcnMgPSB3M2N4MTFfMTtcbiAgICBjaHJvbWFfMS5icmV3ZXIgPSBjb2xvcmJyZXdlcl8xO1xuXG4gICAgdmFyIGNocm9tYV9qcyA9IGNocm9tYV8xO1xuXG4gICAgcmV0dXJuIGNocm9tYV9qcztcblxufSkpKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==