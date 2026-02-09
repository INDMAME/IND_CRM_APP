import React from "react";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import VisitNarrativeFields from "../../../components/visitas/VisitNarrativeFields.tsx";

type SelectOption = {
  value?: string | number;
  Value?: string | number;
  text?: string;
  Text?: string;
};

type NarrativeTapField = {
  id: string;
  label: string;
  value: string;
  className: string;
  pointerBindings: {
    onPointerDown?: React.PointerEventHandler<HTMLTextAreaElement>;
    onPointerMove?: React.PointerEventHandler<HTMLTextAreaElement>;
    onPointerUp?: React.PointerEventHandler<HTMLTextAreaElement>;
    onPointerCancel?: React.PointerEventHandler<HTMLTextAreaElement>;
  };
};

type CreateStepVisitDetailsProps = {
  title: string;
  dateLabel: string;
  transDate: string;
  onTransDateChange: (nextValue: string) => void;
  visitTypeLabel: string;
  visitTypes: SelectOption[];
  visitType: string;
  onVisitTypeChange: (nextValue: string) => void;
  visitTypePlaceholder: string;
  visitTypeInvalid: boolean;
  descriptionLabel: string;
  descriptionValue: string;
  descriptionClassName: string;
  onDescriptionChange: (nextValue: string) => void;
  tapFields: NarrativeTapField[];
  status: string;
};

// Renders step 2 with visit metadata and narrative fields.
const CreateStepVisitDetails = ({
  title,
  dateLabel,
  transDate,
  onTransDateChange,
  visitTypeLabel,
  visitTypes,
  visitType,
  onVisitTypeChange,
  visitTypePlaceholder,
  visitTypeInvalid,
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  onDescriptionChange,
  tapFields,
  status,
}: CreateStepVisitDetailsProps) => {
  return (
    <div className="shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
      <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
        {title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="visita-field-text">
          <SingleDatePicker label={dateLabel} value={transDate} onChange={onTransDateChange} />
        </div>
        <SelectCombobox
          label={visitTypeLabel}
          options={visitTypes}
          value={visitType}
          onChange={(nextValue) => onVisitTypeChange(String(nextValue ?? ""))}
          placeholder={visitTypePlaceholder}
          invalid={visitTypeInvalid}
          emitOnValueChange
          portalClassName="visitas-typography"
        />
      </div>

      <VisitNarrativeFields
        descriptionLabel={descriptionLabel}
        descriptionValue={descriptionValue}
        descriptionClassName={descriptionClassName}
        onDescriptionChange={onDescriptionChange}
        tapFields={tapFields}
      />

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">{status}</span>
      </div>
    </div>
  );
};

export default CreateStepVisitDetails;
