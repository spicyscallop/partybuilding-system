<!-- Just for document -->
<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="ViewTemplate" icon="mdi-book-open-variant" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>

            <!-- Main content start here -->

        </v-col>
    </v-container>
</template>

<script setup>

import SubpageTitle from '@/components/SubpageTitle.vue';

defineEmits(['drawerToggle']);

</script>