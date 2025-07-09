import React from "react";

interface BankDetailsFormProps {
  form: {
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    proof: File | null;
  };
  errors: {
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    proof: string;
  };
  onInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAccountNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAccountNumberInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  form,
  errors,
  onInput,
  onFile,
  onAccountNameInput,
  onAccountNumberInput,
  onSubmit,
}) => (
  <form className="mt-6" onSubmit={onSubmit} noValidate>
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <label className="block text-gray-600 mb-1">Bank Name</label>
        <select
          name="bank"
          value={form.bank}
          onChange={onInput}
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
          <p className="text-xs text-red-500 mt-1">{errors.bank}</p>
        )}
      </div>
      <div className="flex-1">
        <label className="block text-gray-600 mb-1">Branch Name</label>
        <select
          name="branch"
          value={form.branch}
          onChange={onInput}
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
          <p className="text-xs text-red-500 mt-1">{errors.branch}</p>
        )}
      </div>
      <div className="flex-1">
        <label className="block text-gray-600 mb-1">Account Name</label>
        <input
          type="text"
          name="accountName"
          value={form.accountName}
          onChange={onAccountNameInput}
          placeholder="Enter Account Name"
          maxLength={40}
          className={`w-full border rounded px-3 py-2 ${
            errors.accountName ? "border-red-400" : "border-gray-300"
          } focus:border-primary focus:outline-none`}
        />
        {errors.accountName && (
          <p className="text-xs text-red-500 mt-1">{errors.accountName}</p>
        )}
      </div>
      <div className="flex-1">
        <label className="block text-gray-600 mb-1">Account Number</label>
        <input
          type="text"
          name="accountNumber"
          value={form.accountNumber}
          onChange={onAccountNumberInput}
          placeholder="Enter Account Number"
          maxLength={20}
          className={`w-full border rounded px-3 py-2 ${
            errors.accountNumber ? "border-red-400" : "border-gray-300"
          } focus:border-primary focus:outline-none`}
        />
        {errors.accountNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>
        )}
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 mb-1">Proof of Bank Account</label>
      <input
        type="file"
        name="proof"
        accept=".pdf, .png, .jpg, .jpeg"
        onChange={onFile}
        required
        className={`border rounded px-3 py-2 ${
          errors.proof ? "border-red-400" : "border-gray-300"
        } focus:border-primary focus:outline-none`}
      />
      {errors.proof && (
        <p className="text-xs text-red-500 mt-1">{errors.proof}</p>
      )}
    </div>
  </form>
);

export default BankDetailsForm;
