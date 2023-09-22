export interface ABIEntry {
  inputs?: Array<{ name: string; type: string }>;
  name?: string;
  stateMutability?: string;
  outputs?: Array<{ name: string; type: string }>;
  type: string;
}
