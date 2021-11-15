/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-8"],{

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

/***/ "./src/data/runtime-log-entry.js":
/*!***************************************!*\
  !*** ./src/data/runtime-log-entry.js ***!
  \***************************************/
/*! exports provided: RuntimeLogEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuntimeLogEntry", function() { return RuntimeLogEntry; });
class RuntimeLogEntry
{
	constructor(separator)
	{
		this.sep = separator
	}

	static fromArray(separator, logEntryData)
	{
		let rle = new RuntimeLogEntry(separator);

		rle.date = logEntryData[0];
		rle.time = logEntryData[1];
		rle.dateTime = rle._getDateTime();
		rle.level = logEntryData[2].trim();
		rle.thread = logEntryData[3];
		rle.clazz = logEntryData[4];
		rle.message = logEntryData[6];

		return rle;
	}

	_getDateTime()
	{
		return this.date + '\n' + this.time;
	}
}


/***/ }),

/***/ "./src/modules/log-viewer.js":
/*!***********************************!*\
  !*** ./src/modules/log-viewer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogViewer; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _data_runtime_log_entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/runtime-log-entry */ "./src/data/runtime-log-entry.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class LogViewer extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('logViewer');

		this.COMMANDS_PREFIX = 'logViewer';
		this.HELP_URL = '/admintool-LogViewer';

		this.ANY_LEVEL = '[any]';
		this.LEVELS = ['TRACE','DEBUG','INFO','WARN','ERROR'];
		this.ANY_CLASS = '[any]';

		this.LOG_DATA_LABEL = 'lines';

		this.BOOT_LOG_BACKUP_ID = 'SFS2X_BootLog';
		this.RUNTIME_LOG_BACKUP_ID = 'SFS2X_RuntimeLog';
		this.FULL_BACKUP_ID = 'SFS2X_Logs';

		// Outgoing requests
		this.REQ_GET_RUNTIME_LOG = 'getRunLog';
		this.REQ_GET_BOOT_LOG = 'getBootLog';
		this.REQ_GET_BACKUPS_STATUS = 'getBakStatus';
		this.REQ_BACKUP_BOOT_LOG = 'bakBootLog';
		this.REQ_BACKUP_RUNTIME_LOG = 'bakRunLog';
		this.REQ_BACKUP_FULL_LOGS = 'bakFullLogs';
		this.REQ_DELETE_BACKUP = 'delBackup';

		// Incoming responses
		this.RESP_INIT_ERROR = 'initErr';
		this.RESP_RUNTIME_LOG_ERROR = 'runLogErr';
		this.RESP_RUNTIME_LOG_INVALID = 'runLogInv';
		this.RESP_RUNTIME_LOG = 'runLog';
		this.RESP_BOOT_LOG_ERROR = 'bootLogErr';
		this.RESP_BOOT_LOG = 'bootLog';
		this.RESP_BACKUPS_STATUS = 'bakStatus';
		this.RESP_DELETE_BACKUP_FAILED = 'delBakFail';
		this.RESP_BACKUP_ERROR = 'bakError';
		this.RESP_BACKUP_WARNING = 'bakWarn';
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

		// Initialize scrolling tabs
		$('#lgv-tabNavigator > #tabs').scrollingTabs({
			bootstrapVersion: 4,
			scrollToTabEdge: true,
			enableSwiping: true,
			disableScrollArrowsOnFullyScrolled: true,
			cssClassLeftArrow: 'fa fa-chevron-left',
			cssClassRightArrow: 'fa fa-chevron-right'
		});

		// Add listener to tab shown event
		$('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this._onTabShown, this));

		// Initialize log lines dropdown
		this._logLinesDD = $('#lgv-logLinesDD').kendoDropDownList({
			valueTemplate: '<span class="text-muted pr-1">Log entries:</span><span>#:data.text#</span>',
		}).data('kendoDropDownList');

		// Initialize load button
		$('#lgv-loadBt').on('click', $.proxy(this._onRuntimeLogLoadBtClick, this));

		// Initialize progress bars
		$('.progress-bar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Initialize level filter dropdown
		this._levelFilterDD = $('#lgv-levelDD').kendoDropDownList({
			dataSource: [this.ANY_LEVEL].concat(this.LEVELS),
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize class filter dropdown
		this._classFilterDD = $('#lgv-classDD').kendoDropDownList({
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize message filter input
		$('#lgv-messageIn').on('input', $.proxy(this._onFilterChange, this));

		// Initialize clear button
		$('#lgv-clearFilterBt').on('click', $.proxy(this._onClearFilterClick, this));

		// Initialize export button
		$('#lgv-exportRuntimeLogBt').on('click', $.proxy(this._onExportRuntimeLogBtClick, this));

		// Initialize runtime log grid
		this._runtimeLogGrid = $('#lgv-runtimeLogGrid').kendoGrid({
			scrollable: true,
            sortable: false,
			//resizable: true,
			selectable: false,
            columns:
            [
				{
	                field: 'dateTime',
	                width: 150,
					title: 'Date/Time',
	            },
	            {
	                field: 'level',
	                width: 100,
	                title: 'Level',
	            },
	            {
	                field: 'thread',
	                width: 150,
	                title: 'Thread',
	            },
	            {
	                field: 'clazz',
	                width: 250,
	                title: 'Class',
	            },
				{
	                field: 'message',
	                width: 1000,
					title: 'Message',
	            },
			],
			noRecords: {
				template: 'No log entries to display.'
			},
			dataSource: []
        }).data('kendoGrid');

		// Initialize boot log view buttons
		$('#lgv-exportBootLogBt').on('click', $.proxy(this._onExportBootLogBtClick, this));
		$('#lgv-switchBootLogColorBt').on('click', $.proxy(this._onSwitchBootLogColorBtClick, this));

		// Initialize generate backup buttons
		$('#lgv-bootLogBackupCard .backup-button').on('click', $.proxy(this._onBootLogGenerateBtClick, this));
		$('#lgv-runtimeLogBackupCard .backup-button').on('click', $.proxy(this._onRuntimeLogGenerateBtClick, this));
		$('#lgv-fullLogBackupCard .backup-button').on('click', $.proxy(this._onFullLogsGenerateBtClick, this));

		this._initBackupCard('#lgv-bootLogBackupCard');
		this._initBackupCard('#lgv-runtimeLogBackupCard');
		this._initBackupCard('#lgv-fullLogBackupCard');

		// Initialize download grid
		this._downloadGrid = $('#lgv-downloadGrid').kendoGrid({
			scrollable: true,
            sortable: true,
			//resizable: true,
			selectable: 'row',
            columns:
            [
				{
	                field: 'date',
	                width: 100,
					title: 'Date',
	            },
	            {
	                field: 'time',
	                width: 100,
	                title: 'Time',
	            },
	            {
	                field: 'name',
	                width: 300,
	                title: 'Filename',
	            },
	            {
	                field: 'size',
	                width: 100,
	                title: 'Size',
	            },
			],
			noRecords: {
				template: 'No backups available.'
			},
			change: $.proxy(this._onDownloadGridSelectionChange, this),
			dataSource: []
        }).data('kendoGrid');

		// Initialize delete button
		$('#lgv-deleteBt').on('click', $.proxy(this._onDeleteBtClick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove listener to tab shown event
		$('a[data-toggle="tab"]').off('shown.bs.tab');

		// Destroy scrolling tabs
		$('#lgv-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove click listeners
		$('#lgv-loadBt').off('click');
		$('#lgv-exportBootLogBt').off('click');
		$('#lgv-switchBootLogColorBt').off('click');
		$('#lgv-bootLogBackupCard .backup-button').off('click');
		$('#lgv-runtimeLogBackupCard .backup-button').off('click');
		$('#lgv-clearFilterBt').off('click');
		$('#lgv-deleteBt').off('click');

		$('#lgv-messageIn').off('input');
	}

	onExtensionCommand(command, data)
	{
		// Error during initialization (unable to access log4j configuration file)
		if (command == this.RESP_INIT_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);

			// Set all tabs to show errors
			this._switchBootViewStack('lgv-bootLogErrorView');
			this._switchRuntimeViewStack('lgv-runtimeLogErrorView');
			this._switchDownloadViewStack('lgv-downloadErrorView');

			// Disable runtime log controls
			this._enableRuntimeLogControls(false);

			this._initFailed = true;
		}

		// Error responses
		else if (command == this.RESP_BOOT_LOG_ERROR || command == this.RESP_RUNTIME_LOG_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);

			if (command == this.RESP_BOOT_LOG_ERROR)
			{
				// Set tab to show error
				this._switchBootViewStack('lgv-bootLogErrorView');

				// Disable boot log backup generation
				this._bootLogBackupUnavailable = true;
				this._disableBackupInterface(false);

				this._bootLogRequested = true;
			}

			if (command == this.RESP_RUNTIME_LOG_ERROR)
			{
				// Disable controls
				this._enableRuntimeLogControls(false);

				// Remove loading bar (runtime log)
				this._switchRuntimeViewStack('lgv-runtimeLogErrorView');

				// Disable runtime log backup download
				this._runtimeLogBackupUnavailable = true;
				this._disableBackupInterface(false);
			}
		}

		// Modified conversion pattern in the log4j properties file: unable to parse the log
		else if (command == this.RESP_RUNTIME_LOG_INVALID)
		{
			// Disable controls
			this._enableRuntimeLogControls(false);

			// Fill in error message
			$('#lgv-convPattName').text(data.getUtfString('param'));
			$('#lgv-convPattVal').text(data.getUtfString('value'));

			// Remove loading bar (runtime log)
			this._switchRuntimeViewStack('lgv-invConvPattView');
		}

		// Runtime log received
		else if (command == this.RESP_RUNTIME_LOG)
		{
			let classes = [];
			classes.push(this.ANY_CLASS);

			let logEntries = data.getUtfStringArray(this.LOG_DATA_LABEL);
			let separator = data.getUtfString('sep');
			let columns = data.getInt('cols');
			let dsArr = [];

			this._totalRuntimeLogEntries = logEntries.length;

			// Parse log entries
			// We can't use the split method because there could be instances of the separator in the log message too
			for (let e = 0; e < logEntries.length; e++)
			{
				const logEntry = logEntries[e];

				let logEntryData = [];
				let startIndex = 0;

				for (let c = 0; c < columns - 1; c++)
				{
					let endIndex = logEntry.indexOf(separator, startIndex);
					logEntryData.push(logEntry.substring(startIndex, endIndex));
					startIndex = endIndex + separator.length;
				}

				if (startIndex < logEntry.length)
					logEntryData.push(logEntry.substring(startIndex));

				// Fill datagrid's dataprovider
				let rle = _data_runtime_log_entry__WEBPACK_IMPORTED_MODULE_1__["RuntimeLogEntry"].fromArray(separator, logEntryData);
				dsArr.push(rle);

				// Add class to filtering dropdown
				if (classes.indexOf(rle.clazz) < 0)
					classes.push(rle.clazz);
			}

			// Show classes list
			classes.sort(function (a, b) {
				return a.localeCompare(b);
			});

			this._classFilterDD.setDataSource(classes);
			this._classFilterDD.select(0);

			// Assign data source to grid
			let ds = new kendo.data.DataSource({
				data: dsArr
			})

			this._setRuntimeLogDataSource(ds);

			// Re-enable log loading controls
			this._enableRuntimeLogControls(true);

			// Remove loading bar
			this._switchRuntimeViewStack('lgv-runtimeLogView');
		}

		// Boot log received
		else if (command == this.RESP_BOOT_LOG)
		{
			const bootLogEntries = data.getSFSArray(this.LOG_DATA_LABEL);
			let text = '';

			for (let i = 0; i < bootLogEntries.size(); i++)
				text += bootLogEntries.getUtfString(i) + '\n';

			$('#lgv-bootLogText').text(text);

			// Remove loading bar
			this._switchBootViewStack('lgv-bootLogView');
		}

		// Logs backups status received
		else if (command == this.RESP_BACKUPS_STATUS)
		{
			// Show/hide operation in progress message
			this._disableBackupInterface(data.getBool('running'), data.getUtfString('type'));

			// Backup files list
			if (data.containsKey('files'))
			{
				let files = data.getSFSArray('files');

				let lastBootLogBackupFound = false;
				let lastRuntimeLogBackupFound = false;
				let lastFullBackupFound = false;

				let backupsList = [];

				const webServerProtocol = (data.containsKey('protocol') ? data.getUtfString('protocol') : 'http') + '://';
				const webServerPort = (data.containsKey('port') ? ':' + data.getInt('port') : '');

				let totalSize = 0;

				for (let f = 0; f < files.size(); f++)
				{
					const file = files.getSFSObject(f);

					const filePath = file.getUtfString('path');

					const fileObj = {};
					fileObj.path = filePath;
					fileObj.url = webServerProtocol + this.smartFox.config.host + webServerPort + '/' + filePath;
					fileObj.name = filePath.substr(filePath.lastIndexOf('/') + 1);
					fileObj.date = file.getUtfString('date');
					fileObj.time = file.getUtfString('time');
					fileObj.size = Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"])(file.getLong('size'), 2);

					totalSize += file.getLong('size');

					// Check if this is a boot log backup
					if (!lastBootLogBackupFound)
					{
						if (fileObj.name.startsWith(this.BOOT_LOG_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-bootLogBackupCard', fileObj);

							lastBootLogBackupFound = true;
						}
					}

					// Check if this is a runtime log backup
					if (!lastRuntimeLogBackupFound)
					{
						if (fileObj.name.startsWith(this.RUNTIME_LOG_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-runtimeLogBackupCard', fileObj);

							lastRuntimeLogBackupFound = true;
						}
					}

					// Check if this is a full backup
					if (!lastFullBackupFound)
					{
						if (fileObj.name.startsWith(this.FULL_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-fullLogBackupCard', fileObj);

							lastFullBackupFound = true;
						}
					}

					// Populate logs list
					backupsList.push(fileObj);
				}

				// Show total backups size
				$('#lgv-logSizeLb').html(`Total size: <strong>${Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"])(totalSize, 2, 'KB')}</strong>`);

		   		// Assign data source to grid
				this._setDownloadGridDataSource(backupsList);
				this._onDownloadGridSelectionChange();

				// Hide links to latest files if not available
				if (!lastBootLogBackupFound)
					this._fillBackupCard('#lgv-bootLogBackupCard', null);

				if (!lastRuntimeLogBackupFound)
					this._fillBackupCard('#lgv-runtimeLogBackupCard', null);

				if (!lastFullBackupFound)
					this._fillBackupCard('#lgv-fullLogBackupCard', null);

				if (data.containsKey('message'))
				{
					// Display notification
					this.shellCtrl.showNotification(`Log backup warning`, data.getUtfString('message'));
				}
			}

			// Set download view to main
			this._switchDownloadViewStack('lgv-downloadView');
		}

		// Logs backup deletion failed
		else if (command == this.RESP_DELETE_BACKUP_FAILED)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);
		}

		// A blocking error occurred during backup operation
		else if (command == this.RESP_BACKUP_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);
		}

		// An non-blocking error occurred during backup operation
		else if (command == this.RESP_BACKUP_WARNING)
		{
			let warn = data.getUtfString('warn');

			// Display notification
			this.shellCtrl.showNotification(`Log backup warning`, warn);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onTabShown(e)
	{
		if (!this._initFailed)
		{
			// If boot log view was displayed...
			if (e.target.id == 'lgv-bootLog-tab')
			{
				// Load boot log the first time the tab is selected
				if (!this._bootLogRequested)
				{
					this.sendExtensionRequest(this.REQ_GET_BOOT_LOG);
					this._bootLogRequested = true;
				}
			}

			// If backup&dowload view was displayed...
			else if (e.target.id == 'lgv-logsDownload-tab')
			{
				// Request logs backup status the first time the tab is selected
				if (!this._backupStatusRequested)
				{
					this.sendExtensionRequest(this.REQ_GET_BACKUPS_STATUS);
					this._backupStatusRequested = true;
				}
			}
		}
	}

	_onRuntimeLogLoadBtClick()
	{
		// Request log
		this._loadRuntimeLog();
	}

	_onExportBootLogBtClick()
	{
		// Export log to file
		this._exportLog($('#lgv-bootLogText').text(), this.BOOT_LOG_BACKUP_ID);
	}

	_onSwitchBootLogColorBtClick()
	{
		if ($('#lgv-bootLogText').hasClass('invert'))
			$('#lgv-bootLogText').removeClass('invert');
		else
			$('#lgv-bootLogText').addClass('invert');
	}

	_onBootLogGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.BOOT_LOG_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_BOOT_LOG);
	}

	_onRuntimeLogGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.RUNTIME_LOG_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_RUNTIME_LOG);
	}

	_onFullLogsGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.FULL_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_FULL_LOGS);
	}

	_onFilterChange()
	{
		// Set filters
		this._setRuntimeLogDataSource(this._runtimeLogGrid.dataSource);
	}

	_onClearFilterClick()
	{
		this._clearRuntimeLogFilters();
		this._setRuntimeLogDataSource(this._runtimeLogGrid.dataSource);
	}

	_onExportRuntimeLogBtClick()
	{
		let log = '';
		const entries = this._runtimeLogGrid.dataSource.view();

		for (let i = 0; i < entries.length; i++)
		{
			const item = entries[i];
			log += [item.date, item.time, item.level, item.thread, item.clazz, item.message].join(item.sep) + '\n';
		}

		// Export log to file
		this._exportLog(log, this.RUNTIME_LOG_BACKUP_ID);
	}

	_onDownloadGridSelectionChange()
	{
		// Enable/disable buttons
		const selectedRows = this._downloadGrid.select();
		$('#lgv-downloadBt').attr('disabled', selectedRows.length == 0);
		$('#lgv-deleteBt').attr('disabled', selectedRows.length == 0);

		if (selectedRows.length > 0)
		{
			let dataItem = this._downloadGrid.dataItem(selectedRows[0]);
			$('#lgv-downloadBt').attr('href', dataItem.url);
		}
		else
			$('#lgv-downloadBt').attr('href', '#');
	}

	_onDeleteBtClick()
	{
		let selectedRows = this._downloadGrid.select();

		if (selectedRows.length > 0)
		{
			let dataItem = this._downloadGrid.dataItem(selectedRows[0]);

			// Request backup deletion
			let params = new SFS2X.SFSObject();
			params.putUtfString('file', dataItem.name);

			this.sendExtensionRequest(this.REQ_DELETE_BACKUP, params);
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_switchRuntimeViewStack(viewId)
	{
		document.getElementById('lgv-runtime-viewstack').selectedElement = document.getElementById(viewId);
	}

	_switchBootViewStack(viewId)
	{
		document.getElementById('lgv-boot-viewstack').selectedElement = document.getElementById(viewId);
	}

	_switchDownloadViewStack(viewId)
	{
		document.getElementById('lgv-download-viewstack').selectedElement = document.getElementById(viewId);
	}

	_enableRuntimeLogControls(enable)
	{
		$('#lgv-loadBt').attr('disabled', !enable);
		$('#lgv-exportRuntimeLogBt').attr('disabled', !enable);
		$('#lgv-filterBt').attr('disabled', !enable);
	}

	_loadRuntimeLog()
	{
		// Disable controls to load log, so that impatient users can't send multiple requests
		// (it will be enabled again when a response is received)
		this._enableRuntimeLogControls(false);

		// Clear filters
		this._clearRuntimeLogFilters();

		// Show loading bar
		this._switchRuntimeViewStack('lgv-runtimeLogLoadingView');

		// Send request
		// (the number of lines to be retrieved is sent)
		let params = new SFS2X.SFSObject();
		params.putInt('numEntries', Number(this._logLinesDD.value()));

		this.sendExtensionRequest(this.REQ_GET_RUNTIME_LOG, params);
	}

	_clearRuntimeLogFilters()
	{
		this._levelFilterDD.select(0);
		this._classFilterDD.select(0);
		$('#lgv-messageIn').val('');
	}

	_exportLog(log, name)
	{
		let blob = new Blob([log], {type: "text/plain;charset=utf-8"});
		let date = moment__WEBPACK_IMPORTED_MODULE_3__().format('YYYYMMDD_HHmmss');

		file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, `${name}_${date}.log`);
	}

	_setRuntimeLogDataSource(ds)
	{
		// Read current horizontal scroll value
		const scrollLeft = $('#lgv-runtimeLogGrid .k-grid-content', this._runtimeLogGrid.wrapper).scrollLeft();

		// Assign data source to grid
		this._runtimeLogGrid.setDataSource(ds);

		// Set filters
		this._setFilters(ds);

		// Set horizontal scroll
		$('#lgv-runtimeLogGrid .k-grid-content', this._runtimeLogGrid.wrapper).scrollLeft(scrollLeft);

		// Update counter
		$('#lgv-runtimeLogEntriesLb').text(`Log entries: ${this._totalRuntimeLogEntries} (${ds.total()} displayed)`);
	}

	_setFilters(ds)
	{
		let filters = [];

		// Level filtering
		if (this._levelFilterDD.select() > 0)
			filters.push({
				field: 'level', operator: 'eq', value: this._levelFilterDD.value()
			});

		// Class filtering
		if (this._classFilterDD.select() > 0)
			filters.push({
				field: 'clazz', operator: 'eq', value: this._classFilterDD.value()
			});

		// Message filtering
		if ($('#lgv-messageIn').val() != '')
			filters.push({
				field: 'message', operator: 'contains', value: $('#lgv-messageIn').val()
			});

		// Set filters
		ds.filter(filters);
	}

	_disableBackupInterface(disable, backupId = null)
	{
		if (disable)
		{
			// Show proper progress bar
			if (backupId == this.BOOT_LOG_BACKUP_ID)
				$('#lgv-bootLogBackupCard .progress-bar').show();
			else if (backupId == this.RUNTIME_LOG_BACKUP_ID)
				$('#lgv-runtimeLogBackupCard .progress-bar').show();
			else if (backupId == this.FULL_BACKUP_ID)
				$('#lgv-fullLogBackupCard .progress-bar').show();

			// Disable buttons
			$('#lgv-bootLogBackupCard .backup-button').attr('disabled', true);
			$('#lgv-runtimeLogBackupCard .backup-button').attr('disabled', true);
			$('#lgv-fullLogBackupCard .backup-button').attr('disabled', true);
		}
		else
		{
			// Hide all progress bar
			$('.card-body .progress-bar').hide();

			// Enable buttons
			$('#lgv-fullLogBackupCard .backup-button').attr('disabled', false);

			if (!this._bootLogBackupUnavailable)
				$('#lgv-bootLogBackupCard .backup-button').attr('disabled', false);

			if (!this._runtimeLogBackupUnavailable)
				$('#lgv-runtimeLogBackupCard .backup-button').attr('disabled', false);
		}
	}

	_initBackupCard(idSelector)
	{
		$(idSelector + ' .backup-details').hide();
		$(idSelector + ' .progress-bar').hide();
	}

	_fillBackupCard(idSelector, detailsObj = null)
	{
		if (detailsObj == null)
			$(idSelector + ' .backup-details').hide();
		else
		{
			$(idSelector + ' .backup-details').show();

			$(idSelector + ' .backup-link').attr('href', detailsObj.url);
			$(idSelector + ' .backup-date').text(detailsObj.date);
			$(idSelector + ' .backup-time').text(detailsObj.time);
			$(idSelector + ' .backup-size').text(detailsObj.size);
		}
	}

	_setDownloadGridDataSource(ds)
	{
		// Read current horizontal scroll value
	   const scrollLeft = $('#lgv-downloadGrid .k-grid-content', this._downloadGrid.wrapper).scrollLeft();

	   // Assign data source to grid
	   this._downloadGrid.setDataSource(ds);

	   // Set horizontal scroll
	   $('#lgv-downloadGrid .k-grid-content', this._downloadGrid.wrapper).scrollLeft(scrollLeft);
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtOC5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvZGF0YS9ydW50aW1lLWxvZy1lbnRyeS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2xvZy12aWV3ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGEsYil7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxiKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzKWIoKTtlbHNle2IoKSxhLkZpbGVTYXZlcj17ZXhwb3J0czp7fX0uZXhwb3J0c319KSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihhLGIpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBiP2I9e2F1dG9Cb206ITF9Olwib2JqZWN0XCIhPXR5cGVvZiBiJiYoY29uc29sZS53YXJuKFwiRGVwcmVjYXRlZDogRXhwZWN0ZWQgdGhpcmQgYXJndW1lbnQgdG8gYmUgYSBvYmplY3RcIiksYj17YXV0b0JvbTohYn0pLGIuYXV0b0JvbSYmL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYS50eXBlKT9uZXcgQmxvYihbXCJcXHVGRUZGXCIsYV0se3R5cGU6YS50eXBlfSk6YX1mdW5jdGlvbiBjKGIsYyxkKXt2YXIgZT1uZXcgWE1MSHR0cFJlcXVlc3Q7ZS5vcGVuKFwiR0VUXCIsYiksZS5yZXNwb25zZVR5cGU9XCJibG9iXCIsZS5vbmxvYWQ9ZnVuY3Rpb24oKXthKGUucmVzcG9uc2UsYyxkKX0sZS5vbmVycm9yPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcImNvdWxkIG5vdCBkb3dubG9hZCBmaWxlXCIpfSxlLnNlbmQoKX1mdW5jdGlvbiBkKGEpe3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJIRUFEXCIsYSwhMSk7dHJ5e2Iuc2VuZCgpfWNhdGNoKGEpe31yZXR1cm4gMjAwPD1iLnN0YXR1cyYmMjk5Pj1iLnN0YXR1c31mdW5jdGlvbiBlKGEpe3RyeXthLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSl9Y2F0Y2goYyl7dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtiLmluaXRNb3VzZUV2ZW50KFwiY2xpY2tcIiwhMCwhMCx3aW5kb3csMCwwLDAsODAsMjAsITEsITEsITEsITEsMCxudWxsKSxhLmRpc3BhdGNoRXZlbnQoYil9fXZhciBmPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy53aW5kb3c9PT13aW5kb3c/d2luZG93Olwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmP3NlbGY6XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbD9nbG9iYWw6dm9pZCAwLGE9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGU/ZnVuY3Rpb24oYixnLGgpe3ZhciBpPWYuVVJMfHxmLndlYmtpdFVSTCxqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2c9Z3x8Yi5uYW1lfHxcImRvd25sb2FkXCIsai5kb3dubG9hZD1nLGoucmVsPVwibm9vcGVuZXJcIixcInN0cmluZ1wiPT10eXBlb2YgYj8oai5ocmVmPWIsai5vcmlnaW49PT1sb2NhdGlvbi5vcmlnaW4/ZShqKTpkKGouaHJlZik/YyhiLGcsaCk6ZShqLGoudGFyZ2V0PVwiX2JsYW5rXCIpKTooai5ocmVmPWkuY3JlYXRlT2JqZWN0VVJMKGIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpLnJldm9rZU9iamVjdFVSTChqLmhyZWYpfSw0RTQpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGopfSwwKSl9OlwibXNTYXZlT3JPcGVuQmxvYlwiaW4gbmF2aWdhdG9yP2Z1bmN0aW9uKGYsZyxoKXtpZihnPWd8fGYubmFtZXx8XCJkb3dubG9hZFwiLFwic3RyaW5nXCIhPXR5cGVvZiBmKW5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGIoZixoKSxnKTtlbHNlIGlmKGQoZikpYyhmLGcsaCk7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtpLmhyZWY9ZixpLnRhcmdldD1cIl9ibGFua1wiLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGkpfSl9fTpmdW5jdGlvbihhLGIsZCxlKXtpZihlPWV8fG9wZW4oXCJcIixcIl9ibGFua1wiKSxlJiYoZS5kb2N1bWVudC50aXRsZT1lLmRvY3VtZW50LmJvZHkuaW5uZXJUZXh0PVwiZG93bmxvYWRpbmcuLi5cIiksXCJzdHJpbmdcIj09dHlwZW9mIGEpcmV0dXJuIGMoYSxiLGQpO3ZhciBnPVwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI9PT1hLnR5cGUsaD0vY29uc3RydWN0b3IvaS50ZXN0KGYuSFRNTEVsZW1lbnQpfHxmLnNhZmFyaSxpPS9DcmlPU1xcL1tcXGRdKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtpZigoaXx8ZyYmaCkmJlwib2JqZWN0XCI9PXR5cGVvZiBGaWxlUmVhZGVyKXt2YXIgaj1uZXcgRmlsZVJlYWRlcjtqLm9ubG9hZGVuZD1mdW5jdGlvbigpe3ZhciBhPWoucmVzdWx0O2E9aT9hOmEucmVwbGFjZSgvXmRhdGE6W147XSo7LyxcImRhdGE6YXR0YWNobWVudC9maWxlO1wiKSxlP2UubG9jYXRpb24uaHJlZj1hOmxvY2F0aW9uPWEsZT1udWxsfSxqLnJlYWRBc0RhdGFVUkwoYSl9ZWxzZXt2YXIgaz1mLlVSTHx8Zi53ZWJraXRVUkwsbD1rLmNyZWF0ZU9iamVjdFVSTChhKTtlP2UubG9jYXRpb249bDpsb2NhdGlvbi5ocmVmPWwsZT1udWxsLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtrLnJldm9rZU9iamVjdFVSTChsKX0sNEU0KX19KTtmLnNhdmVBcz1hLnNhdmVBcz1hLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1hKX0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWxlU2F2ZXIubWluLmpzLm1hcCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImV4cG9ydCBjbGFzcyBSdW50aW1lTG9nRW50cnlcbntcblx0Y29uc3RydWN0b3Ioc2VwYXJhdG9yKVxuXHR7XG5cdFx0dGhpcy5zZXAgPSBzZXBhcmF0b3Jcblx0fVxuXG5cdHN0YXRpYyBmcm9tQXJyYXkoc2VwYXJhdG9yLCBsb2dFbnRyeURhdGEpXG5cdHtcblx0XHRsZXQgcmxlID0gbmV3IFJ1bnRpbWVMb2dFbnRyeShzZXBhcmF0b3IpO1xuXG5cdFx0cmxlLmRhdGUgPSBsb2dFbnRyeURhdGFbMF07XG5cdFx0cmxlLnRpbWUgPSBsb2dFbnRyeURhdGFbMV07XG5cdFx0cmxlLmRhdGVUaW1lID0gcmxlLl9nZXREYXRlVGltZSgpO1xuXHRcdHJsZS5sZXZlbCA9IGxvZ0VudHJ5RGF0YVsyXS50cmltKCk7XG5cdFx0cmxlLnRocmVhZCA9IGxvZ0VudHJ5RGF0YVszXTtcblx0XHRybGUuY2xhenogPSBsb2dFbnRyeURhdGFbNF07XG5cdFx0cmxlLm1lc3NhZ2UgPSBsb2dFbnRyeURhdGFbNl07XG5cblx0XHRyZXR1cm4gcmxlO1xuXHR9XG5cblx0X2dldERhdGVUaW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmRhdGUgKyAnXFxuJyArIHRoaXMudGltZTtcblx0fVxufVxuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcbmltcG9ydCB7UnVudGltZUxvZ0VudHJ5fSBmcm9tICcuLi9kYXRhL3J1bnRpbWUtbG9nLWVudHJ5JztcbmltcG9ydCAqIGFzIEZpbGVTYXZlciBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtieXRlc1RvU2l6ZX0gZnJvbSAnLi4vdXRpbHMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgQmFzZU1vZHVsZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCdsb2dWaWV3ZXInKTtcblxuXHRcdHRoaXMuQ09NTUFORFNfUFJFRklYID0gJ2xvZ1ZpZXdlcic7XG5cdFx0dGhpcy5IRUxQX1VSTCA9ICcvYWRtaW50b29sLUxvZ1ZpZXdlcic7XG5cblx0XHR0aGlzLkFOWV9MRVZFTCA9ICdbYW55XSc7XG5cdFx0dGhpcy5MRVZFTFMgPSBbJ1RSQUNFJywnREVCVUcnLCdJTkZPJywnV0FSTicsJ0VSUk9SJ107XG5cdFx0dGhpcy5BTllfQ0xBU1MgPSAnW2FueV0nO1xuXG5cdFx0dGhpcy5MT0dfREFUQV9MQUJFTCA9ICdsaW5lcyc7XG5cblx0XHR0aGlzLkJPT1RfTE9HX0JBQ0tVUF9JRCA9ICdTRlMyWF9Cb290TG9nJztcblx0XHR0aGlzLlJVTlRJTUVfTE9HX0JBQ0tVUF9JRCA9ICdTRlMyWF9SdW50aW1lTG9nJztcblx0XHR0aGlzLkZVTExfQkFDS1VQX0lEID0gJ1NGUzJYX0xvZ3MnO1xuXG5cdFx0Ly8gT3V0Z29pbmcgcmVxdWVzdHNcblx0XHR0aGlzLlJFUV9HRVRfUlVOVElNRV9MT0cgPSAnZ2V0UnVuTG9nJztcblx0XHR0aGlzLlJFUV9HRVRfQk9PVF9MT0cgPSAnZ2V0Qm9vdExvZyc7XG5cdFx0dGhpcy5SRVFfR0VUX0JBQ0tVUFNfU1RBVFVTID0gJ2dldEJha1N0YXR1cyc7XG5cdFx0dGhpcy5SRVFfQkFDS1VQX0JPT1RfTE9HID0gJ2Jha0Jvb3RMb2cnO1xuXHRcdHRoaXMuUkVRX0JBQ0tVUF9SVU5USU1FX0xPRyA9ICdiYWtSdW5Mb2cnO1xuXHRcdHRoaXMuUkVRX0JBQ0tVUF9GVUxMX0xPR1MgPSAnYmFrRnVsbExvZ3MnO1xuXHRcdHRoaXMuUkVRX0RFTEVURV9CQUNLVVAgPSAnZGVsQmFja3VwJztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTUF9JTklUX0VSUk9SID0gJ2luaXRFcnInO1xuXHRcdHRoaXMuUkVTUF9SVU5USU1FX0xPR19FUlJPUiA9ICdydW5Mb2dFcnInO1xuXHRcdHRoaXMuUkVTUF9SVU5USU1FX0xPR19JTlZBTElEID0gJ3J1bkxvZ0ludic7XG5cdFx0dGhpcy5SRVNQX1JVTlRJTUVfTE9HID0gJ3J1bkxvZyc7XG5cdFx0dGhpcy5SRVNQX0JPT1RfTE9HX0VSUk9SID0gJ2Jvb3RMb2dFcnInO1xuXHRcdHRoaXMuUkVTUF9CT09UX0xPRyA9ICdib290TG9nJztcblx0XHR0aGlzLlJFU1BfQkFDS1VQU19TVEFUVVMgPSAnYmFrU3RhdHVzJztcblx0XHR0aGlzLlJFU1BfREVMRVRFX0JBQ0tVUF9GQUlMRUQgPSAnZGVsQmFrRmFpbCc7XG5cdFx0dGhpcy5SRVNQX0JBQ0tVUF9FUlJPUiA9ICdiYWtFcnJvcic7XG5cdFx0dGhpcy5SRVNQX0JBQ0tVUF9XQVJOSU5HID0gJ2Jha1dhcm4nO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmluaXRpYWxpemUoaWREYXRhLCBzaGVsbENvbnRyb2xsZXIpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBzY3JvbGxpbmcgdGFic1xuXHRcdCQoJyNsZ3YtdGFiTmF2aWdhdG9yID4gI3RhYnMnKS5zY3JvbGxpbmdUYWJzKHtcblx0XHRcdGJvb3RzdHJhcFZlcnNpb246IDQsXG5cdFx0XHRzY3JvbGxUb1RhYkVkZ2U6IHRydWUsXG5cdFx0XHRlbmFibGVTd2lwaW5nOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZVNjcm9sbEFycm93c09uRnVsbHlTY3JvbGxlZDogdHJ1ZSxcblx0XHRcdGNzc0NsYXNzTGVmdEFycm93OiAnZmEgZmEtY2hldnJvbi1sZWZ0Jyxcblx0XHRcdGNzc0NsYXNzUmlnaHRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnXG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gdGFiIHNob3duIGV2ZW50XG5cdFx0JCgnYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScpLm9uKCdzaG93bi5icy50YWInLCAkLnByb3h5KHRoaXMuX29uVGFiU2hvd24sIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgbG9nIGxpbmVzIGRyb3Bkb3duXG5cdFx0dGhpcy5fbG9nTGluZXNERCA9ICQoJyNsZ3YtbG9nTGluZXNERCcpLmtlbmRvRHJvcERvd25MaXN0KHtcblx0XHRcdHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInRleHQtbXV0ZWQgcHItMVwiPkxvZyBlbnRyaWVzOjwvc3Bhbj48c3Bhbj4jOmRhdGEudGV4dCM8L3NwYW4+Jyxcblx0XHR9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBsb2FkIGJ1dHRvblxuXHRcdCQoJyNsZ3YtbG9hZEJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJ1bnRpbWVMb2dMb2FkQnRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBwcm9ncmVzcyBiYXJzXG5cdFx0JCgnLnByb2dyZXNzLWJhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIEluaXRpYWxpemUgbGV2ZWwgZmlsdGVyIGRyb3Bkb3duXG5cdFx0dGhpcy5fbGV2ZWxGaWx0ZXJERCA9ICQoJyNsZ3YtbGV2ZWxERCcpLmtlbmRvRHJvcERvd25MaXN0KHtcblx0XHRcdGRhdGFTb3VyY2U6IFt0aGlzLkFOWV9MRVZFTF0uY29uY2F0KHRoaXMuTEVWRUxTKSxcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vbkZpbHRlckNoYW5nZSwgdGhpcylcblx0XHR9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBjbGFzcyBmaWx0ZXIgZHJvcGRvd25cblx0XHR0aGlzLl9jbGFzc0ZpbHRlckREID0gJCgnI2xndi1jbGFzc0REJykua2VuZG9Ecm9wRG93bkxpc3Qoe1xuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRmlsdGVyQ2hhbmdlLCB0aGlzKVxuXHRcdH0pLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XG5cblx0XHQvLyBJbml0aWFsaXplIG1lc3NhZ2UgZmlsdGVyIGlucHV0XG5cdFx0JCgnI2xndi1tZXNzYWdlSW4nKS5vbignaW5wdXQnLCAkLnByb3h5KHRoaXMuX29uRmlsdGVyQ2hhbmdlLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGNsZWFyIGJ1dHRvblxuXHRcdCQoJyNsZ3YtY2xlYXJGaWx0ZXJCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25DbGVhckZpbHRlckNsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGV4cG9ydCBidXR0b25cblx0XHQkKCcjbGd2LWV4cG9ydFJ1bnRpbWVMb2dCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25FeHBvcnRSdW50aW1lTG9nQnRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBydW50aW1lIGxvZyBncmlkXG5cdFx0dGhpcy5fcnVudGltZUxvZ0dyaWQgPSAkKCcjbGd2LXJ1bnRpbWVMb2dHcmlkJykua2VuZG9HcmlkKHtcblx0XHRcdHNjcm9sbGFibGU6IHRydWUsXG4gICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG5cdFx0XHQvL3Jlc2l6YWJsZTogdHJ1ZSxcblx0XHRcdHNlbGVjdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29sdW1uczpcbiAgICAgICAgICAgIFtcblx0XHRcdFx0e1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdkYXRlVGltZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuXHRcdFx0XHRcdHRpdGxlOiAnRGF0ZS9UaW1lJyxcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdsZXZlbCcsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuXHQgICAgICAgICAgICAgICAgdGl0bGU6ICdMZXZlbCcsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAndGhyZWFkJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1RocmVhZCcsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnY2xhenonLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDI1MCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2xhc3MnLFxuXHQgICAgICAgICAgICB9LFxuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ21lc3NhZ2UnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDEwMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdNZXNzYWdlJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdF0sXG5cdFx0XHRub1JlY29yZHM6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdObyBsb2cgZW50cmllcyB0byBkaXNwbGF5Lidcblx0XHRcdH0sXG5cdFx0XHRkYXRhU291cmNlOiBbXVxuICAgICAgICB9KS5kYXRhKCdrZW5kb0dyaWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgYm9vdCBsb2cgdmlldyBidXR0b25zXG5cdFx0JCgnI2xndi1leHBvcnRCb290TG9nQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRXhwb3J0Qm9vdExvZ0J0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjbGd2LXN3aXRjaEJvb3RMb2dDb2xvckJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblN3aXRjaEJvb3RMb2dDb2xvckJ0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZ2VuZXJhdGUgYmFja3VwIGJ1dHRvbnNcblx0XHQkKCcjbGd2LWJvb3RMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkJvb3RMb2dHZW5lcmF0ZUJ0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJ1bnRpbWVMb2dHZW5lcmF0ZUJ0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkZ1bGxMb2dzR2VuZXJhdGVCdENsaWNrLCB0aGlzKSk7XG5cblx0XHR0aGlzLl9pbml0QmFja3VwQ2FyZCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCcpO1xuXHRcdHRoaXMuX2luaXRCYWNrdXBDYXJkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkJyk7XG5cdFx0dGhpcy5faW5pdEJhY2t1cENhcmQoJyNsZ3YtZnVsbExvZ0JhY2t1cENhcmQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZG93bmxvYWQgZ3JpZFxuXHRcdHRoaXMuX2Rvd25sb2FkR3JpZCA9ICQoJyNsZ3YtZG93bmxvYWRHcmlkJykua2VuZG9HcmlkKHtcblx0XHRcdHNjcm9sbGFibGU6IHRydWUsXG4gICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcblx0XHRcdC8vcmVzaXphYmxlOiB0cnVlLFxuXHRcdFx0c2VsZWN0YWJsZTogJ3JvdycsXG4gICAgICAgICAgICBjb2x1bW5zOlxuICAgICAgICAgICAgW1xuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ2RhdGUnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcblx0XHRcdFx0XHR0aXRsZTogJ0RhdGUnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3RpbWUnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnVGltZScsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnbmFtZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuXHQgICAgICAgICAgICAgICAgdGl0bGU6ICdGaWxlbmFtZScsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnc2l6ZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuXHQgICAgICAgICAgICAgICAgdGl0bGU6ICdTaXplJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdF0sXG5cdFx0XHRub1JlY29yZHM6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdObyBiYWNrdXBzIGF2YWlsYWJsZS4nXG5cdFx0XHR9LFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRG93bmxvYWRHcmlkU2VsZWN0aW9uQ2hhbmdlLCB0aGlzKSxcblx0XHRcdGRhdGFTb3VyY2U6IFtdXG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvR3JpZCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBkZWxldGUgYnV0dG9uXG5cdFx0JCgnI2xndi1kZWxldGVCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25EZWxldGVCdENsaWNrLCB0aGlzKSk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyIHRvIHRhYiBzaG93biBldmVudFxuXHRcdCQoJ2FbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKS5vZmYoJ3Nob3duLmJzLnRhYicpO1xuXG5cdFx0Ly8gRGVzdHJveSBzY3JvbGxpbmcgdGFic1xuXHRcdCQoJyNsZ3YtdGFiTmF2aWdhdG9yICN0YWJzJykuc2Nyb2xsaW5nVGFicygnZGVzdHJveScpO1xuXG5cdFx0Ly8gUmVtb3ZlIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyNsZ3YtbG9hZEJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNsZ3YtZXhwb3J0Qm9vdExvZ0J0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNsZ3Ytc3dpdGNoQm9vdExvZ0NvbG9yQnQnKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNsZ3YtY2xlYXJGaWx0ZXJCdCcpLm9mZignY2xpY2snKTtcblx0XHQkKCcjbGd2LWRlbGV0ZUJ0Jykub2ZmKCdjbGljaycpO1xuXG5cdFx0JCgnI2xndi1tZXNzYWdlSW4nKS5vZmYoJ2lucHV0Jyk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdC8vIEVycm9yIGR1cmluZyBpbml0aWFsaXphdGlvbiAodW5hYmxlIHRvIGFjY2VzcyBsb2c0aiBjb25maWd1cmF0aW9uIGZpbGUpXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0lOSVRfRVJST1IpXG5cdFx0e1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKTtcblxuXHRcdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGVycm9yLCB0cnVlKTtcblxuXHRcdFx0Ly8gU2V0IGFsbCB0YWJzIHRvIHNob3cgZXJyb3JzXG5cdFx0XHR0aGlzLl9zd2l0Y2hCb290Vmlld1N0YWNrKCdsZ3YtYm9vdExvZ0Vycm9yVmlldycpO1xuXHRcdFx0dGhpcy5fc3dpdGNoUnVudGltZVZpZXdTdGFjaygnbGd2LXJ1bnRpbWVMb2dFcnJvclZpZXcnKTtcblx0XHRcdHRoaXMuX3N3aXRjaERvd25sb2FkVmlld1N0YWNrKCdsZ3YtZG93bmxvYWRFcnJvclZpZXcnKTtcblxuXHRcdFx0Ly8gRGlzYWJsZSBydW50aW1lIGxvZyBjb250cm9sc1xuXHRcdFx0dGhpcy5fZW5hYmxlUnVudGltZUxvZ0NvbnRyb2xzKGZhbHNlKTtcblxuXHRcdFx0dGhpcy5faW5pdEZhaWxlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRXJyb3IgcmVzcG9uc2VzXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQk9PVF9MT0dfRVJST1IgfHwgY29tbWFuZCA9PSB0aGlzLlJFU1BfUlVOVElNRV9MT0dfRVJST1IpXG5cdFx0e1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKTtcblxuXHRcdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGVycm9yLCB0cnVlKTtcblxuXHRcdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0JPT1RfTE9HX0VSUk9SKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBTZXQgdGFiIHRvIHNob3cgZXJyb3Jcblx0XHRcdFx0dGhpcy5fc3dpdGNoQm9vdFZpZXdTdGFjaygnbGd2LWJvb3RMb2dFcnJvclZpZXcnKTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIGJvb3QgbG9nIGJhY2t1cCBnZW5lcmF0aW9uXG5cdFx0XHRcdHRoaXMuX2Jvb3RMb2dCYWNrdXBVbmF2YWlsYWJsZSA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0XHRcdHRoaXMuX2Jvb3RMb2dSZXF1ZXN0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUlVOVElNRV9MT0dfRVJST1IpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc2FibGUgY29udHJvbHNcblx0XHRcdFx0dGhpcy5fZW5hYmxlUnVudGltZUxvZ0NvbnRyb2xzKGZhbHNlKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgbG9hZGluZyBiYXIgKHJ1bnRpbWUgbG9nKVxuXHRcdFx0XHR0aGlzLl9zd2l0Y2hSdW50aW1lVmlld1N0YWNrKCdsZ3YtcnVudGltZUxvZ0Vycm9yVmlldycpO1xuXG5cdFx0XHRcdC8vIERpc2FibGUgcnVudGltZSBsb2cgYmFja3VwIGRvd25sb2FkXG5cdFx0XHRcdHRoaXMuX3J1bnRpbWVMb2dCYWNrdXBVbmF2YWlsYWJsZSA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE1vZGlmaWVkIGNvbnZlcnNpb24gcGF0dGVybiBpbiB0aGUgbG9nNGogcHJvcGVydGllcyBmaWxlOiB1bmFibGUgdG8gcGFyc2UgdGhlIGxvZ1xuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JVTlRJTUVfTE9HX0lOVkFMSUQpXG5cdFx0e1xuXHRcdFx0Ly8gRGlzYWJsZSBjb250cm9sc1xuXHRcdFx0dGhpcy5fZW5hYmxlUnVudGltZUxvZ0NvbnRyb2xzKGZhbHNlKTtcblxuXHRcdFx0Ly8gRmlsbCBpbiBlcnJvciBtZXNzYWdlXG5cdFx0XHQkKCcjbGd2LWNvbnZQYXR0TmFtZScpLnRleHQoZGF0YS5nZXRVdGZTdHJpbmcoJ3BhcmFtJykpO1xuXHRcdFx0JCgnI2xndi1jb252UGF0dFZhbCcpLnRleHQoZGF0YS5nZXRVdGZTdHJpbmcoJ3ZhbHVlJykpO1xuXG5cdFx0XHQvLyBSZW1vdmUgbG9hZGluZyBiYXIgKHJ1bnRpbWUgbG9nKVxuXHRcdFx0dGhpcy5fc3dpdGNoUnVudGltZVZpZXdTdGFjaygnbGd2LWludkNvbnZQYXR0VmlldycpO1xuXHRcdH1cblxuXHRcdC8vIFJ1bnRpbWUgbG9nIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUlVOVElNRV9MT0cpXG5cdFx0e1xuXHRcdFx0bGV0IGNsYXNzZXMgPSBbXTtcblx0XHRcdGNsYXNzZXMucHVzaCh0aGlzLkFOWV9DTEFTUyk7XG5cblx0XHRcdGxldCBsb2dFbnRyaWVzID0gZGF0YS5nZXRVdGZTdHJpbmdBcnJheSh0aGlzLkxPR19EQVRBX0xBQkVMKTtcblx0XHRcdGxldCBzZXBhcmF0b3IgPSBkYXRhLmdldFV0ZlN0cmluZygnc2VwJyk7XG5cdFx0XHRsZXQgY29sdW1ucyA9IGRhdGEuZ2V0SW50KCdjb2xzJyk7XG5cdFx0XHRsZXQgZHNBcnIgPSBbXTtcblxuXHRcdFx0dGhpcy5fdG90YWxSdW50aW1lTG9nRW50cmllcyA9IGxvZ0VudHJpZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBQYXJzZSBsb2cgZW50cmllc1xuXHRcdFx0Ly8gV2UgY2FuJ3QgdXNlIHRoZSBzcGxpdCBtZXRob2QgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBpbnN0YW5jZXMgb2YgdGhlIHNlcGFyYXRvciBpbiB0aGUgbG9nIG1lc3NhZ2UgdG9vXG5cdFx0XHRmb3IgKGxldCBlID0gMDsgZSA8IGxvZ0VudHJpZXMubGVuZ3RoOyBlKyspXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGxvZ0VudHJ5ID0gbG9nRW50cmllc1tlXTtcblxuXHRcdFx0XHRsZXQgbG9nRW50cnlEYXRhID0gW107XG5cdFx0XHRcdGxldCBzdGFydEluZGV4ID0gMDtcblxuXHRcdFx0XHRmb3IgKGxldCBjID0gMDsgYyA8IGNvbHVtbnMgLSAxOyBjKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgZW5kSW5kZXggPSBsb2dFbnRyeS5pbmRleE9mKHNlcGFyYXRvciwgc3RhcnRJbmRleCk7XG5cdFx0XHRcdFx0bG9nRW50cnlEYXRhLnB1c2gobG9nRW50cnkuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIGVuZEluZGV4KSk7XG5cdFx0XHRcdFx0c3RhcnRJbmRleCA9IGVuZEluZGV4ICsgc2VwYXJhdG9yLmxlbmd0aDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzdGFydEluZGV4IDwgbG9nRW50cnkubGVuZ3RoKVxuXHRcdFx0XHRcdGxvZ0VudHJ5RGF0YS5wdXNoKGxvZ0VudHJ5LnN1YnN0cmluZyhzdGFydEluZGV4KSk7XG5cblx0XHRcdFx0Ly8gRmlsbCBkYXRhZ3JpZCdzIGRhdGFwcm92aWRlclxuXHRcdFx0XHRsZXQgcmxlID0gUnVudGltZUxvZ0VudHJ5LmZyb21BcnJheShzZXBhcmF0b3IsIGxvZ0VudHJ5RGF0YSk7XG5cdFx0XHRcdGRzQXJyLnB1c2gocmxlKTtcblxuXHRcdFx0XHQvLyBBZGQgY2xhc3MgdG8gZmlsdGVyaW5nIGRyb3Bkb3duXG5cdFx0XHRcdGlmIChjbGFzc2VzLmluZGV4T2YocmxlLmNsYXp6KSA8IDApXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKHJsZS5jbGF6eik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNob3cgY2xhc3NlcyBsaXN0XG5cdFx0XHRjbGFzc2VzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0cmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl9jbGFzc0ZpbHRlckRELnNldERhdGFTb3VyY2UoY2xhc3Nlcyk7XG5cdFx0XHR0aGlzLl9jbGFzc0ZpbHRlckRELnNlbGVjdCgwKTtcblxuXHRcdFx0Ly8gQXNzaWduIGRhdGEgc291cmNlIHRvIGdyaWRcblx0XHRcdGxldCBkcyA9IG5ldyBrZW5kby5kYXRhLkRhdGFTb3VyY2Uoe1xuXHRcdFx0XHRkYXRhOiBkc0FyclxuXHRcdFx0fSlcblxuXHRcdFx0dGhpcy5fc2V0UnVudGltZUxvZ0RhdGFTb3VyY2UoZHMpO1xuXG5cdFx0XHQvLyBSZS1lbmFibGUgbG9nIGxvYWRpbmcgY29udHJvbHNcblx0XHRcdHRoaXMuX2VuYWJsZVJ1bnRpbWVMb2dDb250cm9scyh0cnVlKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGxvYWRpbmcgYmFyXG5cdFx0XHR0aGlzLl9zd2l0Y2hSdW50aW1lVmlld1N0YWNrKCdsZ3YtcnVudGltZUxvZ1ZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBCb290IGxvZyByZWNlaXZlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0JPT1RfTE9HKVxuXHRcdHtcblx0XHRcdGNvbnN0IGJvb3RMb2dFbnRyaWVzID0gZGF0YS5nZXRTRlNBcnJheSh0aGlzLkxPR19EQVRBX0xBQkVMKTtcblx0XHRcdGxldCB0ZXh0ID0gJyc7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYm9vdExvZ0VudHJpZXMuc2l6ZSgpOyBpKyspXG5cdFx0XHRcdHRleHQgKz0gYm9vdExvZ0VudHJpZXMuZ2V0VXRmU3RyaW5nKGkpICsgJ1xcbic7XG5cblx0XHRcdCQoJyNsZ3YtYm9vdExvZ1RleHQnKS50ZXh0KHRleHQpO1xuXG5cdFx0XHQvLyBSZW1vdmUgbG9hZGluZyBiYXJcblx0XHRcdHRoaXMuX3N3aXRjaEJvb3RWaWV3U3RhY2soJ2xndi1ib290TG9nVmlldycpO1xuXHRcdH1cblxuXHRcdC8vIExvZ3MgYmFja3VwcyBzdGF0dXMgcmVjZWl2ZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9CQUNLVVBTX1NUQVRVUylcblx0XHR7XG5cdFx0XHQvLyBTaG93L2hpZGUgb3BlcmF0aW9uIGluIHByb2dyZXNzIG1lc3NhZ2Vcblx0XHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UoZGF0YS5nZXRCb29sKCdydW5uaW5nJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCd0eXBlJykpO1xuXG5cdFx0XHQvLyBCYWNrdXAgZmlsZXMgbGlzdFxuXHRcdFx0aWYgKGRhdGEuY29udGFpbnNLZXkoJ2ZpbGVzJykpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBmaWxlcyA9IGRhdGEuZ2V0U0ZTQXJyYXkoJ2ZpbGVzJyk7XG5cblx0XHRcdFx0bGV0IGxhc3RCb290TG9nQmFja3VwRm91bmQgPSBmYWxzZTtcblx0XHRcdFx0bGV0IGxhc3RSdW50aW1lTG9nQmFja3VwRm91bmQgPSBmYWxzZTtcblx0XHRcdFx0bGV0IGxhc3RGdWxsQmFja3VwRm91bmQgPSBmYWxzZTtcblxuXHRcdFx0XHRsZXQgYmFja3Vwc0xpc3QgPSBbXTtcblxuXHRcdFx0XHRjb25zdCB3ZWJTZXJ2ZXJQcm90b2NvbCA9IChkYXRhLmNvbnRhaW5zS2V5KCdwcm90b2NvbCcpID8gZGF0YS5nZXRVdGZTdHJpbmcoJ3Byb3RvY29sJykgOiAnaHR0cCcpICsgJzovLyc7XG5cdFx0XHRcdGNvbnN0IHdlYlNlcnZlclBvcnQgPSAoZGF0YS5jb250YWluc0tleSgncG9ydCcpID8gJzonICsgZGF0YS5nZXRJbnQoJ3BvcnQnKSA6ICcnKTtcblxuXHRcdFx0XHRsZXQgdG90YWxTaXplID0gMDtcblxuXHRcdFx0XHRmb3IgKGxldCBmID0gMDsgZiA8IGZpbGVzLnNpemUoKTsgZisrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVzLmdldFNGU09iamVjdChmKTtcblxuXHRcdFx0XHRcdGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRVdGZTdHJpbmcoJ3BhdGgnKTtcblxuXHRcdFx0XHRcdGNvbnN0IGZpbGVPYmogPSB7fTtcblx0XHRcdFx0XHRmaWxlT2JqLnBhdGggPSBmaWxlUGF0aDtcblx0XHRcdFx0XHRmaWxlT2JqLnVybCA9IHdlYlNlcnZlclByb3RvY29sICsgdGhpcy5zbWFydEZveC5jb25maWcuaG9zdCArIHdlYlNlcnZlclBvcnQgKyAnLycgKyBmaWxlUGF0aDtcblx0XHRcdFx0XHRmaWxlT2JqLm5hbWUgPSBmaWxlUGF0aC5zdWJzdHIoZmlsZVBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuXHRcdFx0XHRcdGZpbGVPYmouZGF0ZSA9IGZpbGUuZ2V0VXRmU3RyaW5nKCdkYXRlJyk7XG5cdFx0XHRcdFx0ZmlsZU9iai50aW1lID0gZmlsZS5nZXRVdGZTdHJpbmcoJ3RpbWUnKTtcblx0XHRcdFx0XHRmaWxlT2JqLnNpemUgPSBieXRlc1RvU2l6ZShmaWxlLmdldExvbmcoJ3NpemUnKSwgMik7XG5cblx0XHRcdFx0XHR0b3RhbFNpemUgKz0gZmlsZS5nZXRMb25nKCdzaXplJyk7XG5cblx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGlzIGlzIGEgYm9vdCBsb2cgYmFja3VwXG5cdFx0XHRcdFx0aWYgKCFsYXN0Qm9vdExvZ0JhY2t1cEZvdW5kKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChmaWxlT2JqLm5hbWUuc3RhcnRzV2l0aCh0aGlzLkJPT1RfTE9HX0JBQ0tVUF9JRCkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2ZpbGxCYWNrdXBDYXJkKCcjbGd2LWJvb3RMb2dCYWNrdXBDYXJkJywgZmlsZU9iaik7XG5cblx0XHRcdFx0XHRcdFx0bGFzdEJvb3RMb2dCYWNrdXBGb3VuZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhpcyBpcyBhIHJ1bnRpbWUgbG9nIGJhY2t1cFxuXHRcdFx0XHRcdGlmICghbGFzdFJ1bnRpbWVMb2dCYWNrdXBGb3VuZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZU9iai5uYW1lLnN0YXJ0c1dpdGgodGhpcy5SVU5USU1FX0xPR19CQUNLVVBfSUQpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9maWxsQmFja3VwQ2FyZCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCcsIGZpbGVPYmopO1xuXG5cdFx0XHRcdFx0XHRcdGxhc3RSdW50aW1lTG9nQmFja3VwRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoaXMgaXMgYSBmdWxsIGJhY2t1cFxuXHRcdFx0XHRcdGlmICghbGFzdEZ1bGxCYWNrdXBGb3VuZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZU9iai5uYW1lLnN0YXJ0c1dpdGgodGhpcy5GVUxMX0JBQ0tVUF9JRCkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2ZpbGxCYWNrdXBDYXJkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkJywgZmlsZU9iaik7XG5cblx0XHRcdFx0XHRcdFx0bGFzdEZ1bGxCYWNrdXBGb3VuZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUG9wdWxhdGUgbG9ncyBsaXN0XG5cdFx0XHRcdFx0YmFja3Vwc0xpc3QucHVzaChmaWxlT2JqKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNob3cgdG90YWwgYmFja3VwcyBzaXplXG5cdFx0XHRcdCQoJyNsZ3YtbG9nU2l6ZUxiJykuaHRtbChgVG90YWwgc2l6ZTogPHN0cm9uZz4ke2J5dGVzVG9TaXplKHRvdGFsU2l6ZSwgMiwgJ0tCJyl9PC9zdHJvbmc+YCk7XG5cblx0XHQgICBcdFx0Ly8gQXNzaWduIGRhdGEgc291cmNlIHRvIGdyaWRcblx0XHRcdFx0dGhpcy5fc2V0RG93bmxvYWRHcmlkRGF0YVNvdXJjZShiYWNrdXBzTGlzdCk7XG5cdFx0XHRcdHRoaXMuX29uRG93bmxvYWRHcmlkU2VsZWN0aW9uQ2hhbmdlKCk7XG5cblx0XHRcdFx0Ly8gSGlkZSBsaW5rcyB0byBsYXRlc3QgZmlsZXMgaWYgbm90IGF2YWlsYWJsZVxuXHRcdFx0XHRpZiAoIWxhc3RCb290TG9nQmFja3VwRm91bmQpXG5cdFx0XHRcdFx0dGhpcy5fZmlsbEJhY2t1cENhcmQoJyNsZ3YtYm9vdExvZ0JhY2t1cENhcmQnLCBudWxsKTtcblxuXHRcdFx0XHRpZiAoIWxhc3RSdW50aW1lTG9nQmFja3VwRm91bmQpXG5cdFx0XHRcdFx0dGhpcy5fZmlsbEJhY2t1cENhcmQoJyNsZ3YtcnVudGltZUxvZ0JhY2t1cENhcmQnLCBudWxsKTtcblxuXHRcdFx0XHRpZiAoIWxhc3RGdWxsQmFja3VwRm91bmQpXG5cdFx0XHRcdFx0dGhpcy5fZmlsbEJhY2t1cENhcmQoJyNsZ3YtZnVsbExvZ0JhY2t1cENhcmQnLCBudWxsKTtcblxuXHRcdFx0XHRpZiAoZGF0YS5jb250YWluc0tleSgnbWVzc2FnZScpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKGBMb2cgYmFja3VwIHdhcm5pbmdgLCBkYXRhLmdldFV0ZlN0cmluZygnbWVzc2FnZScpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZG93bmxvYWQgdmlldyB0byBtYWluXG5cdFx0XHR0aGlzLl9zd2l0Y2hEb3dubG9hZFZpZXdTdGFjaygnbGd2LWRvd25sb2FkVmlldycpO1xuXHRcdH1cblxuXHRcdC8vIExvZ3MgYmFja3VwIGRlbGV0aW9uIGZhaWxlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0RFTEVURV9CQUNLVVBfRkFJTEVEKVxuXHRcdHtcblx0XHRcdGNvbnN0IGVycm9yID0gZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyk7XG5cblx0XHRcdC8vIFNob3cgYW4gYWxlcnRcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChlcnJvciwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gQSBibG9ja2luZyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgYmFja3VwIG9wZXJhdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0JBQ0tVUF9FUlJPUilcblx0XHR7XG5cdFx0XHRjb25zdCBlcnJvciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpO1xuXG5cdFx0XHQvLyBTaG93IGFuIGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZXJyb3IsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEFuIG5vbi1ibG9ja2luZyBlcnJvciBvY2N1cnJlZCBkdXJpbmcgYmFja3VwIG9wZXJhdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0JBQ0tVUF9XQVJOSU5HKVxuXHRcdHtcblx0XHRcdGxldCB3YXJuID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3dhcm4nKTtcblxuXHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYExvZyBiYWNrdXAgd2FybmluZ2AsIHdhcm4pO1xuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vblRhYlNob3duKGUpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2luaXRGYWlsZWQpXG5cdFx0e1xuXHRcdFx0Ly8gSWYgYm9vdCBsb2cgdmlldyB3YXMgZGlzcGxheWVkLi4uXG5cdFx0XHRpZiAoZS50YXJnZXQuaWQgPT0gJ2xndi1ib290TG9nLXRhYicpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIExvYWQgYm9vdCBsb2cgdGhlIGZpcnN0IHRpbWUgdGhlIHRhYiBpcyBzZWxlY3RlZFxuXHRcdFx0XHRpZiAoIXRoaXMuX2Jvb3RMb2dSZXF1ZXN0ZWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9CT09UX0xPRyk7XG5cdFx0XHRcdFx0dGhpcy5fYm9vdExvZ1JlcXVlc3RlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYmFja3VwJmRvd2xvYWQgdmlldyB3YXMgZGlzcGxheWVkLi4uXG5cdFx0XHRlbHNlIGlmIChlLnRhcmdldC5pZCA9PSAnbGd2LWxvZ3NEb3dubG9hZC10YWInKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBSZXF1ZXN0IGxvZ3MgYmFja3VwIHN0YXR1cyB0aGUgZmlyc3QgdGltZSB0aGUgdGFiIGlzIHNlbGVjdGVkXG5cdFx0XHRcdGlmICghdGhpcy5fYmFja3VwU3RhdHVzUmVxdWVzdGVkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfQkFDS1VQU19TVEFUVVMpO1xuXHRcdFx0XHRcdHRoaXMuX2JhY2t1cFN0YXR1c1JlcXVlc3RlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfb25SdW50aW1lTG9nTG9hZEJ0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gUmVxdWVzdCBsb2dcblx0XHR0aGlzLl9sb2FkUnVudGltZUxvZygpO1xuXHR9XG5cblx0X29uRXhwb3J0Qm9vdExvZ0J0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gRXhwb3J0IGxvZyB0byBmaWxlXG5cdFx0dGhpcy5fZXhwb3J0TG9nKCQoJyNsZ3YtYm9vdExvZ1RleHQnKS50ZXh0KCksIHRoaXMuQk9PVF9MT0dfQkFDS1VQX0lEKTtcblx0fVxuXG5cdF9vblN3aXRjaEJvb3RMb2dDb2xvckJ0Q2xpY2soKVxuXHR7XG5cdFx0aWYgKCQoJyNsZ3YtYm9vdExvZ1RleHQnKS5oYXNDbGFzcygnaW52ZXJ0JykpXG5cdFx0XHQkKCcjbGd2LWJvb3RMb2dUZXh0JykucmVtb3ZlQ2xhc3MoJ2ludmVydCcpO1xuXHRcdGVsc2Vcblx0XHRcdCQoJyNsZ3YtYm9vdExvZ1RleHQnKS5hZGRDbGFzcygnaW52ZXJ0Jyk7XG5cdH1cblxuXHRfb25Cb290TG9nR2VuZXJhdGVCdENsaWNrKClcblx0e1xuXHRcdC8vIFNob3cvaGlkZSBvcGVyYXRpb24gaW4gcHJvZ3Jlc3MgbWVzc2FnZVxuXHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UodHJ1ZSwgdGhpcy5CT09UX0xPR19CQUNLVVBfSUQpO1xuXG5cdFx0Ly8gUmVxdWVzdCBiYWNrdXAgZ2VuZXJhdGlvblxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQkFDS1VQX0JPT1RfTE9HKTtcblx0fVxuXG5cdF9vblJ1bnRpbWVMb2dHZW5lcmF0ZUJ0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gU2hvdy9oaWRlIG9wZXJhdGlvbiBpbiBwcm9ncmVzcyBtZXNzYWdlXG5cdFx0dGhpcy5fZGlzYWJsZUJhY2t1cEludGVyZmFjZSh0cnVlLCB0aGlzLlJVTlRJTUVfTE9HX0JBQ0tVUF9JRCk7XG5cblx0XHQvLyBSZXF1ZXN0IGJhY2t1cCBnZW5lcmF0aW9uXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9CQUNLVVBfUlVOVElNRV9MT0cpO1xuXHR9XG5cblx0X29uRnVsbExvZ3NHZW5lcmF0ZUJ0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gU2hvdy9oaWRlIG9wZXJhdGlvbiBpbiBwcm9ncmVzcyBtZXNzYWdlXG5cdFx0dGhpcy5fZGlzYWJsZUJhY2t1cEludGVyZmFjZSh0cnVlLCB0aGlzLkZVTExfQkFDS1VQX0lEKTtcblxuXHRcdC8vIFJlcXVlc3QgYmFja3VwIGdlbmVyYXRpb25cblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0JBQ0tVUF9GVUxMX0xPR1MpO1xuXHR9XG5cblx0X29uRmlsdGVyQ2hhbmdlKClcblx0e1xuXHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0dGhpcy5fc2V0UnVudGltZUxvZ0RhdGFTb3VyY2UodGhpcy5fcnVudGltZUxvZ0dyaWQuZGF0YVNvdXJjZSk7XG5cdH1cblxuXHRfb25DbGVhckZpbHRlckNsaWNrKClcblx0e1xuXHRcdHRoaXMuX2NsZWFyUnVudGltZUxvZ0ZpbHRlcnMoKTtcblx0XHR0aGlzLl9zZXRSdW50aW1lTG9nRGF0YVNvdXJjZSh0aGlzLl9ydW50aW1lTG9nR3JpZC5kYXRhU291cmNlKTtcblx0fVxuXG5cdF9vbkV4cG9ydFJ1bnRpbWVMb2dCdENsaWNrKClcblx0e1xuXHRcdGxldCBsb2cgPSAnJztcblx0XHRjb25zdCBlbnRyaWVzID0gdGhpcy5fcnVudGltZUxvZ0dyaWQuZGF0YVNvdXJjZS52aWV3KCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0Y29uc3QgaXRlbSA9IGVudHJpZXNbaV07XG5cdFx0XHRsb2cgKz0gW2l0ZW0uZGF0ZSwgaXRlbS50aW1lLCBpdGVtLmxldmVsLCBpdGVtLnRocmVhZCwgaXRlbS5jbGF6eiwgaXRlbS5tZXNzYWdlXS5qb2luKGl0ZW0uc2VwKSArICdcXG4nO1xuXHRcdH1cblxuXHRcdC8vIEV4cG9ydCBsb2cgdG8gZmlsZVxuXHRcdHRoaXMuX2V4cG9ydExvZyhsb2csIHRoaXMuUlVOVElNRV9MT0dfQkFDS1VQX0lEKTtcblx0fVxuXG5cdF9vbkRvd25sb2FkR3JpZFNlbGVjdGlvbkNoYW5nZSgpXG5cdHtcblx0XHQvLyBFbmFibGUvZGlzYWJsZSBidXR0b25zXG5cdFx0Y29uc3Qgc2VsZWN0ZWRSb3dzID0gdGhpcy5fZG93bmxvYWRHcmlkLnNlbGVjdCgpO1xuXHRcdCQoJyNsZ3YtZG93bmxvYWRCdCcpLmF0dHIoJ2Rpc2FibGVkJywgc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PSAwKTtcblx0XHQkKCcjbGd2LWRlbGV0ZUJ0JykuYXR0cignZGlzYWJsZWQnLCBzZWxlY3RlZFJvd3MubGVuZ3RoID09IDApO1xuXG5cdFx0aWYgKHNlbGVjdGVkUm93cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGxldCBkYXRhSXRlbSA9IHRoaXMuX2Rvd25sb2FkR3JpZC5kYXRhSXRlbShzZWxlY3RlZFJvd3NbMF0pO1xuXHRcdFx0JCgnI2xndi1kb3dubG9hZEJ0JykuYXR0cignaHJlZicsIGRhdGFJdGVtLnVybCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdCQoJyNsZ3YtZG93bmxvYWRCdCcpLmF0dHIoJ2hyZWYnLCAnIycpO1xuXHR9XG5cblx0X29uRGVsZXRlQnRDbGljaygpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWRSb3dzID0gdGhpcy5fZG93bmxvYWRHcmlkLnNlbGVjdCgpO1xuXG5cdFx0aWYgKHNlbGVjdGVkUm93cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGxldCBkYXRhSXRlbSA9IHRoaXMuX2Rvd25sb2FkR3JpZC5kYXRhSXRlbShzZWxlY3RlZFJvd3NbMF0pO1xuXG5cdFx0XHQvLyBSZXF1ZXN0IGJhY2t1cCBkZWxldGlvblxuXHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdHBhcmFtcy5wdXRVdGZTdHJpbmcoJ2ZpbGUnLCBkYXRhSXRlbS5uYW1lKTtcblxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ERUxFVEVfQkFDS1VQLCBwYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9zd2l0Y2hSdW50aW1lVmlld1N0YWNrKHZpZXdJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZ3YtcnVudGltZS12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X3N3aXRjaEJvb3RWaWV3U3RhY2sodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xndi1ib290LXZpZXdzdGFjaycpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cdH1cblxuXHRfc3dpdGNoRG93bmxvYWRWaWV3U3RhY2sodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xndi1kb3dubG9hZC12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2VuYWJsZVJ1bnRpbWVMb2dDb250cm9scyhlbmFibGUpXG5cdHtcblx0XHQkKCcjbGd2LWxvYWRCdCcpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cdFx0JCgnI2xndi1leHBvcnRSdW50aW1lTG9nQnQnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXHRcdCQoJyNsZ3YtZmlsdGVyQnQnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXHR9XG5cblx0X2xvYWRSdW50aW1lTG9nKClcblx0e1xuXHRcdC8vIERpc2FibGUgY29udHJvbHMgdG8gbG9hZCBsb2csIHNvIHRoYXQgaW1wYXRpZW50IHVzZXJzIGNhbid0IHNlbmQgbXVsdGlwbGUgcmVxdWVzdHNcblx0XHQvLyAoaXQgd2lsbCBiZSBlbmFibGVkIGFnYWluIHdoZW4gYSByZXNwb25zZSBpcyByZWNlaXZlZClcblx0XHR0aGlzLl9lbmFibGVSdW50aW1lTG9nQ29udHJvbHMoZmFsc2UpO1xuXG5cdFx0Ly8gQ2xlYXIgZmlsdGVyc1xuXHRcdHRoaXMuX2NsZWFyUnVudGltZUxvZ0ZpbHRlcnMoKTtcblxuXHRcdC8vIFNob3cgbG9hZGluZyBiYXJcblx0XHR0aGlzLl9zd2l0Y2hSdW50aW1lVmlld1N0YWNrKCdsZ3YtcnVudGltZUxvZ0xvYWRpbmdWaWV3Jyk7XG5cblx0XHQvLyBTZW5kIHJlcXVlc3Rcblx0XHQvLyAodGhlIG51bWJlciBvZiBsaW5lcyB0byBiZSByZXRyaWV2ZWQgaXMgc2VudClcblx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdHBhcmFtcy5wdXRJbnQoJ251bUVudHJpZXMnLCBOdW1iZXIodGhpcy5fbG9nTGluZXNERC52YWx1ZSgpKSk7XG5cblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9SVU5USU1FX0xPRywgcGFyYW1zKTtcblx0fVxuXG5cdF9jbGVhclJ1bnRpbWVMb2dGaWx0ZXJzKClcblx0e1xuXHRcdHRoaXMuX2xldmVsRmlsdGVyREQuc2VsZWN0KDApO1xuXHRcdHRoaXMuX2NsYXNzRmlsdGVyREQuc2VsZWN0KDApO1xuXHRcdCQoJyNsZ3YtbWVzc2FnZUluJykudmFsKCcnKTtcblx0fVxuXG5cdF9leHBvcnRMb2cobG9nLCBuYW1lKVxuXHR7XG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbbG9nXSwge3R5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04XCJ9KTtcblx0XHRsZXQgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWU1NRERfSEhtbXNzJyk7XG5cblx0XHRGaWxlU2F2ZXIuc2F2ZUFzKGJsb2IsIGAke25hbWV9XyR7ZGF0ZX0ubG9nYCk7XG5cdH1cblxuXHRfc2V0UnVudGltZUxvZ0RhdGFTb3VyY2UoZHMpXG5cdHtcblx0XHQvLyBSZWFkIGN1cnJlbnQgaG9yaXpvbnRhbCBzY3JvbGwgdmFsdWVcblx0XHRjb25zdCBzY3JvbGxMZWZ0ID0gJCgnI2xndi1ydW50aW1lTG9nR3JpZCAuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9ydW50aW1lTG9nR3JpZC53cmFwcGVyKS5zY3JvbGxMZWZ0KCk7XG5cblx0XHQvLyBBc3NpZ24gZGF0YSBzb3VyY2UgdG8gZ3JpZFxuXHRcdHRoaXMuX3J1bnRpbWVMb2dHcmlkLnNldERhdGFTb3VyY2UoZHMpO1xuXG5cdFx0Ly8gU2V0IGZpbHRlcnNcblx0XHR0aGlzLl9zZXRGaWx0ZXJzKGRzKTtcblxuXHRcdC8vIFNldCBob3Jpem9udGFsIHNjcm9sbFxuXHRcdCQoJyNsZ3YtcnVudGltZUxvZ0dyaWQgLmstZ3JpZC1jb250ZW50JywgdGhpcy5fcnVudGltZUxvZ0dyaWQud3JhcHBlcikuc2Nyb2xsTGVmdChzY3JvbGxMZWZ0KTtcblxuXHRcdC8vIFVwZGF0ZSBjb3VudGVyXG5cdFx0JCgnI2xndi1ydW50aW1lTG9nRW50cmllc0xiJykudGV4dChgTG9nIGVudHJpZXM6ICR7dGhpcy5fdG90YWxSdW50aW1lTG9nRW50cmllc30gKCR7ZHMudG90YWwoKX0gZGlzcGxheWVkKWApO1xuXHR9XG5cblx0X3NldEZpbHRlcnMoZHMpXG5cdHtcblx0XHRsZXQgZmlsdGVycyA9IFtdO1xuXG5cdFx0Ly8gTGV2ZWwgZmlsdGVyaW5nXG5cdFx0aWYgKHRoaXMuX2xldmVsRmlsdGVyREQuc2VsZWN0KCkgPiAwKVxuXHRcdFx0ZmlsdGVycy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6ICdsZXZlbCcsIG9wZXJhdG9yOiAnZXEnLCB2YWx1ZTogdGhpcy5fbGV2ZWxGaWx0ZXJERC52YWx1ZSgpXG5cdFx0XHR9KTtcblxuXHRcdC8vIENsYXNzIGZpbHRlcmluZ1xuXHRcdGlmICh0aGlzLl9jbGFzc0ZpbHRlckRELnNlbGVjdCgpID4gMClcblx0XHRcdGZpbHRlcnMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOiAnY2xhenonLCBvcGVyYXRvcjogJ2VxJywgdmFsdWU6IHRoaXMuX2NsYXNzRmlsdGVyREQudmFsdWUoKVxuXHRcdFx0fSk7XG5cblx0XHQvLyBNZXNzYWdlIGZpbHRlcmluZ1xuXHRcdGlmICgkKCcjbGd2LW1lc3NhZ2VJbicpLnZhbCgpICE9ICcnKVxuXHRcdFx0ZmlsdGVycy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6ICdtZXNzYWdlJywgb3BlcmF0b3I6ICdjb250YWlucycsIHZhbHVlOiAkKCcjbGd2LW1lc3NhZ2VJbicpLnZhbCgpXG5cdFx0XHR9KTtcblxuXHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0ZHMuZmlsdGVyKGZpbHRlcnMpO1xuXHR9XG5cblx0X2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UoZGlzYWJsZSwgYmFja3VwSWQgPSBudWxsKVxuXHR7XG5cdFx0aWYgKGRpc2FibGUpXG5cdFx0e1xuXHRcdFx0Ly8gU2hvdyBwcm9wZXIgcHJvZ3Jlc3MgYmFyXG5cdFx0XHRpZiAoYmFja3VwSWQgPT0gdGhpcy5CT09UX0xPR19CQUNLVVBfSUQpXG5cdFx0XHRcdCQoJyNsZ3YtYm9vdExvZ0JhY2t1cENhcmQgLnByb2dyZXNzLWJhcicpLnNob3coKTtcblx0XHRcdGVsc2UgaWYgKGJhY2t1cElkID09IHRoaXMuUlVOVElNRV9MT0dfQkFDS1VQX0lEKVxuXHRcdFx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkIC5wcm9ncmVzcy1iYXInKS5zaG93KCk7XG5cdFx0XHRlbHNlIGlmIChiYWNrdXBJZCA9PSB0aGlzLkZVTExfQkFDS1VQX0lEKVxuXHRcdFx0XHQkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkIC5wcm9ncmVzcy1iYXInKS5zaG93KCk7XG5cblx0XHRcdC8vIERpc2FibGUgYnV0dG9uc1xuXHRcdFx0JCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNsZ3YtZnVsbExvZ0JhY2t1cENhcmQgLmJhY2t1cC1idXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gSGlkZSBhbGwgcHJvZ3Jlc3MgYmFyXG5cdFx0XHQkKCcuY2FyZC1ib2R5IC5wcm9ncmVzcy1iYXInKS5oaWRlKCk7XG5cblx0XHRcdC8vIEVuYWJsZSBidXR0b25zXG5cdFx0XHQkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdGlmICghdGhpcy5fYm9vdExvZ0JhY2t1cFVuYXZhaWxhYmxlKVxuXHRcdFx0XHQkKCcjbGd2LWJvb3RMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdGlmICghdGhpcy5fcnVudGltZUxvZ0JhY2t1cFVuYXZhaWxhYmxlKVxuXHRcdFx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHR9XG5cblx0X2luaXRCYWNrdXBDYXJkKGlkU2VsZWN0b3IpXG5cdHtcblx0XHQkKGlkU2VsZWN0b3IgKyAnIC5iYWNrdXAtZGV0YWlscycpLmhpZGUoKTtcblx0XHQkKGlkU2VsZWN0b3IgKyAnIC5wcm9ncmVzcy1iYXInKS5oaWRlKCk7XG5cdH1cblxuXHRfZmlsbEJhY2t1cENhcmQoaWRTZWxlY3RvciwgZGV0YWlsc09iaiA9IG51bGwpXG5cdHtcblx0XHRpZiAoZGV0YWlsc09iaiA9PSBudWxsKVxuXHRcdFx0JChpZFNlbGVjdG9yICsgJyAuYmFja3VwLWRldGFpbHMnKS5oaWRlKCk7XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdCQoaWRTZWxlY3RvciArICcgLmJhY2t1cC1kZXRhaWxzJykuc2hvdygpO1xuXG5cdFx0XHQkKGlkU2VsZWN0b3IgKyAnIC5iYWNrdXAtbGluaycpLmF0dHIoJ2hyZWYnLCBkZXRhaWxzT2JqLnVybCk7XG5cdFx0XHQkKGlkU2VsZWN0b3IgKyAnIC5iYWNrdXAtZGF0ZScpLnRleHQoZGV0YWlsc09iai5kYXRlKTtcblx0XHRcdCQoaWRTZWxlY3RvciArICcgLmJhY2t1cC10aW1lJykudGV4dChkZXRhaWxzT2JqLnRpbWUpO1xuXHRcdFx0JChpZFNlbGVjdG9yICsgJyAuYmFja3VwLXNpemUnKS50ZXh0KGRldGFpbHNPYmouc2l6ZSk7XG5cdFx0fVxuXHR9XG5cblx0X3NldERvd25sb2FkR3JpZERhdGFTb3VyY2UoZHMpXG5cdHtcblx0XHQvLyBSZWFkIGN1cnJlbnQgaG9yaXpvbnRhbCBzY3JvbGwgdmFsdWVcblx0ICAgY29uc3Qgc2Nyb2xsTGVmdCA9ICQoJyNsZ3YtZG93bmxvYWRHcmlkIC5rLWdyaWQtY29udGVudCcsIHRoaXMuX2Rvd25sb2FkR3JpZC53cmFwcGVyKS5zY3JvbGxMZWZ0KCk7XG5cblx0ICAgLy8gQXNzaWduIGRhdGEgc291cmNlIHRvIGdyaWRcblx0ICAgdGhpcy5fZG93bmxvYWRHcmlkLnNldERhdGFTb3VyY2UoZHMpO1xuXG5cdCAgIC8vIFNldCBob3Jpem9udGFsIHNjcm9sbFxuXHQgICAkKCcjbGd2LWRvd25sb2FkR3JpZCAuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9kb3dubG9hZEdyaWQud3JhcHBlcikuc2Nyb2xsTGVmdChzY3JvbGxMZWZ0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgR0VUVEVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9