export const KNOWN_INCOMPATIBLE_PLUGINS = [
  // This module might be causing an issue preventing clicks. For safety, we won't run on this module.
  "react-native-testfairy",
  // This module checks for unexpected property keys and throws an exception.
  "@react-navigation",
  // The victory* modules use `dataComponent` and we get a collision.
  "victory",
  "victory-area",
  "victory-axis",
  "victory-bar",
  "victory-box-plot",
  "victory-brush-container",
  "victory-brush-line",
  "victory-candlestick",
  "victory-canvas",
  "victory-chart",
  "victory-core",
  "victory-create-container",
  "victory-cursor-container",
  "victory-errorbar",
  "victory-group",
  "victory-histogram",
  "victory-legend",
  "victory-line",
  "victory-native",
  "victory-pie",
  "victory-polar-axis",
  "victory-scatter",
  "victory-selection-container",
  "victory-shared-events",
  "victory-stack",
  "victory-tooltip",
  "victory-vendor",
  "victory-voronoi",
  "victory-voronoi-container",
  "victory-zoom-container",
];

export const DEFAULT_IGNORED_ELEMENTS = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];
