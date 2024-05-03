import {useTranslation} from 'react-i18next';
import {ColumnHeaderProps} from './propTypes/types.ts';

export function ColumnHeader({headerName}: ColumnHeaderProps) {
  const {t} = useTranslation();

  return <>{t(headerName)}</>;
}
