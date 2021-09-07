# SFRA Webpack builder

## Why use it?
Webpack can be cumbersome to setup, especially in multicartridge projects for SFRA.
This plugin let you bundle all your `js`, `scss` and `jsx` files out of the box.

- One pre-build `webpack.config.js` for all cartridges and plugins
- No more `sgmf-script`, which interferes with `Prophet uploader`
- Supports multicartridge projects due to simple configuration
- Supports aliases for `commonjs` or `esm` loading
- Supports eslint while watching
- Supports reuse of node_modules dependencies from other cartridges

## Prerequisite

- Add this repository to your project : `npm install SalesforceCommerceCloud/sfra-webpack-builder`
- Add the commands needed to execute to your `package.json`
```json
"npmInstall": "node ./node_modules/sfra-webpack-builder/installHandling/install.js",
"prod": "webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js --env.dev=false",
"dev": "webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js  --env.dev",
"watch": "webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js  --env.dev --watch",
"watch:lint": "webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js  --env.dev --env.useLinter --watch"
```
- Run `npm install`.

Example Structure

```
.
+-- storefront-reference-**applicaton******
+-- plugin_one
+-- plugin_two
+-- ....
+-- node_modules
+----- ....
+----- sfra-webpack-builder
+----- ....
```

***Make sure you installed node_modules in your plugins as well using npm install command***

**Other structures are also supported - configure the path accordingly in `sfraBuilderConfig.js`**

## Usage

- Copy `node_modules/sfra-webpack-builder/webpackHandling/example_sfraBuilderConfig.js` to the root-level of your project and rename it to `sfraBuilderConfig.js`

*Example command*
```bash
$ cp node_modules/sfra-webpack-builder/webpackHandling/example_sfraBuilderConfig.js .
$ mv example_sfraBuilderConfig.js sfraBuilderConfig.js
```
- In the `package.json` of the project, add the key `sfraBuilderConfig` and add the location, where your sfraBuilderConfig is located.
*Example* 

`"sfraBuilderConfig": "./sfraBuilderConfig"`

- Configure *cartridges* and *aliases* in `sfraBuilderConfig.js` (based on the location of `sfraBuilderConfig.js`)
**(Ensure that the paths in `sfraBuilderConfig.js` point correctly to the included SFRA and plugins according to your directory structure)** The paths needs to be set relatively to *webpack.config.js*
- Run `npm run npmInstall`. This will setup all cartridges's node_modules dependencies in the directories which are defined in `sfraBuilderConfig.js` `cartridges` array.
- Run `npm run watch` or `npm run prod`. This will compile all related `js/jsx & css` files included in the directories which are defined in `sfraBuilderConfig.js`

### Aliases

`module.exports.aliasConfig` let you specify, how to load module packages inside your plugin. Further information can be found in the [WebpackDocumentation](https://webpack.js.org/configuration/resolve/)

```js
module.exports.aliasConfig = {
    // enter all aliases to configure
    base: path.resolve(
        process.cwd(),
        '../storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/'
    ),
    CustomPlugin: path.resolve(
        process.cwd(),
        '../plugin_wishlists/cartridges/plugin_wishlists/cartridge/client/default/'
    )
}
```

The alias `CustomPlugin` allows to retrieve modules through cartridges by using `require('CustomPlugin/default/js/myFile.js');` or `import Foo from CustomPlugin/default/js/myFile`;

### Testing
This project contains tests which rely on `mocha`.
Please run using `npm run test`

### Acknowledgement
This project was inspired by, and is a heavily modified version of [sfra-webpack-setup](https://github.com/danechitoaie/sfra-webpack-setup)

Thanks to *@danechitoaie* (https://github.com/danechitoaie)

### License

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)
