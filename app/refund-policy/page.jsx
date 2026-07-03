import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refund & Cancellation Policy | Adhvaitha Foods',
  description: 'Refund and Cancellation Policy for Adhvaitha Foods, homemade pickles and food products.',
};

export default function RefundPolicy() {
  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main className="section-pad" style={{ paddingTop: '160px' }}>
      <div className="container-sm" style={{ background: '#fff', borderRadius: '18px', padding: '3rem', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Refund & Cancellation Policy</h1>
          <p className="body-md" style={{ color: 'var(--aged-wood)' }}>
            <strong>Adhvaitha Foods — Homemade Pickles & Food</strong><br />
            Effective Date: June 15, 2026 | Last Updated: June 15, 2026
          </p>
        </div>

        <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <div style={{ background: 'var(--terracotta)', color: 'var(--ivory)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h2 className="display-sm" style={{ marginBottom: '0.5rem', color: 'var(--ivory)' }}>STRICT REFUND & RETURN POLICY (ANTI-SCAM)</h2>
              <p className="body-sm" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>PLEASE READ THIS SECTION CAREFULLY BEFORE PLACING YOUR ORDER.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>1. Mandatory Unboxing Video</h3>
                <p className="body-md">To be eligible for any return, replacement, or refund for damaged or missing items, <strong>a continuous, unedited unboxing video is strictly mandatory</strong>. The video must clearly show the sealed package being opened from all sides. Without an unboxing video, no claims will be entertained.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>2. Strict 24-Hour Window</h3>
                <p className="body-md">Any claims for damaged, spoiled, or incorrect items must be reported within <strong>24 hours of delivery</strong>. Claims made after 24 hours will be automatically rejected.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>3. No Returns on Food Items</h3>
                <p className="body-md">Due to hygiene and safety reasons, we do not accept returns on any food items once the seal is broken or the package is opened. Taste preferences, dislike of flavor, or minor natural variations in handcrafted products are not considered a valid reason for a refund.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4. Replacement First Policy</h3>
                <p className="body-md">If a valid claim is verified via the unboxing video, our policy is to provide a <strong>free replacement</strong> of the item. Cash refunds are only initiated if the replacement item is out of stock.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>5. No Refunds</h3>
                <p className="body-md">Refunds will NOT be issued for:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Orders where the customer refused delivery or was unavailable</li>
                  <li>Taste dissatisfaction or "ordered by mistake"</li>
                  <li>Any reason other than the narrow exceptions listed above (and proven via unboxing video).</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>6. Cancellation Rule</h3>
                <p className="body-md">Orders can only be cancelled within <strong>2 hours</strong> of placing the order, or before the order has been dispatched—whichever is earlier. Once dispatched, orders cannot be cancelled.</p>
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
      <Footer />
    </div>
  );
}
