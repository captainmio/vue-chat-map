<template>
  <div class="textbox">
    <md-field :class="getValidationClass('firstName')">
	    <label for="first-name">{{ label }}</label>
	    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
	    <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
	    <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
  	</md-field>
  </div>
</template>

<script>

export default {
  name: 'textbox',
  prop: ['label', 'value']
}
</script>

<style>
</style>
