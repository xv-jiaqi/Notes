## 背景

### 示例 1:

```javascript
const someValue = expensiveFunction()
... // 一系列其他操作
console.log(someValue) // 使用 console.log 模拟 someValue 使用
```

`expensiveFunction` 首先执行, 很久后才使用它的返回值.

**优化:**

```javascript
console.log(expensiveFunction());
```

### 示例 2:

```javascript
const addHandler = document.body.addEventListener
  ? function(target, eventType, handler) {
      // DOM2 Events
      target.addEventListener(eventType, handler, false);
    }
  : function(target, eventType, handler) {
      // IE
      target.attachEvent('on' + eventType, handler);
    };

const removeHandler = document.body.removeEventListener
  ? function(target, eventType, handler) {
      // DOM2 Events
      target.removeEventListener(eventType, handler, false);
    }
  : function(target, eventType, handler) {
      // IE
      target.detachEvent('on' + eventType, handler);
    };
```

脚本加载时会进行条件检测, 而不是加载后.

**优化:**

```javascript
function addHandler(target, eventType, handler) {
  if (target.addEventListener) {
    // DOM2 Events
    addHandler = function(target, eventType, handler) {
      target.addEventListener(eventType, handler, false);
    };
  } else {
    // IE
    addHandler = function(target, eventType, handler) {
      target.attachEvent('on' + eventType, handler);
    };
  }

  addHandler(target, eventType, handler);
}

function removeHandler(target, eventType, handler) {
  if (target.addEventListener) {
    // DOM2 Events
    removeHandler = function(target, eventType, handler) {
      target.removeEventListener(eventType, handler, false);
    };
  } else {
    // IE
    removeHandler = function(target, eventType, handler) {
      target.detachEvent('on' + eventType, handler);
    };
  }

  addHandler(target, eventType, handler);
}
```
