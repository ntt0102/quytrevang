<template>
    <div
        ref="orderToolRef"
        class="cancel-order command"
        :title="$t('trading.derivative.orderTool')"
        @click="cancel"
    >
        <i class="far fa-trash-alt" :class="{ blink: isOrderWarning }"> </i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { confirm } from "devextreme/ui/dialog";
import { getUnixTime, addHours } from "date-fns";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const props = defineProps([
    "position",
    "prices",
    "drawPriceLine",
    "inSession",
    "TIME",
]);
const emit = defineEmits([
    "getTools",
    "showEntry",
    "showTpSl",
    "orderChanged",
    "hideContext",
]);
const orderToolRef = ref(null);
const isOrderWarning = ref(false);
const orderStore = computed(() => store.state.tradingDerivative.config.orders);
let putOrder = {};
let orders = ref({});
let lines = {};
let isAutoOrdering = false;

const symbol = "VN30F1M";
const tpDefault = computed(
    () => store.state.tradingDerivative.config.tpDefault
);
const slDefault = computed(
    () => store.state.tradingDerivative.config.slDefault
);

defineExpose({
    show,
    entry,
    tpsl,
    cancel,
    cancelWithoutClose,
    scan,
    drag,
});

watch(orderStore, (data) => {
    if (mf.isSet(data)) load(data);
});

watch(
    () => Object.keys(orders.value).length,
    (newLen) => emit("orderChanged", newLen > 0)
);

