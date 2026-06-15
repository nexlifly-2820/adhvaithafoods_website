export const metadata = {
  title: 'Privacy Policy | Avdaitha Foods',
  description: 'Privacy Policy for Avdaitha Foods, homemade pickles and food products.',
};

export default function PrivacyPolicy() {
  return (
    <main className="section-pad">
      <div className="container-sm" style={{ background: '#fff', borderRadius: '18px', padding: '3rem', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p className="body-md" style={{ color: 'var(--aged-wood)' }}>
            <strong>Avdaitha Foods — Homemade Pickles & Food</strong><br />
            Effective Date: June 15, 2026 | Last Updated: June 15, 2026
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem', background: 'rgba(250,240,220,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 className="display-sm" style={{ marginBottom: '1rem', color: 'var(--forest-green)' }}>Business Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.95rem' }}>
            <strong style={{ color: 'var(--rich-brown)' }}>Business</strong>
            <span>Avdaitha Foods</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Address</strong>
            <span>Abids, Hyderabad, Telangana 500001, India</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Phone / WA</strong>
            <span>+91 98765 43210 (Mon–Sat, 9 AM–6 PM)</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Email</strong>
            <span>hello@avdaithafoods.com / orders@avdaithafoods.com</span>
          </div>
        </section>

        <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>1. INTRODUCTION</h2>
            <p className="body-md">Avdaitha Foods is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and share your information when you use our mobile application or website ("Platform"). Please read this policy carefully. If you disagree with its terms, please discontinue use of our Platform.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>2. INFORMATION WE COLLECT</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>2.1 Information You Provide Directly</h3>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li><strong>Account information:</strong> Full name, email address, mobile number, password</li>
                  <li><strong>Delivery information:</strong> Delivery address, landmark, pincode, city</li>
                  <li><strong>Payment information:</strong> UPI IDs, transaction IDs (we do not store card numbers)</li>
                  <li><strong>Order information:</strong> Products ordered, special instructions, order history</li>
                  <li><strong>Communication:</strong> Messages, complaints, or feedback sent to us via WhatsApp, email, or in-app chat</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>2.2 Information Collected Automatically</h3>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li><strong>Device information:</strong> Device type, operating system, app version, device ID</li>
                  <li><strong>Usage data:</strong> Pages visited, features used, time spent, click patterns</li>
                  <li><strong>Location data:</strong> Approximate location (for delivery area check) and precise location only if you grant permission</li>
                  <li><strong>Log data:</strong> IP address, browser type, access times, referring URLs</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>2.3 Information from Third Parties</h3>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Payment gateway transaction confirmations (Razorpay, PhonePe, etc.)</li>
                  <li>Google or phone number sign-in details if you use social login</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>3. HOW WE USE YOUR INFORMATION</h2>
            <p className="body-md" style={{ marginBottom: '1rem' }}>We use your information for the following purposes:</p>
            
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', border: '1px solid rgba(139,94,60,0.2)' }}>
                <thead>
                  <tr style={{ background: 'rgba(232,168,32,0.1)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>Purpose</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="body-md">
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Processing and delivering your orders</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Contract performance</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Sending order confirmations and delivery updates</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Contract performance</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Customer support and complaint handling</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Sending promotional offers and new product alerts</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Consent (you can opt out)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Improving our Platform and products</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Fraud prevention and security</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Legal obligation / Legitimate interest</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Compliance with legal requirements</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Legal obligation</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem' }}>Analytics to understand usage patterns</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Legitimate interest</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="body-md" style={{ fontWeight: 700, marginTop: '1rem' }}>We will never use your information for purposes not listed above without your explicit consent.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>4. HOW WE SHARE YOUR INFORMATION</h2>
            <p className="body-md" style={{ marginBottom: '1.5rem' }}>We do not sell your personal data. We share your information only in the following limited circumstances:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4.1 Delivery Partners</h3>
                <p className="body-md">Your name, phone number, and delivery address are shared with our delivery personnel solely for the purpose of completing your delivery.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4.2 Payment Processors</h3>
                <p className="body-md">Payment information is shared with our payment gateway partners (e.g., Razorpay) who process transactions securely under their own privacy policies.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4.3 Technology Service Providers</h3>
                <p className="body-md">We use third-party services for hosting, analytics, notifications, and cloud storage. These providers have access to your data only to perform services on our behalf and are contractually bound to protect your data.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4.4 Legal Requirements</h3>
                <p className="body-md">We may disclose your information if required by law, court order, or government authority, or to protect the rights and safety of Avdaitha Foods, our staff, or the public.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>4.5 Business Transfers</h3>
                <p className="body-md">In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new owner. We will notify you before such a transfer occurs.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>5. DATA RETENTION</h2>
            <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Account data:</strong> Retained as long as your account is active</li>
              <li><strong>Order data:</strong> Retained for 7 years for legal and accounting compliance</li>
              <li><strong>Payment records:</strong> Retained as required by financial regulations</li>
              <li><strong>Marketing preferences:</strong> Retained until you withdraw consent</li>
              <li><strong>Deleted accounts:</strong> Personal data anonymised within 30 days of account deletion request, except where retention is required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>6. YOUR RIGHTS</h2>
            <p className="body-md" style={{ marginBottom: '1rem' }}>Under applicable Indian data protection laws, you have the following rights:</p>
            
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', border: '1px solid rgba(139,94,60,0.2)' }}>
                <thead>
                  <tr style={{ background: 'rgba(232,168,32,0.1)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>Right</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>What it means</th>
                  </tr>
                </thead>
                <tbody className="body-md">
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Right to Access</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Request a copy of the personal data we hold about you</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Right to Correction</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Request correction of inaccurate or incomplete data</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Right to Deletion</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Request deletion of your personal data (subject to legal obligations)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Right to Withdraw Consent</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Withdraw marketing consent at any time</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Right to Data Portability</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Request your data in a machine-readable format</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Right to Grievance Redressal</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Lodge a complaint with our Grievance Officer</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="body-md">To exercise any of these rights, contact us at <a href="mailto:hello@avdaithafoods.com" style={{ color: 'var(--terracotta)', fontWeight: 700 }}>hello@avdaithafoods.com</a> with the subject line "Data Privacy Request". We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>7. COOKIES AND TRACKING</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.1 What We Use</h3>
                <p className="body-md" style={{ marginBottom: '0.5rem' }}>Our Platform may use cookies, local storage, and similar technologies to:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Keep you logged in</li>
                  <li>Remember your preferences and cart</li>
                  <li>Analyse usage patterns</li>
                  <li>Serve relevant content</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.2 Your Control</h3>
                <p className="body-md">You can disable cookies in your browser or app settings. Disabling cookies may affect certain features of the Platform such as staying logged in or cart persistence.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.3 Third-Party Analytics</h3>
                <p className="body-md">We use Google Analytics and Firebase Analytics to understand how users interact with our Platform. These tools collect anonymised usage data. You can opt out of Google Analytics via Google's opt-out tools.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>8. SECURITY</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>8.1</strong> We implement industry-standard security measures including:
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>SSL/TLS encryption for all data in transit</li>
                  <li>Encrypted storage for sensitive data</li>
                  <li>Access controls limiting who can view your data</li>
                  <li>Regular security audits</li>
                </ul>
              </li>
              <li><strong>8.2</strong> However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</li>
              <li><strong>8.3</strong> In the event of a data breach affecting your rights, we will notify you within 72 hours of becoming aware, in accordance with applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>9. CHILDREN'S PRIVACY</h2>
            <p className="body-md">Our Platform is not intended for children under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that a child under 13 has provided us personal information, we will delete it immediately.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>10. THIRD-PARTY LINKS</h2>
            <p className="body-md">Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to read their privacy policies before providing any information.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>11. PUSH NOTIFICATIONS</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>11.1</strong> We send push notifications for:
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>Order status updates (accepted, packing, shipped, delivered)</li>
                  <li>New product launches</li>
                  <li>Special offers and discounts</li>
                </ul>
              </li>
              <li><strong>11.2</strong> You can manage notification preferences in your device settings or the app settings at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>12. LOCATION DATA</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>12.1</strong> We request location access to:
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>Verify delivery serviceability for your area</li>
                  <li>Auto-fill your delivery address</li>
                </ul>
              </li>
              <li><strong>12.2</strong> Precise location is only accessed when you grant permission. You can revoke location access at any time from your device settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>13. GRIEVANCE OFFICER</h2>
            <p className="body-md" style={{ marginBottom: '1rem' }}>In accordance with the Information Technology Act, 2000 and IT (Amendment) Act, 2008, and applicable rules, the details of our Grievance Officer are:</p>
            
            <div style={{ background: 'rgba(250,240,220,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <tbody>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', width: '30%', color: 'var(--rich-brown)' }}>Name</td><td style={{ padding: '0.5rem 0' }}>Avdaitha Foods Representative</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Designation</td><td style={{ padding: '0.5rem 0' }}>Grievance Officer</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Email</td><td style={{ padding: '0.5rem 0' }}>grievance@avdaithafoods.com</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Address</td><td style={{ padding: '0.5rem 0' }}>Avdaitha Foods, Abids, Hyderabad, Telangana 500001, India</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Response</td><td style={{ padding: '0.5rem 0' }}>Within 30 days of receiving the complaint</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>14. CHANGES TO THIS POLICY</h2>
            <p className="body-md" style={{ marginBottom: '0.5rem' }}>We may update this Privacy Policy from time to time. We will notify you of significant changes via:</p>
            <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '0.5rem' }}>
              <li>A push notification on the app</li>
              <li>An email to your registered address</li>
              <li>A prominent notice on our Platform</li>
            </ul>
            <p className="body-md">Your continued use of the Platform after the change constitutes your acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>15. CONTACT US</h2>
            <div style={{ background: 'rgba(250,240,220,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <tbody>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', width: '30%', color: 'var(--rich-brown)' }}>Email</td><td style={{ padding: '0.5rem 0' }}>hello@avdaithafoods.com / orders@avdaithafoods.com</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>WhatsApp</td><td style={{ padding: '0.5rem 0' }}>+91 98765 43210</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Address</td><td style={{ padding: '0.5rem 0' }}>Avdaitha Foods, Abids, Hyderabad, Telangana 500001, India</td></tr>
                  <tr><td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: 'var(--rich-brown)' }}>Hours</td><td style={{ padding: '0.5rem 0' }}>Monday – Saturday: 9:00 AM – 6:00 PM IST | Sunday: Closed</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(139,94,60,0.2)', textAlign: 'center' }}>
            <p className="body-sm" style={{ fontStyle: 'italic', color: 'var(--aged-wood)' }}>
              This Privacy Policy was prepared for Avdaitha Foods, Hyderabad. Please have this reviewed by a qualified legal professional before publishing.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
