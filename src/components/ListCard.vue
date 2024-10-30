<template>
    <v-sheet rounded="lg" class="d-flex flex-column pb-5" style="overflow: auto; width: 100%;">
        <div class="d-flex">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
        </div>
        <v-list lines="one" class="py-0 pl-1">
            <v-list-item v-for="item in list" :title="item.title" :subtitle="item.subtitle">
                <template v-slot:append>
                    <v-label class="ml-5" :text="item.date"></v-label>
                </template>
            </v-list-item>
        </v-list>
    </v-sheet>
</template>

<script setup>

defineProps({
    list: {
        type: Array,
        default(rawProps) {
            return []
        },
    },
    title: {
        type: String,
        default: "ListCard"
    }
})
</script>