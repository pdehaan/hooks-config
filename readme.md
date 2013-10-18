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

## Change Log

### 0.0.0

* mvp