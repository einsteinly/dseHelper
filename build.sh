#!/bin/bash

pushd ./platforms/android/build/outputs/apk/
./sign.sh android-release-unsigned.apk
./zipalign -v 4 android-release-unsigned.apk $1
popd
