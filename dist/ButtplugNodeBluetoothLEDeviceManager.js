"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var buttplug_1 = require("buttplug");
var events_1 = require("events");
var noble;
try {
    noble = require("noble-uwp");
}
catch (e) {
    noble = require("noble");
}
var ButtplugNodeBluetoothLEDevice_1 = require("./ButtplugNodeBluetoothLEDevice");
var ButtplugNodeBluetoothLEDeviceManager = /** @class */ (function (_super) {
    __extends(ButtplugNodeBluetoothLEDeviceManager, _super);
    function ButtplugNodeBluetoothLEDeviceManager() {
        var _this = _super.call(this) || this;
        _this.isScanning = false;
        _this.OpenDevice = function (device) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, deviceInfo, bpdevice, _b, _c, namePrefix, bpdevice;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (device === undefined) {
                            // TODO Throw here?
                            return [2 /*return*/];
                        }
                        // If the device doesn't even have a name, chances are we aren't interested.
                        if (device.advertisement.localName === undefined) {
                            return [2 /*return*/];
                        }
                        _i = 0, _a = buttplug_1.BluetoothDevices.GetDeviceInfo();
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        deviceInfo = _a[_i];
                        if (!(deviceInfo.Names.indexOf(device.advertisement.localName) > -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, ButtplugNodeBluetoothLEDevice_1.ButtplugNodeBluetoothLEDevice.CreateDevice(deviceInfo, device)];
                    case 2:
                        bpdevice = _d.sent();
                        this.emit("deviceadded", bpdevice);
                        return [2 /*return*/];
                    case 3:
                        _b = 0, _c = deviceInfo.NamePrefixes;
                        _d.label = 4;
                    case 4:
                        if (!(_b < _c.length)) return [3 /*break*/, 7];
                        namePrefix = _c[_b];
                        if (!(device.advertisement.localName.indexOf(namePrefix) !== -1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, ButtplugNodeBluetoothLEDevice_1.ButtplugNodeBluetoothLEDevice.CreateDevice(deviceInfo, device)];
                    case 5:
                        bpdevice = _d.sent();
                        this.emit("deviceadded", bpdevice);
                        return [2 /*return*/];
                    case 6:
                        _b++;
                        return [3 /*break*/, 4];
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        noble.on("discover", function (d) {
            _this.OpenDevice(d);
        });
        return _this;
    }
    ButtplugNodeBluetoothLEDeviceManager.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, rej;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initializerPromise = new Promise(function (resolve, reject) {
                            res = resolve;
                            rej = reject;
                        });
                        noble.on("stateChange", function (state) {
                            if (state === "poweredOn") {
                                res();
                                return;
                            }
                            rej();
                        });
                        // TODO Add timeout here in case we don't find or have a radio.
                        return [4 /*yield*/, this.initializerPromise];
                    case 1:
                        // TODO Add timeout here in case we don't find or have a radio.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ButtplugNodeBluetoothLEDeviceManager.prototype.StartScanning = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                noble.startScanning();
                this.isScanning = true;
                return [2 /*return*/];
            });
        });
    };
    ButtplugNodeBluetoothLEDeviceManager.prototype.StopScanning = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                noble.stopScanning();
                this.isScanning = false;
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(ButtplugNodeBluetoothLEDeviceManager.prototype, "IsScanning", {
        get: function () {
            return this.isScanning;
        },
        enumerable: true,
        configurable: true
    });
    return ButtplugNodeBluetoothLEDeviceManager;
}(events_1.EventEmitter));
exports.ButtplugNodeBluetoothLEDeviceManager = ButtplugNodeBluetoothLEDeviceManager;
//# sourceMappingURL=ButtplugNodeBluetoothLEDeviceManager.js.map