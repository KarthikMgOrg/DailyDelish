export default function Footer() {
  return (
    <div className="font-primary bg-gray-100 pt-1">
      <div className="category-links grid grid-cols-[1fr_2fr] m-5">
        <div className="section-1 flex flex-col">
          <h3 className="font-bold text-2xl mb-1">Useful Links</h3>
          <div className="section-1 grid grid-cols-3 gap-x-3 gap-y-4">
            <div className="sec-1">
              <p>About</p>
              <p>Carrers</p>
              <p>Blog</p>
              <p>Press</p>
              <p>Lead</p>
            </div>
            <div className="sec-1 ">
              <p>Privacy</p>
              <p>Terms</p>
              <p>FAQs</p>
              <p>Security</p>
              <p>Mobile</p>
            </div>
            <div className="sec-1 ">
              <p>Partner</p>
              <p>Franchise</p>
              <p>Seller</p>
              <p>Warehouse</p>
              <p>Resources</p>
            </div>
          </div>
        </div>
        <div className="section-2 flex flex-col">
          <h3 className="font-bold text-2xl mb-1">Categories</h3>
          <div className="section-1-subcats grid grid-cols-3">
            <div className="sec-1 flex flex-col">
              <p>Vegetables & Fruits</p>
              <p>Cold Drinks & Juices</p>
              <p>Bakery & Biscuits</p>
              <p>Dry Fruits, Masala & Oil</p>
              <p>Paan Corner</p>
              <p>Pharma & Wellness</p>
              <p>Ice Creams & Frozen Desserts</p>
              <p>Beauty & Cosmetics</p>
              <p>Electronics & Electricals</p>
              <p>Toys & Games</p>
            </div>
            <div className="sec-1 flex flex-col">
              <p>Dairy & Breakfast</p>
              <p>Instant & Frozen Food</p>
              <p>Sweet Tooth</p>
              <p>Sauces & Spreads</p>
              <p>Organic & Premium</p>
              <p>Cleaning Essentials</p>
              <p>Personal Care</p>
              <p>Magazines</p>
              <p>Stationery Needs</p>
              <p>Print Store</p>
            </div>
            <div className="sec-1 flex flex-col">
              <p>Munchies</p>
              <p>Tea, Coffee & Health Drinks</p>
              <p>Atta, Rice & Dal</p>
              <p>Chicken, Meat & Fish</p>
              <p>Baby Care</p>
              <p>Home & Office</p>
              <p>Pet Care</p>
              <p>Fashion & Accessories</p>
              <p>Books</p>
              <p>E-Gift Cards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-text mt-3  p-2 w-screen font-primary">
        DailyDelish is owned & managed by "DailyDelish Commerce Private Limited"
        and is not related, linked or interconnected in whatsoever manner or
        nature, to “GROFFR.COM” which is a real estate services business
        operated by “Redstone Consultancy Services Private Limited”.
      </div>
    </div>
  );
}
