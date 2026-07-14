import React from 'react';

const RelativeInput = ({ index, relative, handleRelativeChange, handleRemoveRelative }) => {
  return (
    <div className="relative-input">
      <input
        type="text"
        name="name"
        placeholder={`Felnőtt ${index + 1} Neve`}
        value={relative.name}
        onChange={(e) => handleRelativeChange(index, e)}
      />
      <button type="button" onClick={() => handleRemoveRelative(index)}>
      Eltávolít
      </button>
    </div>
  );
};

export default RelativeInput;
