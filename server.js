// @ts-ignore
const fastify = require("fastify")({ logger: true });
const PORT = process.env.PORT || 5000;

fastify.get("/", (req, res) => {
  res.send("Hello world");
});

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.register(require("./routes/post"));

startServer();
