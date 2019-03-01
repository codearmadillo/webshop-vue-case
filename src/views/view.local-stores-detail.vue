<template>
    <div class="local-stores__detail-wrapper">

        <section class="store__map">
            <GmapMap
                :center="activemarker"
                :zoom="12"
                map-type-id="terrain"
                style="width: 100%; height: 100%"
                :options="{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: false
                }"
            >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
            </GmapMap>
        </section>
        <section class="store__information">
            <header class="store__header">
                <h2>{{ this.$route.meta.locationTitle }}</h2>
                <h4>{{ this.$route.meta.locationAddress }}</h4>
            </header>
            <p class="store__description">{{ this.$route.meta.locationDescription }}</p>
            <ul class="store__contact">
                <template v-if="this.$route.meta.locationContact.length > 0">
                    <li class="contact__line" v-for="contact in this.$route.meta.locationContact">
                        <i :class="contact.icon + ' contact__icon'"></i>
                        <template v-if="contact.isLink">
                            <a :href="contact.linkTo" class="contact__link">
                                {{ contact.content }}
                            </a>
                        </template>
                        <template v-else>
                            <span class="contact__label">
                                {{ contact.content }}
                            </span>
                        </template>  
                    </li>
                </template> 
                <li class="contact__line">
                    <i class="fa fa-clock contact__icon"></i>
                    <span class="contact__label">{{ this.$route.meta.locationOpeningHours }}</span>
                </li>
            </ul>
            <ul class="store__social-media">
                <li class="social-media__account" v-for="account in this.$route.meta.locationSocialMedia">
                    <a :href="account.url" :title="account.title">
                        <i :class="account.icon"></i>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                markers: [
                    {
                        name: 'London',
                        position: {
                            lat: 51.510377,
                            lng: -0.138312
                        }
                    },
                    {
                        name: 'New York',
                        position: {
                            lat: 40.768387,
                            lng: -73.983178 
                        }
                    },
                    {
                        name: 'Paris',
                        position: {
                            lat: 48.866544,
                            lng: 2.328724
                        }
                    },
                ]
            }
        },
        computed: {
            activemarker() {
                let active = this.markers.find(x => x.name.toLowerCase() == this.$route.meta.locationTitle.toLowerCase()).position;
                return active;
            }
        }
    }

</script>
  