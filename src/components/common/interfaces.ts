export interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  options?: { label: string; value: any }[];
  register: any;
  error: any;
  setValue: any;
}

export interface Inputs {
  name: string;
  classification: string;
  category: string;
  payrun: any;
  description: any;
  processingType: string;
  prorate: string;
  reportingName: string;
  status: string | boolean;
  modifiedBy: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  payFrequency: string;
}

export interface Element {
  categoryId: number;
  categoryValueId: number;
  classificationId: number;
  classificationValueId: number;
  createdAt: string;
  description: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  id: string;
  modifiedBy: string;
  name: string;
  payFrequency: string;
  payRunId: number;
  payRunValueId: number;
  processingType: string;
  prorate: string;
  reportingName: string;
  status: string | boolean;
  selectedMonths: [string];
}
