const isObject = val => Object.prototype.toString.call(val) === '[object Object]';
const isEmptyObject = val => Object.keys(val).length === 0;

const convertObjectToDot = (obj, tgt, path) => {
  tgt = tgt || {};
  path = path || [];
  Object.keys(obj).forEach(function (key) {
    if (isObject(obj[key]) && !isEmptyObject(obj[key])) {
      return convertObjectToDot(obj[key], tgt, path.concat(key));
    } else {
      tgt[path.concat(key).join('.')] = obj[key];
    }
  }.bind(this))
  return tgt;
};

export default convertObjectToDot;
