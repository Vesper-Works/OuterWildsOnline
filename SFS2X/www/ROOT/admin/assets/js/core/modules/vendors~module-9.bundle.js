/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["vendors~module-9"],{

/***/ "./node_modules/aes-js/index.js":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
(function(root) {
    "use strict";

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy92ZW5kb3Jzfm1vZHVsZS05LmJ1bmRsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vbm9kZV9tb2R1bGVzL2Flcy1qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgTUlUIExpY2Vuc2UuIENvcHlyaWdodCAyMDE1LTIwMTggUmljaGFyZCBNb29yZSA8bWVAcmljbW9vLmNvbT4uIFNlZSBMSUNFTlNFLnR4dC4gKi9cbihmdW5jdGlvbihyb290KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBjaGVja0ludCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKHBhcnNlSW50KHZhbHVlKSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSW50cyhhcnJheWlzaCkge1xuICAgICAgICBpZiAoIWNoZWNrSW50KGFycmF5aXNoLmxlbmd0aCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheWlzaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFjaGVja0ludChhcnJheWlzaFtpXSkgfHwgYXJyYXlpc2hbaV0gPCAwIHx8IGFycmF5aXNoW2ldID4gMjU1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29lcmNlQXJyYXkoYXJnLCBjb3B5KSB7XG5cbiAgICAgICAgLy8gQXJyYXlCdWZmZXIgdmlld1xuICAgICAgICBpZiAoYXJnLmJ1ZmZlciAmJiBhcmcubmFtZSA9PT0gJ1VpbnQ4QXJyYXknKSB7XG5cbiAgICAgICAgICAgIGlmIChjb3B5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZy5zbGljZSkge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0J3MgYW4gYXJyYXk7IGNoZWNrIGl0IGlzIGEgdmFsaWQgcmVwcmVzZW50YXRpb24gb2YgYSBieXRlXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnRzKGFyZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGNvbnRhaW5zIGludmFsaWQgdmFsdWU6ICcgKyBhcmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbWV0aGluZyBlbHNlLCBidXQgYmVoYXZlcyBsaWtlIGFuIGFycmF5IChtYXliZSBhIEJ1ZmZlcj8gQXJndW1lbnRzPylcbiAgICAgICAgaWYgKGNoZWNrSW50KGFyZy5sZW5ndGgpICYmIGNoZWNrSW50cyhhcmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgYXJyYXktbGlrZSBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBcnJheShsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZUFycmF5LCB0YXJnZXRBcnJheSwgdGFyZ2V0U3RhcnQsIHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpIHtcbiAgICAgICAgaWYgKHNvdXJjZVN0YXJ0ICE9IG51bGwgfHwgc291cmNlRW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VBcnJheS5zbGljZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUFycmF5ID0gc291cmNlQXJyYXkuc2xpY2Uoc291cmNlU3RhcnQsIHNvdXJjZUVuZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZUFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc291cmNlQXJyYXksIHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRhcmdldEFycmF5LnNldChzb3VyY2VBcnJheSwgdGFyZ2V0U3RhcnQpO1xuICAgIH1cblxuXG5cbiAgICB2YXIgY29udmVydFV0ZjggPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIHRvQnl0ZXModGV4dCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCBpID0gMDtcbiAgICAgICAgICAgIHRleHQgPSBlbmNvZGVVUkkodGV4dCk7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0ZXh0LmNoYXJDb2RlQXQoaSsrKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIGEgJSBzaWduLCBlbmNvZGUgdGhlIGZvbGxvd2luZyAyIGJ5dGVzIGFzIGEgaGV4IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHRleHQuc3Vic3RyKGksIDIpLCAxNikpXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcblxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwganVzdCB0aGUgYWN0dWFsIGJ5dGVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvZXJjZUFycmF5KHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgaSA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChpIDwgYnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBieXRlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYykpO1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID4gMTkxICYmIGMgPCAyMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDFmKSA8PCA2KSB8IChieXRlc1tpICsgMV0gJiAweDNmKSkpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDBmKSA8PCAxMikgfCAoKGJ5dGVzW2kgKyAxXSAmIDB4M2YpIDw8IDYpIHwgKGJ5dGVzW2kgKyAyXSAmIDB4M2YpKSk7XG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9CeXRlczogdG9CeXRlcyxcbiAgICAgICAgICAgIGZyb21CeXRlczogZnJvbUJ5dGVzLFxuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIHZhciBjb252ZXJ0SGV4ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiB0b0J5dGVzKHRleHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHRleHQuc3Vic3RyKGksIDIpLCAxNikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cDovL2l4dGkubmV0L2RldmVsb3BtZW50L2phdmFzY3JpcHQvMjAxMS8xMS8xMS9iYXNlNjQtZW5jb2RlZGVjb2RlLW9mLXV0ZjgtaW4tYnJvd3Nlci13aXRoLWpzLmh0bWxcbiAgICAgICAgdmFyIEhleCA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICAgICAgICBmdW5jdGlvbiBmcm9tQnl0ZXMoYnl0ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGJ5dGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIZXhbKHYgJiAweGYwKSA+PiA0XSArIEhleFt2ICYgMHgwZl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvQnl0ZXM6IHRvQnl0ZXMsXG4gICAgICAgICAgICBmcm9tQnl0ZXM6IGZyb21CeXRlcyxcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cblxuICAgIC8vIE51bWJlciBvZiByb3VuZHMgYnkga2V5c2l6ZVxuICAgIHZhciBudW1iZXJPZlJvdW5kcyA9IHsxNjogMTAsIDI0OiAxMiwgMzI6IDE0fVxuXG4gICAgLy8gUm91bmQgY29uc3RhbnQgd29yZHNcbiAgICB2YXIgcmNvbiA9IFsweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFiLCAweDM2LCAweDZjLCAweGQ4LCAweGFiLCAweDRkLCAweDlhLCAweDJmLCAweDVlLCAweGJjLCAweDYzLCAweGM2LCAweDk3LCAweDM1LCAweDZhLCAweGQ0LCAweGIzLCAweDdkLCAweGZhLCAweGVmLCAweGM1LCAweDkxXTtcblxuICAgIC8vIFMtYm94IGFuZCBJbnZlcnNlIFMtYm94IChTIGlzIGZvciBTdWJzdGl0dXRpb24pXG4gICAgdmFyIFMgPSBbMHg2MywgMHg3YywgMHg3NywgMHg3YiwgMHhmMiwgMHg2YiwgMHg2ZiwgMHhjNSwgMHgzMCwgMHgwMSwgMHg2NywgMHgyYiwgMHhmZSwgMHhkNywgMHhhYiwgMHg3NiwgMHhjYSwgMHg4MiwgMHhjOSwgMHg3ZCwgMHhmYSwgMHg1OSwgMHg0NywgMHhmMCwgMHhhZCwgMHhkNCwgMHhhMiwgMHhhZiwgMHg5YywgMHhhNCwgMHg3MiwgMHhjMCwgMHhiNywgMHhmZCwgMHg5MywgMHgyNiwgMHgzNiwgMHgzZiwgMHhmNywgMHhjYywgMHgzNCwgMHhhNSwgMHhlNSwgMHhmMSwgMHg3MSwgMHhkOCwgMHgzMSwgMHgxNSwgMHgwNCwgMHhjNywgMHgyMywgMHhjMywgMHgxOCwgMHg5NiwgMHgwNSwgMHg5YSwgMHgwNywgMHgxMiwgMHg4MCwgMHhlMiwgMHhlYiwgMHgyNywgMHhiMiwgMHg3NSwgMHgwOSwgMHg4MywgMHgyYywgMHgxYSwgMHgxYiwgMHg2ZSwgMHg1YSwgMHhhMCwgMHg1MiwgMHgzYiwgMHhkNiwgMHhiMywgMHgyOSwgMHhlMywgMHgyZiwgMHg4NCwgMHg1MywgMHhkMSwgMHgwMCwgMHhlZCwgMHgyMCwgMHhmYywgMHhiMSwgMHg1YiwgMHg2YSwgMHhjYiwgMHhiZSwgMHgzOSwgMHg0YSwgMHg0YywgMHg1OCwgMHhjZiwgMHhkMCwgMHhlZiwgMHhhYSwgMHhmYiwgMHg0MywgMHg0ZCwgMHgzMywgMHg4NSwgMHg0NSwgMHhmOSwgMHgwMiwgMHg3ZiwgMHg1MCwgMHgzYywgMHg5ZiwgMHhhOCwgMHg1MSwgMHhhMywgMHg0MCwgMHg4ZiwgMHg5MiwgMHg5ZCwgMHgzOCwgMHhmNSwgMHhiYywgMHhiNiwgMHhkYSwgMHgyMSwgMHgxMCwgMHhmZiwgMHhmMywgMHhkMiwgMHhjZCwgMHgwYywgMHgxMywgMHhlYywgMHg1ZiwgMHg5NywgMHg0NCwgMHgxNywgMHhjNCwgMHhhNywgMHg3ZSwgMHgzZCwgMHg2NCwgMHg1ZCwgMHgxOSwgMHg3MywgMHg2MCwgMHg4MSwgMHg0ZiwgMHhkYywgMHgyMiwgMHgyYSwgMHg5MCwgMHg4OCwgMHg0NiwgMHhlZSwgMHhiOCwgMHgxNCwgMHhkZSwgMHg1ZSwgMHgwYiwgMHhkYiwgMHhlMCwgMHgzMiwgMHgzYSwgMHgwYSwgMHg0OSwgMHgwNiwgMHgyNCwgMHg1YywgMHhjMiwgMHhkMywgMHhhYywgMHg2MiwgMHg5MSwgMHg5NSwgMHhlNCwgMHg3OSwgMHhlNywgMHhjOCwgMHgzNywgMHg2ZCwgMHg4ZCwgMHhkNSwgMHg0ZSwgMHhhOSwgMHg2YywgMHg1NiwgMHhmNCwgMHhlYSwgMHg2NSwgMHg3YSwgMHhhZSwgMHgwOCwgMHhiYSwgMHg3OCwgMHgyNSwgMHgyZSwgMHgxYywgMHhhNiwgMHhiNCwgMHhjNiwgMHhlOCwgMHhkZCwgMHg3NCwgMHgxZiwgMHg0YiwgMHhiZCwgMHg4YiwgMHg4YSwgMHg3MCwgMHgzZSwgMHhiNSwgMHg2NiwgMHg0OCwgMHgwMywgMHhmNiwgMHgwZSwgMHg2MSwgMHgzNSwgMHg1NywgMHhiOSwgMHg4NiwgMHhjMSwgMHgxZCwgMHg5ZSwgMHhlMSwgMHhmOCwgMHg5OCwgMHgxMSwgMHg2OSwgMHhkOSwgMHg4ZSwgMHg5NCwgMHg5YiwgMHgxZSwgMHg4NywgMHhlOSwgMHhjZSwgMHg1NSwgMHgyOCwgMHhkZiwgMHg4YywgMHhhMSwgMHg4OSwgMHgwZCwgMHhiZiwgMHhlNiwgMHg0MiwgMHg2OCwgMHg0MSwgMHg5OSwgMHgyZCwgMHgwZiwgMHhiMCwgMHg1NCwgMHhiYiwgMHgxNl07XG4gICAgdmFyIFNpID1bMHg1MiwgMHgwOSwgMHg2YSwgMHhkNSwgMHgzMCwgMHgzNiwgMHhhNSwgMHgzOCwgMHhiZiwgMHg0MCwgMHhhMywgMHg5ZSwgMHg4MSwgMHhmMywgMHhkNywgMHhmYiwgMHg3YywgMHhlMywgMHgzOSwgMHg4MiwgMHg5YiwgMHgyZiwgMHhmZiwgMHg4NywgMHgzNCwgMHg4ZSwgMHg0MywgMHg0NCwgMHhjNCwgMHhkZSwgMHhlOSwgMHhjYiwgMHg1NCwgMHg3YiwgMHg5NCwgMHgzMiwgMHhhNiwgMHhjMiwgMHgyMywgMHgzZCwgMHhlZSwgMHg0YywgMHg5NSwgMHgwYiwgMHg0MiwgMHhmYSwgMHhjMywgMHg0ZSwgMHgwOCwgMHgyZSwgMHhhMSwgMHg2NiwgMHgyOCwgMHhkOSwgMHgyNCwgMHhiMiwgMHg3NiwgMHg1YiwgMHhhMiwgMHg0OSwgMHg2ZCwgMHg4YiwgMHhkMSwgMHgyNSwgMHg3MiwgMHhmOCwgMHhmNiwgMHg2NCwgMHg4NiwgMHg2OCwgMHg5OCwgMHgxNiwgMHhkNCwgMHhhNCwgMHg1YywgMHhjYywgMHg1ZCwgMHg2NSwgMHhiNiwgMHg5MiwgMHg2YywgMHg3MCwgMHg0OCwgMHg1MCwgMHhmZCwgMHhlZCwgMHhiOSwgMHhkYSwgMHg1ZSwgMHgxNSwgMHg0NiwgMHg1NywgMHhhNywgMHg4ZCwgMHg5ZCwgMHg4NCwgMHg5MCwgMHhkOCwgMHhhYiwgMHgwMCwgMHg4YywgMHhiYywgMHhkMywgMHgwYSwgMHhmNywgMHhlNCwgMHg1OCwgMHgwNSwgMHhiOCwgMHhiMywgMHg0NSwgMHgwNiwgMHhkMCwgMHgyYywgMHgxZSwgMHg4ZiwgMHhjYSwgMHgzZiwgMHgwZiwgMHgwMiwgMHhjMSwgMHhhZiwgMHhiZCwgMHgwMywgMHgwMSwgMHgxMywgMHg4YSwgMHg2YiwgMHgzYSwgMHg5MSwgMHgxMSwgMHg0MSwgMHg0ZiwgMHg2NywgMHhkYywgMHhlYSwgMHg5NywgMHhmMiwgMHhjZiwgMHhjZSwgMHhmMCwgMHhiNCwgMHhlNiwgMHg3MywgMHg5NiwgMHhhYywgMHg3NCwgMHgyMiwgMHhlNywgMHhhZCwgMHgzNSwgMHg4NSwgMHhlMiwgMHhmOSwgMHgzNywgMHhlOCwgMHgxYywgMHg3NSwgMHhkZiwgMHg2ZSwgMHg0NywgMHhmMSwgMHgxYSwgMHg3MSwgMHgxZCwgMHgyOSwgMHhjNSwgMHg4OSwgMHg2ZiwgMHhiNywgMHg2MiwgMHgwZSwgMHhhYSwgMHgxOCwgMHhiZSwgMHgxYiwgMHhmYywgMHg1NiwgMHgzZSwgMHg0YiwgMHhjNiwgMHhkMiwgMHg3OSwgMHgyMCwgMHg5YSwgMHhkYiwgMHhjMCwgMHhmZSwgMHg3OCwgMHhjZCwgMHg1YSwgMHhmNCwgMHgxZiwgMHhkZCwgMHhhOCwgMHgzMywgMHg4OCwgMHgwNywgMHhjNywgMHgzMSwgMHhiMSwgMHgxMiwgMHgxMCwgMHg1OSwgMHgyNywgMHg4MCwgMHhlYywgMHg1ZiwgMHg2MCwgMHg1MSwgMHg3ZiwgMHhhOSwgMHgxOSwgMHhiNSwgMHg0YSwgMHgwZCwgMHgyZCwgMHhlNSwgMHg3YSwgMHg5ZiwgMHg5MywgMHhjOSwgMHg5YywgMHhlZiwgMHhhMCwgMHhlMCwgMHgzYiwgMHg0ZCwgMHhhZSwgMHgyYSwgMHhmNSwgMHhiMCwgMHhjOCwgMHhlYiwgMHhiYiwgMHgzYywgMHg4MywgMHg1MywgMHg5OSwgMHg2MSwgMHgxNywgMHgyYiwgMHgwNCwgMHg3ZSwgMHhiYSwgMHg3NywgMHhkNiwgMHgyNiwgMHhlMSwgMHg2OSwgMHgxNCwgMHg2MywgMHg1NSwgMHgyMSwgMHgwYywgMHg3ZF07XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGVuY3J5cHRpb25cbiAgICB2YXIgVDEgPSBbMHhjNjYzNjNhNSwgMHhmODdjN2M4NCwgMHhlZTc3Nzc5OSwgMHhmNjdiN2I4ZCwgMHhmZmYyZjIwZCwgMHhkNjZiNmJiZCwgMHhkZTZmNmZiMSwgMHg5MWM1YzU1NCwgMHg2MDMwMzA1MCwgMHgwMjAxMDEwMywgMHhjZTY3NjdhOSwgMHg1NjJiMmI3ZCwgMHhlN2ZlZmUxOSwgMHhiNWQ3ZDc2MiwgMHg0ZGFiYWJlNiwgMHhlYzc2NzY5YSwgMHg4ZmNhY2E0NSwgMHgxZjgyODI5ZCwgMHg4OWM5Yzk0MCwgMHhmYTdkN2Q4NywgMHhlZmZhZmExNSwgMHhiMjU5NTllYiwgMHg4ZTQ3NDdjOSwgMHhmYmYwZjAwYiwgMHg0MWFkYWRlYywgMHhiM2Q0ZDQ2NywgMHg1ZmEyYTJmZCwgMHg0NWFmYWZlYSwgMHgyMzljOWNiZiwgMHg1M2E0YTRmNywgMHhlNDcyNzI5NiwgMHg5YmMwYzA1YiwgMHg3NWI3YjdjMiwgMHhlMWZkZmQxYywgMHgzZDkzOTNhZSwgMHg0YzI2MjY2YSwgMHg2YzM2MzY1YSwgMHg3ZTNmM2Y0MSwgMHhmNWY3ZjcwMiwgMHg4M2NjY2M0ZiwgMHg2ODM0MzQ1YywgMHg1MWE1YTVmNCwgMHhkMWU1ZTUzNCwgMHhmOWYxZjEwOCwgMHhlMjcxNzE5MywgMHhhYmQ4ZDg3MywgMHg2MjMxMzE1MywgMHgyYTE1MTUzZiwgMHgwODA0MDQwYywgMHg5NWM3Yzc1MiwgMHg0NjIzMjM2NSwgMHg5ZGMzYzM1ZSwgMHgzMDE4MTgyOCwgMHgzNzk2OTZhMSwgMHgwYTA1MDUwZiwgMHgyZjlhOWFiNSwgMHgwZTA3MDcwOSwgMHgyNDEyMTIzNiwgMHgxYjgwODA5YiwgMHhkZmUyZTIzZCwgMHhjZGViZWIyNiwgMHg0ZTI3Mjc2OSwgMHg3ZmIyYjJjZCwgMHhlYTc1NzU5ZiwgMHgxMjA5MDkxYiwgMHgxZDgzODM5ZSwgMHg1ODJjMmM3NCwgMHgzNDFhMWEyZSwgMHgzNjFiMWIyZCwgMHhkYzZlNmViMiwgMHhiNDVhNWFlZSwgMHg1YmEwYTBmYiwgMHhhNDUyNTJmNiwgMHg3NjNiM2I0ZCwgMHhiN2Q2ZDY2MSwgMHg3ZGIzYjNjZSwgMHg1MjI5Mjk3YiwgMHhkZGUzZTMzZSwgMHg1ZTJmMmY3MSwgMHgxMzg0ODQ5NywgMHhhNjUzNTNmNSwgMHhiOWQxZDE2OCwgMHgwMDAwMDAwMCwgMHhjMWVkZWQyYywgMHg0MDIwMjA2MCwgMHhlM2ZjZmMxZiwgMHg3OWIxYjFjOCwgMHhiNjViNWJlZCwgMHhkNDZhNmFiZSwgMHg4ZGNiY2I0NiwgMHg2N2JlYmVkOSwgMHg3MjM5Mzk0YiwgMHg5NDRhNGFkZSwgMHg5ODRjNGNkNCwgMHhiMDU4NThlOCwgMHg4NWNmY2Y0YSwgMHhiYmQwZDA2YiwgMHhjNWVmZWYyYSwgMHg0ZmFhYWFlNSwgMHhlZGZiZmIxNiwgMHg4NjQzNDNjNSwgMHg5YTRkNGRkNywgMHg2NjMzMzM1NSwgMHgxMTg1ODU5NCwgMHg4YTQ1NDVjZiwgMHhlOWY5ZjkxMCwgMHgwNDAyMDIwNiwgMHhmZTdmN2Y4MSwgMHhhMDUwNTBmMCwgMHg3ODNjM2M0NCwgMHgyNTlmOWZiYSwgMHg0YmE4YThlMywgMHhhMjUxNTFmMywgMHg1ZGEzYTNmZSwgMHg4MDQwNDBjMCwgMHgwNThmOGY4YSwgMHgzZjkyOTJhZCwgMHgyMTlkOWRiYywgMHg3MDM4Mzg0OCwgMHhmMWY1ZjUwNCwgMHg2M2JjYmNkZiwgMHg3N2I2YjZjMSwgMHhhZmRhZGE3NSwgMHg0MjIxMjE2MywgMHgyMDEwMTAzMCwgMHhlNWZmZmYxYSwgMHhmZGYzZjMwZSwgMHhiZmQyZDI2ZCwgMHg4MWNkY2Q0YywgMHgxODBjMGMxNCwgMHgyNjEzMTMzNSwgMHhjM2VjZWMyZiwgMHhiZTVmNWZlMSwgMHgzNTk3OTdhMiwgMHg4ODQ0NDRjYywgMHgyZTE3MTczOSwgMHg5M2M0YzQ1NywgMHg1NWE3YTdmMiwgMHhmYzdlN2U4MiwgMHg3YTNkM2Q0NywgMHhjODY0NjRhYywgMHhiYTVkNWRlNywgMHgzMjE5MTkyYiwgMHhlNjczNzM5NSwgMHhjMDYwNjBhMCwgMHgxOTgxODE5OCwgMHg5ZTRmNGZkMSwgMHhhM2RjZGM3ZiwgMHg0NDIyMjI2NiwgMHg1NDJhMmE3ZSwgMHgzYjkwOTBhYiwgMHgwYjg4ODg4MywgMHg4YzQ2NDZjYSwgMHhjN2VlZWUyOSwgMHg2YmI4YjhkMywgMHgyODE0MTQzYywgMHhhN2RlZGU3OSwgMHhiYzVlNWVlMiwgMHgxNjBiMGIxZCwgMHhhZGRiZGI3NiwgMHhkYmUwZTAzYiwgMHg2NDMyMzI1NiwgMHg3NDNhM2E0ZSwgMHgxNDBhMGExZSwgMHg5MjQ5NDlkYiwgMHgwYzA2MDYwYSwgMHg0ODI0MjQ2YywgMHhiODVjNWNlNCwgMHg5ZmMyYzI1ZCwgMHhiZGQzZDM2ZSwgMHg0M2FjYWNlZiwgMHhjNDYyNjJhNiwgMHgzOTkxOTFhOCwgMHgzMTk1OTVhNCwgMHhkM2U0ZTQzNywgMHhmMjc5Nzk4YiwgMHhkNWU3ZTczMiwgMHg4YmM4Yzg0MywgMHg2ZTM3Mzc1OSwgMHhkYTZkNmRiNywgMHgwMThkOGQ4YywgMHhiMWQ1ZDU2NCwgMHg5YzRlNGVkMiwgMHg0OWE5YTllMCwgMHhkODZjNmNiNCwgMHhhYzU2NTZmYSwgMHhmM2Y0ZjQwNywgMHhjZmVhZWEyNSwgMHhjYTY1NjVhZiwgMHhmNDdhN2E4ZSwgMHg0N2FlYWVlOSwgMHgxMDA4MDgxOCwgMHg2ZmJhYmFkNSwgMHhmMDc4Nzg4OCwgMHg0YTI1MjU2ZiwgMHg1YzJlMmU3MiwgMHgzODFjMWMyNCwgMHg1N2E2YTZmMSwgMHg3M2I0YjRjNywgMHg5N2M2YzY1MSwgMHhjYmU4ZTgyMywgMHhhMWRkZGQ3YywgMHhlODc0NzQ5YywgMHgzZTFmMWYyMSwgMHg5NjRiNGJkZCwgMHg2MWJkYmRkYywgMHgwZDhiOGI4NiwgMHgwZjhhOGE4NSwgMHhlMDcwNzA5MCwgMHg3YzNlM2U0MiwgMHg3MWI1YjVjNCwgMHhjYzY2NjZhYSwgMHg5MDQ4NDhkOCwgMHgwNjAzMDMwNSwgMHhmN2Y2ZjYwMSwgMHgxYzBlMGUxMiwgMHhjMjYxNjFhMywgMHg2YTM1MzU1ZiwgMHhhZTU3NTdmOSwgMHg2OWI5YjlkMCwgMHgxNzg2ODY5MSwgMHg5OWMxYzE1OCwgMHgzYTFkMWQyNywgMHgyNzllOWViOSwgMHhkOWUxZTEzOCwgMHhlYmY4ZjgxMywgMHgyYjk4OThiMywgMHgyMjExMTEzMywgMHhkMjY5NjliYiwgMHhhOWQ5ZDk3MCwgMHgwNzhlOGU4OSwgMHgzMzk0OTRhNywgMHgyZDliOWJiNiwgMHgzYzFlMWUyMiwgMHgxNTg3ODc5MiwgMHhjOWU5ZTkyMCwgMHg4N2NlY2U0OSwgMHhhYTU1NTVmZiwgMHg1MDI4Mjg3OCwgMHhhNWRmZGY3YSwgMHgwMzhjOGM4ZiwgMHg1OWExYTFmOCwgMHgwOTg5ODk4MCwgMHgxYTBkMGQxNywgMHg2NWJmYmZkYSwgMHhkN2U2ZTYzMSwgMHg4NDQyNDJjNiwgMHhkMDY4NjhiOCwgMHg4MjQxNDFjMywgMHgyOTk5OTliMCwgMHg1YTJkMmQ3NywgMHgxZTBmMGYxMSwgMHg3YmIwYjBjYiwgMHhhODU0NTRmYywgMHg2ZGJiYmJkNiwgMHgyYzE2MTYzYV07XG4gICAgdmFyIFQyID0gWzB4YTVjNjYzNjMsIDB4ODRmODdjN2MsIDB4OTllZTc3NzcsIDB4OGRmNjdiN2IsIDB4MGRmZmYyZjIsIDB4YmRkNjZiNmIsIDB4YjFkZTZmNmYsIDB4NTQ5MWM1YzUsIDB4NTA2MDMwMzAsIDB4MDMwMjAxMDEsIDB4YTljZTY3NjcsIDB4N2Q1NjJiMmIsIDB4MTllN2ZlZmUsIDB4NjJiNWQ3ZDcsIDB4ZTY0ZGFiYWIsIDB4OWFlYzc2NzYsIDB4NDU4ZmNhY2EsIDB4OWQxZjgyODIsIDB4NDA4OWM5YzksIDB4ODdmYTdkN2QsIDB4MTVlZmZhZmEsIDB4ZWJiMjU5NTksIDB4Yzk4ZTQ3NDcsIDB4MGJmYmYwZjAsIDB4ZWM0MWFkYWQsIDB4NjdiM2Q0ZDQsIDB4ZmQ1ZmEyYTIsIDB4ZWE0NWFmYWYsIDB4YmYyMzljOWMsIDB4Zjc1M2E0YTQsIDB4OTZlNDcyNzIsIDB4NWI5YmMwYzAsIDB4YzI3NWI3YjcsIDB4MWNlMWZkZmQsIDB4YWUzZDkzOTMsIDB4NmE0YzI2MjYsIDB4NWE2YzM2MzYsIDB4NDE3ZTNmM2YsIDB4MDJmNWY3ZjcsIDB4NGY4M2NjY2MsIDB4NWM2ODM0MzQsIDB4ZjQ1MWE1YTUsIDB4MzRkMWU1ZTUsIDB4MDhmOWYxZjEsIDB4OTNlMjcxNzEsIDB4NzNhYmQ4ZDgsIDB4NTM2MjMxMzEsIDB4M2YyYTE1MTUsIDB4MGMwODA0MDQsIDB4NTI5NWM3YzcsIDB4NjU0NjIzMjMsIDB4NWU5ZGMzYzMsIDB4MjgzMDE4MTgsIDB4YTEzNzk2OTYsIDB4MGYwYTA1MDUsIDB4YjUyZjlhOWEsIDB4MDkwZTA3MDcsIDB4MzYyNDEyMTIsIDB4OWIxYjgwODAsIDB4M2RkZmUyZTIsIDB4MjZjZGViZWIsIDB4Njk0ZTI3MjcsIDB4Y2Q3ZmIyYjIsIDB4OWZlYTc1NzUsIDB4MWIxMjA5MDksIDB4OWUxZDgzODMsIDB4NzQ1ODJjMmMsIDB4MmUzNDFhMWEsIDB4MmQzNjFiMWIsIDB4YjJkYzZlNmUsIDB4ZWViNDVhNWEsIDB4ZmI1YmEwYTAsIDB4ZjZhNDUyNTIsIDB4NGQ3NjNiM2IsIDB4NjFiN2Q2ZDYsIDB4Y2U3ZGIzYjMsIDB4N2I1MjI5MjksIDB4M2VkZGUzZTMsIDB4NzE1ZTJmMmYsIDB4OTcxMzg0ODQsIDB4ZjVhNjUzNTMsIDB4NjhiOWQxZDEsIDB4MDAwMDAwMDAsIDB4MmNjMWVkZWQsIDB4NjA0MDIwMjAsIDB4MWZlM2ZjZmMsIDB4Yzg3OWIxYjEsIDB4ZWRiNjViNWIsIDB4YmVkNDZhNmEsIDB4NDY4ZGNiY2IsIDB4ZDk2N2JlYmUsIDB4NGI3MjM5MzksIDB4ZGU5NDRhNGEsIDB4ZDQ5ODRjNGMsIDB4ZThiMDU4NTgsIDB4NGE4NWNmY2YsIDB4NmJiYmQwZDAsIDB4MmFjNWVmZWYsIDB4ZTU0ZmFhYWEsIDB4MTZlZGZiZmIsIDB4YzU4NjQzNDMsIDB4ZDc5YTRkNGQsIDB4NTU2NjMzMzMsIDB4OTQxMTg1ODUsIDB4Y2Y4YTQ1NDUsIDB4MTBlOWY5ZjksIDB4MDYwNDAyMDIsIDB4ODFmZTdmN2YsIDB4ZjBhMDUwNTAsIDB4NDQ3ODNjM2MsIDB4YmEyNTlmOWYsIDB4ZTM0YmE4YTgsIDB4ZjNhMjUxNTEsIDB4ZmU1ZGEzYTMsIDB4YzA4MDQwNDAsIDB4OGEwNThmOGYsIDB4YWQzZjkyOTIsIDB4YmMyMTlkOWQsIDB4NDg3MDM4MzgsIDB4MDRmMWY1ZjUsIDB4ZGY2M2JjYmMsIDB4YzE3N2I2YjYsIDB4NzVhZmRhZGEsIDB4NjM0MjIxMjEsIDB4MzAyMDEwMTAsIDB4MWFlNWZmZmYsIDB4MGVmZGYzZjMsIDB4NmRiZmQyZDIsIDB4NGM4MWNkY2QsIDB4MTQxODBjMGMsIDB4MzUyNjEzMTMsIDB4MmZjM2VjZWMsIDB4ZTFiZTVmNWYsIDB4YTIzNTk3OTcsIDB4Y2M4ODQ0NDQsIDB4MzkyZTE3MTcsIDB4NTc5M2M0YzQsIDB4ZjI1NWE3YTcsIDB4ODJmYzdlN2UsIDB4NDc3YTNkM2QsIDB4YWNjODY0NjQsIDB4ZTdiYTVkNWQsIDB4MmIzMjE5MTksIDB4OTVlNjczNzMsIDB4YTBjMDYwNjAsIDB4OTgxOTgxODEsIDB4ZDE5ZTRmNGYsIDB4N2ZhM2RjZGMsIDB4NjY0NDIyMjIsIDB4N2U1NDJhMmEsIDB4YWIzYjkwOTAsIDB4ODMwYjg4ODgsIDB4Y2E4YzQ2NDYsIDB4MjljN2VlZWUsIDB4ZDM2YmI4YjgsIDB4M2MyODE0MTQsIDB4NzlhN2RlZGUsIDB4ZTJiYzVlNWUsIDB4MWQxNjBiMGIsIDB4NzZhZGRiZGIsIDB4M2JkYmUwZTAsIDB4NTY2NDMyMzIsIDB4NGU3NDNhM2EsIDB4MWUxNDBhMGEsIDB4ZGI5MjQ5NDksIDB4MGEwYzA2MDYsIDB4NmM0ODI0MjQsIDB4ZTRiODVjNWMsIDB4NWQ5ZmMyYzIsIDB4NmViZGQzZDMsIDB4ZWY0M2FjYWMsIDB4YTZjNDYyNjIsIDB4YTgzOTkxOTEsIDB4YTQzMTk1OTUsIDB4MzdkM2U0ZTQsIDB4OGJmMjc5NzksIDB4MzJkNWU3ZTcsIDB4NDM4YmM4YzgsIDB4NTk2ZTM3MzcsIDB4YjdkYTZkNmQsIDB4OGMwMThkOGQsIDB4NjRiMWQ1ZDUsIDB4ZDI5YzRlNGUsIDB4ZTA0OWE5YTksIDB4YjRkODZjNmMsIDB4ZmFhYzU2NTYsIDB4MDdmM2Y0ZjQsIDB4MjVjZmVhZWEsIDB4YWZjYTY1NjUsIDB4OGVmNDdhN2EsIDB4ZTk0N2FlYWUsIDB4MTgxMDA4MDgsIDB4ZDU2ZmJhYmEsIDB4ODhmMDc4NzgsIDB4NmY0YTI1MjUsIDB4NzI1YzJlMmUsIDB4MjQzODFjMWMsIDB4ZjE1N2E2YTYsIDB4Yzc3M2I0YjQsIDB4NTE5N2M2YzYsIDB4MjNjYmU4ZTgsIDB4N2NhMWRkZGQsIDB4OWNlODc0NzQsIDB4MjEzZTFmMWYsIDB4ZGQ5NjRiNGIsIDB4ZGM2MWJkYmQsIDB4ODYwZDhiOGIsIDB4ODUwZjhhOGEsIDB4OTBlMDcwNzAsIDB4NDI3YzNlM2UsIDB4YzQ3MWI1YjUsIDB4YWFjYzY2NjYsIDB4ZDg5MDQ4NDgsIDB4MDUwNjAzMDMsIDB4MDFmN2Y2ZjYsIDB4MTIxYzBlMGUsIDB4YTNjMjYxNjEsIDB4NWY2YTM1MzUsIDB4ZjlhZTU3NTcsIDB4ZDA2OWI5YjksIDB4OTExNzg2ODYsIDB4NTg5OWMxYzEsIDB4MjczYTFkMWQsIDB4YjkyNzllOWUsIDB4MzhkOWUxZTEsIDB4MTNlYmY4ZjgsIDB4YjMyYjk4OTgsIDB4MzMyMjExMTEsIDB4YmJkMjY5NjksIDB4NzBhOWQ5ZDksIDB4ODkwNzhlOGUsIDB4YTczMzk0OTQsIDB4YjYyZDliOWIsIDB4MjIzYzFlMWUsIDB4OTIxNTg3ODcsIDB4MjBjOWU5ZTksIDB4NDk4N2NlY2UsIDB4ZmZhYTU1NTUsIDB4Nzg1MDI4MjgsIDB4N2FhNWRmZGYsIDB4OGYwMzhjOGMsIDB4Zjg1OWExYTEsIDB4ODAwOTg5ODksIDB4MTcxYTBkMGQsIDB4ZGE2NWJmYmYsIDB4MzFkN2U2ZTYsIDB4YzY4NDQyNDIsIDB4YjhkMDY4NjgsIDB4YzM4MjQxNDEsIDB4YjAyOTk5OTksIDB4Nzc1YTJkMmQsIDB4MTExZTBmMGYsIDB4Y2I3YmIwYjAsIDB4ZmNhODU0NTQsIDB4ZDY2ZGJiYmIsIDB4M2EyYzE2MTZdO1xuICAgIHZhciBUMyA9IFsweDYzYTVjNjYzLCAweDdjODRmODdjLCAweDc3OTllZTc3LCAweDdiOGRmNjdiLCAweGYyMGRmZmYyLCAweDZiYmRkNjZiLCAweDZmYjFkZTZmLCAweGM1NTQ5MWM1LCAweDMwNTA2MDMwLCAweDAxMDMwMjAxLCAweDY3YTljZTY3LCAweDJiN2Q1NjJiLCAweGZlMTllN2ZlLCAweGQ3NjJiNWQ3LCAweGFiZTY0ZGFiLCAweDc2OWFlYzc2LCAweGNhNDU4ZmNhLCAweDgyOWQxZjgyLCAweGM5NDA4OWM5LCAweDdkODdmYTdkLCAweGZhMTVlZmZhLCAweDU5ZWJiMjU5LCAweDQ3Yzk4ZTQ3LCAweGYwMGJmYmYwLCAweGFkZWM0MWFkLCAweGQ0NjdiM2Q0LCAweGEyZmQ1ZmEyLCAweGFmZWE0NWFmLCAweDljYmYyMzljLCAweGE0Zjc1M2E0LCAweDcyOTZlNDcyLCAweGMwNWI5YmMwLCAweGI3YzI3NWI3LCAweGZkMWNlMWZkLCAweDkzYWUzZDkzLCAweDI2NmE0YzI2LCAweDM2NWE2YzM2LCAweDNmNDE3ZTNmLCAweGY3MDJmNWY3LCAweGNjNGY4M2NjLCAweDM0NWM2ODM0LCAweGE1ZjQ1MWE1LCAweGU1MzRkMWU1LCAweGYxMDhmOWYxLCAweDcxOTNlMjcxLCAweGQ4NzNhYmQ4LCAweDMxNTM2MjMxLCAweDE1M2YyYTE1LCAweDA0MGMwODA0LCAweGM3NTI5NWM3LCAweDIzNjU0NjIzLCAweGMzNWU5ZGMzLCAweDE4MjgzMDE4LCAweDk2YTEzNzk2LCAweDA1MGYwYTA1LCAweDlhYjUyZjlhLCAweDA3MDkwZTA3LCAweDEyMzYyNDEyLCAweDgwOWIxYjgwLCAweGUyM2RkZmUyLCAweGViMjZjZGViLCAweDI3Njk0ZTI3LCAweGIyY2Q3ZmIyLCAweDc1OWZlYTc1LCAweDA5MWIxMjA5LCAweDgzOWUxZDgzLCAweDJjNzQ1ODJjLCAweDFhMmUzNDFhLCAweDFiMmQzNjFiLCAweDZlYjJkYzZlLCAweDVhZWViNDVhLCAweGEwZmI1YmEwLCAweDUyZjZhNDUyLCAweDNiNGQ3NjNiLCAweGQ2NjFiN2Q2LCAweGIzY2U3ZGIzLCAweDI5N2I1MjI5LCAweGUzM2VkZGUzLCAweDJmNzE1ZTJmLCAweDg0OTcxMzg0LCAweDUzZjVhNjUzLCAweGQxNjhiOWQxLCAweDAwMDAwMDAwLCAweGVkMmNjMWVkLCAweDIwNjA0MDIwLCAweGZjMWZlM2ZjLCAweGIxYzg3OWIxLCAweDViZWRiNjViLCAweDZhYmVkNDZhLCAweGNiNDY4ZGNiLCAweGJlZDk2N2JlLCAweDM5NGI3MjM5LCAweDRhZGU5NDRhLCAweDRjZDQ5ODRjLCAweDU4ZThiMDU4LCAweGNmNGE4NWNmLCAweGQwNmJiYmQwLCAweGVmMmFjNWVmLCAweGFhZTU0ZmFhLCAweGZiMTZlZGZiLCAweDQzYzU4NjQzLCAweDRkZDc5YTRkLCAweDMzNTU2NjMzLCAweDg1OTQxMTg1LCAweDQ1Y2Y4YTQ1LCAweGY5MTBlOWY5LCAweDAyMDYwNDAyLCAweDdmODFmZTdmLCAweDUwZjBhMDUwLCAweDNjNDQ3ODNjLCAweDlmYmEyNTlmLCAweGE4ZTM0YmE4LCAweDUxZjNhMjUxLCAweGEzZmU1ZGEzLCAweDQwYzA4MDQwLCAweDhmOGEwNThmLCAweDkyYWQzZjkyLCAweDlkYmMyMTlkLCAweDM4NDg3MDM4LCAweGY1MDRmMWY1LCAweGJjZGY2M2JjLCAweGI2YzE3N2I2LCAweGRhNzVhZmRhLCAweDIxNjM0MjIxLCAweDEwMzAyMDEwLCAweGZmMWFlNWZmLCAweGYzMGVmZGYzLCAweGQyNmRiZmQyLCAweGNkNGM4MWNkLCAweDBjMTQxODBjLCAweDEzMzUyNjEzLCAweGVjMmZjM2VjLCAweDVmZTFiZTVmLCAweDk3YTIzNTk3LCAweDQ0Y2M4ODQ0LCAweDE3MzkyZTE3LCAweGM0NTc5M2M0LCAweGE3ZjI1NWE3LCAweDdlODJmYzdlLCAweDNkNDc3YTNkLCAweDY0YWNjODY0LCAweDVkZTdiYTVkLCAweDE5MmIzMjE5LCAweDczOTVlNjczLCAweDYwYTBjMDYwLCAweDgxOTgxOTgxLCAweDRmZDE5ZTRmLCAweGRjN2ZhM2RjLCAweDIyNjY0NDIyLCAweDJhN2U1NDJhLCAweDkwYWIzYjkwLCAweDg4ODMwYjg4LCAweDQ2Y2E4YzQ2LCAweGVlMjljN2VlLCAweGI4ZDM2YmI4LCAweDE0M2MyODE0LCAweGRlNzlhN2RlLCAweDVlZTJiYzVlLCAweDBiMWQxNjBiLCAweGRiNzZhZGRiLCAweGUwM2JkYmUwLCAweDMyNTY2NDMyLCAweDNhNGU3NDNhLCAweDBhMWUxNDBhLCAweDQ5ZGI5MjQ5LCAweDA2MGEwYzA2LCAweDI0NmM0ODI0LCAweDVjZTRiODVjLCAweGMyNWQ5ZmMyLCAweGQzNmViZGQzLCAweGFjZWY0M2FjLCAweDYyYTZjNDYyLCAweDkxYTgzOTkxLCAweDk1YTQzMTk1LCAweGU0MzdkM2U0LCAweDc5OGJmMjc5LCAweGU3MzJkNWU3LCAweGM4NDM4YmM4LCAweDM3NTk2ZTM3LCAweDZkYjdkYTZkLCAweDhkOGMwMThkLCAweGQ1NjRiMWQ1LCAweDRlZDI5YzRlLCAweGE5ZTA0OWE5LCAweDZjYjRkODZjLCAweDU2ZmFhYzU2LCAweGY0MDdmM2Y0LCAweGVhMjVjZmVhLCAweDY1YWZjYTY1LCAweDdhOGVmNDdhLCAweGFlZTk0N2FlLCAweDA4MTgxMDA4LCAweGJhZDU2ZmJhLCAweDc4ODhmMDc4LCAweDI1NmY0YTI1LCAweDJlNzI1YzJlLCAweDFjMjQzODFjLCAweGE2ZjE1N2E2LCAweGI0Yzc3M2I0LCAweGM2NTE5N2M2LCAweGU4MjNjYmU4LCAweGRkN2NhMWRkLCAweDc0OWNlODc0LCAweDFmMjEzZTFmLCAweDRiZGQ5NjRiLCAweGJkZGM2MWJkLCAweDhiODYwZDhiLCAweDhhODUwZjhhLCAweDcwOTBlMDcwLCAweDNlNDI3YzNlLCAweGI1YzQ3MWI1LCAweDY2YWFjYzY2LCAweDQ4ZDg5MDQ4LCAweDAzMDUwNjAzLCAweGY2MDFmN2Y2LCAweDBlMTIxYzBlLCAweDYxYTNjMjYxLCAweDM1NWY2YTM1LCAweDU3ZjlhZTU3LCAweGI5ZDA2OWI5LCAweDg2OTExNzg2LCAweGMxNTg5OWMxLCAweDFkMjczYTFkLCAweDllYjkyNzllLCAweGUxMzhkOWUxLCAweGY4MTNlYmY4LCAweDk4YjMyYjk4LCAweDExMzMyMjExLCAweDY5YmJkMjY5LCAweGQ5NzBhOWQ5LCAweDhlODkwNzhlLCAweDk0YTczMzk0LCAweDliYjYyZDliLCAweDFlMjIzYzFlLCAweDg3OTIxNTg3LCAweGU5MjBjOWU5LCAweGNlNDk4N2NlLCAweDU1ZmZhYTU1LCAweDI4Nzg1MDI4LCAweGRmN2FhNWRmLCAweDhjOGYwMzhjLCAweGExZjg1OWExLCAweDg5ODAwOTg5LCAweDBkMTcxYTBkLCAweGJmZGE2NWJmLCAweGU2MzFkN2U2LCAweDQyYzY4NDQyLCAweDY4YjhkMDY4LCAweDQxYzM4MjQxLCAweDk5YjAyOTk5LCAweDJkNzc1YTJkLCAweDBmMTExZTBmLCAweGIwY2I3YmIwLCAweDU0ZmNhODU0LCAweGJiZDY2ZGJiLCAweDE2M2EyYzE2XTtcbiAgICB2YXIgVDQgPSBbMHg2MzYzYTVjNiwgMHg3YzdjODRmOCwgMHg3Nzc3OTllZSwgMHg3YjdiOGRmNiwgMHhmMmYyMGRmZiwgMHg2YjZiYmRkNiwgMHg2ZjZmYjFkZSwgMHhjNWM1NTQ5MSwgMHgzMDMwNTA2MCwgMHgwMTAxMDMwMiwgMHg2NzY3YTljZSwgMHgyYjJiN2Q1NiwgMHhmZWZlMTllNywgMHhkN2Q3NjJiNSwgMHhhYmFiZTY0ZCwgMHg3Njc2OWFlYywgMHhjYWNhNDU4ZiwgMHg4MjgyOWQxZiwgMHhjOWM5NDA4OSwgMHg3ZDdkODdmYSwgMHhmYWZhMTVlZiwgMHg1OTU5ZWJiMiwgMHg0NzQ3Yzk4ZSwgMHhmMGYwMGJmYiwgMHhhZGFkZWM0MSwgMHhkNGQ0NjdiMywgMHhhMmEyZmQ1ZiwgMHhhZmFmZWE0NSwgMHg5YzljYmYyMywgMHhhNGE0Zjc1MywgMHg3MjcyOTZlNCwgMHhjMGMwNWI5YiwgMHhiN2I3YzI3NSwgMHhmZGZkMWNlMSwgMHg5MzkzYWUzZCwgMHgyNjI2NmE0YywgMHgzNjM2NWE2YywgMHgzZjNmNDE3ZSwgMHhmN2Y3MDJmNSwgMHhjY2NjNGY4MywgMHgzNDM0NWM2OCwgMHhhNWE1ZjQ1MSwgMHhlNWU1MzRkMSwgMHhmMWYxMDhmOSwgMHg3MTcxOTNlMiwgMHhkOGQ4NzNhYiwgMHgzMTMxNTM2MiwgMHgxNTE1M2YyYSwgMHgwNDA0MGMwOCwgMHhjN2M3NTI5NSwgMHgyMzIzNjU0NiwgMHhjM2MzNWU5ZCwgMHgxODE4MjgzMCwgMHg5Njk2YTEzNywgMHgwNTA1MGYwYSwgMHg5YTlhYjUyZiwgMHgwNzA3MDkwZSwgMHgxMjEyMzYyNCwgMHg4MDgwOWIxYiwgMHhlMmUyM2RkZiwgMHhlYmViMjZjZCwgMHgyNzI3Njk0ZSwgMHhiMmIyY2Q3ZiwgMHg3NTc1OWZlYSwgMHgwOTA5MWIxMiwgMHg4MzgzOWUxZCwgMHgyYzJjNzQ1OCwgMHgxYTFhMmUzNCwgMHgxYjFiMmQzNiwgMHg2ZTZlYjJkYywgMHg1YTVhZWViNCwgMHhhMGEwZmI1YiwgMHg1MjUyZjZhNCwgMHgzYjNiNGQ3NiwgMHhkNmQ2NjFiNywgMHhiM2IzY2U3ZCwgMHgyOTI5N2I1MiwgMHhlM2UzM2VkZCwgMHgyZjJmNzE1ZSwgMHg4NDg0OTcxMywgMHg1MzUzZjVhNiwgMHhkMWQxNjhiOSwgMHgwMDAwMDAwMCwgMHhlZGVkMmNjMSwgMHgyMDIwNjA0MCwgMHhmY2ZjMWZlMywgMHhiMWIxYzg3OSwgMHg1YjViZWRiNiwgMHg2YTZhYmVkNCwgMHhjYmNiNDY4ZCwgMHhiZWJlZDk2NywgMHgzOTM5NGI3MiwgMHg0YTRhZGU5NCwgMHg0YzRjZDQ5OCwgMHg1ODU4ZThiMCwgMHhjZmNmNGE4NSwgMHhkMGQwNmJiYiwgMHhlZmVmMmFjNSwgMHhhYWFhZTU0ZiwgMHhmYmZiMTZlZCwgMHg0MzQzYzU4NiwgMHg0ZDRkZDc5YSwgMHgzMzMzNTU2NiwgMHg4NTg1OTQxMSwgMHg0NTQ1Y2Y4YSwgMHhmOWY5MTBlOSwgMHgwMjAyMDYwNCwgMHg3ZjdmODFmZSwgMHg1MDUwZjBhMCwgMHgzYzNjNDQ3OCwgMHg5ZjlmYmEyNSwgMHhhOGE4ZTM0YiwgMHg1MTUxZjNhMiwgMHhhM2EzZmU1ZCwgMHg0MDQwYzA4MCwgMHg4ZjhmOGEwNSwgMHg5MjkyYWQzZiwgMHg5ZDlkYmMyMSwgMHgzODM4NDg3MCwgMHhmNWY1MDRmMSwgMHhiY2JjZGY2MywgMHhiNmI2YzE3NywgMHhkYWRhNzVhZiwgMHgyMTIxNjM0MiwgMHgxMDEwMzAyMCwgMHhmZmZmMWFlNSwgMHhmM2YzMGVmZCwgMHhkMmQyNmRiZiwgMHhjZGNkNGM4MSwgMHgwYzBjMTQxOCwgMHgxMzEzMzUyNiwgMHhlY2VjMmZjMywgMHg1ZjVmZTFiZSwgMHg5Nzk3YTIzNSwgMHg0NDQ0Y2M4OCwgMHgxNzE3MzkyZSwgMHhjNGM0NTc5MywgMHhhN2E3ZjI1NSwgMHg3ZTdlODJmYywgMHgzZDNkNDc3YSwgMHg2NDY0YWNjOCwgMHg1ZDVkZTdiYSwgMHgxOTE5MmIzMiwgMHg3MzczOTVlNiwgMHg2MDYwYTBjMCwgMHg4MTgxOTgxOSwgMHg0ZjRmZDE5ZSwgMHhkY2RjN2ZhMywgMHgyMjIyNjY0NCwgMHgyYTJhN2U1NCwgMHg5MDkwYWIzYiwgMHg4ODg4ODMwYiwgMHg0NjQ2Y2E4YywgMHhlZWVlMjljNywgMHhiOGI4ZDM2YiwgMHgxNDE0M2MyOCwgMHhkZWRlNzlhNywgMHg1ZTVlZTJiYywgMHgwYjBiMWQxNiwgMHhkYmRiNzZhZCwgMHhlMGUwM2JkYiwgMHgzMjMyNTY2NCwgMHgzYTNhNGU3NCwgMHgwYTBhMWUxNCwgMHg0OTQ5ZGI5MiwgMHgwNjA2MGEwYywgMHgyNDI0NmM0OCwgMHg1YzVjZTRiOCwgMHhjMmMyNWQ5ZiwgMHhkM2QzNmViZCwgMHhhY2FjZWY0MywgMHg2MjYyYTZjNCwgMHg5MTkxYTgzOSwgMHg5NTk1YTQzMSwgMHhlNGU0MzdkMywgMHg3OTc5OGJmMiwgMHhlN2U3MzJkNSwgMHhjOGM4NDM4YiwgMHgzNzM3NTk2ZSwgMHg2ZDZkYjdkYSwgMHg4ZDhkOGMwMSwgMHhkNWQ1NjRiMSwgMHg0ZTRlZDI5YywgMHhhOWE5ZTA0OSwgMHg2YzZjYjRkOCwgMHg1NjU2ZmFhYywgMHhmNGY0MDdmMywgMHhlYWVhMjVjZiwgMHg2NTY1YWZjYSwgMHg3YTdhOGVmNCwgMHhhZWFlZTk0NywgMHgwODA4MTgxMCwgMHhiYWJhZDU2ZiwgMHg3ODc4ODhmMCwgMHgyNTI1NmY0YSwgMHgyZTJlNzI1YywgMHgxYzFjMjQzOCwgMHhhNmE2ZjE1NywgMHhiNGI0Yzc3MywgMHhjNmM2NTE5NywgMHhlOGU4MjNjYiwgMHhkZGRkN2NhMSwgMHg3NDc0OWNlOCwgMHgxZjFmMjEzZSwgMHg0YjRiZGQ5NiwgMHhiZGJkZGM2MSwgMHg4YjhiODYwZCwgMHg4YThhODUwZiwgMHg3MDcwOTBlMCwgMHgzZTNlNDI3YywgMHhiNWI1YzQ3MSwgMHg2NjY2YWFjYywgMHg0ODQ4ZDg5MCwgMHgwMzAzMDUwNiwgMHhmNmY2MDFmNywgMHgwZTBlMTIxYywgMHg2MTYxYTNjMiwgMHgzNTM1NWY2YSwgMHg1NzU3ZjlhZSwgMHhiOWI5ZDA2OSwgMHg4Njg2OTExNywgMHhjMWMxNTg5OSwgMHgxZDFkMjczYSwgMHg5ZTllYjkyNywgMHhlMWUxMzhkOSwgMHhmOGY4MTNlYiwgMHg5ODk4YjMyYiwgMHgxMTExMzMyMiwgMHg2OTY5YmJkMiwgMHhkOWQ5NzBhOSwgMHg4ZThlODkwNywgMHg5NDk0YTczMywgMHg5YjliYjYyZCwgMHgxZTFlMjIzYywgMHg4Nzg3OTIxNSwgMHhlOWU5MjBjOSwgMHhjZWNlNDk4NywgMHg1NTU1ZmZhYSwgMHgyODI4Nzg1MCwgMHhkZmRmN2FhNSwgMHg4YzhjOGYwMywgMHhhMWExZjg1OSwgMHg4OTg5ODAwOSwgMHgwZDBkMTcxYSwgMHhiZmJmZGE2NSwgMHhlNmU2MzFkNywgMHg0MjQyYzY4NCwgMHg2ODY4YjhkMCwgMHg0MTQxYzM4MiwgMHg5OTk5YjAyOSwgMHgyZDJkNzc1YSwgMHgwZjBmMTExZSwgMHhiMGIwY2I3YiwgMHg1NDU0ZmNhOCwgMHhiYmJiZDY2ZCwgMHgxNjE2M2EyY107XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGRlY3J5cHRpb25cbiAgICB2YXIgVDUgPSBbMHg1MWY0YTc1MCwgMHg3ZTQxNjU1MywgMHgxYTE3YTRjMywgMHgzYTI3NWU5NiwgMHgzYmFiNmJjYiwgMHgxZjlkNDVmMSwgMHhhY2ZhNThhYiwgMHg0YmUzMDM5MywgMHgyMDMwZmE1NSwgMHhhZDc2NmRmNiwgMHg4OGNjNzY5MSwgMHhmNTAyNGMyNSwgMHg0ZmU1ZDdmYywgMHhjNTJhY2JkNywgMHgyNjM1NDQ4MCwgMHhiNTYyYTM4ZiwgMHhkZWIxNWE0OSwgMHgyNWJhMWI2NywgMHg0NWVhMGU5OCwgMHg1ZGZlYzBlMSwgMHhjMzJmNzUwMiwgMHg4MTRjZjAxMiwgMHg4ZDQ2OTdhMywgMHg2YmQzZjljNiwgMHgwMzhmNWZlNywgMHgxNTkyOWM5NSwgMHhiZjZkN2FlYiwgMHg5NTUyNTlkYSwgMHhkNGJlODMyZCwgMHg1ODc0MjFkMywgMHg0OWUwNjkyOSwgMHg4ZWM5Yzg0NCwgMHg3NWMyODk2YSwgMHhmNDhlNzk3OCwgMHg5OTU4M2U2YiwgMHgyN2I5NzFkZCwgMHhiZWUxNGZiNiwgMHhmMDg4YWQxNywgMHhjOTIwYWM2NiwgMHg3ZGNlM2FiNCwgMHg2M2RmNGExOCwgMHhlNTFhMzE4MiwgMHg5NzUxMzM2MCwgMHg2MjUzN2Y0NSwgMHhiMTY0NzdlMCwgMHhiYjZiYWU4NCwgMHhmZTgxYTAxYywgMHhmOTA4MmI5NCwgMHg3MDQ4Njg1OCwgMHg4ZjQ1ZmQxOSwgMHg5NGRlNmM4NywgMHg1MjdiZjhiNywgMHhhYjczZDMyMywgMHg3MjRiMDJlMiwgMHhlMzFmOGY1NywgMHg2NjU1YWIyYSwgMHhiMmViMjgwNywgMHgyZmI1YzIwMywgMHg4NmM1N2I5YSwgMHhkMzM3MDhhNSwgMHgzMDI4ODdmMiwgMHgyM2JmYTViMiwgMHgwMjAzNmFiYSwgMHhlZDE2ODI1YywgMHg4YWNmMWMyYiwgMHhhNzc5YjQ5MiwgMHhmMzA3ZjJmMCwgMHg0ZTY5ZTJhMSwgMHg2NWRhZjRjZCwgMHgwNjA1YmVkNSwgMHhkMTM0NjIxZiwgMHhjNGE2ZmU4YSwgMHgzNDJlNTM5ZCwgMHhhMmYzNTVhMCwgMHgwNThhZTEzMiwgMHhhNGY2ZWI3NSwgMHgwYjgzZWMzOSwgMHg0MDYwZWZhYSwgMHg1ZTcxOWYwNiwgMHhiZDZlMTA1MSwgMHgzZTIxOGFmOSwgMHg5NmRkMDYzZCwgMHhkZDNlMDVhZSwgMHg0ZGU2YmQ0NiwgMHg5MTU0OGRiNSwgMHg3MWM0NWQwNSwgMHgwNDA2ZDQ2ZiwgMHg2MDUwMTVmZiwgMHgxOTk4ZmIyNCwgMHhkNmJkZTk5NywgMHg4OTQwNDNjYywgMHg2N2Q5OWU3NywgMHhiMGU4NDJiZCwgMHgwNzg5OGI4OCwgMHhlNzE5NWIzOCwgMHg3OWM4ZWVkYiwgMHhhMTdjMGE0NywgMHg3YzQyMGZlOSwgMHhmODg0MWVjOSwgMHgwMDAwMDAwMCwgMHgwOTgwODY4MywgMHgzMjJiZWQ0OCwgMHgxZTExNzBhYywgMHg2YzVhNzI0ZSwgMHhmZDBlZmZmYiwgMHgwZjg1Mzg1NiwgMHgzZGFlZDUxZSwgMHgzNjJkMzkyNywgMHgwYTBmZDk2NCwgMHg2ODVjYTYyMSwgMHg5YjViNTRkMSwgMHgyNDM2MmUzYSwgMHgwYzBhNjdiMSwgMHg5MzU3ZTcwZiwgMHhiNGVlOTZkMiwgMHgxYjliOTE5ZSwgMHg4MGMwYzU0ZiwgMHg2MWRjMjBhMiwgMHg1YTc3NGI2OSwgMHgxYzEyMWExNiwgMHhlMjkzYmEwYSwgMHhjMGEwMmFlNSwgMHgzYzIyZTA0MywgMHgxMjFiMTcxZCwgMHgwZTA5MGQwYiwgMHhmMjhiYzdhZCwgMHgyZGI2YThiOSwgMHgxNDFlYTljOCwgMHg1N2YxMTk4NSwgMHhhZjc1MDc0YywgMHhlZTk5ZGRiYiwgMHhhMzdmNjBmZCwgMHhmNzAxMjY5ZiwgMHg1YzcyZjViYywgMHg0NDY2M2JjNSwgMHg1YmZiN2UzNCwgMHg4YjQzMjk3NiwgMHhjYjIzYzZkYywgMHhiNmVkZmM2OCwgMHhiOGU0ZjE2MywgMHhkNzMxZGNjYSwgMHg0MjYzODUxMCwgMHgxMzk3MjI0MCwgMHg4NGM2MTEyMCwgMHg4NTRhMjQ3ZCwgMHhkMmJiM2RmOCwgMHhhZWY5MzIxMSwgMHhjNzI5YTE2ZCwgMHgxZDllMmY0YiwgMHhkY2IyMzBmMywgMHgwZDg2NTJlYywgMHg3N2MxZTNkMCwgMHgyYmIzMTY2YywgMHhhOTcwYjk5OSwgMHgxMTk0NDhmYSwgMHg0N2U5NjQyMiwgMHhhOGZjOGNjNCwgMHhhMGYwM2YxYSwgMHg1NjdkMmNkOCwgMHgyMjMzOTBlZiwgMHg4NzQ5NGVjNywgMHhkOTM4ZDFjMSwgMHg4Y2NhYTJmZSwgMHg5OGQ0MGIzNiwgMHhhNmY1ODFjZiwgMHhhNTdhZGUyOCwgMHhkYWI3OGUyNiwgMHgzZmFkYmZhNCwgMHgyYzNhOWRlNCwgMHg1MDc4OTIwZCwgMHg2YTVmY2M5YiwgMHg1NDdlNDY2MiwgMHhmNjhkMTNjMiwgMHg5MGQ4YjhlOCwgMHgyZTM5Zjc1ZSwgMHg4MmMzYWZmNSwgMHg5ZjVkODBiZSwgMHg2OWQwOTM3YywgMHg2ZmQ1MmRhOSwgMHhjZjI1MTJiMywgMHhjOGFjOTkzYiwgMHgxMDE4N2RhNywgMHhlODljNjM2ZSwgMHhkYjNiYmI3YiwgMHhjZDI2NzgwOSwgMHg2ZTU5MThmNCwgMHhlYzlhYjcwMSwgMHg4MzRmOWFhOCwgMHhlNjk1NmU2NSwgMHhhYWZmZTY3ZSwgMHgyMWJjY2YwOCwgMHhlZjE1ZThlNiwgMHhiYWU3OWJkOSwgMHg0YTZmMzZjZSwgMHhlYTlmMDlkNCwgMHgyOWIwN2NkNiwgMHgzMWE0YjJhZiwgMHgyYTNmMjMzMSwgMHhjNmE1OTQzMCwgMHgzNWEyNjZjMCwgMHg3NDRlYmMzNywgMHhmYzgyY2FhNiwgMHhlMDkwZDBiMCwgMHgzM2E3ZDgxNSwgMHhmMTA0OTg0YSwgMHg0MWVjZGFmNywgMHg3ZmNkNTAwZSwgMHgxNzkxZjYyZiwgMHg3NjRkZDY4ZCwgMHg0M2VmYjA0ZCwgMHhjY2FhNGQ1NCwgMHhlNDk2MDRkZiwgMHg5ZWQxYjVlMywgMHg0YzZhODgxYiwgMHhjMTJjMWZiOCwgMHg0NjY1NTE3ZiwgMHg5ZDVlZWEwNCwgMHgwMThjMzU1ZCwgMHhmYTg3NzQ3MywgMHhmYjBiNDEyZSwgMHhiMzY3MWQ1YSwgMHg5MmRiZDI1MiwgMHhlOTEwNTYzMywgMHg2ZGQ2NDcxMywgMHg5YWQ3NjE4YywgMHgzN2ExMGM3YSwgMHg1OWY4MTQ4ZSwgMHhlYjEzM2M4OSwgMHhjZWE5MjdlZSwgMHhiNzYxYzkzNSwgMHhlMTFjZTVlZCwgMHg3YTQ3YjEzYywgMHg5Y2QyZGY1OSwgMHg1NWYyNzMzZiwgMHgxODE0Y2U3OSwgMHg3M2M3MzdiZiwgMHg1M2Y3Y2RlYSwgMHg1ZmZkYWE1YiwgMHhkZjNkNmYxNCwgMHg3ODQ0ZGI4NiwgMHhjYWFmZjM4MSwgMHhiOTY4YzQzZSwgMHgzODI0MzQyYywgMHhjMmEzNDA1ZiwgMHgxNjFkYzM3MiwgMHhiY2UyMjUwYywgMHgyODNjNDk4YiwgMHhmZjBkOTU0MSwgMHgzOWE4MDE3MSwgMHgwODBjYjNkZSwgMHhkOGI0ZTQ5YywgMHg2NDU2YzE5MCwgMHg3YmNiODQ2MSwgMHhkNTMyYjY3MCwgMHg0ODZjNWM3NCwgMHhkMGI4NTc0Ml07XG4gICAgdmFyIFQ2ID0gWzB4NTA1MWY0YTcsIDB4NTM3ZTQxNjUsIDB4YzMxYTE3YTQsIDB4OTYzYTI3NWUsIDB4Y2IzYmFiNmIsIDB4ZjExZjlkNDUsIDB4YWJhY2ZhNTgsIDB4OTM0YmUzMDMsIDB4NTUyMDMwZmEsIDB4ZjZhZDc2NmQsIDB4OTE4OGNjNzYsIDB4MjVmNTAyNGMsIDB4ZmM0ZmU1ZDcsIDB4ZDdjNTJhY2IsIDB4ODAyNjM1NDQsIDB4OGZiNTYyYTMsIDB4NDlkZWIxNWEsIDB4NjcyNWJhMWIsIDB4OTg0NWVhMGUsIDB4ZTE1ZGZlYzAsIDB4MDJjMzJmNzUsIDB4MTI4MTRjZjAsIDB4YTM4ZDQ2OTcsIDB4YzY2YmQzZjksIDB4ZTcwMzhmNWYsIDB4OTUxNTkyOWMsIDB4ZWJiZjZkN2EsIDB4ZGE5NTUyNTksIDB4MmRkNGJlODMsIDB4ZDM1ODc0MjEsIDB4Mjk0OWUwNjksIDB4NDQ4ZWM5YzgsIDB4NmE3NWMyODksIDB4NzhmNDhlNzksIDB4NmI5OTU4M2UsIDB4ZGQyN2I5NzEsIDB4YjZiZWUxNGYsIDB4MTdmMDg4YWQsIDB4NjZjOTIwYWMsIDB4YjQ3ZGNlM2EsIDB4MTg2M2RmNGEsIDB4ODJlNTFhMzEsIDB4NjA5NzUxMzMsIDB4NDU2MjUzN2YsIDB4ZTBiMTY0NzcsIDB4ODRiYjZiYWUsIDB4MWNmZTgxYTAsIDB4OTRmOTA4MmIsIDB4NTg3MDQ4NjgsIDB4MTk4ZjQ1ZmQsIDB4ODc5NGRlNmMsIDB4Yjc1MjdiZjgsIDB4MjNhYjczZDMsIDB4ZTI3MjRiMDIsIDB4NTdlMzFmOGYsIDB4MmE2NjU1YWIsIDB4MDdiMmViMjgsIDB4MDMyZmI1YzIsIDB4OWE4NmM1N2IsIDB4YTVkMzM3MDgsIDB4ZjIzMDI4ODcsIDB4YjIyM2JmYTUsIDB4YmEwMjAzNmEsIDB4NWNlZDE2ODIsIDB4MmI4YWNmMWMsIDB4OTJhNzc5YjQsIDB4ZjBmMzA3ZjIsIDB4YTE0ZTY5ZTIsIDB4Y2Q2NWRhZjQsIDB4ZDUwNjA1YmUsIDB4MWZkMTM0NjIsIDB4OGFjNGE2ZmUsIDB4OWQzNDJlNTMsIDB4YTBhMmYzNTUsIDB4MzIwNThhZTEsIDB4NzVhNGY2ZWIsIDB4MzkwYjgzZWMsIDB4YWE0MDYwZWYsIDB4MDY1ZTcxOWYsIDB4NTFiZDZlMTAsIDB4ZjkzZTIxOGEsIDB4M2Q5NmRkMDYsIDB4YWVkZDNlMDUsIDB4NDY0ZGU2YmQsIDB4YjU5MTU0OGQsIDB4MDU3MWM0NWQsIDB4NmYwNDA2ZDQsIDB4ZmY2MDUwMTUsIDB4MjQxOTk4ZmIsIDB4OTdkNmJkZTksIDB4Y2M4OTQwNDMsIDB4Nzc2N2Q5OWUsIDB4YmRiMGU4NDIsIDB4ODgwNzg5OGIsIDB4MzhlNzE5NWIsIDB4ZGI3OWM4ZWUsIDB4NDdhMTdjMGEsIDB4ZTk3YzQyMGYsIDB4YzlmODg0MWUsIDB4MDAwMDAwMDAsIDB4ODMwOTgwODYsIDB4NDgzMjJiZWQsIDB4YWMxZTExNzAsIDB4NGU2YzVhNzIsIDB4ZmJmZDBlZmYsIDB4NTYwZjg1MzgsIDB4MWUzZGFlZDUsIDB4MjczNjJkMzksIDB4NjQwYTBmZDksIDB4MjE2ODVjYTYsIDB4ZDE5YjViNTQsIDB4M2EyNDM2MmUsIDB4YjEwYzBhNjcsIDB4MGY5MzU3ZTcsIDB4ZDJiNGVlOTYsIDB4OWUxYjliOTEsIDB4NGY4MGMwYzUsIDB4YTI2MWRjMjAsIDB4Njk1YTc3NGIsIDB4MTYxYzEyMWEsIDB4MGFlMjkzYmEsIDB4ZTVjMGEwMmEsIDB4NDMzYzIyZTAsIDB4MWQxMjFiMTcsIDB4MGIwZTA5MGQsIDB4YWRmMjhiYzcsIDB4YjkyZGI2YTgsIDB4YzgxNDFlYTksIDB4ODU1N2YxMTksIDB4NGNhZjc1MDcsIDB4YmJlZTk5ZGQsIDB4ZmRhMzdmNjAsIDB4OWZmNzAxMjYsIDB4YmM1YzcyZjUsIDB4YzU0NDY2M2IsIDB4MzQ1YmZiN2UsIDB4NzY4YjQzMjksIDB4ZGNjYjIzYzYsIDB4NjhiNmVkZmMsIDB4NjNiOGU0ZjEsIDB4Y2FkNzMxZGMsIDB4MTA0MjYzODUsIDB4NDAxMzk3MjIsIDB4MjA4NGM2MTEsIDB4N2Q4NTRhMjQsIDB4ZjhkMmJiM2QsIDB4MTFhZWY5MzIsIDB4NmRjNzI5YTEsIDB4NGIxZDllMmYsIDB4ZjNkY2IyMzAsIDB4ZWMwZDg2NTIsIDB4ZDA3N2MxZTMsIDB4NmMyYmIzMTYsIDB4OTlhOTcwYjksIDB4ZmExMTk0NDgsIDB4MjI0N2U5NjQsIDB4YzRhOGZjOGMsIDB4MWFhMGYwM2YsIDB4ZDg1NjdkMmMsIDB4ZWYyMjMzOTAsIDB4Yzc4NzQ5NGUsIDB4YzFkOTM4ZDEsIDB4ZmU4Y2NhYTIsIDB4MzY5OGQ0MGIsIDB4Y2ZhNmY1ODEsIDB4MjhhNTdhZGUsIDB4MjZkYWI3OGUsIDB4YTQzZmFkYmYsIDB4ZTQyYzNhOWQsIDB4MGQ1MDc4OTIsIDB4OWI2YTVmY2MsIDB4NjI1NDdlNDYsIDB4YzJmNjhkMTMsIDB4ZTg5MGQ4YjgsIDB4NWUyZTM5ZjcsIDB4ZjU4MmMzYWYsIDB4YmU5ZjVkODAsIDB4N2M2OWQwOTMsIDB4YTk2ZmQ1MmQsIDB4YjNjZjI1MTIsIDB4M2JjOGFjOTksIDB4YTcxMDE4N2QsIDB4NmVlODljNjMsIDB4N2JkYjNiYmIsIDB4MDljZDI2NzgsIDB4ZjQ2ZTU5MTgsIDB4MDFlYzlhYjcsIDB4YTg4MzRmOWEsIDB4NjVlNjk1NmUsIDB4N2VhYWZmZTYsIDB4MDgyMWJjY2YsIDB4ZTZlZjE1ZTgsIDB4ZDliYWU3OWIsIDB4Y2U0YTZmMzYsIDB4ZDRlYTlmMDksIDB4ZDYyOWIwN2MsIDB4YWYzMWE0YjIsIDB4MzEyYTNmMjMsIDB4MzBjNmE1OTQsIDB4YzAzNWEyNjYsIDB4Mzc3NDRlYmMsIDB4YTZmYzgyY2EsIDB4YjBlMDkwZDAsIDB4MTUzM2E3ZDgsIDB4NGFmMTA0OTgsIDB4Zjc0MWVjZGEsIDB4MGU3ZmNkNTAsIDB4MmYxNzkxZjYsIDB4OGQ3NjRkZDYsIDB4NGQ0M2VmYjAsIDB4NTRjY2FhNGQsIDB4ZGZlNDk2MDQsIDB4ZTM5ZWQxYjUsIDB4MWI0YzZhODgsIDB4YjhjMTJjMWYsIDB4N2Y0NjY1NTEsIDB4MDQ5ZDVlZWEsIDB4NWQwMThjMzUsIDB4NzNmYTg3NzQsIDB4MmVmYjBiNDEsIDB4NWFiMzY3MWQsIDB4NTI5MmRiZDIsIDB4MzNlOTEwNTYsIDB4MTM2ZGQ2NDcsIDB4OGM5YWQ3NjEsIDB4N2EzN2ExMGMsIDB4OGU1OWY4MTQsIDB4ODllYjEzM2MsIDB4ZWVjZWE5MjcsIDB4MzViNzYxYzksIDB4ZWRlMTFjZTUsIDB4M2M3YTQ3YjEsIDB4NTk5Y2QyZGYsIDB4M2Y1NWYyNzMsIDB4NzkxODE0Y2UsIDB4YmY3M2M3MzcsIDB4ZWE1M2Y3Y2QsIDB4NWI1ZmZkYWEsIDB4MTRkZjNkNmYsIDB4ODY3ODQ0ZGIsIDB4ODFjYWFmZjMsIDB4M2ViOTY4YzQsIDB4MmMzODI0MzQsIDB4NWZjMmEzNDAsIDB4NzIxNjFkYzMsIDB4MGNiY2UyMjUsIDB4OGIyODNjNDksIDB4NDFmZjBkOTUsIDB4NzEzOWE4MDEsIDB4ZGUwODBjYjMsIDB4OWNkOGI0ZTQsIDB4OTA2NDU2YzEsIDB4NjE3YmNiODQsIDB4NzBkNTMyYjYsIDB4NzQ0ODZjNWMsIDB4NDJkMGI4NTddO1xuICAgIHZhciBUNyA9IFsweGE3NTA1MWY0LCAweDY1NTM3ZTQxLCAweGE0YzMxYTE3LCAweDVlOTYzYTI3LCAweDZiY2IzYmFiLCAweDQ1ZjExZjlkLCAweDU4YWJhY2ZhLCAweDAzOTM0YmUzLCAweGZhNTUyMDMwLCAweDZkZjZhZDc2LCAweDc2OTE4OGNjLCAweDRjMjVmNTAyLCAweGQ3ZmM0ZmU1LCAweGNiZDdjNTJhLCAweDQ0ODAyNjM1LCAweGEzOGZiNTYyLCAweDVhNDlkZWIxLCAweDFiNjcyNWJhLCAweDBlOTg0NWVhLCAweGMwZTE1ZGZlLCAweDc1MDJjMzJmLCAweGYwMTI4MTRjLCAweDk3YTM4ZDQ2LCAweGY5YzY2YmQzLCAweDVmZTcwMzhmLCAweDljOTUxNTkyLCAweDdhZWJiZjZkLCAweDU5ZGE5NTUyLCAweDgzMmRkNGJlLCAweDIxZDM1ODc0LCAweDY5Mjk0OWUwLCAweGM4NDQ4ZWM5LCAweDg5NmE3NWMyLCAweDc5NzhmNDhlLCAweDNlNmI5OTU4LCAweDcxZGQyN2I5LCAweDRmYjZiZWUxLCAweGFkMTdmMDg4LCAweGFjNjZjOTIwLCAweDNhYjQ3ZGNlLCAweDRhMTg2M2RmLCAweDMxODJlNTFhLCAweDMzNjA5NzUxLCAweDdmNDU2MjUzLCAweDc3ZTBiMTY0LCAweGFlODRiYjZiLCAweGEwMWNmZTgxLCAweDJiOTRmOTA4LCAweDY4NTg3MDQ4LCAweGZkMTk4ZjQ1LCAweDZjODc5NGRlLCAweGY4Yjc1MjdiLCAweGQzMjNhYjczLCAweDAyZTI3MjRiLCAweDhmNTdlMzFmLCAweGFiMmE2NjU1LCAweDI4MDdiMmViLCAweGMyMDMyZmI1LCAweDdiOWE4NmM1LCAweDA4YTVkMzM3LCAweDg3ZjIzMDI4LCAweGE1YjIyM2JmLCAweDZhYmEwMjAzLCAweDgyNWNlZDE2LCAweDFjMmI4YWNmLCAweGI0OTJhNzc5LCAweGYyZjBmMzA3LCAweGUyYTE0ZTY5LCAweGY0Y2Q2NWRhLCAweGJlZDUwNjA1LCAweDYyMWZkMTM0LCAweGZlOGFjNGE2LCAweDUzOWQzNDJlLCAweDU1YTBhMmYzLCAweGUxMzIwNThhLCAweGViNzVhNGY2LCAweGVjMzkwYjgzLCAweGVmYWE0MDYwLCAweDlmMDY1ZTcxLCAweDEwNTFiZDZlLCAweDhhZjkzZTIxLCAweDA2M2Q5NmRkLCAweDA1YWVkZDNlLCAweGJkNDY0ZGU2LCAweDhkYjU5MTU0LCAweDVkMDU3MWM0LCAweGQ0NmYwNDA2LCAweDE1ZmY2MDUwLCAweGZiMjQxOTk4LCAweGU5OTdkNmJkLCAweDQzY2M4OTQwLCAweDllNzc2N2Q5LCAweDQyYmRiMGU4LCAweDhiODgwNzg5LCAweDViMzhlNzE5LCAweGVlZGI3OWM4LCAweDBhNDdhMTdjLCAweDBmZTk3YzQyLCAweDFlYzlmODg0LCAweDAwMDAwMDAwLCAweDg2ODMwOTgwLCAweGVkNDgzMjJiLCAweDcwYWMxZTExLCAweDcyNGU2YzVhLCAweGZmZmJmZDBlLCAweDM4NTYwZjg1LCAweGQ1MWUzZGFlLCAweDM5MjczNjJkLCAweGQ5NjQwYTBmLCAweGE2MjE2ODVjLCAweDU0ZDE5YjViLCAweDJlM2EyNDM2LCAweDY3YjEwYzBhLCAweGU3MGY5MzU3LCAweDk2ZDJiNGVlLCAweDkxOWUxYjliLCAweGM1NGY4MGMwLCAweDIwYTI2MWRjLCAweDRiNjk1YTc3LCAweDFhMTYxYzEyLCAweGJhMGFlMjkzLCAweDJhZTVjMGEwLCAweGUwNDMzYzIyLCAweDE3MWQxMjFiLCAweDBkMGIwZTA5LCAweGM3YWRmMjhiLCAweGE4YjkyZGI2LCAweGE5YzgxNDFlLCAweDE5ODU1N2YxLCAweDA3NGNhZjc1LCAweGRkYmJlZTk5LCAweDYwZmRhMzdmLCAweDI2OWZmNzAxLCAweGY1YmM1YzcyLCAweDNiYzU0NDY2LCAweDdlMzQ1YmZiLCAweDI5NzY4YjQzLCAweGM2ZGNjYjIzLCAweGZjNjhiNmVkLCAweGYxNjNiOGU0LCAweGRjY2FkNzMxLCAweDg1MTA0MjYzLCAweDIyNDAxMzk3LCAweDExMjA4NGM2LCAweDI0N2Q4NTRhLCAweDNkZjhkMmJiLCAweDMyMTFhZWY5LCAweGExNmRjNzI5LCAweDJmNGIxZDllLCAweDMwZjNkY2IyLCAweDUyZWMwZDg2LCAweGUzZDA3N2MxLCAweDE2NmMyYmIzLCAweGI5OTlhOTcwLCAweDQ4ZmExMTk0LCAweDY0MjI0N2U5LCAweDhjYzRhOGZjLCAweDNmMWFhMGYwLCAweDJjZDg1NjdkLCAweDkwZWYyMjMzLCAweDRlYzc4NzQ5LCAweGQxYzFkOTM4LCAweGEyZmU4Y2NhLCAweDBiMzY5OGQ0LCAweDgxY2ZhNmY1LCAweGRlMjhhNTdhLCAweDhlMjZkYWI3LCAweGJmYTQzZmFkLCAweDlkZTQyYzNhLCAweDkyMGQ1MDc4LCAweGNjOWI2YTVmLCAweDQ2NjI1NDdlLCAweDEzYzJmNjhkLCAweGI4ZTg5MGQ4LCAweGY3NWUyZTM5LCAweGFmZjU4MmMzLCAweDgwYmU5ZjVkLCAweDkzN2M2OWQwLCAweDJkYTk2ZmQ1LCAweDEyYjNjZjI1LCAweDk5M2JjOGFjLCAweDdkYTcxMDE4LCAweDYzNmVlODljLCAweGJiN2JkYjNiLCAweDc4MDljZDI2LCAweDE4ZjQ2ZTU5LCAweGI3MDFlYzlhLCAweDlhYTg4MzRmLCAweDZlNjVlNjk1LCAweGU2N2VhYWZmLCAweGNmMDgyMWJjLCAweGU4ZTZlZjE1LCAweDliZDliYWU3LCAweDM2Y2U0YTZmLCAweDA5ZDRlYTlmLCAweDdjZDYyOWIwLCAweGIyYWYzMWE0LCAweDIzMzEyYTNmLCAweDk0MzBjNmE1LCAweDY2YzAzNWEyLCAweGJjMzc3NDRlLCAweGNhYTZmYzgyLCAweGQwYjBlMDkwLCAweGQ4MTUzM2E3LCAweDk4NGFmMTA0LCAweGRhZjc0MWVjLCAweDUwMGU3ZmNkLCAweGY2MmYxNzkxLCAweGQ2OGQ3NjRkLCAweGIwNGQ0M2VmLCAweDRkNTRjY2FhLCAweDA0ZGZlNDk2LCAweGI1ZTM5ZWQxLCAweDg4MWI0YzZhLCAweDFmYjhjMTJjLCAweDUxN2Y0NjY1LCAweGVhMDQ5ZDVlLCAweDM1NWQwMThjLCAweDc0NzNmYTg3LCAweDQxMmVmYjBiLCAweDFkNWFiMzY3LCAweGQyNTI5MmRiLCAweDU2MzNlOTEwLCAweDQ3MTM2ZGQ2LCAweDYxOGM5YWQ3LCAweDBjN2EzN2ExLCAweDE0OGU1OWY4LCAweDNjODllYjEzLCAweDI3ZWVjZWE5LCAweGM5MzViNzYxLCAweGU1ZWRlMTFjLCAweGIxM2M3YTQ3LCAweGRmNTk5Y2QyLCAweDczM2Y1NWYyLCAweGNlNzkxODE0LCAweDM3YmY3M2M3LCAweGNkZWE1M2Y3LCAweGFhNWI1ZmZkLCAweDZmMTRkZjNkLCAweGRiODY3ODQ0LCAweGYzODFjYWFmLCAweGM0M2ViOTY4LCAweDM0MmMzODI0LCAweDQwNWZjMmEzLCAweGMzNzIxNjFkLCAweDI1MGNiY2UyLCAweDQ5OGIyODNjLCAweDk1NDFmZjBkLCAweDAxNzEzOWE4LCAweGIzZGUwODBjLCAweGU0OWNkOGI0LCAweGMxOTA2NDU2LCAweDg0NjE3YmNiLCAweGI2NzBkNTMyLCAweDVjNzQ0ODZjLCAweDU3NDJkMGI4XTtcbiAgICB2YXIgVDggPSBbMHhmNGE3NTA1MSwgMHg0MTY1NTM3ZSwgMHgxN2E0YzMxYSwgMHgyNzVlOTYzYSwgMHhhYjZiY2IzYiwgMHg5ZDQ1ZjExZiwgMHhmYTU4YWJhYywgMHhlMzAzOTM0YiwgMHgzMGZhNTUyMCwgMHg3NjZkZjZhZCwgMHhjYzc2OTE4OCwgMHgwMjRjMjVmNSwgMHhlNWQ3ZmM0ZiwgMHgyYWNiZDdjNSwgMHgzNTQ0ODAyNiwgMHg2MmEzOGZiNSwgMHhiMTVhNDlkZSwgMHhiYTFiNjcyNSwgMHhlYTBlOTg0NSwgMHhmZWMwZTE1ZCwgMHgyZjc1MDJjMywgMHg0Y2YwMTI4MSwgMHg0Njk3YTM4ZCwgMHhkM2Y5YzY2YiwgMHg4ZjVmZTcwMywgMHg5MjljOTUxNSwgMHg2ZDdhZWJiZiwgMHg1MjU5ZGE5NSwgMHhiZTgzMmRkNCwgMHg3NDIxZDM1OCwgMHhlMDY5Mjk0OSwgMHhjOWM4NDQ4ZSwgMHhjMjg5NmE3NSwgMHg4ZTc5NzhmNCwgMHg1ODNlNmI5OSwgMHhiOTcxZGQyNywgMHhlMTRmYjZiZSwgMHg4OGFkMTdmMCwgMHgyMGFjNjZjOSwgMHhjZTNhYjQ3ZCwgMHhkZjRhMTg2MywgMHgxYTMxODJlNSwgMHg1MTMzNjA5NywgMHg1MzdmNDU2MiwgMHg2NDc3ZTBiMSwgMHg2YmFlODRiYiwgMHg4MWEwMWNmZSwgMHgwODJiOTRmOSwgMHg0ODY4NTg3MCwgMHg0NWZkMTk4ZiwgMHhkZTZjODc5NCwgMHg3YmY4Yjc1MiwgMHg3M2QzMjNhYiwgMHg0YjAyZTI3MiwgMHgxZjhmNTdlMywgMHg1NWFiMmE2NiwgMHhlYjI4MDdiMiwgMHhiNWMyMDMyZiwgMHhjNTdiOWE4NiwgMHgzNzA4YTVkMywgMHgyODg3ZjIzMCwgMHhiZmE1YjIyMywgMHgwMzZhYmEwMiwgMHgxNjgyNWNlZCwgMHhjZjFjMmI4YSwgMHg3OWI0OTJhNywgMHgwN2YyZjBmMywgMHg2OWUyYTE0ZSwgMHhkYWY0Y2Q2NSwgMHgwNWJlZDUwNiwgMHgzNDYyMWZkMSwgMHhhNmZlOGFjNCwgMHgyZTUzOWQzNCwgMHhmMzU1YTBhMiwgMHg4YWUxMzIwNSwgMHhmNmViNzVhNCwgMHg4M2VjMzkwYiwgMHg2MGVmYWE0MCwgMHg3MTlmMDY1ZSwgMHg2ZTEwNTFiZCwgMHgyMThhZjkzZSwgMHhkZDA2M2Q5NiwgMHgzZTA1YWVkZCwgMHhlNmJkNDY0ZCwgMHg1NDhkYjU5MSwgMHhjNDVkMDU3MSwgMHgwNmQ0NmYwNCwgMHg1MDE1ZmY2MCwgMHg5OGZiMjQxOSwgMHhiZGU5OTdkNiwgMHg0MDQzY2M4OSwgMHhkOTllNzc2NywgMHhlODQyYmRiMCwgMHg4OThiODgwNywgMHgxOTViMzhlNywgMHhjOGVlZGI3OSwgMHg3YzBhNDdhMSwgMHg0MjBmZTk3YywgMHg4NDFlYzlmOCwgMHgwMDAwMDAwMCwgMHg4MDg2ODMwOSwgMHgyYmVkNDgzMiwgMHgxMTcwYWMxZSwgMHg1YTcyNGU2YywgMHgwZWZmZmJmZCwgMHg4NTM4NTYwZiwgMHhhZWQ1MWUzZCwgMHgyZDM5MjczNiwgMHgwZmQ5NjQwYSwgMHg1Y2E2MjE2OCwgMHg1YjU0ZDE5YiwgMHgzNjJlM2EyNCwgMHgwYTY3YjEwYywgMHg1N2U3MGY5MywgMHhlZTk2ZDJiNCwgMHg5YjkxOWUxYiwgMHhjMGM1NGY4MCwgMHhkYzIwYTI2MSwgMHg3NzRiNjk1YSwgMHgxMjFhMTYxYywgMHg5M2JhMGFlMiwgMHhhMDJhZTVjMCwgMHgyMmUwNDMzYywgMHgxYjE3MWQxMiwgMHgwOTBkMGIwZSwgMHg4YmM3YWRmMiwgMHhiNmE4YjkyZCwgMHgxZWE5YzgxNCwgMHhmMTE5ODU1NywgMHg3NTA3NGNhZiwgMHg5OWRkYmJlZSwgMHg3ZjYwZmRhMywgMHgwMTI2OWZmNywgMHg3MmY1YmM1YywgMHg2NjNiYzU0NCwgMHhmYjdlMzQ1YiwgMHg0MzI5NzY4YiwgMHgyM2M2ZGNjYiwgMHhlZGZjNjhiNiwgMHhlNGYxNjNiOCwgMHgzMWRjY2FkNywgMHg2Mzg1MTA0MiwgMHg5NzIyNDAxMywgMHhjNjExMjA4NCwgMHg0YTI0N2Q4NSwgMHhiYjNkZjhkMiwgMHhmOTMyMTFhZSwgMHgyOWExNmRjNywgMHg5ZTJmNGIxZCwgMHhiMjMwZjNkYywgMHg4NjUyZWMwZCwgMHhjMWUzZDA3NywgMHhiMzE2NmMyYiwgMHg3MGI5OTlhOSwgMHg5NDQ4ZmExMSwgMHhlOTY0MjI0NywgMHhmYzhjYzRhOCwgMHhmMDNmMWFhMCwgMHg3ZDJjZDg1NiwgMHgzMzkwZWYyMiwgMHg0OTRlYzc4NywgMHgzOGQxYzFkOSwgMHhjYWEyZmU4YywgMHhkNDBiMzY5OCwgMHhmNTgxY2ZhNiwgMHg3YWRlMjhhNSwgMHhiNzhlMjZkYSwgMHhhZGJmYTQzZiwgMHgzYTlkZTQyYywgMHg3ODkyMGQ1MCwgMHg1ZmNjOWI2YSwgMHg3ZTQ2NjI1NCwgMHg4ZDEzYzJmNiwgMHhkOGI4ZTg5MCwgMHgzOWY3NWUyZSwgMHhjM2FmZjU4MiwgMHg1ZDgwYmU5ZiwgMHhkMDkzN2M2OSwgMHhkNTJkYTk2ZiwgMHgyNTEyYjNjZiwgMHhhYzk5M2JjOCwgMHgxODdkYTcxMCwgMHg5YzYzNmVlOCwgMHgzYmJiN2JkYiwgMHgyNjc4MDljZCwgMHg1OTE4ZjQ2ZSwgMHg5YWI3MDFlYywgMHg0ZjlhYTg4MywgMHg5NTZlNjVlNiwgMHhmZmU2N2VhYSwgMHhiY2NmMDgyMSwgMHgxNWU4ZTZlZiwgMHhlNzliZDliYSwgMHg2ZjM2Y2U0YSwgMHg5ZjA5ZDRlYSwgMHhiMDdjZDYyOSwgMHhhNGIyYWYzMSwgMHgzZjIzMzEyYSwgMHhhNTk0MzBjNiwgMHhhMjY2YzAzNSwgMHg0ZWJjMzc3NCwgMHg4MmNhYTZmYywgMHg5MGQwYjBlMCwgMHhhN2Q4MTUzMywgMHgwNDk4NGFmMSwgMHhlY2RhZjc0MSwgMHhjZDUwMGU3ZiwgMHg5MWY2MmYxNywgMHg0ZGQ2OGQ3NiwgMHhlZmIwNGQ0MywgMHhhYTRkNTRjYywgMHg5NjA0ZGZlNCwgMHhkMWI1ZTM5ZSwgMHg2YTg4MWI0YywgMHgyYzFmYjhjMSwgMHg2NTUxN2Y0NiwgMHg1ZWVhMDQ5ZCwgMHg4YzM1NWQwMSwgMHg4Nzc0NzNmYSwgMHgwYjQxMmVmYiwgMHg2NzFkNWFiMywgMHhkYmQyNTI5MiwgMHgxMDU2MzNlOSwgMHhkNjQ3MTM2ZCwgMHhkNzYxOGM5YSwgMHhhMTBjN2EzNywgMHhmODE0OGU1OSwgMHgxMzNjODllYiwgMHhhOTI3ZWVjZSwgMHg2MWM5MzViNywgMHgxY2U1ZWRlMSwgMHg0N2IxM2M3YSwgMHhkMmRmNTk5YywgMHhmMjczM2Y1NSwgMHgxNGNlNzkxOCwgMHhjNzM3YmY3MywgMHhmN2NkZWE1MywgMHhmZGFhNWI1ZiwgMHgzZDZmMTRkZiwgMHg0NGRiODY3OCwgMHhhZmYzODFjYSwgMHg2OGM0M2ViOSwgMHgyNDM0MmMzOCwgMHhhMzQwNWZjMiwgMHgxZGMzNzIxNiwgMHhlMjI1MGNiYywgMHgzYzQ5OGIyOCwgMHgwZDk1NDFmZiwgMHhhODAxNzEzOSwgMHgwY2IzZGUwOCwgMHhiNGU0OWNkOCwgMHg1NmMxOTA2NCwgMHhjYjg0NjE3YiwgMHgzMmI2NzBkNSwgMHg2YzVjNzQ0OCwgMHhiODU3NDJkMF07XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbnMgZm9yIGRlY3J5cHRpb24ga2V5IGV4cGFuc2lvblxuICAgIHZhciBVMSA9IFsweDAwMDAwMDAwLCAweDBlMDkwZDBiLCAweDFjMTIxYTE2LCAweDEyMWIxNzFkLCAweDM4MjQzNDJjLCAweDM2MmQzOTI3LCAweDI0MzYyZTNhLCAweDJhM2YyMzMxLCAweDcwNDg2ODU4LCAweDdlNDE2NTUzLCAweDZjNWE3MjRlLCAweDYyNTM3ZjQ1LCAweDQ4NmM1Yzc0LCAweDQ2NjU1MTdmLCAweDU0N2U0NjYyLCAweDVhNzc0YjY5LCAweGUwOTBkMGIwLCAweGVlOTlkZGJiLCAweGZjODJjYWE2LCAweGYyOGJjN2FkLCAweGQ4YjRlNDljLCAweGQ2YmRlOTk3LCAweGM0YTZmZThhLCAweGNhYWZmMzgxLCAweDkwZDhiOGU4LCAweDllZDFiNWUzLCAweDhjY2FhMmZlLCAweDgyYzNhZmY1LCAweGE4ZmM4Y2M0LCAweGE2ZjU4MWNmLCAweGI0ZWU5NmQyLCAweGJhZTc5YmQ5LCAweGRiM2JiYjdiLCAweGQ1MzJiNjcwLCAweGM3MjlhMTZkLCAweGM5MjBhYzY2LCAweGUzMWY4ZjU3LCAweGVkMTY4MjVjLCAweGZmMGQ5NTQxLCAweGYxMDQ5ODRhLCAweGFiNzNkMzIzLCAweGE1N2FkZTI4LCAweGI3NjFjOTM1LCAweGI5NjhjNDNlLCAweDkzNTdlNzBmLCAweDlkNWVlYTA0LCAweDhmNDVmZDE5LCAweDgxNGNmMDEyLCAweDNiYWI2YmNiLCAweDM1YTI2NmMwLCAweDI3Yjk3MWRkLCAweDI5YjA3Y2Q2LCAweDAzOGY1ZmU3LCAweDBkODY1MmVjLCAweDFmOWQ0NWYxLCAweDExOTQ0OGZhLCAweDRiZTMwMzkzLCAweDQ1ZWEwZTk4LCAweDU3ZjExOTg1LCAweDU5ZjgxNDhlLCAweDczYzczN2JmLCAweDdkY2UzYWI0LCAweDZmZDUyZGE5LCAweDYxZGMyMGEyLCAweGFkNzY2ZGY2LCAweGEzN2Y2MGZkLCAweGIxNjQ3N2UwLCAweGJmNmQ3YWViLCAweDk1NTI1OWRhLCAweDliNWI1NGQxLCAweDg5NDA0M2NjLCAweDg3NDk0ZWM3LCAweGRkM2UwNWFlLCAweGQzMzcwOGE1LCAweGMxMmMxZmI4LCAweGNmMjUxMmIzLCAweGU1MWEzMTgyLCAweGViMTMzYzg5LCAweGY5MDgyYjk0LCAweGY3MDEyNjlmLCAweDRkZTZiZDQ2LCAweDQzZWZiMDRkLCAweDUxZjRhNzUwLCAweDVmZmRhYTViLCAweDc1YzI4OTZhLCAweDdiY2I4NDYxLCAweDY5ZDA5MzdjLCAweDY3ZDk5ZTc3LCAweDNkYWVkNTFlLCAweDMzYTdkODE1LCAweDIxYmNjZjA4LCAweDJmYjVjMjAzLCAweDA1OGFlMTMyLCAweDBiODNlYzM5LCAweDE5OThmYjI0LCAweDE3OTFmNjJmLCAweDc2NGRkNjhkLCAweDc4NDRkYjg2LCAweDZhNWZjYzliLCAweDY0NTZjMTkwLCAweDRlNjllMmExLCAweDQwNjBlZmFhLCAweDUyN2JmOGI3LCAweDVjNzJmNWJjLCAweDA2MDViZWQ1LCAweDA4MGNiM2RlLCAweDFhMTdhNGMzLCAweDE0MWVhOWM4LCAweDNlMjE4YWY5LCAweDMwMjg4N2YyLCAweDIyMzM5MGVmLCAweDJjM2E5ZGU0LCAweDk2ZGQwNjNkLCAweDk4ZDQwYjM2LCAweDhhY2YxYzJiLCAweDg0YzYxMTIwLCAweGFlZjkzMjExLCAweGEwZjAzZjFhLCAweGIyZWIyODA3LCAweGJjZTIyNTBjLCAweGU2OTU2ZTY1LCAweGU4OWM2MzZlLCAweGZhODc3NDczLCAweGY0OGU3OTc4LCAweGRlYjE1YTQ5LCAweGQwYjg1NzQyLCAweGMyYTM0MDVmLCAweGNjYWE0ZDU0LCAweDQxZWNkYWY3LCAweDRmZTVkN2ZjLCAweDVkZmVjMGUxLCAweDUzZjdjZGVhLCAweDc5YzhlZWRiLCAweDc3YzFlM2QwLCAweDY1ZGFmNGNkLCAweDZiZDNmOWM2LCAweDMxYTRiMmFmLCAweDNmYWRiZmE0LCAweDJkYjZhOGI5LCAweDIzYmZhNWIyLCAweDA5ODA4NjgzLCAweDA3ODk4Yjg4LCAweDE1OTI5Yzk1LCAweDFiOWI5MTllLCAweGExN2MwYTQ3LCAweGFmNzUwNzRjLCAweGJkNmUxMDUxLCAweGIzNjcxZDVhLCAweDk5NTgzZTZiLCAweDk3NTEzMzYwLCAweDg1NGEyNDdkLCAweDhiNDMyOTc2LCAweGQxMzQ2MjFmLCAweGRmM2Q2ZjE0LCAweGNkMjY3ODA5LCAweGMzMmY3NTAyLCAweGU5MTA1NjMzLCAweGU3MTk1YjM4LCAweGY1MDI0YzI1LCAweGZiMGI0MTJlLCAweDlhZDc2MThjLCAweDk0ZGU2Yzg3LCAweDg2YzU3YjlhLCAweDg4Y2M3NjkxLCAweGEyZjM1NWEwLCAweGFjZmE1OGFiLCAweGJlZTE0ZmI2LCAweGIwZTg0MmJkLCAweGVhOWYwOWQ0LCAweGU0OTYwNGRmLCAweGY2OGQxM2MyLCAweGY4ODQxZWM5LCAweGQyYmIzZGY4LCAweGRjYjIzMGYzLCAweGNlYTkyN2VlLCAweGMwYTAyYWU1LCAweDdhNDdiMTNjLCAweDc0NGViYzM3LCAweDY2NTVhYjJhLCAweDY4NWNhNjIxLCAweDQyNjM4NTEwLCAweDRjNmE4ODFiLCAweDVlNzE5ZjA2LCAweDUwNzg5MjBkLCAweDBhMGZkOTY0LCAweDA0MDZkNDZmLCAweDE2MWRjMzcyLCAweDE4MTRjZTc5LCAweDMyMmJlZDQ4LCAweDNjMjJlMDQzLCAweDJlMzlmNzVlLCAweDIwMzBmYTU1LCAweGVjOWFiNzAxLCAweGUyOTNiYTBhLCAweGYwODhhZDE3LCAweGZlODFhMDFjLCAweGQ0YmU4MzJkLCAweGRhYjc4ZTI2LCAweGM4YWM5OTNiLCAweGM2YTU5NDMwLCAweDljZDJkZjU5LCAweDkyZGJkMjUyLCAweDgwYzBjNTRmLCAweDhlYzljODQ0LCAweGE0ZjZlYjc1LCAweGFhZmZlNjdlLCAweGI4ZTRmMTYzLCAweGI2ZWRmYzY4LCAweDBjMGE2N2IxLCAweDAyMDM2YWJhLCAweDEwMTg3ZGE3LCAweDFlMTE3MGFjLCAweDM0MmU1MzlkLCAweDNhMjc1ZTk2LCAweDI4M2M0OThiLCAweDI2MzU0NDgwLCAweDdjNDIwZmU5LCAweDcyNGIwMmUyLCAweDYwNTAxNWZmLCAweDZlNTkxOGY0LCAweDQ0NjYzYmM1LCAweDRhNmYzNmNlLCAweDU4NzQyMWQzLCAweDU2N2QyY2Q4LCAweDM3YTEwYzdhLCAweDM5YTgwMTcxLCAweDJiYjMxNjZjLCAweDI1YmExYjY3LCAweDBmODUzODU2LCAweDAxOGMzNTVkLCAweDEzOTcyMjQwLCAweDFkOWUyZjRiLCAweDQ3ZTk2NDIyLCAweDQ5ZTA2OTI5LCAweDViZmI3ZTM0LCAweDU1ZjI3MzNmLCAweDdmY2Q1MDBlLCAweDcxYzQ1ZDA1LCAweDYzZGY0YTE4LCAweDZkZDY0NzEzLCAweGQ3MzFkY2NhLCAweGQ5MzhkMWMxLCAweGNiMjNjNmRjLCAweGM1MmFjYmQ3LCAweGVmMTVlOGU2LCAweGUxMWNlNWVkLCAweGYzMDdmMmYwLCAweGZkMGVmZmZiLCAweGE3NzliNDkyLCAweGE5NzBiOTk5LCAweGJiNmJhZTg0LCAweGI1NjJhMzhmLCAweDlmNWQ4MGJlLCAweDkxNTQ4ZGI1LCAweDgzNGY5YWE4LCAweDhkNDY5N2EzXTtcbiAgICB2YXIgVTIgPSBbMHgwMDAwMDAwMCwgMHgwYjBlMDkwZCwgMHgxNjFjMTIxYSwgMHgxZDEyMWIxNywgMHgyYzM4MjQzNCwgMHgyNzM2MmQzOSwgMHgzYTI0MzYyZSwgMHgzMTJhM2YyMywgMHg1ODcwNDg2OCwgMHg1MzdlNDE2NSwgMHg0ZTZjNWE3MiwgMHg0NTYyNTM3ZiwgMHg3NDQ4NmM1YywgMHg3ZjQ2NjU1MSwgMHg2MjU0N2U0NiwgMHg2OTVhNzc0YiwgMHhiMGUwOTBkMCwgMHhiYmVlOTlkZCwgMHhhNmZjODJjYSwgMHhhZGYyOGJjNywgMHg5Y2Q4YjRlNCwgMHg5N2Q2YmRlOSwgMHg4YWM0YTZmZSwgMHg4MWNhYWZmMywgMHhlODkwZDhiOCwgMHhlMzllZDFiNSwgMHhmZThjY2FhMiwgMHhmNTgyYzNhZiwgMHhjNGE4ZmM4YywgMHhjZmE2ZjU4MSwgMHhkMmI0ZWU5NiwgMHhkOWJhZTc5YiwgMHg3YmRiM2JiYiwgMHg3MGQ1MzJiNiwgMHg2ZGM3MjlhMSwgMHg2NmM5MjBhYywgMHg1N2UzMWY4ZiwgMHg1Y2VkMTY4MiwgMHg0MWZmMGQ5NSwgMHg0YWYxMDQ5OCwgMHgyM2FiNzNkMywgMHgyOGE1N2FkZSwgMHgzNWI3NjFjOSwgMHgzZWI5NjhjNCwgMHgwZjkzNTdlNywgMHgwNDlkNWVlYSwgMHgxOThmNDVmZCwgMHgxMjgxNGNmMCwgMHhjYjNiYWI2YiwgMHhjMDM1YTI2NiwgMHhkZDI3Yjk3MSwgMHhkNjI5YjA3YywgMHhlNzAzOGY1ZiwgMHhlYzBkODY1MiwgMHhmMTFmOWQ0NSwgMHhmYTExOTQ0OCwgMHg5MzRiZTMwMywgMHg5ODQ1ZWEwZSwgMHg4NTU3ZjExOSwgMHg4ZTU5ZjgxNCwgMHhiZjczYzczNywgMHhiNDdkY2UzYSwgMHhhOTZmZDUyZCwgMHhhMjYxZGMyMCwgMHhmNmFkNzY2ZCwgMHhmZGEzN2Y2MCwgMHhlMGIxNjQ3NywgMHhlYmJmNmQ3YSwgMHhkYTk1NTI1OSwgMHhkMTliNWI1NCwgMHhjYzg5NDA0MywgMHhjNzg3NDk0ZSwgMHhhZWRkM2UwNSwgMHhhNWQzMzcwOCwgMHhiOGMxMmMxZiwgMHhiM2NmMjUxMiwgMHg4MmU1MWEzMSwgMHg4OWViMTMzYywgMHg5NGY5MDgyYiwgMHg5ZmY3MDEyNiwgMHg0NjRkZTZiZCwgMHg0ZDQzZWZiMCwgMHg1MDUxZjRhNywgMHg1YjVmZmRhYSwgMHg2YTc1YzI4OSwgMHg2MTdiY2I4NCwgMHg3YzY5ZDA5MywgMHg3NzY3ZDk5ZSwgMHgxZTNkYWVkNSwgMHgxNTMzYTdkOCwgMHgwODIxYmNjZiwgMHgwMzJmYjVjMiwgMHgzMjA1OGFlMSwgMHgzOTBiODNlYywgMHgyNDE5OThmYiwgMHgyZjE3OTFmNiwgMHg4ZDc2NGRkNiwgMHg4Njc4NDRkYiwgMHg5YjZhNWZjYywgMHg5MDY0NTZjMSwgMHhhMTRlNjllMiwgMHhhYTQwNjBlZiwgMHhiNzUyN2JmOCwgMHhiYzVjNzJmNSwgMHhkNTA2MDViZSwgMHhkZTA4MGNiMywgMHhjMzFhMTdhNCwgMHhjODE0MWVhOSwgMHhmOTNlMjE4YSwgMHhmMjMwMjg4NywgMHhlZjIyMzM5MCwgMHhlNDJjM2E5ZCwgMHgzZDk2ZGQwNiwgMHgzNjk4ZDQwYiwgMHgyYjhhY2YxYywgMHgyMDg0YzYxMSwgMHgxMWFlZjkzMiwgMHgxYWEwZjAzZiwgMHgwN2IyZWIyOCwgMHgwY2JjZTIyNSwgMHg2NWU2OTU2ZSwgMHg2ZWU4OWM2MywgMHg3M2ZhODc3NCwgMHg3OGY0OGU3OSwgMHg0OWRlYjE1YSwgMHg0MmQwYjg1NywgMHg1ZmMyYTM0MCwgMHg1NGNjYWE0ZCwgMHhmNzQxZWNkYSwgMHhmYzRmZTVkNywgMHhlMTVkZmVjMCwgMHhlYTUzZjdjZCwgMHhkYjc5YzhlZSwgMHhkMDc3YzFlMywgMHhjZDY1ZGFmNCwgMHhjNjZiZDNmOSwgMHhhZjMxYTRiMiwgMHhhNDNmYWRiZiwgMHhiOTJkYjZhOCwgMHhiMjIzYmZhNSwgMHg4MzA5ODA4NiwgMHg4ODA3ODk4YiwgMHg5NTE1OTI5YywgMHg5ZTFiOWI5MSwgMHg0N2ExN2MwYSwgMHg0Y2FmNzUwNywgMHg1MWJkNmUxMCwgMHg1YWIzNjcxZCwgMHg2Yjk5NTgzZSwgMHg2MDk3NTEzMywgMHg3ZDg1NGEyNCwgMHg3NjhiNDMyOSwgMHgxZmQxMzQ2MiwgMHgxNGRmM2Q2ZiwgMHgwOWNkMjY3OCwgMHgwMmMzMmY3NSwgMHgzM2U5MTA1NiwgMHgzOGU3MTk1YiwgMHgyNWY1MDI0YywgMHgyZWZiMGI0MSwgMHg4YzlhZDc2MSwgMHg4Nzk0ZGU2YywgMHg5YTg2YzU3YiwgMHg5MTg4Y2M3NiwgMHhhMGEyZjM1NSwgMHhhYmFjZmE1OCwgMHhiNmJlZTE0ZiwgMHhiZGIwZTg0MiwgMHhkNGVhOWYwOSwgMHhkZmU0OTYwNCwgMHhjMmY2OGQxMywgMHhjOWY4ODQxZSwgMHhmOGQyYmIzZCwgMHhmM2RjYjIzMCwgMHhlZWNlYTkyNywgMHhlNWMwYTAyYSwgMHgzYzdhNDdiMSwgMHgzNzc0NGViYywgMHgyYTY2NTVhYiwgMHgyMTY4NWNhNiwgMHgxMDQyNjM4NSwgMHgxYjRjNmE4OCwgMHgwNjVlNzE5ZiwgMHgwZDUwNzg5MiwgMHg2NDBhMGZkOSwgMHg2ZjA0MDZkNCwgMHg3MjE2MWRjMywgMHg3OTE4MTRjZSwgMHg0ODMyMmJlZCwgMHg0MzNjMjJlMCwgMHg1ZTJlMzlmNywgMHg1NTIwMzBmYSwgMHgwMWVjOWFiNywgMHgwYWUyOTNiYSwgMHgxN2YwODhhZCwgMHgxY2ZlODFhMCwgMHgyZGQ0YmU4MywgMHgyNmRhYjc4ZSwgMHgzYmM4YWM5OSwgMHgzMGM2YTU5NCwgMHg1OTljZDJkZiwgMHg1MjkyZGJkMiwgMHg0ZjgwYzBjNSwgMHg0NDhlYzljOCwgMHg3NWE0ZjZlYiwgMHg3ZWFhZmZlNiwgMHg2M2I4ZTRmMSwgMHg2OGI2ZWRmYywgMHhiMTBjMGE2NywgMHhiYTAyMDM2YSwgMHhhNzEwMTg3ZCwgMHhhYzFlMTE3MCwgMHg5ZDM0MmU1MywgMHg5NjNhMjc1ZSwgMHg4YjI4M2M0OSwgMHg4MDI2MzU0NCwgMHhlOTdjNDIwZiwgMHhlMjcyNGIwMiwgMHhmZjYwNTAxNSwgMHhmNDZlNTkxOCwgMHhjNTQ0NjYzYiwgMHhjZTRhNmYzNiwgMHhkMzU4NzQyMSwgMHhkODU2N2QyYywgMHg3YTM3YTEwYywgMHg3MTM5YTgwMSwgMHg2YzJiYjMxNiwgMHg2NzI1YmExYiwgMHg1NjBmODUzOCwgMHg1ZDAxOGMzNSwgMHg0MDEzOTcyMiwgMHg0YjFkOWUyZiwgMHgyMjQ3ZTk2NCwgMHgyOTQ5ZTA2OSwgMHgzNDViZmI3ZSwgMHgzZjU1ZjI3MywgMHgwZTdmY2Q1MCwgMHgwNTcxYzQ1ZCwgMHgxODYzZGY0YSwgMHgxMzZkZDY0NywgMHhjYWQ3MzFkYywgMHhjMWQ5MzhkMSwgMHhkY2NiMjNjNiwgMHhkN2M1MmFjYiwgMHhlNmVmMTVlOCwgMHhlZGUxMWNlNSwgMHhmMGYzMDdmMiwgMHhmYmZkMGVmZiwgMHg5MmE3NzliNCwgMHg5OWE5NzBiOSwgMHg4NGJiNmJhZSwgMHg4ZmI1NjJhMywgMHhiZTlmNWQ4MCwgMHhiNTkxNTQ4ZCwgMHhhODgzNGY5YSwgMHhhMzhkNDY5N107XG4gICAgdmFyIFUzID0gWzB4MDAwMDAwMDAsIDB4MGQwYjBlMDksIDB4MWExNjFjMTIsIDB4MTcxZDEyMWIsIDB4MzQyYzM4MjQsIDB4MzkyNzM2MmQsIDB4MmUzYTI0MzYsIDB4MjMzMTJhM2YsIDB4Njg1ODcwNDgsIDB4NjU1MzdlNDEsIDB4NzI0ZTZjNWEsIDB4N2Y0NTYyNTMsIDB4NWM3NDQ4NmMsIDB4NTE3ZjQ2NjUsIDB4NDY2MjU0N2UsIDB4NGI2OTVhNzcsIDB4ZDBiMGUwOTAsIDB4ZGRiYmVlOTksIDB4Y2FhNmZjODIsIDB4YzdhZGYyOGIsIDB4ZTQ5Y2Q4YjQsIDB4ZTk5N2Q2YmQsIDB4ZmU4YWM0YTYsIDB4ZjM4MWNhYWYsIDB4YjhlODkwZDgsIDB4YjVlMzllZDEsIDB4YTJmZThjY2EsIDB4YWZmNTgyYzMsIDB4OGNjNGE4ZmMsIDB4ODFjZmE2ZjUsIDB4OTZkMmI0ZWUsIDB4OWJkOWJhZTcsIDB4YmI3YmRiM2IsIDB4YjY3MGQ1MzIsIDB4YTE2ZGM3MjksIDB4YWM2NmM5MjAsIDB4OGY1N2UzMWYsIDB4ODI1Y2VkMTYsIDB4OTU0MWZmMGQsIDB4OTg0YWYxMDQsIDB4ZDMyM2FiNzMsIDB4ZGUyOGE1N2EsIDB4YzkzNWI3NjEsIDB4YzQzZWI5NjgsIDB4ZTcwZjkzNTcsIDB4ZWEwNDlkNWUsIDB4ZmQxOThmNDUsIDB4ZjAxMjgxNGMsIDB4NmJjYjNiYWIsIDB4NjZjMDM1YTIsIDB4NzFkZDI3YjksIDB4N2NkNjI5YjAsIDB4NWZlNzAzOGYsIDB4NTJlYzBkODYsIDB4NDVmMTFmOWQsIDB4NDhmYTExOTQsIDB4MDM5MzRiZTMsIDB4MGU5ODQ1ZWEsIDB4MTk4NTU3ZjEsIDB4MTQ4ZTU5ZjgsIDB4MzdiZjczYzcsIDB4M2FiNDdkY2UsIDB4MmRhOTZmZDUsIDB4MjBhMjYxZGMsIDB4NmRmNmFkNzYsIDB4NjBmZGEzN2YsIDB4NzdlMGIxNjQsIDB4N2FlYmJmNmQsIDB4NTlkYTk1NTIsIDB4NTRkMTliNWIsIDB4NDNjYzg5NDAsIDB4NGVjNzg3NDksIDB4MDVhZWRkM2UsIDB4MDhhNWQzMzcsIDB4MWZiOGMxMmMsIDB4MTJiM2NmMjUsIDB4MzE4MmU1MWEsIDB4M2M4OWViMTMsIDB4MmI5NGY5MDgsIDB4MjY5ZmY3MDEsIDB4YmQ0NjRkZTYsIDB4YjA0ZDQzZWYsIDB4YTc1MDUxZjQsIDB4YWE1YjVmZmQsIDB4ODk2YTc1YzIsIDB4ODQ2MTdiY2IsIDB4OTM3YzY5ZDAsIDB4OWU3NzY3ZDksIDB4ZDUxZTNkYWUsIDB4ZDgxNTMzYTcsIDB4Y2YwODIxYmMsIDB4YzIwMzJmYjUsIDB4ZTEzMjA1OGEsIDB4ZWMzOTBiODMsIDB4ZmIyNDE5OTgsIDB4ZjYyZjE3OTEsIDB4ZDY4ZDc2NGQsIDB4ZGI4Njc4NDQsIDB4Y2M5YjZhNWYsIDB4YzE5MDY0NTYsIDB4ZTJhMTRlNjksIDB4ZWZhYTQwNjAsIDB4ZjhiNzUyN2IsIDB4ZjViYzVjNzIsIDB4YmVkNTA2MDUsIDB4YjNkZTA4MGMsIDB4YTRjMzFhMTcsIDB4YTljODE0MWUsIDB4OGFmOTNlMjEsIDB4ODdmMjMwMjgsIDB4OTBlZjIyMzMsIDB4OWRlNDJjM2EsIDB4MDYzZDk2ZGQsIDB4MGIzNjk4ZDQsIDB4MWMyYjhhY2YsIDB4MTEyMDg0YzYsIDB4MzIxMWFlZjksIDB4M2YxYWEwZjAsIDB4MjgwN2IyZWIsIDB4MjUwY2JjZTIsIDB4NmU2NWU2OTUsIDB4NjM2ZWU4OWMsIDB4NzQ3M2ZhODcsIDB4Nzk3OGY0OGUsIDB4NWE0OWRlYjEsIDB4NTc0MmQwYjgsIDB4NDA1ZmMyYTMsIDB4NGQ1NGNjYWEsIDB4ZGFmNzQxZWMsIDB4ZDdmYzRmZTUsIDB4YzBlMTVkZmUsIDB4Y2RlYTUzZjcsIDB4ZWVkYjc5YzgsIDB4ZTNkMDc3YzEsIDB4ZjRjZDY1ZGEsIDB4ZjljNjZiZDMsIDB4YjJhZjMxYTQsIDB4YmZhNDNmYWQsIDB4YThiOTJkYjYsIDB4YTViMjIzYmYsIDB4ODY4MzA5ODAsIDB4OGI4ODA3ODksIDB4OWM5NTE1OTIsIDB4OTE5ZTFiOWIsIDB4MGE0N2ExN2MsIDB4MDc0Y2FmNzUsIDB4MTA1MWJkNmUsIDB4MWQ1YWIzNjcsIDB4M2U2Yjk5NTgsIDB4MzM2MDk3NTEsIDB4MjQ3ZDg1NGEsIDB4Mjk3NjhiNDMsIDB4NjIxZmQxMzQsIDB4NmYxNGRmM2QsIDB4NzgwOWNkMjYsIDB4NzUwMmMzMmYsIDB4NTYzM2U5MTAsIDB4NWIzOGU3MTksIDB4NGMyNWY1MDIsIDB4NDEyZWZiMGIsIDB4NjE4YzlhZDcsIDB4NmM4Nzk0ZGUsIDB4N2I5YTg2YzUsIDB4NzY5MTg4Y2MsIDB4NTVhMGEyZjMsIDB4NThhYmFjZmEsIDB4NGZiNmJlZTEsIDB4NDJiZGIwZTgsIDB4MDlkNGVhOWYsIDB4MDRkZmU0OTYsIDB4MTNjMmY2OGQsIDB4MWVjOWY4ODQsIDB4M2RmOGQyYmIsIDB4MzBmM2RjYjIsIDB4MjdlZWNlYTksIDB4MmFlNWMwYTAsIDB4YjEzYzdhNDcsIDB4YmMzNzc0NGUsIDB4YWIyYTY2NTUsIDB4YTYyMTY4NWMsIDB4ODUxMDQyNjMsIDB4ODgxYjRjNmEsIDB4OWYwNjVlNzEsIDB4OTIwZDUwNzgsIDB4ZDk2NDBhMGYsIDB4ZDQ2ZjA0MDYsIDB4YzM3MjE2MWQsIDB4Y2U3OTE4MTQsIDB4ZWQ0ODMyMmIsIDB4ZTA0MzNjMjIsIDB4Zjc1ZTJlMzksIDB4ZmE1NTIwMzAsIDB4YjcwMWVjOWEsIDB4YmEwYWUyOTMsIDB4YWQxN2YwODgsIDB4YTAxY2ZlODEsIDB4ODMyZGQ0YmUsIDB4OGUyNmRhYjcsIDB4OTkzYmM4YWMsIDB4OTQzMGM2YTUsIDB4ZGY1OTljZDIsIDB4ZDI1MjkyZGIsIDB4YzU0ZjgwYzAsIDB4Yzg0NDhlYzksIDB4ZWI3NWE0ZjYsIDB4ZTY3ZWFhZmYsIDB4ZjE2M2I4ZTQsIDB4ZmM2OGI2ZWQsIDB4NjdiMTBjMGEsIDB4NmFiYTAyMDMsIDB4N2RhNzEwMTgsIDB4NzBhYzFlMTEsIDB4NTM5ZDM0MmUsIDB4NWU5NjNhMjcsIDB4NDk4YjI4M2MsIDB4NDQ4MDI2MzUsIDB4MGZlOTdjNDIsIDB4MDJlMjcyNGIsIDB4MTVmZjYwNTAsIDB4MThmNDZlNTksIDB4M2JjNTQ0NjYsIDB4MzZjZTRhNmYsIDB4MjFkMzU4NzQsIDB4MmNkODU2N2QsIDB4MGM3YTM3YTEsIDB4MDE3MTM5YTgsIDB4MTY2YzJiYjMsIDB4MWI2NzI1YmEsIDB4Mzg1NjBmODUsIDB4MzU1ZDAxOGMsIDB4MjI0MDEzOTcsIDB4MmY0YjFkOWUsIDB4NjQyMjQ3ZTksIDB4NjkyOTQ5ZTAsIDB4N2UzNDViZmIsIDB4NzMzZjU1ZjIsIDB4NTAwZTdmY2QsIDB4NWQwNTcxYzQsIDB4NGExODYzZGYsIDB4NDcxMzZkZDYsIDB4ZGNjYWQ3MzEsIDB4ZDFjMWQ5MzgsIDB4YzZkY2NiMjMsIDB4Y2JkN2M1MmEsIDB4ZThlNmVmMTUsIDB4ZTVlZGUxMWMsIDB4ZjJmMGYzMDcsIDB4ZmZmYmZkMGUsIDB4YjQ5MmE3NzksIDB4Yjk5OWE5NzAsIDB4YWU4NGJiNmIsIDB4YTM4ZmI1NjIsIDB4ODBiZTlmNWQsIDB4OGRiNTkxNTQsIDB4OWFhODgzNGYsIDB4OTdhMzhkNDZdO1xuICAgIHZhciBVNCA9IFsweDAwMDAwMDAwLCAweDA5MGQwYjBlLCAweDEyMWExNjFjLCAweDFiMTcxZDEyLCAweDI0MzQyYzM4LCAweDJkMzkyNzM2LCAweDM2MmUzYTI0LCAweDNmMjMzMTJhLCAweDQ4Njg1ODcwLCAweDQxNjU1MzdlLCAweDVhNzI0ZTZjLCAweDUzN2Y0NTYyLCAweDZjNWM3NDQ4LCAweDY1NTE3ZjQ2LCAweDdlNDY2MjU0LCAweDc3NGI2OTVhLCAweDkwZDBiMGUwLCAweDk5ZGRiYmVlLCAweDgyY2FhNmZjLCAweDhiYzdhZGYyLCAweGI0ZTQ5Y2Q4LCAweGJkZTk5N2Q2LCAweGE2ZmU4YWM0LCAweGFmZjM4MWNhLCAweGQ4YjhlODkwLCAweGQxYjVlMzllLCAweGNhYTJmZThjLCAweGMzYWZmNTgyLCAweGZjOGNjNGE4LCAweGY1ODFjZmE2LCAweGVlOTZkMmI0LCAweGU3OWJkOWJhLCAweDNiYmI3YmRiLCAweDMyYjY3MGQ1LCAweDI5YTE2ZGM3LCAweDIwYWM2NmM5LCAweDFmOGY1N2UzLCAweDE2ODI1Y2VkLCAweDBkOTU0MWZmLCAweDA0OTg0YWYxLCAweDczZDMyM2FiLCAweDdhZGUyOGE1LCAweDYxYzkzNWI3LCAweDY4YzQzZWI5LCAweDU3ZTcwZjkzLCAweDVlZWEwNDlkLCAweDQ1ZmQxOThmLCAweDRjZjAxMjgxLCAweGFiNmJjYjNiLCAweGEyNjZjMDM1LCAweGI5NzFkZDI3LCAweGIwN2NkNjI5LCAweDhmNWZlNzAzLCAweDg2NTJlYzBkLCAweDlkNDVmMTFmLCAweDk0NDhmYTExLCAweGUzMDM5MzRiLCAweGVhMGU5ODQ1LCAweGYxMTk4NTU3LCAweGY4MTQ4ZTU5LCAweGM3MzdiZjczLCAweGNlM2FiNDdkLCAweGQ1MmRhOTZmLCAweGRjMjBhMjYxLCAweDc2NmRmNmFkLCAweDdmNjBmZGEzLCAweDY0NzdlMGIxLCAweDZkN2FlYmJmLCAweDUyNTlkYTk1LCAweDViNTRkMTliLCAweDQwNDNjYzg5LCAweDQ5NGVjNzg3LCAweDNlMDVhZWRkLCAweDM3MDhhNWQzLCAweDJjMWZiOGMxLCAweDI1MTJiM2NmLCAweDFhMzE4MmU1LCAweDEzM2M4OWViLCAweDA4MmI5NGY5LCAweDAxMjY5ZmY3LCAweGU2YmQ0NjRkLCAweGVmYjA0ZDQzLCAweGY0YTc1MDUxLCAweGZkYWE1YjVmLCAweGMyODk2YTc1LCAweGNiODQ2MTdiLCAweGQwOTM3YzY5LCAweGQ5OWU3NzY3LCAweGFlZDUxZTNkLCAweGE3ZDgxNTMzLCAweGJjY2YwODIxLCAweGI1YzIwMzJmLCAweDhhZTEzMjA1LCAweDgzZWMzOTBiLCAweDk4ZmIyNDE5LCAweDkxZjYyZjE3LCAweDRkZDY4ZDc2LCAweDQ0ZGI4Njc4LCAweDVmY2M5YjZhLCAweDU2YzE5MDY0LCAweDY5ZTJhMTRlLCAweDYwZWZhYTQwLCAweDdiZjhiNzUyLCAweDcyZjViYzVjLCAweDA1YmVkNTA2LCAweDBjYjNkZTA4LCAweDE3YTRjMzFhLCAweDFlYTljODE0LCAweDIxOGFmOTNlLCAweDI4ODdmMjMwLCAweDMzOTBlZjIyLCAweDNhOWRlNDJjLCAweGRkMDYzZDk2LCAweGQ0MGIzNjk4LCAweGNmMWMyYjhhLCAweGM2MTEyMDg0LCAweGY5MzIxMWFlLCAweGYwM2YxYWEwLCAweGViMjgwN2IyLCAweGUyMjUwY2JjLCAweDk1NmU2NWU2LCAweDljNjM2ZWU4LCAweDg3NzQ3M2ZhLCAweDhlNzk3OGY0LCAweGIxNWE0OWRlLCAweGI4NTc0MmQwLCAweGEzNDA1ZmMyLCAweGFhNGQ1NGNjLCAweGVjZGFmNzQxLCAweGU1ZDdmYzRmLCAweGZlYzBlMTVkLCAweGY3Y2RlYTUzLCAweGM4ZWVkYjc5LCAweGMxZTNkMDc3LCAweGRhZjRjZDY1LCAweGQzZjljNjZiLCAweGE0YjJhZjMxLCAweGFkYmZhNDNmLCAweGI2YThiOTJkLCAweGJmYTViMjIzLCAweDgwODY4MzA5LCAweDg5OGI4ODA3LCAweDkyOWM5NTE1LCAweDliOTE5ZTFiLCAweDdjMGE0N2ExLCAweDc1MDc0Y2FmLCAweDZlMTA1MWJkLCAweDY3MWQ1YWIzLCAweDU4M2U2Yjk5LCAweDUxMzM2MDk3LCAweDRhMjQ3ZDg1LCAweDQzMjk3NjhiLCAweDM0NjIxZmQxLCAweDNkNmYxNGRmLCAweDI2NzgwOWNkLCAweDJmNzUwMmMzLCAweDEwNTYzM2U5LCAweDE5NWIzOGU3LCAweDAyNGMyNWY1LCAweDBiNDEyZWZiLCAweGQ3NjE4YzlhLCAweGRlNmM4Nzk0LCAweGM1N2I5YTg2LCAweGNjNzY5MTg4LCAweGYzNTVhMGEyLCAweGZhNThhYmFjLCAweGUxNGZiNmJlLCAweGU4NDJiZGIwLCAweDlmMDlkNGVhLCAweDk2MDRkZmU0LCAweDhkMTNjMmY2LCAweDg0MWVjOWY4LCAweGJiM2RmOGQyLCAweGIyMzBmM2RjLCAweGE5MjdlZWNlLCAweGEwMmFlNWMwLCAweDQ3YjEzYzdhLCAweDRlYmMzNzc0LCAweDU1YWIyYTY2LCAweDVjYTYyMTY4LCAweDYzODUxMDQyLCAweDZhODgxYjRjLCAweDcxOWYwNjVlLCAweDc4OTIwZDUwLCAweDBmZDk2NDBhLCAweDA2ZDQ2ZjA0LCAweDFkYzM3MjE2LCAweDE0Y2U3OTE4LCAweDJiZWQ0ODMyLCAweDIyZTA0MzNjLCAweDM5Zjc1ZTJlLCAweDMwZmE1NTIwLCAweDlhYjcwMWVjLCAweDkzYmEwYWUyLCAweDg4YWQxN2YwLCAweDgxYTAxY2ZlLCAweGJlODMyZGQ0LCAweGI3OGUyNmRhLCAweGFjOTkzYmM4LCAweGE1OTQzMGM2LCAweGQyZGY1OTljLCAweGRiZDI1MjkyLCAweGMwYzU0ZjgwLCAweGM5Yzg0NDhlLCAweGY2ZWI3NWE0LCAweGZmZTY3ZWFhLCAweGU0ZjE2M2I4LCAweGVkZmM2OGI2LCAweDBhNjdiMTBjLCAweDAzNmFiYTAyLCAweDE4N2RhNzEwLCAweDExNzBhYzFlLCAweDJlNTM5ZDM0LCAweDI3NWU5NjNhLCAweDNjNDk4YjI4LCAweDM1NDQ4MDI2LCAweDQyMGZlOTdjLCAweDRiMDJlMjcyLCAweDUwMTVmZjYwLCAweDU5MThmNDZlLCAweDY2M2JjNTQ0LCAweDZmMzZjZTRhLCAweDc0MjFkMzU4LCAweDdkMmNkODU2LCAweGExMGM3YTM3LCAweGE4MDE3MTM5LCAweGIzMTY2YzJiLCAweGJhMWI2NzI1LCAweDg1Mzg1NjBmLCAweDhjMzU1ZDAxLCAweDk3MjI0MDEzLCAweDllMmY0YjFkLCAweGU5NjQyMjQ3LCAweGUwNjkyOTQ5LCAweGZiN2UzNDViLCAweGYyNzMzZjU1LCAweGNkNTAwZTdmLCAweGM0NWQwNTcxLCAweGRmNGExODYzLCAweGQ2NDcxMzZkLCAweDMxZGNjYWQ3LCAweDM4ZDFjMWQ5LCAweDIzYzZkY2NiLCAweDJhY2JkN2M1LCAweDE1ZThlNmVmLCAweDFjZTVlZGUxLCAweDA3ZjJmMGYzLCAweDBlZmZmYmZkLCAweDc5YjQ5MmE3LCAweDcwYjk5OWE5LCAweDZiYWU4NGJiLCAweDYyYTM4ZmI1LCAweDVkODBiZTlmLCAweDU0OGRiNTkxLCAweDRmOWFhODgzLCAweDQ2OTdhMzhkXTtcblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0ludDMyKGJ5dGVzKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgICAgXSA8PCAyNCkgfFxuICAgICAgICAgICAgICAgIChieXRlc1tpICsgMV0gPDwgMTYpIHxcbiAgICAgICAgICAgICAgICAoYnl0ZXNbaSArIDJdIDw8ICA4KSB8XG4gICAgICAgICAgICAgICAgIGJ5dGVzW2kgKyAzXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHZhciBBRVMgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEFFUykpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdrZXknLCB7XG4gICAgICAgICAgICB2YWx1ZTogY29lcmNlQXJyYXkoa2V5LCB0cnVlKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9wcmVwYXJlKCk7XG4gICAgfVxuXG5cbiAgICBBRVMucHJvdG90eXBlLl9wcmVwYXJlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHJvdW5kcyA9IG51bWJlck9mUm91bmRzW3RoaXMua2V5Lmxlbmd0aF07XG4gICAgICAgIGlmIChyb3VuZHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGtleSBzaXplIChtdXN0IGJlIDE2LCAyNCBvciAzMiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuY3J5cHRpb24gcm91bmQga2V5c1xuICAgICAgICB0aGlzLl9LZSA9IFtdO1xuXG4gICAgICAgIC8vIGRlY3J5cHRpb24gcm91bmQga2V5c1xuICAgICAgICB0aGlzLl9LZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHJvdW5kczsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9LZS5wdXNoKFswLCAwLCAwLCAwXSk7XG4gICAgICAgICAgICB0aGlzLl9LZC5wdXNoKFswLCAwLCAwLCAwXSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRLZXlDb3VudCA9IChyb3VuZHMgKyAxKSAqIDQ7XG4gICAgICAgIHZhciBLQyA9IHRoaXMua2V5Lmxlbmd0aCAvIDQ7XG5cbiAgICAgICAgLy8gY29udmVydCB0aGUga2V5IGludG8gaW50c1xuICAgICAgICB2YXIgdGsgPSBjb252ZXJ0VG9JbnQzMih0aGlzLmtleSk7XG5cbiAgICAgICAgLy8gY29weSB2YWx1ZXMgaW50byByb3VuZCBrZXkgYXJyYXlzXG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBLQzsgaSsrKSB7XG4gICAgICAgICAgICBpbmRleCA9IGkgPj4gMjtcbiAgICAgICAgICAgIHRoaXMuX0tlW2luZGV4XVtpICUgNF0gPSB0a1tpXTtcbiAgICAgICAgICAgIHRoaXMuX0tkW3JvdW5kcyAtIGluZGV4XVtpICUgNF0gPSB0a1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtleSBleHBhbnNpb24gKGZpcHMtMTk3IHNlY3Rpb24gNS4yKVxuICAgICAgICB2YXIgcmNvbnBvaW50ZXIgPSAwO1xuICAgICAgICB2YXIgdCA9IEtDLCB0dDtcbiAgICAgICAgd2hpbGUgKHQgPCByb3VuZEtleUNvdW50KSB7XG4gICAgICAgICAgICB0dCA9IHRrW0tDIC0gMV07XG4gICAgICAgICAgICB0a1swXSBePSAoKFNbKHR0ID4+IDE2KSAmIDB4RkZdIDw8IDI0KSBeXG4gICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+ICA4KSAmIDB4RkZdIDw8IDE2KSBeXG4gICAgICAgICAgICAgICAgICAgICAgKFNbIHR0ICAgICAgICAmIDB4RkZdIDw8ICA4KSBeXG4gICAgICAgICAgICAgICAgICAgICAgIFNbKHR0ID4+IDI0KSAmIDB4RkZdICAgICAgICBeXG4gICAgICAgICAgICAgICAgICAgICAgKHJjb25bcmNvbnBvaW50ZXJdIDw8IDI0KSk7XG4gICAgICAgICAgICByY29ucG9pbnRlciArPSAxO1xuXG4gICAgICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIChmb3Igbm9uLTI1NiBiaXQpXG4gICAgICAgICAgICBpZiAoS0MgIT0gOCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIGZvciAyNTYtYml0IGtleXMgaXMgXCJzbGlnaHRseSBkaWZmZXJlbnRcIiAoZmlwcy0xOTcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgKEtDIC8gMik7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR0ID0gdGtbKEtDIC8gMikgLSAxXTtcblxuICAgICAgICAgICAgICAgIHRrW0tDIC8gMl0gXj0gKFNbIHR0ICAgICAgICAmIDB4RkZdICAgICAgICBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gIDgpICYgMHhGRl0gPDwgIDgpIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAxNikgJiAweEZGXSA8PCAxNikgXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+IDI0KSAmIDB4RkZdIDw8IDI0KSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gKEtDIC8gMikgKyAxOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0a1tpXSBePSB0a1tpIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb3B5IHZhbHVlcyBpbnRvIHJvdW5kIGtleSBhcnJheXNcbiAgICAgICAgICAgIHZhciBpID0gMCwgciwgYztcbiAgICAgICAgICAgIHdoaWxlIChpIDwgS0MgJiYgdCA8IHJvdW5kS2V5Q291bnQpIHtcbiAgICAgICAgICAgICAgICByID0gdCA+PiAyO1xuICAgICAgICAgICAgICAgIGMgPSB0ICUgNDtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZVtyXVtjXSA9IHRrW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JvdW5kcyAtIHJdW2NdID0gdGtbaSsrXTtcbiAgICAgICAgICAgICAgICB0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbnZlcnNlLWNpcGhlci1pZnkgdGhlIGRlY3J5cHRpb24gcm91bmQga2V5IChmaXBzLTE5NyBzZWN0aW9uIDUuMylcbiAgICAgICAgZm9yICh2YXIgciA9IDE7IHIgPCByb3VuZHM7IHIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCA0OyBjKyspIHtcbiAgICAgICAgICAgICAgICB0dCA9IHRoaXMuX0tkW3JdW2NdO1xuICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JdW2NdID0gKFUxWyh0dCA+PiAyNCkgJiAweEZGXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVTJbKHR0ID4+IDE2KSAmIDB4RkZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVM1sodHQgPj4gIDgpICYgMHhGRl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFU0WyB0dCAgICAgICAgJiAweEZGXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBBRVMucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgaWYgKHBsYWludGV4dC5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3VuZHMgPSB0aGlzLl9LZS5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgYSA9IFswLCAwLCAwLCAwXTtcblxuICAgICAgICAvLyBjb252ZXJ0IHBsYWludGV4dCB0byAoaW50cyBeIGtleSlcbiAgICAgICAgdmFyIHQgPSBjb252ZXJ0VG9JbnQzMihwbGFpbnRleHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdFtpXSBePSB0aGlzLl9LZVswXVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IHJvdW5kIHRyYW5zZm9ybXNcbiAgICAgICAgZm9yICh2YXIgciA9IDE7IHIgPCByb3VuZHM7IHIrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gKFQxWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUMlsodFsoaSArIDEpICUgNF0gPj4gMTYpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDNbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ0WyB0WyhpICsgMykgJSA0XSAgICAgICAgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9LZVtyXVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gYS5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGxhc3Qgcm91bmQgaXMgc3BlY2lhbFxuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkoMTYpLCB0dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHR0ID0gdGhpcy5fS2Vbcm91bmRzXVtpXTtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSAgICBdID0gKFNbKHRbIGkgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF4gKHR0ID4+IDI0KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMV0gPSAoU1sodFsoaSArIDEpICUgNF0gPj4gMTYpICYgMHhmZl0gXiAodHQgPj4gMTYpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAyXSA9IChTWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeICh0dCA+PiAgOCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDNdID0gKFNbIHRbKGkgKyAzKSAlIDRdICAgICAgICAmIDB4ZmZdIF4gIHR0ICAgICAgICkgJiAweGZmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBBRVMucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGlmIChjaXBoZXJ0ZXh0Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3VuZHMgPSB0aGlzLl9LZC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgYSA9IFswLCAwLCAwLCAwXTtcblxuICAgICAgICAvLyBjb252ZXJ0IHBsYWludGV4dCB0byAoaW50cyBeIGtleSlcbiAgICAgICAgdmFyIHQgPSBjb252ZXJ0VG9JbnQzMihjaXBoZXJ0ZXh0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHRbaV0gXj0gdGhpcy5fS2RbMF1baV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSByb3VuZCB0cmFuc2Zvcm1zXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IChUNVsodFsgaSAgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ2Wyh0WyhpICsgMykgJSA0XSA+PiAxNikgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUN1sodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDhbIHRbKGkgKyAxKSAlIDRdICAgICAgICAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX0tkW3JdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSBhLnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgbGFzdCByb3VuZCBpcyBzcGVjaWFsXG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheSgxNiksIHR0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdHQgPSB0aGlzLl9LZFtyb3VuZHNdW2ldO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICAgIF0gPSAoU2lbKHRbIGkgICAgICAgICBdID4+IDI0KSAmIDB4ZmZdIF4gKHR0ID4+IDI0KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMV0gPSAoU2lbKHRbKGkgKyAzKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF4gKHR0ID4+IDE2KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMl0gPSAoU2lbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF4gKHR0ID4+ICA4KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgM10gPSAoU2lbIHRbKGkgKyAxKSAlIDRdICAgICAgICAmIDB4ZmZdIF4gIHR0ICAgICAgICkgJiAweGZmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIEVsZWN0b25pYyBDb2RlYm9vayAoRUNCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25FQ0IgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkVDQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiRWxlY3Ryb25pYyBDb2RlIEJsb2NrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiZWNiXCI7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkVDQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBwbGFpbnRleHQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQpO1xuXG4gICAgICAgIGlmICgocGxhaW50ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHBsYWludGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBjcmVhdGVBcnJheShwbGFpbnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhaW50ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KHBsYWludGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5lbmNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShibG9jaywgY2lwaGVydGV4dCwgaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25FQ0IucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGNpcGhlcnRleHQgPSBjb2VyY2VBcnJheShjaXBoZXJ0ZXh0KTtcblxuICAgICAgICBpZiAoKGNpcGhlcnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIG11bHRpcGxlIG9mIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYWludGV4dCA9IGNyZWF0ZUFycmF5KGNpcGhlcnRleHQubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2lwaGVydGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fYWVzLmRlY3J5cHQoYmxvY2spO1xuICAgICAgICAgICAgY29weUFycmF5KGJsb2NrLCBwbGFpbnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIENpcGhlciBCbG9jayBDaGFpbmluZyAoQ0JDKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DQkMgPSBmdW5jdGlvbihrZXksIGl2KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25DQkMpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkNpcGhlciBCbG9jayBDaGFpbmluZ1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImNiY1wiO1xuXG4gICAgICAgIGlmICghaXYpIHtcbiAgICAgICAgICAgIGl2ID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXYubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5pdGlhbGF0aW9uIHZlY3RvciBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdENpcGhlcmJsb2NrID0gY29lcmNlQXJyYXkoaXYsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DQkMucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkocGxhaW50ZXh0KTtcblxuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gY3JlYXRlQXJyYXkocGxhaW50ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShwbGFpbnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBibG9ja1tqXSBePSB0aGlzLl9sYXN0Q2lwaGVyYmxvY2tbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RDaXBoZXJibG9jayA9IHRoaXMuX2Flcy5lbmNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9sYXN0Q2lwaGVyYmxvY2ssIGNpcGhlcnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0JDLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBjaXBoZXJ0ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCk7XG5cbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFpbnRleHQgPSBjcmVhdGVBcnJheShjaXBoZXJ0ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNpcGhlcnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5kZWNyeXB0KGJsb2NrKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0W2kgKyBqXSA9IGJsb2NrW2pdIF4gdGhpcy5fbGFzdENpcGhlcmJsb2NrW2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgdGhpcy5fbGFzdENpcGhlcmJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIENpcGhlciBGZWVkYmFjayAoQ0ZCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DRkIgPSBmdW5jdGlvbihrZXksIGl2LCBzZWdtZW50U2l6ZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ0ZCKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDaXBoZXIgRmVlZGJhY2tcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJjZmJcIjtcblxuICAgICAgICBpZiAoIWl2KSB7XG4gICAgICAgICAgICBpdiA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGl2Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluaXRpYWxhdGlvbiB2ZWN0b3Igc2l6ZSAobXVzdCBiZSAxNiBzaXplKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWdtZW50U2l6ZSkgeyBzZWdtZW50U2l6ZSA9IDE7IH1cblxuICAgICAgICB0aGlzLnNlZ21lbnRTaXplID0gc2VnbWVudFNpemU7XG5cbiAgICAgICAgdGhpcy5fc2hpZnRSZWdpc3RlciA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0ZCLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIGlmICgocGxhaW50ZXh0Lmxlbmd0aCAlIHRoaXMuc2VnbWVudFNpemUpICE9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBzZWdtZW50U2l6ZSBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIHZhciB4b3JTZWdtZW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkgKz0gdGhpcy5zZWdtZW50U2l6ZSkge1xuICAgICAgICAgICAgeG9yU2VnbWVudCA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX3NoaWZ0UmVnaXN0ZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNlZ21lbnRTaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWRbaSArIGpdIF49IHhvclNlZ21lbnRbal07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IHRoZSByZWdpc3RlclxuICAgICAgICAgICAgY29weUFycmF5KHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDAsIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICAgICAgY29weUFycmF5KGVuY3J5cHRlZCwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMTYgLSB0aGlzLnNlZ21lbnRTaXplLCBpLCBpICsgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNGQi5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIHRoaXMuc2VnbWVudFNpemUpICE9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgc2VnbWVudFNpemUgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHhvclNlZ21lbnQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhaW50ZXh0Lmxlbmd0aDsgaSArPSB0aGlzLnNlZ21lbnRTaXplKSB7XG4gICAgICAgICAgICB4b3JTZWdtZW50ID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fc2hpZnRSZWdpc3Rlcik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zZWdtZW50U2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0W2kgKyBqXSBePSB4b3JTZWdtZW50W2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTaGlmdCB0aGUgcmVnaXN0ZXJcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9zaGlmdFJlZ2lzdGVyLCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAwLCB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShjaXBoZXJ0ZXh0LCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAxNiAtIHRoaXMuc2VnbWVudFNpemUsIGksIGkgKyB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gT3V0cHV0IEZlZWRiYWNrIChPRkIpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbk9GQiA9IGZ1bmN0aW9uKGtleSwgaXYpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbk9GQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiT3V0cHV0IEZlZWRiYWNrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwib2ZiXCI7XG5cbiAgICAgICAgaWYgKCFpdikge1xuICAgICAgICAgICAgaXYgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpdi5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbml0aWFsYXRpb24gdmVjdG9yIHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVyID0gY29lcmNlQXJyYXkoaXYsIHRydWUpO1xuICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXggPSAxNjtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jcnlwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID09PSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RQcmVjaXBoZXIgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9sYXN0UHJlY2lwaGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVySW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5jcnlwdGVkW2ldIF49IHRoaXMuX2xhc3RQcmVjaXBoZXJbdGhpcy5fbGFzdFByZWNpcGhlckluZGV4KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyBEZWNyeXB0aW9uIGlzIHN5bWV0cmljXG4gICAgTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5kZWNyeXB0ID0gTW9kZU9mT3BlcmF0aW9uT0ZCLnByb3RvdHlwZS5lbmNyeXB0O1xuXG5cbiAgICAvKipcbiAgICAgKiAgQ291bnRlciBvYmplY3QgZm9yIENUUiBjb21tb24gbW9kZSBvZiBvcGVyYXRpb25cbiAgICAgKi9cbiAgICB2YXIgQ291bnRlciA9IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ291bnRlcikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDb3VudGVyIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGFsbG93IDAsIGJ1dCBhbnl0aGluZyBmYWxzZS1pc2ggdXNlcyB0aGUgZGVmYXVsdCAxXG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgIT09IDAgJiYgIWluaXRpYWxWYWx1ZSkgeyBpbml0aWFsVmFsdWUgPSAxOyB9XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbml0aWFsVmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fY291bnRlciA9IGNyZWF0ZUFycmF5KDE2KTtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoaW5pdGlhbFZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRCeXRlcyhpbml0aWFsVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQ291bnRlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSAhPT0gJ251bWJlcicgfHwgcGFyc2VJbnQodmFsdWUpICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY291bnRlciB2YWx1ZSAobXVzdCBiZSBhbiBpbnRlZ2VyKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgY2Fubm90IHNhZmVseSBoYW5kbGUgbnVtYmVycyBiZXlvbmQgdGhlIHNhZmUgcmFuZ2UgZm9yIGludGVnZXJzXG4gICAgICAgIGlmICh2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludGVnZXIgdmFsdWUgb3V0IG9mIHNhZmUgcmFuZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTU7IGluZGV4ID49IDA7IC0taW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ZXJbaW5kZXhdID0gdmFsdWUgJSAyNTY7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlIC8gMjU2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvdW50ZXIucHJvdG90eXBlLnNldEJ5dGVzID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgYnl0ZXMgPSBjb2VyY2VBcnJheShieXRlcywgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGJ5dGVzLmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNvdW50ZXIgYnl0ZXMgc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSBieXRlcztcbiAgICB9O1xuXG4gICAgQ291bnRlci5wcm90b3R5cGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxNTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb3VudGVyW2ldID09PSAyNTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyW2ldID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcltpXSsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDb3VudGVyIChDVFIpXG4gICAgICovXG4gICAgdmFyIE1vZGVPZk9wZXJhdGlvbkNUUiA9IGZ1bmN0aW9uKGtleSwgY291bnRlcikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ1RSKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDb3VudGVyXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY3RyXCI7XG5cbiAgICAgICAgaWYgKCEoY291bnRlciBpbnN0YW5jZW9mIENvdW50ZXIpKSB7XG4gICAgICAgICAgICBjb3VudGVyID0gbmV3IENvdW50ZXIoY291bnRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSBjb3VudGVyO1xuXG4gICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXggPSAxNjtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBjb2VyY2VBcnJheShwbGFpbnRleHQsIHRydWUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jcnlwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID09PSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ZXIgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9jb3VudGVyLl9jb3VudGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIuaW5jcmVtZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmNyeXB0ZWRbaV0gXj0gdGhpcy5fcmVtYWluaW5nQ291bnRlclt0aGlzLl9yZW1haW5pbmdDb3VudGVySW5kZXgrK107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkO1xuICAgIH1cblxuICAgIC8vIERlY3J5cHRpb24gaXMgc3ltZXRyaWNcbiAgICBNb2RlT2ZPcGVyYXRpb25DVFIucHJvdG90eXBlLmRlY3J5cHQgPSBNb2RlT2ZPcGVyYXRpb25DVFIucHJvdG90eXBlLmVuY3J5cHQ7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gUGFkZGluZ1xuXG4gICAgLy8gU2VlOmh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyMzE1XG4gICAgZnVuY3Rpb24gcGtjczdwYWQoZGF0YSkge1xuICAgICAgICBkYXRhID0gY29lcmNlQXJyYXkoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIHZhciBwYWRkZXIgPSAxNiAtIChkYXRhLmxlbmd0aCAlIDE2KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KGRhdGEubGVuZ3RoICsgcGFkZGVyKTtcbiAgICAgICAgY29weUFycmF5KGRhdGEsIHJlc3VsdCk7XG4gICAgICAgIGZvciAodmFyIGkgPSBkYXRhLmxlbmd0aDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gcGFkZGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGtjczdzdHJpcChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBjb2VyY2VBcnJheShkYXRhLCB0cnVlKTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgMTYpIHsgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgaW52YWxpZCBsZW5ndGgnKTsgfVxuXG4gICAgICAgIHZhciBwYWRkZXIgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChwYWRkZXIgPiAxNikgeyB0aHJvdyBuZXcgRXJyb3IoJ1BLQ1MjNyBwYWRkaW5nIGJ5dGUgb3V0IG9mIHJhbmdlJyk7IH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGggLSBwYWRkZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkZGVyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2xlbmd0aCArIGldICE9PSBwYWRkZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BLQ1MjNyBpbnZhbGlkIHBhZGRpbmcgYnl0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KGxlbmd0aCk7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCByZXN1bHQsIDAsIDAsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFeHBvcnRpbmdcblxuXG4gICAgLy8gVGhlIGJsb2NrIGNpcGhlclxuICAgIHZhciBhZXNqcyA9IHtcbiAgICAgICAgQUVTOiBBRVMsXG4gICAgICAgIENvdW50ZXI6IENvdW50ZXIsXG5cbiAgICAgICAgTW9kZU9mT3BlcmF0aW9uOiB7XG4gICAgICAgICAgICBlY2I6IE1vZGVPZk9wZXJhdGlvbkVDQixcbiAgICAgICAgICAgIGNiYzogTW9kZU9mT3BlcmF0aW9uQ0JDLFxuICAgICAgICAgICAgY2ZiOiBNb2RlT2ZPcGVyYXRpb25DRkIsXG4gICAgICAgICAgICBvZmI6IE1vZGVPZk9wZXJhdGlvbk9GQixcbiAgICAgICAgICAgIGN0cjogTW9kZU9mT3BlcmF0aW9uQ1RSXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXRpbHM6IHtcbiAgICAgICAgICAgIGhleDogY29udmVydEhleCxcbiAgICAgICAgICAgIHV0Zjg6IGNvbnZlcnRVdGY4XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFkZGluZzoge1xuICAgICAgICAgICAgcGtjczc6IHtcbiAgICAgICAgICAgICAgICBwYWQ6IHBrY3M3cGFkLFxuICAgICAgICAgICAgICAgIHN0cmlwOiBwa2NzN3N0cmlwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FycmF5VGVzdDoge1xuICAgICAgICAgICAgY29lcmNlQXJyYXk6IGNvZXJjZUFycmF5LFxuICAgICAgICAgICAgY3JlYXRlQXJyYXk6IGNyZWF0ZUFycmF5LFxuICAgICAgICAgICAgY29weUFycmF5OiBjb3B5QXJyYXksXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBub2RlLmpzXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGFlc2pzXG5cbiAgICAvLyBSZXF1aXJlSlMvQU1EXG4gICAgLy8gaHR0cDovL3d3dy5yZXF1aXJlanMub3JnL2RvY3MvYXBpLmh0bWxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW1kanMvYW1kanMtYXBpL3dpa2kvQU1EXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoZGVmaW5lKSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7IHJldHVybiBhZXNqczsgfSk7XG5cbiAgICAvLyBXZWIgQnJvd3NlcnNcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBsaWJyYXJ5IGF0IFwiYWVzanNcIiBtYWtlIHN1cmUgaXQncyBzdGlsbCBhdmFpbGFibGVcbiAgICAgICAgaWYgKHJvb3QuYWVzanMpIHtcbiAgICAgICAgICAgIGFlc2pzLl9hZXNqcyA9IHJvb3QuYWVzanM7XG4gICAgICAgIH1cblxuICAgICAgICByb290LmFlc2pzID0gYWVzanM7XG4gICAgfVxuXG5cbn0pKHRoaXMpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQVlBO0FBQ0E7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9