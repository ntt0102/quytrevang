<template>
  <div class="level-bar content-block">
    <center>
      <ul :style="{ counterReset: 'levelNumber 0' }">
        <li
          v-for="item in $mf.getAccountLevelList()"
          :key="item.level"
          :class="{
            'is-active': item.level == level + 1,
            'guiding-step-1': item.level == 2,
            'guiding-step-2': item.level == 3,
            'guiding-step-3': item.level == 4,
          }"
          @click="item.level == level + 1 ? onLevelClick(item.level) : null"
        >
          {{ item.text }}
        </li>
      </ul>
    </center>
    <ResendVerifyEmailPopup ref="resendVerifyEmailPopup" />
    <EditProfilePopup ref="editProfilePopup" />
    <ChangePinPopup ref="changePinPopup" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { alert } from "devextreme/ui/dialog";
import ResendVerifyEmailPopup from "../../../components/Popups/ResendVerifyEmailPopup.vue";
import EditProfilePopup from "../../../components/Popups/EditProfilePopup.vue";
import ChangePinPopup from "../../../components/Popups/ChangePinPopup.vue";

export default {
  components: { ResendVerifyEmailPopup, EditProfilePopup, ChangePinPopup },
  computed: {
    ...mapGetters("Auth", ["level"]),
  },
  methods: {
    onLevelClick(nextLevel) {
      switch (nextLevel) {
        case 2:
          this.$refs.resendVerifyEmailPopup.show();
          break;
        case 3:
          this.$refs.changePinPopup.show();
          break;
        case 4:
          this.$refs.editProfilePopup.show();
          break;
        case 5:
          alert(
            this.$t("user.overview.signContractGuide"),
            this.$t("user.overview.levels.signContract")
          );
          break;
        case 6:
          this.$router.push({
            name: "contract",
            query: { redirect: this.$router.currentRoute.name },
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";

.level-bar {
  $brand-primary: $base-accent;
  $white: #fff;
  $grey-light: #ededed;
  %remain-levels {
    &:before {
      content: counter(levelNumber);
      font-family: inherit;
      font-weight: 700;
    }
    &:after {
      background-color: $grey-light;
    }
  }
  text-align: center;

  ul {
    display: table;
    table-layout: fixed;
    list-style: none;
    width: 100%;
    margin-left: -40px;

    > li {
      counter-increment: levelNumber;
      text-align: center;
      display: table-cell;
      position: relative;
      color: $brand-primary;
      cursor: pointer;

      &:before {
        content: "\2713";
        display: block;
        margin: 0 auto 4px;
        background-color: $brand-primary;
        color: $white;
        font-weight: bold;
        width: 36px;
        height: 36px;
        line-height: 32px;
        text-align: center;
        font-weight: bold;
        border: {
          width: 3px;
          style: solid;
          color: $brand-primary;
          radius: 50%;
        }
      }
      &:after {
        content: "";
        height: 5px;
        width: calc(100% - 2 * 18px);
        background-color: $brand-primary;
        position: absolute;
        top: 16px;
        left: calc(50% + 18px);
      }
      &:last-child {
        &:after {
          display: none;
        }
      }

      &.is-active {
        @extend %remain-levels;
        &:before {
          background-color: $white;
          color: $brand-primary;
          border-color: $brand-primary;
        }

        &:hover:before {
          background-color: $brand-primary;
          color: $white;
        }

        ~ li {
          color: darken(white, 60);
          @extend %remain-levels;
          &:before {
            color: darken(white, 40);
            background-color: $grey-light;
            border-color: $grey-light;
          }
        }
      }
    }
  }
}

body[screen-size="small"] {
  .level-bar {
    ul {
      width: 180px;
      margin-left: 0px;
      > li {
        display: list-item !important;
        text-align: left !important;
        margin-left: -40px;

        &:not(:last-child) {
          padding-bottom: 22px;
        }

        &:before {
          display: inline-block;
          margin-right: 20px;
        }
        &:after {
          width: 5px;
          height: calc(100% - 2 * 18px);
          left: 16px;
          top: calc(50% + 5px);
        }
      }
    }
  }
}
</style>
