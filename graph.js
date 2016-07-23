var Graph = function(){
  newObj = {}
  return newObj;
};

Graph.prototype.addNode = function(node){
  this[node] = [];
};

Graph.prototype.contains = function(node){
  return this.hasOwnProperty(node);
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this[fromNode].push(toNode);
  this[toNode].push(fromNode);
};

Graph.prototype.hasEdge = function(fromNode, toNode){
  return this[fromNode].indexOf(toNode) >= 0;
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  if (this.hasEdge(fromNode, toNode)) {
    this[fromNode].splice(this[fromNode].indexOf(toNode),1);
    this[toNode].splice(this[toNode].indexOf(fromNode),1);
  }
};


Graph.prototype.removeNode = function(node){
  this[node].forEach(function(item){
    this.removeEdge(node,item);
  });
  // delete this[node] somehow

};

Graph.prototype.forEachNode = function(cb){
  for (var key in this){
    cb(this[key]);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
