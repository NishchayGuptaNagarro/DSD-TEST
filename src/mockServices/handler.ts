import {URL} from 'api/config.ts';
import {rest} from 'msw';
import {driverRoles} from 'utilities/enums';

const vanSellerDrivers = [
  {
    username: 'VanSeller Number1',
    business_role_id: driverRoles.VAN_SELLER,
    user_id: 'VS001',
    business_partner_id: 'partner_id_1',
    van_id: 'L001',
    creation_date: '2024-05-30',
    employee_id: 'E001',
    email: 'vanseller1@example.com',
    is_active: true,
    device_token: null,
    updated_at: '2024-05-29',
    date_joined: '2024-01-01',
  },
  {
    username: 'VanSeller Number2',
    business_role_id: driverRoles.VAN_SELLER,
    user_id: 'VS002',
    business_partner_id: 'partner_id_2',
    van_id: 'L002',
    creation_date: '2024-05-28',
    employee_id: 'E002',
    email: 'vanseller2@example.com',
    is_active: true,
    device_token: null,
    updated_at: '2024-05-25',
    date_joined: '2024-02-15',
  },
];

const deliveryDrivers = [
  {
    username: 'Delivery Driver 1',
    business_role_id: driverRoles.DELIVERY,
    user_id: 'DL001',
    business_partner_id: 'partner_id_3',
    van_id: 'L003',
    creation_date: '2024-05-30',
    employee_id: 'E003',
    email: 'delivery1@example.com',
    is_active: true,
    device_token: null,
    updated_at: '2024-05-29',
    date_joined: '2024-01-01',
  },
  {
    username: 'Delivery Driver 2',
    business_role_id: driverRoles.DELIVERY,
    user_id: 'DL002',
    business_partner_id: 'partner_id_4',
    van_id: 'L004',
    creation_date: '2024-05-28',
    employee_id: 'E004',
    email: 'delivery2@example.com',
    is_active: true,
    device_token: null,
    updated_at: '2024-05-25',
    date_joined: '2024-02-15',
  },
];

const hybridDrivers = [
  {
    username: 'Hybrid Driver 1',
    business_role_id: driverRoles.HYBRID,
    user_id: 'HY001',
    business_partner_id: 'partner_id_5',
    van_id: 'L005',
    creation_date: '2024-05-30',
    employee_id: 'E005',
    email: 'hybrid1@example.com',
    is_active: true,
    device_token: null,
    updated_at: '2024-05-29',
    date_joined: '2024-01-01',
  },
];

