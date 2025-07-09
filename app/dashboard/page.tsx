"use client";

import { useKYCInput } from "../hook/useKYCInput";
import StepProgressBar from "./components/StepProgressBar";
import FundWithdrawOptionCard from "./components/FundWithdrawOptionCard";
import BankDetailsForm from "./components/BankDetailsForm";
import ConfirmationView from "./components/ConfirmationView";
import Toast from "./components/Toast";

export default function KYCInput() {
  const {
    showBankDetails,
    setShowBankDetails,
    form,
    errors,
    showConfirmation,
    toast,
    handleInput,
    handleFile,
    handleAccountNameInput,
    handleAccountNumberInput,
    handleNext,
    handleBack,
    handleFinalSubmit,
  } = useKYCInput();

  const steps = [
    { label: "Check Merchant", done: true },
    { label: "Distribution Detail", done: true },
    { label: "Business Type", done: true },
    { label: "Business Detail", done: true },
    { label: "Business Owner", done: true },
    { label: "Fund Withdraw", done: false, current: !showConfirmation },
    { label: "Review", done: false },
  ];

  return (
    <div className="p-4">
      <Toast message={toast.message} visible={toast.visible} />
      {!showConfirmation && (
        <>
          <div className=" bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center gap-4">
              <div className="h-px grow bg-primary" />
              <h2 className="text-lg font-semibold">Partner onboarding</h2>
              <div className="h-px grow bg-primary" />
            </div>
          </div>

          <div className="bg-white mt-6 p-6 rounded-lg shadow">
            <StepProgressBar steps={steps} />
            {/* Card Section */}
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <div className="flex-1 h-0.5 bg-primary/30" />
                <span className="mx-4 font-semibold text-gray-700">
                  Fund Withdraw Option
                </span>
                <div className="flex-1 h-0.5 bg-primary/30" />
              </div>
              <FundWithdrawOptionCard
                showBankDetails={showBankDetails}
                onToggle={() => setShowBankDetails((prev) => !prev)}
              />
              {showBankDetails && (
                <BankDetailsForm
                  form={form}
                  errors={errors}
                  onInput={handleInput}
                  onFile={handleFile}
                  onAccountNameInput={handleAccountNameInput}
                  onAccountNumberInput={handleAccountNumberInput}
                  onSubmit={handleNext}
                />
              )}
              <div className="flex justify-end space-x-3 ">
                <button className="bg-primary/90 disabled:bg-primary/70 text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all">
                  Back
                </button>
                <button
                  className="bg-primary disabled:bg-primary/70 text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showConfirmation && (
        <ConfirmationView
          form={form}
          onBack={handleBack}
          onSaveDraft={() => handleFinalSubmit("Draft")}
          onSubmit={() => handleFinalSubmit("Submitted")}
        />
      )}
    </div>
  );
}
