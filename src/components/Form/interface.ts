export interface InputProps {
  label: string;
  value: any;
  name: string;
  placeholder?: string;
  classes?: string;
  onChange: () => void;
  options?: any;
}
