#!/bin/bash
set -e
npm install
export CI=true
npm test ${@}