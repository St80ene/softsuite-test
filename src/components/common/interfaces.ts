export interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  options?: { label: string; value: any }[];
  register: any;
  error: any;
  setValue: any;
  handleChange?: (...args: any[]) => any;
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

export interface IElement {
  categoryId: number;
  categoryValueId: number;
  classificationId: number;
  classificationValueId: number;
  createdAt: string;
  description: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  amount: string | number;
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
  suborganizationId?: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
}
