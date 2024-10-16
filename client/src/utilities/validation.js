// client/src/utilities/validation.js

export const validateIncompatibleOptions = async (selectedOptions, isConvertible) => {
  const { roof_id } = selectedOptions;

  try {
    // Fetch the roof option details from the API
    const response = await fetch(`/api/options/roof/${roof_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch roof option details');
    }
    const roofOption = await response.json();

    // Check compatibility based on the roof option properties
    if (isConvertible && roofOption.is_non_convertible_only) {
      return 'Selected roof is not compatible with a convertible.';
    }
    if (!isConvertible && roofOption.is_convertible_only) {
      return 'Selected roof is only available for convertibles.';
    }

    return null; // No validation errors
  } catch (error) {
    console.error('Error validating options:', error);
    return 'Error validating options.';
  }
};
