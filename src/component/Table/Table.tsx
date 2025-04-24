import {styled} from '@mui/material/styles';
import {
  DataGrid,
  gridClasses,
  GridColumnMenu,
  GridColumnMenuFilterItem,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
  GridLoadingOverlay,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import {CustomPaginationProps, TableProps} from './propTypes/types.ts';
import './Table.scss';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import NoDataAvailable from 'assets/PNG/NoDataAvailableIcon.png';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';

const StyledGridOverlay = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? styles.greyDarker : styles.charcoal,
  },
  '& .ant-empty-img-2': {
    fill:
      theme.palette.mode === 'light'
        ? styles.bgColorBeigeLight
        : styles.greySoft,
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? styles.greyDarker : styles.charcoal,
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? styles.whitePure : styles.charcoal,
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill:
      theme.palette.mode === 'light' ? styles.bgWhiteSmoke : styles.whitePure,
  },
}));

function CustomNoRowsOverlay() {
  const {t} = useTranslation();

  return (
    <StyledGridOverlay>
      <img src={NoDataAvailable} alt="No data" className="no-data-img" />
      <Box
        sx={{
          mt: 0.5,
          color: styles.grayMuted,
          fontSize: styles.fontSizeLg,
          fontWeight: styles.fontWeightNormal,
          mb: 0.5,
        }}>
        {t('table.noDataAvailable')}
      </Box>
    </StyledGridOverlay>
  );
}

function CustomPagination({
  page,
  pageCount,
  handlePageChange,
}: CustomPaginationProps) {
  const apiRef = useGridApiContext();
  const currentPage = page ?? useGridSelector(apiRef, gridPageSelector);
  const totalPageCount =
    pageCount ?? useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      sx={{
        '& .MuiPaginationItem-root': {
          minWidth: '22px',
          height: '26px',
          backgroundColor: styles.whitePure,
          color: styles.black,
          fontSize: styles.fontSizeXsm,
          '&:hover': {
            backgroundColor: styles.bgColorWhiteSmoke,
          },
          '&.Mui-selected': {
            backgroundColor: styles.bgGrayishBlue,
            color: styles.whitePure,
            '&:hover': {
              backgroundColor: styles.bgGrayishBlue,
            },
          },
        },
      }}
      variant="outlined"
      shape="rounded"
      page={currentPage + 1}
      count={totalPageCount}
      renderItem={props => <PaginationItem {...props} />}
      onChange={(_, value) => {
        if (handlePageChange) {
          handlePageChange(value);
        } else {
          apiRef.current.setPage(value - 1);
        }
      }}
    />
  );
}

function CustomFilterItem(props: GridColumnMenuItemProps) {
  return <GridColumnMenuFilterItem className={'filter-btn'} {...props} />;
}

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      className={'filter-item'}
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
        columnMenuFilterItem: CustomFilterItem,
      }}
    />
  );
}

export default function Table({
  rows,
  columns,
  getRowId,
  showLoading,
  showMenu,
  noOfRows,
  minHeight = 270,
  withBorder = false,
  handlePageChange,
  page,
  pageCount,
}: TableProps) {
  return (
    <DataGrid
      className={'table'}
      loading={showLoading}
      slots={{
        loadingOverlay: () => {
          return <GridLoadingOverlay sx={{backgroundColor: 'inherit'}} />;
        },
        noRowsOverlay: CustomNoRowsOverlay,
        columnMenu: CustomColumnMenu,
        noResultsOverlay: CustomNoRowsOverlay,
        pagination: () => (
          <CustomPagination
            page={page}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        ),
      }}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      autoHeight={false}
      getRowHeight={() => 'auto'} //Passing function to automatically set row height of each row
      getEstimatedRowHeight={() => 52} //giving estimated row height for performance enhancements
      initialState={{
        sorting: {
          sortModel: [{field: 'date', sort: 'desc'}],
        },
        pagination: {
          paginationModel: {
            pageSize: noOfRows,
          },
        },
      }}
      columnHeaderHeight={35}
      pageSizeOptions={[noOfRows]}
      disableColumnMenu={!showMenu}
      disableRowSelectionOnClick
      sx={{
        border: 'none',
        overflow: 'hidden',
        minHeight: rows?.length > 0 ? minHeight : 400,
        maxHeight: rows?.length > 0 ? minHeight : 400,
        color: styles.grayCharcoal,
        backgroundColor: 'transparent',
        '& .MuiDataGrid-menuIcon': {
          visibility: 'visible',
          width: 'auto',
        },
        '& .MuiDataGrid-menuIconButton': {
          color: styles.whitePure,
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeadersInner': {
          width: '100%',
          backgroundColor: styles.bgGrayishBlue,
        },
        '& .MuiDataGrid-sortIcon': {
          color: styles.whitePure,
          visibility: 'visible',
          opacity: 1,
          width: 'auto',
        },
        '& .MuiDataGrid-virtualScroller': {
          overflow: 'hidden',
        },
        '& .MuiDataGrid-overlayWrapper': {
          height: '100%',
        },
        '& .MuiDataGrid-main': {
          borderRadius: '8px',
          backgroundColor: styles.whitePure,
          border: withBorder ? `1px solid ${styles.grayMuted}` : 'none',
        },
        '& .MuiDataGrid-row.Mui-hovered': {
          backgroundColor: 'transparent',
        },
        '& .MuiDataGrid-row': {
          backgroundColor: styles.whitePure,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '& .MuiDataGrid-row:last-child': {
          borderBottom: `1px solid ${styles.borderGrayMuted}`,
        },
        [`& .${gridClasses.cell}`]: {
          paddingTop: 0.4,
          paddingLeft: 3,
        },
        [`& .${gridClasses.cell}:focus, .${gridClasses.cell}:focus-within,  & .${gridClasses.columnHeader}:focus`]:
          {
            outline: 0,
          },
        [`& .${gridClasses.columnHeader}`]: {
          paddingLeft: 3,
          color: styles.whitePure,
          backgroundColor: styles.bgGrayishBlue,
        },
        [`& .${gridClasses.columnHeaderTitle}`]: {
          fontWeight: styles.fontWeightNormal,
          color: styles.whitePure,
        },
        ['.MuiDataGrid-footerContainer']: {
          py: 3,
          height: 30,
          minHeight: 10,
          backgroundColor: 'transparent',
          borderTop: 'none',
        },
      }}
    />
  );
}

