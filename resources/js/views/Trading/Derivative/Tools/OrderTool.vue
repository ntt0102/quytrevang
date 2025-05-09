<template>
    <div
        ref="orderToolRef"
        class="cancel-order context command"
        :class="{ red: hasOrder }"
        :title="$t('trading.derivative.tools.order')"
        @click="toggleOrderContext"
        @contextmenu="cleanOldOrders"
    >
        <i class="far fa-gavel" :class="{ blink: isOrderWarning }"> </i>
        <OrderContext
            v-show="showOrderContext"
            class="contextmenu"
            :orders="orders"
            @closeOrder="closeOrder"
            @closeAllOrders="closeAllOrders"
            @putOrder="putOrder"
        >
        </OrderContext>
    </div>
</template>
<script setup>
import OrderContext from "./Contexts/OrderContext.vue";
import { ref, inject, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { confirm } from "devextreme/ui/dialog";
import { getUnixTime, addHours } from "date-fns";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const props = defineProps(["position", "drawPriceLine", "inSession", "TIME"]);
const emit = defineEmits(["hideContext"]);
const orderToolRef = ref(null);
const isOrderWarning = ref(false);
const showOrderContext = ref(false);
const orders = ref({});
const orderStore = computed(() => store.state.tradingDerivative.config.orders);
const hasOrder = computed(
    () =>
        store.state.tradingDerivative.status.position ||
        store.state.tradingDerivative.status.pendingOrders.length > 0 ||
        Object.keys(orders.value).length > 0
);
let patternOrder = {};
let lines = {};
let isAutoOrdering = false;

defineExpose({
    hide,
    scan,
    drag,
    closeAllOrders,
    cancelWithoutClose,
    setPatternOrder,
});
onMounted(() => {
    window.addEventListener("keydown", shortcutHandle);
});

onUnmounted(() => {
    window.removeEventListener("keydown", shortcutHandle);
});
watch(orderStore, (data) => {
    if (mf.isSet(data)) load(data);
});
function setPatternOrder(value) {
    patternOrder = value;
}
function hide(status = false) {
    showOrderContext.value = status;
}
function putOrder() {
    let isExecuted = false;
    if (props.inSession()) {
        const currentSeconds = getUnixTime(addHours(new Date(), 7));
        if (currentSeconds < props.TIME.ATO) {
            let result = confirm(
                t("trading.derivative.confirms.atoOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    isExecuted = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "cancel",
                            exit: "ATO",
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                toast.success(
                                    t(
                                        "trading.derivative.toasts.atoOrderSuccess"
                                    )
                                );
                            } else toastOrderError(resp);
                        });
                }
            });
        } else if (currentSeconds > props.TIME.ATC) {
            let result = confirm(
                t("trading.derivative.confirms.atcOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    isExecuted = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "cancel",
                            exit: "ATC",
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                toast.success(
                                    t(
                                        "trading.derivative.toasts.atcOrderSuccess"
                                    )
                                );
                            } else toastOrderError(resp);
                        });
                }
            });
        } else {
            if (!props.position) {
                if (mf.isSet(patternOrder)) {
                    isExecuted = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "entry",
                            data: { ...{ cmd: "new" }, ...patternOrder },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                orders.value[resp.order.id] = resp.order;
                                lines[resp.order.id] = {};
                                drawOrderTool(["entry"], resp.order);
                                toast.success(
                                    t(
                                        "trading.derivative.toasts.newEntrySuccess"
                                    )
                                );
                            } else toastOrderError(resp);
                        });
                }
            } else {
                const entryOrders = getOrderByStatus(0);
                if (entryOrders.length === 1) {
                    const order = entryOrders[0];
                    isExecuted = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "tpsl",
                            orderId: order.id,
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                orders.value[order.id] = resp.order;
                                lines[order.id].entry.applyOptions({
                                    draggable: false,
                                });
                                drawOrderTool(["tp", "sl"], resp.order);
                                toast.success(
                                    t(
                                        "trading.derivative.toasts.newTpSlSuccess"
                                    )
                                );
                            } else toastOrderError(resp);
                        });
                }
            }
        }
    }
    if (!isExecuted) {
        toast.warning(t("trading.derivative.toasts.noPutOrder"));
    }
}
function closeAllOrders() {
    const allOrders = Object.values(orders.value);
    if (allOrders.length) {
        allOrders.forEach((order) => closeOrder(order));
    } else {
        store
            .dispatch("tradingDerivative/executeOrder", {
                action: "cancel",
                exit: "MTL",
            })
            .then((resp) => {
                if (resp.isOk) {
                    toast.success(t("trading.derivative.toasts.cancelSuccess"));
                } else toastOrderError(resp);
            });
    }
}
function closeOrder(order) {
    store
        .dispatch("tradingDerivative/executeOrder", {
            action: "cancel",
            orderId: order.id,
            exit: order.status === 1 ? "MTL" : "",
        })
        .then((resp) => {
            if (resp.isOk) {
                removeOrderTool(["entry", "tp", "sl"], order.id);
                delete orders.value[order.id];
                toast.success(t("trading.derivative.toasts.cancelSuccess"));
            } else toastOrderError(resp);
        });
}
function cancelWithoutClose() {
    if (props.inSession()) {
        if (props.position) {
            const currentSeconds = getUnixTime(addHours(new Date(), 7));
            if (currentSeconds > props.TIME.ATC - 5 * 60) {
                isOrderWarning.value = true;
                if (currentSeconds > props.TIME.ATC - 15) {
                    const openingOrders = getOrderByStatus(1);
                    openingOrders.forEach((order) => {
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "cancel",
                                orderId: order.id,
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    removeOrderTool(
                                        ["entry", "tp", "sl"],
                                        order.id
                                    );
                                    delete orders.value[order.id];
                                    toast.success(
                                        t(
                                            "trading.derivative.toasts.cancelNotExitSuccess"
                                        )
                                    );
                                } else toastOrderError(resp);
                            });
                    });
                }
            }
        }
    }
}
function scan(lastPrice) {
    Object.values(orders.value).forEach((order) => {
        const sideBool = order.side > 0;
        switch (order.status) {
            case 0:
                if (mf.cmp(lastPrice, sideBool, order.entry_price, true)) {
                    if (!isAutoOrdering) {
                        isAutoOrdering = true;
                        setTimeout(() => {
                            store
                                .dispatch("tradingDerivative/executeOrder", {
                                    action: "tpsl",
                                    orderId: order.id,
                                })
                                .then((resp) => {
                                    if (resp.isOk) {
                                        orders.value[order.id] = resp.order;
                                        lines[order.id].entry.applyOptions({
                                            draggable: false,
                                        });
                                        drawOrderTool(["tp", "sl"], resp.order);
                                        Object.keys(orders.value).forEach(
                                            (id) => {
                                                if (
                                                    Number(id) !== order.id &&
                                                    orders.value[id].status ===
                                                        0
                                                ) {
                                                    removeOrderTool(
                                                        ["entry"],
                                                        id
                                                    );
                                                    delete orders.value[id];
                                                }
                                            }
                                        );

                                        toast.success(
                                            t(
                                                "trading.derivative.toasts.newTpSlSuccess"
                                            )
                                        );
                                    } else toastOrderError(resp);
                                    isAutoOrdering = false;
                                });
                        }, 1000);
                    }
                }
                break;
            case 1:
                let kind = "";
                if (mf.cmp(lastPrice, sideBool, order.tp_price, true)) {
                    kind = "sl";
                }
                if (mf.cmp(lastPrice, !sideBool, order.sl_price, true)) {
                    kind = "tp";
                }
                if (kind) {
                    if (!isAutoOrdering) {
                        isAutoOrdering = true;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "cancel",
                                orderId: order.id,
                                kind,
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    removeOrderTool(
                                        ["entry", "tp", "sl"],
                                        order.id
                                    );
                                    delete orders.value[order.id];
                                    toast.success(
                                        t(
                                            "trading.derivative.toasts.cancelSuccess"
                                        )
                                    );
                                } else toastOrderError(resp);
                                isAutoOrdering = false;
                            });
                    }
                }
                break;
        }
    });
}
function load(data) {
    orders.value = mf.cloneDeep(data);
    Object.values(orders.value).forEach((order) => {
        let kinds = ["entry"];
        if (order.status === 1) {
            kinds.push("tp", "sl");
        }
        removeOrderTool(["entry", "tp", "sl"], order.id);
        drawOrderTool(kinds, order);
    });
}
function drawOrderTool(kinds, order) {
    let color, title;
    kinds.forEach((kind) => {
        switch (kind) {
            case "entry":
                color = "yellow";
                title = `${order.side > 0 ? "LONG" : "SHORT"}[${order.id}]`;
                break;
            case "tp":
                color = "lime";
                title = `TP[${order.id}] ${mf.fmtNum(
                    order.tp_price - order.entry_price,
                    1,
                    true
                )}`;
                break;
            case "sl":
                color = "red";
                title = `SL[${order.id}] ${mf.fmtNum(
                    order.sl_price - order.entry_price,
                    1,
                    true
                )}`;
                break;
        }
        if (!mf.isSet(lines[order.id])) lines[order.id] = {};
        if (mf.isSet(lines[order.id][kind])) {
            lines[order.id][kind].applyOptions({ title: title });
        } else {
            const options = {
                lineType: "order",
                kind: kind,
                price: order[`${kind}_price`],
                color: color,
                lineWidth: 1,
                lineStyle: 0,
                title: title,
                draggable:
                    kind === "entry" && order.status === 1 ? false : true,
            };
            lines[order.id][kind] = props.drawPriceLine(options);
        }
    });
}
function removeOrderTool(kinds, orderId) {
    if (mf.isSet(lines[orderId])) {
        kinds.forEach((kind) => {
            if (mf.isSet(lines[orderId][kind])) {
                props.drawPriceLine(lines[orderId][kind], true);
            }
        });
        delete lines[orderId];
    }
}
function drag({ line, lineOptions, oldPrice, newPrice }) {
    if (newPrice !== oldPrice) {
        const kind = lineOptions.kind;
        const changeValid = kind !== "entry" || !props.position;
        //
        if (changeValid) {
            const toastKey = `change${mf.capitalize(kind)}Success`;
            const order = getOrderByKind(kind, oldPrice);

            if (!mf.isSet(order)) return false;
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: kind,
                    orderId: order.id,
                    data: {
                        cmd: "change",
                        orderNo: String(order[`${kind}_no`]),
                        price: newPrice,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        orders.value[order.id] = resp.order;
                        drawOrderTool([kind], resp.order);
                        toast.success(
                            t(`trading.derivative.toasts.${toastKey}`)
                        );
                    } else {
                        line.applyOptions({ price: oldPrice });
                        toastOrderError(resp);
                    }
                });
        } else {
            line.applyOptions({ price: oldPrice });
            toast.show(t("trading.derivative.toasts.noChangeOrderLine"));
        }
    }
}
function cleanOldOrders() {
    store.dispatch("tradingDerivative/cleanOldOrders");
}
function getOrderByKind(kind, price) {
    return Object.values(orders.value).find(
        (order) => order[`${kind}_price`] === price
    );
}
function getOrderByStatus(status, isHas = false) {
    const order = Object.values(orders.value).filter(
        (order) => order.status === status
    );
    return isHas ? order.length > 0 : order;
}
function toastOrderError(data) {
    let error = data.error ?? data.message ?? "unknown";
    toast.error(t(`trading.derivative.toasts.${error}`));
}
function toggleOrderContext() {
    const oldValue = showOrderContext.value;
    emit("hideContext");
    showOrderContext.value = !oldValue;
}
function shortcutHandle(e) {
    if (e.key === "F4") {
        toggleOrderContext();
        e.preventDefault();
    }
}
</script>
<style lang="scss">
.cancel-order {
    .triangle {
        bottom: 5px;
        top: unset !important;
    }

    .contextmenu {
        bottom: 0px;
        top: unset !important;
    }
}
</style>
