import { serve } from "https://deno.land/std@v0.50.0/http/server.ts";
import * as flags from "https://deno.land/std@v0.50.0/flags/mod.ts";
import { Sha256 } from "https://deno.land/std@v0.50.0/hash/sha256.ts";
function toHexString(value: number[] | ArrayBuffer): string {
  const array = new Uint8Array(value);
  let hex = "";
  for (const v of array) {
    const c = v.toString(16);
    hex += c.length === 1 ? `0${c}` : c;
  }
  return hex;
}
const algorithm = new Sha256()
const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}
algorithm.update("Hello world abc");
const test = algorithm.hex();
const body = new TextEncoder().encode(test);
const s = serve({ port: port, hostname: '0.0.0.0'});
console.log("http://localhost:" + port);

for await (const req of s) {
  req.respond({ body });
}