import {HashLoader} from 'react-spinners';
import './Loading.scss';
function Loading() {
  return (
    <>
      <div className={'loading-container'}>
        {/*  This spinner is from react-spinner library , we can adjust its speed, size ,color*/}
        <span className={'center'}>
          <HashLoader color="#344767" size={80} />
        </span>
      </div>
    </>
  );
}

export default Loading;
