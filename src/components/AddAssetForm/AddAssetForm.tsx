import classNames from 'classnames';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { TAddAssetFormProps } from './AddAssetForm.types';
import './AddAssetForm.scss';

function AddAssetForm({ className, closeForm, ...props }: TAddAssetFormProps) {
  return (
    <form className={classNames('add-asset-form', className)} {...props}>
      <Input className="add-asset-form__symbol" placeholder="Поиск символа" />
      <div className="add-asset-form__symbols">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        atque possimus explicabo voluptate, cum commodi iusto culpa, vel aliquid
        cupiditate deleniti magni aperiam facere quibusdam cumque officia
        maiores? Praesentium, temporibus?
      </div>
      <div className="add-asset-form__box">
        <div className="add-asset-form__symbol-value">qweerty</div>
        <Input
          className="add-asset-form__quantity"
          placeholder="Количество"
          type="number"
        />
        <div className="add-asset-form__buttons">
          <Button>добавить</Button>
          <Button onClick={closeForm} type="button">
            отмена
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddAssetForm;
