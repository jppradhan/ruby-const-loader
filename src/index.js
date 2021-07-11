import { getOptions } from "loader-utils";

class Source {
  constructor(content) {
    this.content = content;
  }

  sanitize() {
    this.content = this.content.replace(/.freeze/g, "");
    return this;
  }

  toArray() {
    return this.content.split(/\r?\n|\r/g);
  }
}

const foundSquareBracket = (str) => {
  return str.match(/[A-Z_]+\s=\s\[/g);
};

const foundCurlyBracket = (str) => {
  return str.match(/[A-Z_]+\s=\s\{/g);
};

const foundStraightConst = (str) => {
  return str.match(/[A-Z_]+\s=\s[\w\d\']+/g);
};

const readRubyConstants = (source) => {
  const sourceArr = source.sanitize().toArray();

  let newSource = "";
  let matched = false;
  let constantsGroups = [];

  for (let i = 0; i < sourceArr.length; i++) {
    const sourceStr = sourceArr[i].trim();
    if (!matched && foundStraightConst(sourceStr)) {
      constantsGroups.push(sourceStr);
    } else if (
      matched ||
      foundSquareBracket(sourceStr) ||
      foundCurlyBracket(sourceStr)
    ) {
      newSource = newSource + sourceStr;
      matched = true;

      if (sourceStr === "]" || sourceStr === "}") {
        matched = false;
        constantsGroups.push(newSource);
        newSource = "";
      }
    }
  }

  return constantsGroups;
};

const convertToJSConst = (str) => {
  const jsString = str
    .replace(/\s=\s/g, ":")
    .replace(":", "=")
    .replace(/\s=>\s/g, ":")
    .replace(/\[/g, "{")
    .replace(/\]/g, "}");

  return "export const " + jsString;
};

export default function loader(source) {
  const content = new Source(source);
  const rubyConstArr = readRubyConstants(content);
  const jsConstants = rubyConstArr.map(convertToJSConst).join(";\n");

  return jsConstants;
}

export const raw = false;
