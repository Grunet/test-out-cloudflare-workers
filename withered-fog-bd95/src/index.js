export default {
	async fetch(request) {

		const html = `<!DOCTYPE html>
		<body>
		  <h1>Hello World</h1>
		  <p>This markup was generated by a Cloudflare Worker.</p>
		</body>`;

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	},
};
