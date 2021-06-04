// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var lineWidth = 3;
var eraserEnabled = false;
autoSetCanvas(canvas);
listenToMouse(canvas);

pen.onclick = function () {
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
};

eraser.onclick = function () {
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
};

clear.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

black.onclick = function () {
  context.strokeStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');
  green.classList.remove('active');
};

red.onclick = function () {
  context.strokeStyle = 'red';
  red.classList.add('active');
  black.classList.remove('active');
  blue.classList.remove('active');
  green.classList.remove('active');
};

blue.onclick = function () {
  context.strokeStyle = 'blue';
  blue.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
};

green.onclick = function () {
  context.strokeStyle = 'green';
  green.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  blue.classList.remove('active');
};

small.onclick = function () {
  lineWidth = 3;
  small.classList.add('active');
  large.classList.remove('active');
  medium.classList.remove('active');
};

medium.onclick = function () {
  lineWidth = 6;
  medium.classList.add('active');
  small.classList.remove('active');
  large.classList.remove('active');
};

large.onclick = function () {
  lineWidth = 9;
  large.classList.add('active');
  small.classList.remove('active');
  medium.classList.remove('active');
};

save.onclick = function () {
  var url = canvas.toDataURL("image/png");
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'undefined';
  a.click();
};

function listenToMouse(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      using = true;

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 20, 20);
      } else {
        lastPoint = {
          'x': x,
          'y': y
        };
      }
    };

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x, y, 20, 20);
      } else {
        var newPoint = {
          'x': x,
          'y': y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.ontouchend = function () {
      using = false;
    };
  } else {
    canvas.onmousedown = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      console.log(e);
      using = true;

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 20, 20);
      } else {
        lastPoint = {
          'x': x,
          'y': y
        };
      }
    };

    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 20, 20);
      } else {
        var newPoint = {
          'x': x,
          'y': y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function () {
      using = false;
    };
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}

function autoSetCanvas(canvas) {
  setCanvasSize();

  window.onresize = function () {
    setCanvasSize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.37ec802f.js.map