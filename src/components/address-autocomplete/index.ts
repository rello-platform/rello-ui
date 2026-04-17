/**
 * Address autocomplete barrel (client-bundle surface).
 *
 * Exports the component + its prop types. The pure slug helper
 * (`buildLocationTagSlug`) and its associated `StructuredAddress` type
 * live at `./slug` and are re-exported from the server-safe root
 * entry `src/index.ts`. Keeping the helper out of the `/client`
 * surface prevents the server-import foot-gun the Option-D split
 * fixed.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export {
  AddressAutocomplete,
  type AddressAutocompleteProps,
} from "./AddressAutocomplete";

export type { StructuredAddress } from "./slug";
