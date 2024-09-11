export interface Column<Data = any> {
  key: string;
  label?: string;
  width?: string;
  type?: string;

  render?(record: Data, col: Column): any;
}
