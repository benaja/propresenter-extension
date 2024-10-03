import { startPresentationListener } from "./src/triggerPresentationView.ts";
import protobuf from "protobufjs";
import * as fs from "node:fs";

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}

startPresentationListener();

protobuf.load("./proto/presentation.proto", function (err, root) {
  console.log("Loaded proto file");
  if (err) {
    throw err;
  }

  const Presentation = root.lookupType("Presentation");

  // Load the binary ProPresenter file
  const buffer = fs.readFileSync(
    "/Users/benaja/Documents/ProPresenter/Libraries/Lieder/10,000 Reasons (Bless The Lord).pro"
  );

  // Decode the binary data
  const message = Presentation.decode(buffer);

  // Convert to a JavaScript object
  const object = Presentation.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // See ConversionOptions
  });

  console.log(object);
});
