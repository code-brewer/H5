<template>
    <div id="header">
        <header class="navbar navbar-static-top ams-docs-nav" id="top" role="banner">
            <div class="container">
                <div class="navbar-header">
                    <a href="#" class="navbar-brand">FE DOC</a>
                </div>
                <nav role="navigation">
                    <ul class="nav navbar-nav">
                        <li>
                            <router-link :to="{name: 'Home'}">webpack</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Bug'}">Bug问答区</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Demo'}">demo</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <div id="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app'
}

</script>
<style lang="scss">
@import './assets/css/bootstrap.css';
@import './assets/css/doc.scss';
</style>
<style lang="scss" scoped>
    .navbar-nav {
        .router-link-active {
            background: #eee;
        }
    }
</style>
