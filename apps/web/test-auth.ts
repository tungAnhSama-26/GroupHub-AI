import { auth } from "./src/lib/auth";
import { headers } from "next/headers";

async function test() {
  try {
    const session = await auth.api.getSession({
      headers: new Headers()
    });
    console.log("Session:", session);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
