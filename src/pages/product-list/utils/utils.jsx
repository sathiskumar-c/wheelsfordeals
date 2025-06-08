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

export function parseFiltersFromParams(params) {
  const filters = {};

  for (const key of params.keys()) {
    const values = params.getAll(key);
    filters[key] = values;
  }

  return filters;
}

export function buildParamsFromFilters(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => {
        params.append(key, item);
      });
    }
  });

  // return params;
  return params.toString();
}

export function filterBikes(bikes, filters) {
  return bikes.filter((bike) => {
    const brandSlug = bike.slug?.brand?.toLowerCase() || "";
    const fuelSlug =
      bike.engine_and_performance?.fuel_type?.toLowerCase() || "";
    const transmissionSlug =
      bike.engine_and_performance?.transmission_type?.toLowerCase() || "";
    const mileageSlug = Number(bike.engine_and_performance?.mileage_kmpl || 0);
    const engineCCSlug = Number(bike.engine_and_performance?.engine_cc || 0);
    const kmsDrivenSlug = Number(bike.km_driven || 0);
    const colorSlug = bike.color?.toLowerCase() || "";
    const bodyTypeSlug = bike.body_type?.toLowerCase() || "";
    const ownerCountSlug = bike.owner_count?.toLowerCase() || "";
    const sellerTypeSlug = bike.seller_type?.toLowerCase() || "";
    const accidentHistorySlug =
      bike.documents?.accident_history === true ? "Yes" : "No";
    const rcAvailableSlug =
      bike.documents?.rc_available === true ? "Yes" : "No";
    const testRideAvailableSlug =
      bike.test_ride?.availability === true ? "Yes" : "No";
    const exchangeAvailableSlug =
      bike.exchange?.availability === true ? "Yes" : "No";
    const serviceHistorySlug =
      bike.documents?.service_history === true
        ? "Full Service History"
        : "No Service History";
    const insuranceValiditySlug = Number(bike.insurance?.validity_months || 0);
    const originalPriceSlug = bike.price?.original_price ?? 0;
    const yearOfModelSlug = Number(bike.year_of_model || 0);

    // Filter by Mileage
    if (filters.mileage?.length === 2) {
      const [minMileage, maxMileage] = filters.mileage.map(Number);
      if (mileageSlug < minMileage || mileageSlug > maxMileage) return false;
    }

    // Filter by Year of Model
    if (filters.year?.length === 2) {
      const [minYear, maxYear] = filters.year.map(Number);
      if (yearOfModelSlug < minYear || yearOfModelSlug > maxYear) return false;
    }

    // Filter by Kilometers Driven
    if (filters.kmsDriven?.length === 2) {
      const [minKm, maxKm] = filters.kmsDriven.map(Number);
      if (kmsDrivenSlug < minKm || kmsDrivenSlug > maxKm) return false;
    }

    // Filter by Engine CC
    if (filters.engineCC?.length === 2) {
      const [minCC, maxCC] = filters.engineCC.map(Number);
      if (engineCCSlug < minCC || engineCCSlug > maxCC) return false;
    }

    // Filter by Insurance Validity (months)
    if (filters.insuranceValidity?.length === 2) {
      const [minMonths, maxMonths] = filters.insuranceValidity.map(Number);
      if (
        insuranceValiditySlug < minMonths ||
        insuranceValiditySlug > maxMonths
      )
        return false;
    }

    // Filter by Price
    if (filters.budget?.length === 2) {
      const [minBudget, maxBudget] = filters.budget.map(Number);
      if (originalPriceSlug < minBudget || originalPriceSlug > maxBudget)
        return false;
    }

    // Filter by Body Type
    if (filters.bodyType?.length) {
      const bodyTypeMatches = filters.bodyType.map((bt) => bt.toLowerCase());
      if (!bodyTypeMatches.includes(bodyTypeSlug)) return false;
    }

    // Filter by Owner Count
    if (filters.ownerCount?.length) {
      if (!filters.ownerCount.includes(ownerCountSlug)) return false;
    }

    // Filter by Accident History
    if (filters.accidentHistory?.length) {
      if (!filters.accidentHistory.includes(accidentHistorySlug)) return false;
    }

    // Filter by Test Ride Available
    if (filters.testRideAvailable?.length) {
      if (!filters.testRideAvailable.includes(testRideAvailableSlug))
        return false;
    }

    // Filter by RC Available
    if (filters.rcAvailable?.length) {
      if (!filters.rcAvailable.includes(rcAvailableSlug)) return false;
    }

    // Filter by Exchange Available
    if (filters.exchangeAvailable?.length) {
      if (!filters.exchangeAvailable.includes(exchangeAvailableSlug))
        return false;
    }

    // Filter by Color
    if (filters.color?.length) {
      const colorMatches = filters.color.map((c) => c.toLowerCase());
      if (!colorMatches.includes(colorSlug)) return false;
    }

    // Filter by Brake Type (check both front and rear)
    if (filters.brakeType?.length) {
      const frontBrake = bike.brakes?.brake_type?.front || "";
      const rearBrake = bike.brakes?.brake_type?.rear || "";
      const hasABS = bike.brakes?.abs === true;

      const match = filters.brakeType.some((bt) => {
        if (bt === "ABS") return hasABS;
        return (
          frontBrake.toLowerCase() === bt.toLowerCase() ||
          rearBrake.toLowerCase() === bt.toLowerCase()
        );
      });

      if (!match) return false;
    }

    // Filter by Service History
    if (filters.serviceHistory?.length) {
      if (!filters.serviceHistory.includes(serviceHistorySlug)) return false;
    }

    // Filter by Seller Type
    if (filters.sellerType?.length) {
      const sellerTypeMatches = filters.sellerType.map((c) => c.toLowerCase());
      if (!sellerTypeMatches.includes(sellerTypeSlug)) return false;
    }

    // Filter by brand
    if (filters.brands?.length && !filters.brands.includes(brandSlug))
      return false;

    // Filter by fuel type
    if (filters.fuelType?.length) {
      const fuelMatches = filters.fuelType.map((val) => val.toLowerCase());
      if (!fuelMatches.includes(fuelSlug)) return false;
    }

    // Filter by transmission type
    if (filters.transmissionType?.length) {
      const transmissionMatches = filters.transmissionType.map((val) =>
        val.toLowerCase()
      );
      if (!transmissionMatches.includes(transmissionSlug)) return false;
    }

    return true;
  });
}