export const handlers = [
  rest.get(`${URL}warehouse/drivers`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        data: {
          'VAN-SELLER': vanSellerDrivers,
          DELIVERY: deliveryDrivers,
          HYBRID: hybridDrivers,
        },
      }),
    );
  }),
  rest.get(`${URL}warehouse/drivers/pending-checkin`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        data: {
          'VAN-SELLER': vanSellerDrivers,
          DELIVERY: deliveryDrivers,
          HYBRID: hybridDrivers,
        },
      }),
    );
  }),
  rest.get(`${URL}warehouse/driver-dashboard-for-warehouse`, (_, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            product_id: '123',
            product_name: 'Widget',
            status: 'Active',
            creation_date: '2024-05-31T18:30:00.000Z',
            unit_of_measure: 'pcs',
            description: 'This is a great widget that does amazing things.',
            external_id: 'EXT-5678',
            category_id: 'CAT-9010',
            updated_at: '2024-05-31T18:30:00.000Z',
            quantity: 100,
            img: {
              product_image: 'src',
            },
          },
        ],
        status_code: 200,
      }),
      ctx.status(200),
    );
  }),
  rest.post(`${URL}warehouse/send-notification-driver`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
      }),
    );
  }),
  rest.get(`${URL}warehouse/digital-signature`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        data: {
          signature_id: 123,
          manager_id: null,
          checkout_time: '2024-05-31T18:30:00.000Z',
          checking_status: 'Pending',
          manager_signature_image: null,
          updated_at: '2024-05-31T18:30:00.000Z',
          order_loading_id: null,
          driver_id: 'DRV-456',
          checkin_time: null,
          driver_signature_image: 'path/to/driver_signature.jpg',
          creation_date: '2024-05-31T18:30:00.000Z',
        },
      }),
    );
  }),
  rest.get(`${URL}warehouse/driver/history`, (req, res, ctx) => {
    if (req.url.searchParams.has('user_id')) {
      return res(
        ctx.status(200),
        ctx.json({
          status_code: 200,
          msg: 'Driver History Fetched Successfully',
          data: {
            orders: [
              {
                user_id: 'CA1051',
                order_number: '0028152071',
                customer: {
                  role_code_text: 'Client DSD',
                  external_id: '2801075',
                  party_id: '7000001',
                  customer_name: 'SUPER MARCHE VICTORIA',
                  country: 'MA',
                  mobile: '',
                  customer_longitude: -7.43159082482632,
                  creation_date: '2024-05-06T23:31:21.728197',
                  role_code: 'ZDSD',
                  account_id: '1015576',
                  life_cycle_status_code: '2',
                  customer_address:
                    'LOT VICTORIA BOUSKOURA / 90000 BOUSKOURA / MA',
                  phone: '',
                  customer_latitude: 33.51875038015908,
                  updated_at: '2024-05-06T23:39:02.831673',
                },
                gross_amount: 296.76,
                curr_iso: 'MAD',
                payment_method: {
                  cash: 77.0,
                  cheque: 0.0,
                  cheque_id: '',
                  credit: 0.0,
                },
              },
              {
                user_id: 'CA1051',
                order_number: '0028152072',
                customer: {
                  role_code_text: 'Client DSD',
                  external_id: '2801032',
                  party_id: '7000001',
                  customer_name: 'ISTIRAHA STATION CHAOUIYA',
                  country: 'MA',
                  mobile: '',
                  customer_longitude: -7.714035071619,
                  creation_date: '2024-05-06T23:31:05.776197',
                  role_code: 'ZDSD',
                  account_id: '1015588',
                  life_cycle_status_code: '2',
                  customer_address:
                    'ANGLE BD ROUDANI ET ZERKTOUNI MAARI / 20220 CASABLANCA / MA',
                  phone: '',
                  customer_latitude: 33.43886380983801,
                  updated_at: '2024-05-06T23:31:05.776197',
                },
                gross_amount: 3219.74,
                curr_iso: 'MAD',
                payment_method: {
                  cash: 3219.0,
                  cheque: 0.0,
                  cheque_id: '',
                  credit: 0.0,
                },
              },
              {
                user_id: 'CA1051',
                order_number: '0028152073',
                customer: {
                  role_code_text: 'Client DSD',
                  external_id: '2800281',
                  party_id: '7000001',
                  customer_name: 'TOTAL MAHATTA RIVIERA',
                  country: 'MA',
                  mobile: '',
                  customer_longitude: -7.714035071619,
                  creation_date: '2024-05-06T23:36:30.841450',
                  role_code: 'ZDSD',
                  account_id: '1015597',
                  life_cycle_status_code: '2',
                  customer_address:
                    'ANGEL RUE OMAR KHYAM ET ROUTE D EL / 20220 CASABLANCA / MA',
                  phone: '',
                  customer_latitude: 33.43886380983801,
                  updated_at: '2024-05-06T23:36:30.841450',
                },
                gross_amount: 300.82,
                curr_iso: 'MAD',
                payment_method: {
                  cash: 100.0,
                  cheque: 200.0,
                  cheque_id: '2854598886',
                  credit: 0.0,
                },
              },
              {
                user_id: 'CA1051',
                order_number: '0028152074',
                customer: {
                  role_code_text: 'Client DSD',
                  external_id: '2800281',
                  party_id: '7000001',
                  customer_name: 'TOTAL MAHATTA RIVIERA',
                  country: 'MA',
                  mobile: '',
                  customer_longitude: -7.714035071619,
                  creation_date: '2024-05-06T23:36:30.841450',
                  role_code: 'ZDSD',
                  account_id: '1015597',
                  life_cycle_status_code: '2',
                  customer_address:
                    'ANGEL RUE OMAR KHYAM ET ROUTE D EL / 20220 CASABLANCA / MA',
                  phone: '',
                  customer_latitude: 33.43886380983801,
                  updated_at: '2024-05-06T23:36:30.841450',
                },
                gross_amount: 16341.74,
                curr_iso: 'MAD',
                payment_method: {
                  cash: 1664.0,
                  cheque: 0.0,
                  cheque_id: '',
                  credit: 14677.0,
                },
              },
              {
                user_id: 'CA1051',
                order_number: '0028152075',
                customer: {
                  role_code_text: 'Client DSD',
                  external_id: '2801075',
                  party_id: '7000001',
                  customer_name: 'SUPER MARCHE VICTORIA',
                  country: 'MA',
                  mobile: '',
                  customer_longitude: -7.43159082482632,
                  creation_date: '2024-05-06T23:31:21.728197',
                  role_code: 'ZDSD',
                  account_id: '1015576',
                  life_cycle_status_code: '2',
                  customer_address:
                    'LOT VICTORIA BOUSKOURA / 90000 BOUSKOURA / MA',
                  phone: '',
                  customer_latitude: 33.51875038015908,
                  updated_at: '2024-05-06T23:39:02.831673',
                },
                gross_amount: 20293.25,
                curr_iso: 'MAD',
                payment_method: {
                  cash: 20293.0,
                  cheque: 0.0,
                  cheque_id: '',
                  credit: 0.0,
                },
              },
            ],
            stocks: [],
            attachments: [],
          },
        }),
      );
    }
  }),
  rest.post(`${URL}warehouse/assign-initial-stock`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
      }),
    );
  }),
  rest.post(`${URL}warehouse/unassign-stock`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
      }),
    );
  }),
];

