<!--
  - Copyright (c) 2023. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<!--
  🍉 This view will be shown in the HTML ▶ BODY ▶ <div id="app">.

  Banner
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃ Campaign Banner            ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  Main Content
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃ router-view                ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  Absolute/Fixed widgets
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃ Private / Restricted Shop  ┃
  ┃ Social links (Floating)    ┃
  ┃ Payment                    ┃
  ┃ Products Comparison        ┃
  ┃ Need Login                 ┃
  ┃ ...                        ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

-->
<template>
  <div id="banners-placeholder"></div>
  <v-app
    v-if="shop"
    :class="[
      {
        'is-mobile': isMobile,
        'before-load-icon-font': !IconFontsLoaded,
        blurred: blur,
      },
    ]"
    :style="[
      {
        /* Global theme variable of the storefront */
        '--theme-dark': SaminColorDark,
        '--theme-light': SaminColorLight,
        '--theme-deep-dark': SaminColorDarkDeep,
        '--theme-info': SaminInfoColor,
        '--theme-btn-color': color_buy_button,

        '--background': page_background_color,
      },
      page_bg,
    ]"
    class="s--shop blur-animate"
    @keyup.ctrl="SwitchLanguage"
  >
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Campaign banner ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <Teleport to="#banners-placeholder">
      <s-campaign-banner :shop="shop" />
    </Teleport>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Main router view ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <router-view v-if="!is_private || customer_has_access" :shop="shop" />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Private / Restricted Shop ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-access-private-check
      v-else
      :shop="shop"
    ></s-access-private-check>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Social links (Floating) ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-social-buttons
      v-if="shop"
      :shop="shop"
      active-only
      class="social-stick"
      vertical
    ></s-storefront-social-buttons>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Payment ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-master-payment-dialog v-if="shop" :shop="shop" />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Products Comparison ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-comparison-button v-if="has_comparison" />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Need Login ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-need-login-dialog />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Notifications (Small bottom-Right) ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <u-notification-side />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Application Shop Login ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-application-login
      :shop="shop"
    ></s-storefront-application-login>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Select Address ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <u-map-dialog></u-map-dialog>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Cookie Agreement ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-cookie-consent v-if="has_gdpr"></s-cookie-consent>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ PWA Update Snackbar ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-pwa-version-check
      :style="$vuetify.display.smAndDown ? 'margin-top:-42px' : ''"
    ></s-pwa-version-check>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Bottom navigation bar ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-footer-navigation
      v-if="isMobile"
    ></s-footer-navigation>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Popup ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-popup
      v-if="popup && show_popup"
      :popup="popup"
      @close="show_popup = false"
    ></s-storefront-popup>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Open fullscreen images ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-fullscreen-view-animator></s-fullscreen-view-animator>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Retrieve basket from secure links ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-storefront-retrieve-share-order
      v-if="shop"
      :shop="shop"
    ></s-storefront-retrieve-share-order>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Webapp debug view ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-debugger></s-debugger>
  </v-app>
</template>

<script>
import _ from "lodash-es";
import SStorefrontMasterPaymentDialog from "@selldone/components-vue/storefront/payment/SStorefrontMasterPaymentDialog.vue";
import { FirebaseNotificationCategories } from "@selldone/core-js/enums/push-notification/FirebaseNotificationCategories";
import SStorefrontNeedLoginDialog from "@selldone/components-vue/storefront/login/SStorefrontNeedLoginDialog.vue";
import UNotificationSide from "@selldone/components-vue/ui/notification/side/UNotificationSide.vue";
import { Language } from "@selldone/core-js/enums/language/Language";
import SCookieConsent from "@selldone/components-vue/storefront/cookie/consent/SCookieConsent.vue";
import SPwaVersionCheck from "@selldone/components-vue/system/pwa/version-check/SPwaVersionCheck.vue";
import SFooterNavigation from "@selldone/components-vue/storefront/footer/navigarion/SFooterNavigation.vue";
import { SetupService } from "@selldone/core-js/server/SetupService";
import SStorefrontPopup from "@selldone/components-vue/storefront/popup/SStorefrontPopup.vue";
import { FontHelper } from "@selldone/core-js/helper/font/FontHelper";
import SFullscreenViewAnimator from "@selldone/components-vue/ui/image/SFullscreenViewAnimator.vue";
import SStorefrontSocialButtons from "@selldone/components-vue/storefront/social/SStorefrontSocialButtons.vue";
import SCampaignBanner from "@selldone/components-vue/storefront/campaign/banner/SCampaignBanner.vue";
import { ShopRestriction } from "@selldone/core-js/enums/shop/options/ShopRestriction";
import SAccessPrivateCheck from "@selldone/components-vue/storefront/access/private/check/SAccessPrivateCheck.vue";
import SStorefrontRetrieveShareOrder from "@selldone/components-vue/storefront/order/share-order/SStorefrontRetrieveShareOrder.vue";
import SComparisonButton from "@selldone/components-vue/storefront/comparison/button/SComparisonButton.vue";
import { EventName } from "@selldone/core-js/events/EventBus";
import SStorefrontApplicationLogin from "@selldone/components-vue/storefront/login/SStorefrontApplicationLogin.vue";
import UMapDialog from "@selldone/components-vue/ui/map/dialog/UMapDialog.vue";
import SDebugger from "@selldone/components-vue/storefront/debuger/SDebugger.vue";
import ScrollHelper from "@selldone/core-js/utils/scroll/ScrollHelper";

