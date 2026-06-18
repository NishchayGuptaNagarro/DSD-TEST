import {OrdersResponse} from 'models/DriverHistoryResponse';
import {
  DeliveryTransactionHistory,
  TransactionHistory,
} from 'models/TransactionHistory';

export function getParsedOrders(
  orders: OrdersResponse[],
  driverType: string,
): TransactionHistory[] | DeliveryTransactionHistory[] {
  const mappedTransactions: TransactionHistory[] = orders.map(
    (transaction, i) => ({
      rowId: i,
      customerId: Number(transaction.customer.external_id),
      customerName: transaction.customer.customer_name,
      grossAmount: transaction.gross_amount,
      currIso: transaction.curr_iso,
      orderId: transaction.order_number || '0',
      paymentMethods: {
        cash: transaction.payment_method.cash,
        credit: transaction.payment_method.credit,
        cheque: transaction.payment_method.cheque,
      },
      status: transaction.status,
    }),
  );

  // If driverType is 'Delivery', group transactions by customer
  if (driverType?.toUpperCase() === 'DELIVERY') {
    const grouped: Record<string, TransactionHistory[]> = {};

    mappedTransactions.forEach(order => {
      const key = order.customerId.toString();
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(order);
    });

    // Convert the grouped record into an array of DeliveryTransactionHistory objects
    return Object.entries(grouped).map(([customerId, orders], index) => ({
      rowId: index,
      customerId,
      orders,
    }));
  }

  // Otherwise, return the flat mapped array of orders
  return mappedTransactions;
}
