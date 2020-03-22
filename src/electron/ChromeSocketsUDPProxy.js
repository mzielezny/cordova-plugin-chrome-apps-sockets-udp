/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
(function () {
    /* global require, exports, module */
    /* global FILESYSTEM_PREFIX */
    /* global IDBKeyRange */
    /* global FileReader */
    /* global atob, btoa, Blob */

    if (global.require === undefined) {
        console.error(
            'Electron Node.js integration is disabled, you can not use cordova-file-plugin without it\n' +
            'Check docs how to enable Node.js integration: https://cordova.apache.org/docs/en/latest/guide/platforms/electron/#quick-start');
        return;
    }

    console.log("In electron version of cordova plugin");

    const dgram = global.require('dgram');
    var socketArray = [];
    var onReceive;

    (function (exports, global) {

        exports.create = function (successCallback, errorCallback, args) {

            var size = 4096;
            if (args[bufferSize] !== undefined) {
                size = args[bufferSize]
            }

            var socket = dgram.createSocket({
                    type: 'udp4',
			recvBufferSize: size});

                    socketArray.push(socket);

                    successCallback(0);

                }

                exports.update = function (successCallback, errorCallback, args) {

                    var size = 4096;

                    if (args[bufferSize] !== undefined) {
                        size = args[bufferSize]
                    }

                    socket.setRecvBufferSize(size)
                }

                exports.setPaused = function (successCallback, errorCallback, args) {}

                    exports.bind = function (successCallback, errorCallback, args) {

                    var socketId = args[0];
                    var hostname = args[1];
                    var userPort = args[2];

                    socketArray[socketId].bind({
                        address: hostname,
                        port: userPort
                    }, () => {
                        successCallback(0);

                        socketArray[socketId].on('message', (msg, rinfo) => {

                            console.log(msg);
                            console.log(rinfo);

                            onReceive(socketId, msg, rinfo.address, rinfo.port);
                        });
                    });

                }

                exports.send = function (successCallback, errorCallback, args) {

                    var socketId = args[0];

                    var address = args[1];
                    var port = args[2];
                    var value = new Uint8Array(args[3]);

                    socketArray[socketId].send(value, port, address, successCallback);

                }

                exports.close = function (successCallback, errorCallback, args) {

                    var socketId = args[0];
                    socketArray[socketId].close();
                }

                exports.getInfo = function (successCallback, errorCallback, args) {}

                exports.getSockets = function (successCallback, errorCallback, args) {}

                exports.joinGroup = function (successCallback, errorCallback, args) {}

                exports.leaveGroup = function (successCallback, errorCallback, args) {}

                exports.setMulticastTimeToLive = function (successCallback, errorCallback, args) {

                    var socketId = args[0];
                    socket.setMulticastTTL(args[1]);
					
				}

                exports.setBroadcast = function (successCallback, errorCallback, args) {

                    var socketId = args[0];
                    var address = args[1];
                    var port = args[2];

                    socketArray[socketId].setBroadcast(true);
                    successCallback(0);

                }

                exports.getJoinedGroups = function (successCallback, errorCallback, args) {}

                exports.registerReceiveEvents = function (successCallback, errorCallback, args) {

                    onReceive = successCallback;

                }

        })(module.exports, window);

        require('cordova/exec/proxy').add('ChromeSocketsUdp', module.exports);
    })();
