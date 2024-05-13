const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	console.log(req.url, req.headers, req.method);
	if (req.url === "/") {
		res.write("<html>");
		res.write("<head><title>My first page</title></head>");
		res.write(
			'<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Done</button></form></body>'
		);
		res.write("</html>");
		return res.end();
	}
	if (req.url === "/message" && req.method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			console.log("🚀 ~ req.on ~ chunk:", chunk);
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log("🚀 ~ req.on ~ parsedBody:", parsedBody);
			fs.writeFileSync("message.txt", parsedBody.split("=")[1]);
		});
		res.statusCode = 302;
		res.setHeader("Location", "/");
		return res.end();
	}
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>My first page</title></head>");
	res.write("<body><h1>Hello from Node.js</h1></body>");
	res.write("</html>");
	res.end();
});

server.listen(3000);
