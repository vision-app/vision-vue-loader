# @vusion/vue-loader

<!-- [![Build Status](https://circleci.com/gh/vuejs/vue-loader/tree/master.svg?style=shield)](https://circleci.com/gh/vuejs/vue-loader/tree/master) [![npm package](https://img.shields.io/npm/v/vue-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-loader) -->

> This is a fork of [vue-loader](https://github.com/vuejs/vue-loader) with some modifications for handling Vusion Components.
> Sync to vue-loader@13.5.0

## Modifications

### lib/loader.js
- Change `Object.defineProperty` to `Object.assign` for `__vueOptions__`
- Add `midLoaders` option
- Keep `cssModules` always exist
- Delete `Component.options._Ctor`
- Remove `_[index]` in `query.localIdentName` to make different `<style>` tags in same situation

### lib/normalize.js
- Change dep path

### Others
- Forge AST when using server mode

## Origins
# vue-loader
 <!-- [![Build Status](https://circleci.com/gh/vuejs/vue-loader/tree/master.svg?style=shield)](https://circleci.com/gh/vuejs/vue-loader/tree/master) [![Windows Build status](https://ci.appveyor.com/api/projects/status/8cdonrkbg6m4k1tm/branch/master?svg=true)](https://ci.appveyor.com/project/yyx990803/vue-loader/branch/master) [![npm package](https://img.shields.io/npm/v/vue-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-loader) -->

> Vue.js component loader for [Webpack](https://webpack.js.org/).

<p align="center">
  <img width="809px" src="https://raw.githubusercontent.com/vuejs/vue-syntax-highlight/master/samples/screenshot.png">
</p>

The best way to get started is with [vue-cli](https://github.com/vuejs/vue-cli):

``` js
npm install -g vue-cli
vue init webpack-simple hello
cd hello
npm install
npm run dev
```

This will setup a basic Webpack + `vue-loader` project for you, with `*.vue` files and hot-reloading working out of the box!

For advanced `vue-loader` configuration, checkout the [documentation](https://vue-loader.vuejs.org).
