/* Step 1: Add the Cascade CMS URL*/
const cmsUrl = "https://workshops.cascadecms.com/";

/* Step 2: Create and add your Cascade API Key. */
// Additional details on API Setup found here- https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#APIKey */
if (typeof cmsAPI === 'undefined') { // API Key loaded from creds.js (if available), otherwise set it here:
    cmsAPI = "YOUR API KEY HERE"; // fill in your API key if not using creds.js
}
// Note: If you get the error "The requested asset does not exist" and you're trying to access an existing asset, please double check your API Key.

/* Step 3: Update to YOUR site name */
const siteName = "CUC26 Web Services Essentials Workshop - Work Site"; // fill in

/* Step 4: Save! */

const headers = { Authorization: "Bearer " + cmsAPI };

const root = "%252F"; // Double-encoded forward slash ( / ) - used to read the root folder by path

async function readAsset(a) {
	let url;
	if (a.type == "user") {
		url = cmsUrl + "api/v1/read/" + a.type + "/" + a.path;
	} else if (a.path) {
		url = cmsUrl + "api/v1/read/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/read/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	if (a.debug) {
		console.log("Fetch URL " + url);
	}
	const r = await fetch(url, { headers: headers });
	const data = await r.json();
	if (data.success) {
		return { read_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { read_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

async function editAsset(a) {
	const r = await fetch(cmsUrl + "api/v1/edit", { method: "POST", headers: headers, body: JSON.stringify({ asset: a.asset.asset }) });
	const data = await r.json();
	if (data.success) {
		return { edit_status: "Success", sent: a, apiReturn: data };
	} else {
		throw { edit_status: "Error", error: data.message, sent: a, apiReturn: data };
	}
}

async function copyAsset(a) {
	let url;
	if (a.path) {
		url = cmsUrl + "api/v1/copy/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/copy/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	const r = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify({ copyParameters: a.copyParameters }) });
	const data = await r.json();
	if (data.success) {
		return { copy_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { copy_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

async function moveAsset(a) {
	let url;
	if (a.path) {
		url = cmsUrl + "api/v1/move/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/move/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	const r = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify({ moveParameters: a.moveParameters }) });
	const data = await r.json();
	if (data.success) {
		return { move_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { move_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

async function deleteAsset(a) {
	let url;
	if (a.path) {
		url = cmsUrl + "api/v1/delete/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/delete/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	const r = await fetch(url, { method: "POST", headers: headers });
	const data = await r.json();
	if (data.success) {
		return { delete_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { delete_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

async function createAsset(a) {
	const r = await fetch(cmsUrl + "api/v1/create", { method: "POST", headers: headers, body: JSON.stringify({ asset: a.asset }) });
	const data = await r.json();
	if (data.success) {
		return { create_status: "Success", sent: a, apiReturn: data };
	} else {
		throw { create_status: "Error", error: data.message, sent: a, apiReturn: data };
	}
}

async function listSubscribers(a) {
	let url;
	if (a.path) {
		url = cmsUrl + "api/v1/listSubscribers/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/listSubscribers/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	if (a.debug) {
		console.log("Fetch URL " + url);
	}
	const r = await fetch(url, { headers: headers });
	const data = await r.json();
	if (data.success) {
		return { listSubscribers_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { listSubscribers_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

async function relationships(a) {
    let url;
    if (a.path) {
        url = cmsUrl + "api/v1/relationships/" + a.type + "/" + a.siteName + "/" + a.path;
    } else if (a.id) {
        url = cmsUrl + "api/v1/relationships/" + a.type + "/" + a.id;
    }
    url = url.replace(/\\\\/g, "\\");
    if (a.debug) {
        console.log("Fetch URL " + url);
    }
    const r = await fetch(url, { headers: headers });
    const data = await r.json();
    if (data.success) {
        return { relationships_status: "Success", sent: a, apiReturn: data, url: url };
    } else {
        throw { relationships_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
    }
}

async function listSites(a) {
	const r = await fetch(cmsUrl + "api/v1/listSites", { headers: headers });
	const data = await r.json();
	if (data.success) {
		return { listSites_status: "Success", sent: a, apiReturn: data };
	} else {
		throw { listSites_status: "Error", error: data.message, sent: a, apiReturn: data };
	}
}

async function copySite(a) {
	const r = await fetch(cmsUrl + "api/v1/siteCopy", { method: "POST", headers: headers, body: JSON.stringify(a) });
	const data = await r.json();
	if (data.success) {
		return { edit_status: "Success", sent: a, apiReturn: data };
	} else {
		throw { edit_status: "Error", error: data.message, sent: a, apiReturn: data };
	}
}

async function search(a) {
	const r = await fetch(cmsUrl + "api/v1/search", { method: "POST", headers: headers, body: JSON.stringify({ searchInformation: a.searchInformation }) });
	const data = await r.json();
	if (data.success) {
		return { search_status: "Success", sent: a, apiReturn: data };
	} else {
		throw { search_status: "Error", error: data.message, sent: a, apiReturn: data };
	}
}

async function publishAsset(a) {
	let url;
	if (a.path) {
		url = cmsUrl + "api/v1/publish/" + a.type + "/" + a.siteName + "/" + a.path;
	} else if (a.id) {
		url = cmsUrl + "api/v1/publish/" + a.type + "/" + a.id;
	}
	url = url.replace(/\\\\/g, "\\");
	if (a.debug) {
		console.log("Fetch URL " + url);
	}
	const r = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify({ publishInformation: a.publishInformation }) });
	const data = await r.json();
	if (data.success) {
		return { read_status: "Success", sent: a, apiReturn: data, url: url };
	} else {
		throw { read_status: "Error", error: data.message, sent: a, apiReturn: data, url: url };
	}
}

function dateToDateTime(d) {
	const date = new Date(d);
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
}

function v(text) {
	if (text === null || text === undefined || text === "") {
		return "";
	} else {
		return text;
	}
}

function w(text) {
	if (text === null || text === undefined || text === "") {
		return "";
	} else {
		text = text.replaceAll("&amp;#160;", " ");
		text = text.replaceAll("&#160;", " ");
		text = decodeHTMLEntities(text);
		text = text.replaceAll("<br>", "<br />");
		text = text.replaceAll("&", "&amp;");
		return text;
	}
}

function camelCase(data) {
	let text = data
		.replaceAll("2", "Two")
		.replaceAll("3", "Three")
		.replaceAll("4", "Four")
		.replaceAll("5", "Five")
		.replaceAll("w/ ", "")
		.replaceAll("with ", "")
		.replaceAll("the ", "")
		.replaceAll("and ", "")
		.replaceAll(/[^a-zA-Z0-9 .]+/g, "");
	if (data.includes(" ")) {
		const dataSplit = text.split(" ");
		dataSplit.forEach((dS, i) => {
			if (i == 0) {
				text = dS.toLowerCase();
			} else {
				text = text + dS;
			}
		});
	} else {
		text = text.toLowerCase();
	}
	return text;
}

function decodeHTMLEntities(text) {
	const textArea = document.createElement("textarea");
	textArea.innerHTML = text;
	return textArea.value;
}

function encodeHTMLEntities(text) {
	const textArea = document.createElement("textarea");
	textArea.innerText = text;
	return textArea.innerHTML;
}

async function fieldValueTest(ct, n) {
	let result;
	try {
		result = await listSubscribers({
			type: "contenttype",
			id: ct,
		});
		console.log(result);
	} catch (error) {
		console.log(error);
		return;
	}

	for (const sub of result.apiReturn.subscribers) {
		if (sub.type == "page") {
			try {
				const readResult = await readAsset({
					type: "page",
					id: sub.id,
				});
				console.log(readResult);
				console.log(readResult.apiReturn.asset.page.path);
				if (eval(n) != undefined) {
					console.log("DEFINED: " + eval(n));
				} else {
					console.log("UNDEFINED");
				}
				console.log("-----------------");
			} catch (error) {
				console.log(error);
				console.log("-----------------");
			}
		}
	}
}
