import Header from './components/Header';
import './App.scss';
import AssetsData from './components/AssetsData';
import Dialog from './components/Dialog';
import AddAssetForm from './components/AddAssetForm';

function App() {
  return (
    <div className="app">
      <Dialog>
        <Header />
        <AssetsData />
        <Dialog.Window
          windowName="addActive"
          mode="modal"
          transitionEffect={['fade']}
          render={(close) => <AddAssetForm closeForm={close} />}
          onClickOutside={(close) => close()}
        />
      </Dialog>
    </div>
  );
}

export default App;
