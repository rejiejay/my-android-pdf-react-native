# 项目初始化

npx react-native init AndroidPdfReactNative

## 权限
android/app/src/main/AndroidManifest.xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

## react-native-fs
https://github.com/itinance/react-native-fs

cnpm install react-native-fs --save -d

npx react-native unlink react-native-fs
cd android && ./gradlew clean && cd ..

## react-native-pdf
npm install react-native-pdf rn-fetch-blob @react-native-community/progress-bar-android @react-native-community/progress-view --save -d
npx react-native unlink react-native-pdf
npx react-native unlink rn-fetch-blob
npx react-native unlink @react-native-community/progress-bar-android
npx react-native unlink @react-native-community/progress-view

android {
+    packagingOptions {
+       pickFirst 'lib/x86/libc++_shared.so'
+       pickFirst 'lib/x86_64/libjsc.so'
+       pickFirst 'lib/arm64-v8a/libjsc.so'
+       pickFirst 'lib/arm64-v8a/libc++_shared.so'
+       pickFirst 'lib/x86_64/libc++_shared.so'
+       pickFirst 'lib/armeabi-v7a/libc++_shared.so'
+     }
}

cd android && gradlew clean && cd ..
cd android && ./gradlew clean && cd ..

## async-storage
npm install @react-native-async-storage/async-storage --save -d

## react-navigation (暂时废弃)
npm install --save react-navigation

## 腾讯云对象存储  Android SDK
1. 使用 mavenCentral 仓库
2. 标准版 SDK


## 加载
yarn install -d

## gradlew clean

sudo chmod +x gradlew
cd android && gradlew clean && cd ..
cd android && ./gradlew clean && cd ..

## 弹出Debug
adb shell input keyevent 82

## 安卓开发自带模拟器联网问题
1.打开SDK目录进入emulator文件夹
2.ipconfig /all查看本机DNS
3.输入命令 .\emulator -avd 模拟器名 -dns-server 你自己的DNS地址
```
emulator -avd Android_10 -dns-server 192.168.88.90
emulator -avd A9 -dns-server 192.168.88.90
```
adb root
adb shell
getprop

[net.dns1]: [10.0.2.3]
[net.eth0.dns1]: [10.0.2.3]

setprop net.dns1 192.168.88.90
setprop net.eth0.dns1 192.168.88.90
exit


## react-native启动时红屏报错：Unable to load script.Make sure you're either running a metro server or that

mkdir android/app/src/main/assets

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

## npx react-native start 
http://localhost:8081/debugger-ui/
http://localhost:8081/index.android.bundle?platform=android

## Android Log (No)
npx react-native log-ios
npx react-native log-android
