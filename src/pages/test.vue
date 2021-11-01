<template>
  <div>
    page
  </div>
</template>

<script>
export default {};
</script>
<page-query>
query Gem ($id: ID!) {
  gem: gem (id: $id) {
    title
    path
    social_img
    date (format: "D. MMMM YYYY")
    tags
    description
    content
    cover_image (width: 860, blur: 10)
  }
}
</page-query>
<style></style>
