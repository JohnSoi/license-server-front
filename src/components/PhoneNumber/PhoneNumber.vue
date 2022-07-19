<template src="./template.html"/>

<script>
    export default {
        data: function () {
            return {
                number: '',
            }
        },
        watch: {
            number(){
                this.number = this.number.replace(/[^0-9]/g, '')
                    .replace(/^(\d{3})?(\d{3})?(\d{4})?/g, '+7 ($1) $2-$3')
            }
        }
    }
</script>

<style scoped>

</style>