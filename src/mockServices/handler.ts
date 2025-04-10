import {URL} from 'api/config.ts';
import {rest} from 'msw';
import {driverRoles} from 'utilities/enums';

export const handlers = [
  rest.get(`${URL}warehouse/drivers`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            username: 'driver1',
            business_role_id: driverRoles.VAN_SELLER,
            user_id: 'user_id_1',
            business_partner_id: 'partner_id_1',
            creation_date: '2024-05-30',
            territory: 'territory_1',
            employee_id: 'employee_id_1',
            email: 'driver1@example.com',
            is_active: true,
            date_joined: '2024-01-01',
            updated_at: '2024-05-29',
          },
          {
            username: 'driver2',
            business_role_id: driverRoles.VAN_SELLER,
            user_id: 'user_id_2',
            business_partner_id: 'partner_id_2',
            creation_date: '2024-05-28',
            territory: null, // Set to null if territory is unknown
            employee_id: 'employee_id_2',
            email: 'driver2@example.com',
            is_active: false,
            date_joined: '2024-02-15',
            updated_at: '2024-05-25',
          },
        ],
        status_code: 200,
      }),
    );
  }),
  rest.get(`${URL}warehouse/drivers/pending-checkin`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        data: [
          {
            user_id: 'CA1051',
            business_role_id: driverRoles.VAN_SELLER,
            employee_id: '479',
            is_active: true,
            device_token:
              'dnP3XVzrSEyAP97zYr8Y1D:APA91bFN3hUsr7EZDUfFGb0rPAK9NpSpoKyh0bUypdRbXWsckLjByrWygpxjL0pYdWvYlIx1o7bVIG6IUCQl5ih5Dq3qSnHm1b211KpiLeHnjb47U3qUMUokZ_RjNNUp7uZPcpBjtH2B',
            creation_date: '2024-05-06T23:19:12.325828',
            updated_at: '2024-05-08T18:10:54.289945',
            email: 'yugam.ghogia@nagarro.com',
            username: 'VanSeller Number2',
            business_partner_id: '8000000611',
            van_id: 'L031',
            date_joined: '2024-04-05T04:50:57.319000',
          },
          {
            user_id: 'TG1012',
            business_role_id: driverRoles.VAN_SELLER,
            employee_id: '478',
            is_active: true,
            device_token:
              'dnP3XVzrSEyAP97zYr8Y1D:APA91bFN3hUsr7EZDUfFGb0rPAK9NpSpoKyh0bUypdRbXWsckLjByrWygpxjL0pYdWvYlIx1o7bVIG6IUCQl5ih5Dq3qSnHm1b211KpiLeHnjb47U3qUMUokZ_RjNNUp7uZPcpBjtH2B',
            creation_date: '2024-05-06T23:19:44.137256',
            updated_at: '2024-05-09T06:29:01.412549',
            email: 'abhishek.kumar05@nagarro.com',
            username: 'VanSeller Number1',
            business_partner_id: '8000000610',
            van_id: 'L003',
            date_joined: '2024-04-05T04:49:03.684000',
          },
        ],
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

