<template>
  <div class="dx-swatch-additional side-navigation-menu" @click="forwardClick">
    <slot />
    <div class="menu-container" @mouseover="forwardClick">
      <DxTreeView
        ref="treeView"
        :items="items"
        key-expr="name"
        selection-mode="single"
        :focus-state-enabled="false"
        expand-event="click"
        @item-click="handleItemClick"
        width="100%"
      >
        <template #item="item">
          <div class="item">
            <i class="dx-icon" :class="item.data.icon" />
            <span>{{ item.data.text }}</span>
            <span
              v-if="
                item.data.name === 'users' && sidenav.signingUsersNumber > 0
              "
              class="badge"
              :title="
                $t('admin.users.signingUsers').replace(
                  '{count}',
                  sidenav.signingUsersNumber
                )
              "
            >
              <div class="container">
                <div class="item">
                  {{ sidenav.signingUsersNumber }}
                </div>
                <div class="circle"></div>
              </div>
            </span>
            <span
              v-if="
                item.data.name === 'contracts' &&
                sidenav.confirmingContractsNumber > 0
              "
              class="badge"
              :title="
                $t('admin.contracts.confirmingContracts').replace(
                  '{count}',
                  sidenav.confirmingContractsNumber
                )
              "
              ><div class="container">
                <div class="item">
                  {{ sidenav.confirmingContractsNumber }}
                </div>
                <div class="circle"></div></div
            ></span>
            <span
              v-if="
                item.data.name === 'comments' &&
                sidenav.unreadCommentsNumber > 0
              "
              class="badge"
              :title="
                $t('admin.comments.unreadComments').replace(
                  '{count}',
                  sidenav.unreadCommentsNumber
                )
              "
              ><div class="container">
                <div class="item">
                  {{ sidenav.unreadCommentsNumber }}
                </div>
                <div class="circle"></div></div
            ></span>
          </div>
        </template>
      </DxTreeView>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DxTreeView from "devextreme-vue/ui/tree-view";
import navigation from "../../configs/navigation.js";

export default {
  components: {
    DxTreeView,
  },
  props: {
    compactMode: Boolean,
  },
  data() {
    return {
      items: null,
    };
  },
  created() {
    this.items = navigation
      .filter((item) => {
        return (
          (!item.permission ||
            (!!item.permission &&
              this.permissions.includes(item.permission))) &&
          (!item.level || (!!item.level && this.level >= item.level))
        );
      })
      .map((item) => {
        return { ...item, expanded: false };
      });
  },
  mounted() {
    this.treeView = this.$refs.treeView && this.$refs.treeView.instance;
    this.updateSelection();
    if (this.compactMode) {
      this.treeView.collapseAll();
    }
  },
  watch: {
    $route() {
      this.updateSelection();
    },
    compactMode() {
      if (this.compactMode) {
        this.treeView.collapseAll();
      } else {
        this.updateSelection();
      }
    },
  },
  computed: {
    ...mapGetters("User.layout", ["sidenav"]),
    ...mapGetters("Auth", ["permissions", "level"]),
  },
  methods: {
    forwardClick(...args) {
      this.$emit("click", args);
    },

    handleItemClick(e) {
      if (!e.itemData.name || this.compactMode) {
        return;
      }
      if (e.itemData.name == "refresh") window.location.reload();
      else this.$router.push({ name: e.itemData.name });

      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
    },

    updateSelection() {
      if (!this.treeView) {
        return;
      }

      this.treeView.selectItem(this.$route.name);
      this.treeView.expandItem(this.$route.name);
    },
  },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.side-navigation-menu {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  width: 250px !important;

  .menu-container {
    background-color: $base-bg;
    background-image: url("../../../images/background-sidebar.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left top;
    min-height: 100%;
    display: flex;
    flex: 1;
    padding-bottom: 76px;

    .dx-treeview {
      // ## Long text positioning
      white-space: nowrap;
      // ##

      // ## Icon width customization
      .dx-treeview-item {
        padding-left: 0;
        padding-right: 0;

        .dx-icon {
          width: $side-panel-min-width !important;
          margin: 0 !important;
        }
      }
      // ##

      // ## Arrow customization
      .dx-treeview-node {
        padding: 0 0 !important;
      }

      .dx-treeview-toggle-item-visibility {
        right: 10px;
        left: auto;
      }

      .dx-rtl .dx-treeview-toggle-item-visibility {
        left: 10px;
        right: auto;
      }
      // ##

      // ## Item levels customization
      .dx-treeview-node {
        &[aria-level="1"] {
          font-weight: bold;
          border-bottom: 1px solid $base-border-color;
        }

        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;
          padding: 0 calc($side-panel-min-width/4);
        }
      }
      // ##
    }

    // ## Selected & Focuced items customization
    .dx-treeview {
      .dx-treeview-node-container {
        .dx-treeview-node {
          &.dx-state-selected:not(.dx-state-focused) > .dx-treeview-item {
            background: transparent;
          }

          &.dx-state-selected > .dx-treeview-item * {
            color: $base-accent;
          }

          &:not(.dx-state-focused) > .dx-treeview-item.dx-state-hover {
            background-color: lighten($base-bg, 4);
          }
        }
      }
    }

    .dx-theme-generic .dx-treeview {
      .dx-treeview-node-container
        .dx-treeview-node.dx-state-selected.dx-state-focused
        > .dx-treeview-item
        * {
        color: inherit;
      }
    }
    // ##
  }

  .item {
    position: relative;
    font-size: 18px;

    .badge {
      position: absolute;
      top: -45px;
      left: -5px;

      .container {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
      }

      .item {
        z-index: 1000;
        padding: 0px 5px;
        background-color: red;
        border-radius: 50%;
        color: white !important;
      }

      .circle {
        border-radius: 50%;
        background-color: red;
        width: 30px;
        height: 30px;
        position: absolute;
        opacity: 0;
        animation: scaleIn 1s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
      }
    }
  }
  @keyframes scaleIn {
    from {
      transform: scale(0.5, 0.5);
      opacity: 0.5;
    }
    to {
      transform: scale(2, 2);
      opacity: 0;
    }
  }
}
</style>
