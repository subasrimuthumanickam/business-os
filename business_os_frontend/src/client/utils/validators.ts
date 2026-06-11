 // Validation functions

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const isValidGST = (gst: string): boolean => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

export const isValidPAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const isValidPinCode = (pincode: string): boolean => {
  const pinRegex = /^[0-9]{6}$/;
  return pinRegex.test(pincode);
};

export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && isFinite(amount);
};

export const isValidDate = (date: string): boolean => {
  return !isNaN(new Date(date).getTime());
};

export const isFutureDate = (date: string): boolean => {
  return new Date(date) > new Date();
};

export const isPastDate = (date: string): boolean => {
  return new Date(date) < new Date();
};

export const validateRequired = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  if (Array.isArray(value)) return value.length > 0;
  return !!value;
};

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export {};  // ← ADD THIS LINE
