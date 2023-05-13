<template>
    <CorePopup
        ref="popupRef"
        class="change-avatar-popup"
        :title="$t('components.changeAvatar.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-folder-upload',
                    hint: $t('components.changeAvatar.buttons.choose'),
                    onClick: showFileChooser,
                },
            },
            {
                toolbar: 'bottom',
                location: 'center',
                html: '|',
            },
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-search-minus',
                    hint: $t('components.changeAvatar.buttons.zoomOut'),
                    onClick: zoomOut,
                },
            },
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-search-plus',
                    hint: $t('components.changeAvatar.buttons.zoomIn'),
                    onClick: zoomIn,
                },
            },
            {
                toolbar: 'bottom',
                location: 'center',
                html: '|',
            },
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-undo',
                    hint: $t('components.changeAvatar.buttons.rotateLeft'),
                    onClick: rotateLeft,
                },
            },
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-redo',
                    hint: $t('components.changeAvatar.buttons.rotateRight'),
                    onClick: rotateRight,
                },
            },
            {
                toolbar: 'bottom',
                location: 'center',
                html: '|',
            },
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    icon: 'far fa-crop-alt',
                    hint: $t('components.changeAvatar.buttons.crop'),
                    onClick: onSubmit,
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div>
                <VueCropper
                    v-if="state.isEnabled"
                    ref="cropperRef"
                    style="width: 100%; height: 400px"
                    :src="state.imgSrc"
                    :initialAspectRatio="1 / 1"
                />
                <input
                    ref="inputRef"
                    type="file"
                    accept="images/*"
                    @change="setImage"
                />
            </div>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import VueCropper from "vue3-cropperjs";
import "vue3-cropperjs/dist/v3cropper.css";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const popupRef = ref(null);
const cropperRef = ref(null);
const inputRef = ref(null);
const state = reactive({
    isEnabled: false,
    imgSrc: null,
});

function show() {
    popupRef.value.setOption("toolbarItems[0].options.disabled", false);
    popupRef.value.show();
}
function onSubmit() {
    bus.emit("checkPin", () => {
        let cropImg = cropperRef.value.getCroppedCanvas().toDataURL();
        store.dispatch("userProfile/changeAvatar", cropImg).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function zoomIn() {
    cropperRef.value.zoom(0.2);
}
function zoomOut() {
    cropperRef.value.zoom(-0.2);
}
function rotateLeft() {
    cropperRef.value.rotate(-90);
}
function rotateRight() {
    cropperRef.value.rotate(90);
}
function setImage(e) {
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === -1) {
        toast.error(t("components.changeAvatar.error.imageType"));
        return;
    }
    if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.imgSrc = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        toast.error(t("components.changeAvatar.error.fileReaderSupport"));
    }
}
function showFileChooser() {
    inputRef.value.click();
}

function onShown() {
    state.isEnabled = true;
    state.imgSrc = store.state.auth.user.avatar;
}
function onHidden() {
    state.isEnabled = false;
}

defineExpose({ show });
</script>
<style lang="scss">
.change-avatar-popup {
    input[type="file"] {
        display: none;
    }
}
</style>
