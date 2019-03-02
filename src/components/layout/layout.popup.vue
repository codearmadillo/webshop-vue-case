<template>
    <section v-if="open && content" :class="'page__popup' + (closing == true ? ' closing' : '')">
        <div class="popup__msg">
            <span @click="closePopup" class="msg__close">
                <i class="fa fa-times"></i>
            </span>
            <span class="msg__instance">{{ content }}</span>
        </div>
        <div @click="closePopup" class="popup__close"></div>
    </section>
</template>

<script>

    import { EventBus } from "@/event-bus";

    export default {
        data() {
            return {
                open: false,
                content: null,
                closing: false
            }
        },
        mounted() {
            EventBus.$on('open-popup', response => {
                this.content = response.msg;
                this.open = true;
                
                let _self = this;

                let close = setTimeout(function(){
                    _self.closePopup();
                }, 3000);

            });
        },
        methods: {
            closePopup() {

                this.closing = true;
                let _self = this;

                let anim = setTimeout(function(){
                    _self.open = false;
                    _self.content = null;
                    _self.closing = false;
                }, 300);
            }
        }
    }
</script>