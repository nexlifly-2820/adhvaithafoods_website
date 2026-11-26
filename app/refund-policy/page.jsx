import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refund & Cancellation Policy | Adhvaitha Foods',
  description: 'Refund and Cancellation Policy for Adhvaitha Foods, homemade pickles and food products.',
};


async function getContactData() {
  try {
    const res = await fetch('http://api.adhvaithafoods.in/web_settings.php?doc_id=contact_web', { next: { revalidate: 60 } });
    if (res.ok) {
      const text = await res.text();
      const json = text ? JSON.parse(text) : null;
      if (json && json.success && json.data) {
        return json.data.data ? json.data.data : json.data;
      }
    }
  } catch (err) {}
  return null;
}

export default async function RefundPolicy() {
  const contactData = await getContactData();
  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main className="section-pad" style={{ paddingTop: '160px' }}>
      <div className="container-sm" style={{ background: '#fff', borderRadius: '18px', padding: '3rem', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Refund & Cancellation Policy</h1>
          <p className="body-md" style={{ color: 'var(--aged-wood)' }}>
            <strong>Adhvaitha Foods — Homemade Pickles & Food</strong><br />
            Effective Date: June 15, 2026 | Last Updated: November 26, 2026
          </p>
        </div>

        <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <div style={{ background: 'var(--terracotta)', color: 'var(--ivory)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h2 className="display-sm" style={{ marginBottom: '0.5rem', color: 'var(--ivory)' }}>CANCELLATION, REFUND & DAMAGE POLICY</h2>
              <p className="body-sm" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>PLEASE READ THIS SECTION CAREFULLY BEFORE PLACING YOUR ORDER.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>1. Cancel Anytime Before Shipping</h3>
                <p className="body-md">You can cancel your order from the app (<strong>My Orders → Cancel Order</strong>) or by contacting us, any time <strong>until the order is shipped</strong>. Once the parcel is handed to the courier, the order can no longer be cancelled.</p>
              </div>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>2. How Refunds Work</h3>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li><strong>Paid online:</strong> the full amount is refunded automatically to your original payment method (UPI, card, net banking or wallet). It usually reaches your account in <strong>5–7 working days</strong>, depending on your bank.</li>
                  <li><strong>Cash on Delivery:</strong> no money is taken, so nothing needs to be refunded.</li>
                  <li>If we have to cancel your order (for example, an item is out of stock), you get a full refund the same way.</li>
                  <li>You can see the refund status in the app under your order.</li>
                </ul>
              </div>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>3. No Returns After Shipping</h3>
                <p className="body-md">Our pickles, podis and snacks are homemade food. For hygiene and safety reasons, we <strong>do not accept returns</strong> once an order is shipped. Taste preference, &quot;ordered by mistake&quot; after shipping, or the small natural variations of handmade food are not reasons for a refund.</p>
              </div>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4. Damaged, Leaked or Wrong Items — Report Within 48 Hours</h3>
                <p className="body-md">If your parcel arrives damaged, leaked, or with a wrong or missing item, report it <strong>within 48 hours of delivery</strong> from the app (<strong>My Orders → Report Damage</strong>) with a clear photo, or email us with photos. Keep the box and jars until we reply. We strongly recommend recording an unboxing video; it helps us settle your claim faster. Claims after 48 hours cannot be accepted.</p>
              </div>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>5. Replacement or Refund</h3>
                <p className="body-md">After checking your report, we will send a <strong>free replacement</strong> of the affected item, or refund the value of that item (a full or partial refund) to your original payment method. We usually reply within 24 hours.</p>
              </div>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>6. No Refund In These Cases</h3>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>The delivery was refused, or nobody was available at the address after the courier&apos;s attempts</li>
                  <li>A wrong or incomplete address was given</li>
                  <li>Damage was reported more than 48 hours after delivery, or without a photo</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>CONTACT US</h2>
            <div style={{ background: 'rgba(250,240,220,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <tbody>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', width: '30%', color: 'var(--rich-brown)' }}>Legal Entity Name</td><td style={{ padding: '0.5rem 0' }}>Adhvaitha Foods</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Registered Office Address</td><td style={{ padding: '0.5rem 0' }}>North East Colony, Deshmukhi, Yadadri Bhuvanagiri, Telangana 508284, India</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Support Email</td><td style={{ padding: '0.5rem 0' }}>{contactData?.email || 'info@adhvaithafoods.in'}</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Support Phone Number</td><td style={{ padding: '0.5rem 0' }}>{contactData?.phone || '+91 93939 34200'}</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Hours</td><td style={{ padding: '0.5rem 0' }}>Monday – Sunday: 9:00 AM – 6:00 PM IST</td></tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
}
