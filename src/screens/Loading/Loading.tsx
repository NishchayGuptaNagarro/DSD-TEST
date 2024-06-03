import {HashLoader} from 'react-spinners';
import './Loading.scss';

function Loading() {
  return (
    <>
      <div data-testid={'loading'} className={'loading-container'}>
        {/*  This spinner is from react-spinner library , we can adjust its speed, size ,color*/}
        <span className={'center'}>
          <HashLoader color="#344767" size={60} />
        </span>
      </div>
    </>
  );
}

export default Loading;
