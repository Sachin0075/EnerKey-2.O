import {
  require_react_is
} from "./chunk-FEBFRFQ6.js";
import {
  getTransitionProps
} from "./chunk-6V32S7OQ.js";
import {
  AccordionContext_default
} from "./chunk-PH67QM5H.js";
import {
  useSlot
} from "./chunk-RITPD2HI.js";
import {
  Paper_default
} from "./chunk-RCU3PF2M.js";
import {
  Transition_default,
  useTimeout
} from "./chunk-MDDYEKXT.js";
import {
  elementTypeAcceptingRef_default
} from "./chunk-63UXBSZM.js";
import {
  chainPropTypes
} from "./chunk-JX37XSKT.js";
import {
  useControlled_default
} from "./chunk-3EK65UOL.js";
import {
  useForkRef_default
} from "./chunk-DFZ2HCCY.js";
import {
  memoTheme_default
} from "./chunk-TCDL3XKC.js";
import {
  useTheme
} from "./chunk-APMTHRKH.js";
import {
  useDefaultProps
} from "./chunk-CLGT6OXH.js";
import {
  composeClasses,
  duration,
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

// node_modules/@mui/material/esm/Accordion/Accordion.js
var React2 = __toESM(require_react(), 1);
var import_react_is = __toESM(require_react_is(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/Collapse/Collapse.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/Collapse/collapseClasses.js
function getCollapseUtilityClass(slot) {
  return generateUtilityClass("MuiCollapse", slot);
}
var collapseClasses = generateUtilityClasses("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
var collapseClasses_default = collapseClasses;

// node_modules/@mui/material/esm/Collapse/Collapse.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `${orientation}`],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", `${orientation}`],
    wrapperInner: ["wrapperInner", `${orientation}`]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};
var CollapseRoot = styled_default("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.state === "entered" && styles.entered, ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && styles.hidden];
  }
})(memoTheme_default(({
  theme
}) => ({
  height: 0,
  overflow: "hidden",
  transition: theme.transitions.create("height"),
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      height: "auto",
      width: 0,
      transition: theme.transitions.create("width")
    }
  }, {
    props: {
      state: "entered"
    },
    style: {
      height: "auto",
      overflow: "visible"
    }
  }, {
    props: {
      state: "entered",
      orientation: "horizontal"
    },
    style: {
      width: "auto"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px",
    style: {
      visibility: "hidden"
    }
  }]
})));
var CollapseWrapper = styled_default("div", {
  name: "MuiCollapse",
  slot: "Wrapper"
})({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: "flex",
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
});
var CollapseWrapperInner = styled_default("div", {
  name: "MuiCollapse",
  slot: "WrapperInner"
})({
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
});
var Collapse = React.forwardRef(function Collapse2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCollapse"
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = "0px",
    component,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = "vertical",
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition_default,
    ...other
  } = props;
  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp
  };
  const classes = useUtilityClasses(ownerState);
  const theme = useTheme();
  const timer = useTimeout();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === "horizontal";
  const size = isHorizontal ? "width" : "height";
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef_default(ref, nodeRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? "clientWidth" : "clientHeight"] : 0;
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "absolute";
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "";
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    if (timeout === "auto") {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = "auto";
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback((node) => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleExiting = normalizedTransitionCallback((node) => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    if (timeout === "auto") {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.start(autoTransitionDuration.current || 0, next);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return (0, import_jsx_runtime.jsx)(TransitionComponent, {
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef,
    timeout: timeout === "auto" ? null : timeout,
    ...other,
    children: (state, {
      ownerState: incomingOwnerState,
      ...restChildProps
    }) => (0, import_jsx_runtime.jsx)(CollapseRoot, {
      as: component,
      className: clsx_default(classes.root, className, {
        "entered": classes.entered,
        "exited": !inProp && collapsedSize === "0px" && classes.hidden
      }[state]),
      style: {
        [isHorizontal ? "minWidth" : "minHeight"]: collapsedSize,
        ...style
      },
      ref: handleRef,
      ownerState: {
        ...ownerState,
        state
      },
      ...restChildProps,
      children: (0, import_jsx_runtime.jsx)(CollapseWrapper, {
        ownerState: {
          ...ownerState,
          state
        },
        className: classes.wrapper,
        ref: wrapperRef,
        children: (0, import_jsx_runtime.jsx)(CollapseWrapperInner, {
          ownerState: {
            ...ownerState,
            state
          },
          className: classes.wrapperInner,
          children
        })
      })
    })
  });
});
true ? Collapse.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: import_prop_types.default.func,
  /**
   * The content node to be collapsed.
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
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef_default,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
    enter: import_prop_types.default.string,
    exit: import_prop_types.default.string
  }), import_prop_types.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: import_prop_types.default.bool,
  /**
   * @ignore
   */
  onEnter: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntered: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntering: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExit: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExited: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExiting: import_prop_types.default.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
if (Collapse) {
  Collapse.muiSupportAuto = true;
}
var Collapse_default = Collapse;

// node_modules/@mui/material/esm/Accordion/accordionClasses.js
function getAccordionUtilityClass(slot) {
  return generateUtilityClass("MuiAccordion", slot);
}
var accordionClasses = generateUtilityClasses("MuiAccordion", ["root", "heading", "rounded", "expanded", "disabled", "gutters", "region"]);
var accordionClasses_default = accordionClasses;

// node_modules/@mui/material/esm/Accordion/Accordion.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    square,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ["root", !square && "rounded", expanded && "expanded", disabled && "disabled", !disableGutters && "gutters"],
    heading: ["heading"],
    region: ["region"]
  };
  return composeClasses(slots, getAccordionUtilityClass, classes);
};
var AccordionRoot = styled_default(Paper_default, {
  name: "MuiAccordion",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${accordionClasses_default.region}`]: styles.region
    }, styles.root, !ownerState.square && styles.rounded, !ownerState.disableGutters && styles.gutters];
  }
})(memoTheme_default(({
  theme
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    position: "relative",
    transition: theme.transitions.create(["margin"], transition),
    overflowAnchor: "none",
    // Keep the same scrolling position
    "&::before": {
      position: "absolute",
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: (theme.vars || theme).palette.divider,
      transition: theme.transitions.create(["opacity", "background-color"], transition)
    },
    "&:first-of-type": {
      "&::before": {
        display: "none"
      }
    },
    [`&.${accordionClasses_default.expanded}`]: {
      "&::before": {
        opacity: 0
      },
      "&:first-of-type": {
        marginTop: 0
      },
      "&:last-of-type": {
        marginBottom: 0
      },
      "& + &": {
        "&::before": {
          display: "none"
        }
      }
    },
    [`&.${accordionClasses_default.disabled}`]: {
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    }
  };
}), memoTheme_default(({
  theme
}) => ({
  variants: [{
    props: (props) => !props.square,
    style: {
      borderRadius: 0,
      "&:first-of-type": {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius
      },
      "&:last-of-type": {
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        // Fix a rendering issue on Edge
        "@supports (-ms-ime-align: auto)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }
  }, {
    props: (props) => !props.disableGutters,
    style: {
      [`&.${accordionClasses_default.expanded}`]: {
        margin: "16px 0"
      }
    }
  }]
})));
var AccordionHeading = styled_default("h3", {
  name: "MuiAccordion",
  slot: "Heading"
})({
  all: "unset"
});
var Accordion = React2.forwardRef(function Accordion2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordion"
  });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    square = false,
    slots = {},
    slotProps = {},
    TransitionComponent: TransitionComponentProp,
    TransitionProps: TransitionPropsProp,
    ...other
  } = props;
  const [expanded, setExpandedState] = useControlled_default({
    controlled: expandedProp,
    default: defaultExpanded,
    name: "Accordion",
    state: "expanded"
  });
  const handleChange = React2.useCallback((event) => {
    setExpandedState(!expanded);
    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);
  const [summary, ...children] = React2.Children.toArray(childrenProp);
  const contextValue = React2.useMemo(() => ({
    expanded,
    disabled,
    disableGutters,
    toggle: handleChange
  }), [expanded, disabled, disableGutters, handleChange]);
  const ownerState = {
    ...props,
    square,
    disabled,
    disableGutters,
    expanded
  };
  const classes = useUtilityClasses2(ownerState);
  const backwardCompatibleSlots = {
    transition: TransitionComponentProp,
    ...slots
  };
  const backwardCompatibleSlotProps = {
    transition: TransitionPropsProp,
    ...slotProps
  };
  const externalForwardedProps = {
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: AccordionRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    className: clsx_default(classes.root, className),
    shouldForwardComponentProp: true,
    ownerState,
    ref,
    additionalProps: {
      square
    }
  });
  const [AccordionHeadingSlot, accordionProps] = useSlot("heading", {
    elementType: AccordionHeading,
    externalForwardedProps,
    className: classes.heading,
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Collapse_default,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime2.jsxs)(RootSlot, {
    ...rootProps,
    children: [(0, import_jsx_runtime2.jsx)(AccordionHeadingSlot, {
      ...accordionProps,
      children: (0, import_jsx_runtime2.jsx)(AccordionContext_default.Provider, {
        value: contextValue,
        children: summary
      })
    }), (0, import_jsx_runtime2.jsx)(TransitionSlot, {
      in: expanded,
      timeout: "auto",
      ...transitionProps,
      children: (0, import_jsx_runtime2.jsx)("div", {
        "aria-labelledby": summary.props.id,
        id: summary.props["aria-controls"],
        role: "region",
        className: classes.region,
        children
      })
    })]
  });
});
true ? Accordion.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(import_prop_types2.default.node.isRequired, (props) => {
    const summary = React2.Children.toArray(props.children)[0];
    if ((0, import_react_is.isFragment)(summary)) {
      return new Error("MUI: The Accordion doesn't accept a Fragment as a child. Consider providing an array instead.");
    }
    if (!React2.isValidElement(summary)) {
      return new Error("MUI: Expected the first child of Accordion to be a valid element.");
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: import_prop_types2.default.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and the increase of height.
   * @default false
   */
  disableGutters: import_prop_types2.default.bool,
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded: import_prop_types2.default.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: import_prop_types2.default.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types2.default.shape({
    heading: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]),
    root: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]),
    transition: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types2.default.shape({
    heading: import_prop_types2.default.elementType,
    root: import_prop_types2.default.elementType,
    transition: import_prop_types2.default.elementType
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: import_prop_types2.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: import_prop_types2.default.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionProps: import_prop_types2.default.object
} : void 0;
var Accordion_default = Accordion;

export {
  getCollapseUtilityClass,
  collapseClasses_default,
  Collapse_default,
  getAccordionUtilityClass,
  accordionClasses_default,
  Accordion_default
};
//# sourceMappingURL=chunk-QTCYLOBT.js.map
