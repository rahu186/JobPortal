import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header rounded-full"></div>
      <div className="skeleton-body rounded-full">
        <div className="skeleton-title rounded-full"></div>
        <div className="skeleton-location rounded-full"></div>
        <div className="skeleton-footer rounded-full"></div>
      </div>
    </div>
  )
}

export default SkeletonCard;