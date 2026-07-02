import React from "react";

type Props = {
  label: string;
  value: string;
};

// Read-only owner field shown only when visibility confirms a manager context.
const DetailOwnerField = ({ label, value }: Props) => {
  return (
    <div className="visita-field-text">
      <label className="form-label font-semibold" htmlFor="visit-detail-owner">
        {label}
      </label>
      <input
        id="visit-detail-owner"
        className="form-control ind-readonly-field cursor-default"
        value={value}
        readOnly
        aria-readonly="true"
      />
    </div>
  );
};

export default DetailOwnerField;
