<template>
    <div>
        {{authorDetails}}
    </div>
</template>

<script>

export default {
    props: ['authorDetails'],
    data() {
        return {
            test: 'test'
        }
    }
}
</script>
