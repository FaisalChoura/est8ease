export class Chip {
  label: string;
  value: string | number;
  selected: boolean;
  constructor(label: string, value: string | number, selected: boolean) {
    this.label = label;
    this.value = value;
    this.selected = selected;
  }
}
