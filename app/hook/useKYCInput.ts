import { useState } from "react";

export function useKYCInput() {
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

  return {
    showBankDetails,
    setShowBankDetails,
    form,
    setForm,
    errors,
    setErrors,
    showConfirmation,
    setShowConfirmation,
    toast,
    setToast,
    validate,
    handleInput,
    handleFile,
    handleAccountNameInput,
    handleAccountNumberInput,
    handleNext,
    handleBack,
    resetForm,
    showToast,
    handleFinalSubmit,
  };
}
