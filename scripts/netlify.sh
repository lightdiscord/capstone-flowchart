#!/usr/bin/env bash

set -e

ROOT=$(mktemp -d)

# Setup emscripten

git clone https://github.com/emscripten-core/emsdk.git $ROOT/emsdk

$ROOT/emsdk/emsdk install latest
$ROOT/emsdk/emsdk activate latest
source $ROOT/emsdk/emsdk_env.sh

# Build capstone with emscripten

git clone https://github.com/aquynh/capstone.git $ROOT/capstone

MAKEFLAGS="PREFIX=$ROOT/capstone-lib CAPSTONE_BUILD_CORE_ONLY=yes"

emmake make -C $ROOT/capstone $MAKEFLAGS all
emmake make -C $ROOT/capstone $MAKEFLAGS install

export PKG_CONFIG_PATH="$ROOT/capstone"

# Build capstone-engine wasm module

pnpm -C packages/capstone-engine run build:wasm

# Build capstone-flowchart website

npm i -g pnpm

pnpm install

export NODE_ENV="production"

pnpm -C packages/builder run build
