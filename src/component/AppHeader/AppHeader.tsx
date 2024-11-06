import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import SignOutSelect from 'component/SignOutSelect/SignOutSelect.tsx';
import './AppHeader.scss';
import {AppHeaderProps} from './propTypes/types.ts';

export default function AppHeader({children}: AppHeaderProps) {
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
