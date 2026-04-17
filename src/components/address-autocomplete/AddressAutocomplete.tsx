"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/cn";
import { buildLocationTagSlug, type StructuredAddress } from "./slug";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type { StructuredAddress };
export { buildLocationTagSlug } from "./slug";

/** Autocomplete prediction shown in the dropdown */
interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface AddressAutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
  /** Google Places API key */
  apiKey: string;
  /** Called when the user selects an address */
  onSelect: (address: StructuredAddress, locationTag: string) => void;
  /** Restrict results to specific country codes (e.g. ["us"]) */
  countryRestrictions?: string[];
  /** Label displayed above the input */
  label?: string;
  /** Error message shown below the input */
  error?: string;
  /** Hint text shown below the input */
  hint?: string;
}

/* -------------------------------------------------------------------------- */
/*  Google Places helpers                                                     */
/* -------------------------------------------------------------------------- */

/**
 * We interact with the Google Maps JS API at runtime. To avoid requiring
 * @types/google.maps as a dependency in the shared UI package, we use
 * `any` for the service references and cast via the `getGoogle()` helper.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
interface GoogleWindow extends Window {
  google?: { maps?: { places?: any } };
}

function getGoogle(): any {
  return (window as unknown as GoogleWindow).google;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

let scriptLoadPromise: Promise<void> | null = null;

function loadGooglePlacesScript(apiKey: string): Promise<void> {
  if (typeof window !== "undefined" && getGoogle()?.maps?.places) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("document is not available"));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error("Failed to load Google Places script"));
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

function extractComponent(
  components: AddressComponent[],
  type: string,
  useShortName = false
): string {
  const match = components.find((c: AddressComponent) =>
    c.types.includes(type)
  );
  return match ? (useShortName ? match.short_name : match.long_name) : "";
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function AddressAutocomplete({
  apiKey,
  onSelect,
  countryRestrictions = ["us"],
  label,
  error,
  hint,
  className,
  id,
  placeholder = "Start typing an address...",
  ...inputProps
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteServiceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const placesServiceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionTokenRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  // Load Google Places script
  useEffect(() => {
    loadGooglePlacesScript(apiKey).then(() => {
      const g = getGoogle();
      autocompleteServiceRef.current =
        new g.maps.places.AutocompleteService();
      // PlacesService needs a div (not rendered) -- attributions target
      const attrDiv = document.createElement("div");
      placesServiceRef.current = new g.maps.places.PlacesService(attrDiv);
      sessionTokenRef.current =
        new g.maps.places.AutocompleteSessionToken();
      setIsLoaded(true);
    });
  }, [apiKey]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch predictions (debounced)
  const fetchPredictions = useCallback(
    (value: string) => {
      if (!autocompleteServiceRef.current || !value.trim()) {
        setPredictions([]);
        return;
      }

      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: countryRestrictions.length
            ? { country: countryRestrictions }
            : undefined,
          types: ["address"],
          sessionToken: sessionTokenRef.current ?? undefined,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (results: any[] | null, status: string) => {
          const g = getGoogle();
          if (
            status === g.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            setPredictions(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              results.map((r: any) => ({
                placeId: r.place_id,
                description: r.description,
                mainText: r.structured_formatting.main_text,
                secondaryText: r.structured_formatting.secondary_text,
              }))
            );
            setIsOpen(true);
          } else {
            setPredictions([]);
          }
        }
      );
    },
    [countryRestrictions]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(value), 300);
  };

  // Resolve a prediction to a full StructuredAddress
  const handleSelectPrediction = useCallback(
    (prediction: Prediction) => {
      if (!placesServiceRef.current) return;

      placesServiceRef.current.getDetails(
        {
          placeId: prediction.placeId,
          fields: [
            "address_components",
            "formatted_address",
            "geometry",
            "place_id",
          ],
          sessionToken: sessionTokenRef.current ?? undefined,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (place: any, status: string) => {
          const g = getGoogle();
          if (
            status !== g.maps.places.PlacesServiceStatus.OK ||
            !place?.address_components
          ) {
            return;
          }

          const components: AddressComponent[] = place.address_components;

          const streetNumber = extractComponent(components, "street_number");
          const route = extractComponent(components, "route");
          const city = extractComponent(components, "locality");
          const state = extractComponent(
            components,
            "administrative_area_level_1",
            true
          );
          const zip = extractComponent(components, "postal_code");
          const county = extractComponent(
            components,
            "administrative_area_level_2"
          );
          const country = extractComponent(components, "country", true);

          const structured: StructuredAddress = {
            street: [streetNumber, route].filter(Boolean).join(" "),
            city,
            state,
            zip,
            county: county || undefined,
            country,
            formattedAddress:
              place.formatted_address || prediction.description,
            placeId: prediction.placeId,
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          };

          const locationTag = buildLocationTagSlug(structured);

          setInputValue(structured.formattedAddress);
          setPredictions([]);
          setIsOpen(false);

          // Reset session token for next interaction
          sessionTokenRef.current =
            new g.maps.places.AutocompleteSessionToken();

          onSelect(structured, locationTag);
        }
      );
    },
    [onSelect]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < predictions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : predictions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < predictions.length) {
          handleSelectPrediction(predictions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  /* ---- Render ---- */

  const inputElement = (
    <div ref={containerRef} className="relative">
      <input
        {...inputProps}
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="address-listbox"
        aria-activedescendant={
          activeIndex >= 0 ? `address-option-${activeIndex}` : undefined
        }
        aria-invalid={!!error}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (predictions.length > 0) setIsOpen(true);
        }}
        placeholder={isLoaded ? placeholder : "Loading..."}
        disabled={!isLoaded || inputProps.disabled}
        className={cn(
          "h-9 w-full rounded-md border bg-white px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
          "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
          "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50)]",
          error &&
            "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
          className
        )}
      />

      {/* Predictions dropdown */}
      {isOpen && predictions.length > 0 && (
        <ul
          id="address-listbox"
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white rounded-lg border border-[var(--neutral-200)] shadow-lg overflow-hidden"
        >
          {predictions.map((prediction, index) => (
            <li
              key={prediction.placeId}
              id={`address-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelectPrediction(prediction)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex flex-col gap-0.5 px-3 py-2 cursor-pointer transition-colors",
                index === activeIndex
                  ? "bg-[var(--brand-primary-light)]"
                  : "hover:bg-[var(--neutral-50)]"
              )}
            >
              <span className="text-sm font-medium text-[var(--neutral-800)] truncate">
                {prediction.mainText}
              </span>
              <span className="text-xs text-[var(--neutral-500)] truncate">
                {prediction.secondaryText}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!label && !error && !hint) return inputElement;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5"
        >
          {label}
        </label>
      )}
      {inputElement}
      {(error || hint) && (
        <p
          className={cn(
            "mt-1.5 text-xs",
            error ? "text-[var(--error)]" : "text-[var(--neutral-500)]"
          )}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}

export { AddressAutocomplete };
