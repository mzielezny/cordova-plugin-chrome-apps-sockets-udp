# chrome.sockets.tcp Plugin electron

This plugin provides UDP sockets for Android, iOS and Electron

## Status

Beta on Android and iOS - work in progress for Electron


## How to start using electron plugin ? 

Firstly you have to add to config.xml path to file which will be used when to configure electron start

```xml
<platform name="electron">
    <preference name="ElectronSettingsFilePath" value="resources/electron/settings.json" />
</platform>
	
```

in that file you have to configure node integration support 

```javascript
{
    "browserWindow": {
        "height": 600,
        "webPreferences":{
            "devTools": true,
            "nodeIntegration": true
        },
        "width": 1024
    }
}
	
```

after each plugin modification (yes you cane modificate plugin  by yourself in main plugin location) 
you have to run 

```bash
cordova platform remove electron 
cordova platform remove electron@1.1.1 # or any modern version 
```

Please remember that if yout want to run node plugin you have to use npm. 
To import any module you have to use "global.require" - main require is overriden by cordova


## Reference

The API reference is [here](https://developer.chrome.com/apps/sockets_udp).

# Release Notes

Based on original plugin source https://github.com/MobileChromeApps/cordova-plugin-chrome-apps-sockets-udp

## 1.3.0 (Sep 27, 2016)
- Adds `chrome.udp.setBroadcast()`

## 1.2.2 (April 30, 2015)
- Renamed plugin to pubilsh to NPM

## 1.2.1 (Mar 17, 2015)
* Fix multicast socket cannot pause & send receive event synchronously

## 1.2.0 (November 17, 2014)
* Remove unnecessary headers for chrome.sockets.* - ios
* Fix possible blocks leak memory
* Fixed chrome.sockets.udp socket close with error problem
* Commented out assert that caused app to crash when no network is available.
* chrome.sockets: open selector in selector thread
* Don't modify interest set when key is invalid (fix #388)

## 1.1.0 (October 24, 2014)
* Add `chrome.sockets.secure.tcp` and refactor `chrome.sockets.*`

## 1.0.1 (October 23, 2014)
* Fix a NullPointerException on Android
* Fix the dependency on iosSocketsCommon so that it works with the Cordova plugin registry.

## 1.0.0 (October 21, 2014)
* Initial release
