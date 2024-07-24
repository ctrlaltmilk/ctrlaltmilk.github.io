#!/bin/sh

magick favicon.png -scale 256 -define icon:auto-resize=16,32,48,128,256 favicon.ico
