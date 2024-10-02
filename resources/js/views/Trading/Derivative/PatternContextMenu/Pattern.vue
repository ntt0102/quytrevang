<template>
    <canvas ref="canvasRef" width="300" height="200"></canvas>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps(["pattern"]);

const canvasRef = ref(null);
const patternData = ref(props.pattern);

watch(
    () => props.pattern,
    (e) => {
        patternData.value = e;
        drawPattern(true);
    }
);

onMounted(() =>
    setTimeout(() => {
        drawPattern();
    }, 0)
);
function drawPattern(isClean = false) {
    if (!patternData.value) return false;

    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");
    if (isClean) ctx.clearRect(0, 0, canvas.width, canvas.height);

    const price = patternData.value.price;
    const volume = patternData.value.volume;
    const et = patternData.value.et;
    const sl = patternData.value.sl;
    const tp1 = patternData.value.tp1;
    const tp2 = patternData.value.tp2;
    const time = patternData.value.time;

    // price
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.setLineDash([1, 0]);
    ctx.moveTo(price[0][0], price[0][1]);
    for (let i = 1; i < price.length; i++) {
        ctx.lineTo(price[i][0], price[i][1]);
    }
    ctx.stroke();
    // volume
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.moveTo(volume[0][0], volume[0][1]);

    for (let i = 1; i < volume.length; i++) {
        ctx.lineTo(volume[i][0], volume[i][1]);
    }
    ctx.stroke();
    // et
    if (!!et) {
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.moveTo(et[0][0], et[0][1]);
        ctx.lineTo(et[1][0], et[1][1]);
        ctx.stroke();
    }
    // sl
    if (!!sl) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(sl[0][0], sl[0][1]);
        ctx.lineTo(sl[1][0], sl[1][1]);
        ctx.stroke();
    }
    // tp1
    if (!!tp1) {
        ctx.beginPath();
        ctx.strokeStyle = "lime";
        ctx.moveTo(tp1[0][0], tp1[0][1]);
        ctx.lineTo(tp1[1][0], tp1[1][1]);
        ctx.stroke();
        ctx.font = "15px Arial";
        ctx.fillStyle = "lime";
        ctx.fillText(tp1[2], tp1[1][0] + 5, tp1[1][1] + 5);
    }
    // tp2
    if (!!tp2) {
        ctx.beginPath();
        ctx.strokeStyle = "lime";
        ctx.moveTo(tp2[0][0], tp2[0][1]);
        ctx.lineTo(tp2[1][0], tp2[1][1]);
        ctx.stroke();
    }
    // time
    if (!!time) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.setLineDash([5, 10]);
        ctx.moveTo(time, 0);
        ctx.lineTo(time, 200);
        ctx.stroke();
    }
}
</script>

<style scoped>
canvas {
    width: 300px;
    height: 200px;
    border: solid 1px black;
}
</style>
