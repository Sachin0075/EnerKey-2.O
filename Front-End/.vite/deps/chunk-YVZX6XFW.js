import {
  memoTheme_default
} from "./chunk-TCDL3XKC.js";
import {
  useDefaultProps
} from "./chunk-CLGT6OXH.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  styled_default
} from "./chunk-VT6SOWW7.js";
import {
  require_jsx_runtime,
  require_prop_types
} from "./chunk-7VURVIFI.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/esm/AccordionDetails/AccordionDetails.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/AccordionDetails/accordionDetailsClasses.js
function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass("MuiAccordionDetails", slot);
}
var accordionDetailsClasses = generateUtilityClasses("MuiAccordionDetails", ["root"]);
var accordionDetailsClasses_default = accordionDetailsClasses;

// node_modules/@mui/material/esm/AccordionDetails/AccordionDetails.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};
var AccordionDetailsRoot = styled_default("div", {
  name: "MuiAccordionDetails",
  slot: "Root"
})(memoTheme_default(({
  theme
}) => ({
  padding: theme.spacing(1, 2, 2)
})));
var AccordionDetails = React.forwardRef(function AccordionDetails2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordionDetails"
  });
  const {
    className,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(AccordionDetailsRoot, {
    className: clsx_default(classes.root, className),
    ref,
    ownerState,
    ...other
  });
});
true ? AccordionDetails.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var AccordionDetails_default = AccordionDetails;

export {
  getAccordionDetailsUtilityClass,
  accordionDetailsClasses_default,
  AccordionDetails_default
};
//# sourceMappingURL=chunk-YVZX6XFW.js.map
