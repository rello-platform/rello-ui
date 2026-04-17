/**
 * Badge barrel (client-bundle surface).
 *
 * Exports the component + prop types only. The pure CVA variant
 * (`badgeVariants`) and its derived `BadgeVariant` value-free type
 * live at `./variants` and are re-exported from the server-safe root
 * entry `@rello-platform/ui`. Keeping the CVA out of the `/client`
 * surface prevents the server-import foot-gun the Option-D split
 * fixed. The `BadgeVariant` type is re-exported here too (types are
 * type-erased, free to live on both entries).
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export { Badge, type BadgeProps } from "./Badge";
export type { BadgeVariant } from "./variants";
