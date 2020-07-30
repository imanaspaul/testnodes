<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Headerauth :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
    <div class="addvertisement">
    </div>
  </Layout>
</template>

<page-query>
query {
  posts : allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Headerauth from '~/components/Headerauth.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Headerauth,
    PostCard
  },
  metaInfo: {
    title: 'MANASCODE | Django , Python, Javascript, Vue.js Tutorials',
    meta: [
        {
          name: 'description',
          content: "Manascode is a personal blog , from where you can learn about Python tutorial, Django tutorial, Javascript and Vue.js from scratch . Manascode provides you in detail tutorials to learn something in easy way. Follow us to be a full stack web developer in 2020."
        },
        {
          name: 'canonical',
          href: "manascode.com"
        },
        {
          property: "og:title",
          content: "'MANASCODE | Django , Python, Javascript, Vue.js Tutorials',",
        },
        {
          property: "og:image",
          content : "https://res.cloudinary.com/manascode/image/upload/v1596116145/manascode.com/manascode_alc0pk.png"
        },
        {
          property : "og:description",
          content : "Manascode is a personal blog , from where you can learn about Python tutorial, Django tutorial, Javascript and Vue.js from scratch . Manascode provides you in detail tutorials to learn something in easy way. Follow us to be a full stack web developer in 2020."
        }
      ]
  },
  data(){
    return {
      code : null
    }
  }
}
</script>
