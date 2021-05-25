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

cd android && ./gradlew clean && cd ..


## 加载
yarn install -d

## gradlew clean

sudo chmod +x gradlew
cd android && ./gradlew clean && cd ..

## 弹出Debug
adb shell input keyevent 82
