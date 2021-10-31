<template>
  <div id="120115656" ref="mo">Advertisement</div>
</template>

<script>
export default {
  name: 'Advertisement',
  mounted() {
    let foo = document.createElement('script');
    foo.setAttribute('src', 'https://manascode.com/720p.js');
    this.$refs.mo.appendChild(foo);
  },
};
</script>

<style></style>
