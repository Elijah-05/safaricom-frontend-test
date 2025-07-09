import React from "react";

interface ConfirmationViewProps {
  form: {
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    proof: File | null;
  };
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  form,
  onBack,
  onSaveDraft,
  onSubmit,
}) => (
  <div className="px-2">
    <div className="bg-white rounded-lg shadow-[0_6px_12px_0_rgba(0,0,0,0.15)] pt-4 mb-6">
      <div className="font-semibold text-gray-700 text-lg m-4">
        FUND WITHDRAW OPTION
      </div>
      <hr className=" border border-gray-200 mb-4" />
      <div className="flex flex-wrap justify-between p-6 gap-8">
        <div className="flex-1 min-w-[200px]">
          <div className="font-bold text-sm mb-1">BANK NAME:</div>
          <div className="text-gray-700 text-sm mb-2">{form.bank}</div>
          <div className="font-bold text-sm mb-1">ACCOUNT NUMBER:</div>
          <div className="text-gray-700 text-sm">{form.accountNumber}</div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="font-bold text-sm mb-1">BANK BRANCH NAME:</div>
          <div className="text-gray-700 mb-2">{form.branch}</div>
          <div className="font-bold text-sm mb-1">PROOF OF BANK ACCOUNT:</div>
          <div className="text-primary text-sm cursor-pointer">
            {form.proof ? "BANK ACCOUNT FILE" : "-"}
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="font-bold text-sm mb-1">ACCOUNT NAME:</div>
          <div className="text-gray-700 text-sm">{form.accountName}</div>
        </div>
      </div>
    </div>
    <div className="flex justify-end space-x-3">
      <button
        className="bg-primary/90 text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
        onClick={onBack}
      >
        Back
      </button>
      <button
        className="bg-primary/90 text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
        onClick={onSaveDraft}
      >
        Save as Draft
      </button>
      <button
        className="bg-primary text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  </div>
);

export default ConfirmationView;
