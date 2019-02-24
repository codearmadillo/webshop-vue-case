<template>
    <label
        v-if="Supported && elementType !== 'select' && elementType !== 'checkbox'"
        :class="elementClass.instance" 
        >

        <!-- Start Label -->
        <template v-if="renderLabel == true">
            <span :class="elementClass.label">{{ elementLabel }}</span>
        </template>
        <!-- End label -->

        <!-- Start Icon Before -->
        <template v-if="iconBefore !== null">
            <span @click="(iconBeforeIsClickable == true ? (isSearch == false ? Submit() : Search()) : null)"
            :class="elementClass.iconBefore">
                <i :class="iconBefore"></i>
            </span>
        </template>
        <!-- End Icon Before -->

        <!-- Start Input -->
        <template v-if="elementType !== 'textarea'">
            <input ref="output"
                v-model="Value"
                :name="elementName"
                :id="elementId"
                :type="elementType"
                :placeholder="elementPlaceholder"
                :value="Value"
                :class="elementClass.output + (Valid || elementType == 'search' ? '' : ' error')"
                :min="numberMin" :max="numberMax"

                @keyup="Keypress"
                @input="Update()"
                @change="Update()"
            />
        </template>
        <template v-else>
            <textarea ref="output"
                v-model="Value"
                :name="elementName"
                :id="elementId"
                :placeholder="elementPlaceholder"
                :class="elementClass.output + (Valid || elementType == 'search' ? '' : ' error')"
                @keyup="Keypress"
                @input="Update()"
                @change="Update()"
            >{{ Value }}</textarea>
        </template>
        <!-- End Input -->

        <!-- Start Stepper -->
        <template v-if="elementType == 'number' && hasStepper == true">
            <span :class="elementClass.numberStepper">
                <i @click="valInc()" class="fa fa-angle-up"></i>
                <i @click="valDec()" class="fa fa-angle-down"></i>
            </span>
        </template>
        <!-- End Stepper -->

        <!-- Start Icon After -->
        <template v-if="iconAfter !== null">
            <span @click="(iconAfterIsClickable == true ? (isSearch == false ? Submit() : Search()) : null)"
            :class="elementClass.iconAfter">
                <i :class="iconAfter"></i>
            </span>
        </template>
        <!-- End Icon After -->

    </label>
    <span 
        v-else-if="elementType == 'checkbox' && Supported"
        :class="elementClass.instance"
        >
        <input
            v-model="Value"
            :value="elementName"
            :name="elementName"
            :id="(elementId == null ? elementName : elementId)"
            :class="elementClass.output"
            ref="output"
            type="checkbox"
            
            @change="Update()"
        />
        <label
            :class="elementClass.label + (Valid ? '' : ' error')"
            :for="(elementId == null ? elementName : elementId)">
            {{ elementLabel }}
        </label>
    </span>
    <span
        v-else-if="elementType == 'select' && Supported"
        :class="elementClass.instance">
        <label v-if="renderLabel == true" :class="elementClass.label">
            {{ elementLabel }}
        </label>
        <span :class="elementClass.selectWrapper + (Valid ? '' : ' error')">
            <select 
                v-model="Value"
                :name="elementName"
                :id="elementId"
                :class="elementClass.output"
                ref="output"
                @change="Update"
                >
                <option v-for="option in options" :disabled="option.disabled == true" :key="option.key" :value="option.key">
                    {{ option.value }}
                </option>
            </select>
        </span>
    </span>
    <span v-else class="v-input__instance instance--error">Unsupported element type</span>
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
            elementClassPrefix: {
                type: String,
                required: false,
                default: 'v-input'
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
            numberMin: {
                type: Number,
                default: 1,
                required: false
            },
            numberMax: {
                type: Number,
                default: 99999999,
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
        computed: {
            ValidationExpression() {
                
                let Exp = Array();
                if(this.isRequired) {
                    Exp.push('required');
                }
                if(this.elementType == 'email') {
                    Exp.push('email');
                }

                return Exp.join('|'); 

            },
            elementClass() {
                var Class = {
                    instance: this.elementClassPrefix + '__instance',
                    label: this.elementClassPrefix + '__label',
                    iconBefore: '',
                    iconAfter: ''
                };

                /*
                Instance
                */
                switch(this.elementType) {
                    case 'select':
                        Class.instance += ' instance--select';
                        break;
                    case 'checkbox':    
                        Class.instance += ' instance--checkbox';
                        break;
                    default:
                        Class.instance += ' instance--input';
                        /* Number stepper */
                        if(this.elementType == 'number' && this.hasStepper == true) {
                            Class.instance += ' instance--has-stepper';
                        }
                        /* Icons */
                        if(this.iconBefore != null) {
                            Class.instance += ' instance--icon-before icon-before--' + this.iconBeforeStyle;
                        }
                        if(this.iconAfter != null) {
                            Class.instance += ' instance--icon-after icon-after--' + this.iconAfterStyle;
                        }
                }
                if(this.elementClassname != null) {
                    Class.instance += ' ' + this.elementClassname;
                }

                /*
                Icons
                */
                if(this.iconBeforeIsClickable == true) {
                    Class.iconBefore += 'icon--clickable ';
                }
                if(this.iconAfterIsClickable == true) {
                    Class.iconAfter  += 'icon--clickable ';
                }
                Class.iconBefore += this.elementClassPrefix + '__icon icon--before';
                Class.iconAfter += this.elementClassPrefix + '__icon icon--after';

                /*
                Output
                */
                Class['output'] = this.elementClassPrefix + '__output';

                /*
                Stepper and number
                */
                if(this.elementType == 'number') {
                    Class['numberStepper'] = this.elementClassPrefix + '__stepper input-stepper';
                    Class['output'] += ' ' + this.elementClassPrefix + '__output--number';
                }

                /*
                Select wrapper
                */
                if(this.elementType == 'select') {
                    Class['selectWrapper'] = this.elementClassPrefix + '__select-wrapper';
                }

                return Class;
            }
        },
        methods: {
            valInc() {

                if(isNaN(this.Value)) {
                    this.Value = 1;
                } else {
                    let CalculatedValue = parseInt(this.Value) + this.numberStepper;
                    if(CalculatedValue <= this.numberMax) {
                        this.Value = CalculatedValue;
                    }
                }
                
    	        this.Update();

            },
            valDec() {
                
                if(isNaN(this.Value)) {
                    this.Value = 1;
                } else {
                    let CalculatedValue = parseInt(this.Value) - this.numberStepper;
                    if(CalculatedValue >= this.numberMin) {
                        this.Value = CalculatedValue;
                    }
                }

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
            Update(event) {

                this.Valid = true;
                this.$emit('input', {value: this.Value, valid: this.Valid});
                
            },
            Submit(event) {

                this.Validate();
                this.$emit('submit', {value: this.Value, valid: this.Valid});

            },
            Search() {

                if(this.Value && this.Value !== null) {
                    this.$router.push({
                        path: `/search/${encodeURIComponent(this.Value)}`
                    });
                }

            },
            Validate() {

                this.Valid = true;

                if(this.elementType == 'select' && this.isRequired && (this.Value == 'null' || this.Value == null)) {
                    this.Valid = false;
                    return false;
                }
                if(this.elementType == 'checkbox' && this.isRequired && this.Value == false) {
                    this.Valid = false;
                    return false;
                }
                if(this.isRequired == true && (this.Value == '' || this.Value == null)) {
                    this.Valid = false;
                    return false;
                }
                if(this.$refs.output.checkValidity() == false) {
                    this.Valid = false;
                    return false;
                }
                if(this.elementType == 'email') {
                    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/m;
                    if(pattern.test(this.Value) == false) {
                        this.Valid = false;
                        return false;
                    }
                }

                return true;

            },
            Reset(event) {

                this.Value = null;
                this.Valid = false;

                this.$emit('input', {value: this.Value, valid: this.Valid});

            }
        },
        beforeMount() {

            var SupportedElements = Array(
                'textarea', 'button', 'checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text', 'select', 'email', 'number'
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