function FormParamsObject(params = {}) {
  this.params = params;
}
FormParamsObject.prototype.getObjectProperty = function (path) {
  if (typeof path !== 'string') {
    throw Error('path is not string');
  }
  var props = path.split('.');
  var res = this.params;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (typeof res[prop] === 'undefined') {
      return null;
    }
    res = res[prop];
  }

  return res;
};
FormParamsObject.prototype.setObjectProperty = function (path, val) {
  if (typeof path !== 'string') {
    throw Error('path is not string');
  }
  var props = path.split('.');
  var lastProp = props.pop();
  var res = this.params;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (typeof res[prop] !== 'object' || res[prop] === null) {
      res[prop] = {};
    }
    res = res[prop];
  }
  res[lastProp] = val;
  return val;
};
FormParamsObject.prototype.convertObjectToArray = function (path) {
  var obj = this.getObjectProperty(path);
  var arr = Object.keys(obj)
    .reduce(function (res, key) {
      var values = obj[key];
      values.forEach(function (val, index) {
        res[index] = res[index] || {};
        res[index][key] = val;
      });
      return res;
    }, []);
  this.setObjectProperty(path, arr);
  return arr;
};
FormParamsObject.prototype.getFullObject = function () {
  return this.params;
}
