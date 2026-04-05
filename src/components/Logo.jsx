export default function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { icon: 32, text: 'text-xl' },
    md: { icon: 48, text: 'text-3xl' },
    lg: { icon: 64, text: 'text-5xl' },
    xl: { icon: 80, text: 'text-7xl' }
  }

  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <svg width={icon} height={icon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Camera body */}
        <rect x="15" y="30" width="70" height="50" rx="8" fill="#DC2626"/>
        
        {/* Lens */}
        <circle cx="50" cy="55" r="18" fill="#1F2937"/>
        <circle cx="50" cy="55" r="12" fill="#374151"/>
        <circle cx="50" cy="55" r="6" fill="#6B7280"/>
        
        {/* Flash */}
        <rect x="70" y="35" width="8" height="8" rx="2" fill="#FEF08A"/>
        
        {/* Viewfinder */}
        <rect x="25" y="35" width="12" height="8" rx="2" fill="#374151"/>
        
        {/* Film strip accent */}
        <rect x="10" y="25" width="4" height="60" fill="#DC2626"/>
        <rect x="86" y="25" width="4" height="60" fill="#DC2626"/>
        <rect x="10" y="25" width="4" height="8" fill="#991B1B"/>
        <rect x="10" y="42" width="4" height="8" fill="#991B1B"/>
        <rect x="10" y="59" width="4" height="8" fill="#991B1B"/>
        <rect x="10" y="77" width="4" height="8" fill="#991B1B"/>
        <rect x="86" y="25" width="4" height="8" fill="#991B1B"/>
        <rect x="86" y="42" width="4" height="8" fill="#991B1B"/>
        <rect x="86" y="59" width="4" height="8" fill="#991B1B"/>
        <rect x="86" y="77" width="4" height="8" fill="#991B1B"/>
      </svg>
      
      {showText && (
        <span className={`${text} font-black tracking-tight text-gray-900`}>
          PIXORA
        </span>
      )}
    </div>
  )
}
