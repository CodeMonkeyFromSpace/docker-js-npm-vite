#!/bin/sh
set -e
npm install
export CI=true
npm test ${@}