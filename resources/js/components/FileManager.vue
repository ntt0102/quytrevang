<template>
  <DxFileManager
    ref="fileManager"
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
            text: $t('admin.settings.files.copyUrl'),
            hint: $t('admin.settings.files.copyUrl'),
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
</template>
<script>
import { DxFileManager } from "devextreme-vue/file-manager";
import CustomFileSystemProvider from "devextreme/file_management/custom_provider";

export default {
  components: {
    DxFileManager,
  },
  data() {
    return {
      fileSystemProvider: new CustomFileSystemProvider({
        getItems: this.getItems,
        createDirectory: this.createDirectory,
        renameItem: this.renameItem,
        deleteItem: this.deleteItem,
        copyItem: this.copyItem,
        moveItem: this.moveItem,
        uploadFileChunk: this.uploadFileChunk,
      }),
      currentFolderItems: [],
    };
  },
  props: {
    clientPath: {
      type: String,
      default: "",
    },
  },
  computed: {
    fileManager() {
      return this.$refs.fileManager.instance;
    },
  },
  watch: {
    clientPath() {
      this.fileManager.refresh();
    },
  },
  methods: {
    getItems(parentDirectory) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `settings/files/getItems?clientPath=${this.clientPath}&path=${parentDirectory.path}`
          )
          .then((response) => {
            // console.log(response.data);
            resolve(response.data);
            this.currentFolderItems = response.data;
          });
      });
    },
    createDirectory(parentDirectory, name) {
      return new Promise((resolve, reject) => {
        axios
          .post("settings/files/createDirectory", {
            clientPath: this.clientPath,
            path: parentDirectory.path,
            name: name,
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
      });
    },
    renameItem(item, newName) {
      return new Promise((resolve, reject) => {
        axios
          .post("settings/files/renameItem", {
            clientPath: this.clientPath,
            path: item.parentPath,
            oldName: item.name,
            newName: newName,
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
      });
    },
    deleteItem(item) {
      return new Promise((resolve, reject) => {
        axios
          .post("settings/files/deleteItem", {
            clientPath: this.clientPath,
            path: item.path,
            isDirectory: item.isDirectory,
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
      });
    },
    copyItem(item, destinationDirectory) {
      return new Promise((resolve, reject) => {
        axios
          .post("settings/files/copyItem", {
            clientPath: this.clientPath,
            fromPath: item.parentPath,
            toPath: destinationDirectory.path,
            name: item.name,
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
        resolve();
      });
    },
    moveItem(item, destinationDirectory) {
      return new Promise((resolve, reject) => {
        axios
          .post("settings/files/moveItem", {
            clientPath: this.clientPath,
            fromPath: item.parentPath,
            toPath: destinationDirectory.path,
            name: item.name,
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
        resolve();
      });
    },
    async uploadFileChunk(file, uploadInfo, destinationDirectory) {
      const fileName = file.name;
      if (file.type.match(/image.*/)) {
        const config = {
          file: file,
          maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
        };
        file = await this.$mf.resizeImage(config);
      }

      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("clientPath", this.clientPath);
        formData.append("file", file);
        formData.append("name", fileName);
        formData.append("path", destinationDirectory.path);
        axios
          .post("settings/files/uploadFileChunk", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data) resolve();
            else reject();
          });
      });
    },
    copyUrl() {
      const items = this.fileManager.getSelectedItems();
      if (items.length > 1)
        this.$toasted.info(this.$t("admin.settings.files.messages.multiFile"));
      else if (items[0].isDirectory)
        this.$toasted.info(this.$t("admin.settings.files.messages.notIsFile"));
      else {
        let text = `${window.baseURL}/storage/${this.clientPath}/${items[0].path}`;
        navigator.clipboard.writeText(text).then(
          () => {
            this.$toasted.success(
              this.$t("admin.settings.files.messages.copiedUrl")
            );
            this.$emit("copiedUrl", text);
          },
          (err) =>
            this.$toasted.error(
              this.$t("admin.settings.files.messages.notCopiedUrl") +
                "<br>ERROR: " +
                err
            )
        );
      }
    },
    onSelectedFileOpened({ file }) {
      if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        let items = this.currentFolderItems.reduce((imgs, f) => {
          if (!f.isDirectory)
            imgs.push({
              src: `${window.baseURL}/storage/${this.clientPath}/${file.parentPath}/${f.name}`,
              title: f.name,
            });
          return imgs;
        }, []);
        let pswp = this.$Pswp.open({
          items,
          options: {
            index: items.findIndex((item) => item.src.includes(file.name)),
          },
        });
        pswp.listen("close", () => this.$mf.popRouteHistoryState());
        this.$mf.pushPhotoswipeToHistoryState(pswp);
      } else
        this.$toasted.info(this.$t("admin.settings.files.messages.notIsImage"));
    },
    onErrorOccurred(e) {
      setTimeout(() => this.fileManager.repaint(), 3000);
    },
  },
};
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