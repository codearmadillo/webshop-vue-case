<template>
    <label v-if="type !== 'select' && type !== 'checkbox'">
        <span>{{ label }}</span>
        <input v-model="currentvalue" :name="name" :id="identifier" :type="type" :placeholder="placeholder" :value="currentvalue" :class="classname" @keyup="keypress"/>
        <span class="input-stepper" v-if="type == 'number'">
            <i @click="numInc()" class="fa fa-angle-up"></i>
            <i @click="numDec()" class="fa fa-angle-down"></i>
        </span>
    </label>
    <span class="checkbox" v-else-if="type == 'checkbox'">
        <input type="checkbox" :name="name" :id="identifier" />
        <label :for="identifier">
            {{ label }}
        </label>
    </span>
    <label v-else>
        <span>{{ label }}</span>
        <span class="selectbox">
            <select v-model="selected" :name="name" :id="identifier">
                <option v-for="option in options" :disabled="option.disabled == true" :key="option.key" :value="option.key">
                    {{ option.value }}
                </option>
            </select>
        </span>
    </label>
</template>

<script>

    export default {
        data() {
            return {
                selected: '',
                currentvalue: 0
            }
        },
        props: {
            identifier: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: false,
                default: ''
            },
            options: {
                type: Array,
                default() {
                    return new Array()
                }
            },
            classname: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                required: true
            },
            stepper: {
                type: Number,
                default: 1
            }
        },
        created() {
            
            if(this.type == 'select') {
                if(this.options.length == 0) {
                    return false;
                }

                let preselected = this.options.filter(x => x.selected && x.selected == true);
                let selected = preselected.length == 0 ? this.options[0].key : preselected[0].key;

                this.selected = selected;
            } else {
                if(this.type == 'number') {
                    this.currentvalue = parseInt(this.value);
                } else {
                    this.currentvalue = this.value;
                }
            }

            return true;

        },
        methods: {
            numInc() {
                this.currentvalue += this.stepper;
            },
            numDec() {
                this.currentvalue -= this.stepper;
            },
            keypress(event) {
                if(event.key === 'Enter') {
                    this.$emit('submit', this.currentvalue);
                }
            }
        }
    }

</script>