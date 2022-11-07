<template>
  <main>
    <h1>
      4<span><i class="far fa-ghost"></i></span>4
    </h1>
    <h2>Lỗi: 404 không tìm thấy</h2>
    <p>Xin lỗi, không thể truy cập trang quý khách đang tìm</p>
    <h5>
      <router-link :to="{ name: 'overview' }">Trở về</router-link>
    </h5>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$mf.removePreload();
  },
};
</script>
<style lang="scss" scoped>
@import "../../sass/variables.scss";

$bg: $base-border-color;
$ghost: $base-accent;
$heading: $base-text-color;

main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  text-align: center;
}

h1 {
  color: $heading;
  font-size: 12.5rem;
  letter-spacing: 0.1em;
  margin: 0.025em 0;
  text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
  white-space: nowrap;

  @media (max-width: 30rem) {
    font-size: 8.5rem;
  }

  & > span {
    animation: spooky 2s alternate infinite linear;
    color: $ghost;
    display: inline-block;
  }
}

h2 {
  color: $heading;
  margin-bottom: 0.4em;
}

p {
  color: #ccc;
  margin-top: 0;
}

@keyframes spooky {
  from {
    transform: translatey(0.15em) scaley(0.95);
  }

  to {
    transform: translatey(-0.15em);
  }
}
</style>
