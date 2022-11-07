<template>
  <v-tour name="guidingTour" :steps="steps" :options="options">
    <template slot-scope="tour">
      <transition name="fade" mode="out-in">
        <v-step
          v-if="tour.steps[tour.currentStep]"
          :key="tour.currentStep"
          :step="tour.steps[tour.currentStep]"
          :previous-step="tour.previousStep"
          :next-step="tour.nextStep"
          :stop="tour.stop"
          :skip="tour.skip"
          :is-first="tour.isFirst"
          :is-last="tour.isLast"
          :labels="tour.labels"
          :highlight="tour.highlight"
        >
        </v-step>
      </transition>
    </template>
  </v-tour>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: {
        labels: {
          buttonSkip: this.$t("components.guidingTour.labels.buttonSkip"),
          buttonPrevious: this.$t(
            "components.guidingTour.labels.buttonPrevious"
          ),
          buttonNext: this.$t("components.guidingTour.labels.buttonNext"),
          buttonStop: this.$t("components.guidingTour.labels.buttonStop"),
        },
        debug: false,
        highlight: true,
      },
      steps: [],
    };
  },
  computed: {
    ...mapGetters("Auth", ["isLoggedin", "level", "email"]),
  },
  watch: {
    isLoggedin(value) {
      if (value && this.level < 4) {
        this.getSteps();
        this.$tours["guidingTour"].start();
      }
    },
  },
  methods: {
    removeStep() {
      let vStepEl = this.$el.querySelector(".v-step");
      if (!!vStepEl) vStepEl.style.display = "none";
    },
    getSteps() {
      const CONTENT_FORMAT = "<strong>{title}</strong><br><br>{text}";
      if (this.level < 2)
        this.steps.push(
          {
            target: ".guiding-step-1",
            content: CONTENT_FORMAT.replace(
              "{title}",
              this.$t("user.overview.levels.verifyEmail")
            ).replace(
              "{text}",
              this.$t("components.guidingTour.step1.text").replace(
                "{email}",
                this.email
              )
            ),
            before: (type) =>
              new Promise(async (resolve, reject) => {
                if (this.$route.name !== "overview") {
                  this.removeStep();
                  await this.$router.push({ name: "overview" });
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                } else resolve();
              }),
            params: {
              enableScrolling: false,
            },
          }
          // {
          //   target: ".guiding-step-2b",
          //   content: this.$t("components.guidingTour.step2b").replace(
          //     "{icon}",
          //     `<i class='dx-icon-edit'></i>`
          //   ),
          //   before: (type) =>
          //     new Promise(async (resolve, reject) => {
          //       if (this.$route.name !== "profile") {
          //         this.removeStep();
          //         await this.$router.push({ name: "profile" });
          //         setTimeout(() => {
          //           resolve();
          //         }, 1000);
          //       } else resolve();
          //     }),
          //   params: {
          //     enableScrolling: false,
          //   },
          // }
        );
      if (this.level < 2)
        this.steps.push({
          target: ".guiding-step-2",
          content: CONTENT_FORMAT.replace(
            "{title}",
            this.$t("user.overview.levels.setPin")
          ).replace("{text}", this.$t("components.guidingTour.step2.text")),
          before: (type) =>
            new Promise(async (resolve, reject) => {
              if (this.$route.name !== "overview") {
                this.removeStep();
                await this.$router.push({ name: "overview" });
                setTimeout(() => {
                  resolve();
                }, 1000);
              } else resolve();
            }),
          params: {
            enableScrolling: false,
          },
        });
      if (this.level < 3)
        this.steps.push({
          target: ".guiding-step-3",
          content: this.$t("components.guidingTour.step3"),
          before: (type) =>
            new Promise(async (resolve, reject) => {
              if (this.$route.name !== "overview") {
                this.removeStep();
                await this.$router.push({ name: "overview" });
                setTimeout(() => {
                  resolve();
                }, 1000);
              } else resolve();
            }),
          params: {
            enableScrolling: false,
          },
        });
      if (this.level < 4)
        this.steps.push(
          {
            target: ".guiding-step-4a",
            content: this.$t("components.guidingTour.step4a"),
            before: (type) =>
              new Promise(async (resolve, reject) => {
                if (this.$route.name !== "contract") {
                  this.removeStep();
                  await this.$router.push({ name: "contract" });
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                } else resolve();
              }),
            params: {
              enableScrolling: false,
            },
          },
          {
            target: ".guiding-step-4b",
            content: this.$t("components.guidingTour.step4b"),
            before: (type) =>
              new Promise(async (resolve, reject) => {
                if (this.$route.name !== "contract") {
                  this.removeStep();
                  await this.$router.push({ name: "contract" });
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                } else resolve();
              }),
            params: {
              enableScrolling: false,
            },
          },
          {
            target: ".guiding-step-4c",
            content: this.$t("components.guidingTour.step4c"),
            params: {
              enableScrolling: false,
            },
          }
        );
    },
  },
};
</script>
<style lang="scss">
// .v-tour__target--highlighted {
//   box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
// }
</style>