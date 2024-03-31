import { Color, tarsier } from "@jliocsar/tarsier";
import * as colorette from "colorette"; // available due to ^

export const logger = tarsier({
  types: {
    debug: {
      prefix: "🐛",
      color: {
        foreground: Color.Foreground.CyanBright,
      },
      disabled: process.env.DEBUG !== "1" && process.env.DEBUG !== "true",
    },
    start: {
      prefix: "🚀",
      color: {
        foreground: Color.Foreground.CyanBright,
      },
      beforeColor(text) {
        const str = text.toString();
        const match = str.match(/http:\/\/[^ ]+/);
        if (!match) return str;
        const [url] = match;
        return str.replace(
          url,
          colorette[Color.Style.Bold](colorette[Color.Style.Underline](url))
        );
      },
    },
  },
});
