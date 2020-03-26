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


## Cup of caffe ? 
If you were frustrated how to create cordova electron plugin and my code a little help you could buy me a cup of caffe by 
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=P829CRENNQRGC&item_name=New+developer+opportunities&currency_code=USD&source=url)

## Exmaple UDP  broadcast code

```typescript

   private static numberToArrayBuffer(value: number) {
        const view = new DataView(new ArrayBuffer(4));
        view.setInt32(0, value, true);
        return view.buffer;
    }

    public search(): void {
        if (this.socketID) {
            this.socketID = null;
            window['chrome'].sockets.udp.close(this.socketID);
        }
        window['chrome'].sockets.udp.create({}, (createInfo) => {
            this.socketID = createInfo['socketId'];
            const posPort = 33377;
            window['chrome'].sockets.udp.bind(this.socketID, '0.0.0.0', posPort, (bindResult) => {
                window['chrome'].sockets.udp.setBroadcast(this.socketID, true, (broadcastResult) => {
                    window['chrome'].sockets.udp.send(
                        this.socketID,
                        ConnectionService.numberToArrayBuffer(posPort),
                        '255.255.255.255',
                        33388,
                        (sendResult) => {
                            console.log(sendResult);
                            setTimeout(() => {
                                window['chrome'].sockets.udp.onReceive.addListener((result) => {
                                    console.log(this.result);
                                });
                            }, 10000);
                        });
                });
            });
        });
    }

```

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
