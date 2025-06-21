import React, { useState, useEffect, useRef } from 'react';
import { checkboxTreeData } from './data';

const CheckboxTree = () => {
  const [checkedState, setCheckedState] = useState({});
  const checkboxRefs = useRef({});

  // Get all descendant node IDs
  const getAllDescendantIds = (node) => {
    let ids = [];
    if (node.children) {
      node.children.forEach((child) => {
        ids.push(child.id);
        ids = ids.concat(getAllDescendantIds(child));
      });
    }
    return ids;
  };

  // Recursively find parent of a node
  const findParent = (id, nodes) => {
    for (const node of nodes) {
      if (node.children?.some(child => child.id === id)) return node;
      const found = node.children && findParent(id, node.children);
      if (found) return found;
    }
    return null;
  };

  // Recursively update parent check states
  const updateParents = (item, state) => {
    const parent = findParent(item.id, checkboxTreeData);
    if (parent) {
      const childStates = parent.children.map(child => state[child.id]);
      const allChecked = childStates.every(val => val === true);
      const noneChecked = childStates.every(val => val === false);

      if (allChecked) {
        state[parent.id] = true;
      } else if (noneChecked) {
        state[parent.id] = false;
      } else {
        state[parent.id] = null; // indeterminate
      }

      updateParents(parent, state); // Recurse up
    }
  };

  const handleCheckboxChange = (item, checked) => {
    const newState = { ...checkedState };
    const descendantIds = getAllDescendantIds(item);

    // Set current and all descendant values
    newState[item.id] = checked;
    descendantIds.forEach(id => {
      newState[id] = checked;
    });

    // Update parent checkboxes
    updateParents(item, newState);

    setCheckedState(newState);
  };

  useEffect(() => {
    // Apply visual indeterminate states
    Object.keys(checkboxRefs.current).forEach((id) => {
      const checkbox = checkboxRefs.current[id];
      if (checkbox) {
        checkbox.indeterminate = checkedState[id] === null;
      }
    });
  }, [checkedState]);

  const renderCheckboxTree = (items) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: '20px' }}>
        <input
          type="checkbox"
          ref={(el) => (checkboxRefs.current[item.id] = el)}
          checked={checkedState[item.id] === true}
          onChange={(e) => handleCheckboxChange(item, e.target.checked)}
        />
        <span>{item.name}</span>
        {item.children && renderCheckboxTree(item.children)}
      </div>
    ));
  };

  return (
    <div>
      <h2>Checkbox Tree</h2>
      {renderCheckboxTree(checkboxTreeData)}
    </div>
  );
};

export default CheckboxTree;
