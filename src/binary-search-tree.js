const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    let newNode = new Node(data);


    if (this.#root === null) {
      this.#root = newNode;
    } else {
      this.#insertNode(this.#root, newNode)
    }
  }

  has(data) {
    return this.#search(this.#root, data) !== null;
  }

  find(data) {
    return this.#search(this.#root, data);
  }

  remove(data) {
    this.#root = this.#removeNode(this.#root, data); // helper method below
  }

  min() {
    return this.#getMin(this.#root);
  }

  max() {
    return this.#getMax(this.#root);
  }

  #insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.#insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.#insertNode(node.right, newNode);
      }
    }
  }

  #search(node, data) {

    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.#search(node.left, data);
    } else if (data > node.data) {
      return this.#search(node.right, data);
    } else {
      return node;
    }
  }

  #getMin(node) {
    if (node === null) {
      return undefined;
    } else if (node.left) {
      return this.#getMin(node.left);
    } else {
      return node.data;
    }
  }

  #getMax(node) {
    if (node === null) {
      return undefined;
    } else if (node.right) {
      return this.#getMax(node.right);
    } else {
      return node.data;
    }
  }

  #removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
      return node;
    };

    if (node.left === null && node.right === null) {
      node = null;
      return node;
    };

    if (node.left === null) {
      node = node.right;
      return node;
    };

    if (node.right === null) {
      node = node.left;
      return node;
    };

    node.data = this.#getMin(node.right);
    node.right = this.#removeNode(node.right, node.data);
    return node;

  }

}

module.exports = {
  BinarySearchTree
};
