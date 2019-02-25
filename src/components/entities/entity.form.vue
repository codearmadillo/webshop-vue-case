<template>
    <form
        :id="formId"
        :class="'v-form v-form__instance' + (formClass ? ' ' + formClass : '')"
        @submit.prevent="Submit()"
        >
        <header v-if="formHeader" class="v-form__header">
            <h2 class="v-form__title">{{ formHeader }}</h2>
        </header>
        <section v-if="errorMessageOn && formErrorMessage !== null" class="v-form__error-message">
            <ul>
                <li v-for="error in errorBag">{{ error }}</li>
            </ul>
        </section>
        <section v-if="isrendered" class="v-form__content">
            
            <v-input
                @submit="Submit"

                v-for="(input, index) in elements"
                v-model="data[index]"
                :key="input.elementName"

                :ref="'ref'+(index)"

                :elementType="input.elementType"
                :elementName="input.elementName"

                :elementId="input.elementId"
                :elementLabel="input.elementLabel"
                :elementClassname="input.elementClassname"
                :elementPresetValue="input.elementPresetValue"
                :elementPlaceholder="input.elementPlaceholder"
                :options="input.options"
                :numberStepper="input.numberStepper"
                :hasStepper="input.hasStepper"
                :isSearch="input.isSearch"
                :iconBefore="input.iconBefore" 
                :iconBeforeStyle="input.iconBeforeStyle" 
                :iconBeforeIsClickable="input.iconBeforeIsClickable" 
                :iconAfter="input.iconAfter" 
                :iconAfterStyle="input.iconAfterStyle" 
                :iconAfterIsClickable="input.iconAfterIsClickable" 
                :renderLabel="input.renderLabel" 
                :isRequired="input.isRequired"
            />

        </section>
        <section v-if="formButton" class="v-form__submit">
            <button @click.prevent="Submit" :class="'v-form__button' + (formButtonClass ? ' ' + formButtonClass : ' btn btn--action')">{{ formButton }}</button>
        </section>
        <section v-if="!isrendered" class="v-form__compilation-error">
            <p v-if="error.form">{{ error.form }}</p>
            <p v-if="error.parsing">{{ error.parsing }}</p>
        </section>
        <footer v-if="formFooter" class="v-form__footer">
            <p class="v-form__notes" v-html="formFooter"></p>
        </footer>
    </form>
</template>

<script>
    export default {
        components: {
            'v-input': () => import('@/components/entities/entity.input.vue')
        },
        data() {
            return {
                elements: [],
                errorBag: [],
                error: {
                    form: null,
                    parsing: null,
                    validation: false
                },
                isrendered: true,
                data: [],
                errorMessageOn: false
            }
        },
        props: {

            formId: {
                type: String,
                required: true
            },
            formClass: {
                type: String,
                required: false,
                default: null
            },
            formHeader: {
                type: String,
                required: false,
                default: null
            },
            formFooter: {
                type: String,
                required: false,
                default: null
            },
            formButton: {
                type: String,
                required: false,
                default: null
            },
            formButtonClass: {
                type: String,
                required: false,
                default: null
            },
            formElements: {
                type: Array,
                required: true
            },
            formErrorMessage: {
                type: String,
                required: false,
                default: null
            },
            formShowErrorMessage: {
                type: Boolean,
                required: false,
                default: false
            }

        },
        beforeMount() {

            this.prepareContent();

        },
        methods: {

            prepareContent() {
                
                var self = this;

                /*
                Not required elements
                */
                var inputComponents = Array(
                    ['elementId',null],  ['elementLabel',null],  ['elementClassname',null],  ['elementPresetValue',null], 
                    ['elementPlaceholder',null],  ['options',[]],  ['numberStepper',1],  ['hasStepper',true],  ['isSearch',false], 
                    ['iconBefore',null],  ['iconBeforeStyling','inner'],  ['iconBeforeIsClickable',false],  ['iconAfter',null], 
                    ['iconAfterStyle','inner'],  ['iconAfterIsClickable',false],  ['renderLabel', true], ['isRequired', false]
                );

                if(this.formElements.length == 0) {
                    this.error.form = 'No form elements specified!';
                    this.isrendered = false;
                } else {
                    this.formElements.forEach(element => {
                        
                        if(!element.hasOwnProperty('elementType') || !element.hasOwnProperty('elementName')) {
                            
                            self.error.parsing = 'One of the elements does not contain required properties';
                            self.isrendered = false;

                            return false;

                        } else {

                            let Object = {
                                elementType: element.elementType,
                                elementName: element.elementName
                            }

                            inputComponents.forEach(function(val, key){
                                Object[val[0]] = element.hasOwnProperty(val[0]) ? element[val[0]] : val[1];
                            });

                            self.elements.push(Object);

                        }
                    });
                }
            },

            Submit(event) {

                if(this.Validate()) {
                    this.errorMessageOn = false;
                    this.$emit('success', this.data);
                } else {
                    if(this.formShowErrorMessage) {
                        this.errorMessageOn = true;
                    }
                    this.$emit('failure', this.formErrorMessage);
                }

            },

            Validate() {
            
                let self = this;
                self.error.validation = false;
                self.errorBag = [];
            
                this.elements.forEach(function(f, index){
                    if(self.$refs['ref' + index][0].Validate() == false) {
                        self.error.validation = true;
                        self.errorBag.push('The field \'' + self.formElements[index].elementLabel + '\' is not in correct format');

                        return;
                    }
                    if(self.formElements[index].hasOwnProperty('matchWith')) {
                        
                        let thisValue = self.data[index].value;
                        let expectedValue = self.data[self.formElements[index].matchWith];

                        if(expectedValue.value) {
                            expectedValue = expectedValue.value;    
                            
                            if(expectedValue !== thisValue) {

                                self.error.validation = true;

                                if(self.formElements[index].elementType === 'password') {
                                    self.errorBag.push('The password does not match');
                                } else {
                                    self.errorBag.push('The fields \'' + self.formElements[self.formElements[index].matchWith].elementLabel + '\' and \'' + self.formElements[index].elementLabel + '\' do not match.');
                                }

                            }

                        }
                    }
                });

                return !self.error.validation;

            }

        }
    }

</script>