export const metadata = {
  title: 'Terms and Conditions | Avdaitha Foods',
  description: 'Terms and Conditions for Avdaitha Foods, homemade pickles and food products.',
};

export default function TermsAndConditions() {
  return (
    <main className="section-pad">
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
            <span>Abids, Hyderabad, Telangana 500001, India</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Phone / WA</strong>
            <span>+91 98765 43210 (Mon–Sat, 9 AM–6 PM)</span>
            
            <strong style={{ color: 'var(--rich-brown)' }}>Email</strong>
            <span>hello@avdaithafoods.com / orders@avdaithafoods.com</span>
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
              <li><strong>4.5</strong> You may not cancel an order once it has been accepted and moved to the Packing stage.</li>
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
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>6. DELIVERY</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>6.1</strong> We currently deliver within select areas of Hyderabad, Telangana. Delivery availability will be shown at checkout based on your pincode.</li>
              <li><strong>6.2</strong> Estimated delivery times are indicative only and not guaranteed. Actual delivery may vary due to traffic, weather, volume of orders, or other factors.</li>
              <li><strong>6.3</strong> Delivery is made to the address provided at the time of ordering. We are not responsible for failed deliveries due to incorrect or incomplete addresses.</li>
              <li><strong>6.4</strong> If no one is available at the delivery address and our agent cannot reach you, the order may be returned. Re-delivery charges will apply and no refund will be issued for the original order.</li>
              <li><strong>6.5</strong> We are not liable for delays caused by natural disasters, civil unrest, government restrictions, or extreme weather.</li>
            </ul>
          </section>

          <section>
            <div style={{ background: 'var(--terracotta)', color: 'var(--ivory)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h2 className="display-sm" style={{ marginBottom: '0.5rem', color: 'var(--ivory)' }}>7. NO RETURN, NO REPLACEMENT, NO REFUND POLICY</h2>
              <p className="body-sm" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>PLEASE READ THIS SECTION CAREFULLY BEFORE PLACING YOUR ORDER.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.1 General Policy</h3>
                <p className="body-md">ALL SALES ARE FINAL. Avdaitha Foods operates a strict No Return, No Replacement, and No Refund policy on all orders once delivered. By placing an order, you acknowledge and agree to this policy unconditionally.</p>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.2 Why We Have This Policy</h3>
                <p className="body-md">Our products are:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Freshly prepared food items that cannot be resold once delivered</li>
                  <li>Perishable in nature and cannot be restocked after leaving our facility</li>
                  <li>Handcrafted in small batches without industrial preservation</li>
                  <li>Subject to food safety regulations that prohibit return of opened or handled food products</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.3 No Returns</h3>
                <p className="body-md">We do not accept returns under any circumstance including but not limited to:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Change of mind after delivery</li>
                  <li>Dislike of taste, flavour, spice level, or texture</li>
                  <li>Ordered by mistake</li>
                  <li>Received as a gift and not wanted</li>
                  <li>Delay in delivery leading to dissatisfaction</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.4 No Replacements</h3>
                <p className="body-md">We do not offer product replacements for:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Taste or quality preferences that are subjective in nature</li>
                  <li>Minor natural variations in colour or texture of handcrafted products</li>
                  <li>Opened or partially consumed products</li>
                  <li>Products not stored as per the instructions on the label</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.5 No Refunds</h3>
                <p className="body-md">Refunds will NOT be issued for:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Delivered orders under any circumstances</li>
                  <li>COD orders where the customer refuses to pay at delivery</li>
                  <li>Orders where the customer was unavailable at delivery</li>
                  <li>Taste dissatisfaction</li>
                  <li>Any reason other than the narrow exceptions listed in Section 7.6 below</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.6 Exceptions (Only Valid Complaints)</h3>
                <p className="body-md" style={{ marginBottom: '1rem' }}>A complaint will be considered only in the following strictly limited situations:</p>
                
                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                  <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', border: '1px solid rgba(139,94,60,0.2)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(232,168,32,0.1)' }}>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>Situation</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(139,94,60,0.2)' }}>Resolution</th>
                      </tr>
                    </thead>
                    <tbody className="body-md">
                      <tr>
                        <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Product delivered is completely different from what was ordered (wrong item)</td>
                        <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Replacement or store credit only</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>Product is visibly damaged, leaking, or seal-broken at the time of delivery</td>
                        <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', fontWeight: 700 }}>Replacement or store credit only</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem 1rem' }}>Product is delivered in an inedible or clearly spoiled condition — must be reported within 2 hours with photo proof</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Replacement or store credit only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="body-md" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Important conditions for any exception claim:</p>
                <ul className="body-md" style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                  <li>Must be reported within 2 hours of delivery via WhatsApp or our app</li>
                  <li>Must include clear photographs of the product and packaging</li>
                  <li>The product must be unopened or minimally opened (only enough to identify the issue)</li>
                  <li>Decision by Avdaitha Foods is final and binding</li>
                  <li>Accepted claims result in store credit or replacement only — never a cash refund</li>
                </ul>
              </div>

              <div>
                <h3 className="body-lg" style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--terracotta)' }}>7.7 Store Credit</h3>
                <p className="body-md">In rare accepted cases under Section 7.6, we may issue store credit valid for 30 days from the date of issue. Store credit cannot be converted to cash.</p>
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
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>11. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
            <ul className="body-md" style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>11.1</strong> These Terms are governed by the laws of India, specifically applicable in the state of Telangana.</li>
              <li><strong>11.2</strong> Any disputes shall first be attempted to be resolved through mutual discussion.</li>
              <li><strong>11.3</strong> If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>12. CHANGES TO TERMS</h2>
            <p className="body-md">We reserve the right to modify these Terms at any time. Updated Terms will be posted on the Platform with a revised effective date. Your continued use after such changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="display-sm" style={{ marginBottom: '1rem' }}>13. CONTACT US</h2>
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
              These Terms and Conditions were prepared for Avdaitha Foods, Hyderabad. Please have these reviewed by a qualified legal professional before publishing.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
