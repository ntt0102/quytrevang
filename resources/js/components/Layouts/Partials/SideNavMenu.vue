<template>
    <div
        class="dx-swatch-additional side-navigation-menu"
        @click="forwardClick"
    >
        <slot />
        <div class="menu-container">
            <dx-tree-view
                ref="treeViewRef"
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
                        <span class="dx-icon">
                            <i
                                :class="item.data.icon"
                                :data-count="getCount(item.data.name)"
                            />
                        </span>
                        <span>{{ item.data.text }}</span>
                    </div>
                </template>
            </dx-tree-view>
        </div>
    </div>
</template>

<script setup>
import { DxTreeView } from "devextreme-vue/tree-view";
import navigation from "../../../config/navigation";
import { onMounted, ref, inject, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    compactMode: Boolean,
});
const emit = defineEmits(["click"]);

const route = useRoute();
const router = useRouter();
const store = useStore();
const mf = inject("mf");

const user = store.state.auth.user;
const items = filter(mf.cloneDeep(navigation)).map((item) => ({
    ...item,
    expanded: false,
}));

const treeViewRef = ref(null);

function filter(nav) {
    return nav.reduce((c, item) => {
        const condition =
            (!item.permissions ||
                (!!item.permissions &&
                    user.permissions.some((p) =>
                        item.permissions.includes(p)
                    ))) &&
            (!item.level || (!!item.level && user.level >= item.level));
        if (condition) {
            if (!!item.items) item.items = filter(item.items);
            c.push(item);
        }
        return c;
    }, []);
}

function forwardClick(...args) {
    emit("click", args);
}

function handleItemClick(e) {
    if (mf.isSet(e.itemData.items)) return;
    if (e.itemData.name == "refresh") window.location.reload(true);
    else router.push({ name: e.itemData.name });

    const pointerEvent = e.event;
    pointerEvent.stopPropagation();
}

function updateSelection() {
    if (!treeViewRef.value || !treeViewRef.value.instance) {
        return;
    }

    treeViewRef.value.instance.selectItem(route.name);
    treeViewRef.value.instance.expandItem(route.name);
}

onMounted(() => {
    updateSelection();
    if (props.compactMode) {
        treeViewRef.value.instance.collapseAll();
    }
});

watch(
    () => route.name,
    () => {
        updateSelection();
    }
);

watch(
    () => props.compactMode,
    () => {
        if (props.compactMode) {
            treeViewRef.value.instance.collapseAll();
        } else {
            updateSelection();
        }
    }
);
const notify = computed(() => store.state.notify);
console.log("notify", notify.value);
function getCount(routeName) {
    let count = 0;
    switch (routeName) {
        case "users":
            count = notify.value.adminUser;
            break;
        case "contracts":
            count = notify.value.adminContract;
            break;
        case "comments":
            count = notify.value.adminComment;
            break;
        case "admin":
            count =
                notify.value.adminUser +
                notify.value.adminContract +
                notify.value.adminComment;
            break;
    }
    return count;
}
</script>

<style lang="scss">
@import "../../../../sass/variables.scss";
@import "../../../../sass/dx-styles.scss";

.side-navigation-menu {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    width: 250px !important;

    .menu-container {
        background-color: $base-bg;
        background-image: url("../../../../images/background-sidebar.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: left top;
        min-height: 100%;
        display: flex;
        flex: 1;
        padding-bottom: 60px;

        .dx-treeview {
            // ## Long text positioning
            white-space: nowrap;
            // ##

            // ## Icon width customization
            .dx-treeview-item {
                padding-left: 0;
                padding-right: 0;
                flex-direction: row-reverse;

                .dx-icon {
                    width: $side-panel-min-width !important;
                    margin: 0 !important;
                }

                .dx-treeview-item-content span {
                    padding-left: 1px;
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
                    &.dx-state-selected:not(.dx-state-focused)
                        > .dx-treeview-item {
                        background: transparent;
                    }

                    &.dx-state-selected > .dx-treeview-item * {
                        color: $base-accent;
                    }

                    &:not(.dx-state-focused)
                        > .dx-treeview-item.dx-state-hover {
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
        font-size: 18px;

        .dx-icon {
            position: relative;
            .far {
                &:not([data-count="0"]):after {
                    position: absolute;
                    content: attr(data-count);
                    top: -5px;
                    right: 5px;
                    padding: 0px 6px 2px 6px;
                    background: red;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    pointer-events: none;
                }
            }
        }
    }
}
</style>
