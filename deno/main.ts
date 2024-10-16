import { startPresentationListener } from "./src/triggerPresentationView.ts";
// import protobuf from "protobufjs";
// import * as fs from "node:fs";
// import type { Presentation } from "./src/api/presentations.ts";
// import { rv } from "./src/proto/presentation.d.ts";
// import { randomUUID } from "node:crypto";
// import { Buffer } from "node:buffer";
// import { Transform } from "node:stream";
// import { deEncapsulateSync } from "npm:rtf-stream-parser";
// import rtfParse from "npm:rtf-parse";
// import iconv from "iconv";

// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

startPresentationListener();

// protobuf.load("./proto/presentation.proto", function (err, root) {
//   console.log("Loaded proto file");
//   if (err) {
//     throw err;
//   }

//   const Presentation = root.lookupType("Presentation");

//   // Load the binary ProPresenter file
//   const buffer = fs.readFileSync(
//     "/Users/benaja/Documents/ProPresenter/Libraries/Lieder/Test.pro"
//   );

//   // Decode the binary data
//   const message = Presentation.decode(buffer);

//   // Convert to a JavaScript object
//   const object = Presentation.toObject(message, {
//     longs: String,
//     enums: String,
//     bytes: String,
//     // See ConversionOptions
//   }) as rv.data.Presentation;

//   // object.arrangements.push({
//   //   uuid: { string: randomUUID() },
//   //   name: "New Arrangement",
//   //   groupIdentifiers: [
//   //     { string: "6FF21A29-A69E-4E9F-BED7-22007B54DE86" },
//   //     { string: "1CEF65C1-40D2-4943-91C6-F71BF4A9DC1B" },
//   //   ],
//   // });

//   const rtfData =
//     object.cues[0].actions[0].slide?.presentation?.baseSlide?.elements[0]
//       .element?.text?.rtfData;

//   console.log(
//     object.cues[0].actions[0].slide?.presentation?.baseSlide?.elements[0]
//       .element?.text?.rtfData
//   );

//   const rtfString = Buffer.from(rtfData, "base64").toString("utf-8");

//   console.log(rtfString);

//   rtfParse.parseString(rtfString).then((doc) => {
//     console.log(doc);
//     // Do anything you like with rtf.model.Document instance of your document.
//   });

//   const decode = (buf, enc) => {
//     const converter = new iconv.Iconv(enc, "UTF-8//TRANSLIT//IGNORE");
//     return converter.convert(buf).toString("utf8");
//   };

//   const test = deEncapsulateSync(rtfString, { decode: decode });
//   // console.log(test);
//   // const newMessage = Presentation.fromObject(object);
//   // const newBuffer = Presentation.encode(newMessage).finish();

//   // // Step 7: Save the modified binary data back to a file
//   // fs.writeFileSync(
//   //   "/Users/benaja/Documents/ProPresenter/Libraries/Lieder/10,000 Reasons (Bless The Lord).pro",
//   //   newBuffer
//   // );
// });
