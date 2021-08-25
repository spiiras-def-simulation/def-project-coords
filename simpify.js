const L = require('./simLeaflet');

module.exports = function (path, k) {
  const points = path.map(([x, y]) => L.point(x, y));
  return path ? L.LineUtil.simplify(points, k || 5) : [];
};
