<template>
    <span :id="{ identifier }" class="advanced-select" :class="{ classname }">
        <span class="as--native">
            <label class="native__label">
                {{ label }}
                <select v-model="selected.value" @change="hello()">
                    <option v-for="option in options" :value="option.v">
                        {{ option.l }}
                    </option>
                </select>
            </label>
        </span>
        <span class="as--dynamic">
            <span class="dynamic__label">
                {{ label }}
            </span>
            <span class="dynamic__select">
                <span class="dynamic__link" @click="dropdown">
                    {{ selected.label }}
                </span>
                <span v-if="active" class="dynamic__dropdown">
                    <span :class="isactive(option.v)" v-for="option in options" :value="option.v" @click="changeValue(option.v, option.l); dropdown()">
                        {{ option.l }}
                    </span>
                </span>
            </span>
        </span>
    </span>
</template>
​
<script>

    export default {
        data() {
            return {
                selected: {
                    value: '',
                    label: ''
                },
                active: false
            }
        },
        props: {
            identifier: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            classname: {
                type: String,
                required: false,
                default: 'as--default'
            }
        },
        created() {

            let v = null;
            let l = null;

            this.options.forEach(function(key){
                if(key.selected && key.selected === true) {
                    v = key.v;
                    l = key.l;
                }
            });

            if(v === null) {
                this.selected = {
                    label: this.options[0].l,
                    value: this.options[0].v
                }
            } else {
                this.selected = {
                    label: l,
                    value: v
                }
            }

        },
        methods: {
            changeValue(value, label) {
                this.selected = {
                    value: value,
                    label: label
                };
            },
            dropdown() {
                this.active = !this.active;
            },
            isactive(value) {
                return {
                    'active': this.selected.value == value
                }
            },
            hello() {
                alert('Hey');
            }
        }
    }
    
</script>
