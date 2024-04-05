 export function formatViewCount(viewCount) {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + 'M';
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + 'k';
    } else {
      return viewCount;
    }
  }