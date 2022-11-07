<template>
  <footer class="footer">
    <div class="content-block">
      <div>
        <span class="link" @click="policyClick('#terms')">{{
          $t("policy.terms.short")
        }}</span>
        &#8226;
        <span class="link" @click="policyClick('#privacy')">{{
          $t("policy.privacy.short")
        }}</span>
        &#8226;
        <span class="link" @click="policyClick('#faq')">{{
          $t("policy.faq.short")
        }}</span>
      </div>
      <div class="contact">
        <div>
          <i class="dx-icon-like"></i>
          <span class="link" @click="$refs.sendCommentPopup.show()">{{
            $t("admin.comments.title")
          }}</span>
        </div>
        &nbsp;
        <div>
          <i class="dx-icon-tel"></i>
          <span
            class="link"
            @click="$mf.openLink(`https://zalo.me/${contact.phone}`)"
            >{{ contact.phone | phone }}</span
          >
        </div>
        &nbsp;
        <div>
          <i class="dx-icon-email"></i>
          <span
            class="link"
            @click="
              $mf.openLink(
                `${
                  $devices.phone
                    ? 'mailto:'
                    : 'https://mail.google.com/mail/?view=cm&fs=1&to='
                }${contact.email}`
              )
            "
            >{{ contact.email }}</span
          >
        </div>
      </div>
    </div>
    <div class="content-block copyright">
      Copyright © 2017 {{ this.$appName }}
    </div>
    <SendCommentPopup ref="sendCommentPopup" />
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
import SendCommentPopup from "../Popups/SendCommentPopup.vue";

export default {
  components: { SendCommentPopup },
  computed: {
    ...mapGetters(["contact"]),
  },
  methods: {
    policyClick(hash) {
      if (this.$route.name === "policy")
        document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
      else this.$router.push({ name: "policy", hash });
    },
  },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 20px;

  .content-block {
    display: flex;
    flex-direction: row-reverse;

    div:first-child {
      margin-left: auto;
    }

    .contact {
      display: flex;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      & > div {
        flex-grow: 1;
        text-align: center;
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
  }
  .copyright {
    display: block;
    text-align: center;
  }
}
body[screen-size="small"] {
  .footer {
    .content-block {
      display: block;
      text-align: center;
    }
  }
}
</style>
