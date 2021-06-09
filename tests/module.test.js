import test from "ava";
import { readFile } from "fs/promises";
import { parse } from "../src/module.js";

test("simple replace", async (t) => {
    const example = await readFile(
        new URL("example.js", import.meta.url),
        "utf-8"
    );
    t.deepEqual(parse(example), [
        [
            { children: ["description..."] },
            {
                tag: "param",
                type: "number",
                name: "foo",
                children: ["bla bla..."],
            },
        ],
        [{ tag: "type", type: "", name: "{number}", children: [] }],
    ]);
});
