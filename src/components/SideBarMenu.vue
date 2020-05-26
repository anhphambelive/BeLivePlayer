<template>
	<!-- Sidebar  -->
	<nav id="sidebar" class="left-menu-sidebar">
		<div class="sidebar-header">
			<b-img :src="user.userImage" rounded="circle" :alt="user.displayName" class="profile-menu-img"></b-img>
		</div>
		<div class="sidebar-menu">
			<ul class="list-menu-sidebar">
				<li class="menu-sidebar-item" v-for="(menu, indexMenu) in listMenus" v-bind:key="indexMenu" :class="(menuActive === indexMenu) ? 'active' : ''">
					<router-link
							:to="{ name: menu.url }"
							exact
					>
						{{ menu.name }}
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import SidebarMenu from "../assets/js/components/sidebar-menu";

	export default SidebarMenu;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/sidebar-menu";
</style>