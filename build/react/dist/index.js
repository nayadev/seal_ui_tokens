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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  constantBodyFontSize: () => constantBodyFontSize,
  constantButtonIconSize: () => constantButtonIconSize,
  constantLineHeightMultiplier: () => constantLineHeightMultiplier,
  constantSmallFontSize: () => constantSmallFontSize,
  dimensionLg: () => dimensionLg,
  dimensionMd: () => dimensionMd,
  dimensionSm: () => dimensionSm,
  dimensionXl: () => dimensionXl,
  dimensionXs: () => dimensionXs,
  dimensionXxl: () => dimensionXxl,
  dimensionXxs: () => dimensionXxs,
  dimensionXxxl: () => dimensionXxxl,
  dimensionXxxs: () => dimensionXxxs,
  fontFamilySans: () => fontFamilySans,
  primitiveBlack: () => primitiveBlack,
  primitiveIndigo: () => primitiveIndigo,
  primitiveOrange: () => primitiveOrange,
  primitivePink: () => primitivePink,
  primitiveRed: () => primitiveRed,
  primitiveTeal: () => primitiveTeal,
  primitiveTransparent: () => primitiveTransparent,
  primitiveWhite: () => primitiveWhite,
  radiusFull: () => radiusFull,
  radiusLg: () => radiusLg,
  radiusMd: () => radiusMd,
  radiusNone: () => radiusNone,
  radiusSm: () => radiusSm,
  radiusXl: () => radiusXl,
  radiusXs: () => radiusXs,
  stateDisabledOpacity: () => stateDisabledOpacity,
  styleBlockquote: () => styleBlockquote,
  styleBody: () => styleBody,
  styleBodyLarge: () => styleBodyLarge,
  styleCaption: () => styleCaption,
  styleDisplay: () => styleDisplay,
  styleHeading: () => styleHeading,
  styleHeadline: () => styleHeadline,
  styleLead: () => styleLead,
  styleList: () => styleList,
  styleSmall: () => styleSmall,
  styleSubtitle: () => styleSubtitle,
  styleTable: () => styleTable,
  styleTitle: () => styleTitle
});
module.exports = __toCommonJS(index_exports);
var primitiveWhite = "#ffffff";
var primitiveBlack = "#000000";
var primitiveTransparent = "rgba(0, 0, 0, 0)";
var primitiveRed = "#f44336";
var primitiveTeal = "#009688";
var primitiveOrange = "#ff9800";
var primitiveIndigo = "#3f51b5";
var primitivePink = "#e91e63";
var dimensionXxxs = "2px";
var dimensionXxs = "4px";
var dimensionXs = "8px";
var dimensionSm = "12px";
var dimensionMd = "16px";
var dimensionLg = "24px";
var dimensionXl = "32px";
var dimensionXxl = "48px";
var dimensionXxxl = "64px";
var radiusNone = "0px";
var radiusXs = "4px";
var radiusSm = "8px";
var radiusMd = "12px";
var radiusLg = "16px";
var radiusXl = "24px";
var radiusFull = "9999px";
var stateDisabledOpacity = 0.4;
var fontFamilySans = "Inter";
var constantLineHeightMultiplier = 1.2;
var constantBodyFontSize = "16px";
var constantSmallFontSize = "14px";
var constantButtonIconSize = "18px";
var styleDisplay = { "fontFamily": "Inter", "fontSize": "48px", "fontWeight": 800, "letterSpacing": "-0.4px", "lineHeight": 1 };
var styleHeadline = { "fontFamily": "Inter", "fontSize": "36px", "fontWeight": 800, "letterSpacing": "-0.4px", "lineHeight": 1.111 };
var styleHeading = { "fontFamily": "Inter", "fontSize": "30px", "fontWeight": 600, "letterSpacing": "-0.4px", "lineHeight": 1.2 };
var styleTitle = { "fontFamily": "Inter", "fontSize": "24px", "fontWeight": 600, "letterSpacing": "-0.4px", "lineHeight": 1.333 };
var styleSubtitle = { "fontFamily": "Inter", "fontSize": "20px", "fontWeight": 600, "letterSpacing": "-0.4px", "lineHeight": 1.4 };
var styleBodyLarge = { "fontFamily": "Inter", "fontSize": "18px", "fontWeight": 600, "letterSpacing": "0px", "lineHeight": 1.556 };
var styleLead = { "fontFamily": "Inter", "fontSize": "20px", "fontWeight": 400, "letterSpacing": "0px", "lineHeight": 1.4 };
var styleBody = { "fontFamily": "Inter", "fontSize": "16px", "fontWeight": 400, "letterSpacing": "0px", "lineHeight": 1.75 };
var styleSmall = { "fontFamily": "Inter", "fontSize": "14px", "fontWeight": 500, "letterSpacing": "0px", "lineHeight": 1 };
var styleCaption = { "fontFamily": "Inter", "fontSize": "14px", "fontWeight": 400, "letterSpacing": "0px", "lineHeight": 1.429 };
var styleBlockquote = { "fontFamily": "Inter", "fontSize": "16px", "fontWeight": 400, "fontStyle": "italic", "letterSpacing": "0px", "lineHeight": 1.5 };
var styleTable = { "fontFamily": "Inter", "fontSize": "16px", "fontWeight": 700, "letterSpacing": "0px", "lineHeight": 1.5 };
var styleList = { "fontFamily": "Inter", "fontSize": "16px", "fontWeight": 400, "letterSpacing": "0px", "lineHeight": 1.5 };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  constantBodyFontSize,
  constantButtonIconSize,
  constantLineHeightMultiplier,
  constantSmallFontSize,
  dimensionLg,
  dimensionMd,
  dimensionSm,
  dimensionXl,
  dimensionXs,
  dimensionXxl,
  dimensionXxs,
  dimensionXxxl,
  dimensionXxxs,
  fontFamilySans,
  primitiveBlack,
  primitiveIndigo,
  primitiveOrange,
  primitivePink,
  primitiveRed,
  primitiveTeal,
  primitiveTransparent,
  primitiveWhite,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusNone,
  radiusSm,
  radiusXl,
  radiusXs,
  stateDisabledOpacity,
  styleBlockquote,
  styleBody,
  styleBodyLarge,
  styleCaption,
  styleDisplay,
  styleHeading,
  styleHeadline,
  styleLead,
  styleList,
  styleSmall,
  styleSubtitle,
  styleTable,
  styleTitle
});
