import { createCopier } from 'fast-copy';
import { openBlock, createBlock, resolveDynamicComponent, mergeProps, toHandlers, withCtx, renderSlot, TransitionGroup, Transition, useSSRContext, KeepAlive, createVNode, toDisplayString, createCommentVNode, resolveComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc$1 } from '../server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

// src/arrays/array-insert/array-insert.ts

// src/guards/is-array/is-array.ts
var isArray = (value) => Array.isArray(value);

// src/guards/is-boolean/is-boolean.ts
var isBoolean = (value) => value === true || value === false;

// src/guards/is-iterable/is-iterable.ts
var isIterable = (value) => (
  // eslint-disable-next-line unicorn/new-for-builtins
  Symbol.iterator in Object(value)
);

// src/guards/is-object/is-object.ts
var isObject = (value) => Object.prototype.toString.call(value).includes("Object");

// src/guards/is-empty/is-empty.ts
var isEmpty = (value) => {
  if (typeof value === "undefined")
    return true;
  if (value === null)
    return true;
  if (value === false)
    return true;
  if (Number.isNaN(value))
    return true;
  if (value === 0)
    return true;
  if (value === BigInt(0))
    return true;
  if (value === "")
    return true;
  if (isIterable(value) && typeof value === "object" && "length" in value && value.length === 0)
    return true;
  if (isIterable(value) && typeof value === "object" && "size" in value && value.size === 0)
    return true;
  if (isObject(value))
    return !Object.keys(value).length;
  return false;
};

// src/guards/is-numeric/is-numeric.ts
var isNumeric = (value) => typeof value === "number" && !isNaN(value);

// src/guards/is-function/is-function.ts
var isFunction = (value) => Object.prototype.toString.call(value) === "[object Function]";

// src/guards/is-integer/is-integer.ts
var isInteger = (value) => isNumeric(value) && value % 1 === 0;

// src/guards/is-nullish/is-nullish.ts
var isNullish = (value) => value === null || typeof value === "undefined";

// src/guards/is-string/is-string.ts
var isString = (value) => Object.prototype.toString.call(value) === "[object String]";

// src/functions/assert/assert.utils.ts
var typeMap = {
  "condition": "Assert condition failed",
  "no-value": "Assert value not undefined/null failed"
};
var messageFormatter = (failureType, message, properties) => {
  return [
    typeMap[failureType],
    message ? `: ${message}` : null,
    !isEmpty(properties) ? `: ${JSON.stringify(properties)}` : null
  ].filter(Boolean).join("");
};
var errorCreatorFactory = (formatter) => (failureType, message, properties) => new Error(formatter(failureType, message, properties));
var createConfiguration = () => ({
  formatter: messageFormatter,
  errorCreator: errorCreatorFactory(messageFormatter)
});

// src/functions/assert/assert.ts
var configuration = createConfiguration();
var _createAssert = (soft) => (conditionOrValue, message, properties) => {
  const createError = (type, props2) => configuration.errorCreator(type, message, props2);
  const report = (type, props2, error) => {
    error && configuration.errorReporter?.(type, error, message, props2);
    !error && configuration.warningReporter?.(type, message, props2);
  };
  const props = isFunction(properties) ? properties() : properties ?? {};
  if (isBoolean(conditionOrValue) && !conditionOrValue) {
    if (!soft) {
      const error = createError("condition", props);
      report("condition", props, error);
      throw error;
    }
    report("condition", props);
    return false;
  }
  if (isNullish(conditionOrValue)) {
    if (!soft) {
      const error = createError("no-value", props);
      report("no-value", props, error);
      throw error;
    }
    report("no-value", props);
    return false;
  }
  return conditionOrValue;
};
var hardAssert = _createAssert(false);
var softAssert = _createAssert(true);
var _assert = hardAssert;
_assert.soft = softAssert;

// src/numbers/clamp/clamp.ts
var clamp = (value, min = -Infinity, max = Infinity) => Math.max(
  min ?? -Infinity,
  Math.min(value, max ?? Infinity)
);
createCopier({});

