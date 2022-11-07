<template>
  <div class="settings-page">
    <h2 class="content-block">
      {{ $t("admin.settings.title") }}
    </h2>
    <div class="content-block dx-card responsive-paddings">
      <DxTabPanel
        ref="tabPanel"
        :loop="false"
        :animation-enabled="true"
        :swipe-enabled="false"
        :showNavButtons="true"
        @titleClick="onTitleClick"
      >
        <DxItem
          v-if="permissions.includes('setting.command@control')"
          :title="$t('admin.settings.commands.title')"
          text="#commands"
        >
          <template #default><Command /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.notification@control')"
          :title="$t('admin.settings.notification.title')"
          text="#notification"
        >
          <template #default><Notification /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.files@control')"
          :title="$t('admin.settings.files.title')"
          text="#files"
        >
          <template #default><Files /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.log@control')"
          :title="$t('admin.settings.log.title')"
          text="#log"
        >
          <template #default><Log /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.faqs@control')"
          :title="$t('admin.settings.faqs.title')"
          text="#faqs"
        >
          <template #default><Faqs /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.parameters@control')"
          :title="$t('admin.settings.parameters.title')"
          text="#parameters"
        >
          <template #default><Parameters /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.database@control')"
          :title="$t('admin.settings.database.title')"
          text="#database"
        >
          <template #default><Database /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.roles@control')"
          :title="$t('admin.settings.roles.title')"
          text="#roles"
        >
          <template #default><Roles /></template>
        </DxItem>
        <DxItem
          v-if="permissions.includes('setting.permissions@control')"
          :title="$t('admin.settings.permissions.title')"
          text="#permissions"
        >
          <template #default><Permissions /></template>
        </DxItem>
      </DxTabPanel>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
const Parameters = () =>
  import(/* webpackPrefetch: true */ "./Settings/Parameters.vue");
const Faqs = () => import(/* webpackPrefetch: true */ "./Settings/Faqs.vue");
const Database = () =>
  import(/* webpackPrefetch: true */ "./Settings/Database.vue");
const Command = () =>
  import(/* webpackPrefetch: true */ "./Settings/Command.vue");
const Notification = () =>
  import(/* webpackPrefetch: true */ "./Settings/Notification.vue");
const Log = () => import(/* webpackPrefetch: true */ "./Settings/Log.vue");
const Files = () => import(/* webpackPrefetch: true */ "./Settings/Files.vue");
const Roles = () => import(/* webpackPrefetch: true */ "./Settings/Roles.vue");
const Permissions = () =>
  import(/* webpackPrefetch: true */ "./Settings/Permissions.vue");
import adminSettingsStore from "../../store/modules/Admin/Settings";

export default {
  components: {
    DxTabPanel,
    DxItem,
    Parameters,
    Faqs,
    Database,
    Command,
    Notification,
    Log,
    Files,
    Roles,
    Permissions,
  },
  data() {
    return {
      selectedTabText: null,
    };
  },
  beforeCreate() {
    this.$store.registerModule("Admin.settings", adminSettingsStore);
  },
  mounted() {
    this.setSelectedTab();
    window.addEventListener("popstate", this.setSelectedTab);
  },
  destroyed() {
    this.$store.unregisterModule("Admin.settings");
    window.removeEventListener("popstate", this.setSelectedTab);
  },
  computed: {
    ...mapGetters("Auth", ["permissions"]),
    tabPanel: function () {
      return this.$refs.tabPanel.instance;
    },
  },
  methods: {
    onTitleClick(e) {
      if (e.itemData.text != this.selectedTabText) {
        history.pushState(null, null, e.itemData.text);
        this.selectedTabText = e.itemData.text;
      }
    },
    setSelectedTab() {
      this.selectedTabText = this.$route.hash;
      let tabs = this.tabPanel.option("items");
      let selectedTabIndex = tabs.findIndex(
        (item) => item.text === this.selectedTabText
      );
      if (selectedTabIndex == -1) {
        selectedTabIndex = 0;
        this.selectedTabText = tabs[0].text;
      }
      this.tabPanel.option("selectedIndex", selectedTabIndex);
    },
  },
};
</script>
<style lang="scss">
.settings-page {
  .dx-field-button-item {
    text-align: left !important;
  }
  .dx-field-item:not(.dx-field-item-has-group):not(.dx-field-item-has-tabs):not(.dx-first-row):not(.dx-label-v-align) {
    padding-top: 0;
  }
}
</style>
