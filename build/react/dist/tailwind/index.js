"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tailwind/index.ts
var tailwind_exports = {};
__export(tailwind_exports, {
  default: () => tailwind_default,
  sealTokensTailwind: () => sealTokensTailwind
});
module.exports = __toCommonJS(tailwind_exports);
var sealTokensTailwind = {
  "colors": {
    "primitive-white": "#ffffff",
    "primitive-black": "#000000",
    "primitive-transparent": "rgba(0, 0, 0, 0)",
    "primitive-red": "#f44336",
    "primitive-teal": "#009688",
    "primitive-orange": "#ff9800",
    "primitive-indigo": "#3f51b5",
    "primitive-pink": "#e91e63"
  },
  "spacing": {
    "dimension-xxxs": "2px",
    "dimension-xxs": "4px",
    "dimension-xs": "8px",
    "dimension-sm": "12px",
    "dimension-md": "16px",
    "dimension-lg": "24px",
    "dimension-xl": "32px",
    "dimension-xxl": "48px",
    "dimension-xxxl": "64px",
    "constant-button-icon-size": "18px"
  },
  "borderRadius": {
    "none": "0px",
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "full": "9999px"
  },
  "fontFamily": {
    "font-family-sans": [
      "Inter"
    ]
  },
  "fontSize": {
    "constant-body-font-size": "16px",
    "constant-small-font-size": "14px",
    "style-display": "48px",
    "style-headline": "36px",
    "style-heading": "30px",
    "style-title": "24px",
    "style-subtitle": "20px",
    "style-body-large": "18px",
    "style-lead": "20px",
    "style-body": "16px",
    "style-small": "14px",
    "style-caption": "14px",
    "style-blockquote": "16px",
    "style-table": "16px",
    "style-list": "16px"
  },
  "fontWeight": {
    "style-display": "800",
    "style-headline": "800",
    "style-heading": "600",
    "style-title": "600",
    "style-subtitle": "600",
    "style-body-large": "600",
    "style-lead": "400",
    "style-body": "400",
    "style-small": "500",
    "style-caption": "400",
    "style-blockquote": "400",
    "style-table": "700",
    "style-list": "400"
  }
};
var tailwind_default = sealTokensTailwind;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sealTokensTailwind
});
