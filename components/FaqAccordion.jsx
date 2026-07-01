'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "Are Adhvaitha's products vegetarian?",
    answer: "Yes, all of our products are 100% vegetarian and made with pure, plant-based ingredients.",
    color: "#C1B4E5"
  },
  {
    question: "Do your products contain preservatives or artificial colours?",
    answer: "No, we never use any artificial colors, flavors, or chemical preservatives. Our pickles are naturally preserved using salt, oil, and traditional sun-drying methods.",
    color: "#FFCE35"
  },
  {
    question: "Where are Adhvaitha's products made?",
    answer: "Our products are proudly handcrafted in India, following authentic regional recipes passed down through generations.",
    color: "#FF4B12"
  },
  {
    question: "How should I store your products?",
    answer: "Store them in a cool, dry place away from direct sunlight. Always use a clean, dry spoon to prevent contamination.",
    color: "#47B8E6"
  },
  {
    question: "Do I need to refrigerate the pickles after opening?",
    answer: "While not strictly necessary if stored properly in a cool place, refrigeration after opening is highly recommended to extend freshness and shelf life.",
    color: "#EAE0BA"
  },
  {
    question: "What is the shelf life of your products?",
    answer: "Our pickles have a shelf life of 12 months from the date of manufacture when stored correctly.",
    color: "#85E0C2"
  },
  {
    question: "Is the oil used cold-pressed?",
    answer: "Yes, we use premium cold-pressed sesame and groundnut oils, which retain natural nutrients and authentic flavor.",
    color: "#C1B4E5"
  },
  {
    question: "Are your products gluten-free?",
    answer: "Most of our traditional pickles are naturally gluten-free. However, please check the specific ingredient list on each product page if you have severe allergies.",
    color: "#FFCE35"
  },
  {
    question: "How spicy are the pickles?",
    answer: "We use premium Guntur chilies which provide a rich, robust, and authentic Indian spice level. They pack a flavorful punch!",
    color: "#FF4B12"
  },
  {
    question: "What type of salt do you use?",
    answer: "We use high-quality, pure sea salt and crystal salt, which acts as a natural preservative and enhances the traditional taste.",
    color: "#47B8E6"
  },
  {
    question: "Do you ship across India?",
    answer: "Yes, we proudly offer pan-India shipping. No matter where you are, you can enjoy the authentic taste of Adhvaitha Foods.",
    color: "#EAE0BA"
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are typically processed within 24 hours and delivered within 3-5 business days depending on your location.",
    color: "#85E0C2"
  },
  {
    question: "Is your packaging safe and eco-friendly?",
    answer: "Yes! We pack exclusively in sterilized glass jars to maintain absolute purity and prevent plastic chemical leaching. We use secure, drop-tested packaging for transit.",
    color: "#C1B4E5"
  },
  {
    question: "Can I order in bulk for events or gifting?",
    answer: "Absolutely! Our artisanal pickles make wonderful gifts for weddings, corporate events, and festivals. Please reach out to us via the Contact page for bulk pricing.",
    color: "#FFCE35"
  },
  {
    question: "Do you offer returns or refunds?",
    answer: "Due to the perishable nature of our products, we generally do not accept returns. However, if your order arrives damaged, please contact us within 48 hours for a prompt replacement.",
    color: "#FF4B12"
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState(FAQ_DATA);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const fetchUrl = baseUrl ? `${baseUrl}/dashboard/website/api/get-faq_web` : '/dashboard/website/api/get-faq_web';
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.faqs) {
            setFaqs(json.data.faqs);
          }
        }
      } catch (err) { console.error('Error fetching FAQs:', err); }
    };
    fetchFaqs();
  }, []);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="faq-section" style={{ padding: '8rem 2rem 10rem 2rem', backgroundColor: '#FFFDF9', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <h2 className="faq-title" style={{ 
            fontFamily: '"Arial Black", "Inter", sans-serif', 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 900, 
            color: '#111', 
            marginBottom: '3.5rem', 
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              // The orange/red bar needs white text for better contrast
              const textColor = faq.color === '#FF4B12' ? '#FFFFFF' : '#111111';
              
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    className="faq-button"
                    onClick={() => toggleOpen(index)}
                    style={{
                      backgroundColor: faq.color,
                      border: 'none',
                      borderRadius: '16px',
                      padding: '1.25rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      transition: 'transform 0.2s ease',
                      zIndex: 2,
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <span className="faq-button-text" style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: 800, 
                      color: textColor,
                      paddingRight: '1rem'
                    }}>
                      {faq.question}
                    </span>
                    <div className="faq-chevron" style={{
                      backgroundColor: '#111',
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isOpen ? (
                        <ChevronUp size={20} color="#FFF" />
                      ) : (
                        <ChevronDown size={20} color="#FFF" />
                      )}
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="faq-answer" style={{
                      backgroundColor: faq.color,
                      borderRadius: '16px',
                      padding: '1.5rem 2rem',
                      marginTop: '0.5rem', // Separates it from the button
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: textColor,
                      fontWeight: 500,
                      zIndex: 1,
                      position: 'relative'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .faq-section {
            padding: 4rem 1rem 5rem 1rem !important;
          }
          .faq-title {
            font-size: 2.2rem !important;
            line-height: 1.1 !important;
            margin-bottom: 2.5rem !important;
            word-break: break-word;
          }
          .faq-button {
            padding: 1rem 1rem !important;
            border-radius: 12px !important;
          }
          .faq-button-text {
            font-size: 0.95rem !important;
          }
          .faq-chevron {
            width: 28px !important;
            height: 28px !important;
          }
          .faq-answer {
            padding: 1rem 1rem !important;
            font-size: 0.95rem !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
