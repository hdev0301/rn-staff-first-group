#  FirstStudent
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install Gulp CLI with `npm rm --global gulp && npm install --global gulp-cli`

**Step 4:** Install the Application with `npm install`

**Step 5:** Install Pods `sudo gem install cocoapods && cd ios && pod install`

## :arrow_forward: How to set environment

  * Development: `npm run setup:develop`
  * Staging: `npm run setup:staging`
  * AppStore: `npm run setup:appstore`

## :arrow_forward: How to Run App

  1. cd to the repo
  2. Run the development server `npm start`
  4. Run Build for either OS
    * for iOS
      * run `react-native run-ios`
    * for Android Genymotion
      * Run Genymotion
      * run `react-native run-android`
    * for Android hardware device
      * connect device and ensure it is listed correctly with `adb devices`
      * forward port 8081 (dev server) `adb reverse tcp:8081 tcp:8081`
      * run `react-native run-android`


## :arrow_forward: How to build a release

#### Build Android release app
  1. Run only first time `sudo gem install fastlane`, next time run the same but with `update`
  2. Run `npm run android:build`
  3. The built apk is at `./android/app/build/outputs/apk/app-release.apk`
  4. Install to a device using adb `adb install ./android/app/build/outputs/apk/app-release.apk`
     (you will need to uninstall the dev version first if installed)

#### Build Android release app and deploy it to the PlayStore (alpha testing)
  1. Run only first time `sudo gem install fastlane`, next time run the same but with `update`
  2. Run `npm run android:deploy`

#### How to generate signing key
  * `keytool -genkey -v -keystore firstgroup-staff-key.keystore -alias firstgroup-staff -keyalg RSA -keysize 2048 -validity 10000`

### iOS

* Required Xcode version is 7.3.1

#### How to set Xcode 7.3.1 version as default
  1. Download [Xcode 7.3.1](https://developer.apple.com/services-account/download?path=/Developer_Tools/Xcode_7.3.1/Xcode_7.3.1.dmg)
  2. Install it into folder `/Applications/Xcode_7.3.1.app`
  3. `sudo xcode-select -switch /Applications/Xcode_7.3.1.app`

#### How to reset to default Xcode version
  * `sudo xcode-select --reset`

#### Build iOS release app
  1. Run only first time `sudo gem install fastlane`, next time run the same but with `update`
  2. Run `npm run ios:build`
  3. The built ipa is at `./FirstStudent.ipa`

#### Build iOS release app and deploy it to the Testflight (beta testing)
  1. Run only first time `sudo gem install fastlane`, next time run the same but with `update`
  2. Run `npm run ios:deploy`

#### How to create Push certificate
  * Development: `fastlane pem -u ross@commutable.com -a com.commutable.firstgroupstaff --generate_p12 -s -p commutable`
  * Staging: `fastlane pem -u iphone@utrack.com -a com.utrack.firstgroupstaff -b C2W62EMZ72 --generate_p12 -s -p commutable`
  * AppStore: `fastlane pem -u iphone@utrack.com -a com.firstgroup.firstgroupstaff -b 9BD6VT39FR --generate_p12 -s -p commutable`

#### How to fetch or recreate latest certificates
  * `fastlane match appstore`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
