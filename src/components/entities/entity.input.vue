<template>
    <label
        v-if="Supported && elementType !== 'select' && elementType !== 'checkbox'"
        :class="(iconBefore == null ? '' : 'icon-before icon-before--' + iconBeforeStyle) + ' ' + (iconAfter == null ? '' : 'icon-after icon-after--' + iconAfterStyle)"
        >

        <!-- Start Label -->
        <template v-if="renderLabel == true">
            <span>{{ elementLabel }}</span>
        </template>
        <!-- End label -->

        <!-- Start Icon Before -->
        <template v-if="iconBefore !== null">
            <span @click="(iconBeforeIsClickable == true ? (isSearch == false ? Submit() : Search()) : null)" :class="(iconBeforeIsClickable == true ? 'clickable ' : '') + 'input__icon icon--before'">
                <i :class="iconBefore"></i>
            </span>
        </template>
        <!-- End Icon Before -->

        <!-- Start Input -->
        <input ref="output"
            v-model="Value"
            :name="elementName"
            :id="elementId"
            :type="elementType"
            :placeholder="elementPlaceholder"
            :value="Value"
            :class="(elementClassname !== null ? elementClassname : '') + (Valid || elementType == 'search' ? '' : ' error')"

            @keyup="Keypress"
            @input="Update()"
            @change="Update()"
        >
        <!-- End Input -->

        <!-- Start Stepper -->
        <template v-if="elementType == 'number' && hasStepper == true">
            <span class="input-stepper">
                <i @click="valInc()" class="fa fa-angle-up"></i>
                <i @click="valDec()" class="fa fa-angle-down"></i>
            </span>
        </template>
        <!-- End Stepper -->

        <!-- Start Icon After -->
        <template v-if="iconAfter !== null">
            <span @click="(iconAfterIsClickable == true ? (isSearch == false ? Submit() : Search()) : null)" :class="(iconAfterIsClickable == true ? 'clickable ' : '') + 'input__icon icon--after'">
                <i :class="iconAfter"></i>
            </span>
        </template>
        <!-- End Icon After -->

    </label>
    <span 
        v-else-if="elementType == 'checkbox' && Supported" :class="'checkbox' + (elementClassname !== null ? '' + elementClassname : '')"
        >
        <input
            v-model="Value"
            :value="elementName"
            ref="output"
            type="checkbox"
            :name="elementName"
            :id="(elementId == null ? elementName : elementId)"
            @change="Update()" />
        <label :class="(Valid ? '' : ' error')" :for="(elementId == null ? elementName : elementId)">
            {{ elementLabel }}
        </label>
    </span>
    <label v-else-if="elementType == 'select' && Supported" :class="elementClassname !== null ? elementClassname : ''">
        <span v-if="renderLabel == true" class="selectbox__label">
            {{ elementLabel }}
        </span>
        <span class="selectbox__element">
            <select 
                ref="output"
                v-model="Value"
                :name="elementName"
                :id="elementId"
                @change="Update">
                <option v-for="option in options" :disabled="option.disabled == true" :key="option.key" :value="option.key">
                    {{ option.value }}
                </option>
            </select>
        </span>
    </label>
    <span v-else>Unsupported element type</span>
</template>

<script>

    export default {
        data() {
            return {
                Value: '',
                Supported: true,
                Valid: true
            }
        },
        props: {
            /*
            Required
            */
            elementType: {
                type: String,
                required: true
            },
            elementName: {
                type: String,
                required: true
            },

            /*
            Optional
            */
            elementId: {
                type: String,
                required: false,
                default: null
            },
            elementLabel: {
                type: String,
                required: false,
                default: null
            },
            elementClassname: {
                type: String,
                default: null,
                required: false
            },
            elementPresetValue: {
                type: String,
                default: '',
                required: false
            },

            /*
            Input specific
            */
            elementPlaceholder: {
                type: String,
                required: false,
                default: ''
            },

            
            /*
            Select specific
            */
            options: {
                type: Array,
                default() {
                    return new Array()
                }
            },

            /*
            Number input specific
            */
            numberStepper: {
                type: Number,
                default: 1,
                required: false
            },
            hasStepper: {
                type: Boolean,
                default: true,
                required: false
            },

            /*
            Search
            */
            isSearch: {
                type: Boolean,
                required: false,
                default: false
            },

            /*
            Icons
            */
            iconBefore: {
                type: String,
                required: false,
                default: null
            },
            iconBeforeStyle: {
                type: String,
                required: false,
                default: 'inner'
            },
            iconBeforeIsClickable: {
                type: Boolean,
                required: false,
                default: false
            },
            iconAfter: {
                type: String,
                required: false,
                default: null
            },
            iconAfterStyle: {
                type: String,
                required: false,
                default: 'inner'
            },
            iconAfterIsClickable: {
                type: Boolean,
                required: false,
                default: false
            },

            renderLabel: {
                type: Boolean,
                required: false,
                default: true
            },
            isRequired: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        methods: {
            valInc() {

                this.Value = parseInt(this.Value) + this.numberStepper;
    	        this.Update();

            },
            valDec() {
                
                this.Value = parseInt(this.Value) - this.numberStepper;
                this.Update();

            },
            Keypress(event) {

                if(event.key === 'Enter') {
                    if(this.isSearch === true) {
                        this.Search();
                    } else {
                        this.Submit();
                    }
                } else {
                    this.Update();
                }

            },
            Update() {

                this.Valid = true;
                this.$emit('input', {value: this.Value, valid: this.Valid});
                
            },
            Submit() {

                this.Validate();
                this.$emit('submit', {value: this.Value, valid: this.Valid});

            },
            Search() {

                this.$router.push({
                    path: `/search/${encodeURIComponent(this.Value)}`
                });

            },
            Validate() {

                this.Valid = true;

                /*
                Required checkboxes
                */
                if(this.elementType == 'checkbox' && this.isRequired && this.Value == false) {
                    this.Valid = false;
                    return false;
                }
                /*
                Check empty elements
                */
                if(this.isRequired == true && (this.Value == '' || this.Value == null)) {
                    this.Valid = false;
                    return false;
                }
                /*
                HTML5 Checker
                */
                if(this.$refs.output.checkValidity() == false) {
                    this.Valid = false;
                    return false;
                }
                /*
                Regex email checker fallback
                */
                if(this.elementType == 'email') {
                    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/m;
                    if(pattern.test(this.Value) == false) {
                        this.Valid = false;
                        return false;
                    }
                }

                return true;

            }
        },
        beforeMount() {

            var SupportedElements = Array(
                'button', 'checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text', 'select', 'email'
            );

            if(SupportedElements.indexOf(this.elementType) == -1) {
                this.Supported = false;
            }

            switch(this.elementType) {
                case 'select':
                    if(this.options.length == 0) {
                        this.Value = 'null';
                    } else {
                        let Preselected = this.options.filter(x => x.selected && x.selected == true);
                        let Selected = Preselected.length == 0 ? this.options[0].key : Preselected[0].key;
                        this.Value = Selected;
                    }
                    break;
                case 'number':
                    this.Value = parseInt(this.elementPresetValue);
                    break;
                default:
                    this.Value = this.elementPresetValue;
                    break;
            }

        },
        mounted() {
            
            this.Update();

        }
        
    }

</script>