<template>
<div class="menu">
<div class='menu-container'>
    <g-link class="logo" to="/">
		<g-image alt="logo" src="~/assets/images/logo.png" width="50%" />
	</g-link>
    <div class='menu-items'>
		<g-link class="menu-link" to="/">
			Home
		</g-link>
		<g-link class="menu-link" to="/about">
			About
		</g-link>
		<g-link class="menu-link" to="/contact">
			Contact
		</g-link>
	</div>
</div>
</div> 
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>

export default {
    name: "Menu",
	components : {
	
	}
}
</script>
<style lang="scss" scoped>
	.menu{
		width: 100%;
		height: 70px;
		background-color: var(--bg-content-color);
		.menu-container{
			max-width: 70%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.menu-link{
				margin-right: 2rem;
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
	@media screen and (max-width: 500px) {
		.menu{
			.menu-container{
			max-width: 90%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.menu-link{
				margin-right: 2rem;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		}
	}
</style>