"use client";

import { useState } from "react";

export default function KYCInput() {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [form, setForm] = useState<{
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    proof: File | null;
  }>({
    bank: "",
    branch: "",
    accountName: "",
    accountNumber: "",
    proof: null,
  });
  const [errors, setErrors] = useState<{
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    proof: string;
  }>({
    bank: "",
    branch: "",
    accountName: "",
    accountNumber: "",
    proof: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const validate = () => {
    const newErrors = {
      bank: "",
      branch: "",
      accountName: "",
      accountNumber: "",
      proof: "",
    };
    if (!form.bank) newErrors.bank = "Bank is required.";
    if (!form.branch) newErrors.branch = "Branch is required.";
    if (!form.accountName) newErrors.accountName = "Account Name is required.";
    if (!form.accountNumber)
      newErrors.accountNumber = "Account Number is required.";
    else if (!/^[0-9]+$/.test(form.accountNumber))
      newErrors.accountNumber = "Account Number must be numeric.";
    if (!form.proof) newErrors.proof = "Proof of Bank Account is required.";
    if (
      form.proof &&
      !["application/pdf", "image/png", "image/jpeg"].includes(form.proof.type)
    ) {
      newErrors.proof = "File must be PDF, PNG, or JPG.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setForm((prev) => ({ ...prev, proof: file }));
    // Clear error if valid
    if (
      file &&
      ["application/pdf", "image/png", "image/jpeg"].includes(file.type)
    ) {
      setErrors((prev) => ({ ...prev, proof: "" }));
    }
  };

  // Only allow letters and spaces for Account Name, max 40 chars
  const handleAccountNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    if (value.length > 40) value = value.slice(0, 40);
    setForm((prev) => ({ ...prev, accountName: value }));
    // Clear error if valid
    if (value && !errors.accountName) return;
    if (value) setErrors((prev) => ({ ...prev, accountName: "" }));
  };

  // Only allow numbers for Account Number, max 20 digits
  const handleAccountNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 20) value = value.slice(0, 20);
    setForm((prev) => ({ ...prev, accountNumber: value }));
    // Clear error if valid
    if (value && /^[0-9]+$/.test(value) && !errors.accountNumber) return;
    if (value && /^[0-9]+$/.test(value))
      setErrors((prev) => ({ ...prev, accountNumber: "" }));
  };

  const handleNext = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const valid = validate();
    if (valid) {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    setShowConfirmation(false);
  };

  const resetForm = () => {
    setForm({
      bank: "",
      branch: "",
      accountName: "",
      accountNumber: "",
      proof: null,
    });
    setErrors({
      bank: "",
      branch: "",
      accountName: "",
      accountNumber: "",
      proof: "",
    });
    setShowConfirmation(false);
    setShowBankDetails(false);
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2000);
  };

  const handleFinalSubmit = (status: "Submitted" | "Draft") => {
    // Placeholder for actual submit logic
    showToast(
      status === "Submitted"
        ? "Application submitted successfully!"
        : "Application saved as draft."
    );
    resetForm();
  };

  return (
    <div className="p-4">
      {toast.visible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toast.message}
        </div>
      )}
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
            <div className="flex items-center justify-between mb-8 pr-2">
              {[
                { label: "Check Merchant", done: true },
                { label: "Distribution Detail", done: true },
                { label: "Business Type", done: true },
                { label: "Business Detail", done: true },
                { label: "Business Owner", done: true },
                { label: "Fund Withdraw", done: false, current: true },
                { label: "Review", done: false },
              ].map((step, idx, arr) => (
                <div
                  key={step.label}
                  className={`flex items-center ${idx < 6 ? "grow" : ""}`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full ${
                      step.done
                        ? "bg-green-100"
                        : step.current
                        ? "bg-primary/80 text-white"
                        : "bg-gray-200 border-gray-300 text-gray-400"
                    } text-sm font-bold`}
                  >
                    {step.done ? (
                      <svg
                        className="w-4 h-4 text-primary "
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : step.current ? (
                      idx + 1
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`ml-2 text-xs`}>{step.label}</span>
                  {idx < arr.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>
            {/* Card Section */}
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <div className="flex-1 h-0.5 bg-primary/30" />
                <span className="mx-4 font-semibold text-gray-700">
                  Fund Withdraw Option
                </span>
                <div className="flex-1 h-0.5 bg-primary/30" />
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-white w-full max-w-40 border border-slate-300 rounded-md shadow px-4 py-2 flex items-center">
                  <input
                    id="bank"
                    type="checkbox"
                    className="mr-2 size-4 accent-gray-300 checked:accent-primary cursor-pointer"
                    checked={showBankDetails}
                    onChange={() => setShowBankDetails((prev) => !prev)}
                  />

                  <label
                    htmlFor="bank"
                    className="text-gray-700 grow cursor-pointer"
                  >
                    Bank
                  </label>
                </div>
              </div>
              {showBankDetails && (
                <form className="mt-6" onSubmit={handleNext} noValidate>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-600 mb-1">
                        Bank Name
                      </label>
                      <select
                        name="bank"
                        value={form.bank}
                        onChange={handleInput}
                        className={`w-full border rounded px-3 py-3 ${
                          errors.bank ? "border-red-400" : "border-gray-300"
                        } focus:border-primary focus:outline-none`}
                      >
                        <option value="">Select Bank</option>
                        <option>Commercial Bank of Ethiopia</option>
                        <option>Awash Bank</option>
                        <option>Dashen Bank</option>
                      </select>
                      {errors.bank && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.bank}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 mb-1">
                        Branch Name
                      </label>
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleInput}
                        className={`w-full border rounded px-3 py-3 ${
                          errors.branch ? "border-red-400" : "border-gray-300"
                        } focus:border-primary focus:outline-none`}
                      >
                        <option value="">Select Branch</option>
                        <option>Addis Ababa</option>
                        <option>Adama</option>
                        <option>Bahir Dar</option>
                      </select>
                      {errors.branch && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.branch}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={form.accountName}
                        onChange={handleAccountNameInput}
                        placeholder="Enter Account Name"
                        maxLength={40}
                        className={`w-full border rounded px-3 py-2 ${
                          errors.accountName
                            ? "border-red-400"
                            : "border-gray-300"
                        } focus:border-primary focus:outline-none`}
                      />
                      {errors.accountName && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.accountName}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={form.accountNumber}
                        onChange={handleAccountNumberInput}
                        placeholder="Enter Account Number"
                        maxLength={20}
                        className={`w-full border rounded px-3 py-2 ${
                          errors.accountNumber
                            ? "border-red-400"
                            : "border-gray-300"
                        } focus:border-primary focus:outline-none`}
                      />
                      {errors.accountNumber && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.accountNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1">
                      Proof of Bank Account
                    </label>
                    <input
                      type="file"
                      name="proof"
                      accept=".pdf, .png, .jpg, .jpeg"
                      onChange={handleFile}
                      required
                      className={`border rounded px-3 py-2 ${
                        errors.proof ? "border-red-400" : "border-gray-300"
                      } focus:border-primary focus:outline-none`}
                    />
                    {errors.proof && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.proof}
                      </p>
                    )}
                  </div>
                </form>
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
                <div className="text-gray-700 text-sm">
                  {form.accountNumber}
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="font-bold text-sm mb-1">BANK BRANCH NAME:</div>
                <div className="text-gray-700 mb-2">{form.branch}</div>
                <div className="font-bold text-sm mb-1">
                  PROOF OF BANK ACCOUNT:
                </div>
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
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-primary/90 text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
              onClick={() => handleFinalSubmit("Draft")}
            >
              Save as Draft
            </button>
            <button
              className="bg-primary text-white px-6 py-1.5 rounded-lg hover:bg-primary/80 transition-all"
              onClick={() => handleFinalSubmit("Submitted")}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
