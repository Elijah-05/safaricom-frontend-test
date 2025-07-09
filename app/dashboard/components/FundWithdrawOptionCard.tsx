import React from "react";

interface FundWithdrawOptionCardProps {
  showBankDetails: boolean;
  onToggle: () => void;
}

const FundWithdrawOptionCard: React.FC<FundWithdrawOptionCardProps> = ({
  showBankDetails,
  onToggle,
}) => (
  <div className="flex items-center justify-between">
    <div className="bg-white w-full max-w-40 border border-slate-300 rounded-md shadow px-4 py-2 flex items-center">
      <input
        id="bank"
        type="checkbox"
        className="mr-2 size-4 accent-gray-300 checked:accent-primary cursor-pointer"
        checked={showBankDetails}
        onChange={onToggle}
      />
      <label htmlFor="bank" className="text-gray-700 grow cursor-pointer">
        Bank
      </label>
    </div>
  </div>
);

export default FundWithdrawOptionCard;
