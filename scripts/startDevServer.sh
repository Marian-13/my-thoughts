#!/usr/bin/env bash

finish() {
  rm public/cordova.js
  rm public/cordova_plugins.js
  rm -rf public/cordova-js-src
  rm -rf public/plugins

  exit 0
}

trap finish INT

cp -n platforms/browser/platform_www/cordova.js public/
cp -n platforms/browser/platform_www/cordova_plugins.js public/
cp -r -n platforms/browser/platform_www/cordova-js-src public/
cp -r -n platforms/browser/platform_www/plugins public/

# Throwing an error here is intentional
craco start
