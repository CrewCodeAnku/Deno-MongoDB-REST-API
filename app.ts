import { Application } from "https://deno.land/x/oak/mod.ts";

import notesRoutes from "./routes/notes.ts";

import { connect } from "./helpers/db.ts";

connect();

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware!");
  await next();
});

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(notesRoutes.routes());
app.use(notesRoutes.allowedMethods());

await app.listen({ port: 3000 });
