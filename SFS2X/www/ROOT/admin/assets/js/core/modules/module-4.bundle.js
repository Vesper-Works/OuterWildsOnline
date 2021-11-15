/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-4"],{

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/data/command-history.js":
/*!*************************************!*\
  !*** ./src/data/command-history.js ***!
  \*************************************/
/*! exports provided: CommandHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandHistory", function() { return CommandHistory; });
class CommandHistory
{
	constructor(size = 100)
	{
		this._size = size;

		this.clear();
		this._loadState();
	}

	addCommand(cmd)
	{
		if (this._history.length >= this._size)
			this._history.splice(0, 1);

		this._history.push(cmd);
		this._pos = this._history.length;
		this._tempCmd = '';

		this._saveState();
	}

	addTempCommand(cmd)
	{
		this._tempCmd = cmd;
		this._pos = this._history.length;
	}

	rewind()
	{
		if (this._pos > 0)
			this._pos--;

		return this._history[this._pos];
	}

	forward()
	{
		if (this._pos < this._history.length)
			this._pos++;

		if (this._pos <= this._history.length - 1)
			return this._history[this._pos];
		else
			return this._tempCmd;
	}

	getList()
	{
		return this._history;
	}

	getSize()
	{
		return this._history.length
	}

	clear()
	{
		this._history = [];
		this._pos = 0;
		this._tempCmd = '';
	}

	_saveState()
	{
		Cookies.set('console-history', {
			history: this._history
		}, {expires: 36000});
	}

	_loadState()
	{
		let data = Cookies.getJSON('console-history')

		if (data)
		{
			this._history = data.history;
			this._pos = this._history.length;
		}
	}
}


/***/ }),

