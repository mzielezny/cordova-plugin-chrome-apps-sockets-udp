# UDP communication Plugin for electron

This plugin provides UDP sockets for Android, iOS and Electron

## Status

Beta on Android and iOS - work in progress for Electron


## How to start using electron plugin ? 

First you have to add to below entry to config.xml - it is containing path to file which contain electron starting settings

```xml
<platform name="electron">
    <preference name="ElectronSettingsFilePath" value="resources/electron/settings.json" />
</platform>
	
```

in that settings file you have to configure node integration support 

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
you have to remove platform and add again (as below) 

```bash
cordova platform remove electron 
cordova platform remove electron@1.1.1 # or any modern version 
```

Please remember that if yout want to run node plugin you have to use npm.
 
To import any node module you have to use "global.require" - main require is overriden by cordova



## Exmaple of UDP broadcast and listening to response

```typescript

  port = 33377;

  private numberToArrayBuffer(value: number) {
    const view = new DataView(new ArrayBuffer(4));
    view.setInt32(0, value, true);
    return view.buffer;
  }

  private send(): void {
    window["chrome"].sockets.udp.send(
      this.socketID,
      this.numberToArrayBuffer(this.port),
      "255.255.255.255",
      33388,
      sendResult => {
        console.log(sendResult);
      }
    );
  }

  private create(): void {
    if (this.socketID) {
      this.socketID = null;
      window["chrome"].sockets.udp.close(this.socketID);
    }

    window["chrome"].sockets.udp.create({}, createInfo => {
      this.socketID = createInfo["socketId"];

      window["chrome"].sockets.udp.receiveIntentionally();
      window["chrome"].sockets.udp.onReceive.addListener(result => {
        console.log(result);
      });

      window["chrome"].sockets.udp.bind(
        this.socketID,
        "0.0.0.0",
        this.port,
        bindResult => {
          window["chrome"].sockets.udp.setBroadcast(
            this.socketID,
            true,
            broadcastResult => {}
          );
        }
      );
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
