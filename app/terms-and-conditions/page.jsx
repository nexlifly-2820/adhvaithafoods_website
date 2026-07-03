import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms and Conditions | Avdaitha Foods',
  description: 'Terms and Conditions for Avdaitha Foods, homemade pickles and food products.',
};

export default function TermsAndConditions() {
  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main className="section-pad" style={{ paddingTop: '160px' }}>
      <div className="container-sm" style={{ background: '#fff', borderRadius: '18px', padding: '3rem', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="display-lg" style={{ color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Terms and Conditions</h1>
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
            <span>North East Colony, Deshmukhi, Yadadri Bhuvanagiri, Telangana 508284, India</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Phone / WA</strong>
            <span>+91 93939 34200 (Mon–Sun, 9 AM–6 PM)</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Email</strong>
            <span>hello@avdaithafoods.in / orders@avdaithafoods.in</span>
          </div>
        </section>

        <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>1. ACCEPTANCE OF TERMS</h2>
            <p className="body-md">By downloading, accessing, or using the Avdaitha Foods mobile application or website ("Platform"), you ("Customer", "User", "You") agree to be legally bound by these Terms and Conditions. If you do not agree, please do not use our Platform or place any orders. Continued use of the Platform after any modification constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>2. ELIGIBILITY</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>2.1</strong> You must be at least 18 years of age to place an order.</li>
              <li><strong>2.2</strong> You must provide accurate, complete, and current information when creating an account or placing an order.</li>
              <li><strong>2.3</strong> You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.</li>
              <li><strong>2.4</strong> We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>3. PRODUCTS</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>3.1</strong> Avdaitha Foods sells homemade pickles, chutneys, spice powders, and related food products prepared in a home/artisanal kitchen environment.</li>
              <li style={{ background: 'rgba(220, 38, 38, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #dc2626', margin: '0.5rem 0' }}>
                <strong>ALLERGEN WARNING:</strong> Our products may contain or come into contact with nuts, sesame, mustard, dairy, gluten, and other allergens. Customers with food allergies must contact us before placing an order. We are not liable for allergic reactions if allergen information was not requested prior to purchase.
              </li>
              <li><strong>3.3</strong> Product images on the Platform are for illustrative purposes only. Actual products may vary slightly in appearance, colour, or packaging due to the handcrafted nature of our products.</li>
              <li><strong>3.4</strong> Product availability is subject to change without notice. We reserve the right to discontinue any product at any time.</li>
              <li><strong>3.5</strong> All products are prepared fresh or in small batches. Shelf life and storage instructions are mentioned on the product label and must be followed strictly.</li>
              <li><strong>3.6</strong> We do not use artificial preservatives in most products. Natural shelf life applies. Consuming products after the best-before date is at the customer's own risk.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>4. ORDERING</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>4.1</strong> Placing an order constitutes an offer to purchase the selected products at the stated price.</li>
              <li><strong>4.2</strong> An order is confirmed only when you receive a confirmation notification or message from us.</li>
              <li><strong>4.3</strong> We may cancel an order due to:
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>Product unavailability or stock shortage</li>
                  <li>Incorrect pricing displayed due to technical error</li>
                  <li>Suspected fraudulent activity</li>
                  <li>Inability to deliver to your location</li>
                  <li>Force majeure events</li>
                </ul>
              </li>
              <li><strong>4.4</strong> If we cancel your order after payment, a full refund will be issued to your original payment method within 5–7 business days.</li>
              <li><strong>4.5 Cancellation Rule:</strong> Orders can only be cancelled within 2 hours of placing the order, or before the order has been dispatched—whichever is earlier. Once dispatched, orders cannot be cancelled.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>5. PRICING AND PAYMENT</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>5.1</strong> All prices are displayed in Indian Rupees (Rs.) and are inclusive of applicable taxes unless stated otherwise.</li>
              <li><strong>5.2</strong> Delivery charges, if applicable, will be displayed at checkout before you confirm the order.</li>
              <li><strong>5.3</strong> Accepted payment methods:
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Net banking</li>
                  <li>Credit / Debit cards</li>
                  <li>Cash on Delivery (COD) where available</li>
                </ul>
              </li>
              <li><strong>5.4</strong> For COD orders, payment must be made in exact change at the time of delivery. Our delivery personnel do not carry change.</li>
              <li><strong>5.5</strong> We reserve the right to change pricing at any time without prior notice. The price at the time of order confirmation is the final price.</li>
              <li><strong>5.6</strong> We are not responsible for duplicate payments arising from re-attempts after a payment failure. Please verify with your bank before re-attempting.</li>
              <li style={{ background: 'rgba(220, 38, 38, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #dc2626', margin: '0.5rem 0' }}>
                <strong>5.7 Fraudulent Chargeback Clause:</strong> Any fraudulent chargebacks (claiming to the bank that you didn't make the purchase when you actually did) or fake refund claims will result in a permanent ban from using the Adhvaitha Foods app and website, and we reserve the right to take legal action to recover the lost amount.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>6. STRICT SHIPPING & DELIVERY POLICY (ANTI-SCAM)</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>6.1 Customer Responsibility for Address:</strong> Customers must ensure the delivery address and phone number provided are 100% accurate. We are not responsible for non-delivery due to incorrect or incomplete addresses. No refunds will be provided for orders lost or returned due to wrong address inputs.</li>
              <li><strong>6.2 No Address Changes:</strong> Once an order has been processed and handed over to the courier, the delivery address cannot be changed under any circumstances.</li>
              <li><strong>6.3 Delivery Timelines are Estimates:</strong> While we strive to deliver within our stated timeframe (e.g., 3 to 7 days), delivery delays caused by courier partners, weather conditions, or unforeseen circumstances are out of our control. We do not offer refunds for delayed deliveries.</li>
              <li><strong>6.4 Unavailability of Customer:</strong> Our delivery partners will attempt delivery 2 times. If the customer is unavailable to receive the package, or rejects the delivery at the doorstep, the package will be returned to us. <strong>No refunds will be issued for perishable food items in such cases.</strong></li>
              <li style={{ background: 'rgba(232,168,32,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #F0CD4C', margin: '0.5rem 0' }}>
                <strong>6.5 The "RTO" (Return to Origin) Clause:</strong> If a prepaid order is returned to us (RTO) because the customer rejected the delivery, provided an incorrect address, or was unreachable, <strong>shipping charges (both forward and return) will be deducted</strong> from any eligible refund. For perishable food items that get spoiled during RTO, zero refund will be issued.
              </li>
            </ul>
          </section>

          <section>
            <div style={{ background: 'var(--terracotta)', color: 'var(--ivory)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h2 className="display-sm" style={{ marginBottom: '0.5rem', color: 'var(--ivory)' }}>7. STRICT REFUND & RETURN POLICY (ANTI-SCAM)</h2>
              <p className="body-sm" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>PLEASE READ THIS SECTION CAREFULLY BEFORE PLACING YOUR ORDER.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.1 Mandatory Unboxing Video</h3>
                <p className="body-md">To be eligible for any return, replacement, or refund for damaged or missing items, <strong>a continuous, unedited unboxing video is strictly mandatory</strong>. The video must clearly show the sealed package being opened from all sides. Without an unboxing video, no claims will be entertained.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.2 Strict 24-Hour Window</h3>
                <p className="body-md">Any claims for damaged, spoiled, or incorrect items must be reported within <strong>24 hours of delivery</strong>. Claims made after 24 hours will be automatically rejected.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.3 No Returns on Food Items</h3>
                <p className="body-md">Due to hygiene and safety reasons, we do not accept returns on any food items once the seal is broken or the package is opened. Taste preferences, dislike of flavor, or minor natural variations in handcrafted products are not considered a valid reason for a refund.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.4 Replacement First Policy</h3>
                <p className="body-md">If a valid claim is verified via the unboxing video, our policy is to provide a <strong>free replacement</strong> of the item. Cash refunds are only initiated if the replacement item is out of stock.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.5 No Refunds</h3>
                <p className="body-md">Refunds will NOT be issued for:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Orders where the customer refused delivery or was unavailable</li>
                  <li>Taste dissatisfaction or "ordered by mistake"</li>
                  <li>Any reason other than the narrow exceptions listed above (and proven via unboxing video).</li>
                </ul>
              </div>

            </div>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>8. INTELLECTUAL PROPERTY</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>8.1</strong> All content on our Platform including logo, product names, photographs, recipes, descriptions, and design is the intellectual property of Avdaitha Foods and is protected under applicable Indian law.</li>
              <li><strong>8.2</strong> You may not copy, reproduce, distribute, or use our content for commercial purposes without prior written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>9. USER CONDUCT</h2>
            <p className="body-md" style={{ marginBottom: '0.5rem' }}>You agree NOT to:</p>
            <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '0.5rem' }}>
              <li>Use the Platform for any unlawful purpose</li>
              <li>Place fraudulent orders</li>
              <li>Harass, abuse, or threaten our staff or delivery personnel</li>
              <li>Submit false complaints or claims</li>
              <li>Attempt to reverse engineer or hack the Platform</li>
              <li>Use automated systems to place bulk orders without prior agreement</li>
            </ul>
            <p className="body-md">Violation of these terms may result in immediate account termination and potential legal action.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>10. LIMITATION OF LIABILITY</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>10.1</strong> Avdaitha Foods' liability is limited to the value of the order placed in any single transaction.</li>
              <li><strong>10.2</strong> We are not liable for any indirect, incidental, consequential, or punitive damages including loss of data, business, or goodwill.</li>
              <li><strong>10.3</strong> We are not responsible for health issues arising from consumption of products past their best-before date, improper storage by the customer, or known/unknown food allergies not disclosed to us before ordering.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>11. DISCLAIMER OF WARRANTIES</h2>
            <p className="body-md">The Platform and its services are provided on an “as-is” and “as-available” basis without warranties of any kind, either express or implied. We do not guarantee uninterrupted access to the Platform or that it will be free from technical errors.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>12. INDEMNIFICATION</h2>
            <p className="body-md">You agree to indemnify and hold harmless Adhvaitha Foods, its directors, employees, and affiliates from any claims, damages, or expenses arising from your misuse of the Platform or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>13. ELECTRONIC COMMUNICATION</h2>
            <p className="body-md">By using the Platform or placing an order, you consent to receive communications from us including order confirmations, shipping updates, and promotional messages via email, SMS, or WhatsApp. You may opt out of promotional communications at any time.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>14. USER CONTENT & FEEDBACK</h2>
            <p className="body-md">If you submit feedback, suggestions, or reviews, you grant Adhvaitha Foods a non-exclusive, royalty-free license to use, reproduce, publish, and display such content for operational or marketing purposes. You agree not to submit unlawful, defamatory, or abusive content.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>15. PRIVACY</h2>
            <p className="body-md">Your use of this Platform is also subject to our Privacy Policy, which describes how personal information is collected, used, and protected. Please review our Privacy Policy separately.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>16. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>16.1</strong> These Terms are governed by the laws of India, specifically applicable in the state of Telangana.</li>
              <li><strong>16.2</strong> Any disputes shall first be attempted to be resolved through mutual discussion.</li>
              <li><strong>16.3</strong> If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts located in Yadadri Bhuvanagiri, Telangana, India.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>17. CHANGES TO TERMS</h2>
            <p className="body-md">We reserve the right to modify these Terms at any time. Updated Terms will be posted on the Platform with a revised effective date. Your continued use after such changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>18. CONTACT US</h2>
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

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(139,94,60,0.2)', textAlign: 'center' }}>
            <p className="body-sm" style={{ fontStyle: 'italic', color: 'var(--aged-wood)' }}>
              These Terms and Conditions were prepared for Adhvaitha Foods, Yadadri Bhuvanagiri. Please have these reviewed by a qualified legal professional before publishing.
            </p>
          </div>

        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
}
