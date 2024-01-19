export interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  options?: { label: string; value: any }[];
  register: any;
  errors: any;
}
