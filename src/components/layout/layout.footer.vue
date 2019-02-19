<template>  

    <footer class="site-footer">
        <div class="shop-content">
            <footer-navigation/>    
            <footer-promotion/>
        </div>
    </footer>
        
</template>

<script>

    export default {
        components: {
            'footer-navigation' : () => import('@/components/elements/element.footer-navigation.vue'),
            'footer-promotion' : () => import('@/components/elements/element.footer-promotion.vue')
        }
    }

</script>