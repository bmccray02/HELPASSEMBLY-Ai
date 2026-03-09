export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Help Assembly Services",
    "image": "https://helpassembly.com/logo.jpg",
    "@id": "https://helpassembly.com",
    "url": "https://helpassembly.com",
    "telephone": "+1-404-555-0123",
    "email": "hello@helpassembly.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Peachtree Street NE",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "postalCode": "30303",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.749,
      "longitude": -84.388
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "09:00", "closes": "17:00" }
    ],
    "priceRange": "$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" },
    "areaServed": { "@type": "City", "name": "Atlanta" }
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much does furniture assembly cost in Atlanta?", "acceptedAnswer": { "@type": "Answer", "text": "Services start at $79. IKEA averages $89–$149, Peloton $149, robotics $129+" } },
      { "@type": "Question", "name": "Do you offer same-day furniture assembly in Atlanta?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Book before 2 PM for same-day service in the Atlanta metro area." } }
    ]
  }

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book Furniture Assembly in Atlanta",
    "description": "Simple steps to book professional furniture assembly service",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Describe Your Items", "text": "Take photos or describe your furniture by voice or text" },
      { "@type": "HowToStep", "position": 2, "name": "Get AI Quote", "text": "Receive instant price estimate based on your items" },
      { "@type": "HowToStep", "position": 3, "name": "Schedule Service", "text": "Choose same-day or schedule for later" }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
    </>
  )
}
