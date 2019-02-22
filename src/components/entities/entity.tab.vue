<template>
    <article v-show="isActive" class="tabs__instance">
        <slot></slot>
    </article>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            selected: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                isActive: false
            }
        },
        computed: {
            href() {
                return "#" + this.name.toLowerCase().replace(/ /g, '-');
            }
        },
        mounted() {
            this.isActive = this.selected;
        }
    }
</script>