function show({ price }) {
    if (price && props.inSession()) {
        const currentSeconds = getUnixTime(addHours(new Date(), 7));
        if (!props.position) {
            if (
                currentSeconds > props.TIME.ATO &&
                currentSeconds < props.TIME.ATC
            ) {
                putOrder.side = price >= props.prices.at(-1).value ? 1 : -1;
                putOrder.price = price;
                emit("showEntry", {
                    side: putOrder.side,
                    price: putOrder.price,
                });
            }
        } else {
            if (!orders.value.length) {
                let _price = "";
                if (currentSeconds < props.TIME.ATO) _price = "ATO";
                else if (currentSeconds > props.TIME.ATC) _price = "ATC";
                if (_price) {
                    emit("showEntry", { side: -props.position, price: _price });
                }
            } else {
                if (
                    currentSeconds > props.TIME.ATO &&
                    currentSeconds < props.TIME.ATC
                ) {
                    emit("showTpSl", { side: props.position });
                }
            }
        }
    }
}
function entry() {
    if (props.inSession()) {
        const currentSeconds = getUnixTime(addHours(new Date(), 7));
        if (currentSeconds < props.TIME.ATO) {
            let result = confirm(
                t("trading.derivative.atoOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATO",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.derivative.atoOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        } else if (currentSeconds > props.TIME.ATC) {
            let result = confirm(
                t("trading.derivative.atcOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATC",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.derivative.atcOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        } else {
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: "entry",
                    entryData: {
                        cmd: "new",
                        side: putOrder.side,
                        price: putOrder.price,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        orders.value[resp.order.id] = resp.order;
                        lines[resp.order.id] = {};
                        drawOrderTool(["entry"], resp.order);
                        toast.success(t("trading.derivative.newEntrySuccess"));
                    } else toastOrderError(resp.message);
                });
        }
    }
}
function tpsl() {
    const pendingOrders = getOrderByStatus(0);
    if (pendingOrders.length !== 1) return false;
    const order = pendingOrders[0];
    const tpPrice = order.entry_price + order.side * tpDefault.value;
    const slPrice = order.entry_price - order.side * slDefault.value;
    store
        .dispatch("tradingDerivative/executeOrder", {
            action: "tpsl",
            orderId: order.id,
            tpData: {
                cmd: "new",
                price: tpPrice,
            },
            slData: {
                cmd: "new",
                price: slPrice,
            },
        })
        .then((resp) => {
            if (resp.isOk) {
                lines[order.id].entry.applyOptions({ draggable: false });
                drawOrderTool(["tp", "sl"], resp.order);
                toast.success(t("trading.derivative.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function cancel() {
    Object.values(orders.value).forEach((order) => {
        switch (order.status) {
            case 0:
                store
                    .dispatch("tradingDerivative/executeOrder", {
                        action: "entry",
                        entryData: {
                            cmd: "delete",
                            orderNo: order.entry_no,
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            removeOrderTool(["entry"], order.id);
                            delete orders.value[order.id];
                            toast.success(
                                t("trading.derivative.deleteEntrySuccess")
                            );
                        } else {
                            toastOrderError(resp.message);
                        }
                    });
                break;
            case 1:
                store
                    .dispatch("tradingDerivative/executeOrder", {
                        action: "exit",
                        tpData: { cmd: "cancel", orderNo: order.tp_no },
                        slData: { cmd: "delete", orderNo: order.sl_no },
                        exitData: {
                            cmd: "new",
                            price: "MTL",
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            removeOrderTool(["entry", "tp", "sl"], order.id);
                            delete orders.value[order.id];
                            toast.success(t("trading.derivative.exitSuccess"));
                        } else {
                            toastOrderError(resp.message);
                        }
                    });
                break;
        }
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
                                tpData: { cmd: "cancel", orderNo: order.tp_no },
                                slData: { cmd: "delete", orderNo: order.sl_no },
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
                                            "trading.derivative.autoCancelTpSlSuccess"
                                        )
                                    );
                                } else toastOrderError(resp.message);
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
                            const tpPrice =
                                order.entry_price +
                                order.side * tpDefault.value;
                            const slPrice =
                                order.entry_price -
                                order.side * slDefault.value;
                            store
                                .dispatch("tradingDerivative/executeOrder", {
                                    action: "tpsl",
                                    orderId: order.id,
                                    tpData: {
                                        cmd: "new",
                                        price: tpPrice,
                                    },
                                    slData: {
                                        cmd: "new",
                                        price: slPrice,
                                    },
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
                                                "trading.derivative.autoNewTpSlSuccess"
                                            )
                                        );
                                    } else toastOrderError(resp.message);
                                    isAutoOrdering = false;
                                });
                        }, 1000);
                    }
                }
                break;
            case 1:
                if (mf.cmp(lastPrice, sideBool, order.tp_price, true)) {
                    if (!isAutoOrdering) {
                        isAutoOrdering = true;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "sl",
                                slData: {
                                    cmd: "delete",
                                    orderNo: order.sl_no,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    removeOrderTool(
                                        ["entry", "tp", "sl"],
                                        order.id
                                    );
                                    delete orders.value[order.id];
                                    toast.success(
                                        t("trading.derivative.deleteTpSuccess")
                                    );
                                } else toastOrderError(resp.message);
                                isAutoOrdering = false;
                            });
                    }
                }
                if (mf.cmp(lastPrice, !sideBool, order.sl_price, true)) {
                    if (!isAutoOrdering) {
                        isAutoOrdering = true;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "tp",
                                tpData: {
                                    cmd: "cancel",
                                    orderNo: order.tp_no,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    removeOrderTool(
                                        ["entry", "tp", "sl"],
                                        order.id
                                    );
                                    delete orders.value[order.id];
                                    toast.success(
                                        t("trading.derivative.deleteSlSuccess")
                                    );
                                } else toastOrderError(resp.message);
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
        if (order.tp_price) {
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
                draggable: kind === "entry" && order.tp_price ? false : true,
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
            const dataKey = `${kind}Data`;
            const toastKey = `change${kind[0].toUpperCase()}${kind.slice(
                1
            )}Success`;
            const orderNo = getOrderNo(kind, oldPrice);
            if (!orderNo) return false;
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: kind,
                    [dataKey]: {
                        cmd: "change",
                        orderNo,
                        price: newPrice,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        orders.value[resp.order.id] = resp.order;
                        drawOrderTool([kind], resp.order);
                        toast.success(t(`trading.derivative.${toastKey}`));
                    } else {
                        line.applyOptions({ price: oldPrice });
                        toastOrderError(resp.message);
                    }
                });
        } else {
            line.applyOptions({ price: oldPrice });
            toast.show(t("trading.derivative.noChangeOrderLine"));
        }
    }
}
function getOrderNo(kind, price) {
    return Object.values(orders.value).find(
        (order) => order[`${kind}_price`] === price
    )?.[`${kind}_no`];
}
function getOrderByStatus(status, isHas = false) {
    const order = Object.values(orders.value).filter(
        (order) => order.status === status
    );
    if (isHas) return order.length > 0;
    else return order;
}
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.derivative.${error}`));
}
</script>
