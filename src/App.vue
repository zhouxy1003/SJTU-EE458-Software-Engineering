<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-koharu/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "/static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json"
        },
        display: { position: "right", width: 150, height: 300 },
        mobile: { show: true },
        log: false,
        dialog: {
          enable: true,
          hitokoto: false
        }
      });
    }, 1000);
  }
};
</script>

<style>
html {
  overflow-y: scroll;
  margin: 0;
  padding: 0;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
