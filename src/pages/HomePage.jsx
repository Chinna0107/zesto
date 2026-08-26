import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { AdBanner } from '../components/AdBanner';
import { useStoreData } from '../store/useStoreData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Truck, Award, Headset, Clock } from 'lucide-react';

import imgHeroBanner from '../assets/hero_banner.png';
import imgHeroBannerPremium from '../assets/hero_banner_premium.jpg';
import imgAarti from '../assets/story_aarti.png';

export function HomePage() {
  const container = useRef(null);
  const bannerScrollRef = useRef(null);
  const { products, categories, loading } = useStoreData();
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      if (bannerScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = bannerScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          bannerScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          bannerScrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  React.useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
    fetch(`${url}/general/banners`)
      .then(r => r.json())
      .then(d => { if (d.banners) setBanners(d.banners); })
      .catch(e => console.error(e));
  }, []);
  
  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: container, dependencies: [loading] });

  return (
    <div ref={container} className="bg-zesto-gradient min-h-screen pb-12 pt-4 md:pt-0">
      <Header variant="home" />
      
      {/* Categories Grid */}
      <div className="animate-section z-30 mb-6 mt-2 max-w-[1100px] mx-auto px-4 md:px-6 w-full relative">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/60 p-4 md:p-6 mt-2">
          <div className="grid grid-cols-5 gap-y-4 md:gap-y-6 gap-x-2 md:gap-x-4">
            {categories.slice(0, 10).map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-2 md:gap-3 group w-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center ring-1 ring-gray-200 p-1 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1 group-hover:ring-brand-orange group-hover:ring-2 group-hover:shadow-md">
                  {cat.image_url ? (
                    <img src={cat.image_url} alt={cat.name} onError={(e) => { e.target.onerror = null; e.target.src = imgHeroBanner; }} className="w-full h-full object-cover relative z-10 rounded-full bg-gray-50" />
                  ) : (
                    <img src={imgHeroBanner} alt="Cat" className="w-full h-full object-cover opacity-20 relative z-10" />
                  )}
                </div>
                <span className="text-[10px] md:text-[13px] font-bold text-gray-600 group-hover:text-brand-orange text-center leading-tight line-clamp-1 transition-colors px-1">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Hero Banner Carousel */}
      <div className="animate-section px-4 md:px-6 mb-8 max-w-[1280px] mx-auto mt-2">
        {banners.length > 0 ? (
          <div ref={bannerScrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2">
            {banners.map((banner) => (
              <div key={banner.id} className="relative w-full shrink-0 snap-center rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-orange-500 h-[180px] sm:h-[260px] md:h-[380px] group shadow-sm flex items-center p-4">
                <div className="flex-1 text-white z-10 h-full flex flex-col justify-center max-w-[60%]">
                  <span className="bg-yellow-300 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-sm w-fit mb-1 uppercase">NEW ARRIVAL</span>
                  <h3 className="text-xl md:text-3xl font-black leading-tight italic uppercase">{banner.title || "GAMING CHAIR NEW LOOK"}</h3>
                  <p className="text-xs opacity-90 mt-1 mb-3">Comfort. Style. Performance.</p>
                  <Link to={banner.link_url || "/category/all"} className="bg-yellow-400 text-gray-900 text-[11px] font-bold px-4 py-1.5 rounded-full w-fit hover:bg-yellow-300 transition-colors shadow-sm">
                    BUY NOW
                  </Link>
                </div>
                <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[120%] z-0">
                  <img src={banner.image_url} alt={banner.title} onError={(e) => { e.target.style.display = 'none'; }} className="w-full h-full object-contain" />
                </div>
                <Link to={banner.link_url || "/category/all"} className="absolute bottom-4 right-4 bg-white text-orange-500 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-sm z-10">
                   Shop Now <span>→</span>
                </Link>
                
                {/* Dots indicator mockup */}
                <div className="absolute top-3 right-4 flex gap-1 z-10">
                   <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-orange-500 h-[180px] sm:h-[260px] md:h-[380px] shadow-sm flex items-center p-4">
            <div className="flex-1 text-white z-10 h-full flex flex-col justify-center max-w-[60%]">
              <span className="bg-yellow-300 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-sm w-fit mb-1 uppercase">NEW ARRIVAL</span>
              <h3 className="text-xl md:text-3xl font-black leading-tight italic uppercase">GAMING CHAIR NEW LOOK ...</h3>
              <p className="text-xs opacity-90 mt-1 mb-3">Comfort. Style. Performance.</p>
              <Link to="/category/all" className="bg-yellow-400 text-gray-900 text-[11px] font-bold px-4 py-1.5 rounded-full w-fit hover:bg-yellow-300 transition-colors shadow-sm">
                BUY NOW
              </Link>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[120%] z-0">
              <img src={imgHeroBannerPremium} alt="Hero Banner" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <Link to="/category/all" className="absolute bottom-4 right-4 bg-white text-orange-500 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-sm z-10">
               Shop Now <span>→</span>
            </Link>
            
            <div className="absolute top-3 right-4 flex gap-1 z-10">
               <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6">
        
        {/* Unified Transparent Block */}
        <div className="animate-section mb-12 flex flex-col gap-8 md:gap-10">
          
          {/* Deals of the Day Section */}
          {products.filter(p => p.is_offer).length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden pt-4 md:pt-6 pb-2 md:pb-4 px-4 md:px-6">
               <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-100 mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-4">
                     <h3 className="text-[13px] md:text-lg font-extrabold text-gray-900 tracking-wider">DEALS OF THE DAY</h3>
                     <div className="flex items-center gap-1 bg-red-50 text-red-500 text-[9px] md:text-xs font-semibold px-2 py-0.5 md:px-2 md:py-1 rounded-md border border-red-100">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>12h 44m 00s</span>
                     </div>
                  </div>
                  <Link to="/collection/top-picks" className="text-gray-900 font-bold text-[11px] md:text-sm hover:text-brand-blue flex items-center gap-1 transition-colors">
                    SEE ALL <span className="text-base md:text-lg leading-none">›</span>
                  </Link>
               </div>
               
               <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x">
                 {products.filter(p => p.is_offer).map(product => (
                   <div key={product.id} className="w-[140px] md:w-[220px] shrink-0 snap-start hover:-translate-y-1 transition-transform duration-300 h-full">
                     <ProductCard product={product} />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Features Block - Moved down and enhanced for desktop */}
          <div className="bg-white px-4 py-6 md:px-10 md:py-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/80 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
             <div className="flex justify-between items-center overflow-x-auto hide-scrollbar gap-6 md:gap-10 snap-x">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-3 shrink-0 px-2 snap-start group cursor-pointer w-[140px] md:w-auto">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50/50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                     <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-brand-blue group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-gray-900 font-extrabold text-[12px] md:text-base leading-tight group-hover:text-brand-blue transition-colors">Secure<br className="md:hidden"/> <span className="hidden md:inline"></span>Payments</h4>
                     <p className="text-gray-500 text-[10px] md:text-sm font-medium mt-0.5">100% safe</p>
                   </div>
                </div>
                <div className="w-[1px] h-10 md:h-16 bg-gray-100 shrink-0 hidden md:block"></div>
                
                {/* Feature 2 */}
                <div className="flex items-center gap-3 shrink-0 px-2 snap-start group cursor-pointer w-[140px] md:w-auto">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-50/50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                     <Truck className="w-6 h-6 md:w-8 md:h-8 text-brand-orange group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-gray-900 font-extrabold text-[12px] md:text-base leading-tight group-hover:text-brand-orange transition-colors">Fast<br className="md:hidden"/> <span className="hidden md:inline"></span>Delivery</h4>
                     <p className="text-gray-500 text-[10px] md:text-sm font-medium mt-0.5">On-time</p>
                   </div>
                </div>
                <div className="w-[1px] h-10 md:h-16 bg-gray-100 shrink-0 hidden md:block"></div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3 shrink-0 px-2 snap-start group cursor-pointer w-[140px] md:w-auto">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50/50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                     <Award className="w-6 h-6 md:w-8 md:h-8 text-brand-blue group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-gray-900 font-extrabold text-[12px] md:text-base leading-tight group-hover:text-brand-blue transition-colors">Best<br className="md:hidden"/> <span className="hidden md:inline"></span>Quality</h4>
                     <p className="text-gray-500 text-[10px] md:text-sm font-medium mt-0.5">Top products</p>
                   </div>
                </div>
                <div className="w-[1px] h-10 md:h-16 bg-gray-100 shrink-0 hidden md:block"></div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3 shrink-0 px-2 snap-start group cursor-pointer w-[140px] md:w-auto">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-50/50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                     <Headset className="w-6 h-6 md:w-8 md:h-8 text-brand-orange group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-gray-900 font-extrabold text-[12px] md:text-base leading-tight group-hover:text-brand-orange transition-colors">24/7<br className="md:hidden"/> <span className="hidden md:inline"></span>Support</h4>
                     <p className="text-gray-500 text-[10px] md:text-sm font-medium mt-0.5">We're here</p>
                   </div>
                </div>
                
             </div>
          </div>

          {/* Best Sellers */}
          {products.filter(p => p.is_bestseller).length > 0 && (
            <div>
              <div className="flex justify-between items-center px-4 py-4 mb-4 border-b border-gray-100 bg-white rounded-t-2xl shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Best Selling</h3>
                <Link to="/collection/best-sellers" className="text-brand-blue hover:text-blue-700 text-sm md:text-base font-semibold flex items-center gap-2 transition-colors">View All →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {products.filter(p => p.is_bestseller).slice(0, 6).map(product => (
                  <div key={product.id} className="hover:-translate-y-2 transition-transform duration-300 h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Middle Advertisement Block */}
          <div className="rounded-[1.5rem] overflow-hidden bg-white shadow-sm border border-gray-100">
            <AdBanner 
              imageUrl={imgAarti} 
              altText="Middle Ad" 
              link="/category/all" 
            />
          </div>

          {/* Trending */}
          {products.filter(p => p.is_trending).length > 0 && (
            <div>
              <div className="flex justify-between items-center px-2 py-4 mb-4 border-b border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Trending Now</h3>
                <Link to="/collection/trending" className="text-brand-blue hover:text-blue-700 text-sm md:text-base font-semibold flex items-center gap-2 transition-colors">View All →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {products.filter(p => p.is_trending).slice(0, 6).map(product => (
                  <div key={product.id} className="hover:-translate-y-2 transition-transform duration-300 h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories horizontally scrolling products */}
          {categories.map((cat) => {
            const catProducts = products.filter(p => p.category === cat.name);
            if (catProducts.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className="flex justify-between items-center px-2 py-4 mb-4 border-b border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{cat.name}</h3>
                  <Link to={`/category/${cat.id}`} className="text-brand-blue hover:text-blue-700 text-sm md:text-base font-semibold flex items-center gap-2 transition-colors">View All →</Link>
                </div>
                <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x">
                  {catProducts.slice(0, 8).map(product => (
                    <div key={product.id} className="w-[160px] md:w-[220px] shrink-0 snap-start hover:-translate-y-2 transition-transform duration-300 h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          

        </div>
      </div>

    </div>
  );
}
