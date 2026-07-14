import React from 'react';

const ChildInput = ({ index, child, handleChildChange, handleRemoveChild }) => {
  return (
    <div className="child-input">
      <input
        type="text"
        name="name"
        placeholder={`Gyermek ${index + 1} Neve`}
        value={child.name}
        onChange={(e) => handleChildChange(index, e)}
      />
      <label>
      születésnap
        </label>
      <input
        type="date"
        name="birthday"
        placeholder="yyyy-mm-dd"
        value={child.birthday}
        onChange={(e) => handleChildChange(index, e)}
      />
      <button type="button" onClick={() => handleRemoveChild(index)}>
      Eltávolít
      </button>
    </div>
  );
};

export default ChildInput;
