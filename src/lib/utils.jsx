/* eslint-disable no-prototype-builtins */
export const isObject = (testMaterial) =>
  typeof testMaterial === "object" && !Array.isArray(testMaterial) && testMaterial != null;
export const getFunctionKeyFromStrings = (Module, StringArray) =>
  Object.keys(Module).find((FunctionKey) =>
    StringArray.every((s) => Module[FunctionKey].toString().includes(s)),
  );
const findInTree = (tree, searchFilter, { walkable = null, ignore = [] } = {}) => {
  if (typeof searchFilter === "string") {
    if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
  } else if (searchFilter(tree)) {
    return tree;
  }
  if (typeof tree !== "object" || tree == null) return null;

  let tempReturn;
  if (Array.isArray(tree)) {
    for (const value of tree) {
      tempReturn = findInTree(value, searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  } else {
    const toWalk = walkable == null ? Object.keys(tree) : walkable;
    for (const key of toWalk) {
      if (!tree.hasOwnProperty(key) || ignore.includes(key)) continue;
      tempReturn = findInTree(tree[key], searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  }
  return tempReturn;
};
export const findInReactTree = (tree, searchFilter) => {
  return findInTree(tree, searchFilter, { walkable: ["props", "children", "child", "sibling"] });
};