/***/ "./src/modules/console.js":
/*!********************************!*\
  !*** ./src/modules/console.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Console; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _data_command_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/command-history */ "./src/data/command-history.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class Console extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('console');

		// Outgoing requests
		this.REQ_CMD = 'cmd';
		this.REQ_HINT = 'hint';
		this.REQ_SCRIPT = 'script';

		// Incoming responses
		this.RES_CMD = 'cmd';
		this.RES_HINT = 'hint';
		this.RES_SCRIPT = 'script';
		this.RES_ERROR_LOCKED = 'locked';

		this.VERSION = '3.0.0';
		this.TOKENS = ['=', 'from ', 'import '];

		this.TRANSCRIPT_TEMPLATE = `
		<html>
		<head>
			<title>SFS2X ADMIN CONSOLE Session Transcript</title>
			<style type='text/css' media='screen'>
				body, pre {
					background-color: #333;
					font-size: .8rem;
					font-family: Monaco,'Courier New', monospace;
				}

				h3 {
					color: #f8f9fa;
				}

				pre {
					white-space: pre-wrap;
					-moz-tab-size: 5;
					tab-size: 5;
				}

				.text-console {
					color: #28F32D;
				}

				.text-error {
					color: #dc3545;
				}

				.text-highlight {
					color: #ffc107;
				}

				.text-command {
					color: #f8f9fa;
				}
			</style>
		</head>
		<body>
			<h3><!--HEADER--></h3>
			<pre><!--TRANSCRIPT--></pre>
		</body>
		</html>
		`;

		this._cmdHistory = new _data_command_history__WEBPACK_IMPORTED_MODULE_1__["CommandHistory"]();
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		$('#cns-input').on('keyup', $.proxy(this.onInputKeyUp, this));
		$('#cns-input').on('keydown', $.proxy(this.onInputKeyDown, this));

		// Show welcome message
		this._showWelcomeMessage();

		// Focus on prompt input
		$('#cns-input').focus();

		// Add global click listener to close hint panel
		$(this).on('click', $.proxy(this._onGenericClick, this));

		// Add global window resize listener to close hint panel
		$(window).on('resize', $.proxy(this._onGenericClick, this));

		// Add buttons click listeners
		$('#cns-clearButton').on('click', $.proxy(this._onClearConsoleClick, this));
		$('#cns-runButton').on('click', $.proxy(this._onRunScriptClick, this));
		$('#cns-exportButton').on('click', $.proxy(this._onExportSessionClick, this));

		// Initialize "upload script" modal
		this._uploadScriptModal = $('#cns-uploadModal');
		this._uploadScriptModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Initialize kendo uploader
		this._uploader = $('#cns-uploader').kendoUpload({
			allowedExtensions: ['.py'],
			multiple: false,
			template: function(dataItem) {
				dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"]; // Pass bytesToSize utility function to template
				return kendo.template(`
					<span class='k-progress w-100'></span>
					<span class="">
						<span class="k-file-name" title="#=name#">#=name#</span>
						<span class="k-file-size">Size: #=bytesToSize(size, 1, 'Bytes')#</span>
					</span>
				`)(dataItem);
			},
	        localization: {
	            select: 'Select file...'
	        }
		}).data('kendoUpload');

		// Add listener to modal hide event
		this._uploadScriptModal.on('hidden.bs.modal', $.proxy(this._onUploadScriptrModalHidden, this));

		// Add listener to modal button
		$('#cns-uploadScriptButton').on('click', $.proxy(this._onUploadScriptrButtonCLick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#cns-clearButton').off('click');
		$('#cns-runButton').off('click');
		$('#cns-exportButton').off('click');
		$('#cns-uploadScriptButton').off('click');

		$(this).off('click');
		$(window).off('resize');

		this._uploadScriptModal.off('hidden.bs.modal');
		this._uploadScriptModal.modal('dispose');
	}

	onExtensionCommand(command, data)
	{
		if (command == this.RES_CMD || command == this.RES_SCRIPT)
		{
			const result = data.getUtfString('r');
			const error = data.getUtfString('e');

			if (result != null)
				this._writeConsole(result);
			else if (error != null)
				this._writeConsole(`<span class="text-error">ERROR</span> ${this._parseHtml(error)}`);
		}

		else if (command == this.RES_HINT)
		{
			this._lastHints = data.getUtfStringArray('h');

			this._showHintPanel();
		}

		else if (command == this.RES_ERROR_LOCKED)
		{
			this._writeConsole(`<span class="text-error">ERROR</span> <span class="text-highlight">Console module is locked from server side. Please follow the instructions you were given to unlock it.</span>`);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	onInputKeyDown(e)
	{
		// Save previous input value
		this._prevInput = $('#cns-input').val();

		const keyName = e.key;

		if (keyName == 'ArrowUp' || keyName == 'ArrowDown' || keyName == 'Tab')
		{
			e.preventDefault();
		}
	}

	onInputKeyUp(e)
	{
		const keyName = e.key;
		const input = $('#cns-input').val();

		// Copy input to dummy
		$('#cns-input-dummy').html(input);

		//--- DOT (CODE HINTING) -----------------------------------------------
		if (keyName == '.')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();

			// Request code hints
			this._requestHints(input);
		}

		//--- ENTER ------------------------------------------------------------
		else if	(keyName == 'Enter' && input.length > 0)
		{
			// Get selected hint
			if (this._isHintPanelOpen)
			{
				this._setInputOnHintSelected();
			}
			else
			{
				// Send command to server
				let sfso = new SFS2X.SFSObject();
				sfso.putUtfString('c', input);
				this.sendExtensionRequest(this.REQ_CMD, sfso);

				// Write command to console
				this._writeConsole(input, true);

				// Clear hints
				this._lastHints = null;

				// Clear input
				this._clearInput();

				// Add command to history
				this._cmdHistory.addCommand(input);
			}
		}

		//--- ENTER ------------------------------------------------------------
		else if	(keyName == 'Tab')
		{
			// Get selected hint
			if (this._isHintPanelOpen)
			{
				if (this._hintPanel.find('.hint-item.selected').length > 0)
					this._setInputOnHintSelected();
			}
		}

		//--- CTRL+BACKSPACE (CLEAR CONSOLE) -----------------------------------
		else if (e.ctrlKey && keyName == 'Backspace')
		{
			this._onClearConsoleClick();
		}

		//--- BACKSPACE ------------------------------------------------------
		else if (keyName == 'Backspace')
		{
			// Check the deleted char
			if (this._prevInput.substring(this._prevInput.length - 1) == '.')
			{
				// Reset hinting
				this._resetHinting(input);
			}

			// Update hint panel if open
			if (this._isHintPanelOpen)
				this._updateHintPanel();
		}

		//--- ESC (CLEAR) ------------------------------------------------------
		else if (keyName == 'Escape')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();

			else
			{
				// Clear hints
				this._lastHints = null;

				// Clear input
				this._clearInput();
			}
		}

		//--- ARROW UP ---------------------------------------------------------
		else if (keyName == 'ArrowUp')
		{
			// If hint panel is open, set selection
			if (this._isHintPanelOpen)
			{
				this._currHintFocus--;

				this._setHintItemSelected();
			}

			// Browse history
			else
			{
				this._setInputOnHistorySelected(this._cmdHistory.rewind());
			}
		}

		//--- ARROW DOWN -------------------------------------------------------
		else if (keyName == 'ArrowDown')
		{
			// If hint panel is open, set selection
			if (this._isHintPanelOpen)
			{
				this._currHintFocus++;

				this._setHintItemSelected();
			}

			// Browse history
			else
			{
				this._setInputOnHistorySelected(this._cmdHistory.forward());
			}
		}

		//--- ARROW LEFT & RIGHT -----------------------------------------------
		else if (keyName == 'ArrowLeft' || keyName == 'ArrowRight')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();
		}

		//--- ANY OTHER KEY ----------------------------------------------------
		else
		{
			// Update temp in command history
			this._cmdHistory.addTempCommand(input);

			if (input.length == $('#cns-input')[0].selectionEnd)
			{
				// Update hint panel if open
				if (this._isHintPanelOpen)
					this._updateHintPanel();

				// Show hint panel
				else
					this._showHintPanel();
			}
			else
			{
				// Reset hinting
				this._resetHinting(input);
			}
		}
	}

	_onClearConsoleClick()
	{
		$('#cns-console').empty();
	}

	_onHintItemClick(e)
	{
		e.preventDefault();

		// Set clicked item as selected
		e.currentTarget.classList.add('selected');

		// Set input value
		this._setInputOnHintSelected();

		// Focus on prompt input
		$('#cns-input').focus();
	}

	_onGenericClick()
	{
		// Close hint panel if open
		if (this._isHintPanelOpen)
			this._closeHintPanel();
	}

	_onExportSessionClick()
	{
		let date = moment__WEBPACK_IMPORTED_MODULE_3__();

		let transcript = this.TRANSCRIPT_TEMPLATE.replace('<!--HEADER-->', `Saved on ${date.format('dddd, MMMM Do YYYY, HH:mm:ss')}`);
		transcript = transcript.replace('<!--TRANSCRIPT-->', $('#cns-console').html());

		let blob = new Blob([transcript], {type: 'text/html;charset=utf-8'});

		file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, `ConsoleSession_${date.format('YYYYMMDD_HHmmss')}.html`);
	}

	_onRunScriptClick()
	{
		// Open modal
		this._uploadScriptModal.modal('show');
	}

	_onUploadScriptrModalHidden()
	{
		// Clear uploader
		this._uploader.clearAllFiles();
	}

	_onUploadScriptrButtonCLick()
	{
		if (this._uploader.getFiles().length > 0)
		{
			let file = this._uploader.getFiles()[0].rawFile;

			file.arrayBuffer().then(buffer => {
				this._writeConsole(`EXEC: ${file.name}`, true);

				let sfso = new SFS2X.SFSObject();
				sfso.putByteArray('script', new Uint8Array(buffer));

				this.sendExtensionRequest(this.REQ_SCRIPT, sfso);
			});

			// Close modal
			this._uploadScriptModal.modal('hide');
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_showWelcomeMessage()
	{
		this._writeConsole(`--------------------------------------\nADMIN_CONSOLE, version ${this.VERSION}\n--------------------------------------\nType help() for assistance.\n`, false, false);
	}

	_clearInput()
	{
		$('#cns-input').val('');
		$('#cns-input-dummy').html('');
	}

	_setInputOnHintSelected()
	{
		if (this._hintPanel)
		{
			const input = $('#cns-input').val();
			const selectedVal = this._hintPanel.find('.hint-item.selected input').val();
			const newInput = input.substring(0, input.lastIndexOf('.')) + '.' + selectedVal;

			$('#cns-input').val(newInput);
			$('#cns-input-dummy').html(newInput);

			this._closeHintPanel();
		}
	}

	_setInputOnHistorySelected(command)
	{
		$('#cns-input').val(command);
		$('#cns-input-dummy').html(command);
	}

	_writeConsole(txt, isInput = false, linebreak = true)
	{
		let msg;

		if (isInput)
			msg = `<span class="text-command">&gt; ${txt}</span>`;
		else
			msg = `<span class="text-console">${txt}</span>`;

		if (linebreak)
			msg = `\n${msg}`;

		// Append text to console
		$('#cns-console').append(msg);

		// scroll console to bottom
		$('#cns-console').scrollTop(function() { return this.scrollHeight; });
	}

	_parseHtml(ss)
	{
		ss = ss.replace('<', '&lt;');
		ss = ss.replace('>', '&gt;');

		return ss;
	}

	_showHintPanel()
	{
		if (this._lastHints != null && this._lastHints.length > 0)
		{
			this._currHintFocus = -1;

			// Create panel
			this._hintPanel = $('<div>', {'class': 'hint-panel'});
			$(this).append(this._hintPanel);

			// Show hints
			this._updateHintPanel();
		}
	}

	_closeHintPanel()
	{
		this._hintPanel.remove();
		this._hintPanel = null;
	}

	_updateHintPanel()
	{
		if (this._lastHints != null && this._lastHints.length > 0)
		{
			// Clear hints panel
			this._hintPanel.empty();

			const dotIndex = $('#cns-input').val().lastIndexOf('.');
			let lastWord = '';

			if (dotIndex > -1)
				lastWord = $('#cns-input').val().substr(dotIndex + 1, $('#cns-input').val().length);

			let isEmpty = true;

			for (let word of this._lastHints)
			{
				// Check if the item starts with the same letters as the input's last word
				if (lastWord == '' || word.substr(0, lastWord.length).toUpperCase() == lastWord.toUpperCase())
				{
					// Create div
					let item = $('<div>', {'class': 'hint-item'});

					// Show value, and make the matching letters bold
					item.append(`<strong>${word.substr(0, lastWord.length)}</strong>${word.substr(lastWord.length)}`);

					// Insert an input field that will hold the current item's value
					item.append(`<input type="hidden" value="${word}">`);

					// Add click listener
					item.on('click', $.proxy(this._onHintItemClick, this));

					this._hintPanel.append(item);

					isEmpty = false;
				}
			}

			// If panel is empty, rmove it
			if (isEmpty)
				this._closeHintPanel();

			// Else set panel position
			else
			{
				const extContPos = $('#cns-input-container-2').position();
				const intContPos = $('#cns-input-container-1').position();

				let left = extContPos.left + intContPos.left + $('#cns-input-dummy').outerWidth();
				let top = extContPos.top + intContPos.top - this._hintPanel.outerHeight();

				if (left > window.innerWidth - this._hintPanel.outerWidth())
					left = window.innerWidth - this._hintPanel.outerWidth();

				this._hintPanel.css({top: top, left: left, position: 'absolute'});
			}
		}
	}

	_requestHints(input)
	{
		// Clear previous hints
		this._lastHints = null;

		// Parse input
		let hintParent = this._extractHintParent(input);
		
		// Request code hint
		let params = new SFS2X.SFSObject();
		params.putUtfString('c', hintParent);

		this.sendExtensionRequest(this.REQ_HINT, params);
	}

	_extractHintParent(inVal)
	{
		let outVal = null;

		for (let tok of this.TOKENS)
		{
			const p = inVal.indexOf(tok);

			if (p > -1)
			{
				outVal = inVal.substring(p + tok.length, inVal.length).trim();
				break;
			}
		}

		if (outVal == null)
			outVal = inVal;

		// Remove dot at the end if needed
		if (outVal.endsWith('.'))
			outVal = outVal.substr(0, outVal.length - 1);

		return outVal;
	}

	_setHintItemSelected()
	{
		let items = this._hintPanel.find('.hint-item');
		items.removeClass('selected');

		if (this._currHintFocus >= items.length)
			this._currHintFocus = 0;

    	if (this._currHintFocus < 0)
			this._currHintFocus = items.length - 1;

		let item = items.eq(this._currHintFocus);
		item.addClass('selected');

		// Scroll to item
		this._hintPanel.scrollTop(this._hintPanel.scrollTop() + item.position().top);
	}

	_resetHinting(input)
	{
		// Close hint panel
		if (this._isHintPanelOpen)
			this._closeHintPanel();

		// Clear hints
		this._lastHints = null;

		// Get previous word
		const dotIndex = input.lastIndexOf('.');

		if (dotIndex > -1)
		{
			let value = input.substring(0, dotIndex);

			// Request code hints
			this._requestHints(value);
		}
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------

	get _isHintPanelOpen()
	{
		return this._hintPanel != null;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtNC5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvZGF0YS9jb21tYW5kLWhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9jb25zb2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhiLGMsZCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGIpLGUucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGUub25sb2FkPWZ1bmN0aW9uKCl7YShlLnJlc3BvbnNlLGMsZCl9LGUub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZS5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYSxiLGQsZSl7aWYoZT1lfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZSYmKGUuZG9jdW1lbnQudGl0bGU9ZS5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBhKXJldHVybiBjKGEsYixkKTt2YXIgZz1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09YS50eXBlLGg9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaT0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGl8fGcmJmgpJiZcIm9iamVjdFwiPT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGo9bmV3IEZpbGVSZWFkZXI7ai5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1qLnJlc3VsdDthPWk/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZT9lLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGU9bnVsbH0sai5yZWFkQXNEYXRhVVJMKGEpfWVsc2V7dmFyIGs9Zi5VUkx8fGYud2Via2l0VVJMLGw9ay5jcmVhdGVPYmplY3RVUkwoYSk7ZT9lLmxvY2F0aW9uPWw6bG9jYXRpb24uaHJlZj1sLGU9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ay5yZXZva2VPYmplY3RVUkwobCl9LDRFNCl9fSk7Zi5zYXZlQXM9YS5zYXZlQXM9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9YSl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgY2xhc3MgQ29tbWFuZEhpc3Rvcnlcbntcblx0Y29uc3RydWN0b3Ioc2l6ZSA9IDEwMClcblx0e1xuXHRcdHRoaXMuX3NpemUgPSBzaXplO1xuXG5cdFx0dGhpcy5jbGVhcigpO1xuXHRcdHRoaXMuX2xvYWRTdGF0ZSgpO1xuXHR9XG5cblx0YWRkQ29tbWFuZChjbWQpXG5cdHtcblx0XHRpZiAodGhpcy5faGlzdG9yeS5sZW5ndGggPj0gdGhpcy5fc2l6ZSlcblx0XHRcdHRoaXMuX2hpc3Rvcnkuc3BsaWNlKDAsIDEpO1xuXG5cdFx0dGhpcy5faGlzdG9yeS5wdXNoKGNtZCk7XG5cdFx0dGhpcy5fcG9zID0gdGhpcy5faGlzdG9yeS5sZW5ndGg7XG5cdFx0dGhpcy5fdGVtcENtZCA9ICcnO1xuXG5cdFx0dGhpcy5fc2F2ZVN0YXRlKCk7XG5cdH1cblxuXHRhZGRUZW1wQ29tbWFuZChjbWQpXG5cdHtcblx0XHR0aGlzLl90ZW1wQ21kID0gY21kO1xuXHRcdHRoaXMuX3BvcyA9IHRoaXMuX2hpc3RvcnkubGVuZ3RoO1xuXHR9XG5cblx0cmV3aW5kKClcblx0e1xuXHRcdGlmICh0aGlzLl9wb3MgPiAwKVxuXHRcdFx0dGhpcy5fcG9zLS07XG5cblx0XHRyZXR1cm4gdGhpcy5faGlzdG9yeVt0aGlzLl9wb3NdO1xuXHR9XG5cblx0Zm9yd2FyZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fcG9zIDwgdGhpcy5faGlzdG9yeS5sZW5ndGgpXG5cdFx0XHR0aGlzLl9wb3MrKztcblxuXHRcdGlmICh0aGlzLl9wb3MgPD0gdGhpcy5faGlzdG9yeS5sZW5ndGggLSAxKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2hpc3RvcnlbdGhpcy5fcG9zXTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5fdGVtcENtZDtcblx0fVxuXG5cdGdldExpc3QoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hpc3Rvcnk7XG5cdH1cblxuXHRnZXRTaXplKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oaXN0b3J5Lmxlbmd0aFxuXHR9XG5cblx0Y2xlYXIoKVxuXHR7XG5cdFx0dGhpcy5faGlzdG9yeSA9IFtdO1xuXHRcdHRoaXMuX3BvcyA9IDA7XG5cdFx0dGhpcy5fdGVtcENtZCA9ICcnO1xuXHR9XG5cblx0X3NhdmVTdGF0ZSgpXG5cdHtcblx0XHRDb29raWVzLnNldCgnY29uc29sZS1oaXN0b3J5Jywge1xuXHRcdFx0aGlzdG9yeTogdGhpcy5faGlzdG9yeVxuXHRcdH0sIHtleHBpcmVzOiAzNjAwMH0pO1xuXHR9XG5cblx0X2xvYWRTdGF0ZSgpXG5cdHtcblx0XHRsZXQgZGF0YSA9IENvb2tpZXMuZ2V0SlNPTignY29uc29sZS1oaXN0b3J5JylcblxuXHRcdGlmIChkYXRhKVxuXHRcdHtcblx0XHRcdHRoaXMuX2hpc3RvcnkgPSBkYXRhLmhpc3Rvcnk7XG5cdFx0XHR0aGlzLl9wb3MgPSB0aGlzLl9oaXN0b3J5Lmxlbmd0aDtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge0NvbW1hbmRIaXN0b3J5fSBmcm9tICcuLi9kYXRhL2NvbW1hbmQtaGlzdG9yeSc7XG5pbXBvcnQgKiBhcyBGaWxlU2F2ZXIgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7Ynl0ZXNUb1NpemV9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGUgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ2NvbnNvbGUnKTtcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfQ01EID0gJ2NtZCc7XG5cdFx0dGhpcy5SRVFfSElOVCA9ICdoaW50Jztcblx0XHR0aGlzLlJFUV9TQ1JJUFQgPSAnc2NyaXB0JztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTX0NNRCA9ICdjbWQnO1xuXHRcdHRoaXMuUkVTX0hJTlQgPSAnaGludCc7XG5cdFx0dGhpcy5SRVNfU0NSSVBUID0gJ3NjcmlwdCc7XG5cdFx0dGhpcy5SRVNfRVJST1JfTE9DS0VEID0gJ2xvY2tlZCc7XG5cblx0XHR0aGlzLlZFUlNJT04gPSAnMy4wLjAnO1xuXHRcdHRoaXMuVE9LRU5TID0gWyc9JywgJ2Zyb20gJywgJ2ltcG9ydCAnXTtcblxuXHRcdHRoaXMuVFJBTlNDUklQVF9URU1QTEFURSA9IGBcblx0XHQ8aHRtbD5cblx0XHQ8aGVhZD5cblx0XHRcdDx0aXRsZT5TRlMyWCBBRE1JTiBDT05TT0xFIFNlc3Npb24gVHJhbnNjcmlwdDwvdGl0bGU+XG5cdFx0XHQ8c3R5bGUgdHlwZT0ndGV4dC9jc3MnIG1lZGlhPSdzY3JlZW4nPlxuXHRcdFx0XHRib2R5LCBwcmUge1xuXHRcdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG5cdFx0XHRcdFx0Zm9udC1zaXplOiAuOHJlbTtcblx0XHRcdFx0XHRmb250LWZhbWlseTogTW9uYWNvLCdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGgzIHtcblx0XHRcdFx0XHRjb2xvcjogI2Y4ZjlmYTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHByZSB7XG5cdFx0XHRcdFx0d2hpdGUtc3BhY2U6IHByZS13cmFwO1xuXHRcdFx0XHRcdC1tb3otdGFiLXNpemU6IDU7XG5cdFx0XHRcdFx0dGFiLXNpemU6IDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQudGV4dC1jb25zb2xlIHtcblx0XHRcdFx0XHRjb2xvcjogIzI4RjMyRDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC50ZXh0LWVycm9yIHtcblx0XHRcdFx0XHRjb2xvcjogI2RjMzU0NTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC50ZXh0LWhpZ2hsaWdodCB7XG5cdFx0XHRcdFx0Y29sb3I6ICNmZmMxMDc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQudGV4dC1jb21tYW5kIHtcblx0XHRcdFx0XHRjb2xvcjogI2Y4ZjlmYTtcblx0XHRcdFx0fVxuXHRcdFx0PC9zdHlsZT5cblx0XHQ8L2hlYWQ+XG5cdFx0PGJvZHk+XG5cdFx0XHQ8aDM+PCEtLUhFQURFUi0tPjwvaDM+XG5cdFx0XHQ8cHJlPjwhLS1UUkFOU0NSSVBULS0+PC9wcmU+XG5cdFx0PC9ib2R5PlxuXHRcdDwvaHRtbD5cblx0XHRgO1xuXG5cdFx0dGhpcy5fY21kSGlzdG9yeSA9IG5ldyBDb21tYW5kSGlzdG9yeSgpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpO1xuXG5cdFx0JCgnI2Nucy1pbnB1dCcpLm9uKCdrZXl1cCcsICQucHJveHkodGhpcy5vbklucHV0S2V5VXAsIHRoaXMpKTtcblx0XHQkKCcjY25zLWlucHV0Jykub24oJ2tleWRvd24nLCAkLnByb3h5KHRoaXMub25JbnB1dEtleURvd24sIHRoaXMpKTtcblxuXHRcdC8vIFNob3cgd2VsY29tZSBtZXNzYWdlXG5cdFx0dGhpcy5fc2hvd1dlbGNvbWVNZXNzYWdlKCk7XG5cblx0XHQvLyBGb2N1cyBvbiBwcm9tcHQgaW5wdXRcblx0XHQkKCcjY25zLWlucHV0JykuZm9jdXMoKTtcblxuXHRcdC8vIEFkZCBnbG9iYWwgY2xpY2sgbGlzdGVuZXIgdG8gY2xvc2UgaGludCBwYW5lbFxuXHRcdCQodGhpcykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkdlbmVyaWNDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGdsb2JhbCB3aW5kb3cgcmVzaXplIGxpc3RlbmVyIHRvIGNsb3NlIGhpbnQgcGFuZWxcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsICQucHJveHkodGhpcy5fb25HZW5lcmljQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBidXR0b25zIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyNjbnMtY2xlYXJCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2xlYXJDb25zb2xlQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjY25zLXJ1bkJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SdW5TY3JpcHRDbGljaywgdGhpcykpO1xuXHRcdCQoJyNjbnMtZXhwb3J0QnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkV4cG9ydFNlc3Npb25DbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBcInVwbG9hZCBzY3JpcHRcIiBtb2RhbFxuXHRcdHRoaXMuX3VwbG9hZFNjcmlwdE1vZGFsID0gJCgnI2Nucy11cGxvYWRNb2RhbCcpO1xuXHRcdHRoaXMuX3VwbG9hZFNjcmlwdE1vZGFsLm1vZGFsKHtcblx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJyxcblx0XHRcdGtleWJvYXJkOiBmYWxzZSxcblx0XHRcdHNob3c6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHVwbG9hZGVyXG5cdFx0dGhpcy5fdXBsb2FkZXIgPSAkKCcjY25zLXVwbG9hZGVyJykua2VuZG9VcGxvYWQoe1xuXHRcdFx0YWxsb3dlZEV4dGVuc2lvbnM6IFsnLnB5J10sXG5cdFx0XHRtdWx0aXBsZTogZmFsc2UsXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24oZGF0YUl0ZW0pIHtcblx0XHRcdFx0ZGF0YUl0ZW0uYnl0ZXNUb1NpemUgPSBieXRlc1RvU2l6ZTsgLy8gUGFzcyBieXRlc1RvU2l6ZSB1dGlsaXR5IGZ1bmN0aW9uIHRvIHRlbXBsYXRlXG5cdFx0XHRcdHJldHVybiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9J2stcHJvZ3Jlc3Mgdy0xMDAnPjwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIlwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWZpbGUtbmFtZVwiIHRpdGxlPVwiIz1uYW1lI1wiPiM9bmFtZSM8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstZmlsZS1zaXplXCI+U2l6ZTogIz1ieXRlc1RvU2l6ZShzaXplLCAxLCAnQnl0ZXMnKSM8L3NwYW4+XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRgKShkYXRhSXRlbSk7XG5cdFx0XHR9LFxuXHQgICAgICAgIGxvY2FsaXphdGlvbjoge1xuXHQgICAgICAgICAgICBzZWxlY3Q6ICdTZWxlY3QgZmlsZS4uLidcblx0ICAgICAgICB9XG5cdFx0fSkuZGF0YSgna2VuZG9VcGxvYWQnKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBoaWRlIGV2ZW50XG5cdFx0dGhpcy5fdXBsb2FkU2NyaXB0TW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICQucHJveHkodGhpcy5fb25VcGxvYWRTY3JpcHRyTW9kYWxIaWRkZW4sIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBidXR0b25cblx0XHQkKCcjY25zLXVwbG9hZFNjcmlwdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25VcGxvYWRTY3JpcHRyQnV0dG9uQ0xpY2ssIHRoaXMpKTtcblx0fVxuXG5cdGRlc3Ryb3koKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5kZXN0cm95KCk7XG5cblx0XHQkKCcjY25zLWNsZWFyQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbnMtcnVuQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbnMtZXhwb3J0QnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbnMtdXBsb2FkU2NyaXB0QnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0JCh0aGlzKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCh3aW5kb3cpLm9mZigncmVzaXplJyk7XG5cblx0XHR0aGlzLl91cGxvYWRTY3JpcHRNb2RhbC5vZmYoJ2hpZGRlbi5icy5tb2RhbCcpO1xuXHRcdHRoaXMuX3VwbG9hZFNjcmlwdE1vZGFsLm1vZGFsKCdkaXNwb3NlJyk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTX0NNRCB8fCBjb21tYW5kID09IHRoaXMuUkVTX1NDUklQVClcblx0XHR7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBkYXRhLmdldFV0ZlN0cmluZygncicpO1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBkYXRhLmdldFV0ZlN0cmluZygnZScpO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwpXG5cdFx0XHRcdHRoaXMuX3dyaXRlQ29uc29sZShyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAoZXJyb3IgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fd3JpdGVDb25zb2xlKGA8c3BhbiBjbGFzcz1cInRleHQtZXJyb3JcIj5FUlJPUjwvc3Bhbj4gJHt0aGlzLl9wYXJzZUh0bWwoZXJyb3IpfWApO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNfSElOVClcblx0XHR7XG5cdFx0XHR0aGlzLl9sYXN0SGludHMgPSBkYXRhLmdldFV0ZlN0cmluZ0FycmF5KCdoJyk7XG5cblx0XHRcdHRoaXMuX3Nob3dIaW50UGFuZWwoKTtcblx0XHR9XG5cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTX0VSUk9SX0xPQ0tFRClcblx0XHR7XG5cdFx0XHR0aGlzLl93cml0ZUNvbnNvbGUoYDxzcGFuIGNsYXNzPVwidGV4dC1lcnJvclwiPkVSUk9SPC9zcGFuPiA8c3BhbiBjbGFzcz1cInRleHQtaGlnaGxpZ2h0XCI+Q29uc29sZSBtb2R1bGUgaXMgbG9ja2VkIGZyb20gc2VydmVyIHNpZGUuIFBsZWFzZSBmb2xsb3cgdGhlIGluc3RydWN0aW9ucyB5b3Ugd2VyZSBnaXZlbiB0byB1bmxvY2sgaXQuPC9zcGFuPmApO1xuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdG9uSW5wdXRLZXlEb3duKGUpXG5cdHtcblx0XHQvLyBTYXZlIHByZXZpb3VzIGlucHV0IHZhbHVlXG5cdFx0dGhpcy5fcHJldklucHV0ID0gJCgnI2Nucy1pbnB1dCcpLnZhbCgpO1xuXG5cdFx0Y29uc3Qga2V5TmFtZSA9IGUua2V5O1xuXG5cdFx0aWYgKGtleU5hbWUgPT0gJ0Fycm93VXAnIHx8IGtleU5hbWUgPT0gJ0Fycm93RG93bicgfHwga2V5TmFtZSA9PSAnVGFiJylcblx0XHR7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cblx0b25JbnB1dEtleVVwKGUpXG5cdHtcblx0XHRjb25zdCBrZXlOYW1lID0gZS5rZXk7XG5cdFx0Y29uc3QgaW5wdXQgPSAkKCcjY25zLWlucHV0JykudmFsKCk7XG5cblx0XHQvLyBDb3B5IGlucHV0IHRvIGR1bW15XG5cdFx0JCgnI2Nucy1pbnB1dC1kdW1teScpLmh0bWwoaW5wdXQpO1xuXG5cdFx0Ly8tLS0gRE9UIChDT0RFIEhJTlRJTkcpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0aWYgKGtleU5hbWUgPT0gJy4nKVxuXHRcdHtcblx0XHRcdC8vIENsb3NlIGhpbnQgcGFuZWwgaWYgb3BlblxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdFx0dGhpcy5fY2xvc2VIaW50UGFuZWwoKTtcblxuXHRcdFx0Ly8gUmVxdWVzdCBjb2RlIGhpbnRzXG5cdFx0XHR0aGlzLl9yZXF1ZXN0SGludHMoaW5wdXQpO1xuXHRcdH1cblxuXHRcdC8vLS0tIEVOVEVSIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGVsc2UgaWZcdChrZXlOYW1lID09ICdFbnRlcicgJiYgaW5wdXQubGVuZ3RoID4gMClcblx0XHR7XG5cdFx0XHQvLyBHZXQgc2VsZWN0ZWQgaGludFxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2V0SW5wdXRPbkhpbnRTZWxlY3RlZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBTZW5kIGNvbW1hbmQgdG8gc2VydmVyXG5cdFx0XHRcdGxldCBzZnNvID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdFx0XHRzZnNvLnB1dFV0ZlN0cmluZygnYycsIGlucHV0KTtcblx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9DTUQsIHNmc28pO1xuXG5cdFx0XHRcdC8vIFdyaXRlIGNvbW1hbmQgdG8gY29uc29sZVxuXHRcdFx0XHR0aGlzLl93cml0ZUNvbnNvbGUoaW5wdXQsIHRydWUpO1xuXG5cdFx0XHRcdC8vIENsZWFyIGhpbnRzXG5cdFx0XHRcdHRoaXMuX2xhc3RIaW50cyA9IG51bGw7XG5cblx0XHRcdFx0Ly8gQ2xlYXIgaW5wdXRcblx0XHRcdFx0dGhpcy5fY2xlYXJJbnB1dCgpO1xuXG5cdFx0XHRcdC8vIEFkZCBjb21tYW5kIHRvIGhpc3Rvcnlcblx0XHRcdFx0dGhpcy5fY21kSGlzdG9yeS5hZGRDb21tYW5kKGlucHV0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLy0tLSBFTlRFUiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRlbHNlIGlmXHQoa2V5TmFtZSA9PSAnVGFiJylcblx0XHR7XG5cdFx0XHQvLyBHZXQgc2VsZWN0ZWQgaGludFxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHtcblx0XHRcdFx0aWYgKHRoaXMuX2hpbnRQYW5lbC5maW5kKCcuaGludC1pdGVtLnNlbGVjdGVkJykubGVuZ3RoID4gMClcblx0XHRcdFx0XHR0aGlzLl9zZXRJbnB1dE9uSGludFNlbGVjdGVkKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8tLS0gQ1RSTCtCQUNLU1BBQ0UgKENMRUFSIENPTlNPTEUpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZiAoZS5jdHJsS2V5ICYmIGtleU5hbWUgPT0gJ0JhY2tzcGFjZScpXG5cdFx0e1xuXHRcdFx0dGhpcy5fb25DbGVhckNvbnNvbGVDbGljaygpO1xuXHRcdH1cblxuXHRcdC8vLS0tIEJBQ0tTUEFDRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRlbHNlIGlmIChrZXlOYW1lID09ICdCYWNrc3BhY2UnKVxuXHRcdHtcblx0XHRcdC8vIENoZWNrIHRoZSBkZWxldGVkIGNoYXJcblx0XHRcdGlmICh0aGlzLl9wcmV2SW5wdXQuc3Vic3RyaW5nKHRoaXMuX3ByZXZJbnB1dC5sZW5ndGggLSAxKSA9PSAnLicpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlc2V0IGhpbnRpbmdcblx0XHRcdFx0dGhpcy5fcmVzZXRIaW50aW5nKGlucHV0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIGhpbnQgcGFuZWwgaWYgb3BlblxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdFx0dGhpcy5fdXBkYXRlSGludFBhbmVsKCk7XG5cdFx0fVxuXG5cdFx0Ly8tLS0gRVNDIChDTEVBUikgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZiAoa2V5TmFtZSA9PSAnRXNjYXBlJylcblx0XHR7XG5cdFx0XHQvLyBDbG9zZSBoaW50IHBhbmVsIGlmIG9wZW5cblx0XHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2xlYXIgaGludHNcblx0XHRcdFx0dGhpcy5fbGFzdEhpbnRzID0gbnVsbDtcblxuXHRcdFx0XHQvLyBDbGVhciBpbnB1dFxuXHRcdFx0XHR0aGlzLl9jbGVhcklucHV0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8tLS0gQVJST1cgVVAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZiAoa2V5TmFtZSA9PSAnQXJyb3dVcCcpXG5cdFx0e1xuXHRcdFx0Ly8gSWYgaGludCBwYW5lbCBpcyBvcGVuLCBzZXQgc2VsZWN0aW9uXG5cdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9jdXJySGludEZvY3VzLS07XG5cblx0XHRcdFx0dGhpcy5fc2V0SGludEl0ZW1TZWxlY3RlZCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCcm93c2UgaGlzdG9yeVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9zZXRJbnB1dE9uSGlzdG9yeVNlbGVjdGVkKHRoaXMuX2NtZEhpc3RvcnkucmV3aW5kKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vLS0tIEFSUk9XIERPV04gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGVsc2UgaWYgKGtleU5hbWUgPT0gJ0Fycm93RG93bicpXG5cdFx0e1xuXHRcdFx0Ly8gSWYgaGludCBwYW5lbCBpcyBvcGVuLCBzZXQgc2VsZWN0aW9uXG5cdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9jdXJySGludEZvY3VzKys7XG5cblx0XHRcdFx0dGhpcy5fc2V0SGludEl0ZW1TZWxlY3RlZCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCcm93c2UgaGlzdG9yeVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9zZXRJbnB1dE9uSGlzdG9yeVNlbGVjdGVkKHRoaXMuX2NtZEhpc3RvcnkuZm9yd2FyZCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLy0tLSBBUlJPVyBMRUZUICYgUklHSFQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRlbHNlIGlmIChrZXlOYW1lID09ICdBcnJvd0xlZnQnIHx8IGtleU5hbWUgPT0gJ0Fycm93UmlnaHQnKVxuXHRcdHtcblx0XHRcdC8vIENsb3NlIGhpbnQgcGFuZWwgaWYgb3BlblxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdFx0dGhpcy5fY2xvc2VIaW50UGFuZWwoKTtcblx0XHR9XG5cblx0XHQvLy0tLSBBTlkgT1RIRVIgS0VZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gVXBkYXRlIHRlbXAgaW4gY29tbWFuZCBoaXN0b3J5XG5cdFx0XHR0aGlzLl9jbWRIaXN0b3J5LmFkZFRlbXBDb21tYW5kKGlucHV0KTtcblxuXHRcdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAkKCcjY25zLWlucHV0JylbMF0uc2VsZWN0aW9uRW5kKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBVcGRhdGUgaGludCBwYW5lbCBpZiBvcGVuXG5cdFx0XHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlSGludFBhbmVsKCk7XG5cblx0XHRcdFx0Ly8gU2hvdyBoaW50IHBhbmVsXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9zaG93SGludFBhbmVsKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlc2V0IGhpbnRpbmdcblx0XHRcdFx0dGhpcy5fcmVzZXRIaW50aW5nKGlucHV0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfb25DbGVhckNvbnNvbGVDbGljaygpXG5cdHtcblx0XHQkKCcjY25zLWNvbnNvbGUnKS5lbXB0eSgpO1xuXHR9XG5cblx0X29uSGludEl0ZW1DbGljayhlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gU2V0IGNsaWNrZWQgaXRlbSBhcyBzZWxlY3RlZFxuXHRcdGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXG5cdFx0Ly8gU2V0IGlucHV0IHZhbHVlXG5cdFx0dGhpcy5fc2V0SW5wdXRPbkhpbnRTZWxlY3RlZCgpO1xuXG5cdFx0Ly8gRm9jdXMgb24gcHJvbXB0IGlucHV0XG5cdFx0JCgnI2Nucy1pbnB1dCcpLmZvY3VzKCk7XG5cdH1cblxuXHRfb25HZW5lcmljQ2xpY2soKVxuXHR7XG5cdFx0Ly8gQ2xvc2UgaGludCBwYW5lbCBpZiBvcGVuXG5cdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cdH1cblxuXHRfb25FeHBvcnRTZXNzaW9uQ2xpY2soKVxuXHR7XG5cdFx0bGV0IGRhdGUgPSBtb21lbnQoKTtcblxuXHRcdGxldCB0cmFuc2NyaXB0ID0gdGhpcy5UUkFOU0NSSVBUX1RFTVBMQVRFLnJlcGxhY2UoJzwhLS1IRUFERVItLT4nLCBgU2F2ZWQgb24gJHtkYXRlLmZvcm1hdCgnZGRkZCwgTU1NTSBEbyBZWVlZLCBISDptbTpzcycpfWApO1xuXHRcdHRyYW5zY3JpcHQgPSB0cmFuc2NyaXB0LnJlcGxhY2UoJzwhLS1UUkFOU0NSSVBULS0+JywgJCgnI2Nucy1jb25zb2xlJykuaHRtbCgpKTtcblxuXHRcdGxldCBibG9iID0gbmV3IEJsb2IoW3RyYW5zY3JpcHRdLCB7dHlwZTogJ3RleHQvaHRtbDtjaGFyc2V0PXV0Zi04J30pO1xuXG5cdFx0RmlsZVNhdmVyLnNhdmVBcyhibG9iLCBgQ29uc29sZVNlc3Npb25fJHtkYXRlLmZvcm1hdCgnWVlZWU1NRERfSEhtbXNzJyl9Lmh0bWxgKTtcblx0fVxuXG5cdF9vblJ1blNjcmlwdENsaWNrKClcblx0e1xuXHRcdC8vIE9wZW4gbW9kYWxcblx0XHR0aGlzLl91cGxvYWRTY3JpcHRNb2RhbC5tb2RhbCgnc2hvdycpO1xuXHR9XG5cblx0X29uVXBsb2FkU2NyaXB0ck1vZGFsSGlkZGVuKClcblx0e1xuXHRcdC8vIENsZWFyIHVwbG9hZGVyXG5cdFx0dGhpcy5fdXBsb2FkZXIuY2xlYXJBbGxGaWxlcygpO1xuXHR9XG5cblx0X29uVXBsb2FkU2NyaXB0ckJ1dHRvbkNMaWNrKClcblx0e1xuXHRcdGlmICh0aGlzLl91cGxvYWRlci5nZXRGaWxlcygpLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0bGV0IGZpbGUgPSB0aGlzLl91cGxvYWRlci5nZXRGaWxlcygpWzBdLnJhd0ZpbGU7XG5cblx0XHRcdGZpbGUuYXJyYXlCdWZmZXIoKS50aGVuKGJ1ZmZlciA9PiB7XG5cdFx0XHRcdHRoaXMuX3dyaXRlQ29uc29sZShgRVhFQzogJHtmaWxlLm5hbWV9YCwgdHJ1ZSk7XG5cblx0XHRcdFx0bGV0IHNmc28gPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRcdHNmc28ucHV0Qnl0ZUFycmF5KCdzY3JpcHQnLCBuZXcgVWludDhBcnJheShidWZmZXIpKTtcblxuXHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX1NDUklQVCwgc2Zzbyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQ2xvc2UgbW9kYWxcblx0XHRcdHRoaXMuX3VwbG9hZFNjcmlwdE1vZGFsLm1vZGFsKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X3Nob3dXZWxjb21lTWVzc2FnZSgpXG5cdHtcblx0XHR0aGlzLl93cml0ZUNvbnNvbGUoYC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuQURNSU5fQ09OU09MRSwgdmVyc2lvbiAke3RoaXMuVkVSU0lPTn1cXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblR5cGUgaGVscCgpIGZvciBhc3Npc3RhbmNlLlxcbmAsIGZhbHNlLCBmYWxzZSk7XG5cdH1cblxuXHRfY2xlYXJJbnB1dCgpXG5cdHtcblx0XHQkKCcjY25zLWlucHV0JykudmFsKCcnKTtcblx0XHQkKCcjY25zLWlucHV0LWR1bW15JykuaHRtbCgnJyk7XG5cdH1cblxuXHRfc2V0SW5wdXRPbkhpbnRTZWxlY3RlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5faGludFBhbmVsKVxuXHRcdHtcblx0XHRcdGNvbnN0IGlucHV0ID0gJCgnI2Nucy1pbnB1dCcpLnZhbCgpO1xuXHRcdFx0Y29uc3Qgc2VsZWN0ZWRWYWwgPSB0aGlzLl9oaW50UGFuZWwuZmluZCgnLmhpbnQtaXRlbS5zZWxlY3RlZCBpbnB1dCcpLnZhbCgpO1xuXHRcdFx0Y29uc3QgbmV3SW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgaW5wdXQubGFzdEluZGV4T2YoJy4nKSkgKyAnLicgKyBzZWxlY3RlZFZhbDtcblxuXHRcdFx0JCgnI2Nucy1pbnB1dCcpLnZhbChuZXdJbnB1dCk7XG5cdFx0XHQkKCcjY25zLWlucHV0LWR1bW15JykuaHRtbChuZXdJbnB1dCk7XG5cblx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cdFx0fVxuXHR9XG5cblx0X3NldElucHV0T25IaXN0b3J5U2VsZWN0ZWQoY29tbWFuZClcblx0e1xuXHRcdCQoJyNjbnMtaW5wdXQnKS52YWwoY29tbWFuZCk7XG5cdFx0JCgnI2Nucy1pbnB1dC1kdW1teScpLmh0bWwoY29tbWFuZCk7XG5cdH1cblxuXHRfd3JpdGVDb25zb2xlKHR4dCwgaXNJbnB1dCA9IGZhbHNlLCBsaW5lYnJlYWsgPSB0cnVlKVxuXHR7XG5cdFx0bGV0IG1zZztcblxuXHRcdGlmIChpc0lucHV0KVxuXHRcdFx0bXNnID0gYDxzcGFuIGNsYXNzPVwidGV4dC1jb21tYW5kXCI+Jmd0OyAke3R4dH08L3NwYW4+YDtcblx0XHRlbHNlXG5cdFx0XHRtc2cgPSBgPHNwYW4gY2xhc3M9XCJ0ZXh0LWNvbnNvbGVcIj4ke3R4dH08L3NwYW4+YDtcblxuXHRcdGlmIChsaW5lYnJlYWspXG5cdFx0XHRtc2cgPSBgXFxuJHttc2d9YDtcblxuXHRcdC8vIEFwcGVuZCB0ZXh0IHRvIGNvbnNvbGVcblx0XHQkKCcjY25zLWNvbnNvbGUnKS5hcHBlbmQobXNnKTtcblxuXHRcdC8vIHNjcm9sbCBjb25zb2xlIHRvIGJvdHRvbVxuXHRcdCQoJyNjbnMtY29uc29sZScpLnNjcm9sbFRvcChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuc2Nyb2xsSGVpZ2h0OyB9KTtcblx0fVxuXG5cdF9wYXJzZUh0bWwoc3MpXG5cdHtcblx0XHRzcyA9IHNzLnJlcGxhY2UoJzwnLCAnJmx0OycpO1xuXHRcdHNzID0gc3MucmVwbGFjZSgnPicsICcmZ3Q7Jyk7XG5cblx0XHRyZXR1cm4gc3M7XG5cdH1cblxuXHRfc2hvd0hpbnRQYW5lbCgpXG5cdHtcblx0XHRpZiAodGhpcy5fbGFzdEhpbnRzICE9IG51bGwgJiYgdGhpcy5fbGFzdEhpbnRzLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0dGhpcy5fY3VyckhpbnRGb2N1cyA9IC0xO1xuXG5cdFx0XHQvLyBDcmVhdGUgcGFuZWxcblx0XHRcdHRoaXMuX2hpbnRQYW5lbCA9ICQoJzxkaXY+JywgeydjbGFzcyc6ICdoaW50LXBhbmVsJ30pO1xuXHRcdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5faGludFBhbmVsKTtcblxuXHRcdFx0Ly8gU2hvdyBoaW50c1xuXHRcdFx0dGhpcy5fdXBkYXRlSGludFBhbmVsKCk7XG5cdFx0fVxuXHR9XG5cblx0X2Nsb3NlSGludFBhbmVsKClcblx0e1xuXHRcdHRoaXMuX2hpbnRQYW5lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9oaW50UGFuZWwgPSBudWxsO1xuXHR9XG5cblx0X3VwZGF0ZUhpbnRQYW5lbCgpXG5cdHtcblx0XHRpZiAodGhpcy5fbGFzdEhpbnRzICE9IG51bGwgJiYgdGhpcy5fbGFzdEhpbnRzLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0Ly8gQ2xlYXIgaGludHMgcGFuZWxcblx0XHRcdHRoaXMuX2hpbnRQYW5lbC5lbXB0eSgpO1xuXG5cdFx0XHRjb25zdCBkb3RJbmRleCA9ICQoJyNjbnMtaW5wdXQnKS52YWwoKS5sYXN0SW5kZXhPZignLicpO1xuXHRcdFx0bGV0IGxhc3RXb3JkID0gJyc7XG5cblx0XHRcdGlmIChkb3RJbmRleCA+IC0xKVxuXHRcdFx0XHRsYXN0V29yZCA9ICQoJyNjbnMtaW5wdXQnKS52YWwoKS5zdWJzdHIoZG90SW5kZXggKyAxLCAkKCcjY25zLWlucHV0JykudmFsKCkubGVuZ3RoKTtcblxuXHRcdFx0bGV0IGlzRW1wdHkgPSB0cnVlO1xuXG5cdFx0XHRmb3IgKGxldCB3b3JkIG9mIHRoaXMuX2xhc3RIaW50cylcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIGl0ZW0gc3RhcnRzIHdpdGggdGhlIHNhbWUgbGV0dGVycyBhcyB0aGUgaW5wdXQncyBsYXN0IHdvcmRcblx0XHRcdFx0aWYgKGxhc3RXb3JkID09ICcnIHx8IHdvcmQuc3Vic3RyKDAsIGxhc3RXb3JkLmxlbmd0aCkudG9VcHBlckNhc2UoKSA9PSBsYXN0V29yZC50b1VwcGVyQ2FzZSgpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGRpdlxuXHRcdFx0XHRcdGxldCBpdGVtID0gJCgnPGRpdj4nLCB7J2NsYXNzJzogJ2hpbnQtaXRlbSd9KTtcblxuXHRcdFx0XHRcdC8vIFNob3cgdmFsdWUsIGFuZCBtYWtlIHRoZSBtYXRjaGluZyBsZXR0ZXJzIGJvbGRcblx0XHRcdFx0XHRpdGVtLmFwcGVuZChgPHN0cm9uZz4ke3dvcmQuc3Vic3RyKDAsIGxhc3RXb3JkLmxlbmd0aCl9PC9zdHJvbmc+JHt3b3JkLnN1YnN0cihsYXN0V29yZC5sZW5ndGgpfWApO1xuXG5cdFx0XHRcdFx0Ly8gSW5zZXJ0IGFuIGlucHV0IGZpZWxkIHRoYXQgd2lsbCBob2xkIHRoZSBjdXJyZW50IGl0ZW0ncyB2YWx1ZVxuXHRcdFx0XHRcdGl0ZW0uYXBwZW5kKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJHt3b3JkfVwiPmApO1xuXG5cdFx0XHRcdFx0Ly8gQWRkIGNsaWNrIGxpc3RlbmVyXG5cdFx0XHRcdFx0aXRlbS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uSGludEl0ZW1DbGljaywgdGhpcykpO1xuXG5cdFx0XHRcdFx0dGhpcy5faGludFBhbmVsLmFwcGVuZChpdGVtKTtcblxuXHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBwYW5lbCBpcyBlbXB0eSwgcm1vdmUgaXRcblx0XHRcdGlmIChpc0VtcHR5KVxuXHRcdFx0XHR0aGlzLl9jbG9zZUhpbnRQYW5lbCgpO1xuXG5cdFx0XHQvLyBFbHNlIHNldCBwYW5lbCBwb3NpdGlvblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBleHRDb250UG9zID0gJCgnI2Nucy1pbnB1dC1jb250YWluZXItMicpLnBvc2l0aW9uKCk7XG5cdFx0XHRcdGNvbnN0IGludENvbnRQb3MgPSAkKCcjY25zLWlucHV0LWNvbnRhaW5lci0xJykucG9zaXRpb24oKTtcblxuXHRcdFx0XHRsZXQgbGVmdCA9IGV4dENvbnRQb3MubGVmdCArIGludENvbnRQb3MubGVmdCArICQoJyNjbnMtaW5wdXQtZHVtbXknKS5vdXRlcldpZHRoKCk7XG5cdFx0XHRcdGxldCB0b3AgPSBleHRDb250UG9zLnRvcCArIGludENvbnRQb3MudG9wIC0gdGhpcy5faGludFBhbmVsLm91dGVySGVpZ2h0KCk7XG5cblx0XHRcdFx0aWYgKGxlZnQgPiB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuX2hpbnRQYW5lbC5vdXRlcldpZHRoKCkpXG5cdFx0XHRcdFx0bGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5faGludFBhbmVsLm91dGVyV2lkdGgoKTtcblxuXHRcdFx0XHR0aGlzLl9oaW50UGFuZWwuY3NzKHt0b3A6IHRvcCwgbGVmdDogbGVmdCwgcG9zaXRpb246ICdhYnNvbHV0ZSd9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfcmVxdWVzdEhpbnRzKGlucHV0KVxuXHR7XG5cdFx0Ly8gQ2xlYXIgcHJldmlvdXMgaGludHNcblx0XHR0aGlzLl9sYXN0SGludHMgPSBudWxsO1xuXG5cdFx0Ly8gUGFyc2UgaW5wdXRcblx0XHRsZXQgaGludFBhcmVudCA9IHRoaXMuX2V4dHJhY3RIaW50UGFyZW50KGlucHV0KTtcblx0XHRcblx0XHQvLyBSZXF1ZXN0IGNvZGUgaGludFxuXHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0cGFyYW1zLnB1dFV0ZlN0cmluZygnYycsIGhpbnRQYXJlbnQpO1xuXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ISU5ULCBwYXJhbXMpO1xuXHR9XG5cblx0X2V4dHJhY3RIaW50UGFyZW50KGluVmFsKVxuXHR7XG5cdFx0bGV0IG91dFZhbCA9IG51bGw7XG5cblx0XHRmb3IgKGxldCB0b2sgb2YgdGhpcy5UT0tFTlMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IGluVmFsLmluZGV4T2YodG9rKTtcblxuXHRcdFx0aWYgKHAgPiAtMSlcblx0XHRcdHtcblx0XHRcdFx0b3V0VmFsID0gaW5WYWwuc3Vic3RyaW5nKHAgKyB0b2subGVuZ3RoLCBpblZhbC5sZW5ndGgpLnRyaW0oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG91dFZhbCA9PSBudWxsKVxuXHRcdFx0b3V0VmFsID0gaW5WYWw7XG5cblx0XHQvLyBSZW1vdmUgZG90IGF0IHRoZSBlbmQgaWYgbmVlZGVkXG5cdFx0aWYgKG91dFZhbC5lbmRzV2l0aCgnLicpKVxuXHRcdFx0b3V0VmFsID0gb3V0VmFsLnN1YnN0cigwLCBvdXRWYWwubGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gb3V0VmFsO1xuXHR9XG5cblx0X3NldEhpbnRJdGVtU2VsZWN0ZWQoKVxuXHR7XG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5faGludFBhbmVsLmZpbmQoJy5oaW50LWl0ZW0nKTtcblx0XHRpdGVtcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdGlmICh0aGlzLl9jdXJySGludEZvY3VzID49IGl0ZW1zLmxlbmd0aClcblx0XHRcdHRoaXMuX2N1cnJIaW50Rm9jdXMgPSAwO1xuXG4gICAgXHRpZiAodGhpcy5fY3VyckhpbnRGb2N1cyA8IDApXG5cdFx0XHR0aGlzLl9jdXJySGludEZvY3VzID0gaXRlbXMubGVuZ3RoIC0gMTtcblxuXHRcdGxldCBpdGVtID0gaXRlbXMuZXEodGhpcy5fY3VyckhpbnRGb2N1cyk7XG5cdFx0aXRlbS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdC8vIFNjcm9sbCB0byBpdGVtXG5cdFx0dGhpcy5faGludFBhbmVsLnNjcm9sbFRvcCh0aGlzLl9oaW50UGFuZWwuc2Nyb2xsVG9wKCkgKyBpdGVtLnBvc2l0aW9uKCkudG9wKTtcblx0fVxuXG5cdF9yZXNldEhpbnRpbmcoaW5wdXQpXG5cdHtcblx0XHQvLyBDbG9zZSBoaW50IHBhbmVsXG5cdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cblx0XHQvLyBDbGVhciBoaW50c1xuXHRcdHRoaXMuX2xhc3RIaW50cyA9IG51bGw7XG5cblx0XHQvLyBHZXQgcHJldmlvdXMgd29yZFxuXHRcdGNvbnN0IGRvdEluZGV4ID0gaW5wdXQubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdGlmIChkb3RJbmRleCA+IC0xKVxuXHRcdHtcblx0XHRcdGxldCB2YWx1ZSA9IGlucHV0LnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG5cblx0XHRcdC8vIFJlcXVlc3QgY29kZSBoaW50c1xuXHRcdFx0dGhpcy5fcmVxdWVzdEhpbnRzKHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgX2lzSGludFBhbmVsT3BlbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGludFBhbmVsICE9IG51bGw7XG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9