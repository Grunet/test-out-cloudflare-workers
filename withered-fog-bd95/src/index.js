export default {
	async fetch(request, env) {
		const url = new URL(request.url)

		if (url.pathname === "/admin") {

			const doId = env.DURABLE_OBJECT_NAME.idFromName("r2cacheinstance");
 
			// get the Durable Object stub for our Durable Object instance
			const stub = env.DURABLE_OBJECT_NAME.get(doId)
	 
			// pass the request to Durable Object instance
			const res = await stub.fetch(new Request("unused"));
			// const count = await res.json();

			return new Response(`Admin page ${res}`);
		}

		const html = `<!DOCTYPE html>
		<body>
		  <h1>Hello World 2</h1>
		  <p>This markup was generated by a Cloudflare Worker.</p>
		</body>`;

		await env.MY_BUCKET.put(`test_key ${Date.now()}`, { "object_key": "object_value"});

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	},
};

export class R2Cache {
	constructor(state, env) {
	  this.state = state;
	  // `blockConcurrencyWhile()` ensures no requests are delivered until
	  // initialization completes.
	  this.state.blockConcurrencyWhile(async () => {
		let stored = await this.state.storage.get("value");
		// After initialization, future reads do not need to access storage.
		this.value = stored || 0;
	  });
	}
  
	// Handle HTTP requests from clients.
	async fetch(request) {
	  // use this.value rather than storage

	  return new Response({
		"theValue": this.value,
	  }
	);
  }
}
  
