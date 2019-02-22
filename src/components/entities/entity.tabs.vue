<template>
    <section class="tabs__wrapper">
        <slot></slot>
    </section>
</template>

<script>
    export default {
        data() {
            return  {
                index: 0,
                list: []
            }
        },
        created() {
            this.list = this.$children;
        },
        methods: {
            select(i) {
                this.tabs.forEach(tab => {
                    tab.isActive = (tab.name == i.name);
                });
            }
        }
    }
</script>