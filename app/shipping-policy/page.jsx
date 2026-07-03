export const metadata = {
  title: 'Shipping & Delivery Policy | Adhvaitha Foods',
  description: 'Shipping and Delivery Policy for Adhvaitha Foods, homemade pickles and food products.',
};

export default function ShippingPolicy() {
  return (
    <main className="section-pad">
      <div className="container-sm" style={{ background: '#fff', borderRadius: '18px', padding: '3rem', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Shipping & Delivery Policy</h1>
          <p className="body-md" style={{ color: 'var(--aged-wood)' }}>
            <strong>Adhvaitha Foods — Homemade Pickles & Food</strong><br />
            Effective Date: June 15, 2026 | Last Updated: June 15, 2026
          </p>
        </div>

        <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>STRICT SHIPPING & DELIVERY POLICY (ANTI-SCAM)</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <li><strong>1. Customer Responsibility for Address:</strong> Customers must ensure the delivery address and phone number provided are 100% accurate. We are not responsible for non-delivery due to incorrect or incomplete addresses. No refunds will be provided for orders lost or returned due to wrong address inputs.</li>
              
              <li><strong>2. No Address Changes:</strong> Once an order has been processed and handed over to the courier, the delivery address cannot be changed under any circumstances.</li>
              
              <li><strong>3. Delivery Timelines are Estimates:</strong> While we strive to deliver within our stated timeframe (typically 3 to 7 working days), delivery delays caused by courier partners, weather conditions, or unforeseen circumstances are out of our control. We do not offer refunds for delayed deliveries.</li>
              
              <li><strong>4. Unavailability of Customer:</strong> Our delivery partners will attempt delivery 2 times. If the customer is unavailable to receive the package, or rejects the delivery at the doorstep, the package will be returned to us. <strong>No refunds will be issued for perishable food items in such cases.</strong></li>
              
              <li style={{ background: 'rgba(232,168,32,0.1)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #F0CD4C', margin: '0.5rem 0' }}>
                <strong style={{ fontSize: '1.1rem' }}>5. The "RTO" (Return to Origin) Clause:</strong><br />
                If a prepaid order is returned to us (RTO) because the customer rejected the delivery, provided an incorrect address, or was unreachable, <strong>shipping charges (both forward and return) will be deducted</strong> from any eligible refund. For perishable food items that get spoiled during RTO, zero refund will be issued.
              </li>
              
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>CONTACT US</h2>
            <div style={{ background: 'rgba(250,240,220,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <tbody>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', width: '30%', color: 'var(--rich-brown)' }}>Legal Entity Name</td><td style={{ padding: '0.5rem 0' }}>Adhvaitha Foods</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Registered Office Address</td><td style={{ padding: '0.5rem 0' }}>North East Colony, Deshmukhi, Yadadri Bhuvanagiri, Telangana 508284, India</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Support Email</td><td style={{ padding: '0.5rem 0' }}>hello@avdaithafoods.in</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Support Phone Number</td><td style={{ padding: '0.5rem 0' }}>+91 93939 34200</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Hours</td><td style={{ padding: '0.5rem 0' }}>Monday – Sunday: 9:00 AM – 6:00 PM IST</td></tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
