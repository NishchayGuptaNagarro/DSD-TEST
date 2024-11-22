import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import SignOutSelect from 'component/SignOutSelect/SignOutSelect.tsx';
import './Header.scss';
import {HeaderProps} from './propTypes/types.ts';

export default function Header({children}: HeaderProps) {
  return (
    <header className={'header'}>
      <div className={'header-container'}>
        <div>{children}</div>
        <div className={'selector-container'}>
          <span className={'language-dropdown'}>
            <LanguageSelect />
          </span>
          <span className={'sign-out-dropdown'}>
            <SignOutSelect />
          </span>
        </div>
      </div>
    </header>
  );
}