export default {
  name: "StorefrontApp",
  components: {
    SDebugger,
    UMapDialog,
    SStorefrontApplicationLogin,
    SComparisonButton,
    SStorefrontRetrieveShareOrder,
    SAccessPrivateCheck,
    SCampaignBanner,
    SStorefrontSocialButtons,
    SFullscreenViewAnimator,
    SStorefrontPopup,
    SFooterNavigation,
    SPwaVersionCheck,
    SCookieConsent,
    UNotificationSide,
    SStorefrontNeedLoginDialog,
    SStorefrontMasterPaymentDialog,
  },
  /**
   * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   *  🔷 Data
   * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   */
  data: () => ({
    IconFontsLoaded: false,

    show_popup: false,

    blur: false,
  }),

  /**
   * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   *  🔷 Compute Section
   * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   */
  computed: {
    shop() {
      return this.getShop();
    },
    theme() {
      return this.shop?.theme;
    },
    color_buy_button() {
      return this.theme?.color_buy ? this.theme.color_buy : "#0061e0";
    },

    is_private() {
      return (
        this.shop && this.shop.restriction === ShopRestriction.PRIVATE.code
      );
    },
    user() {
      return this.USER();
    },
    customer_has_access() {
      return this.user && this.user.access;
    },

    has_gdpr() {
      return (
        SetupService.GetGDPREnable() &&
        this.shop &&
        this.shop.options &&
        this.shop.options.some((e) => e.code === "gdpr" && e.value === true)
      );
    },

    popup() {
      return  this.shop?.popup;
    },

    // --------------------------------------------------------------------------------

    has_comparison() {
      return this.$route.matched.some((record) => record.meta.comparison);
    },

    // --------------------------------------------------------------------------------

    page_background_color() {
      const custom_bg_meta = [...this.$route.matched]
        .reverse()
        .find((record) => record.meta.bg_color);
      if (custom_bg_meta) return custom_bg_meta.meta.bg_color;
      return "#fff";
    },

    page_bg() {
      const meta_bg = this.$route.matched.find(
        (record) => record.meta.page_background,
      );
      // console.log("page_background", meta_bg);
      if (meta_bg) {
        return meta_bg.meta.page_background;
      }
      return "";
    },
  },

  /**
   * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   *  🔷 Watch Section
   * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   */
  watch: {
    $route(_new, _old) {
      this.blur = false; // Reset blur!

      if (_new.query["no-scroll"]) return; // Do not scroll if no-scroll query exist!

      this.$nextTick(function () {
        /*First shop page is not category page! but same elements so we do not want to suddenly jump up!*/
        const smooth =
          _old?.name === _new?.name ||
          (_old?.name === window.$storefront.routes.SHOP_PAGE &&
            _new?.name === window.$storefront.routes.SHOP_CATEGORY_PAGE);

        ScrollHelper.scrollToTop(0, smooth ? "smooth" : "instant");
        /*
        this.$vuetify.goTo(0, {
          duration:
            _old?.name === _new?.name ||
            (_old?.name === window.$storefront.routes.SHOP_PAGE &&
              _new?.name ===
                window.$storefront.routes.SHOP_CATEGORY_PAGE)
              ? 800
              : 0, // Can be 800ms,...
          offset: 0,
          easing: "easeInOutQuad",
        });*/
      });
    },

    popup(popup) {
      if (!popup) {
        console.style("<b>🛸 Popup : None! </b>");
        return;
      }

      console.style("<b>🛸 You have a popup! </b>");

      setTimeout(() => {
        this.show_popup = true;

        // Auto hide:
        if (popup.hide)
          setTimeout(() => {
            this.show_popup = false;
          }, popup.hide * 1000);
      }, popup.delay * 1000);
    },
  },

  /**
   * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   *  🔷 Component Lifecycle
   * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   */
  beforeCreate() {
    /**
     * Creates and dispatches an event called "selldone-app-loaded".
     * External systems or scripts can listen for this event to know when the
     * Selldone app has been loaded and take necessary actions, like hiding a
     * loading view.
     *
     * Example Usage:
     *
     * ```javascript
     * document.addEventListener("selldone-app-loaded", function (event) {
     *     document.getElementById('first_loading_view').style.display = "none";
     * });
     * ```
     */
    const event = new Event("selldone-app-loaded");
    document.dispatchEvent(event); // Dispatch the event.
  },

  created() {
    // Set initial language by meta tags: (Better user experience)
    if (
      SetupService.GetInitialLanguage() /*Serverside set initial language*/ &&
      !window.$storefront.database.language.getLanguage() /*User not set any language locally*/
    )
      this.setCurrentLanguage(SetupService.GetInitialLanguage());

    //this.$vuetify.locale.isRtl = this.getCurrentLanguage().dir === "rtl";

    /**
     * Auto RTL/LTR set by linked i18n to vuetify instance. {@see VuetifyInstance}
     */

    //――――――――――――――――――――――――― Save Entry Channel ―――――――――――――――――――――――――
    const route_channel = this.$route.matched.find(
      (record) => record.meta.channel,
    );
    if (route_channel) {
      console.log("⚡ Load sales channel mode:", route_channel.meta.channel);
      this.$store.commit("setChannelEntry", route_channel.meta.channel);
    }

    //█████████████████████████████████████████████████████████████
    //――――――――――――――――――――――――― Event Bus ―――――――――――――――――――――――――
    //█████████████████████████████████████████████████████████████

    this.EventBus.$on(EventName.FIREBASE_RECEIVE_MESSAGE, (payload) => {
      // Show only if user is being in shop:
      if (payload.data.shop && payload.data.shop.name === this.shop_name) {
        if (payload.notification) {
          const category =
            FirebaseNotificationCategories[payload.notification.tag];
          let icon = category ? category.icon : "done";
          let color = category ? category.color : this.SaminColorDark;
          const img = payload.notification ? payload.notification.icon : null;

          this.showNotificationAlert(
            payload.notification.title,
            payload.notification.body,
            icon,
            color,
            img,
          );
        }
      }
    });

    this.EventBus.$on(EventName.FIREBASE_GET_TOKEN, (token) => {
      if (!window.axios.defaults.headers.common["Authorization"]) return; // User not authorized! FCM added only for authorized users.

      const fun = _.debounce((token) => {
        // Debounce: Speed up first load!
        window.$storefront.user
          .setFcmToken(token)
          .then(({}) => {})
          .catch((error) => {
            console.error(error);
          });
      }, 5000);

      fun(token);
    });

    //▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Blur App ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆

    this.EventBus.$on(EventName.BLUR_APP, (blur) => {
      // console.log("🔵 BLUR_APP", blur);
      this.blur = blur;
    });

    //█████████████████████████████████████████████████████████████
    //―――――――――――――――――――――――― Get User Info ――――――――――――――――――――――――
    //█████████████████████████████████████████████████████████████

    this.UpdateUserInfo();

    //――――――――――――――――――――――  Font loader listener ――――――――――――――――――――
    FontHelper.ListenOnFontIconsLoaded(() => {
      this.IconFontsLoaded = true;
    });

    // Load shop info fast:
    if (window.shop) {
      this.$store.commit("setShop", window.shop);
      // 🞧 Header: Language (Important to load content - product article - in selected language) ASAP!
      const local_save_lang =
        window.$storefront.database.language.getLanguage();

      window.axios.defaults.headers.common["X-Localization"] = local_save_lang
        ? local_save_lang.code /*user selected language*/
        : this.shop.language /*shop default language*/;
    }

    this.fetchBasketAndShop();
  },
  mounted() {
    //――――――――――――――――――――――  Server Message ――――――――――――――――――――
    if (window.server_message) this.showMessage(null, window.server_message);

    //――――――――――――――――――――――  Global key listener ――――――――――――――――――――

    document.addEventListener("keyup", (e) => {
      // Register your global hot keys for the shop here:
      if (e.ctrlKey && e.key === "q") this.SwitchLanguage(e);
    });

    // ――――――――――――――――――――― Auto update rates every 5 minutes if some exchange rates are auto mode ―――――――――――――――――――――
    // Update shop exchange rates by interval if auto mode in rates exist:
    this.update_exchange_rates_interval = setInterval(() => {
      this.UpdateExchangeRates();
    }, 5 * 60000); // every 5 minutes
  },

  beforeUnmount() {
    this.EventBus.$off(EventName.FIREBASE_RECEIVE_MESSAGE);
    this.EventBus.$off(EventName.FIREBASE_GET_TOKEN);
    this.EventBus.$off(EventName.BLUR_APP);

    if (this.update_exchange_rates_interval)
      clearInterval(this.update_exchange_rates_interval);
  },

  /**
   * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   *  🔷 Component Methods
   * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   */
  methods: {
    /**
     * Just for testing RTL/LTR!
     * Hot key to change language instantly!
     * @constructor
     */
    SwitchLanguage() {
      let new_lang =
        this.getCurrentLanguage() === Language.en ? Language.fa : Language.en;
      this.setCurrentLanguage(new_lang.code);
      console.log("🌐 SwitchLanguage", new_lang.code);
    },
  },
};
</script>

<!-- ━━━━━━━━━━━━━━━━━━━ 🦄 Style ● Global ━━━━━━━━━━━━━━━━━━━-->
<style lang="scss" src="./style/storefront.scss"></style>

<style lang="scss">
/*
━━━━━━━━━━━━━━━━━━━━ 🎺 Variables ━━━━━━━━━━━━━━━━━━━━
 */
.s--shop {
  --background: #fff;

  --products-filter-width: 300px;
}

/*
━━━━━━━━━━━━━━━━━━━━ 🪅 Classes ━━━━━━━━━━━━━━━━━━━━
 */

.s--shop {
  background: var(--background) !important;
  font-weight: 400;
  overflow: hidden;
}
</style>
