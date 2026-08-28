export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { connectToHA } = await import("./lib/ha-connection");
    connectToHA();
  }
}