export function parseFiltersFromPath(pathname) {
  const filters = {};
  const segments = pathname.split("/").filter(Boolean);

  // Start from index 1 to skip 'bikes'
  for (let i = 2; i < segments.length; i += 2) {
    const key = segments[i - 1];
    const raw = segments[i];
    if (raw) {
      const values = raw.split(",").filter((v) => v.trim() !== "");
      if (values.length > 0) {
        filters[key] = values;
      }
    }
  }

  return filters;
}

export function buildPathFromFilters(filters) {
  let path = "/bikes";

  Object.entries(filters).forEach(([key, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      path += `/${key}/${values.join(",")}`;
    }
  });

  return path;
}

export const updateChips = (
  mode,
  data,
  ProductFiltersJSON,
  chips,
  setChips
) => {
  if (mode === "clear") {
    setChips([]);
    return;
  }

  let updatedChips = [...chips];

  if (mode === "add") {
    const selectedKeys = Object.keys(data);

    const newChips = ProductFiltersJSON.filter(
      (item) => selectedKeys.includes(item.id) && data[item.id]?.length > 0
    );

    newChips.forEach((item) => {
      let label = item.label;

      // 👇 Dynamic label for range filters
      if (item.type === "range") {
        const [min, max] = data[item.id];
        switch (item.unit) {
          case "price":
            label = `${
              item.label
            }: ₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
            break;
          case "cc":
            label = `${item.label}: ${min}cc – ${max}cc`;
            break;
          case "km":
            label = `${
              item.label
            }: ${min.toLocaleString()}km – ${max.toLocaleString()}km`;
            break;
          case "year":
            label = `${item.label}: ${min} – ${max}`;
            break;
          case "months":
            label = `${item.label}: ${min} – ${max} months`;
            break;
          default:
            label = `${item.label}: ${min} – ${max}`;
        }
      }

      // 👉👉 Add this line **here** to remove existing chip of same filter
      updatedChips = updatedChips.filter((chip) => chip.id !== item.id);

      // ✅ Now add the new chip
      updatedChips.push({ id: item.id, label });
    });

    // Optional: Clean out any chip for filter that is now empty
    updatedChips = updatedChips.filter(
      (chip) => data[chip.id] && data[chip.id].length > 0
    );
  }

  if (mode === "remove") {
    updatedChips = updatedChips.filter((chip) => chip.id !== data.id);
  }

  setChips(updatedChips);
};
