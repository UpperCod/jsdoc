import { getFragments, walkFragments } from "@uppercod/str-fragment";
/**
 *
 * @param {string} comment
 * @returns {Item[]}
 */
export function parse(code) {
    let fragments = getFragments(code, {
        open: /\/\*\*/,
        end: /\*\//,
    });

    const blocks = [];

    walkFragments(code, fragments, ({ content }) => {
        blocks.push(parseComment(content));
    });

    return blocks;
}
/**
 *
 * @param {string} comment
 * @returns {Item[]}
 */
export function parseComment(comment) {
    const lines = comment.trim().split(/\n+/);
    let { length } = lines;
    let current = "";
    /**
     * @type {Item[]}
     */
    const blocks = [];
    for (let i = 0; i < length; i++) {
        let line = lines[i].replace(/^\s*\*(\s){0,1}/, "");
        const test = line.match(
            /^\s*@([^\s]+)(?:\s+(?:{(.+)(?=})}){0,1}(?:\s*([^\s]+)(?:\s+-\s+(.+)){0,1})){0,1}(?:\s+(.*)){0,1}/
        );
        if (test) {
            const [, tag, type = "", name, child, subChild] = test;
            const line = child || subChild;
            current = {
                tag,
                type: type.trim(),
                name,
                children: line ? [line] : [],
            };
            blocks.push(current);
        } else if (current) {
            current.children.push(line);
        } else {
            current = { children: line ? [line] : [] };
            blocks.push(current);
        }
    }
    return blocks;
}

/**
 * @typedef {Object} Item
 * @property {string} tag
 * @property {string} type
 * @property {string} name
 * @property {string[]} children
 */
