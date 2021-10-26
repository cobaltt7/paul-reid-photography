/* eslint-disable*/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _views_Home_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../views/Home.vue */ "./src/views/Home.vue");







console.log(Object({"0":"e","1":"jhgt","2":"q","3":"w"}));
vue__WEBPACK_IMPORTED_MODULE_4__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_5__["default"]);
var routes = [{
  path: '/',
  component: _views_Home_vue__WEBPACK_IMPORTED_MODULE_6__["default"]
}];
Object({"0":e,"1":jhgt,"2":q,"3":w}).forEach(function (gallery) {
  routes.push({
    path: '/' + gallery,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function component() {
      return __webpack_require__.e(/*! import() | gallery */ "gallery").then(__webpack_require__.bind(null, /*! ../views/Gallery.vue */ "./src/views/Gallery.vue"));
    },
    props: {
      gallery: gallery
    }
  });
});
var router = new vue_router__WEBPACK_IMPORTED_MODULE_5__["default"]({
  mode: 'history',
  base: "/",
  routes: routes
});
/* harmony default export */ __webpack_exports__["default"] = (router);//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVyL2luZGV4LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlci9pbmRleC50cz9kN2RhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFZ1ZVJvdXRlciwgeyBSb3V0ZUNvbmZpZyB9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5pbXBvcnQgSG9tZSBmcm9tICcuLi92aWV3cy9Ib21lLnZ1ZSdcbmNvbnNvbGUubG9nKGdhbGxlcmllcylcblxuVnVlLnVzZShWdWVSb3V0ZXIpXG5cbmNvbnN0IHJvdXRlczogUm91dGVDb25maWdbXSA9IFtcbiAge1xuICAgIHBhdGg6ICcvJyxcbiAgICBjb21wb25lbnQ6IEhvbWVcbiAgfSxcbl1cbmdhbGxlcmllcy5mb3JFYWNoKGdhbGxlcnkgPT4ge1xuICByb3V0ZXMucHVzaChcbiAgICB7XG4gICAgICBwYXRoOiAnLycrZ2FsbGVyeSxcbiAgICAgIC8vIHJvdXRlIGxldmVsIGNvZGUtc3BsaXR0aW5nXG4gICAgICAvLyB0aGlzIGdlbmVyYXRlcyBhIHNlcGFyYXRlIGNodW5rIChhYm91dC5baGFzaF0uanMpIGZvciB0aGlzIHJvdXRlXG4gICAgICAvLyB3aGljaCBpcyBsYXp5LWxvYWRlZCB3aGVuIHRoZSByb3V0ZSBpcyB2aXNpdGVkLlxuICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJnYWxsZXJ5XCIgKi8gJy4uL3ZpZXdzL0dhbGxlcnkudnVlJyksXG4gICAgICBwcm9wczogeyBnYWxsZXJ5IH1cbiAgICB9KVxufSlcblxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XG4gIG1vZGU6ICdoaXN0b3J5JyxcbiAgYmFzZTogcHJvY2Vzcy5lbnYuQkFTRV9VUkwsXG4gIHJvdXRlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFOQTtBQVFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BIiwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./src/router/index.ts
