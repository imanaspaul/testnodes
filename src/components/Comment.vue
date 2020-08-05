<template>
   <div class="post-comments">
       <vue-disqus
      shortname="manascode-com"
      :identifier="$page.post.title"
    ></vue-disqus>
   </div>
</template>

<script>
export default {
    name: "comment"
}
</script>

<style>

</style>