import { useState, useEffect, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Compass, ExternalLink, Navigation, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data';
import { LocationBranch } from '../types';

interface LocationsViewProps {
  selectedBranchSlug?: string;
  setSelectedBranchSlug?: (slug: string) => void;
}

export default function LocationsView({ selectedBranchSlug, setSelectedBranchSlug }: LocationsViewProps) {
  // Use first branch by default or matching slug
  const [activeBranch, setActiveBranch] = useState<LocationBranch>(BRANCHES[0]);
  
  // Directions simulation state
  const [startPoint, setStartPoint] = useState<string>('');
  const [isCalculatingRoute, setIsCalculatingRoute] = useState<boolean>(false);
  const [routeResult, setRouteResult] = useState<{
    distance: string;
    duration: string;
    directions: string[];
  } | null>(null);

  useEffect(() => {
    if (selectedBranchSlug) {
      const match = BRANCHES.find(b => b.slug === selectedBranchSlug);
      if (match) {
        setActiveBranch(match);
      }
    }
  }, [selectedBranchSlug]);

  const handleBranchSelect = (branch: LocationBranch) => {
    setActiveBranch(branch);
    if (setSelectedBranchSlug) {
      setSelectedBranchSlug(branch.slug);
    }
    // Reset route estimation when switching branches
    setStartPoint('');
    setRouteResult(null);
  };

  // Pre-configured simulation values
  const simulatedTransitHubs: Record<string, Record<string, { distance: string; duration: string; steps: string[] }>> = {
    'kaichoondi': {
      'alappuzha-beach': {
        distance: '4.8 km',
        duration: '12 mins',
        steps: ['Head East on Beach Road toward NH 66', 'Turn left onto National Highway Bypass', 'At Kaichoondi Junction, take the 2nd exit', 'PuKa Teashop is on your left, next to the coconut grove.']
      },
      'alappuzha-railway': {
        distance: '3.5 km',
        duration: '10 mins',
        steps: ['Head West on Station Road', 'Take NH Bypass North bound', 'Pass by District General Hospital', 'Arrive at Kaichoondi Junction. PuKa is on your right.']
      }
    },
    'punnapra': {
      'alappuzha-town': {
        distance: '7.5 km',
        duration: '16 mins',
        steps: ['Head South on NH 66 from town center', 'Drive straight past SD College', 'Look for Carmel Engineering College signboard', 'PuKa is 100 meters ahead on the right-hand side.']
      },
      'punnapra-railway': {
        distance: '2.1 km',
        duration: '6 mins',
        steps: ['Head West toward NH 66', 'Turn right (North) onto NH 66', 'Drive for 1.2 km', 'U-turn at Carmel crossroad. PuKa is on your left next to the storefront.']
      }
    },
    'srm-chennai': {
      'potheri-station': {
        distance: '0.4 km',
        duration: '2 mins walk',
        steps: ['Exit Potheri Railway Station West side', 'Walk along SRM Main Gate Road', 'Turn right before the main campus security check gate', 'PuKa SRM Branch is right beside the tea stalls.']
      },
      'tambaram': {
        distance: '18.4 km',
        duration: '32 mins',
        steps: ['Join Grand Southern Trunk Rd (GST Rd / NH 45) Southbound', 'Drive past Vandalur Zoo and Guduvanchery', 'Take the slip road toward Potheri / SRM University', 'Turn left into SRM Main Road. PuKa will be on your left.']
      }
    }
  };

  const handleCalculateRoute = (e: FormEvent) => {
    e.preventDefault();
    if (!startPoint) return;

    setIsCalculatingRoute(true);
    setTimeout(() => {
      setIsCalculatingRoute(false);
      const data = simulatedTransitHubs[activeBranch.slug]?.[startPoint];
      if (data) {
        setRouteResult({
          distance: data.distance,
          duration: data.duration,
          directions: data.steps
        });
      } else {
        // Generative fallback
        setRouteResult({
          distance: '5.2 km',
          duration: '14 mins',
          directions: [
            `Depart from your location toward ${activeBranch.name}`,
            'Proceed onto the nearest major main road bypass',
            'Follow signage directions guiding toward local branch coordinates',
            `Welcome to ${activeBranch.name}! Your hot cup of Chaya is waiting.`
          ]
        });
      }
    }, 1000);
  };

  return (
    <div id="locations-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="Visit Our Branches, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Our Footprint
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            Visit Our Branches
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            From the beautiful coastal horizons of Alappuzha to the vibrant university campus of SRM Chennai, we are serving warmth daily.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Grid of Locations Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Branch selector and detail cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider px-2 pt-1 block text-left">
              Select Branch
            </span>
            <div className="space-y-1.5">
              {BRANCHES.map((branch) => {
                const isActive = activeBranch.id === branch.id;
                return (
                  <button
                    key={branch.id}
                    id={`branch-tab-${branch.slug}`}
                    onClick={() => handleBranchSelect(branch)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group focus:outline-none ${
                      isActive
                        ? 'bg-puka-black border-puka-gold text-white shadow-md'
                        : 'bg-puka-bg border-gray-100 hover:border-puka-gold/50 text-puka-black hover:bg-white'
                    }`}
                  >
                    <div>
                      <h3 className={`font-display font-bold text-sm tracking-wide ${isActive ? 'text-puka-gold' : 'text-puka-black'}`}>
                        {branch.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {branch.city}
                      </p>
                    </div>
                    <MapPin className={`w-4 h-4 ${isActive ? 'text-puka-gold' : 'text-gray-400 group-hover:text-puka-gold'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Branch Detailed Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md space-y-6 text-left">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={activeBranch.image}
                alt={activeBranch.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <span className="text-puka-accent font-heading text-lg italic">{activeBranch.city}</span>
              <h2 className="text-2xl font-display font-bold text-puka-black">
                {activeBranch.name}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-gray-600 border-t border-gray-100 pt-5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed text-xs sm:text-sm">{activeBranch.address}</p>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-gray-400">RESERVATIONS & ORDERS</p>
                  <a href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`} className="font-bold hover:text-puka-accent transition-colors">
                    {activeBranch.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-gray-400">DIRECT ENQUIRIES</p>
                  <a href={`mailto:${activeBranch.email}`} className="hover:text-puka-accent transition-colors">
                    {activeBranch.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-gray-400">OPERATING TIMINGS</p>
                  <p className="font-semibold text-puka-brown text-xs sm:text-sm">{activeBranch.timings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Map + Destination route calculator */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Real Embedded Iframe Google Map */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-md h-[400px] overflow-hidden relative">
            <iframe
              title={`${activeBranch.name} MapLocation`}
              src={activeBranch.mapUrl}
              className="w-full h-full rounded-2xl border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Simulated Travel Route Estimator */}
          <div className="bg-puka-black text-white p-6 sm:p-8 rounded-3xl border border-puka-gold/20 shadow-lg space-y-6">
            <div className="flex items-center space-x-3 border-b border-puka-gold/20 pb-4">
              <div className="p-2 rounded-xl bg-puka-gold/10 text-puka-gold">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-white">Route Estimation</h3>
                <p className="text-gray-400 text-xs">Estimate your travel minutes and directions to the cafe.</p>
              </div>
            </div>

            <form onSubmit={handleCalculateRoute} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
                  Select Starting Point:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    id="calc-start-point"
                    value={startPoint}
                    onChange={(e) => { setStartPoint(e.target.value); setRouteResult(null); }}
                    className="flex-grow bg-puka-bg/10 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold"
                  >
                    <option value="" className="text-puka-black">-- Choose Starting Transit Hub --</option>
                    {activeBranch.slug === 'kaichoondi' && (
                      <>
                        <option value="alappuzha-beach" className="text-puka-black">Alappuzha Beach</option>
                        <option value="alappuzha-railway" className="text-puka-black">Alappuzha Railway Station</option>
                      </>
                    )}
                    {activeBranch.slug === 'punnapra' && (
                      <>
                        <option value="alappuzha-town" className="text-puka-black">Alappuzha Town Center (KSRTC Stand)</option>
                        <option value="punnapra-railway" className="text-puka-black">Punnapra Local Station</option>
                      </>
                    )}
                    {activeBranch.slug === 'srm-chennai' && (
                      <>
                        <option value="potheri-station" className="text-puka-black">Potheri Railway Station (Walkable)</option>
                        <option value="tambaram" className="text-puka-black">Tambaram Junction (Chennai Bypass)</option>
                      </>
                    )}
                    <option value="current-location" className="text-puka-black">My Current Location (Custom Estimation)</option>
                  </select>
                  <button
                    type="submit"
                    id="btn-calc-route"
                    disabled={!startPoint || isCalculatingRoute}
                    className="bg-puka-gold hover:bg-puka-gold-light text-puka-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 shrink-0"
                  >
                    {isCalculatingRoute ? 'Planning...' : 'Get Directions'}
                  </button>
                </div>
              </div>
            </form>

            {/* Calculations results */}
            {routeResult && (
              <div id="route-result-container" className="bg-white/5 border border-puka-gold/25 rounded-2xl p-5 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-puka-gold uppercase font-bold">Estimated Route specs</span>
                  <div className="flex space-x-4 text-xs font-mono font-bold">
                    <span>Dist: <em className="text-puka-gold not-italic">{routeResult.distance}</em></span>
                    <span>Duration: <em className="text-puka-gold-light not-italic">{routeResult.duration}</em></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Turn-by-Turn Guide:</p>
                  <ol className="space-y-2.5 text-xs text-gray-300">
                    {routeResult.directions.map((step, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded bg-puka-gold/15 text-puka-gold font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-puka-gold/10 p-3.5 rounded-xl border border-puka-gold/20 text-[10px] sm:text-xs text-puka-gold-light flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Showing routes based on real local landmarks. Show this guide to your travel driver.</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
