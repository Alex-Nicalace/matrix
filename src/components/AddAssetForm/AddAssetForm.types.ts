import { HTMLAttributes } from 'react';

export type TAddAssetFormProps = HTMLAttributes<HTMLFormElement> & {
  closeForm?: () => void;
};
