import React from "react";

type PointerBindings = {
  onPointerDown?: React.PointerEventHandler<HTMLTextAreaElement>;
  onPointerMove?: React.PointerEventHandler<HTMLTextAreaElement>;
  onPointerUp?: React.PointerEventHandler<HTMLTextAreaElement>;
  onPointerCancel?: React.PointerEventHandler<HTMLTextAreaElement>;
};

type TapTextAreaField = {
  id: string;
  label: string;
  value: string;
  className: string;
  pointerBindings: PointerBindings;
};

type Props = {
  descriptionLabel: string;
  descriptionValue: string;
  descriptionClassName: string;
  descriptionDisabled?: boolean;
  descriptionMaxLength?: number;
  onDescriptionChange: (nextValue: string) => void;
  tapFields: TapTextAreaField[];
};

// Renders the shared narrative fields block for create/detail flows.
const VisitNarrativeFields = ({
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  descriptionDisabled = false,
  descriptionMaxLength = 200,
  onDescriptionChange,
  tapFields,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="space-y-2">
        <label className="form-label font-semibold">{descriptionLabel}</label>
        <input
          id="description"
          className={descriptionClassName}
          maxLength={descriptionMaxLength}
          value={descriptionValue}
          disabled={descriptionDisabled}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      {tapFields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="form-label font-semibold">{field.label}</label>
          <textarea
            id={field.id}
            className={field.className}
            value={field.value}
            readOnly
            onPointerDown={field.pointerBindings.onPointerDown}
            onPointerMove={field.pointerBindings.onPointerMove}
            onPointerUp={field.pointerBindings.onPointerUp}
            onPointerCancel={field.pointerBindings.onPointerCancel}
          />
        </div>
      ))}
    </div>
  );
};

export default VisitNarrativeFields;
