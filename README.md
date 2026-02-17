# CUC26 Cascade CMS Rest API Workshop

We'll be using this repository for our CUC26 [Cascade CMS Rest API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) Workshop!

The [original repository](https://github.com/kuklaph/cascade-cms-api) was created by [Philip Kukla](https://github.com/kuklaph). His repository included a JS library that primarily uses NodeJS and Google Scripts but also had a vanilla JS fetch option. Although the library itself was great, the standout piece for me was the Rest API operations documentation! I had been working on my own library on and off for a couple of years now, it focuses on client side JS you can run without a lot of setup but useful enough for a few small client facing scripts. I just never had time to polish and finish it. Until now, kind of! With Philip's permission, I forked his repository, updated a few things here and there and fully replaced the library itself. If you prefer to use NodeJS and/or Google Scripts, I highly suggest you check out his [library](https://github.com/kuklaph/cascade-cms-api)!

## Cascade Documentation

You can find an openAPI representation of Cascade CMS's WSDL operations here:

[https://hannonhill.github.io/cascadecms-restapi-workshop/swagger-ui/](https://hannonhill.github.io/cascadecms-restapi-workshop/swagger-ui/)

All information originates from Cascade CMS's WSDL operations page. In order to access this you will need to use your organization as a subdomain followed by this url: `cascadecms.com/ws/services/AssetOperationService?wsdl`

Example: `yourOrg.cascadecms.com/ws/services/AssetOperationService?wsdl`

## General Usage

To use the library you will need to define your Cascade CMS URL and Cascade CMS [API Key](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#APIKey) (v8.16 and later). The `apiKey` is generated in your Cascade dashboard. The `url` is `yourOrg.cascadecms.com/api/v1/` (this is the current version as of 02/16/2026).

```js
//Example
const cmsUrl = "https://xxxx.cascadecms.com/";
const cmsAPI = "xxxxx-xxx-xxxx-xxx-xxxxxx";
```

Example Operations

```js
// read asset
readAsset({
	type: "page",
	id: "page ID",
})
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error);
	});

// edit asset
readAsset({
	type: "page",
	id: "page ID",
})
	.then(function (result) {
		result.apiReturn.asset.page.metadata.title = "NEW TITLE";
		editAsset({
			asset: result.apiReturn,
		})
			.then(function (result) {
				console.log(result);
			})
			.catch(function (error) {
				console.log(error);
			});
	})
	.catch(function (error) {
		console.log(error);
	});
```

More examples in the example folder.
