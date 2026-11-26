'use client';
import { rupees } from './shopStore';
import { ui } from './ShopShell';

export default function BillBox({ bill, count }) {
  if (!bill) return null;
  return (
    <div>
      <div style={ui.row}><span>Items ({count})</span><span>{rupees(bill.itemsTotal)}</span></div>
      <div style={ui.row}><span>Delivery</span><span>{bill.delivery > 0 ? rupees(bill.delivery) : 'FREE'}</span></div>
      {bill.packing > 0 && <div style={ui.row}><span>Packing</span><span>{rupees(bill.packing)}</span></div>}
      {bill.gst > 0 && <div style={ui.row}><span>GST</span><span>{rupees(bill.gst)}</span></div>}
      {bill.discount > 0 && <div style={{ ...ui.row, color: 'var(--forest-green)', fontWeight: 700 }}><span>Discount{bill.coupon ? ` (${bill.coupon})` : ''}</span><span>−{rupees(bill.discount)}</span></div>}
      <div style={{ borderTop: '1.5px dashed rgba(139,94,60,0.35)', margin: '0.6rem 0' }} />
      <div style={{ ...ui.row, fontSize: '1.15rem', fontWeight: 900 }}><span>Total</span><span>{rupees(bill.total)}</span></div>
    </div>
  );
}
