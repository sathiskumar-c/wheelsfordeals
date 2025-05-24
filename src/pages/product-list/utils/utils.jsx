// Utility function to throttle scroll handler
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Bike sorting function
export const getSortedBikes = (bikes, sortKey) => {
  const sortedBikes = [...bikes];

  switch (sortKey) {
    case "recently_posted":
      sortedBikes.sort((a, b) => {
        const dateA = new Date(a.posted_date || 0); // Default to epoch if date is missing
        const dateB = new Date(b.posted_date || 0);
        return dateB.getTime() - dateA.getTime(); // Use getTime() for numerical comparison
      });
      break;

    case "price_low_to_high":
      sortedBikes.sort((a, b) => {
        // Handle cases where price or its properties might be missing
        const aOriginalPrice = a.price?.original_price ?? Infinity;
        const aDiscountPercent = a.price?.discount_percent ?? 0;
        const bOriginalPrice = b.price?.original_price ?? Infinity;
        const bDiscountPercent = b.price?.discount_percent ?? 0;

        const aFinal = aOriginalPrice * (1 - aDiscountPercent / 100);
        const bFinal = bOriginalPrice * (1 - bDiscountPercent / 100);
        return aFinal - bFinal;
      });
      break;

    case "price_high_to_low":
      sortedBikes.sort((a, b) => {
        // Handle cases where price or its properties might be missing
        const aOriginalPrice = a.price?.original_price ?? -Infinity;
        const aDiscountPercent = a.price?.discount_percent ?? 0;
        const bOriginalPrice = b.price?.original_price ?? -Infinity;
        const bDiscountPercent = b.price?.discount_percent ?? 0;

        const aFinal = aOriginalPrice * (1 - aDiscountPercent / 100);
        const bFinal = bOriginalPrice * (1 - bDiscountPercent / 100);
        return bFinal - aFinal;
      });
      break;

    case "kms_driven_low_to_high":
      sortedBikes.sort((a, b) => {
        // Use nullish coalescing operator (??) to handle undefined or null km_driven
        const kmA = a.km_driven ?? Infinity; // If km_driven is missing, treat as very high for low-to-high sort
        const kmB = b.km_driven ?? Infinity;
        return kmA - kmB;
      });
      break;

    case "kms_driven_high_to_low":
      sortedBikes.sort((a, b) => {
        // Use nullish coalescing operator (??) to handle undefined or null km_driven
        const kmA = a.km_driven ?? -Infinity; // If km_driven is missing, treat as very low for high-to-low sort
        const kmB = b.km_driven ?? -Infinity;
        return kmB - kmA;
      });
      break;

    case "mileage_low_to_high":
      sortedBikes.sort((a, b) => {
        // Use optional chaining (?.) and nullish coalescing (??) to handle missing nested properties
        const mileageA = a.engine_and_performance?.mileage_kmpl ?? Infinity;
        const mileageB = b.engine_and_performance?.mileage_kmpl ?? Infinity;
        return mileageA - mileageB;
      });
      break;

    case "mileage_high_to_low":
      sortedBikes.sort((a, b) => {
        // Use optional chaining (?.) and nullish coalescing (??) to handle missing nested properties
        const mileageA = a.engine_and_performance?.mileage_kmpl ?? -Infinity;
        const mileageB = b.engine_and_performance?.mileage_kmpl ?? -Infinity;
        return mileageB - mileageA;
      });
      break;

    case "year_new_to_old":
      sortedBikes.sort((a, b) => {
        const yearA = a.year_of_model ?? 0; // Default to 0 or a sensible minimum
        const yearB = b.year_of_model ?? 0;
        return yearB - yearA;
      });
      break;

    case "year_old_to_new":
      sortedBikes.sort((a, b) => {
        const yearA = a.year_of_model ?? Infinity; // Default to Infinity for old-to-new sort
        const yearB = b.year_of_model ?? Infinity;
        return yearA - yearB;
      });
      break;

    case "engine_high_to_low":
      sortedBikes.sort((a, b) => {
        // Use optional chaining (?.) and nullish coalescing (??) to handle missing nested properties
        const engineA = a.engine_and_performance?.engine_cc ?? -Infinity;
        const engineB = b.engine_and_performance?.engine_cc ?? -Infinity;
        return engineB - engineA;
      });
      break;

    case "engine_low_to_high":
      sortedBikes.sort((a, b) => {
        // Use optional chaining (?.) and nullish coalescing (??) to handle missing nested properties
        const engineA = a.engine_and_performance?.engine_cc ?? Infinity;
        const engineB = b.engine_and_performance?.engine_cc ?? Infinity;
        return engineA - engineB;
      });
      break;

    case "brand_a_to_z":
      sortedBikes.sort((a, b) => {
        const brandA = a.brand || ""; // Default to empty string if brand is missing
        const brandB = b.brand || "";
        return brandA.localeCompare(brandB);
      });
      break;

    default:
      // If sortKey is not recognized, return the unsorted copy
      break;
  }

  return sortedBikes;
};

// Scroll to top
export const scrollToTop = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  const timeoutId = setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
  return () => clearTimeout(timeoutId);
};
