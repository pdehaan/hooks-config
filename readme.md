# Hooks Config

This module helps you interact with the config section of the hooks.json file which drives [hooks]().

## Usage

`npm install hooks-config`

```
var hksConfig = require("hooks-config");
hksConfig.view(function(data){
	data.setting = "set";
	hksConfig.save(data, function(err){
		if(err){
			//really, this should never happen...
		}
	});
});
```

## API

### hksConfig.hookModule

The hook module to access. This will default to the module the script is currently being run in.

### hksConfig.view(callback)

Returns an object representing the config options set for the module currently specified.

### hksConfig.save(data, callback)

Saves the provided object as the new config for the current object. This will override any values not passed in.

### hksConfig.project

Boolean defaulted to true. Setting this to false, will mean all the 

## Change Log

### 0.0.2

* Adding in boolean flip, to aid in accessing user only config's vs project wide configs.

### 0.0.1

* bug fix with undefined config object

### 0.0.0

* mvp

