import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeleteForm from './DeleteForm';

export const metadata = {
  title: 'Delete Your Account | Adhvaitha Foods',
  description: 'How to delete your Ambhujakshi (Adhvaitha Foods) app account and personal data.',
};

const card = { background: '#fff', borderRadius: '18px', padding: 'clamp(1.25rem, 4vw, 3rem)', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' };
const h3 = { fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' };

export default function DeleteAccount() {
  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main className="section-pad" style={{ paddingTop: '160px' }}>
        <div className="container-sm" style={card}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Delete Your Account</h1>
            <p className="body-md" style={{ color: 'var(--aged-wood)' }}>
              <strong>Ambhujakshi app by Adhvaitha Foods</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h3 className="body-lg" style={h3}>Option 1 — In the app (instant)</h3>
              <ol className="body-md" style={{ listStyle: 'decimal', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Open the Ambhujakshi app and log in.</li>
                <li>Tap <strong>Profile</strong> in the bottom bar.</li>
                <li>Scroll to the bottom and tap <strong>Delete my account</strong>.</li>
                <li>Confirm. You will be logged out and your data is removed.</li>
              </ol>
            </section>

            <section>
              <h3 className="body-lg" style={h3}>Option 2 — Request here</h3>
              <p className="body-md" style={{ marginBottom: '1rem' }}>
                Can&apos;t open the app? Send us your details below. To protect you, we confirm the request with the email linked to your account before deleting.
              </p>
              <DeleteForm />
            </section>

            <section>
              <h3 className="body-lg" style={h3}>What we delete</h3>
              <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Your profile: name, email and phone number</li>
                <li>Saved delivery addresses and wishlist</li>
                <li>Notification settings and device tokens</li>
                <li>Reviews you wrote are removed or made anonymous</li>
              </ul>
            </section>

            <section>
              <h3 className="body-lg" style={h3}>What we keep, and for how long</h3>
              <p className="body-md">
                Order and invoice records (items, amount, date, delivery address on the invoice) are kept only as long as Indian tax and accounting laws require — usually up to 8 years — and are not used for marketing.
                Everything else is deleted within <strong>30 days</strong> of your request.
              </p>
            </section>

            <p className="body-sm" style={{ color: 'var(--aged-wood)' }}>
              Questions? Email <a href="mailto:info@adhvaithafoods.in" style={{ color: 'var(--terracotta)', fontWeight: 700 }}>info@adhvaithafoods.in</a>. See also our <a href="/privacy-policy" style={{ color: 'var(--terracotta)', fontWeight: 700 }}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
