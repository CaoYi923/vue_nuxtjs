<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '../components/header'
import Footer from '../components/footer'
export default {
  components:{
    Header,Footer
  }
}
</script>
<style>
* {
	margin: 0;
	padding: 0;
}

ul,
li,
ol {
	list-style: none;
}

a {
	color: inherit;
	text-decoration: none;
}

a:hover {
	color: inherit;
}

i,
em {
	font-style: normal;
}
</style>
