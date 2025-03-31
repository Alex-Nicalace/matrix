import { HTMLAttributes } from 'react';

export type TAddAssetFormProps = HTMLAttributes<HTMLFormElement> & {
  closeForm?: () => void;
};

export type TSelectedAsset = {
  symbol: string;
  lastPrice: string;
  name: string;
};
