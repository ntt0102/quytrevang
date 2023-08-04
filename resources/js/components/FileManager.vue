<template>
    <DxFileManager
        ref="fileManagerRef"
        :file-system-provider="fileSystemProvider"
        :permissions="{
            create: true,
            copy: true,
            move: true,
            delete: true,
            rename: true,
            upload: true,
        }"
        :itemView="{ mode: 'thumbnails' }"
        :toolbar="{
            fileSelectionItems: [
                {
                    widget: 'dxButton',
                    options: {
                        text: $t('settings.files.copyUrl'),
                        hint: $t('settings.files.copyUrl'),
                        icon: 'link',
                    },
                    location: 'before',
                    onClick: copyUrl,
                },
                'separator',
                'move',
                'copy',
                'rename',
                'separator',
                'delete',
                'clearSelection',
            ],
        }"
        @errorOccurred="onErrorOccurred"
        @selectedFileOpened="onSelectedFileOpened"
    />
    <Photoswipe
        ref="photoswipeRef"
        :images="selectedImages"
        :style="{ display: 'none !important' }"
    />
</template>
<script setup>
import { DxFileManager } from "devextreme-vue/file-manager";
import Photoswipe from "./Photoswipe.vue";
import CustomFileSystemProvider from "devextreme/file_management/custom_provider";
import { ref, watch, inject } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const props = defineProps({
    clientPath: {
        type: String,
        default: "",
    },
});
const emit = defineEmits(["copiedUrl"]);
const { t } = useI18n();
const mc = inject("mc");
const mf = inject("mf");
const fileManagerRef = ref(null);
const photoswipeRef = ref(null);
const selectedImages = ref([]);
const fileSystemProvider = ref(
    new CustomFileSystemProvider({
        getItems: getItems,
        createDirectory: createDirectory,
        renameItem: renameItem,
        deleteItem: deleteItem,
        copyItem: copyItem,
        moveItem: moveItem,
        uploadFileChunk: uploadFileChunk,
    })
);

watch(
    () => props.clientPath,
    () => {
        fileManagerRef.value.instance.refresh();
    }
);

function getItems(parentDirectory) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/getItems", {
                clientPath: props.clientPath,
                path: parentDirectory.path,
            })
            .then((response) => {
                resolve(response.data);
                selectedImages.value = response.data.reduce((imgs, f) => {
                    if (!f.isDirectory && f.name.match(/.(jpg|jpeg|png|gif)$/i))
                        imgs.push(
                            `${window.baseURL}/storage/${props.clientPath}/${parentDirectory.path}/${f.name}`
                        );
                    return imgs;
                }, []);
            });
    });
}
function createDirectory(parentDirectory, name) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/createDirectory", {
                clientPath: props.clientPath,
                path: parentDirectory.path,
                name: name,
            })
            .then((response) => {
                if (response.data) resolve();
                else reject();
            });
    });
}
function renameItem(item, newName) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/renameItem", {
                clientPath: props.clientPath,
                path: item.parentPath,
                oldName: item.name,
                newName: newName,
            })
            .then((response) => {
                if (response.data) resolve();
                else reject();
            });
    });
}
function deleteItem(item) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/deleteItem", {
                clientPath: props.clientPath,
                path: item.path,
                isDirectory: item.isDirectory,
            })
            .then((response) => {
                if (response.data) resolve();
                else reject();
            });
    });
}
function copyItem(item, destinationDirectory) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/copyItem", {
                clientPath: props.clientPath,
                fromPath: item.parentPath,
                toPath: destinationDirectory.path,
                name: item.name,
            })
            .then((response) => {
                if (response.data) resolve();
                else reject();
            });
        resolve();
    });
}
function moveItem(item, destinationDirectory) {
    return new Promise((resolve, reject) => {
        axios
            .post("settings/file/moveItem", {
                clientPath: props.clientPath,
                fromPath: item.parentPath,
                toPath: destinationDirectory.path,
                name: item.name,
            })
            .then((response) => {
                if (response.data) resolve();
                else reject();
            });
        resolve();
    });
}
async function uploadFileChunk(file, uploadInfo, destinationDirectory) {
    const fileName = file.name;
    if (file.type.match(/image.*/)) {
        const config = {
            file: file,
            maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
        };
        file = await mf.resizeImage(config);
    }

    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("clientPath", props.clientPath);
        formData.append("file", file);
        formData.append("name", fileName);
        formData.append("path", destinationDirectory.path);
        axios
            .post("settings/file/uploadFileChunk", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                noCrypt: true,
            })
            .then((response) => {
                if (response.data) {
                    if (fileName.match(/.(jpg|jpeg|png|gif)$/i)) {
                        selectedImages.value.push(
                            `${window.baseURL}/storage/${props.clientPath}/${destinationDirectory.path}/${fileName}`
                        );
                    }
                    resolve();
                } else reject();
            });
    });
}
function copyUrl() {
    const items = fileManagerRef.value.instance.getSelectedItems();
    if (items.length > 1) toast.info(t("settings.files.messages.multiFile"));
    else if (items[0].isDirectory)
        toast.info(t("settings.files.messages.notIsFile"));
    else {
        let text = `${window.baseURL}/storage/${props.clientPath}/${items[0].path}`;
        navigator.clipboard.writeText(text).then(
            () => {
                toast.success(t("settings.files.messages.copiedUrl"));
                emit("copiedUrl", text);
            },
            (err) =>
                toast.error(
                    t("settings.files.messages.notCopiedUrl") +
                        "<br>ERROR: " +
                        err
                )
        );
    }
}
function onSelectedFileOpened({ file }) {
    if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        photoswipeRef.value.openSlide(file.name);
    } else toast.info(t("settings.files.messages.notIsImage"));
}
function onErrorOccurred(e) {
    setTimeout(() => fileManagerRef.value.instance.repaint(), 3000);
}
</script>
<style lang="scss">
.dx-filemanager {
    .dx-drawer-panel-content.dx-visibility-change-handler {
        visibility: hidden;
    }
    .dx-drawer-shader {
        visibility: hidden !important;
    }
}
</style>
