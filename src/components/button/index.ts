/**
 * Button barrel (client-bundle surface).
 *
 * Exports the component + its prop type only. The pure CVA variant
 * (`buttonVariants`) lives at `./variants` and is re-exported from
 * the server-safe root entry `@rello-platform/ui`. Keeping the CVA
 * out of the `/client` surface prevents the server-import foot-gun
 * the Option-D split fixed.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export { Button, type ButtonProps } from "./Button";
