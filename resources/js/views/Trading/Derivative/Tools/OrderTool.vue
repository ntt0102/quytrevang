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
    "priceSeries",
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
const orderStore = computed(() => store.state.tradingDerivative.tools.order);
let order = { side: 0, entry: null, tp: null, sl: null };
let lines = { entry: {}, tp: {}, sl: {} };
let isAutoOrdering = false;

const TP_DEFAULT = 3;
const SL_DEFAULT = 2;

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
    if (data) load(data);
});

function has() {
    return mf.isSet(lines.entry) || mf.isSet(lines.tp);
}
function show({ price }) {
    if (price && props.inSession()) {
        const currentSeconds = getUnixTime(addHours(new Date(), 7));
        if (!mf.isSet(lines.entry)) {
            let _price = null,
                _side = 0;
            if (!props.position) {
                if (
                    currentSeconds > props.TIME.ATO &&
                    currentSeconds < props.TIME.ATC
                ) {
                    _price = price;
                    _side = _price >= props.prices.at(-1).value ? 1 : -1;
                    order.side = _side;
                    order.entry = _price;
                }
            } else {
                if (currentSeconds < props.TIME.ATO) _price = "ATO";
                else if (currentSeconds > props.TIME.ATC) _price = "ATC";
                if (_price) {
                    order.entry = _price;
                    _side = -props.position;
                }
            }
            if (_side) {
                emit("showEntry", { side: _side, price: _price });
            }
        } else if (!mf.isSet(lines.tp) && props.position) {
            if (
                currentSeconds > props.TIME.ATO &&
                currentSeconds < props.TIME.ATC
            ) {
                emit("showTpSl", { side: props.position });
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
                    etData: {
                        cmd: "new",
                        side: order.side,
                        price: order.entry,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        drawOrderTool(["entry"]);
                        toast.success(t("trading.derivative.newEntrySuccess"));
                    } else toastOrderError(resp.message);
                });
        }
    }
}
function tpsl() {
    order.tp = order.entry + order.side * TP_DEFAULT;
    order.sl = order.entry - order.side * SL_DEFAULT;
    store
        .dispatch("tradingDerivative/executeOrder", {
            action: "tpsl",
            tpData: {
                cmd: "new",
                price: order.tp,
            },
            slData: {
                cmd: "new",
                price: order.sl,
            },
        })
        .then((resp) => {
            if (resp.isOk) {
                lines.entry.applyOptions({
                    draggable: false,
                });
                drawOrderTool(["entry", "tp", "sl"]);
                toast.success(t("trading.derivative.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function cancel() {
    if (mf.isSet(lines.entry)) {
        if (mf.isSet(lines.tp)) {
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: "exit",
                    tpData: { cmd: "cancel" },
                    slData: { cmd: "delete" },
                    exitData: {
                        cmd: "new",
                        price: "MTL",
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        removeOrderTool(["entry", "tp", "sl"]);
                        toast.success(t("trading.derivative.exitSuccess"));
                    } else {
                        toastOrderError(resp.message);
                    }
                });
        } else {
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: "entry",
                    etData: { cmd: "delete" },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        removeOrderTool(["entry"]);
                        toast.success(
                            t("trading.derivative.deleteEntrySuccess")
                        );
                    } else {
                        toastOrderError(resp.message);
                    }
                });
        }
    } else emit("getTools");
}
function cancelWithoutClose() {
    if (props.inSession()) {
        if (props.position) {
            const currentSeconds = getUnixTime(addHours(new Date(), 7));
            if (currentSeconds > props.TIME.ATC - 5 * 60) {
                isOrderWarning.value = true;
                if (
                    currentSeconds > props.TIME.ATC - 15 &&
                    mf.isSet(lines.tp)
                ) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "cancel",
                            tpData: { cmd: "cancel" },
                            slData: { cmd: "delete" },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t(
                                        "trading.derivative.autoCancelTpSlSuccess"
                                    )
                                );
                            } else toastOrderError(resp.message);
                        });
                }
            }
        }
    }
}
function scan(lastPrice) {
    if (mf.isSet(lines.entry)) {
        const side = order.side > 0;
        if (mf.isSet(lines.tp)) {
            if (mf.cmp(lastPrice, side, order.tp, true)) {
                if (!isAutoOrdering) {
                    isAutoOrdering = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "sl",
                            slData: {
                                cmd: "delete",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t("trading.derivative.deleteTpSuccess")
                                );
                            } else toastOrderError(resp.message);
                            isAutoOrdering = false;
                        });
                }
            }
            if (mf.cmp(lastPrice, !side, order.sl, true)) {
                if (!isAutoOrdering) {
                    isAutoOrdering = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "tp",
                            tpData: {
                                cmd: "cancel",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t("trading.derivative.deleteSlSuccess")
                                );
                            } else toastOrderError(resp.message);
                            isAutoOrdering = false;
                        });
                }
            }
        } else {
            if (mf.cmp(lastPrice, side, order.entry, true)) {
                if (!isAutoOrdering) {
                    isAutoOrdering = true;
                    setTimeout(() => {
                        order.tp = order.entry + order.side * TP_DEFAULT;
                        order.sl = order.entry - order.side * SL_DEFAULT;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "tpsl",
                                tpData: {
                                    cmd: "new",
                                    price: order.tp,
                                },
                                slData: {
                                    cmd: "new",
                                    price: order.sl,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    lines.entry.applyOptions({
                                        draggable: false,
                                    });
                                    drawOrderTool(["entry", "tp", "sl"]);
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
        }
    }
}
function drawOrderTool(kinds) {
    const TYPE = "order";
    let param = {
        isRemove: false,
        name: TYPE,
        points: [],
        data: [],
    };
    let color, title;
    kinds.forEach((kind) => {
        const entryPrice = order.entry;
        const tpPrice = order.tp;
        const slPrice = order.sl;
        switch (kind) {
            case "entry":
                color = "yellow";
                title = order.side > 0 ? "LONG" : "SHORT";
                break;
            case "tp":
                color = "lime";
                title = mf.fmtNum(tpPrice - entryPrice, 1, true);
                break;
            case "sl":
                color = "red";
                title = mf.fmtNum(slPrice - entryPrice, 1, true);
                break;
        }
        param.points.push(kind);
        if (mf.isSet(lines[kind])) {
            lines[kind].applyOptions({
                price: order[kind],
                title: title,
            });
            param.data.push(lines[kind].options());
        } else {
            const options = {
                lineType: TYPE,
                kind: kind,
                side: order.side,
                price: order[kind],
                color: color,
                lineWidth: 1,
                lineStyle: 0,
                title: title,
                draggable: true,
            };
            lines[kind] = props.priceSeries.createPriceLine(options);
            param.data.push(options);
        }
    });
    store.dispatch("tradingDerivative/drawTools", param);
    emit("orderChanged", has());
}
function load(kinds) {
    removeOrderTool(["entry", "tp", "sl"], false);
    loadOrderTool(kinds);
    emit("orderChanged", has());
}
function loadOrderTool(kinds) {
    Object.entries(kinds).forEach(([kind, option]) => {
        if (kind === "entry") order.side = option.side;
        order[kind] = option.price;
        lines[kind] = props.priceSeries.createPriceLine(option);
    });
}
function removeOrderTool(kinds, withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "order",
        });
    kinds.forEach((kind) => {
        if (mf.isSet(lines[kind])) {
            props.priceSeries.removePriceLine(lines[kind]);
            delete lines[kind];
        }
    });
    emit("orderChanged", has());
}
function drag({ line, lineOptions, oldPrice, newPrice }) {
    if (newPrice !== oldPrice) {
        let isChanged = false;
        if (lineOptions.kind === "entry") {
            if (!props.position) {
                isChanged = true;
                order[lineOptions.kind] = newPrice;
                store
                    .dispatch("tradingDerivative/executeOrder", {
                        action: "entry",
                        etData: {
                            cmd: "change",
                            price: order.entry,
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            drawOrderTool([lineOptions.kind]);
                            toast.success(
                                t("trading.derivative.changeEntrySuccess")
                            );
                        } else {
                            line.applyOptions({
                                price: oldPrice,
                            });
                            toastOrderError(resp.message);
                        }
                    });
            }
        } else {
            isChanged = true;
            order[lineOptions.kind] = newPrice;
            if (lineOptions.kind === "tp")
                store
                    .dispatch("tradingDerivative/executeOrder", {
                        action: "tp",
                        tpData: {
                            cmd: "change",
                            price: order.tp,
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            drawOrderTool([lineOptions.kind]);
                            toast.success(
                                t("trading.derivative.changeTpSuccess")
                            );
                        } else {
                            line.applyOptions({
                                price: oldPrice,
                            });
                            toastOrderError(resp.message);
                        }
                    });
            else
                store
                    .dispatch("tradingDerivative/executeOrder", {
                        action: "sl",
                        slData: {
                            cmd: "change",
                            price: order.sl,
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            drawOrderTool([lineOptions.kind]);
                            toast.success(
                                t("trading.derivative.changeSlSuccess")
                            );
                        } else {
                            line.applyOptions({
                                price: oldPrice,
                            });
                            toastOrderError(resp.message);
                        }
                    });
        }
        //
        if (!isChanged) {
            line.applyOptions({ price: oldPrice });
            toast.show(t("trading.derivative.noChangeOrderLine"));
        }
    }
}
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.derivative.${error}`));
}
</script>
