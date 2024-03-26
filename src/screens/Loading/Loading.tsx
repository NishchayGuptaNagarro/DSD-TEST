import {HashLoader} from 'react-spinners';
import './Loading.scss';
function Loading() {
  return (
    <>
      <div className={'center'}>
        {/*  This spinner is from react-spinner library , we can adjust its speed, size ,color*/}
        <HashLoader color="#344767" size={80} />
      </div>
    </>
  );
}

export default Loading;
