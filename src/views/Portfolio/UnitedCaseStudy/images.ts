import type { Slide } from "../JamloopCaseStudy/ProductSlider";

// Edit filenames, order, labels, captions, alt text, and native dimensions here.
// Encode the filename only: the originals contain spaces and narrow no-break spaces.
const dataVisualizationSource = (filename: string) =>
  `/images/portfolio/united/case-study/dv/${encodeURIComponent(filename)}`;

const prototypeSource = (filename: string) =>
  `/images/portfolio/united/case-study/prototypes/${encodeURIComponent(
    filename
  )}`;

const componentSource = (filename: string) =>
  `/images/portfolio/united/case-study/components/${encodeURIComponent(
    filename
  )}`;

export const unitedImages = {
  prototypes: [
    {
      src: prototypeSource("one.png"),
      frameSrc: prototypeSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(107 / 866 * 100%) calc(43 / 1468 * 100%) calc(46 / 866 * 100%) calc(99 / 1468 * 100%))",
      label: "Category summary",
      caption: "Summary combining a calendar, schedule rows, and filtering.",
      alt: "Trade Center Category Summary prototype with a timeline, schedule grid, and filter controls",
      width: 1469,
      height: 1144,
    },
    {
      src: prototypeSource("two.png"),
      frameSrc: prototypeSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(107 / 866 * 100%) calc(43 / 1468 * 100%) calc(46 / 866 * 100%) calc(99 / 1468 * 100%))",
      label: "Create a trade request",
      caption: "Prototype of the drop-selection step in a trade request.",
      alt: "Trade request prototype with Drop, Pickup, and Review steps and a selectable flight table",
      width: 1469,
      height: 1144,
    },
    {
      src: prototypeSource("three.png"),
      frameSrc: prototypeSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(107 / 866 * 100%) calc(43 / 1468 * 100%) calc(46 / 866 * 100%) calc(99 / 1468 * 100%))",
      label: "Manage trip alerts",
      caption: "Prototype view of active and paused trip alerts.",
      alt: "Open Trip Alerts prototype showing active and paused alert tables beside a calendar",
      width: 1469,
      height: 1144,
    },
    {
      src: prototypeSource("four.png"),
      frameSrc: prototypeSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(107 / 866 * 100%) calc(43 / 1468 * 100%) calc(46 / 866 * 100%) calc(99 / 1468 * 100%))",
      label: "Trade requests",
      caption: "Prototype view organizing draft and active trade requests.",
      alt: "Trade Center My Request prototype showing draft and active request tables beside a calendar",
      width: 1469,
      height: 1144,
    },
    {
      src: prototypeSource("five.png"),
      frameSrc: prototypeSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(107 / 866 * 100%) calc(43 / 1468 * 100%) calc(46 / 866 * 100%) calc(99 / 1468 * 100%))",
      label: "Filter template",
      caption:
        "Prototype dialog for configuring trip visibility and availability filters.",
      alt: "Edit filter template dialog with a template name field and toggles over the Trade Center",
      width: 1469,
      height: 1144,
    },
  ],
  components: [
    {
      src: componentSource("tabs.png"),
      frameSrc: componentSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(130 / 866 * 100%) calc(39 / 1468 * 100%) calc(46 / 866 * 100%) calc(47 / 1468 * 100%))",
      label: "Tabs",
      caption: "Contained, icon, and overflow tab variants in the dark theme.",
      alt: "Orion dark-theme component demonstration with contained tabs, icon tabs, and overflow tabs",
      width: 1469,
      height: 1144,
    },
    {
      src: componentSource("slider.png"),
      frameSrc: componentSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(130 / 866 * 100%) calc(39 / 1468 * 100%) calc(46 / 866 * 100%) calc(47 / 1468 * 100%))",
      label: "Slider controls",
      caption: "Default, labeled, centered, and disabled slider variants.",
      alt: "Orion dark-theme slider demonstration with default, labeled, disabled, centered, and centered snap controls",
      width: 1469,
      height: 1144,
    },
    {
      src: componentSource("split-btns.png"),
      frameSrc: componentSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(130 / 866 * 100%) calc(39 / 1468 * 100%) calc(46 / 866 * 100%) calc(47 / 1468 * 100%))",
      label: "Split buttons",
      caption: "Primary and secondary, including disabled and icon variants.",
      alt: "Orion dark-theme split-button demonstration showing primary, secondary, disabled, icon, and small variants",
      width: 1469,
      height: 1144,
    },
    {
      src: componentSource("cards.png"),
      frameSrc: componentSource("screen.png"),
      frameWidth: 1468,
      frameHeight: 866,
      frameClip:
        "inset(calc(130 / 866 * 100%) calc(39 / 1468 * 100%) calc(46 / 866 * 100%) calc(47 / 1468 * 100%))",
      label: "Cards in a grid",
      caption: "Card examples arranged in a grid in the dark theme.",
      alt: "Orion dark-theme demonstration showing eight cards with headers, chevrons, and content",
      width: 1469,
      height: 1138,
    },
  ],
  charts: [
    {
      src: dataVisualizationSource("dark.png"),
      label: "Dark theme",
      caption: "Examining how chart colors separate from a dark background and remain distinguishable across multiple data series.",
      alt: "Orion dark-theme purple palette example with ten bars and a five-series line chart for Search, Bookings, Check-ins, Revenue, and Loyalty",
      width: 1468,
      height: 1048,
    },
    {
      src: dataVisualizationSource("light.png"),
      label: "Light theme",
      caption: "Comparing palette behavior on a light background, with attention to the separation between series and surrounding chart elements.",
      alt: "Orion light-theme purple palette example with ten bars and a five-series line chart for Search, Bookings, Check-ins, Revenue, and Loyalty",
      width: 1468,
      height: 1048,
    },
  ],
} satisfies Record<string, Slide[]>;

// Both hero assets share a 1469px canvas; keep their original alignment.
export const unitedHero = {
  screen: "/images/portfolio/united/case-study/hero-screen.png",
  scroll: "/images/portfolio/united/case-study/hero-scroll.png",
  width: 1469,
  height: 1146,
  scrollHeight: 2059,
  alt: "Orion data visualization demonstration on a desktop monitor, with blue palette, grouped bar, pie, donut, and gauge examples",
  caption: "Chart and palette examples in the Orion demo environment.",
};
