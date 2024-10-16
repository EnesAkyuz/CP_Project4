// client/src/utilities/validation.js

export const validateIncompatibleOptions = (selectedOptions, isConvertible) => {
    const { roof_id } = selectedOptions;
  
    // Fetch roof options to determine incompatibility
    // This requires options data; alternatively, define incompatible combinations here
    // For simplicity, let's assume certain roof options are incompatible
  
    // Example: Suppose roof_id 2 is incompatible with convertibles
    if (isConvertible && roof_id === 2) {
      return 'Selected roof is not compatible with a convertible.';
    }
  
    // Example: Suppose roof_id 3 is only for convertibles
    if (!isConvertible && roof_id === 3) {
      return 'Selected roof is only available for convertibles.';
    }
  
    return null; // No validation errors
  };
  