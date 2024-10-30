<template>
    <v-container fluid class="ma-0 fill-height">
        <v-row class="flex-grow-1 fill-height bg-grey-lighten-3 flex-column"
            style="min-height: 0;overflow-y: auto;box-sizing: border-box;">
            <header>Header</header>
            <ul style="min-height: 0; flex: 1 1 0; overflow: auto; 
    	list-style: none;
    	margin: 0;
    	padding: 0;
    	background: hsl(0,0%,90%);
        ">
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
            </ul>
            <footer>Footer</footer>
        </v-row>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';

export default {
    components: {
        SubpageTitle
    }
}
</script>

<css scoped lang="scss"></css>