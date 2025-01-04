import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = () => {
        const allPlaces = [
          {
            id: "temple-of-tooths",
            title: "Temple of Tooths",
            description: "A sacred temple in Kandy",
            image: "/temple.jpg",
            details: "The Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy, Sri Lanka. It houses the relic of the tooth of Buddha, which is a key pilgrimage site for Buddhists. The temple is considered one of the most sacred places for Buddhists, attracting visitors and pilgrims from around the world. It also plays a significant role in Sri Lankan history and culture, as the relic has been associated with the legitimacy of the Sri Lankan monarchy for centuries."
          },
          {
            id: "sigiriya-rock-fortress",
            title: "Sigiriya Rock Fortress",
            description: "An ancient rock fortress",
            image: "/sigiriya.jpg",
            details: "Sigiriya is an ancient rock fortress located in the central Matale District of Sri Lanka. It is a UNESCO World Heritage site, known for its frescoes, gardens, and architecture. The fortress is built atop a massive rock column and offers stunning views of the surrounding landscape. The site is rich in history, with evidence of its use by several ancient Sri Lankan kings. Visitors can explore the ruins, including the remains of royal palaces, water gardens, and frescoes that have survived centuries."
          },
          {
            id: "galle-fort",
            title: "Galle Fort",
            description: "A historic fort in Galle",
            image: "/galle.jpg",
            details: "Galle Fort is a historic fortress located in the city of Galle on the southwest coast of Sri Lanka. It was first built by the Portuguese and later expanded by the Dutch. The fort is an excellent example of European military architecture in South Asia. Today, it serves as a UNESCO World Heritage site, with preserved colonial-era buildings, churches, and streets that reflect its rich cultural history. The fort area also houses numerous shops, cafes, and museums that attract tourists to experience its unique charm."
          },
        ];

        const allHotels = [
          {
            id: "grand-hotel",
            title: "The Grand Hotel",
            description: "Luxury hotel in Kandy",
            image: "/grand-hotel.jpg",
            details: "The Grand Hotel is a luxury hotel located in Kandy, Sri Lanka. It is known for its historic charm, world-class service, and stunning views of the surrounding hills. The hotel offers spacious rooms, fine dining, and a variety of facilities to make every guest's stay unforgettable. Its architectural design is reminiscent of colonial-era grandeur, blending modern amenities with traditional elegance. Guests can also enjoy the hotel’s beautifully landscaped gardens and peaceful atmosphere, making it a perfect getaway for relaxation."
          },
          {
            id: "heritance-kandalama",
            title: "Heritance Kandalama",
            description: "Resort near Sigiriya",
            image: "/heritance.jpg",
            details: "Heritance Kandalama is a luxurious eco-resort located in the midst of a forest reserve near Sigiriya, offering spectacular views and an immersive experience in nature. The resort is designed to blend with the environment, incorporating sustainable practices and eco-friendly architecture. It features spacious rooms with panoramic views, a variety of dining options, and a range of wellness and recreational facilities. Guests can explore nearby cultural sites or relax by the infinity pool while surrounded by lush greenery and wildlife."
          },
          {
            id: "jetwing-lighthouse",
            title: "Jetwing Lighthouse",
            description: "Hotel in Galle with ocean views",
            image: "/jetwing.jpg",
            details: "Jetwing Lighthouse is a five-star hotel located in Galle with stunning views of the Indian Ocean. The hotel offers luxurious accommodations and exceptional hospitality. Designed by renowned architect Geoffrey Bawa, the hotel reflects his signature style of blending modern design with the natural landscape. Guests can enjoy spacious rooms, a variety of gourmet dining options, and the hotel's extensive facilities, including a spa, swimming pool, and beach access. Its location near Galle Fort makes it an ideal base for exploring the region's historical and cultural attractions."
          },
        ];

        const allData = [...allPlaces, ...allHotels];
        const selectedData = allData.find((item) => item.id === id);
        setData(selectedData);
      };

      fetchData();
    }
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f7f7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        maxWidth: '900px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        padding: '40px 60px',
        width: '100%',
        textAlign: 'center',
        boxSizing: 'border-box',
        margin: '0 20px',
      }}>
        <h1 style={{
          fontSize: '50px',
          fontWeight: '700',
          marginBottom: '30px',
          color: '#333',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
        }}>
          {data.title}
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>

        <p style={{
          fontSize: '20px',
          lineHeight: '1.8',
          color: '#555',
          textAlign: 'left',
          marginBottom: '40px',
          maxWidth: '850px',
          margin: '0 auto',
        }}>
          {data.details}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          <a
            href="/booking"
            style={{
              padding: '18px 36px',
              backgroundColor: '#4C8BF5',
              color: '#fff',
              fontSize: '20px',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              textAlign: 'center',
              letterSpacing: '1px',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3868c1'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4C8BF5'}
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Details;
