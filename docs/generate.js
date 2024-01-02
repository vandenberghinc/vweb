
// Imports.
const {Client, Meta, Config, LIGHT_THEME, DARK_THEME, BLUE_THEME, GREEN_THEME} = require(`${process.env.PERSISTANCE}/private/dev/libris/libris/api/client/js/libris.js`);
const {Generator} = require(`${process.env.PERSISTANCE}/private/dev/libris/libris/api/server/libris.js`);
const vlib = require(`${process.env.PERSISTANCE}/private/dev/vinc/vlib/js/vlib.js`);

// Initialize client.
const client = new Client({
	config: {
		name: "VWeb",
		icon: {
			dark: "https://raw.githubusercontent.com/vandenberghinc/vweb/master/media/icon/icon.light.png",
			light: "https://raw.githubusercontent.com/vandenberghinc/vweb/master/media/icon/icon.dark.png",
		},
		meta: new Meta({
			author: "VWeb",
			title: "VWeb - Documenation",
			description: "The VWeb documentation page - Easily build websites and REST API's with vweb.",
			image: "https://raw.githubusercontent.com/vandenberghinc/public-storage/master/vandenberghinc/icon/triangle.small.png",
			// favicon: "https://doxia.io/favicon.ico",
		}),
		dark_theme: GREEN_THEME,
		light_theme: LIGHT_THEME,
		default_theme: "dark_theme",
		title_order: {
			NO_CHAPTER: ["Server", "Endpoint", "View", "Users", "Database", "Request", "Response", "Exceptions"],
		},
		include: [
			`${__dirname}/../js/backend/`,
			`${__dirname}/../js/frontend/`,
		],
		exclude: [
			`${__dirname}/../js/backend/plugins/fonts`,	
			`${__dirname}/../js/frontend/modules/adyen.js`,
		],
		extra_files: [
			// {language: "JS", chapter: "Getting Started", title: "Getting Started", include: `${__dirname}/files/getting_started.md`},
			// {language: "JS", chapter: "Getting Started", title: "Installation", include: `${__dirname}/files/installation.md`}
		],
	},
	api_key: "",
});

// Test api.
// const html = client.generate()
// .then((html) => {
// 	const path = new vlib.Path(`${__dirname}/output.html`);
// 	path.save_sync(html);
// 	console.log("Saved to",path.str());
// })

// Generate.
const generator = new Generator("04NsHTGdRbtbdAGdm:MenJhSUyyiy6Yex7i4ew87DHp4Nvx1qP", "vweb", client.config, false);
let response;
try {
	response = generator.generate(true);
} catch (error) {
	if (error.save) {
		error.save.data = null;
	}
	throw error;
}

// Build html.
const html = response.html;

// Save html.
const path = new vlib.Path(`${__dirname}/index.html`);
path.save_sync(html);
console.log("Saved to",path.str());