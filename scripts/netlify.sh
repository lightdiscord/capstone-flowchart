#!/usr/bin/env bash

set -e

# Setup emscripten

git clone https://github.com/emscripten-core/emsdk.git

./emsdk/emsdk install latest
./emsdk/emsdk activate latest
source ./emsdk/emsdk_env.sh

# Build capstone with emscripten

git clone https://github.com/aquynh/capstone.git

MAKEFLAGS="PREFIX=$PWD/capstone-lib CAPSTONE_BUILD_CORE_ONLY=yes"

emmake make -C capstone $MAKEFLAGS all
emmake make -C capstone $MAKEFLAGS install

export PKG_CONFIG_PATH="$PWD/capstone"

# Build capstone-engine wasm module

make -C packages/capstone-engine all

# Build capstone-flowchart website

npm i -g pnpm

pnpm install
pnpm -C packages/builder run build
