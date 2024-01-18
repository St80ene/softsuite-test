export interface InputProps {
  label: string;
  value?: any;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange: () => void;
  options?: { label: string; value: any }[];
}