const validateEnterLeave = (value, validator) => {
  if (validator(value))
    return true;
  if (!isObject(value))
    return false;
  if (Object.keys(value).length !== 2)
    return false;
  return !Object.entries(value).some(([key, val]) => {
    const wrongKey = !["enter", "leave"].includes(key);
    const wrongValue = !validator(val);
    return wrongKey || wrongValue;
  });
};
const validateDuration = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const validateEasing = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && val.trim() !== "";
});
const validateDelay = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const transitionDuration = 300;
const transitionEasing = "cubic-bezier(.25, .8, .5, 1)";
const transitionDelay = 0;
const expandAxis = "y";
const slideOffset = [0, -16];
const scaleAxis = "both";
const scaleOrigin = "50% 50%";
const scaleValue = 0;
const moveDuration = transitionDuration;
const baseTransition = {
  inheritAttrs: false,
  props: {
    duration: {
      validator: validateDuration,
      default: transitionDuration
    },
    easing: {
      validator: validateEasing,
      default: () => transitionEasing
    },
    delay: {
      validator: validateDelay,
      default: transitionDelay
    },
    noOpacity: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: void 0
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    },
    noMove: {
      type: Boolean,
      default: false
    },
    moveDuration: {
      type: Number,
      default: moveDuration
    }
  },
  computed: {
    cComponent() {
      return this.group ? TransitionGroup : Transition;
    },
    cAttrs() {
      const { appear, mode, tag, duration } = this;
      return this.group ? { appear, tag, duration, ...this.$attrs } : { appear, mode, duration };
    },
    cHooks() {
      return {
        beforeEnter: (...args) => {
          this.reduceTransition(...args);
          this.$emit("before-enter", ...args);
        },
        beforeLeave: (...args) => {
          var _a;
          this.reduceTransition(...args);
          (_a = this.initLeaving) == null ? void 0 : _a.call(this, ...args);
          this.$emit("before-leave", ...args);
        },
        enter: (...args) => {
          var _a;
          (_a = this.onEnter) == null ? void 0 : _a.call(this, ...args);
          this.$emit("enter", ...args);
        },
        leave: (...args) => {
          var _a;
          (_a = this.onLeave) == null ? void 0 : _a.call(this, ...args);
          this.$emit("leave", ...args);
        },
        afterEnter: (...args) => {
          var _a;
          this.resetTransition(...args);
          (_a = this.resetElement) == null ? void 0 : _a.call(this, ...args);
          this.$emit("after-enter", ...args);
        },
        afterLeave: (...args) => {
          var _a;
          this.resetTransition(...args);
          (_a = this.resetElement) == null ? void 0 : _a.call(this, ...args);
          this.$emit("after-leave", ...args);
        }
      };
    }
  },
  methods: {
    setupTransition(element, event = "enter") {
      var _a, _b, _c, _d, _e, _f;
      const duration = (_b = (_a = this.duration) == null ? void 0 : _a[event]) != null ? _b : this.duration;
      const easing = (_d = (_c = this.easing) == null ? void 0 : _c[event]) != null ? _d : this.easing;
      const delay = (_f = (_e = this.delay) == null ? void 0 : _e[event]) != null ? _f : this.delay;
      element.style.setProperty("transition-duration", `${duration}ms`, "important");
      element.style.setProperty("transition-timing-function", `${easing}`, "important");
      element.style.setProperty("transition-delay", `${delay}ms`, "important");
    },
    reduceTransition(element) {
      element.style.setProperty("transition-duration", "0ms", "important");
      element.style.setProperty("transition-delay", "0ms", "important");
    },
    resetTransition(element) {
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-timing-function");
      element.style.removeProperty("transition-delay");
    },
    initLeaving(element) {
      if (!this.group || this.noMove)
        return element;
      const styles = getComputedStyle(element);
      const { width, height } = styles;
      const { marginLeft, marginTop } = styles;
      element.style.setProperty("left", `${element.offsetLeft - parseFloat(marginLeft)}px`, "important");
      element.style.setProperty("top", `${element.offsetTop - parseFloat(marginTop)}px`, "important");
      element.style.setProperty("width", `${parseFloat(width)}px`, "important");
      element.style.setProperty("height", `${parseFloat(height)}px`, "important");
      element.style.setProperty("position", "absolute", "important");
      return element;
    },
    setMoveDuration() {
      var _a;
      if (this.group && this.$el) {
        (_a = this.$el.style) == null ? void 0 : _a.setProperty("--move-duration", `${this.moveDuration}ms`);
      }
    }
  },
  watch: {
    moveDuration() {
      this.setMoveDuration();
    },
    group() {
      this.setMoveDuration();
    }
  },
  mounted() {
    this.setMoveDuration();
  }
};
const validateExpandAxis = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && ["x", "y"].includes(val);
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  name: "transition-expand",
  mixins: [
    baseTransition
  ],
  props: {
    axis: {
      validator: validateExpandAxis,
      default: expandAxis
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    async onEnter(element) {
      await this.$nextTick();
      await this.$nextTick();
      this.getSizes(element);
      this.collapseElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.expandElement(element, "enter");
    },
    onLeave(element) {
      this.getSizes(element);
      this.expandElement(element, "leave");
      element.offsetTop;
      this.setupTransition(element, "leave");
      this.collapseElement(element, "leave");
    },
    expandElement(element, event = "enter") {
      var _a, _b;
      const axis = (_b = (_a = this.axis) == null ? void 0 : _a[event]) != null ? _b : this.axis;
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      const size = element.visual.size[axis];
      const margin = element.visual.margin[axis];
      const padding = element.visual.padding[axis];
      if (!this.noOpacity) {
        element.style.setProperty("opacity", element.visual.opacity);
      }
      delete element.visual;
      element.style.setProperty(axis === "x" ? "width" : "height", `${parseFloat(size)}px`);
      element.style.setProperty(`padding-${start}`, `${parseFloat(padding[0])}px`);
      element.style.setProperty(`padding-${end}`, `${parseFloat(padding[1])}px`);
      element.style.setProperty(`margin-${start}`, `${parseFloat(margin[0])}px`);
      element.style.setProperty(`margin-${end}`, `${parseFloat(margin[1])}px`);
    },
    collapseElement(element, event = "enter") {
      var _a, _b;
      const axis = (_b = (_a = this.axis) == null ? void 0 : _a[event]) != null ? _b : this.axis;
      const axisProp = axis === "x" ? "width" : "height";
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty(axisProp, "0px");
      element.style.setProperty(`padding-${start}`, "0px");
      element.style.setProperty(`padding-${end}`, "0px");
      element.style.setProperty(`margin-${start}`, "0px");
      element.style.setProperty(`margin-${end}`, "0px");
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("width");
      element.style.removeProperty("height");
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-right");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("padding-left");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-right");
      element.style.removeProperty("margin-bottom");
      element.style.removeProperty("margin-left");
    },
    getSizes(element) {
      const styles = getComputedStyle(element);
      const { opacity } = styles;
      const { width, height } = styles;
      const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
      const { marginTop, marginRight, marginBottom, marginLeft } = styles;
      element.visual = {
        opacity,
        size: { x: width, y: height },
        padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
        margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] }
      };
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "expand" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionExpand = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "transition-fade",
  mixins: [
    baseTransition
  ],
  props: {},
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.fadeElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.$nextTick(() => element.style.removeProperty("opacity"));
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.fadeElement(element, "leave");
    },
    fadeElement(element, event = "enter") {
      element.style.setProperty("opacity", 0);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "fade" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionFade = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const validateScaleAxis = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && ["x", "y", "both"].includes(val);
});
const validateScaleOrigin = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && val.trim() !== "";
});
const validateScaleValue = (value) => validateEnterLeave(value, (val) => {
  return isNumeric(val) && val >= 0 && val <= 1;
});
const getMatrix = (transform) => {
  const matrixType = transform.startsWith("matrix3d") ? "matrix3d" : "matrix";
  const matrix = matrixType === "matrix3d" ? transform.slice(9, -1).split(",").map(Number) : transform.startsWith("matrix") ? transform.slice(7, -1).split(",").map(Number) : [1, 0, 0, 1, 0, 0];
  return [matrixType, matrix];
};
const _sfc_main$1$1 = {
  name: "transition-scale",
  mixins: [
    baseTransition
  ],
  props: {
    axis: {
      validator: validateScaleAxis,
      default: scaleAxis
    },
    origin: {
      validator: validateScaleOrigin,
      default: scaleOrigin
    },
    scale: {
      validator: validateScaleValue,
      default: scaleValue
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.scaleElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.$nextTick(() => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.scaleElement(element, "leave");
    },
    scaleElement(element, event = "enter") {
      var _a, _b, _c, _d, _e, _f;
      const { transform } = getComputedStyle(element);
      const axis = (_b = (_a = this.axis) == null ? void 0 : _a[event]) != null ? _b : this.axis;
      const origin = (_d = (_c = this.origin) == null ? void 0 : _c[event]) != null ? _d : this.origin;
      const scale = clamp(1e-4, (_f = (_e = this.scale) == null ? void 0 : _e[event]) != null ? _f : this.scale, 0.9999);
      const [matrixType, matrix] = getMatrix(transform);
      if (transform.startsWith("matrix3d")) {
        if (axis !== "y")
          matrix[0] = scale;
        if (axis !== "x")
          matrix[5] = scale;
      } else if (transform.startsWith("matrix")) {
        if (axis !== "y")
          matrix[0] = scale;
        if (axis !== "x")
          matrix[3] = scale;
      } else {
        matrix[0] = axis === "y" ? 1 : scale;
        matrix[3] = axis === "x" ? 1 : scale;
      }
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty("transform", `${matrixType}(${matrix})`);
      element.style.setProperty("transform-origin", `${origin}`);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("transform-origin");
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "scale" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionScale = /* @__PURE__ */ _export_sfc(_sfc_main$1$1, [["render", _sfc_render$1]]);
const validateSlideOffset = (value) => validateEnterLeave(value, (val) => {
  if (!isArray(val))
    return false;
  if (val.length !== 2)
    return false;
  return !val.some((v) => {
    if (isInteger(v))
      return false;
    if (isString(v)) {
      return isNaN(Number(v.endsWith("%") ? v.slice(0, -1) : v));
    }
    return true;
  });
});
const _sfc_main$4 = {
  name: "transition-slide",
  mixins: [
    baseTransition
  ],
  props: {
    offset: {
      validator: validateSlideOffset,
      default: () => slideOffset
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.slideElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.slideElement(element, "leave");
    },
    slideElement(element, event = "enter") {
      var _a, _b;
      const { width, height, transform } = getComputedStyle(element);
      const offset = (_b = (_a = this.offset) == null ? void 0 : _a[event]) != null ? _b : this.offset;
      let [offsetX, offsetY] = offset;
      if (!isNumeric(offsetX)) {
        const val = offsetX.endsWith("%") ? parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0) / 100 : parseFloat(offsetX);
        offsetX = val;
      }
      if (!isNumeric(offsetY)) {
        const val = offsetY.endsWith("%") ? parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0) / 100 : parseFloat(offsetY);
        offsetY = val;
      }
      const [matrixType, matrix] = getMatrix(transform);
      if (transform.startsWith("matrix3d")) {
        matrix[12] += offsetX;
        matrix[13] += offsetY;
      } else if (transform.startsWith("matrix")) {
        matrix[4] += offsetX;
        matrix[5] += offsetY;
      } else {
        matrix[4] = offsetX;
        matrix[5] = offsetY;
      }
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty("transform", `${matrixType}(${matrix})`);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "slide" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
({
  [TransitionExpand.name]: TransitionExpand,
  [TransitionFade.name]: TransitionFade,
  [TransitionScale.name]: TransitionScale,
  [TransitionSlide.name]: TransitionSlide
});

const _sfc_main$1 = {
  name: "TransitionFade",
  inheritAttrs: false,
  components: { TheTransition: TransitionFade }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_the_transition = resolveComponent("the-transition");
  _push(ssrRenderComponent(_component_the_transition, mergeProps(_ctx.$attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@morev/vue-transitions/nuxt/vue-transitions/transition-fade.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: { TransitionFade },
  data() {
    return {
      msg: "\u6309\u4E0B\u9762",
      show: false
    };
  },
  methods: {
    async fetchSoup() {
      const res = await this.$axios.$get(
        "https://cors-anywhere.herokuapp.com/https://soul-soup.fe.workers.dev/"
      );
      this.msg = res.title;
      this.show = true;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_transition_fade = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><h1 class="title">\u6BCF\u65E5\u4E00\u53E5\u6BD2\u9E21\u6C64</h1>`);
  _push(ssrRenderComponent(_component_transition_fade, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($data.show) {
          _push2(`<article${_scopeId}><h2 class="subtitle"${_scopeId}>${ssrInterpolate($data.msg)}</h2></article>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          $data.show ? (openBlock(), createBlock("article", { key: 0 }, [
            (openBlock(), createBlock(KeepAlive, null, [
              createVNode("h2", { class: "subtitle" }, toDisplayString($data.msg), 1)
            ], 1024))
          ])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<button class="button--green">\u6765\u4E00\u4E2A</button></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-eedac579.mjs.map
