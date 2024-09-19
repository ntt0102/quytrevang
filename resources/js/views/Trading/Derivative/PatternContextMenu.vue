<template>
    <div class="pattern-popup" @click="stopPropagationEvent">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <div class="container">
            <div class="continue">
                <div class="title">
                    {{ $t("trading.derivative.patternContextMenu.continue") }}
                </div>
                <DxScrollView class="items">
                    <div v-for="i in 4" :key="i">
                        <div class="name">{{ i }}.</div>
                        <canvas :id="`item${i}`" />
                    </div>
                </DxScrollView>
            </div>
            <div class="reversal">
                <div class="title">
                    {{ $t("trading.derivative.patternContextMenu.reversal") }}
                </div>
                <DxScrollView class="items">
                    <div v-for="i in 5" :key="i">
                        <div class="name">{{ i }}.</div>
                        <canvas :id="`item${4 + i}`" />
                    </div>
                </DxScrollView>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
    const data = [
        // 1-1
        {
            price: [
                [0, 100],
                [40, 40],
                [70, 60],
                [110, 20],
                [150, 70],
                [200, 50],
                [240, 80],
                [300, 0],
            ],
            volume: [
                [0, 200],
                [40, 130],
                [70, 160],
                [110, 140],
                [150, 170],
                [200, 150],
                [240, 180],
                [300, 100],
            ],
        },
        // 2-2
        {
            price: [
                [0, 100],
                [40, 40],
                [70, 60],
                [110, 20],
                [150, 80],
                [180, 40],
                [200, 60],
                [220, 50],
                [250, 70],
                [300, 0],
            ],
            volume: [
                [0, 200],
                [40, 130],
                [70, 160],
                [110, 140],
                [150, 170],
                [180, 150],
                [250, 180],
                [300, 100],
            ],
        },
        // 3-3
        {
            price: [
                [0, 100],
                [40, 70],
                [70, 80],
                [110, 20],
                [150, 70],
                [160, 40],
                [180, 60],
                [200, 30],
                [250, 80],
                [300, 0],
            ],
            volume: [
                [0, 200],
                [40, 130],
                [70, 160],
                [110, 140],
                [150, 170],
                [200, 150],
                [240, 180],
                [300, 100],
            ],
        },
        // 4-4
        {
            price: [
                [0, 100],
                [40, 60],
                [70, 85],
                [110, 45],
                [150, 65],
                [200, 30],
                [240, 45],
                [300, 0],
            ],
            volume: [
                [0, 200],
                [40, 130],
                [70, 160],
                [110, 140],
                [150, 170],
                [200, 150],
                [240, 180],
                [300, 100],
            ],
        },
        // 5-1
        {
            price: [
                [0, 80],
                [40, 20],
                [70, 60],
                [110, 0],
                [140, 50],
                [180, 10],
                [210, 40],
                [250, 20],
                [300, 100],
            ],
            volume: [
                [0, 180],
                [40, 100],
                [70, 130],
                [110, 110],
                [140, 145],
                [180, 125],
                [210, 160],
                [250, 140],
                [300, 200],
            ],
        },
        // 6-2
        {
            price: [
                [0, 80],
                [40, 0],
                [70, 60],
                [110, 10],
                [140, 50],
                [180, 20],
                [210, 40],
                [250, 30],
                [300, 100],
            ],
            volume: [
                [0, 180],
                [40, 100],
                [70, 130],
                [110, 110],
                [140, 145],
                [180, 125],
                [210, 160],
                [250, 140],
                [300, 200],
            ],
        },
        // 7-3
        {
            price: [
                [0, 80],
                [40, 20],
                [70, 60],
                [110, 10],
                [140, 60],
                [180, 0],
                [210, 70],
                [250, 50],
                [300, 100],
            ],
            volume: [
                [0, 180],
                [40, 100],
                [70, 130],
                [110, 110],
                [140, 145],
                [180, 125],
                [210, 160],
                [250, 140],
                [300, 200],
            ],
        },
        // 8-4
        {
            price: [
                [0, 60],
                [50, 30],
                [100, 100],
                [170, 60],
                [200, 80],
                [300, 0],
            ],
            volume: [
                [0, 200],
                [50, 160],
                [100, 190],
                [170, 140],
                [200, 160],
                [300, 100],
            ],
            target: [[160, 60], [180, 60], 2],
            entry: [
                [215, 60],
                [235, 60],
            ],
            sl: [
                [190, 80],
                [210, 80],
            ],
            tp: [
                [280, 10],
                [297, 10],
            ],
        },
        // 9-5
        {
            price: [
                [0, 30],
                [50, 0],
                [100, 90],
                [120, 60],
                [140, 80],
                [170, 40],
                [200, 100],
                [230, 60],
                [250, 90],
                [295, 0],
            ],
            volume: [
                [0, 200],
                [50, 160],
                [100, 190],
                [170, 140],
                [200, 170],
                [230, 150],
                [250, 160],
                [295, 100],
            ],
            target: [[160, 40], [180, 40], 0.5],
            entry: [
                [255, 60],
                [275, 60],
            ],
            sl: [
                [240, 90],
                [260, 90],
            ],
            tp: [
                [280, 10],
                [300, 10],
            ],
        },
    ];
    for (let item = 0; item < 9; item++) {
        const canvas = document.getElementById(`item${item + 1}`);
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");

        const price = data[item].price;
        const volume = data[item].volume;
        const target = data[item].target;
        const entry = data[item].entry;
        const sl = data[item].sl;
        const tp = data[item].tp;

        // price
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(price[0][0], price[0][1]);
        for (let i = 1; i < price.length; i++) {
            ctx.lineTo(price[i][0], price[i][1]);
        }
        ctx.stroke();
        // volume
        ctx.beginPath();
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.moveTo(volume[0][0], volume[0][1]);

        for (let i = 1; i < volume.length; i++) {
            ctx.lineTo(volume[i][0], volume[i][1]);
        }
        ctx.stroke();
        // target
        if (!!target) {
            ctx.beginPath();
            ctx.strokeStyle = "magenta";
            ctx.lineWidth = 2;
            ctx.moveTo(target[0][0], target[0][1]);
            ctx.lineTo(target[1][0], target[1][1]);
            ctx.stroke();
            ctx.font = "15px Arial";
            ctx.fillStyle = "magenta";
            ctx.fillText(target[2], target[1][0] + 5, target[1][1] + 5);
        }
        // entry
        if (!!entry) {
            ctx.beginPath();
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.moveTo(entry[0][0], entry[0][1]);
            ctx.lineTo(entry[1][0], entry[1][1]);
            ctx.stroke();
        }
        // sl
        if (!!sl) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.moveTo(sl[0][0], sl[0][1]);
            ctx.lineTo(sl[1][0], sl[1][1]);
            ctx.stroke();
        }
        // tp
        if (!!tp) {
            ctx.beginPath();
            ctx.strokeStyle = "lime";
            ctx.lineWidth = 2;
            ctx.moveTo(tp[0][0], tp[0][1]);
            ctx.lineTo(tp[1][0], tp[1][1]);
            ctx.stroke();
        }
    }
});
function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.pattern-popup {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: relative;
    padding: 10px;

    .triangle {
        width: 0px;
        height: 0px;
        top: 115px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px 0;
        border-color: transparent #4d4d5c transparent transparent;
        position: absolute;
    }
    .triangle-shadow {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px transparent;
        border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
        position: absolute;
    }
    .container {
        display: flex;
        gap: 10px;

        .items {
            width: 315px;
            height: 230px;
            overflow-x: auto;
        }

        .name {
            text-align: left;
            text-indent: 10px;
        }

        canvas {
            width: 300px;
            height: 200px;
            border: solid 1px black;
        }
    }
}
</style>
