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

// node_modules/@mui/material/esm/AccordionActions/AccordionActions.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/AccordionActions/accordionActionsClasses.js
function getAccordionActionsUtilityClass(slot) {
  return generateUtilityClass("MuiAccordionActions", slot);
}
var accordionActionsClasses = generateUtilityClasses("MuiAccordionActions", ["root", "spacing"]);
var accordionActionsClasses_default = accordionActionsClasses;

// node_modules/@mui/material/esm/AccordionActions/AccordionActions.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    disableSpacing
  } = ownerState;
  const slots = {
    root: ["root", !disableSpacing && "spacing"]
  };
  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};
var AccordionActionsRoot = styled_default("div", {
  name: "MuiAccordionActions",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 8,
  justifyContent: "flex-end",
  variants: [{
    props: (props) => !props.disableSpacing,
    style: {
      "& > :not(style) ~ :not(style)": {
        marginLeft: 8
      }
    }
  }]
});
var AccordionActions = React.forwardRef(function AccordionActions2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordionActions"
  });
  const {
    className,
    disableSpacing = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableSpacing
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(AccordionActionsRoot, {
    className: clsx_default(classes.root, className),
    ref,
    ownerState,
    ...other
  });
});
true ? AccordionActions.propTypes = {
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var AccordionActions_default = AccordionActions;

export {
  getAccordionActionsUtilityClass,
  accordionActionsClasses_default,
  AccordionActions_default
};
//# sourceMappingURL=chunk-TCC32QK5.js.map
