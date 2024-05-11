import global from "@selldone/core-js/lang/global/ky";
import icons from "@selldone/core-js/lang/global/icons/ltr";
import community from "@selldone/core-js/lang/global/community/ky";
import pack from "@selldone/core-js/lang/shop/ky";

export default {
  /** ---------------- Icons ---------------- **/
  icons: icons,

  /** ---------------- Global ---------------- **/
  global: global,

  /** ---------------- Community ---------------- **/
  community: community,

  /** ---------------- Main Package ---------------- **/
  ...pack,
};
