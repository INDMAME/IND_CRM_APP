import { useEffect, type Dispatch, type SetStateAction } from "react";

type Args = {
  startDate: Date | null;
  endDate: Date | null;
  selectingStep: "start" | "end" | "done";
  setSelectingStep: Dispatch<SetStateAction<"start" | "end" | "done">>;
};

// Keeps the manual date picker step aligned with the selected range.
export const useHistoryPickerStepSync = ({ startDate, endDate, selectingStep, setSelectingStep }: Args) => {
  useEffect(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep, setSelectingStep]);
};
